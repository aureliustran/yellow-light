#!/usr/bin/env node
// Turns the documents that appear inside the story into their own blocks
// (spreadsheet, handwritten note, text editor, terminal) in content/import.
//
//   npm run blocks -- --dry-run   # show what would change
//   npm run blocks                # edit content/import/*.md
//   npm run import -- --overwrite
//
// In the chapter files these documents are plain italic lines, which look like
// thoughts and messages. The look-alikes are listed by hand below, because
// only the writer knows which italic lines are, say, spreadsheet rows.
// Each entry names where the passage starts and ends (the beginning of the
// first and last line), and what it should become:
//
//   sheet   lines "A – B – C" become rows of a table (:::sheet), `marks` colours
//           each row: x done (green), ~ waiting (yellow), '' none
//   note    lines become a handwritten note; `ink: true` is a margin note
//   editor  lines are shown as typed in a text editor window (:::editor)
//   ide     lines are shown in an IDE or terminal window (:::ide)
//   replace exact text swapped for other text
//
// Running it twice is safe: a passage that was already converted no longer
// starts with its italic line, so it is skipped.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const folder = 'content/import';
const dryRun = process.argv.includes('--dry-run');

const SHEET_HEAD = ['Giờ', 'Hạng mục', 'Địa điểm', 'Trang phục', 'Ghi chú'];
const SHEET_NAME = 'Valentine_2027_v4_FINAL';

const BLOCKS = {
  '28-chuong-26-bang-tinh.md': [
    {
      type: 'sheet',
      title: SHEET_NAME,
      header: SHEET_HEAD,
      from: '*09:00 – Đón',
      to: '*22:00 – Kết thúc.*',
      marks: ['x', 'x', '', '~', 'x', 'x', 'x'],
    },
    {
      type: 'replace',
      from: '*ô này trắng. c quên hay c để cho e*',
      to: ':::chat\n> ô này trắng. c quên hay c để cho e\n:::',
    },
    {
      // she types into the blank cell of the 12:00 row, then colours it green
      type: 'sheet',
      title: SHEET_NAME,
      header: SHEET_HEAD,
      from: '*Bún riêu. Quảng Bá.*',
      to: '*Bún riêu. Quảng Bá.*',
      rows: [['12:00', 'Ăn trưa', 'Bún riêu. Quảng Bá.', '', '']],
      marks: ['x'],
    },
    {
      type: 'note',
      from: '*BIÊN BẢN PHIÊN HỌP SỐ 01*',
      to: '*Đại diện Bên B: ……………………*',
      titleFromFirst: true,
      itemPattern: /^(Điều \d+\.)\s+(.*)$/,
    },
    {
      // the last row of the sheet, before she clears it
      type: 'sheet',
      title: SHEET_NAME,
      header: SHEET_HEAD,
      from: '*22:00 – Kết thúc.*',
      to: '*22:00 – Kết thúc.*',
      marks: ['x'],
    },
  ],
  '29-chuong-27-nhiet-ke.md': [
    {
      type: 'note',
      title: '',
      from: '*nhiệt kế (điện tử, kẹp nách',
      to: '*kế hoạch B: cháo trên app',
      allItems: true,
    },
    {
      type: 'sheet',
      title: 'Chi_phi_cham_soc_26.2',
      header: ['Hạng mục', 'Số lượng', 'Đơn giá', 'Thành tiền', 'Ghi chú'],
      align: ['---', '---:', '---:', '---:', '---'],
      from: '*Cháo (mua) – 2 hộp',
      to: '*Tổng: 326.000',
    },
    {
      // the cell fills in letter by letter while he watches
      type: 'sheet',
      title: 'Chi_phi_cham_soc_26.2',
      header: ['Hạng mục', 'Số lượng', 'Đơn giá', 'Thành tiền', 'Ghi chú'],
      align: ['---', '---:', '---:', '---:', '---'],
      from: '*Thông qua cả ba trang. Không cần đọc.*',
      to: '*Thông qua cả ba trang. Không cần đọc.*',
      rows: [['Một đêm không ngủ', '1', '', '', 'Thông qua cả ba trang. Không cần đọc.']],
    },
  ],
  '30-chuong-28-giao-trinh.md': [
    {
      // a note in the margin of the textbook, not a text message
      type: 'replace',
      from: ':::chat\n> tiền = thứ mọi người cùng đồng ý là có giá. (giống điểm IELTS)\n:::',
      to: ':::note ink\ntiền = thứ mọi người cùng đồng ý là có giá. (giống điểm IELTS)\n:::',
    },
    {
      type: 'ide',
      title: 'Terminal',
      from: '*mkdir interplanetaryExchange*',
      to: '*mkdir interplanetaryExchange*',
      lines: ['$ mkdir interplanetaryExchange'],
    },
    {
      type: 'replace',
      from: "Anh gõ commit cuối cùng: *wip: time is relative. money isn't. giving up.* Đẩy lên. Đóng laptop.",
      to: 'Anh gõ commit cuối cùng.\n\n:::ide Terminal\n$ git commit -m "wip: time is relative. money isn\'t. giving up."\n$ git push\n:::\n\nĐóng laptop.',
    },
  ],
  '31-chuong-29-cham-xanh.md': [
    {
      type: 'editor',
      title: 'as_the_crow_flies_v0.md',
      from: '*# Problem*',
      to: '*Thiên Nhãn already detects every rooftop',
    },
    {
      type: 'editor',
      title: 'as_the_crow_flies_v0.md @20', // the Market section sits between, so the file goes on at line 20
      from: '*# Limitations*',
      to: '*- → Last 50m needs onboard sensing',
    },
  ],
};

const unwrap = (l) => l.trim().replace(/^\*(?!\*)(.+?)(?<!\*)\*$/, '$1');
const cell = (s) => s.replace(/\|/g, '\\|').trim();

function build(op, src) {
  const text = src.map(unwrap);
  if (op.type === 'sheet') {
    const rows = op.rows ?? text.filter(Boolean).map((l) => {
      const total = /^Tổng:\s*(.*)$/.exec(l);
      if (total) return ['**Tổng**', '', '', `**${total[1]}**`, ''];
      return l.split(' – ');
    });
    const n = op.header.length;
    const out = [`:::sheet ${op.title}`, `| ${op.header.join(' | ')} |`, `| ${(op.align ?? op.header.map(() => '---')).join(' | ')} |`];
    rows.forEach((r, i) => {
      const cells = Array.from({ length: n }, (_, j) => cell(r[j] ?? ''));
      const mark = op.marks?.[i] ? `[${op.marks[i]}] ` : '';
      out.push(`| ${mark}${cells[0]} | ${cells.slice(1).join(' | ')} |`);
    });
    return [...out, ':::'];
  }
  if (op.type === 'note') {
    const lines = text.filter(Boolean);
    const title = op.titleFromFirst ? lines.shift() : op.title ?? '';
    const out = [`:::note${op.ink ? ' ink' : ''}${title ? ` ${title}` : ''}`];
    let prev = null; // 'item' or 'text'
    for (const l of lines) {
      const item = op.allItems ? [null, null, l] : op.itemPattern?.exec(l);
      const kind = item ? 'item' : 'text';
      if (prev && (kind === 'text' || prev === 'text')) out.push('');
      out.push(item ? (op.allItems ? `- ${l}` : `- **${item[1]}** ${item[2]}`) : l);
      prev = kind;
    }
    return [...out, ':::'];
  }
  if (op.type === 'editor' || op.type === 'ide') {
    return [`:::${op.type} ${op.title}`, ...(op.lines ?? text), ':::'];
  }
  throw new Error(`Unknown block type ${op.type}`);
}

const files = (await readdir(folder)).filter((f) => f.endsWith('.md')).sort();
const problems = [];
let changed = 0;

for (const file of files) {
  const ops = BLOCKS[file];
  if (!ops) continue;
  const path = join(folder, file);
  const raw = await readFile(path, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let md = raw.replace(/\r\n?/g, '\n');
  const report = [];

  for (const op of ops) {
    if (op.type === 'replace') {
      if (!md.includes(op.from)) continue; // already done
      md = md.replace(op.from, () => op.to);
      report.push(`  thay: ${op.from.split('\n')[0].slice(0, 60)}`);
      continue;
    }
    const lines = md.split('\n');
    const a = lines.findIndex((l) => l.startsWith(op.from));
    if (a < 0) continue; // already done (or not in this chapter version)
    const b = lines.findIndex((l, i) => i >= a && l.startsWith(op.to));
    if (b < 0) {
      problems.push(`${file}: không thấy dòng kết thúc "${op.to}"`);
      continue;
    }
    const src = lines.slice(a, b + 1);
    const block = build(op, src);
    lines.splice(a, b - a + 1, ...block);
    md = lines.join('\n');
    report.push(`  ${op.type.padEnd(6)} ${src.filter((l) => l.trim()).length} dòng · ${op.title ?? op.from.slice(0, 40)}`);
  }

  if (report.length) {
    console.log(`\n${file}`);
    console.log(report.join('\n'));
    changed += report.length;
    if (!dryRun) await writeFile(path, md.replace(/\n/g, eol));
  }
}

if (problems.length) {
  console.log('\nCần xem lại:');
  for (const p of problems) console.log(`  ! ${p}`);
}
console.log(dryRun ? `\nChạy thử: ${changed} đoạn. Chưa ghi gì.` : `\nXong: ${changed} đoạn. Tiếp theo: npm run translations, rồi npm run import -- --overwrite`);
