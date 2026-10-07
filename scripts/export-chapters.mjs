#!/usr/bin/env node
// Writes every chapter (drafts included) to backup/chapters/ as Markdown.
// Run daily by .github/workflows/backup.yml; that daily read also keeps the
// free Supabase project from pausing.
//
//   npm run export                 # → backup/chapters
//   npm run export -- some/folder
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { adminClient } from './env.mjs';

const out = process.argv[2] ?? 'backup/chapters';
const sb = adminClient();

const { data, error } = await sb
  .from('chapters')
  .select('slug, kind, title, color, story_date, status, publish_at, position, body')
  .order('position', { ascending: true });
if (error) {
  console.error('Không đọc được chương:', error.message);
  process.exit(1);
}

await mkdir(out, { recursive: true });
for (const f of await readdir(out)) if (f.endsWith('.md')) await rm(join(out, f));

const yaml = (v) => (v == null ? '' : JSON.stringify(v));
let n = 0;
for (const [i, c] of data.entries()) {
  if (c.kind === 'chapter') n++;
  const header = [
    '---',
    `title: ${yaml(c.title)}`,
    `kind: ${c.kind}`,
    `number: ${c.kind === 'chapter' ? n : ''}`,
    `slug: ${c.slug}`,
    `status: ${c.status}`,
    `publish_at: ${yaml(c.publish_at)}`,
    `story_date: ${yaml(c.story_date)}`,
    `color: ${yaml(c.color)}`,
    '---',
    '',
  ].join('\n');
  const name = `${String(i + 1).padStart(3, '0')}-${c.slug}.md`;
  await writeFile(join(out, name), header + c.body.replace(/\s*$/, '\n'));
}
console.log(`Đã sao lưu ${data.length} chương vào ${out}`);
