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
    const kind = token.kind as TranslationKind;
    const l = TRANSLATION_LABELS[kind];
    // A span acting as a button (not a <button>) so long sentences can wrap
    // across lines like normal text. translations.ts adds Enter/Space.
    // No aria-label: screen readers read the phrase itself; #tr-hint on the
    // page explains what pressing does.
    return (
      `<span class="tr tr-${kind}" role="button" tabindex="0" data-show="orig" aria-pressed="false" ` +
      `aria-describedby="tr-hint" title="${l.name} · bấm để xem bản dịch">` +
      `<span class="tr-orig" lang="${l.lang}">${this.parser.parseInline(token.original)}</span>` +
      `<span class="tr-trans" lang="vi">${this.parser.parseInline(token.translated)}</span>` +
      `<span class="tr-tag" aria-hidden="true" data-orig="${l.tag}" data-trans="Dịch"></span>` +
      `</span>`
    );
  },
};

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

// ───────────── Renderer ─────────────

const marked = new Marked({
  gfm: true,
  breaks: false,
  extensions: [chatExtension, blockTranslation, inlineTranslation],
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
    .replace(/^:::chat[\s\S]*?^:::\s*$/gm, ' ')
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

  const blockStart = /^:::(chat|dich)\b[^\n]*$/gm;
  while ((m = blockStart.exec(src))) {
    const rest = src.slice(m.index + m[0].length);
    const close = /^:::[ \t]*$/m.exec(rest);
    if (!close) {
      problems.push(`Dòng ${lineOf(m.index)}: khối :::${m[1]} chưa có dòng ":::" để đóng.`);
      continue;
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
