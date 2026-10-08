#!/usr/bin/env node
// Turns the text-message passages in content/import into chat bubbles.
//
//   npm run chats -- --dry-run   # show what would change
//   npm run chats                # edit content/import/*.md
//   npm run import -- --overwrite
//
// In the chapter files a text message is a whole line in italics:
//   *\[Pickup tối T7 🏀\]*        group name → title of the chat box
//   *Vũ Béo: tối nay ra k m*      someone else's message (left bubble)
//   *đang đến*                    no name → see `dir` below
//
// Which italic lines are messages is listed by hand below, because the same
// look is also used for thoughts, notes, deleted drafts and remembered lines.
// Each entry: the first message line (exact text inside the asterisks), how
// many message lines follow (blank lines don't count), and whether unnamed
// lines are Thuyên's (`out`, right bubble) or someone else's (`in`).
// Running it twice is safe: converted lines are no longer in italics.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const folder = 'content/import';
const dryRun = process.argv.includes('--dry-run');

const PASSAGES = {
  '03-chuong-01-den-vang.md': [
    ['\\[CLB Tin học – Ban điều hành\\]', 6, 'in'],
    ['Vũ Béo: tối tính là mấy h, nói rõ ra thằng chó', 2, 'in'],
    ['bảo mấy đứa năm nhất mang nước, idol k tự mua nước', 1, 'out'],
  ],
  '05-chuong-03-tieng-dep.md': [['Mạ: Hôm đó nhớ mặc áo sơ mi trắng. Bỏ cái khuyên tai ra', 1, 'in']],
  '06-chuong-04-san-tro.md': [
    ['Vũ Béo: ra sân k m', 3, 'in'],
    ['Vũ Béo: đây là cái giá của việc chơi vs idol', 1, 'in'],
    ['idol k bảo hành quần', 2, 'out'],
  ],
  '08-chuong-06-ghe-da.md': [
    ['Thầy Bình: Thuyên ơi bản nháp đâu em? Mai thứ Sáu rồi đấy.', 1, 'in'],
    ['Vy: a ra sân dc k', 1, 'in'],
  ],
  '09-chuong-07-nguoi-duoc-hoi.md': [['anh Thuyên ơi em hỏi chút được k ạ', 4, 'in']],
  '10-chuong-08-san-khau.md': [
    ['\\[CLB Tin học – Ban điều hành\\]', 6, 'in'],
    ['công chúa hỏi câu triết học. t trả lời bằng tấu hài. 1-0', 1, 'out'],
    ['Vũ Béo: 1-0 cái đầu m', 1, 'in'],
  ],
  '12-chuong-09-den-san-khong-tat.md': [
    ['\\[Pickup tối T7 🏀\\]', 4, 'in'],
    ['đang đến. bảo bọn nó đứng nghiêm', 2, 'out'],
    // Not "con ăn rồi mạ…": that one is a draft he edits before sending.
  ],
  '13-chuong-10-nguoi-duoc-moi.md': [
    ['Ngọc Anh (K71): anh ơiiii em tưởng em chết rồi 😭', 2, 'in'],
    ['em làm thì em lên. anh lên làm gì', 6, 'out'],
  ],
  '14-chuong-11-tam-thiep.md': [
    ['anh phanh gấp', 4, 'in'],
    ['thiệp đấy chết rồi mà. mã bị hủy rồi', 1, 'out'],
    ['em biết. anh em hủy', 3, 'in'],
    ['Vũ Béo: trả đồ xong chưa', 2, 'in'],
    ['k. công chúa còn tự trả tiền trà đá', 2, 'out'],
    ['chủ nhật 25. 2h chiều', 2, 'in'],
    ['Vũ Béo: ê sao k trả lời. công chúa hay là dân', 1, 'in'],
    ['công chúa thuê t dạy ielts', 13, 'out'],
  ],
  '15-chuong-12-chu-toa.md': [
    ['Vũ Béo: ơ', 9, 'out'],
    ['Chủ tọa: Giấy chứng nhận của anh. Ban tổ chức gửi ạ.', 4, 'in'],
    ['em hỏi câu đấy để đánh đố hay vì em muốn biết', 1, 'out'],
    ['Chủ tọa: Cả hai. Chủ yếu là đánh đố.', 2, 'in'],
    ['hôm nay em làm anh ra khỏi sân', 3, 'out'],
    ['lần sau em ngồi ghế đại biểu, anh làm chủ tọa xem', 1, 'out'],
    ['Chủ tọa: Anh không đủ tư cách.', 1, 'in'],
    ['Chủ tọa: Nhưng em sẽ cho anh dự thính.', 1, 'in'],
    ['Vũ Béo: ảnh đồ ăn đâu', 2, 'in'],
    ['Vũ Béo: thế mà cũng phải đi derby', 9, 'out'],
    ['k', 8, 'out'],
    ['Vũ Béo: đm hai đứa trong một tuần', 6, 'out'],
  ],
  '16-chuong-13-buoi-hoc-dau.md': [
    ['Chủ tọa: Hôm nay anh làm gì?', 1, 'in'],
    ['đi dạy. kiếm tiền trà đá', 4, 'out'],
    ['học sinh khó dạy. nói như đi xe máy không xi nhan', 2, 'out'],
    ['Vũ Béo: ?', 14, 'out'],
  ],
};

// Messages Thuyên sends inside a sentence: "Thuyên gõ: *7h. im mồm đi vua hợi*".
// Each entry is the start of the paragraph and what happens to the words
// before the message: 'lead' keeps them as narration above the chat box
// ("Thuyên gõ:"), 'note' puts them inside the box as a small caption
// ("Với Đức:"). Chat boxes that end up next to each other are joined.
const INLINE = {
  '03-chuong-01-den-vang.md': [
    ['Thuyên trả lời Ngọc Anh: *', 'lead'],
    ['Với Đức: *', 'note'],
    ['Với Vũ: *', 'note'],
    ['Thuyên gõ: *', 'lead'],
    ['Rồi anh mở tin nhắn của Đức, gõ thêm: *', 'note'],
  ],
  '05-chuong-03-tieng-dep.md': [['Anh gõ: *dạ*', 'lead']],
};

// Replies: [start of the sent message, the message it answers, optional caption to drop].
// A "^ Name: text" line is put in front of the reply; the page draws it as a
// quoted message above the bubble, like "reply" in a messenger app.
const REPLIES = {
  '03-chuong-01-den-vang.md': [
    ['> ok trưa a xem', 'Ngọc Anh (K71): anh Thuyên ơi slide workshop tuần sau anh duyệt giúp em với ạ, em sửa theo góp ý của anh rồi á, nhưng phần demo em vẫn sợ sợ 🥲'],
    ['> ơ ai cho ông nhận hộ tôi thế', 'Đức (PCN): à Thuyên ơi, thầy Bình bảo cuối tuần sau ông lên phát biểu ở cái summit gì gì của bên tài trợ nhé, thầy forward mail cho ông rồi đấy', '~ Với Đức:'],
    ['> idol cc.', 'Vũ Béo: tối nay ra k m, mấy đứa năm nhất đòi gặp "idol" kìa vcl', '~ Với Vũ:'],
    ['> 7h. im mồm', 'Vũ Béo: tối tính là mấy h, nói rõ ra thằng chó'],
    ['> ok ông bảo thầy là tôi đi nhé', 'Đức (PCN): à Thuyên ơi, thầy Bình bảo cuối tuần sau ông lên phát biểu ở cái summit gì gì của bên tài trợ nhé, thầy forward mail cho ông rồi đấy'],
  ],
};

const ITALIC_LINE = /^\*(?!\*)(.+?)(?<!\*)\*$/;
const GROUP = /^\\\[(.+)\\\]$/;
const NAMED = /^([^:\n]{1,40}):\s+(.+)$/;

function toChat(messages, dir) {
  const blocks = [];
  let current = null;
  for (const m of messages) {
    const group = GROUP.exec(m);
    if (group) {
      current = { title: group[1].trim(), lines: [] };
      blocks.push(current);
      continue;
    }
    if (!current) {
      current = { title: '', lines: [] };
      blocks.push(current);
    }
    if (NAMED.test(m)) current.lines.push(m);
    else if (dir === 'out') current.lines.push(`> ${m}`);
    else current.lines.push(m);
  }
  return blocks.map((b) => [`:::chat${b.title ? ' ' + b.title : ''}`, ...b.lines, ':::'].join('\n')).join('\n\n');
}

let changed = 0;
const problems = [];
for (const [file, passages] of Object.entries(PASSAGES)) {
  const path = join(folder, file);
  const raw = await readFile(path, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const report = [];

  for (const [first, count, dir] of passages) {
    const starts = lines.flatMap((l, i) => (l.trim() === `*${first}*` ? [i] : []));
    if (starts.length === 0) {
      // Already converted, or the text changed
      const done = lines.some((l) => l.trim() === first || l.trim() === `> ${first}` || l.trim() === `:::chat ${GROUP.exec(first)?.[1]}`);
      if (!done) problems.push(`${file}: không thấy dòng "${first}"`);
      continue;
    }
    if (starts.length > 1) {
      problems.push(`${file}: dòng "${first}" xuất hiện ${starts.length} lần, bỏ qua`);
      continue;
    }
    const start = starts[0];
    const messages = [];
    let end = start;
    for (let i = start; i < lines.length && messages.length < count; i++) {
      const t = lines[i].trim();
      if (!t) continue;
      const m = ITALIC_LINE.exec(t);
      if (!m) break;
      messages.push(m[1].trim());
      end = i;
    }
    if (messages.length !== count) {
      problems.push(`${file}: "${first}" chỉ có ${messages.length}/${count} dòng tin nhắn liền nhau, bỏ qua`);
      continue;
    }
    lines.splice(start, end - start + 1, ...toChat(messages, dir).split('\n'));
    report.push(`  ${String(count).padStart(2)} tin · ${first.length > 60 ? first.slice(0, 57) + '…' : first}`);
  }

  for (const [prefix, mode] of INLINE[file] ?? []) {
    const at = lines.flatMap((l, i) => (l.startsWith(prefix) ? [i] : []));
    if (at.length !== 1) {
      if (at.length > 1) problems.push(`${file}: "${prefix}" xuất hiện ${at.length} lần, bỏ qua`);
      else if (!lines.some((l) => l.startsWith(prefix.replace(/ \*.*$/, '')))) problems.push(`${file}: không thấy "${prefix}"`);
      continue;
    }
    // Split the paragraph into narration and *messages*
    const parts = lines[at[0]].split(/\*([^*]+)\*/);
    if (parts.length < 3 || parts.at(-1).trim()) {
      problems.push(`${file}: "${prefix}" không kết thúc bằng tin nhắn, bỏ qua`);
      continue;
    }
    const chat = [];
    const out = [];
    parts.forEach((p, i) => {
      const t = p.trim();
      if (i % 2 === 1) chat.push(`> ${t}`);
      else if (t && i === 0 && mode === 'lead') out.push(t, '');
      else if (t) chat.push(`~ ${t}`);
    });
    out.push(':::chat', ...chat, ':::');
    lines.splice(at[0], 1, ...out);
    report.push(`  ${String(chat.filter((c) => c.startsWith('>')).length).padStart(2)} tin · ${prefix.slice(0, -3)}…`);
  }

  // Join chat boxes separated only by blank lines (the second one untitled)
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] !== ':::' || !lines.slice(0, i).reverse().find((l) => l.startsWith(':::'))?.startsWith(':::chat')) continue;
    let j = i + 1;
    while (j < lines.length && !lines[j].trim()) j++;
    if (lines[j] === ':::chat') lines.splice(i, j - i + 1);
  }

  // Quote the message each reply answers
  for (const [start, quote, drop] of REPLIES[file] ?? []) {
    const i = lines.findIndex((l) => l.startsWith(start));
    if (i < 0) {
      problems.push(`${file}: không thấy câu trả lời "${start}"`);
      continue;
    }
    if (lines[i - 1]?.startsWith('^')) continue; // already quoted
    const at = drop && lines[i - 1] === drop ? i - 1 : i; // the caption is replaced by the quote
    lines.splice(at, at === i ? 0 : 1, `^ ${quote}`);
    report.push(`  trả lời · ${quote.slice(0, 50)}…`);
  }

  if (report.length) {
    console.log(`\n${file}`);
    console.log(report.join('\n'));
    changed += report.length;
    if (!dryRun) await writeFile(path, lines.join('\n').replace(/\n/g, eol));
  }
}

if (problems.length) {
  console.log('\nCần xem lại:');
  for (const p of problems) console.log(`  ! ${p}`);
}
console.log(dryRun ? `\nChạy thử: ${changed} đoạn tin nhắn. Chưa ghi gì.` : `\nXong: ${changed} đoạn tin nhắn. Tiếp theo: npm run import -- --overwrite`);
