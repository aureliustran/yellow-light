// The worker: takes queued jobs from Supabase one at a time, in story order,
// and posts them with the site's adapter. Run it on your own computer:
//
//   npm run crosspost:worker              keep running, check the queue every 10 s
//   npm run crosspost -- worker rookies --once   post what is queued, then stop
//
// How it avoids posting a chapter twice:
//   1. A chapter that already has a remote id is always updated, never created.
//   2. Before creating, it reads the chapter list on the site; a chapter with the
//      same title is taken over (its id saved) instead of being created again.
//   3. Just before submitting a new chapter it marks it "pending" in Supabase.
//      If the worker dies between submitting and saving the new id, the next
//      run finds the mark and checks the site's list first (see 2).
//   4. The database allows one open job per chapter, one record per chapter and
//      one local chapter per remote id; jobs are claimed with "skip locked".
//   5. After saving, the chapter is reloaded and compared with what was sent.
//
// Signing in: when the site signs the worker out, jobs wait in the queue
// (they are not failed). Sign in again from /admin/crosspost: the email and
// password are encrypted in the browser with this worker's public key, so only
// this computer can read them. Tick "ghi nhớ" there to let the worker sign
// itself in again next time.
import { createInterface } from 'node:readline';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { hostname } from 'node:os';
import { join } from 'node:path';
import { plainForCompare, textToHtml } from './core/crosspost.ts';
import { makeKeyPair, seal, unseal } from './core/seal.ts';
import { CROSS, db, loadRows, must, siteConfig } from './core/data.mjs';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normTitle = (t) => t.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
const profileDir = (site) => join(CROSS, '.profile', site);
const logDir = (site) => join(CROSS, 'logs', site);
const stamp = () => new Date().toLocaleTimeString('vi-VN');

async function adapterFor(site) {
  return import(`./sites/${site}/adapter.mjs`);
}

export async function login(site) {
  const cfg = siteConfig(site);
  const { open } = await adapterFor(site);
  const s = await open(cfg, { profileDir: profileDir(site) });
  await s.page.goto(s.loginUrl);
  console.log(`Đăng nhập ${cfg.name} trong cửa sổ trình duyệt vừa mở (tự bạn gõ mật khẩu, không lưu ở đâu khác).`);
  console.log('Đăng nhập xong thì quay lại đây và nhấn Enter.');
  await new Promise((resolve) => createInterface({ input: process.stdin }).once('line', resolve));
  const ok = await s.signedIn();
  await s.close();
  console.log(ok ? 'Đã đăng nhập. Phiên được lưu cho worker.' : 'Chưa thấy đăng nhập. Chạy lại lệnh này.');
  process.exit(ok ? 0 : 1);
}

// ───────────── Keys and the saved sign-in (all in crosspost/.profile/, never committed) ─────────────

async function workerKeys() {
  const path = join(CROSS, '.profile', 'worker-key.json');
  if (existsSync(path)) return JSON.parse(await readFile(path, 'utf8'));
  await mkdir(join(CROSS, '.profile'), { recursive: true });
  const keys = await makeKeyPair();
  await writeFile(path, JSON.stringify(keys), { encoding: 'utf8', mode: 0o600 });
  return keys;
}

// The saved sign-in is sealed with the worker's own key. That keeps it out of
// git and unreadable at a glance; anyone who can read crosspost/.profile/ on
// this computer can still open it (same as the Supabase key in .env).
const savedLoginPath = (site) => join(CROSS, '.profile', `${site}-login.json`);
async function readSavedLogin(site, keys) {
  if (!existsSync(savedLoginPath(site))) return null;
  try {
    return await unseal(keys.privateJwk, JSON.parse(await readFile(savedLoginPath(site), 'utf8')));
  } catch {
    return null;
  }
}
async function saveLogin(site, keys, username, password) {
  await writeFile(savedLoginPath(site), JSON.stringify(await seal(keys.publicJwk, { username, password })), { encoding: 'utf8', mode: 0o600 });
}
async function forgetLogin(site) {
  await rm(savedLoginPath(site), { force: true }).catch(() => {});
  if (existsSync(savedLoginPath(site))) await writeFile(savedLoginPath(site), '', 'utf8'); // no delete permission: blank it
}

const REQUEST_MAX_AGE_MS = 10 * 60 * 1000;

export async function runWorker(site, { once = false } = {}) {
  const cfg = siteConfig(site);
  const { open } = await adapterFor(site);
  const workerId = `${hostname()}:${site}`;
  const delay = cfg[site]?.delayBetweenChaptersMs ?? 8000;
  const keys = await workerKeys();
  let session = null;
  let stopping = false;
  let needsLogin = false;
  let loginNote = null;
  process.on('SIGINT', () => {
    if (stopping) process.exit(130);
    stopping = true;
    console.log('\nDừng sau chương đang đăng (nhấn Ctrl+C lần nữa để thoát ngay).');
  });

  const beat = async (info) =>
    db()
      .from('crosspost_workers')
      .upsert({
        worker: workerId,
        site,
        last_seen: new Date().toISOString(),
        info,
        public_key: keys.publicJwk,
        needs_login: needsLogin,
        has_saved_login: !!(await readSavedLogin(site, keys)),
        login_note: loginNote,
      });
  const getSession = async () => (session ??= await open(cfg, { profileDir: profileDir(site) }));

  async function tryLogin(username, password, why) {
    const s = await getSession();
    await s.loginWithPassword(username, password);
    needsLogin = false;
    loginNote = `Đã đăng nhập ${new Date().toLocaleString('vi-VN')} (${why})`;
    console.log(`[${stamp()}] ✓ Đã đăng nhập ${cfg.name} (${why}).`);
  }

  // Signed out mid-run: sign in again with the saved details, if there are any.
  async function autoLogin() {
    const saved = await readSavedLogin(site, keys);
    if (!saved) return false;
    try {
      await tryLogin(saved.username, saved.password, 'tự đăng nhập lại');
      return true;
    } catch (e) {
      loginNote = 'Tự đăng nhập lại không được: ' + (e?.message ?? e);
      console.log(`[${stamp()}] ✗ ${loginNote}`);
      return false;
    }
  }

  // Sign-in details sent from /admin/crosspost (encrypted to this worker).
  async function handleLoginRequests() {
    const { data, error } = await db().from('crosspost_login_requests').select('*').eq('worker', workerId).eq('status', 'new').order('id');
    if (error || !data?.length) return;
    for (const req of data) {
      const finish = (status, message) =>
        db().from('crosspost_login_requests').update({ status, message, payload: null, finished_at: new Date().toISOString() }).eq('id', req.id);
      try {
        if (Date.now() - Date.parse(req.created_at) > REQUEST_MAX_AGE_MS) {
          await finish('failed', 'Quá 10 phút mới tới worker: gửi lại.');
          continue;
        }
        if (req.kind === 'forget') {
          await forgetLogin(site);
          await finish('done', 'Đã xóa mật khẩu lưu trên máy.');
          console.log(`[${stamp()}] Đã xóa mật khẩu ${cfg.name} lưu trên máy.`);
          continue;
        }
        const p = await unseal(keys.privateJwk, req.payload);
        if (!p?.username || !p?.password) throw new Error('Thiếu tên đăng nhập hoặc mật khẩu.');
        if (Math.abs(Date.now() - Date.parse(p.sentAt)) > REQUEST_MAX_AGE_MS) throw new Error('Yêu cầu quá cũ: gửi lại.');
        await tryLogin(p.username, p.password, 'từ trang quản lý');
        if (p.remember) await saveLogin(site, keys, p.username, p.password);
        else await forgetLogin(site);
        await finish('done', p.remember ? 'Đã đăng nhập. Đã lưu để tự đăng nhập lại.' : 'Đã đăng nhập (không lưu mật khẩu).');
      } catch (e) {
        const msg = String(e?.message ?? e).slice(0, 500);
        loginNote = 'Đăng nhập không được: ' + msg;
        await finish('failed', msg);
        console.log(`[${stamp()}] ✗ Đăng nhập: ${msg}`);
      }
      await beat(needsLogin ? 'cần đăng nhập' : 'đang chờ');
    }
  }

  // Jobs this worker was running when it last stopped go back in the queue.
  // Safe because of the pending mark (3) and the list check (2).
  await db().from('crosspost_jobs').update({ status: 'queued', started_at: null, worker: null }).eq('site', site).eq('status', 'running').eq('worker', workerId);

  console.log(`[${stamp()}] Worker ${workerId} đang chạy. Ctrl+C để dừng.`);
  await beat('đang chờ');

  while (!stopping) {
    await handleLoginRequests();
    if (needsLogin) {
      // Nothing can be posted until it is signed in again: wait, do not fail jobs.
      if (once) break;
      await beat('cần đăng nhập');
      await sleep(5000);
      continue;
    }
    const claimed = must(await db().rpc('crosspost_claim_job', { p_site: site, p_worker: workerId }), 'Không lấy được việc');
    const job = claimed?.[0];
    if (!job) {
      if (once) break;
      await beat('đang chờ');
      await sleep(10000);
      continue;
    }
    await beat(`đang đăng (việc #${job.id})`);
    let touchedSite = false;
    const run = () =>
      processJob(job, () => {
        touchedSite = true;
        return getSession();
      });
    try {
      let out;
      try {
        out = await run();
      } catch (e) {
        if (e?.code !== 'SIGNED_OUT') throw e;
        if (!(await autoLogin())) {
          needsLogin = true;
          loginNote ??= 'rookies.vn đã đăng xuất worker.';
          await db().from('crosspost_jobs').update({ status: 'queued', started_at: null, worker: null }).eq('id', job.id);
          await beat('cần đăng nhập');
          console.log(`[${stamp()}] ! ${cfg.name} đã đăng xuất worker. Các chương vẫn chờ trong hàng đợi. Đăng nhập lại ở /admin/crosspost hoặc chạy: npm run crosspost -- login ${site}`);
          continue;
        }
        out = await run();
      }
      must(await db().from('crosspost_jobs').update({ status: 'done', result: out.result, error: null, finished_at: new Date().toISOString() }).eq('id', job.id), 'Không cập nhật được việc');
      console.log(`[${stamp()}] ✓ ${out.title}: ${RESULT[out.result]}`);
    } catch (e) {
      const msg = String(e?.message ?? e).slice(0, 1000);
      let shot = '';
      if (session && touchedSite) shot = await session.screenshot(logDir(site), `job-${job.id}`);
      await db().from('crosspost_jobs').update({ status: 'failed', error: msg, finished_at: new Date().toISOString() }).eq('id', job.id);
      await db().from('crosspost_posts').update({ last_error: msg }).eq('site', site).eq('chapter_id', job.chapter_id);
      console.log(`[${stamp()}] ✗ việc #${job.id}: ${msg}${shot ? `\n   ảnh chụp: ${shot}` : ''}`);
    }
    if (touchedSite && !stopping) await sleep(delay);
  }

  await beat(needsLogin ? 'đã dừng · cần đăng nhập' : 'đã dừng');
  if (session) await session.close();
  console.log(`[${stamp()}] Worker đã dừng.`);
}

const RESULT = {
  created: 'đã tạo chương mới',
  updated: 'đã cập nhật',
  adopted: 'đã có sẵn trên trang, đã nhận lại và cập nhật',
  unchanged: 'không có gì thay đổi',
};

async function processJob(job, getSession) {
  const site = job.site;
  // Always start from fresh data: the chapter may have changed since it was queued.
  const { siteRow, rows } = await loadRows(site);
  const row = rows.find((r) => r.chapter.id === job.chapter_id);
  if (!row) throw new Error('Chương không còn trong Supabase.');
  const title = row.title;
  if (!row.live) throw new Error(`${title}: chưa đăng trên Vercel.`);
  if (!row.eligible) throw new Error(`${title}: nằm ngoài giới hạn ${siteRow.teaser_limit} chương đầu của ${siteRow.name}.`);
  if (!row.post) throw new Error(`${title}: chưa có bản chuyển. Nhờ Claude chuyển rồi chạy "npm run crosspost -- check ${site} --save".`);
  if (row.post.source_hash !== row.sourceHash) throw new Error(`${title}: chương trên Vercel đã sửa sau khi chuyển. Cần chuyển lại.`);

  const p = row.post;
  const wanted = row.wantedHash;
  if (p.remote_id && p.posted_hash === wanted && p.posted_mode === job.mode) return { result: 'unchanged', title };

  const post = { title, html: textToHtml(row.final), plain: plainForCompare(row.final), mode: job.mode };
  const saveDone = async (patch) =>
    must(
      await db()
        .from('crosspost_posts')
        .update({ ...patch, posted_hash: wanted, posted_mode: job.mode, posted_at: new Date().toISOString(), last_error: null })
        .eq('site', site)
        .eq('chapter_id', row.chapter.id),
      'Đã đăng nhưng không lưu được kết quả vào Supabase. Đừng đăng lại tay: chạy lại worker, nó sẽ tự nhận lại chương.',
    );

  const s = await getSession();
  let remoteId = p.remote_id;
  let result = 'updated';

  if (!remoteId) {
    // Never leave a gap: rookies.vn lists chapters in the order they were created.
    const earlier = rows.filter(
      (r) => r.eligible && r.chapter.position < row.chapter.position && !r.post?.remote_id && !(r.job && ['queued', 'running'].includes(r.job.status)),
    );
    if (earlier.length) throw new Error(`Chưa đăng chương trước: ${earlier.map((r) => r.title).join(', ')}. Đồng bộ theo thứ tự để mục lục trên ${siteRow.name} đúng.`);

    const remote = await s.listRemote();
    const taken = new Set(rows.map((r) => r.post?.remote_id).filter(Boolean));
    const same = remote.filter((x) => normTitle(x.title) === normTitle(title));
    if (same.length > 1) throw new Error(`Trên ${siteRow.name} có ${same.length} chương cùng tên "${title}". Xóa bớt bằng tay rồi chạy lại.`);
    if (same.length === 1) {
      if (taken.has(same[0].id)) throw new Error(`Chương "${title}" trên ${siteRow.name} đã gắn với một chương khác ở đây. Kiểm tra lại tên chương.`);
      remoteId = same[0].id;
      result = 'adopted';
      must(await db().from('crosspost_posts').update({ remote_id: remoteId, remote_url: same[0].url, pending_since: null }).eq('site', site).eq('chapter_id', row.chapter.id), 'Không lưu được id chương');
    } else {
      must(await db().from('crosspost_posts').update({ pending_since: new Date().toISOString() }).eq('site', site).eq('chapter_id', row.chapter.id).is('remote_id', null), 'Không đánh dấu được');
      const made = await s.create(post);
      await saveDone({ remote_id: made.id, remote_url: made.url, pending_since: null });
      return { result: 'created', title };
    }
  }

  const done = await s.update(remoteId, post);
  await saveDone({ remote_url: done.url });
  return { result, title };
}
