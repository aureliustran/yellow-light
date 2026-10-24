#!/usr/bin/env node
// Writes every chapter (drafts included) to backup/chapters/<edition>/ as
// Markdown, one folder per edition (src/config.ts → editions). Run daily by
// .github/workflows/backup.yml; that daily read also keeps the free Supabase
// project from pausing.
//
//   npm run export                 # → backup/chapters/v1, backup/chapters/v2
//   npm run export -- some/folder
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { adminClient } from './env.mjs';
import { editions } from '../src/config.ts';
import { withNumbers } from '../src/lib/chapters-shared.ts';

const out = process.argv[2] ?? 'backup/chapters';
const sb = adminClient();

const { data, error } = await sb
  .from('chapters')
  .select('id, edition, slug, kind, title, color, story_date, status, publish_at, position, body')
  .order('position', { ascending: true });
if (error) {
  console.error('Không đọc được chương:', error.message);
  process.exit(1);
}

// Files from before editions sat directly in backup/chapters/: they were v1.
await mkdir(out, { recursive: true });
for (const f of await readdir(out)) if (f.endsWith('.md')) await rm(join(out, f));

const yaml = (v) => (v == null ? '' : JSON.stringify(v));
for (const edition of editions.list) {
  const dir = join(out, edition);
  const rows = withNumbers(data.filter((c) => (c.edition ?? 'v1') === edition), editions.firstNumber[edition]);
  await mkdir(dir, { recursive: true });
  for (const f of await readdir(dir)) if (f.endsWith('.md')) await rm(join(dir, f));
  for (const [i, c] of rows.entries()) {
    const header = [
      '---',
      `title: ${yaml(c.title)}`,
      `edition: ${edition}`,
      `kind: ${c.kind}`,
      `number: ${c.number ?? ''}`,
      `slug: ${c.slug}`,
      `status: ${c.status}`,
      `publish_at: ${yaml(c.publish_at)}`,
      `story_date: ${yaml(c.story_date)}`,
      `color: ${yaml(c.color)}`,
      '---',
      '',
    ].join('\n');
    const name = `${String(i + 1).padStart(3, '0')}-${c.slug}.md`;
    await writeFile(join(dir, name), header + c.body.replace(/\s*$/, '\n'));
  }
  console.log(`Đã sao lưu ${rows.length} chương (${editions.names[edition]}) vào ${dir}`);
}
