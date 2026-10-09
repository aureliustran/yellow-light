// Turns a chapter's Markdown into HTML. Used on the server for readers and in
// the browser for the admin preview, so both always look the same.
//
// Story extras on top of normal Markdown:
//
//   ---                         a scene break, drawn as a small traffic light
//
//   :::chat Group name          a block of text messages (group name optional):
//                               "Name: text" received, "> text" sent, "~ text" a small note
//   Ngọc Anh (K71): hello       a received message, with sender name
//   just text                   a received message without a name
//   > ok trưa a xem             a sent message (from the point-of-view character)
//   ^ Ngọc Anh: slide workshop… a quoted message; the next message replies to it
//   :::
//
//   :::email                    an email shown in full ("Từ:", "Đến:", "Chủ đề:" … then a blank line or ---, then the body)
//   :::editor file.md           a text editor window: the lines are shown as typed (translations allowed)
//   :::ide file.py              an IDE or terminal window (dark); lines starting "$ " are shell commands
//   :::note [ink] Title         a handwritten note; a list inside it is drawn as handwritten lines
//   :::phone [Title]           a note typed in a phone's Notes app: every line of the block is a line of the note
//   :::sheet File name          a spreadsheet: a Markdown table; start a row with [x] (done, green) or [~] (waiting, yellow);
//                               an empty cell or (trống) is a blank cell
//
//   [[en: original || bản dịch]]   an English phrase readers can tap to translate
//   [[ht: original || bản dịch]]   a Hà Tĩnh phrase readers can tap to translate
//
//   :::dich en                  a longer passage (en or ht) with a translation
//   Original paragraphs…
//   ||
//   Bản dịch…
//   :::
//
// Raw HTML typed into a chapter is shown as text, never run.

import { Marked, type Token, type Tokens, type TokenizerAndRendererExtension } from 'marked';

export type TranslationKind = 'en' | 'ht';

export const TRANSLATION_LABELS: Record<TranslationKind, { tag: string; name: string; lang: string }> = {
  en: { tag: 'EN', name: 'Tiếng Anh', lang: 'en' },
  ht: { tag: 'HT', name: 'Giọng Hà Tĩnh', lang: 'vi' },
};

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  );
}

// ───────────── Text messages ─────────────

interface ChatLine {
  out: boolean;
  note?: boolean;
  quote?: { name: string | null; tokens: Token[] };
  name: string | null;
  tokens: Tokens.Generic[];
}

const NAME_RE = /^([^:\n]{1,40}):\s+(.+)$/;

const chatExtension: TokenizerAndRendererExtension = {
  name: 'chat',
  level: 'block',
  start(src: string) {
    const m = /^:::chat/m.exec(src);
    return m ? m.index : undefined;
  },
  tokenizer(src: string) {
    const m = /^:::chat[ \t]*([^\n]*)\n([\s\S]*?)\n?:::[ \t]*(?:\n+|$)/.exec(src);
    if (!m) return undefined;
    const lines: ChatLine[] = [];
    let quote: ChatLine['quote'];
    for (const raw of m[2].split('\n')) {
      const l = raw.trim();
      if (!l) continue;
      if (l.startsWith('^')) {
        // "^ Name: text" — the quoted message the next line replies to
        const q = l.replace(/^\^\s?/, '');
        const named = NAME_RE.exec(q);
        quote = named
          ? { name: named[1].trim(), tokens: this.lexer.inlineTokens(named[2]) }
          : { name: null, tokens: this.lexer.inlineTokens(q) };
        continue;
      }
      if (l.startsWith('~')) {
        lines.push({ out: false, note: true, name: null, tokens: this.lexer.inlineTokens(l.replace(/^~\s?/, '')) });
        quote = undefined;
        continue;
      }
      const sent = l.startsWith('>');
      const named = sent ? null : NAME_RE.exec(l);
      lines.push({
        out: sent,
        name: named ? named[1].trim() : null,
        tokens: this.lexer.inlineTokens(sent ? l.replace(/^>\s?/, '') : named ? named[2] : l),
        ...(quote ? { quote } : {}),
      });
      quote = undefined;
    }
    return { type: 'chat', raw: m[0], title: m[1].trim(), lines };
  },
  renderer(token) {
    const lines = token.lines as ChatLine[];
    const title = token.title ? `<figcaption class="chat-title">${escapeHtml(token.title)}</figcaption>` : '';
    // Like a messenger app: consecutive messages from the same person are
    // grouped, and the name is shown only above the first one. A note line
    // ("~ Với Đức:") is a small caption between messages.
    const msgs = lines
      .map((l, i) => {
        const body = this.parser.parseInline(l.tokens);
        if (l.note) return `<p class="chat-note">${body}</p>`;
        const prev = lines[i - 1];
        const cont = !!prev && !prev.note && !l.quote && prev.out === l.out && prev.name === l.name;
        const name = l.name && !cont ? `<span class="msg-name">${escapeHtml(l.name)}</span>` : '';
        const quoted = l.quote
          ? `<div class="reply-quote"><span class="reply-head">Đã trả lời${l.quote.name ? ` <b>${escapeHtml(l.quote.name)}</b>` : ''}</span><span class="reply-text">${this.parser.parseInline(l.quote.tokens)}</span></div>`
          : '';
        return `<div class="msg ${l.out ? 'out' : 'in'}${cont ? ' cont' : ''}${quoted ? ' replying' : ''}">${name}${quoted}<p class="bubble">${body}</p></div>`;
      })
      .join('');
    return `<figure class="chat">${title}${msgs}</figure>\n`;
  },
};

// ───────────── Translations ─────────────

const INLINE_TR_RE = /^\[\[(en|ht):[ \t]*((?:(?!\|\||\]\])[\s\S])+?)[ \t]*\|\|[ \t]*((?:(?!\]\])[\s\S])+?)[ \t]*\]\]/;

const inlineTranslation: TokenizerAndRendererExtension = {
  name: 'translation',
  level: 'inline',
  start(src: string) {
    const i = src.search(/\[\[(en|ht):/);
    return i < 0 ? undefined : i;
  },
  tokenizer(src: string) {
    const m = INLINE_TR_RE.exec(src);
    if (!m) return undefined;
    return {
      type: 'translation',
      raw: m[0],
      kind: m[1] as TranslationKind,
      original: this.lexer.inlineTokens(m[2]),
      translated: this.lexer.inlineTokens(m[3]),
    };
  },
  renderer(token) {
    return trSpan(token.kind as TranslationKind, this.parser.parseInline(token.original), this.parser.parseInline(token.translated));
  },
};

// A span acting as a button (not a <button>) so long sentences can wrap
// across lines like normal text. translations.ts adds Enter/Space.
// No aria-label: screen readers read the phrase itself; #tr-hint on the
// page explains what pressing does.
function trSpan(kind: TranslationKind, origHtml: string, transHtml: string): string {
  const l = TRANSLATION_LABELS[kind];
  return (
    `<span class="tr tr-${kind}" role="button" tabindex="0" data-show="orig" aria-pressed="false" ` +
    `aria-describedby="tr-hint" title="${l.name} · bấm để xem bản dịch">` +
    `<span class="tr-orig" lang="${l.lang}">${origHtml}</span>` +
    `<span class="tr-trans" lang="vi">${transHtml}</span>` +
    `<span class="tr-tag" aria-hidden="true" data-orig="${l.tag}" data-trans="Dịch"></span>` +
    `</span>`
  );
}

const blockTranslation: TokenizerAndRendererExtension = {
  name: 'translationBlock',
  level: 'block',
  start(src: string) {
    const m = /^:::dich/m.exec(src);
    return m ? m.index : undefined;
  },
  tokenizer(src: string) {
    const m = /^:::dich[ \t]+(en|ht)[ \t]*\n([\s\S]*?)\n[ \t]*\|\|[ \t]*\n([\s\S]*?)\n?:::[ \t]*(?:\n+|$)/.exec(src);
    if (!m) return undefined;
    return {
      type: 'translationBlock',
      raw: m[0],
      kind: m[1] as TranslationKind,
      original: this.lexer.blockTokens(m[2].trim(), []),
      translated: this.lexer.blockTokens(m[3].trim(), []),
    };
  },
  renderer(token) {
    const kind = token.kind as TranslationKind;
    const l = TRANSLATION_LABELS[kind];
    return (
      `<div class="tr-block tr-${kind}" data-show="orig">` +
      `<div class="tr-orig" lang="${l.lang}">${this.parser.parse(token.original)}</div>` +
      `<div class="tr-trans" lang="vi">${this.parser.parse(token.translated)}</div>` +
      `<button type="button" class="tr-switch" aria-pressed="false">` +
      `<span class="tr-tag" aria-hidden="true">${l.tag}</span>` +
      `<span class="tr-switch-text" data-orig="Xem bản dịch" data-trans="Xem nguyên bản"></span>` +
      `<span class="visually-hidden">${l.name}</span>` +
      `</button></div>\n`
    );
  },
};

// ───────────── Documents shown inside the story ─────────────
// Emails, text editors and IDEs, handwritten notes and spreadsheets each get
// their own look, like chats do. Written as :::name … ::: blocks.

const TR_GLOBAL = new RegExp(INLINE_TR_RE.source.slice(1), 'g');

function fenced(name: string, src: string): { raw: string; title: string; body: string } | null {
  const m = new RegExp(`^:::${name}(?=[ \\t\\n])[ \\t]*([^\\n]*)\\n([\\s\\S]*?)\\n:::[ \\t]*(?:\\n+|$)`).exec(src);
  return m ? { raw: m[0], title: m[1].trim(), body: m[2] } : null;
}

const blockStart = (name: string) => (src: string) => {
  const m = new RegExp(`^:::${name}\\b`, 'm').exec(src);
  return m ? m.index : undefined;
};

// Email shown in full.
const EMAIL_SUBJECT = /^(chủ đề|tiêu đề|subject|re)$/i;
interface EmailRow { key: string; tokens: Token[] }

const emailExtension: TokenizerAndRendererExtension = {
  name: 'email',
  level: 'block',
  start: blockStart('email'),
  tokenizer(src: string) {
    const f = fenced('email', src);
    if (!f) return undefined;
    const lines = f.body.split('\n');
    const meta: EmailRow[] = [];
    let i = 0;
    for (; i < lines.length; i++) {
      const l = lines[i].trim();
      if (!l || l === '---') {
        i++;
        break;
      }
      const h = /^([^:\n]{1,20}):\s*(.*)$/.exec(l);
      if (!h) break;
      meta.push({ key: h[1].trim(), tokens: this.lexer.inlineTokens(h[2]) });
    }
    return { type: 'email', raw: f.raw, meta, body: this.lexer.blockTokens(lines.slice(i).join('\n').trim(), []) };
  },
  renderer(token) {
    const meta = token.meta as EmailRow[];
    const subject = meta.find((r) => EMAIL_SUBJECT.test(r.key));
    const rows = meta
      .filter((r) => r !== subject)
      .map((r) => `<div class="email-row"><dt>${escapeHtml(r.key)}</dt><dd>${this.parser.parseInline(r.tokens)}</dd></div>`)
      .join('');
    return (
      `<figure class="email"><div class="email-bar" aria-hidden="true"><span></span><span></span><span></span></div>` +
      (subject ? `<div class="email-subject">${this.parser.parseInline(subject.tokens)}</div>` : '') +
      (rows ? `<dl class="email-meta">${rows}</dl>` : '') +
      `<div class="email-body">${this.parser.parse(token.body)}</div></figure>\n`
    );
  },
};

// Text editor and IDE windows. Lines are shown as typed; the only markup is
// the tap-to-translate marker, so code with * or _ in it is never reformatted.
const LANGS: Record<string, string> = {
  md: 'Markdown', txt: 'Văn bản', py: 'Python', js: 'JavaScript', ts: 'TypeScript', go: 'Go', json: 'JSON',
  sql: 'SQL', sh: 'Shell', html: 'HTML', css: 'CSS', yml: 'YAML', yaml: 'YAML', java: 'Java', rs: 'Rust',
};

function codeText(text: string): string {
  let out = '';
  let last = 0;
  for (const m of text.matchAll(TR_GLOBAL)) {
    out += escapeHtml(text.slice(last, m.index)) + trSpan(m[1] as TranslationKind, escapeHtml(m[2]), escapeHtml(m[3]));
    last = m.index + m[0].length;
  }
  return out + escapeHtml(text.slice(last));
}

function codeLine(line: string, kind: 'editor' | 'ide', ext: string): string {
  const prompt = /^\$ ?/.exec(line);
  if (prompt) {
    return `<div class="code-line is-prompt"><span class="code-text"><span class="tok-prompt" aria-hidden="true">$ </span>${codeText(line.slice(prompt[0].length))}</span></div>`;
  }
  const isMd = ext === 'md' || kind === 'editor';
  const head = isMd && /^#{1,6}\s/.test(line);
  const bullet = isMd ? /^(\s*)([-*]|\d+\.)\s+/.exec(line) : null;
  const comment = !isMd && /^\s*(\/\/|#|--)/.test(line);
  const cls = head ? ' is-head' : comment ? ' is-comment' : '';
  const text = bullet
    ? `${escapeHtml(bullet[1])}<span class="tok-bullet">${escapeHtml(bullet[2])}</span> ${codeText(line.slice(bullet[0].length))}`
    : codeText(line);
  return `<div class="code-line${cls}"><span class="code-text">${text || ' '}</span></div>`;
}

function codeExtension(kind: 'editor' | 'ide'): TokenizerAndRendererExtension {
  return {
    name: kind,
    level: 'block',
    start: blockStart(kind),
    tokenizer(src: string) {
      const f = fenced(kind, src);
      if (!f) return undefined;
      return { type: kind, raw: f.raw, title: f.title, lines: f.body.split('\n') };
    },
    renderer(token) {
      // "file.md @20": the window starts at line 20 (the file goes on from an earlier window)
      const at = /\s@(\d+)$/.exec(String(token.title ?? ''));
      const title = String(token.title ?? '').replace(/\s@\d+$/, '');
      const start = at ? Math.max(1, Number(at[1])) : 1;
      const ext = /\.([a-z0-9]+)$/i.exec(title)?.[1].toLowerCase() ?? '';
      const lines = (token.lines as string[]).map((l) => codeLine(l, kind, ext)).join('');
      const lang = LANGS[ext];
      return (
        `<figure class="code code-${kind}">` +
        `<div class="code-bar"><span class="code-dots" aria-hidden="true"><span></span><span></span><span></span></span>` +
        `<figcaption class="code-tab">${escapeHtml(title || (kind === 'ide' ? 'Terminal' : 'Không tên'))}</figcaption></div>` +
        `<div class="code-body"${start > 1 ? ` style="counter-reset: ln ${start - 1}"` : ''}>${lines}</div>` +
        (kind === 'ide' && lang ? `<div class="code-status" aria-hidden="true"><span>${lang}</span><span>UTF-8</span></div>` : '') +
        `</figure>\n`
      );
    },
  };
}

// Handwritten note. `ink` is a note in the margin of a book, no paper.
const noteExtension: TokenizerAndRendererExtension = {
  name: 'note',
  level: 'block',
  start: blockStart('note'),
  tokenizer(src: string) {
    const f = fenced('note', src);
    if (!f) return undefined;
    let title = f.title;
    const v = /^ink\b\s*/i.exec(title);
    if (v) title = title.slice(v[0].length);
    return { type: 'note', raw: f.raw, ink: !!v, title, body: this.lexer.blockTokens(f.body.trim(), []) };
  },
  renderer(token) {
    const title = token.title ? `<figcaption class="note-title">${escapeHtml(String(token.title))}</figcaption>` : '';
    return `<figure class="note${token.ink ? ' note-ink' : ''}">${title}<div class="note-body">${this.parser.parse(token.body)}</div></figure>\n`;
  },
};

// A note typed in a phone's notes app (an optional title, then the lines as typed).
const phoneExtension: TokenizerAndRendererExtension = {
  name: 'phone',
  level: 'block',
  start: blockStart('phone'),
  tokenizer(src: string) {
    const f = fenced('phone', src);
    if (!f) return undefined;
    const lines = f.body.replace(/\s+$/, '').split('\n').map((l) => ({
      blank: !l.trim(),
      tokens: l.trim() ? this.lexer.inlineTokens(l.trim()) : [],
    }));
    return { type: 'phone', raw: f.raw, title: f.title, lines };
  },
  renderer(token) {
    const title = token.title ? `<figcaption class="phone-title">${escapeHtml(String(token.title))}</figcaption>` : '';
    const lines = (token.lines as { blank: boolean; tokens: Token[] }[])
      .map((l) => (l.blank ? '<p class="gap"></p>' : `<p>${this.parser.parseInline(l.tokens)}</p>`))
      .join('');
    return `<figure class="phone"><div class="phone-bar" aria-hidden="true"><span>‹ Ghi chú</span><span>···</span></div><div class="phone-body">${title}${lines}</div></figure>\n`;
  },
};

// Spreadsheet: a Markdown table with column letters and row numbers.
const ROW_MARK = /^\[(x|~|!)\][ \t]*/i;
const ROW_CLASS: Record<string, string> = { x: 'is-done', '~': 'is-wait', '!': 'is-flag' };

interface SheetCell { blank: boolean; tokens: Token[]; align: string | null }
interface SheetData { header: SheetCell[]; rows: { cls: string; cells: SheetCell[] }[] }

const sheetExtension: TokenizerAndRendererExtension = {
  name: 'sheet',
  level: 'block',
  start: blockStart('sheet'),
  tokenizer(src: string) {
    const f = fenced('sheet', src);
    if (!f) return undefined;
    const t = this.lexer.blockTokens(f.body.trim(), []).find((x) => x.type === 'table') as Tokens.Table | undefined;
    const cell = (text: string, i: number): SheetCell => {
      const blank = !text.trim() || /^\(trống\)$/i.test(text.trim());
      return { blank, tokens: blank ? [] : this.lexer.inlineTokens(text), align: t?.align[i] ?? null };
    };
    const data: SheetData | null = t
      ? {
          header: t.header.map((c, i) => cell(c.text, i)),
          rows: t.rows.map((row) => {
            const mark = ROW_MARK.exec(row[0]?.text ?? '');
            return {
              cls: mark ? ROW_CLASS[mark[1].toLowerCase()] : '',
              cells: row.map((c, i) => cell(i === 0 && mark ? c.text.slice(mark[0].length) : c.text, i)),
            };
          }),
        }
      : null;
    return { type: 'sheet', raw: f.raw, title: f.title, data };
  },
  renderer(token) {
    const title = String(token.title ?? '');
    const bar = `<div class="sheet-bar"><span class="sheet-icon" aria-hidden="true"></span><figcaption class="sheet-name">${escapeHtml(title || 'Bảng tính')}</figcaption></div>`;
    const d = token.data as SheetData | null;
    if (!d) return `<figure class="sheet">${bar}</figure>\n`;
    const cell = (c: SheetCell, tag: 'th' | 'td') => {
      const attrs = `${c.blank ? ' class="blank"' : ''}${c.align ? ` style="text-align:${c.align}"` : ''}`;
      return `<${tag}${attrs}>${c.blank ? '' : this.parser.parseInline(c.tokens)}</${tag}>`;
    };
    const cols = d.header.map((_, i) => `<th scope="col">${String.fromCharCode(65 + (i % 26))}</th>`).join('');
    const body = d.rows
      .map((row, r) => `<tr${row.cls ? ` class="${row.cls}"` : ''}><th scope="row" class="rownum">${r + 2}</th>${row.cells.map((c) => cell(c, 'td')).join('')}</tr>`)
      .join('');
    return (
      `<figure class="sheet">${bar}<div class="sheet-scroll" tabindex="0" role="region" aria-label="Bảng tính ${escapeHtml(title)}">` +
      `<table class="sheet-table"><thead><tr class="sheet-cols"><th></th>${cols}</tr>` +
      `<tr class="sheet-head"><th scope="row" class="rownum">1</th>${d.header.map((c) => cell(c, 'th')).join('')}</tr></thead>` +
      `<tbody>${body}</tbody></table></div></figure>\n`
    );
  },
};

// ───────────── Renderer ─────────────

const marked = new Marked({
  gfm: true,
  breaks: false,
  extensions: [
    chatExtension,
    emailExtension,
    codeExtension('editor'),
    codeExtension('ide'),
    noteExtension,
    phoneExtension,
    sheetExtension,
    blockTranslation,
    inlineTranslation,
  ],
  renderer: {
    hr() {
      return '<div class="scene-break" role="separator" aria-label="Ngắt cảnh"><span></span><span class="lit"></span><span></span></div>\n';
    },
    html(token: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(token.text);
    },
  },
});

export function renderMarkdown(md: string): string {
  return marked.parse(md ?? '', { async: false }) as string;
}

// Keep only the original side of translation markers.
export function stripTranslations(md: string): string {
  return (md ?? '')
    .replace(/^:::dich[ \t]+(?:en|ht)[ \t]*\n([\s\S]*?)\n[ \t]*\|\|[ \t]*\n[\s\S]*?\n?:::[ \t]*$/gm, '$1')
    .replace(/\[\[(?:en|ht):[ \t]*([\s\S]+?)[ \t]*\|\|[\s\S]+?\]\]/g, '$1');
}

// Plain-text preview of a chapter, for share cards and search results.
export function excerpt(md: string, max = 160): string {
  const text = stripTranslations(md)
    .replace(/^:::(?:chat|email|editor|ide|note|phone|sheet)\b[\s\S]*?^:::\s*$/gm, ' ')
    .replace(/^\s*(---|\*\*\*|___)\s*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 20)).trimEnd() + '…';
}

// Problems the admin editor warns about before saving.
export function findMarkupProblems(md: string): string[] {
  const problems: string[] = [];
  const src = md ?? '';
  const lineOf = (i: number) => src.slice(0, i).split('\n').length;

  const inlineStart = /\[\[(en|ht):/g;
  let m: RegExpExecArray | null;
  while ((m = inlineStart.exec(src))) {
    if (!INLINE_TR_RE.test(src.slice(m.index))) {
      problems.push(`Dòng ${lineOf(m.index)}: bản dịch [[${m[1]}: …]] thiếu "||" hoặc "]]".`);
    }
  }
  const bad = /\[\[(?!en:|ht:)[a-z]{1,4}:/g;
  while ((m = bad.exec(src))) {
    problems.push(`Dòng ${lineOf(m.index)}: chỉ dùng [[en: …]] hoặc [[ht: …]].`);
  }

  const blockOpen = /^:::(chat|dich|email|editor|ide|note|phone|sheet)\b[^\n]*$/gm;
  while ((m = blockOpen.exec(src))) {
    const rest = src.slice(m.index + m[0].length);
    const close = /^:::[ \t]*$/m.exec(rest);
    if (!close) {
      problems.push(`Dòng ${lineOf(m.index)}: khối :::${m[1]} chưa có dòng ":::" để đóng.`);
      continue;
    }
    if (m[1] === 'sheet' && !/^\s*\|?\s*:?-{3,}/m.test(rest.slice(0, close.index))) {
      problems.push(`Dòng ${lineOf(m.index)}: khối :::sheet cần một bảng Markdown (hàng tiêu đề, hàng | --- |, các hàng dữ liệu).`);
    }
    if (m[1] === 'dich') {
      if (!/^:::dich[ \t]+(en|ht)[ \t]*$/.test(m[0])) {
        problems.push(`Dòng ${lineOf(m.index)}: viết ":::dich en" hoặc ":::dich ht".`);
      }
      if (!/^[ \t]*\|\|[ \t]*$/m.test(rest.slice(0, close.index))) {
        problems.push(`Dòng ${lineOf(m.index)}: khối :::dich cần một dòng "||" giữa nguyên bản và bản dịch.`);
      }
    }
  }
  return problems;
}
