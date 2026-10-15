#!/usr/bin/env node
// Cross-posting chapters to other reading sites. Run from the repo root:
//
//   npm run crosspost -- status rookies
//   npm run crosspost -- pull rookies --range 1-5      write sources for Claude to convert
//   npm run crosspost -- check rookies [--save]        check Claude's conversions; --save stores them
//   npm run crosspost -- queue rookies --range 1-5     queue a sync (same as "Đồng bộ" in /admin/crosspost)
//   npm run crosspost -- cancel rookies                cancel jobs that have not started
//   npm run crosspost -- login rookies                 sign in once in the worker's browser
//   npm run crosspost -- info truyennhaong [--save]    compare (and with --save, copy) the story
//                                                      intro from src/config.ts to the site
//   npm run crosspost:worker                           post queued chapters (keep it running)
//
// Selecting chapters (pull, queue, status):
//   --all                 every chapter allowed on that site
//   --range 1-5           chapter numbers; "5-" = from 5, "1-3,8" works too
//   --only slug,slug      exact chapters by web address (also interludes)
//   --no-interludes       with --range/--all: leave interludes out
// Interludes and special chapters belong to the numbered chapter before them.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { selectByRange, canSync, STATE_LABEL } from './core/crosspost.ts';
import { checkConversion } from './core/checks.ts';
import { CROSS, db, loadRows, must, siteConfig } from './core/data.mjs';

const [cmd, site, ...rest] = process.argv.slice(2);
const flags = new Map();
for (let i = 0; i < rest.length; i++) {
  const a = rest[i];
  if (!a.startsWith('--')) continue;
  const next = rest[i + 1];
  if (next && !next.startsWith('--')) {
    flags.set(a.slice(2), next);
    i++;
  } else flags.set(a.slice(2), true);
}

const HELP = `Cách dùng: npm run crosspost -- <status|pull|check|queue|cancel|login|worker|info> <trang> [--all | --range 1-5 | --only slug,slug]`;
if (!cmd || cmd === 'help' || cmd === '--help') {
  console.log(HELP);
  process.exit(0);
}
if (!site) {
  console.error('Thiếu tên trang (ví dụ: rookies).\n' + HELP);
  process.exit(1);
}
try {
  siteConfig(site); // fails early on an unknown site
} catch (e) {
  console.error('Lỗi: ' + e.message);
  process.exit(1);
}

const workDir = join(CROSS, 'work', site);
const outDir = join(CROSS, 'out', site);
const manifestPath = join(workDir, 'manifest.json');
const fileBase = (r) => `${String(r.chapter.position).padStart(3, '0')}-${r.chapter.slug}`;
const label = (r) => r.title;

// Rows picked by --all / --range / --only, in story order.
function pick(rows, { needSelection = true } = {}) {
  const only = typeof flags.get('only') === 'string' ? flags.get('only').split(',').map((s) => s.trim()).filter(Boolean) : null;
  const range = typeof flags.get('range') === 'string' ? flags.get('range') : null;
  const all = flags.get('all') === true;
  const withInterludes = !flags.has('no-interludes');
  if ([only, range, all].filter(Boolean).length > 1) throw new Error('Chọn một trong --all, --range, --only');
  if (only) {
    const set = new Set(only);
    const found = rows.filter((r) => set.has(r.chapter.slug));
    const missing = only.filter((s) => !found.some((r) => r.chapter.slug === s));
    if (missing.length) throw new Error(`Không có chương: ${missing.join(', ')}`);
    return found;
  }
  if (range) {
    const live = rows.filter((r) => r.live).map((r) => r.chapter);
    const ids = new Set(selectByRange(live, range, withInterludes).map((c) => c.id));
    return rows.filter((r) => ids.has(r.chapter.id));
  }
  if (all) return rows.filter((r) => r.live && (withInterludes || r.chapter.number != null));
  if (needSelection) throw new Error('Chọn chương: --all, --range 1-5 hoặc --only slug');
  return rows;
}

function table(rows) {
  for (const r of rows) {
    const remote = r.post?.remote_url ? `  ${r.post.remote_url}` : '';
    console.log(`  ${STATE_LABEL[r.state].padEnd(18)} ${label(r)}${remote}`);
  }
}

async function readManifest() {
  if (!existsSync(manifestPath)) return { site, chapters: {} };
  return JSON.parse(await readFile(manifestPath, 'utf8'));
}

const stripHeader = (s) => s.replace(/^<!--[\s\S]*?-->\n?/, '');

async function cmdStatus() {
  const { siteRow, rows } = await loadRows(site);
  const shown = flags.size ? pick(rows) : rows;
  const limit = siteRow.teaser_limit == null ? 'tất cả' : `${siteRow.teaser_limit} chương đầu`;
  console.log(`${siteRow.name} · đăng ${limit} · mặc định: ${siteRow.default_mode === 'publish' ? 'đăng ngay' : 'lưu bản thảo'}`);
  table(shown);
  const count = (s) => shown.filter((r) => r.state === s).length;
  console.log(`\n${count('posted')} đã đăng · ${count('update')} cần cập nhật · ${count('ready')} sẵn sàng · ${count('unconverted') + count('outdated')} cần Claude chuyển`);
}

async function cmdPull() {
  const { rows } = await loadRows(site);
  const anyChapter = flags.get('any') === true;
  const force = flags.get('force') === true;
  const picked = pick(rows).filter((r) => r.live && (anyChapter || r.eligible));
  const todo = picked.filter((r) => force || r.state === 'unconverted' || r.state === 'outdated' || !r.post);
  await mkdir(workDir, { recursive: true });
  await mkdir(outDir, { recursive: true });
  const manifest = await readManifest();
  for (const r of todo) {
    const base = fileBase(r);
    const header = [
      `<!-- crosspost source · ${site}`,
      `chapter: ${r.title}   (title and date are added by code: do not write them)`,
      `slug: ${r.chapter.slug}`,
      `rules: crosspost/sites/${site}/convert.md`,
      `write the converted body to: crosspost/out/${site}/${base}.txt`,
      `-->`,
    ].join('\n');
    await writeFile(join(workDir, `${base}.source.md`), header + '\n' + (r.chapter.body ?? '').replace(/\r\n?/g, '\n'), 'utf8');
    manifest.chapters[r.chapter.slug] = { id: r.chapter.id, file: base, title: r.title, sourceHash: r.sourceHash };
  }
  manifest.site = site;
  manifest.pulledAt = new Date().toISOString();
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  const skipped = picked.length - todo.length;
  console.log(`Đã ghi ${todo.length} chương cần chuyển vào crosspost/work/${site}/${skipped ? ` (${skipped} chương đã có bản chuyển mới nhất: thêm --force để làm lại)` : ''}`);
  for (const r of todo) console.log(`  ${fileBase(r)}.source.md  →  crosspost/out/${site}/${fileBase(r)}.txt`);
  const outside = pick(rows).filter((r) => r.live && !r.eligible && !anyChapter).length;
  if (outside) console.log(`(${outside} chương nằm ngoài giới hạn đăng của trang này nên không lấy: thêm --any nếu vẫn muốn chuyển)`);
}

async function cmdCheck() {
  const save = flags.get('save') === true;
  const manifest = await readManifest();
  const entries = Object.entries(manifest.chapters ?? {});
  if (!entries.length) return console.log(`Chưa có gì để kiểm tra. Chạy trước: npm run crosspost -- pull ${site} --range 1-5`);
  const current = save ? new Map((await loadRows(site)).rows.map((r) => [r.chapter.id, r])) : null;
  let okCount = 0;
  let saved = 0;
  for (const [, m] of entries) {
    const outPath = join(outDir, `${m.file}.txt`);
    if (!existsSync(outPath)) {
      console.log(`  …  ${m.title}: chưa có bản chuyển (crosspost/out/${site}/${m.file}.txt)`);
      continue;
    }
    const source = stripHeader(await readFile(join(workDir, `${m.file}.source.md`), 'utf8'));
    const converted = (await readFile(outPath, 'utf8')).replace(/\r\n?/g, '\n');
    const report = checkConversion(source, converted, siteConfig(site).checks ?? {});
    if (!report.ok) {
      console.log(`  ✗  ${m.title}`);
      for (const p of report.problems) console.log(`       - ${p}`);
      for (const x of report.missingProse.slice(0, 5)) console.log(`         thiếu: "${x.slice(0, 90)}"`);
      for (const x of report.missingBlock.slice(0, 5)) console.log(`         thiếu (trong khối): "${x.slice(0, 90)}"`);
      continue;
    }
    okCount++;
    if (!save) {
      const lint = report.lint ? ` · lỗi định dạng ${report.lint.perThousand}/1000 từ` : '';
      console.log(`  ✓  ${m.title}  (độ dài ${Math.round(report.ratio * 100)}%${lint})`);
      continue;
    }
    const now = current.get(m.id);
    if (!now) {
      console.log(`  ✗  ${m.title}: chương không còn trong Supabase`);
      continue;
    }
    if (now.sourceHash !== m.sourceHash) {
      console.log(`  ✗  ${m.title}: chương trên Vercel đã sửa sau khi pull. Pull lại rồi chuyển lại.`);
      continue;
    }
    must(
      await db().from('crosspost_posts').upsert(
        { site, chapter_id: m.id, source_hash: m.sourceHash, converted_body: converted.trim() + '\n', converted_at: new Date().toISOString(), check_report: report },
        { onConflict: 'site,chapter_id' },
      ),
      `Không lưu được ${m.title}`,
    );
    saved++;
    console.log(`  ✓  ${m.title}: đã lưu`);
  }
  console.log(save ? `\nĐã lưu ${saved}/${entries.length}. Vào /admin/crosspost để chọn và đồng bộ.` : `\n${okCount}/${entries.length} đạt. Thêm --save để lưu vào Supabase.`);
}

async function cmdQueue() {
  const { siteRow, rows } = await loadRows(site);
  const picked = pick(rows);
  const go = picked.filter((r) => canSync(r.state));
  const mode = flags.get('draft') ? 'draft' : flags.get('publish') ? 'publish' : siteRow.default_mode;
  for (const r of picked.filter((x) => !canSync(x.state))) console.log(`  bỏ qua  ${label(r)}: ${STATE_LABEL[r.state]}`);
  if (!go.length) return console.log('Không có chương nào cần đồng bộ.');
  const n = must(await db().rpc('crosspost_enqueue', { p_site: site, p_chapters: go.map((r) => r.chapter.id), p_mode: mode }), 'Không xếp hàng được');
  console.log(`Đã xếp hàng ${n} chương (${mode === 'publish' ? 'đăng ngay' : 'lưu bản thảo'}). Worker sẽ đăng lần lượt.`);
}

async function cmdCancel() {
  const ids = must(await db().from('crosspost_jobs').select('id').eq('site', site).eq('status', 'queued'), 'Không đọc được hàng đợi').map((j) => j.id);
  if (!ids.length) return console.log('Không có việc nào đang chờ.');
  const n = must(await db().rpc('crosspost_cancel', { p_ids: ids }), 'Không hủy được');
  console.log(`Đã hủy ${n} việc.`);
}

async function cmdLogin() {
  const { login } = await import('./worker.mjs');
  await login(site);
}

// Story intro: src/config.ts (tagline + intro) is the source; the site follows it.
async function cmdInfo() {
  const { story } = await import('../src/config.ts');
  if (!story.tagline || !Array.isArray(story.intro)) throw new Error('src/config.ts chưa có story.tagline / story.intro.');
  const cfg = siteConfig(site);
  const adapter = await import(`./sites/${site}/adapter.mjs`);
  const s = await adapter.open(cfg, { profileDir: join(CROSS, '.profile', site) });
  try {
    if (!s.syncInfo) throw new Error(`${cfg.name}: adapter chưa hỗ trợ đồng bộ giới thiệu truyện.`);
    if (s.workStatus) console.log(`Trạng thái truyện trên ${cfg.name}: ${(await s.workStatus()) ?? '(không đọc được)'}`);
    const save = flags.get('save') === true;
    const r = await s.syncInfo({ tagline: story.tagline, intro: story.intro }, { save });
    if (!r.changed) return console.log('Giới thiệu truyện đã khớp với src/config.ts. Không có gì để đổi.');
    if (save) return console.log('Đã cập nhật giới thiệu truyện theo src/config.ts.');
    console.log('Khác với src/config.ts:');
    if (r.current.tagline !== r.wanted.tagline) console.log(`  Giới thiệu một dòng\n    đang có: ${r.current.tagline}\n    sẽ thành: ${r.wanted.tagline}`);
    const n = Math.max(r.current.intro.length, r.wanted.intro.length);
    for (let i = 0; i < n; i++) {
      if (r.current.intro[i] === r.wanted.intro[i]) continue;
      console.log(`  Đoạn ${i + 1}\n    đang có: ${r.current.intro[i] ?? '(không có)'}\n    sẽ thành: ${r.wanted.intro[i] ?? '(xóa)'}`);
    }
    console.log('\nThêm --save để lưu lên trang.');
  } finally {
    await s.close();
  }
}

async function cmdWorker() {
  const { runWorker } = await import('./worker.mjs');
  await runWorker(site, { once: flags.get('once') === true });
}

const commands = { status: cmdStatus, pull: cmdPull, check: cmdCheck, queue: cmdQueue, cancel: cmdCancel, login: cmdLogin, worker: cmdWorker, info: cmdInfo };
const run = commands[cmd];
if (!run) {
  console.error(`Không có lệnh "${cmd}".\n` + HELP);
  process.exit(1);
}
try {
  await run();
} catch (e) {
  console.error('Lỗi: ' + (e?.message ?? e));
  process.exit(1);
}
