#!/usr/bin/env node
// Adds the translation markers from docs/ban-dich-de-xuat.md to the chapter
// files in content/import, so English and Hà Tĩnh lines become tappable.
//
//   npm run translations -- --dry-run   # show what would change
//   npm run translations                # edit content/import/*.md
//   npm run import -- --overwrite       # then push the edited files to the site
//
// How it works:
// - Each "## …" section of the list belongs to the chapter with that title.
// - Every [[en|ht: original || translation]] in backticks replaces each
//   occurrence of `original` in that chapter, longest first, as whole words,
//   never inside a marker that is already there, and never in the
//   "Chú thích giọng Hà Tĩnh" notes at the end of a chapter.
// - Each ```:::dich … ``` block replaces its original lines.
// Running it twice is safe: text already inside a marker is left alone.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseChapter } from './parse-chapter.mjs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const listPath = 'docs/ban-dich-de-xuat.md';
const folder = 'content/import';

const MARKER_RE = /\[\[(en|ht):[ \t]*((?:(?!\|\||\]\])[\s\S])+?)[ \t]*\|\|[ \t]*((?:(?!\]\])[\s\S])+?)[ \t]*\]\]/g;
const NOTES_RE = /^\*\*Chú thích giọng Hà Tĩnh\*\*/m;
const LETTER = /[\p{L}\p{N}]/u;

// ---- read the list ----------------------------------------------------------
const list = (await readFile(listPath, 'utf8')).replace(/\r\n?/g, '\n');
const sections = [];
for (const part of list.split(/^## /m).slice(1)) {
  const heading = part.slice(0, part.indexOf('\n')).trim();
  const title = heading.replace(/^Chương\s+\d+\s*[–:-]\s*/, '').trim();
  const blocks = [...part.matchAll(/```\n(:::dich (en|ht)\n([\s\S]*?)\n\|\|\n[\s\S]*?\n:::)\n```/g)].map((m) => ({
    kind: m[2],
    marker: m[1],
    original: m[3],
  }));
  const withoutBlocks = part.replace(/```[\s\S]*?```/g, '');
  const inline = [];
  for (const code of withoutBlocks.matchAll(/`([^`\n]+)`/g)) {
    for (const m of code[1].matchAll(MARKER_RE)) {
      if (!inline.some((x) => x.original === m[2])) inline.push({ kind: m[1], original: m[2], marker: m[0] });
    }
  }
  sections.push({ heading, title, inline, blocks });
}

// ---- helpers ----------------------------------------------------------------
// Ranges of [[…]] markers and :::dich blocks already in the text.
function protectedRanges(text) {
  const ranges = [];
  for (const m of text.matchAll(MARKER_RE)) ranges.push([m.index, m.index + m[0].length]);
  for (const m of text.matchAll(/^:::dich[\s\S]*?^:::$/gm)) ranges.push([m.index, m.index + m[0].length]);
  return ranges;
}
const inside = (ranges, a, b) => ranges.some(([s, e]) => a < e && b > s);

function replaceAllWhole(text, original, marker, limit) {
  let count = 0;
  let from = 0;
  for (;;) {
    const i = text.indexOf(original, from);
    if (i < 0 || i >= limit) break;
    const end = i + original.length;
    const before = text[i - 1] ?? '';
    const after = text[end] ?? '';
    const whole = !(LETTER.test(original[0]) && LETTER.test(before)) && !(LETTER.test(original.at(-1)) && LETTER.test(after));
    if (!whole || inside(protectedRanges(text), i, end)) {
      from = end;
      continue;
    }
    text = text.slice(0, i) + marker + text.slice(end);
    limit += marker.length - original.length;
    from = i + marker.length;
    count++;
  }
  return { text, count };
}

// ---- apply ------------------------------------------------------------------
const files = (await readdir(folder)).filter((f) => f.endsWith('.md')).sort();
const chapters = [];
for (const file of files) {
  const raw = await readFile(join(folder, file), 'utf8');
  chapters.push({ file, raw, eol: raw.includes('\r\n') ? '\r\n' : '\n', title: parseChapter(raw)?.title });
}

let totalChanges = 0;
const problems = [];
for (const s of sections) {
  const ch = chapters.find((c) => c.title?.toLowerCase() === s.title.toLowerCase());
  if (!ch) {
    if (s.inline.length || s.blocks.length) problems.push(`Không tìm thấy chương cho mục "${s.heading}"`);
    continue;
  }
  let text = ch.raw.replace(/\r\n?/g, '\n');
  const lines = [];

  for (const b of s.blocks) {
    if (text.includes(b.marker)) continue; // already applied
    const i = text.indexOf(b.original);
    if (i < 0 || inside(protectedRanges(text), i, i + b.original.length)) {
      problems.push(`${ch.file}: không thấy đoạn gốc của khối "${b.original.split('\n')[0]}"`);
      continue;
    }
    text = text.slice(0, i) + b.marker + text.slice(i + b.original.length);
    lines.push(`  khối ${b.kind}: ${b.original.split('\n')[0].slice(0, 60)}…`);
  }

  for (const m of [...s.inline].sort((a, b) => b.original.length - a.original.length)) {
    const notes = text.search(NOTES_RE);
    const limit = notes < 0 ? text.length : notes;
    const r = replaceAllWhole(text, m.original, m.marker, limit);
    text = r.text;
    const already = text.includes(m.marker);
    if (r.count) lines.push(`  ${m.kind} ×${r.count}: ${m.original.length > 70 ? m.original.slice(0, 67) + '…' : m.original}`);
    else if (!already) problems.push(`${ch.file}: không thấy "${m.original}"`);
  }

  if (lines.length) {
    console.log(`\n${ch.file} (${s.heading})`);
    console.log(lines.join('\n'));
    totalChanges += lines.length;
    if (!dryRun) await writeFile(join(folder, ch.file), text.replace(/\n/g, ch.eol));
  }
}

if (problems.length) {
  console.log('\nCần xem lại:');
  for (const p of problems) console.log(`  ! ${p}`);
}
console.log(
  dryRun
    ? `\nChạy thử: ${totalChanges} chỗ sẽ được đánh dấu. Chưa ghi gì.`
    : `\nXong: ${totalChanges} chỗ đã được đánh dấu. Tiếp theo: npm run import -- --overwrite`,
);
