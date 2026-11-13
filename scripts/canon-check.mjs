#!/usr/bin/env node
// canon:check v1 — bộ chạy luật cho content/ (xem content/de-xuat/kien-truc-framework.md §12).
// Không phụ thuộc gói ngoài. Quét content/**/*.md, chạy luật, sinh view.
//
//   node scripts/canon-check.mjs                    chạy mọi luật + sinh view
//   node scripts/canon-check.mjs --law resolve      chỉ một luật (khớp theo đuôi id)
//   node scripts/canon-check.mjs --target config    chỉ file dưới một đường dẫn
//   node scripts/canon-check.mjs --no-write         không ghi view
//   node scripts/canon-check.mjs --strict           cảnh báo cũng làm lệnh thất bại
//
// Luật cấu trúc ở đây là mã; B3+ chuyển thành file LAW.check.*.md trong content/rules/check/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');

// ---------- cấu hình ----------
// Thư mục đã chuyển sang khuôn mới: lỗi là error. Ngoài danh sách này (legacy) chỉ là warn.
const MIGRATED = ['config', 'schemas', 'guidelines', 'docs', 'world', 'core', 'storylines', 'storage', 'info'];
const MIGRATED_FILES = ['GUIDELINES.md'];
// Không quét, hoặc không sinh cạnh.
const SKIP_DIRS = new Set(['.obsidian', '_views', '_archive', 'node_modules', '.git']);
const GENERATED = new Set(['symbols.md']);
// Thư mục mà liên kết treo không bị báo (tư liệu cũ).
const RESOLVE_EXEMPT = ['assets', 'kho'];
const PHASES = ['OPEN', 'P1', 'P2', 'BREAK', 'AFTER', 'POST'];
// Trường bắt buộc theo kind: đọc từ content/schemas/*.md (`entity`, `required`, `required-one-of`).
// Chỉ `schema` được khai sẵn ở đây để tự kiểm chính các file schema.
const REQUIRED_BY_KIND = { schema: ['id', 'kind', 'entity', 'status', 'updated', 'required'] };
const REQUIRED_ONE_OF = {};
const listProp = (v) => (v ? v.replace(/^\[|\]$/g, '').split(',').map((x) => x.trim()).filter(Boolean) : []);
const STATUSES = new Set(['page', 'locked', 'delegated', 'agreed', 'proposed', 'draft', 'raw', 'superseded', 'conflict', 'needs-decision']);
const STABILITY = { page: 6, locked: 5, delegated: 5, agreed: 4, proposed: 3, draft: 2, raw: 1, superseded: 0 };

// ---------- đối số ----------
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const FLAG = (name) => args.includes(name);
const ONLY_LAW = opt('--law');
const ONLY_TARGET = opt('--target');
const WRITE = !FLAG('--no-write');
const STRICT = FLAG('--strict');

// ---------- quét ----------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.md')) out.push(path.join(dir, e.name));
  }
  return out;
}

function splitFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: null, body: text, bodyStart: 0 };
  return { fm: m[1], body: text.slice(m[0].length), bodyStart: m[0].split('\n').length - 1 };
}

function parseFm(raw) {
  const props = {};
  if (!raw) return props;
  const lines = raw.split(/\r?\n/);
  let key = null;
  for (const line of lines) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) { key = kv[1]; props[key] = kv[2].trim(); continue; }
    const li = line.match(/^\s+-\s+(.*)$/);
    if (li && key) props[key] = (props[key] ? props[key] + ', ' : '') + li[1].trim();
  }
  return props;
}

const LINK_RE = /\[\[([^\]\n]+?)\]\]/g;
function parseLinkTarget(inner) {
  // bỏ khối giọng [[ht: … || …]] và nhãn [[CẦN CHỐT: …]] — không phải wikilink
  if (/^\s*[^\]|]*:\s/.test(inner) || inner.includes('||')) return null;
  const noAlias = inner.split('|')[0];
  const [target, heading] = noAlias.split('#');
  const t = target.trim();
  if (!t) return null;
  return { target: t, heading: heading ? heading.trim() : null, alias: inner.includes('|') };
}

function stripCode(body) {
  // thay code block và inline code bằng khoảng trắng cùng độ dài dòng để giữ số dòng
  return body
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));
}

const DOCS = path.join(ROOT, 'docs');
const files = [...walk(CONTENT).filter((p) => !GENERATED.has(path.relative(CONTENT, p).replace(/\\/g, '/'))), ...walk(DOCS)];
const items = files.map((abs) => {
  // content/ → đường dẫn tính từ content/; docs/ → giữ tiền tố docs/ (top = 'docs')
  const inDocs = abs.startsWith(DOCS + path.sep);
  const rel = (inDocs ? path.relative(ROOT, abs) : path.relative(CONTENT, abs)).replace(/\\/g, '/');
  const text = fs.readFileSync(abs, 'utf8');
  const { fm, body, bodyStart } = splitFrontmatter(text);
  const props = parseFm(fm);
  const base = path.basename(rel, '.md');
  const top = inDocs ? 'docs' : rel.includes('/') ? rel.split('/')[0] : '(root)';
  const id = props.id || (base === 'README' || top === 'posts' ? rel.replace(/\.md$/, '') : base);
  const title = (body.match(/^#\s+(.+)$/m) || [null, base])[1].trim();
  return { abs, rel, text, fm, body, bodyStart, props, base, top, id, title, hasFm: fm !== null };
});

for (const it of items) {
  if (it.props.kind !== 'schema' || !it.props.entity) continue;
  REQUIRED_BY_KIND[it.props.entity] = listProp(it.props.required);
  const one = listProp(it.props['required-one-of']);
  if (one.length) REQUIRED_ONE_OF[it.props.entity] = one;
}

// ---------- bảng tra ----------
const byKey = new Map(); // khóa → [item]
function reg(key, it) { if (!key) return; (byKey.get(key) || byKey.set(key, []).get(key)).push(it); }
for (const it of items) {
  reg(it.base, it); reg(it.id, it); reg(it.rel.replace(/\.md$/, ''), it);
  const al = (it.props.aliases || '').replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean);
  for (const a of al) reg(a, it);
}
function resolve(target) {
  const direct = byKey.get(target);
  if (direct) return [...new Set(direct)];
  // khớp theo đuôi đường dẫn: lib/style/x ↔ content/lib/style/x.md
  const hits = items.filter((it) => it.rel.replace(/\.md$/, '').endsWith('/' + target) || it.rel.replace(/\.md$/, '') === target);
  return hits;
}
const migrated = (it) => MIGRATED.includes(it.top) || MIGRATED_FILES.includes(it.rel);
const sev = (it) => (migrated(it) ? 'error' : 'warn');

// ---------- trích liên kết ----------
for (const it of items) {
  it.links = []; // {target, heading, alias, line, where: 'fm:<prop>' | 'body', inTable}
  // frontmatter
  if (it.fm) {
    const fmLines = it.fm.split(/\r?\n/);
    let key = null;
    fmLines.forEach((line, i) => {
      const kv = line.match(/^([A-Za-z_][\w-]*):/);
      if (kv) key = kv[1];
      for (const m of line.matchAll(LINK_RE)) {
        const p = parseLinkTarget(m[1]);
        if (p) it.links.push({ ...p, line: i + 2, where: 'fm:' + key, inTable: false });
      }
    });
  }
  const clean = stripCode(it.body).split(/\r?\n/);
  clean.forEach((line, i) => {
    const inTable = /^\s*\|/.test(line);
    for (const m of line.matchAll(LINK_RE)) {
      const p = parseLinkTarget(m[1]);
      if (p) it.links.push({ ...p, line: it.bodyStart + i + 1, where: 'body', inTable });
    }
  });
}

// tham chiếu bằng đường dẫn: `tuyen/goc.md §2` và [text](x.md). Chỉ dùng cho đồ thị (cạnh 'ref'), không kiểm treo vì file cũ hay trỏ sai.
const REF_RES = [/`([A-Za-z0-9_.\/-]+\.md)(?:\s*§[^`]*)?`/g, /\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g];
for (const it of items) {
  it.refs = new Set();
  const text = it.body;
  for (const re of REF_RES) for (const m of text.matchAll(re)) {
    const t = m[1].replace(/^(\.\.?\/)+/, '').replace(/^(docs|content)\//, '').replace(/\.md$/, '');
    const hits = resolve(t);
    if (hits.length === 1 && hits[0] !== it) it.refs.add(hits[0]);
  }
}

// ---------- luật ----------
const findings = []; // {law, severity, file, line, msg}
const add = (law, severity, it, line, msg) => findings.push({ law, severity, file: it.rel, line: line || 1, msg });
const LAWS = [];
const law = (id, fn) => LAWS.push({ id, fn });

law('LAW.check.unique-id', () => {
  const ids = new Map();
  for (const it of items) {
    if (!it.props.id) continue;
    (ids.get(it.props.id) || ids.set(it.props.id, []).get(it.props.id)).push(it);
  }
  for (const [id, list] of ids) if (list.length > 1) for (const it of list) add('LAW.check.unique-id', sev(it), it, 1, `id "${id}" trùng với ${list.filter((x) => x !== it).map((x) => x.rel).join(', ')}`);
  const bases = new Map();
  for (const it of items) { if (it.base === 'README' || it.base === 'convert' || it.top === 'docs') continue; (bases.get(it.base) || bases.set(it.base, []).get(it.base)).push(it); }
  for (const [b, list] of bases) if (list.length > 1) for (const it of list) add('LAW.check.unique-id', 'warn', it, 1, `tên file "${b}" trùng với ${list.filter((x) => x !== it).map((x) => x.rel).join(', ')}`);
});

law('LAW.check.resolve', () => {
  for (const it of items) {
    if (RESOLVE_EXEMPT.includes(it.top)) continue;
    for (const l of it.links) {
      const hits = resolve(l.target);
      if (hits.length === 0) add('LAW.check.resolve', sev(it), it, l.line, `liên kết treo [[${l.target}]]`);
      else if (hits.length > 1) add('LAW.check.resolve', 'warn', it, l.line, `liên kết mơ hồ [[${l.target}]] → ${hits.map((h) => h.rel).join(', ')}`);
    }
  }
});

// Link markdown tương đối [x](a/b.md): chỉ kiểm ở phần đã chuyển (file cũ hay trỏ sai).
law('LAW.check.source-path', () => {
  // sources: mục viết dạng đường dẫn .md mà không phải liên kết thì phải trỏ tới file có thật (kể cả ngoài content/)
  for (const it of items) {
    if (!it.fm || it.top === '_archive') continue;
    const lines = it.fm.split(/\r?\n/);
    let on = false;
    lines.forEach((line, i) => {
      const kv = line.match(/^([A-Za-z_][\w-]*):/);
      if (kv) on = kv[1] === 'sources';
      if (!on || /\[\[/.test(line)) return;
      const m = line.replace(/^\s*-\s*/, '').replace(/^sources:\s*/, '').replace(/^"|"$/g, '').match(/^([^\s§(*"<]+\.md)\b/);
      if (!m) return;
      const tok = m[1].replace(/^content\//, '');
      const ok = resolve(tok.replace(/\.md$/, '')).length > 0 || fs.existsSync(path.join(ROOT, m[1])) || fs.existsSync(path.join(CONTENT, tok));
      if (!ok) add('LAW.check.source-path', 'warn', it, i + 2, `sources trỏ file không có: ${m[1]}`);
    });
  }
});

law('LAW.check.entity-file', () => {
  // belief và value là file riêng: tên file = id, id đúng khuôn, nhân vật khớp, mục lục (index) có liệt kê
  for (const it of items) {
    const kind = it.props.kind;
    if (kind !== 'belief' && kind !== 'value') continue;
    const P = kind === 'belief' ? 'B' : 'V';
    const m = it.props.id && it.props.id.match(new RegExp('^' + P + '\\.([a-z]+)-\\d{3}$'));
    if (!m) { add('LAW.check.entity-file', 'error', it, 1, `id "${it.props.id}" sai khuôn ${P}.<nhân vật>-NNN`); continue; }
    if (it.base !== it.props.id) add('LAW.check.entity-file', 'error', it, 1, `tên file "${it.base}" khác id "${it.props.id}"`);
    if (!new RegExp('\\[\\[CH\\.' + m[1] + '\\]\\]').test(it.props.character || '')) add('LAW.check.entity-file', 'error', it, 1, `character phải là [[CH.${m[1]}]]`);
    const idx = (it.props.index || '').match(/\[\[([^\]|#]+)/);
    const target = idx && resolve(idx[1].trim())[0];
    if (!target) { add('LAW.check.entity-file', 'error', it, 1, 'thiếu index trỏ tới mục lục của gói'); continue; }
    const need = kind === 'belief' ? 'definition' : 'statement';
    if (!new RegExp('^- \\*\\*' + need + ':\\*\\*', 'm').test(it.body)) add('LAW.check.entity-file', 'error', it, 1, `thiếu mục \`- **${need}:**\` trong thân file`);
    if (kind === 'belief' && !it.props.axis) add('LAW.check.entity-file', 'warn', it, 1, 'niềm tin chưa có trục (axis): chưa thiết kế từ trục');
    if (!target.links.some((l) => l.target === it.props.id)) add('LAW.check.entity-file', 'error', it, 1, `mục lục ${target.rel} không liệt kê ${it.props.id}`);
  }
});

law('LAW.check.value-from', () => {
  // mỗi value có from (frontmatter) trỏ tới ít nhất một niềm tin có thật
  const beliefIds = new Set(items.filter((it) => it.props.kind === 'belief').map((it) => it.props.id));
  for (const it of items) {
    if (it.props.kind !== 'value') continue;
    const refs = [...(it.props.from || '').matchAll(/B\.[a-z-]+?-\d{3}/g)].map((m) => m[0]);
    if (!refs.length) add('LAW.check.value-from', 'error', it, 1, `${it.props.id} không có from trỏ tới niềm tin`);
    for (const r of refs) if (!beliefIds.has(r)) add('LAW.check.value-from', 'error', it, 1, `${it.props.id}: from trỏ niềm tin không có: ${r}`);
  }
});

law('LAW.check.belief-value', () => {
  // niềm tin không trỏ tới value (cả file belief lẫn mục lục niềm tin)
  for (const it of items) {
    if (it.props.kind !== 'belief' && !/\.beliefs$/.test(it.base)) continue;
    it.body.split(/\r?\n/).forEach((line, i) => {
      const m = line.match(/(^|[^A-Za-z0-9.])V\.[a-z-]+?-\d{3}/);
      if (m) add('LAW.check.belief-value', 'error', it, it.bodyStart + i + 1, 'niềm tin trỏ tới value (chỉ value được trỏ về niềm tin)');
    });
  }
});

law('LAW.check.method-from', () => {
  // hàm kiểu method phải trỏ về ít nhất một value có thật; type chỉ nhận innate | method
  const valueIds = new Set();
  for (const it of items) if (it.props.kind === 'value') valueIds.add(it.props.id);
  for (const it of items) {
    if (it.props.kind !== 'function' || !it.props.type) continue;
    if (!['innate', 'method'].includes(it.props.type)) { add('LAW.check.method-from', 'error', it, 1, `type "${it.props.type}" không hợp lệ (innate | method)`); continue; }
    const refs = [...(it.props.from || '').matchAll(/V\.[a-z-]+?-\d{3}/g)].map((m) => m[0]);
    if (it.props.type === 'innate') { if (refs.length) add('LAW.check.method-from', 'error', it, 1, 'hàm innate không sinh từ value, bỏ from'); continue; }
    if (!refs.length) add('LAW.check.method-from', 'error', it, 1, 'hàm method thiếu from trỏ về value');
    for (const r of refs) if (!valueIds.has(r)) add('LAW.check.method-from', 'error', it, 1, `from trỏ value không có: ${r}`);
  }
});

law('LAW.check.style-ref', () => {
  // map style ở đầu node / giao điểm phải trỏ tới style kind bundle có thật
  for (const it of items) {
    if (!it.props.style || !['node', 'intersection'].includes(it.props.kind)) continue;
    for (const m of it.props.style.matchAll(/(default|OPEN|P1|P2|BREAK|AFTER|POST)\s*:\s*([A-Za-z0-9.+-]+)/g)) {
      const hit = resolve(m[2])[0];
      if (!hit || hit.props.kind !== 'style' || hit.props.grain !== 'bundle') add('LAW.check.style-ref', 'error', it, 1, `style ${m[1]}: "${m[2]}" không phải register (style bundle) có thật`);
    }
  }
});

law('LAW.check.default-style', () => {
  // tình tiết rơi về R0 (REG.default): báo theo mức của node chủ ở giai đoạn của tình tiết
  const RANK = ['D', 'C', 'B', 'A', 'S', 'SS', 'SS+', 'SSS'];
  const parentOf = (it) => {
    const raw = it.props.parent || '';
    const l = (raw.match(LINK_RE) || [])[0];
    const tgt = l ? parseLinkTarget(l.slice(2, -2)).target : raw.trim();
    return tgt ? resolve(tgt)[0] : null;
  };
  const styleMap = (it) => {
    const out = {};
    for (const m of (it.props.style || '').matchAll(/(default|OPEN|P1|P2|BREAK|AFTER|POST)\s*:\s*([A-Za-z0-9.+-]+)/g)) out[m[1]] = m[2];
    return out;
  };
  const has = (it, ph) => { const s = styleMap(it); return Boolean((ph && s[ph]) || s.default); };
  const levelOf = (it, ph) => {
    const w = parseWeight(it.props.weight);
    if (ph) return w[ph] || null;
    const vals = Object.values(w).filter((v) => RANK.includes(v));
    return vals.length ? vals.sort((a, b) => RANK.indexOf(b) - RANK.indexOf(a))[0] : null;
  };
  for (const ev of items) {
    if (ev.props.kind !== 'event') continue;
    if (ev.props.register && ev.props.register.trim() && ev.props.register.trim() !== 'none') continue;
    const ph = PHASES.includes(ev.props.phase) ? ev.props.phase : null;
    const owner = parentOf(ev);
    if (!owner) continue;
    let level;
    if (owner.props.kind === 'intersection') {
      if (has(owner, ph)) continue;
      const nodes = [...(owner.props.nodes || '').matchAll(LINK_RE)].map((m) => resolve(parseLinkTarget(m[1]).target)[0]).filter(Boolean);
      level = levelOf(owner, ph) || nodes.map((n) => levelOf(n, ph)).filter(Boolean).sort((a, b) => RANK.indexOf(b) - RANK.indexOf(a))[0] || null;
      add('LAW.check.default-style', 'warn', ev, 1, `giao điểm ${owner.id} chưa có style và tình tiết không khai register: node giữ nhịp quyết (levels luật 1); đừng để rơi về R0${level ? ` (mức ${level})` : ''}`);
      continue;
    }
    let cur = owner, found = false, guard = 0;
    while (cur && guard++ < 20) {
      if (has(cur, ph)) { found = true; break; }
      if (cur.id === 'TREE') break;
      cur = parentOf(cur);
    }
    if (found) continue;
    level = levelOf(owner, ph);
    const sevr = !level || level === 'pending' || level === 'none' ? 'warn' : RANK.indexOf(level) >= RANK.indexOf('S') ? 'error' : RANK.indexOf(level) >= RANK.indexOf('B') ? 'warn' : 'info';
    add('LAW.check.default-style', sevr, ev, 1, `rơi về R0 [[REG.default]]: ${owner.id}${ph ? ` ở ${ph}` : ' (chưa rõ giai đoạn, lấy mức cao nhất)'} ${level ? `có mức ${level}` : 'chưa có mức'}; đặt style cho tuyến hoặc node`);
  }
});

law('LAW.check.md-link', () => {
  const re = /\]\(([^)\s]+)\)/g;
  for (const it of items) {
    if (!migrated(it)) continue;
    const lines = stripCode(it.body).split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const m of line.matchAll(re)) {
        const t = m[1].split('#')[0];
        if (!t || /^[a-z]+:/i.test(t)) continue;
        if (!fs.existsSync(path.resolve(path.dirname(it.abs), decodeURIComponent(t)))) add('LAW.check.md-link', 'error', it, it.bodyStart + i + 1, `link treo (${t})`);
      }
    });
  }
});

law('LAW.check.schema', () => {
  for (const it of items) {
    if (!it.hasFm) {
      if (migrated(it)) add('LAW.check.schema', 'error', it, 1, 'thiếu phần đầu file (frontmatter)');
      continue;
    }
    const kind = it.props.kind;
    if (!kind) { add('LAW.check.schema', sev(it), it, 1, 'frontmatter thiếu `kind`'); continue; }
    const req = REQUIRED_BY_KIND[kind];
    if (!req) { add('LAW.check.schema', 'warn', it, 1, `kind "${kind}" chưa có schema (content/schemas/, trường entity)`); continue; }
    for (const k of req) if (!(k in it.props)) add('LAW.check.schema', sev(it), it, 1, `kind=${kind} thiếu trường \`${k}\``);
    const one = REQUIRED_ONE_OF[kind];
    if (one && !one.some((k) => k in it.props)) add('LAW.check.schema', sev(it), it, 1, `kind=${kind} cần một trong: ${one.join(', ')}`);
    const st = it.props.status;
    if (st && !STATUSES.has(st)) add('LAW.check.status', sev(it), it, 1, `status "${st}" không thuộc config/statuses.md`);
  }
});

law('LAW.check.status', () => {
  // locked/agreed dựa vào proposed trở xuống (qua basis, uses, parent): cảnh báo
  for (const it of items) {
    const my = STABILITY[it.props.status];
    if (my == null) continue;
    for (const l of it.links.filter((x) => /^fm:(basis|uses|parent)$/.test(x.where))) {
      const t = resolve(l.target)[0];
      const their = t && STABILITY[t.props.status];
      if (their != null && my >= 4 && their < 4) add('LAW.check.status', 'warn', it, l.line, `${it.props.status} dựa vào [[${l.target}]] đang ${t.props.status}`);
    }
  }
});

// Chỗ trống có chủ đích: mục `### <ID>` có dòng `- **gap:**`. Mọi nơi nhắc tới ID ấy (trừ dòng tiêu đề của chính nó) đều bị cảnh báo.
law('LAW.check.gap', () => {
  const gaps = new Map();
  for (const it of items) {
    const lines = it.body.split(/\r?\n/);
    lines.forEach((line, i) => {
      const h = line.match(/^###\s+([A-Za-z0-9.:\-]+)\s*$/);
      if (!h) return;
      let end = i + 1;
      while (end < lines.length && !/^#{2,3}\s/.test(lines[end])) end++;
      for (let j = i + 1; j < end; j++) {
        const g = lines[j].match(/^- \*\*gap:\*\*\s*(.*)$/);
        if (g) { gaps.set(h[1], { note: g[1].slice(0, 80), rel: it.rel, start: i, end }); break; }
      }
    });
  }
  if (!gaps.size) return;
  for (const it of items) {
    const lines = it.body.split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const [id, g] of gaps) {
        if (it.rel === g.rel && i >= g.start && i < g.end) continue;
        const note = g.note;
        if (new RegExp('(^|[^A-Za-z0-9-])' + id.replace(/[.:\-]/g, '\\$&') + '(?![0-9])').test(line)) add('LAW.check.gap', 'warn', it, it.bodyStart + i + 1, `nhắc tới ${id}: chỗ trống chưa định nghĩa (${note})`);
      }
    });
  }
});

law('LAW.check.table-pipe', () => {
  for (const it of items) for (const l of it.links) if (l.inTable && l.alias) add('LAW.check.table-pipe', sev(it), it, l.line, `bí danh trong ô bảng làm vỡ bảng: [[${l.target}|…]]`);
});

law('LAW.check.weekday', () => {
  const NAME = { T2: 1, T3: 2, T4: 3, T5: 4, T6: 5, T7: 6, CN: 0 };
  const re = /\b(T[2-7]|CN)\s+(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  for (const it of items) {
    const lines = stripCode(it.text).split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const m of line.matchAll(re)) {
        const d = new Date(Date.UTC(+m[4], +m[3] - 1, +m[2]));
        if (d.getUTCMonth() !== +m[3] - 1) { add('LAW.check.weekday', sev(it), it, i + 1, `ngày không tồn tại: ${m[0]}`); continue; }
        if (d.getUTCDay() !== NAME[m[1]]) {
          const real = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getUTCDay()];
          add('LAW.check.weekday', sev(it), it, i + 1, `${m[0]} là ${real}, không phải ${m[1]}`);
        }
      }
    });
  }
});

law('LAW.check.level-parent', () => {
  // node con không vượt mức của cha (khi cả hai khai `weight: {P1: S, …}` ở frontmatter)
  const RANK = ['D', 'C', 'B', 'A', 'S', 'SS', 'SS+', 'SSS'];
  const w = (it) => parseWeight(it.props.weight);
  for (const it of items) {
    if (it.props.kind !== 'node' || !it.props.parent) continue;
    const pl = (it.props.parent.match(LINK_RE) || [])[0];
    if (!pl) continue;
    const p = resolve(parseLinkTarget(pl.slice(2, -2)).target)[0];
    if (!p) continue;
    const mine = w(it), theirs = w(p);
    for (const ph of PHASES) if (mine[ph] && theirs[ph] && RANK.indexOf(mine[ph]) > RANK.indexOf(theirs[ph])) add('LAW.check.level-parent', sev(it), it, 1, `${ph}: mức ${mine[ph]} vượt mức cha ${theirs[ph]}`);
  }
});


// ---------- storage (13/11) ----------
law('LAW.check.store', () => {
  // kho: bảng entries có header đúng columns, khóa không trùng; law.data phải trỏ tới store
  for (const it of items) {
    if (it.props.kind !== 'store') continue;
    if (it.base !== it.props.id) add('LAW.check.store', 'error', it, 1, `tên file "${it.base}" khác id "${it.props.id}"`);
    if (!/^STO\.[a-z0-9-]+$/.test(it.props.id || '')) add('LAW.check.store', 'error', it, 1, `id "${it.props.id}" sai khuôn STO.<tên>`);
    const cols = listProp(it.props.columns);
    const lines = it.body.split(/\r?\n/);
    const h = lines.findIndex((l) => /^##\s+entries\s*$/.test(l));
    if (h < 0) { add('LAW.check.store', 'error', it, 1, 'thiếu mục `## entries`'); continue; }
    const cells = (l) => l.replace(/\\\|/g, '\u0000').replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.replace(/\u0000/g, '|').trim());
    const start = lines.findIndex((l, i) => i > h && /^\s*\|/.test(l));
    if (start < 0) { add('LAW.check.store', 'error', it, it.bodyStart + h + 1, 'entries không có bảng'); continue; }
    const head = cells(lines[start]);
    if (head.join('|') !== cols.join('|')) add('LAW.check.store', 'error', it, it.bodyStart + start + 1, `header bảng (${head.join(', ')}) khác columns (${cols.join(', ')})`);
    const ki = head.indexOf(it.props.key);
    if (ki < 0) add('LAW.check.store', 'error', it, 1, `key "${it.props.key}" không phải một cột`);
    const keys = new Map();
    for (let i = start + 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) {
      const c = cells(lines[i]);
      if (c.length !== head.length) add('LAW.check.store', 'error', it, it.bodyStart + i + 1, `dòng có ${c.length} ô, bảng có ${head.length} cột`);
      if (ki >= 0) {
        const k = c[ki];
        if (!k) add('LAW.check.store', 'error', it, it.bodyStart + i + 1, 'dòng thiếu khóa');
        else if (keys.has(k)) add('LAW.check.store', 'error', it, it.bodyStart + i + 1, `khóa "${k}" trùng dòng ${keys.get(k)}`);
        else keys.set(k, it.bodyStart + i + 1);
      }
    }
  }
  for (const it of items) {
    if (!it.props.data || it.props.data === 'none') continue;
    for (const m of it.props.data.matchAll(LINK_RE)) {
      const p = parseLinkTarget(m[1]);
      const t = p && resolve(p.target)[0];
      if (!t || t.props.kind !== 'store') add('LAW.check.store', sev(it), it, 1, `data: [[${p ? p.target : m[1]}]] không phải kho (kind store) có thật`);
    }
  }
});

// ---------- info (13/11) ----------
// Khoảng thời gian: [start, end] tính bằng ngày UTC (ms). Lịch truyện 2024–2025, config/calendar.md, config/phases.md.
const PHASE_SPAN = { OPEN: ['2024-10-01', '2024-10-27'], P1: ['2024-10-28', '2025-03-31'], P2: ['2025-04-01', '2025-07-17'], BREAK: ['2025-07-18', '2025-07-18'], AFTER: ['2025-07-19', '2025-12-31'] };
const dayMs = (y, m = 1, d = 1) => Date.UTC(y, m - 1, d);
function tokenSpan(tok) {
  // YYYY | YYYY-MM | YYYY-MM-DD → [đầu, cuối]
  const m = tok.match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
  if (!m) return null;
  const y = +m[1], mo = m[2] ? +m[2] : null, d = m[3] ? +m[3] : null;
  if (d) return [dayMs(y, mo, d), dayMs(y, mo, d)];
  if (mo) return [dayMs(y, mo, 1), dayMs(y, mo + 1, 1) - 864e5];
  return [dayMs(y, 1, 1), dayMs(y, 12, 31)];
}
const phaseSpan = (ph) => (PHASE_SPAN[ph] ? [tokenSpan(PHASE_SPAN[ph][0])[0], tokenSpan(PHASE_SPAN[ph][1])[1]] : null);
function eventSpan(ev) {
  if (ev.props.date) { const t = tokenSpan(ev.props.date.replace(/"/g, '').trim()); if (t) return { span: t, from: 'date' }; }
  const raw = (ev.props.span || '').replace(/"/g, '');
  const pts = [];
  for (const m of raw.matchAll(/(20\d{2})\s*[–-]\s*(\d{2})(?!\d)/g)) { pts.push(...tokenSpan(m[1])); pts.push(...tokenSpan('20' + m[2])); }
  const noRange = raw.replace(/(20\d{2})\s*[–-]\s*(\d{2})(?!\d)/g, ' ');
  for (const m of noRange.matchAll(/(?:(\d{1,2})\s*[–-]\s*)?(?:(\d{1,2})\/)?(?:(\d{1,2})\/)?(20\d{2})/g)) {
    const [, , a, b, y] = m;
    const tok = b ? `${y}-${b}-${a}` : a ? `${y}-${a}` : y;
    const t = tokenSpan(tok);
    if (t) pts.push(...t);
  }
  if (pts.length) return { span: [Math.min(...pts), Math.max(...pts)], from: 'span' };
  const ph = PHASES.includes(ev.props.phase) ? ev.props.phase : /GĐ1/.test(raw) ? 'P1' : /GĐ2/.test(raw) ? 'P2' : null;
  if (ph && phaseSpan(ph)) return { span: phaseSpan(ph), from: ph };
  return null;
}
const fmtDay = (ms) => new Date(ms).toISOString().slice(0, 10);
function infoItems() {
  // INFO.<domain>.<topic>#<item> → {leaf, name, fields, line, valid}
  const out = new Map();
  for (const it of items) {
    if (it.props.kind !== 'info' || it.props.level !== 'leaf') continue;
    const lines = it.body.split(/\r?\n/);
    lines.forEach((l, i) => {
      const h = l.match(/^###\s+([a-z0-9-]+)\s*$/);
      if (!h) return;
      const fields = {};
      for (let j = i + 1; j < lines.length && !/^#{2,3}\s/.test(lines[j]); j++) {
        const f = lines[j].match(/^- \*\*([a-z-]+):\*\*\s*(.*)$/);
        if (f) fields[f[1]] = f[2];
      }
      let valid = null;
      if (fields.valid) {
        const vm = fields.valid.match(/^(\d{4}(?:-\d{1,2}){0,2})\s*→\s*(nay|\d{4}(?:-\d{1,2}){0,2})/);
        if (vm) valid = [tokenSpan(vm[1])[0], vm[2] === 'nay' ? Infinity : tokenSpan(vm[2])[1]];
      }
      const knownBy = new Set([...(fields['known-by'] || '').matchAll(LINK_RE)].map((m) => parseLinkTarget(m[1])?.target).filter(Boolean));
      out.set(`${it.props.id}#${h[1]}`, { leaf: it, name: h[1], fields, line: it.bodyStart + i + 1, valid, knownBy });
    });
  }
  return out;
}
const INFO_ITEMS = infoItems();

law('LAW.check.info-valid', () => {
  // cấu trúc info (lỗi); tình tiết dùng mục info ngoài khoảng valid (cảnh báo: chỉ cảnh báo lúc viết, không xóa)
  for (const it of items) {
    if (it.props.kind !== 'info') continue;
    if (it.base !== it.props.id) add('LAW.check.info-valid', 'error', it, 1, `tên file "${it.base}" khác id "${it.props.id}"`);
    if (it.props.level === 'leaf') {
      if (!/\[\[INFO\.[a-z0-9-]+\]\]/.test(it.props.parent || '')) add('LAW.check.info-valid', 'error', it, 1, 'lá info thiếu parent [[INFO.<domain>]]');
      const declared = listProp(it.props.items);
      const found = [...INFO_ITEMS.values()].filter((x) => x.leaf === it).map((x) => x.name);
      if (declared.join('|') !== found.join('|')) add('LAW.check.info-valid', 'error', it, 1, `items (${declared.join(', ')}) khác các mục ### (${found.join(', ')})`);
    } else if (it.props.level !== 'node') add('LAW.check.info-valid', 'error', it, 1, `level "${it.props.level}" không hợp lệ (node | leaf)`);
  }
  for (const x of INFO_ITEMS.values()) {
    for (const f of ['fact', 'valid', 'known-by', 'sources']) if (!x.fields[f]) add('LAW.check.info-valid', 'error', x.leaf, x.line, `${x.name}: thiếu \`${f}\``);
    if (x.fields.valid && !x.valid) add('LAW.check.info-valid', 'error', x.leaf, x.line, `${x.name}: valid "${x.fields.valid}" sai khuôn YYYY[-MM] → YYYY[-MM] | nay`);
  }
  for (const ev of items) {
    if (ev.props.kind !== 'event' || !ev.props.info || ev.props.info === 'none') continue;
    const es = eventSpan(ev);
    for (const m of ev.props.info.matchAll(LINK_RE)) {
      const p = parseLinkTarget(m[1]);
      if (!p) continue;
      const leaf = resolve(p.target)[0];
      if (!leaf || leaf.props.kind !== 'info') { add('LAW.check.info-valid', 'error', ev, 1, `info: [[${p.target}]] không phải info có thật`); continue; }
      if (!p.heading) continue;
      const x = INFO_ITEMS.get(`${leaf.props.id}#${p.heading}`);
      if (!x) { add('LAW.check.info-valid', 'error', ev, 1, `info: ${leaf.props.id} không có mục "${p.heading}"`); continue; }
      if (!es || !x.valid) continue;
      const [a, b] = es.span, [vs, ve] = x.valid;
      const when = `${fmtDay(a)} → ${fmtDay(b)} (${es.from})`;
      if (b < vs || a > ve) add('LAW.check.info-valid', 'warn', ev, 1, `${x.name}: cảnh ở ${when}, ngoài valid ${x.fields.valid}; chỉ cảnh báo lúc viết, không xóa`);
      else if (a < vs || b > ve) add('LAW.check.info-valid', 'info', ev, 1, `${x.name}: cảnh ở ${when}, một phần ngoài valid ${x.fields.valid}`);
    }
  }
});

function parseWeight(raw) {
  const out = {};
  if (!raw) return out;
  for (const m of raw.matchAll(/(OPEN|P1|P2|BREAK|AFTER|POST)\s*:\s*([A-Za-z+]+|none|pending)/g)) out[m[1]] = m[2];
  return out;
}

// ---------- chạy ----------
const active = LAWS.filter((l) => !ONLY_LAW || l.id.endsWith(ONLY_LAW) || l.id === ONLY_LAW);
for (const l of active) l.fn();
const inTarget = (f) => !ONLY_TARGET || f.file === ONLY_TARGET || f.file.startsWith(ONLY_TARGET.replace(/\/?$/, '/'));
const shown = findings.filter(inTarget);

// ---------- view: symbols.md ----------
function oneLine(it) {
  const m = it.body.split(/\r?\n/).map((s) => s.trim()).find((s) => s && !s.startsWith('#') && !s.startsWith('|') && !s.startsWith('>') && !s.startsWith('```') && !s.startsWith('-'));
  const t = (m || it.title).replace(/\s+/g, ' ');
  return t.length > 140 ? t.slice(0, 137) + '…' : t;
}
function writeSymbols() {
  const rows = items
    .filter((it) => it.hasFm && it.props.id)
    .sort((a, b) => a.props.id.localeCompare(b.props.id))
    .map((it) => `| \`${it.props.id}\` | \`${it.props.kind || ''}\` | \`${it.props.status || ''}\` | \`${it.rel}\` | ${oneLine(it).replace(/\|/g, '/')} |`);
  const legacy = items.filter((it) => !it.hasFm).length;
  const out = [
    '# symbols (SINH)', '',
    'Sinh bởi `npm run canon:check`. Không sửa tay. Mã → file → một câu. Mã viết trong backtick để file này không tạo cạnh trong đồ thị.', '',
    `Có phần đầu (frontmatter): ${rows.length} file. Chưa chuyển sang khuôn mới (legacy): ${legacy} file.`, '',
    '| Mã | Loại | Trạng thái | File | Tóm tắt |', '| --- | --- | --- | --- | --- |', ...rows, '',
  ].join('\n');
  fs.writeFileSync(path.join(CONTENT, 'symbols.md'), out);
}

// ---------- view: graph.json + graph.html ----------
const LAYERS = {
  docs: 'spec', guidelines: 'spec',
  config: 'foundation', schemas: 'foundation', core: 'core', rules: 'rules', lib: 'lib', world: 'world',
  storylines: 'storylines', plans: 'plans', canon: 'canon', proposals: 'proposals', 'de-xuat': 'proposals',
  audits: 'audits', assets: 'assets', kho: 'assets', tuyen: 'storylines', storage: 'rules', info: 'world',
};
const LAYERS_POSTS = { vercel: 'posts-vercel', legacy: 'posts-legacy' };
function buildGraph() {
  const nodes = items.map((it) => ({
    id: it.id, path: it.rel, title: it.title, layer: it.top === 'posts' ? (LAYERS_POSTS[it.rel.split('/')[1]] || 'crosspost') : (LAYERS[it.top] || 'legacy'), kind: it.props.kind || '',
    status: it.props.status || '', weight: parseWeight(it.props.weight), effective: it.props.effective || '',
  }));
  const idOf = new Map(items.map((it) => [it, it.id]));
  const seen = new Set();
  const edges = [];
  for (const it of items) for (const l of it.links) {
    const t = resolve(l.target)[0];
    if (!t || t === it) continue;
    const type = l.where.startsWith('fm:') ? l.where.slice(3) : 'link';
    const key = `${idOf.get(it)}→${idOf.get(t)}→${type}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ s: idOf.get(it), t: idOf.get(t), type });
  }
  for (const it of items) for (const t of it.refs) {
    const key = `${idOf.get(it)}→${idOf.get(t)}→ref`;
    if (seen.has(key) || seen.has(`${idOf.get(t)}→${idOf.get(it)}→ref`)) continue;
    seen.add(key);
    edges.push({ s: idOf.get(it), t: idOf.get(t), type: 'ref' });
  }
  return { generated: new Date().toISOString().slice(0, 10), phases: PHASES, nodes, edges };
}
function writeGraph() {
  const g = buildGraph();
  fs.mkdirSync(path.join(CONTENT, '_views'), { recursive: true });
  fs.writeFileSync(path.join(CONTENT, '_views', 'graph.json'), JSON.stringify(g, null, 1));
  const tpl = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'graph-template.html'), 'utf8');
  fs.writeFileSync(path.join(CONTENT, '_views', 'graph.html'), tpl.replace('/*__GRAPH_DATA__*/null', JSON.stringify(g).replace(/</g, '\\u003c')));
  return g;
}


// ---------- khối SINH của tình tiết (13/11: register + gợi ý info) ----------
function resolvedRegister(ev) {
  // trả {regs: [id REG], from}
  const toRegs = (txt) => {
    const out = [];
    for (const m of (txt || '').matchAll(/\b(R\d{1,2})\b|\[\[(REG\.[a-z0-9-]+)\]\]|\b(REG\.[a-z0-9-]+)\b/g)) {
      const hit = resolve(m[1] || m[2] || m[3])[0];
      if (hit && hit.props.kind === 'style' && hit.props.grain === 'bundle' && !out.includes(hit.props.id)) out.push(hit.props.id);
    }
    return out;
  };
  if (ev.props.register && ev.props.register !== 'none') { const r = toRegs(ev.props.register); if (r.length) return { regs: r, from: 'khai ở tình tiết' }; }
  const ph = PHASES.includes(ev.props.phase) ? ev.props.phase : null;
  const parentOf = (it) => { const l = ((it.props.parent || '').match(LINK_RE) || [])[0]; return l ? resolve(parseLinkTarget(l.slice(2, -2)).target)[0] : null; };
  let cur = parentOf(ev), guard = 0;
  while (cur && guard++ < 20) {
    const map = {};
    for (const m of (cur.props.style || '').matchAll(/(default|OPEN|P1|P2|BREAK|AFTER|POST)\s*:\s*([A-Za-z0-9.+-]+)/g)) map[m[1]] = m[2];
    const pick = (ph && map[ph]) || map.default;
    if (pick) { const r = toRegs(pick); if (r.length) return { regs: r, from: `style của ${cur.id}` }; }
    if (cur.id === 'TREE') break;
    cur = parentOf(cur);
  }
  return { regs: ['REG.default'], from: 'STY.default (R0)' };
}
function participantsOf(ev) {
  const ids = (it) => [...(it.props.participants || '').matchAll(LINK_RE)].map((m) => parseLinkTarget(m[1])?.target).filter(Boolean);
  let p = ids(ev);
  if (p.length) return p;
  const l = ((ev.props.parent || '').match(LINK_RE) || [])[0];
  const owner = l && resolve(parseLinkTarget(l.slice(2, -2)).target)[0];
  return owner ? ids(owner) : [];
}
function writeResolvedBlocks() {
  const nodes = items.filter((it) => it.props.kind === 'info' && it.props.level === 'node');
  const styleOf = new Map(nodes.map((n) => [n.props.id, new Set([...(n.props.style || '').matchAll(LINK_RE)].map((m) => resolve(parseLinkTarget(m[1]).target)[0]?.props.id).filter(Boolean))]));
  let written = 0;
  for (const ev of items) {
    if (ev.props.kind !== 'event') continue;
    const reg = resolvedRegister(ev);
    const es = eventSpan(ev);
    const people = participantsOf(ev);
    const declared = new Set([...(ev.props.info || '').matchAll(LINK_RE)].map((m) => { const p = parseLinkTarget(m[1]); return p && `${p.target}#${p.heading}`; }));
    const sug = [];
    for (const [key, x] of INFO_ITEMS) {
      const node = (x.leaf.props.parent || '').match(/INFO\.[a-z0-9-]+/);
      const st = node && styleOf.get(node[0]);
      if (!st || !reg.regs.some((r) => st.has(r))) continue;
      if (declared.has(key)) continue;
      if (es && x.valid && (es.span[0] < x.valid[0] || es.span[1] > x.valid[1])) continue;
      if (!people.some((p) => x.knownBy.has(p))) continue;
      sug.push(key);
    }
    const has = /<!-- SINH -->[\s\S]*?<!-- \/SINH -->/.test(ev.text);
    if (!sug.length && !has) continue;
    const block = [
      '<!-- SINH -->', '## resolved (SINH)', '',
      'Sinh bởi `npm run canon:check`; không sửa tay. Mới có `register` và `info` (13/11).', '',
      `- **register:** ${reg.regs.map((r) => `[[${r}]]`).join(', ')} (${reg.from})`,
      `- **info gợi ý:** ${sug.length ? sug.map((k) => `[[${k}]]`).join(' · ') : 'none'}${sug.length ? ` (hợp register; ${es ? `hợp valid ở ${fmtDay(es.span[0])} → ${fmtDay(es.span[1])}` : 'chưa rõ ngày'}; người tham gia biết)` : ''}`,
      '<!-- /SINH -->',
    ].join('\n');
    const next = has ? ev.text.replace(/<!-- SINH -->[\s\S]*?<!-- \/SINH -->/, block) : ev.text.replace(/\s*$/, '\n\n' + block + '\n');
    if (next !== ev.text) { fs.writeFileSync(ev.abs, next); written++; }
  }
  return written;
}

if (WRITE && !ONLY_LAW && !ONLY_TARGET) {
  const nb = writeResolvedBlocks();
  if (nb) console.log(`khối SINH: ghi ${nb} tình tiết`);
  writeSymbols();
  const g = writeGraph();
  console.log(`views: symbols.md · _views/graph.json (${g.nodes.length} nút, ${g.edges.length} cạnh) · _views/graph.html`);
}

// ---------- báo cáo ----------
const order = { error: 0, warn: 1, info: 2 };
shown.sort((a, b) => order[a.severity] - order[b.severity] || a.file.localeCompare(b.file) || a.line - b.line);
const byLaw = {};
for (const f of shown) (byLaw[f.law] ||= { error: 0, warn: 0, info: 0 })[f.severity]++;
const LIMIT = FLAG('--all') ? Infinity : Number(opt('--limit') || 40);
let printed = 0;
for (const f of shown) {
  if (printed >= LIMIT) break;
  console.log(`${f.severity.toUpperCase().padEnd(5)} ${f.law}  ${f.file.startsWith('docs/') ? '' : 'content/'}${f.file}:${f.line}  ${f.msg}`);
  printed++;
}
if (shown.length > printed) console.log(`… còn ${shown.length - printed} mục (dùng --all hoặc --limit N)`);
console.log('\nTổng theo luật:');
for (const l of active) { const c = byLaw[l.id] || { error: 0, warn: 0, info: 0 }; console.log(`  ${l.id.padEnd(26)} lỗi ${String(c.error).padStart(3)} · cảnh báo ${String(c.warn).padStart(3)}${c.info ? ` · ghi chú ${c.info}` : ''}`); }
const errors = shown.filter((f) => f.severity === 'error').length;
const warns = shown.filter((f) => f.severity === 'warn').length;
console.log(`\n${items.length} file · ${errors} lỗi · ${warns} cảnh báo`);
process.exit(errors > 0 || (STRICT && warns > 0) ? 1 : 0);
