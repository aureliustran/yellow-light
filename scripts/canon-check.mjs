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
const MIGRATED = ['config', 'schemas', 'guidelines', 'docs', 'world', 'core', 'storylines'];
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
      const h = line.match(/^###\s+([A-Za-z0-9.\-]+)\s*$/);
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
        if (new RegExp('(^|[^A-Za-z0-9-])' + id.replace(/[.\-]/g, '\\$&') + '(?![0-9])').test(line)) add('LAW.check.gap', 'warn', it, it.bodyStart + i + 1, `nhắc tới ${id}: chỗ trống chưa định nghĩa (${note})`);
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
  audits: 'audits', assets: 'assets', kho: 'assets', tuyen: 'storylines',
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

if (WRITE && !ONLY_LAW && !ONLY_TARGET) {
  writeSymbols();
  const g = writeGraph();
  console.log(`views: symbols.md · _views/graph.json (${g.nodes.length} nút, ${g.edges.length} cạnh) · _views/graph.html`);
}

// ---------- báo cáo ----------
const order = { error: 0, warn: 1, info: 2 };
shown.sort((a, b) => order[a.severity] - order[b.severity] || a.file.localeCompare(b.file) || a.line - b.line);
const byLaw = {};
for (const f of shown) (byLaw[f.law] ||= { error: 0, warn: 0 })[f.severity]++;
const LIMIT = FLAG('--all') ? Infinity : Number(opt('--limit') || 40);
let printed = 0;
for (const f of shown) {
  if (printed >= LIMIT) break;
  console.log(`${f.severity.toUpperCase().padEnd(5)} ${f.law}  ${f.file.startsWith('docs/') ? '' : 'content/'}${f.file}:${f.line}  ${f.msg}`);
  printed++;
}
if (shown.length > printed) console.log(`… còn ${shown.length - printed} mục (dùng --all hoặc --limit N)`);
console.log('\nTổng theo luật:');
for (const l of active) { const c = byLaw[l.id] || { error: 0, warn: 0 }; console.log(`  ${l.id.padEnd(26)} lỗi ${String(c.error).padStart(3)} · cảnh báo ${String(c.warn).padStart(3)}`); }
const errors = shown.filter((f) => f.severity === 'error').length;
const warns = shown.filter((f) => f.severity === 'warn').length;
console.log(`\n${items.length} file · ${errors} lỗi · ${warns} cảnh báo`);
process.exit(errors > 0 || (STRICT && warns > 0) ? 1 : 0);
