#!/usr/bin/env node
// One-time import of chapter files into the database.
//
//   npm run import                      # content/import/*.md, published now
//   npm run import -- --draft           # import as drafts instead
//   npm run import -- --dry-run         # show what would happen, change nothing
//   npm run import -- --overwrite       # also replace chapters that already exist
//   npm run import -- --reorder         # put every chapter in the files into file-name order
//   npm run import -- path/to/folder
//
// Files are imported in file-name order (03-…, 04-…, 05-…, 05b-…, 06-…).
// New chapters are added at the end; --reorder then moves them to where their
// file name says (an interlude "17b-…" goes right after "17-…"). Chapters that
// are not in the files keep their order and stay after the ones that are.
// Chapters that already exist (same web address) are skipped unless you pass
// --overwrite, so edits you made in the admin page are never lost by accident.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { adminClient } from './env.mjs';
import { parseChapter } from './parse-chapter.mjs';
import { interludeColors } from '../src/config.ts';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const folder = args.find((a) => !a.startsWith('--')) ?? 'content/import';
const dryRun = flags.has('--dry-run');
const overwrite = flags.has('--overwrite');
const reorder = flags.has('--reorder');
const status = flags.has('--draft') ? 'draft' : 'published';

const files = (await readdir(folder)).filter((f) => f.endsWith('.md')).sort();
if (!files.length) {
  console.error(`Không có file .md nào trong ${folder}`);
  process.exit(1);
}

const parsed = [];
for (const file of files) {
  const row = parseChapter(await readFile(join(folder, file), 'utf8'));
  if (!row) {
    console.warn(`  bỏ qua ${file}: không có dòng tiêu đề "# …"`);
    continue;
  }
  // Keep web addresses unique inside this batch
  let slug = row.slug;
  for (let n = 2; parsed.some((p) => p.slug === slug); n++) slug = `${row.slug}-${n}`;
  row.slug = slug;
  if (row.kind === 'interlude') {
    row.color = interludeColors.find((c) => c.name.toLowerCase() === row.title.toLowerCase())?.hex ?? '#D9C8B0';
  }
  parsed.push({ file, ...row });
}

const sb = dryRun ? null : adminClient();
let existing = [];
if (sb) {
  const { data, error } = await sb.from('chapters').select('id, slug, position');
  if (error) throw error;
  existing = data;
}
let nextPosition = Math.max(0, ...existing.map((e) => e.position)) + 1;

let created = 0;
let updated = 0;
let skipped = 0;
for (const r of parsed) {
  const found = existing.find((e) => e.slug === r.slug);
  const label = `${r.kind === 'chapter' ? 'Chương' : 'Interlude'} "${r.title}"`;
  const extra = `${r.story_date ? ` · ${r.story_date}` : ''} · ${r.body.length.toLocaleString('vi-VN')} ký tự`;
  if (found && !overwrite) {
    console.log(`  = đã có, bỏ qua   ${label} (/doc/${r.slug})`);
    skipped++;
    continue;
  }
  const payload = {
    slug: r.slug,
    kind: r.kind,
    title: r.title,
    color: r.color ?? null,
    story_date: r.story_date,
    body: r.body,
  };
  if (dryRun) {
    console.log(`  + ${found ? 'sẽ ghi đè' : 'sẽ thêm'}  ${label} → /doc/${r.slug}${extra}`);
    continue;
  }
  if (found) {
    const { error } = await sb.from('chapters').update(payload).eq('id', found.id);
    if (error) throw new Error(`${r.file}: ${error.message}`);
    console.log(`  ~ đã ghi đè      ${label}${extra}`);
    updated++;
  } else {
    const { error } = await sb.from('chapters').insert({ ...payload, status, position: nextPosition++ });
    if (error) throw new Error(`${r.file}: ${error.message}`);
    console.log(`  + đã thêm        ${label} → /doc/${r.slug}${extra}`);
    created++;
  }
}

if (reorder) {
  if (dryRun) {
    console.log('\nSắp xếp lại: sẽ đặt các chương theo thứ tự tên file (chạy thử, chưa đổi gì).');
  } else {
    const { data, error } = await sb.from('chapters').select('id, slug, position').order('position', { ascending: true });
    if (error) throw error;
    const inFiles = parsed.map((p) => data.find((d) => d.slug === p.slug)).filter(Boolean);
    const others = data.filter((d) => !inFiles.includes(d));
    const ids = [...inFiles, ...others].map((d) => d.id);
    // Positions must stay unique, so first move everything out of the way
    const OFFSET = 100000;
    for (const [i, id] of ids.entries()) {
      const { error: e1 } = await sb.from('chapters').update({ position: OFFSET + i + 1 }).eq('id', id);
      if (e1) throw e1;
    }
    for (const [i, id] of ids.entries()) {
      const { error: e2 } = await sb.from('chapters').update({ position: i + 1 }).eq('id', id);
      if (e2) throw e2;
    }
    const moved = ids.filter((id, i) => data[i]?.id !== id).length;
    console.log(`\nĐã sắp xếp lại ${ids.length} chương theo thứ tự file (${moved} chương đổi vị trí).`);
  }
}

console.log(
  dryRun
    ? `\nChạy thử: ${parsed.length} file. Không có gì thay đổi.`
    : `\nXong: thêm ${created}, ghi đè ${updated}, bỏ qua ${skipped}. Trạng thái chương mới: ${status === 'published' ? 'đã đăng' : 'nháp'}.`,
);
