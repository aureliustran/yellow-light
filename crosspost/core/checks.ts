// Automatic checks on a converted chapter. The conversion is done by Claude,
// and an AI can quietly drop or "improve" a sentence, so before a converted
// version is saved this compares it with the Vercel chapter:
//
//   1. Every piece of story text outside the special blocks must appear in the
//      converted version, unchanged and in the same order. Only the markup
//      around it may change: translation markers, emoji and * may differ.
//   2. Every piece of text inside a block (chat messages, emails, notes, …)
//      must appear somewhere in the converted version.
//   3. Nothing the site cannot show may be left: ::: blocks, [[ ]] markers,
//      emoji, HTML tags. The footer links must not be there either: they are
//      added by code, so they are always exact.
//   4. The length must stay close to the original.
//   5. Per site (config "checks"): no line may start with a dash (TNO reads it
//      as dash-style dialogue), and the site's own save-time lint must pass.

export interface CheckReport {
  ok: boolean;
  missingProse: string[];
  missingBlock: string[];
  problems: string[];
  ratio: number;
  lint?: LintReport;
}

export interface CheckOptions {
  noDashLines?: boolean;
  lint?: { maxPerThousand: number };
}

export interface LintReport {
  words: number;
  emDash: number;
  spaceBefore: number;
  lowerAfterStop: number;
  perThousand: number;
  examples: string[];
}

// The same three counts truyennhaong.vn makes when "Lưu" is pressed
// (/js/office-text-lint.js, OfficeTextLint.checkForSave): "—", a space before
// , . ! ?, and a lowercase letter after . ! ? plus spaces. Each text node is
// checked on its own, so it runs per line. Above the site's threshold the
// editor refuses to save, so a conversion that fails here cannot be posted.
export function formatLint(text: string): LintReport {
  const r: LintReport = { words: 0, emDash: 0, spaceBefore: 0, lowerAfterStop: 0, perThousand: 0, examples: [] };
  const plain = text.replace(/\r\n?/g, '\n').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*/g, '');
  const ex = (line: string, i: number) => {
    if (r.examples.length < 8) r.examples.push(line.slice(Math.max(0, i - 25), i + 20).trim());
  };
  for (const line of plain.split('\n')) {
    if (!line.trim()) continue;
    for (const m of line.matchAll(/—/g)) { r.emDash++; ex(line, m.index!); }
    for (const m of line.matchAll(/ ([,.!?])/g)) { r.spaceBefore++; ex(line, m.index!); }
    for (const m of line.matchAll(/([.!?])(\s+)(\p{Ll})/gu)) { r.lowerAfterStop++; ex(line, m.index!); }
  }
  const trimmed = plain.trim();
  r.words = trimmed ? trimmed.split(/\s+/).length : 0;
  const errors = r.emDash + r.spaceBefore + r.lowerAfterStop;
  r.perThousand = r.words ? Math.round((errors / r.words) * 10000) / 10 : 0;
  return r;
}

const EMOJI = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}️‍⃣]/gu;
const INLINE_TR = /\[\[(?:en|ht):[\s\S]*?\]\]/g;
const GAP = '\u0000';

// Same spelling for both sides: quotes, dashes, spaces and * do not count.
export function norm(s: string): string {
  return s
    .normalize('NFC')
    .replace(/[“”„‟«»]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Text that must survive, cut at every spot where the markup may change.
function chunks(line: string): string[] {
  return line
    .replace(INLINE_TR, GAP)
    .replace(EMOJI, GAP)
    .replace(/\[[x~ ]\]/gi, GAP)
    .replace(/\|/g, GAP)
    .split(GAP)
    .map(norm)
    .filter((c) => c.replace(/[^\p{L}\p{N}]/gu, '').length >= 2);
}

// Line prefixes that only say how a block line is drawn.
function stripBlockPrefix(line: string): string {
  return line
    .replace(/^\s*[>^~]\s?/, '') // chat: sent, quoted, note
    .replace(/^\s*\$\s/, '') // ide: shell command
    .replace(/^\s*\d{1,2}:\d{2}\s{2,}/, '') // notifications: "09:00  "
    .replace(/^\s*[-*+]\s+/, '') // list item
    .replace(/^\s*\[[x~ ]\]\s*/i, ''); // sheet row state
}

export function sourcePieces(body: string): { prose: string[]; block: string[] } {
  const prose: string[] = [];
  const block: string[] = [];
  let inBlock = false;
  for (const raw of body.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trimEnd();
    if (/^:::\w/.test(line)) {
      inBlock = true;
      // The block's title ("CLB Tin học – Ban điều hành", a file name, a time) must survive too.
      const title = line.replace(/^:::\w+\s*/, '').replace(/^(en|ht|ink)\b\s*/, '');
      block.push(...chunks(title));
      continue;
    }
    if (/^:::\s*$/.test(line)) {
      inBlock = false;
      continue;
    }
    if (!line.trim() || /^\s*(---|\|\|)\s*$/.test(line) || /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(line)) continue;
    if (inBlock) block.push(...chunks(stripBlockPrefix(line)));
    else prose.push(...chunks(line.replace(/^#+\s+/, '').replace(/^>\s?/, '').replace(/^\s*[-*+–—]\s+/, ''))); // list marker may change (TNO: • )
  }
  return { prose, block };
}

export function checkConversion(sourceBody: string, converted: string, opts: CheckOptions = {}): CheckReport {
  const problems: string[] = [];
  const out = norm(converted);
  const { prose, block } = sourcePieces(sourceBody);

  // 1. Story text, in order.
  const missingProse: string[] = [];
  let at = 0;
  for (const c of prose) {
    const i = out.indexOf(c, at);
    if (i < 0) missingProse.push(c);
    else at = i + c.length;
  }

  // 2. Block text, anywhere.
  const missingBlock = block.filter((c) => !out.includes(c));

  // 3. Leftovers.
  if (/^:::/m.test(converted)) problems.push('Còn khối ::: chưa chuyển');
  if (/\[\[(en|ht):/.test(converted)) problems.push('Còn dấu [[en: … ]] / [[ht: … ]] chưa chuyển');
  const emoji = converted.match(EMOJI);
  if (emoji) problems.push(`Còn emoji (trang đích sẽ xóa mất): ${[...new Set(emoji)].join(' ')}`);
  if (/<\/?[a-z][^>]*>/i.test(converted)) problems.push('Có thẻ HTML');
  if (/https?:\/\//i.test(converted)) problems.push('Có đường link: phần chân trang có link do code tự thêm, đừng viết vào bản chuyển');
  if (/^#\s/m.test(converted)) problems.push('Có dòng tiêu đề "# …": tiêu đề do code tự thêm');

  // 4. Length.
  const srcLen = norm(sourceBody.replace(INLINE_TR, (m) => m.replace(/\|\|/, ' ')).replace(/^:::.*$/gm, '')).length || 1;
  const ratio = out.length / srcLen;
  if (ratio < 0.85) problems.push(`Bản chuyển ngắn hơn hẳn bản gốc (${Math.round(ratio * 100)}%)`);
  if (ratio > 1.6) problems.push(`Bản chuyển dài hơn hẳn bản gốc (${Math.round(ratio * 100)}%)`);

  // 5. Per-site rules.
  if (opts.noDashLines) {
    const dashed = converted.split('\n').filter((l) => /^\s*[-–—]\s/.test(l));
    if (dashed.length) problems.push(`${dashed.length} dòng bắt đầu bằng gạch ngang (trang này đọc thành thoại kiểu gạch đầu dòng): dùng "• " cho danh sách. Ví dụ: "${dashed[0].slice(0, 60)}"`);
  }
  let lint: LintReport | undefined;
  if (opts.lint) {
    lint = formatLint(converted);
    if (lint.perThousand > opts.lint.maxPerThousand)
      problems.push(`Lỗi định dạng ${lint.perThousand}/1000 từ, trang đích chặn lưu khi quá ${opts.lint.maxPerThousand} (gạch dài ${lint.emDash}, cách trước dấu câu ${lint.spaceBefore}, thiếu viết hoa ${lint.lowerAfterStop}). Sửa ở bản gốc trên Vercel, không sửa trong bản chuyển.`);
  }

  if (missingProse.length) problems.push(`${missingProse.length} đoạn văn bị mất hoặc bị sửa`);
  if (missingBlock.length) problems.push(`${missingBlock.length} dòng trong khối (tin nhắn, email, ghi chú…) bị mất hoặc bị sửa`);

  return { ok: problems.length === 0, missingProse, missingBlock, problems, ratio: Math.round(ratio * 1000) / 1000, ...(lint ? { lint } : {}) };
}
