// Cross-posting rules shared by /admin/crosspost (browser) and the CLI and
// worker (Node). Pure functions only, no imports, so both can load this file.
//
// Words used here:
//   source     the chapter as stored in Supabase (what the Vercel site shows)
//   converted  the site's version of the body, written by Claude following
//              crosspost/sites/<site>/convert.md, without title or footer
//   final      what is actually sent: the story date, the converted body, and
//              the footer with links back to the Vercel site

export interface CrossChapter {
  id: string;
  slug: string;
  kind: 'chapter' | 'interlude';
  title: string;
  story_date: string | null;
  status: 'draft' | 'published';
  publish_at: string | null;
  position: number;
  number: number | null; // running chapter number; null for interludes and special chapters
  body?: string;
}

export interface SiteConfig {
  site: string;
  name: string;
  vercelUrl: string; // e.g. https://yellow-light.vercel.app (no trailing slash)
  remoteViewUrl?: string; // reader page of a posted chapter, "{id}" = its id on that site
  footer: {
    next: string; // "Đọc tiếp {next} tại: {nextUrl}"
    last: string; // used when there is no next chapter yet
    home: string; // "Trọn bộ ... : {home}"
  };
}

export interface PostRow {
  site: string;
  chapter_id: string;
  source_hash: string;
  converted_body: string;
  converted_at: string;
  check_report: unknown;
  remote_id: string | null;
  remote_url: string | null;
  posted_hash: string | null;
  posted_mode: 'publish' | 'draft' | null;
  posted_at: string | null;
  pending_since: string | null;
  last_error: string | null;
}

export interface JobRow {
  id: number;
  site: string;
  chapter_id: string;
  mode: 'publish' | 'draft';
  status: 'queued' | 'running' | 'done' | 'failed' | 'cancelled';
  result: string | null;
  error: string | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

// ───────────── Hashes ─────────────

export async function sha256(text: string): Promise<string> {
  const buf = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const lf = (s: string) => s.replace(/\r\n?/g, '\n');

// Changes whenever the Vercel chapter changes in a way that matters for a conversion.
export function sourceHash(c: Pick<CrossChapter, 'kind' | 'title' | 'story_date' | 'body'>): Promise<string> {
  return sha256(JSON.stringify([c.kind, c.title.trim(), c.story_date ?? '', lf(c.body ?? '').trim()]));
}

// Changes whenever what we would send changes (text, title, or the footer links).
export function postedHash(title: string, finalText: string): Promise<string> {
  return sha256(title + '\n\n' + finalText);
}

// ───────────── Which chapters, in what order ─────────────

export function isLive(c: Pick<CrossChapter, 'status' | 'publish_at'>, now = Date.now()): boolean {
  return c.status === 'published' && !!c.publish_at && Date.parse(c.publish_at) <= now;
}

// Chapters readers can see on Vercel, in story order.
export function liveInOrder<T extends CrossChapter>(all: T[], now = Date.now()): T[] {
  return all.filter((c) => isLive(c, now)).sort((a, b) => a.position - b.position);
}

// Groups: each numbered chapter together with the interludes and special
// chapters that come after it, up to the next numbered chapter. Anything
// before chapter 1 joins chapter 1's group.
export function groups<T extends CrossChapter>(live: T[]): { number: number; items: T[] }[] {
  const out: { number: number; items: T[] }[] = [];
  const before: T[] = [];
  for (const c of live) {
    if (c.number != null) out.push({ number: c.number, items: [c] });
    else if (out.length) out[out.length - 1].items.push(c);
    else before.push(c);
  }
  if (out.length && before.length) out[0].items.unshift(...before);
  return out;
}

// The chapters allowed on the other site: the first `limit` numbered chapters
// and what rides along with them. null = no limit.
export function teaserSet<T extends CrossChapter>(live: T[], limit: number | null): Set<string> {
  const g = groups(live);
  const take = limit == null ? g : g.slice(0, Math.max(0, limit));
  return new Set(take.flatMap((x) => x.items.map((c) => c.id)));
}

// "1-5", "5-", "-3", "7", "1-3,8" → the chapter ids in those numbered groups.
export function parseRange(spec: string): (n: number) => boolean {
  const parts = spec.split(',').map((p) => p.trim()).filter(Boolean);
  if (!parts.length) throw new Error('Khoảng chương trống');
  const tests = parts.map((p) => {
    const m = /^(\d*)\s*-\s*(\d*)$/.exec(p);
    if (m) {
      const a = m[1] ? Number(m[1]) : 1;
      const b = m[2] ? Number(m[2]) : Infinity;
      if (a > b) throw new Error(`Khoảng chương ngược: ${p}`);
      return (n: number) => n >= a && n <= b;
    }
    if (/^\d+$/.test(p)) return (n: number) => n === Number(p);
    throw new Error(`Không hiểu khoảng chương: "${p}" (ví dụ đúng: 1-5, 7, 10-)`);
  });
  return (n: number) => tests.some((t) => t(n));
}

export function selectByRange<T extends CrossChapter>(live: T[], spec: string, withInterludes = true): T[] {
  const ok = parseRange(spec);
  return groups(live)
    .filter((g) => ok(g.number))
    .flatMap((g) => (withInterludes ? g.items : g.items.filter((c) => c.number != null)));
}

// ───────────── Titles and footer ─────────────

export function remoteTitle(c: Pick<CrossChapter, 'kind' | 'title' | 'number'>): string {
  if (c.kind === 'interlude') return `Interlude: ${c.title}`;
  if (c.number != null) return `Chương ${c.number}: ${c.title}`;
  return `Chương ${c.title}`; // special chapter, e.g. "Chương 3107"
}

function linkName(c: Pick<CrossChapter, 'kind' | 'title' | 'number'>): string {
  if (c.kind === 'interlude') return `Interlude ${c.title}`;
  return c.number != null ? `Chương ${c.number} – ${c.title}` : `Chương ${c.title}`;
}

export function chapterUrl(cfg: SiteConfig, slug: string): string {
  return `${cfg.vercelUrl.replace(/\/+$/, '')}/doc/${slug}`;
}

const fill = (tpl: string, vars: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

// The next chapter on Vercel (live), even if it is not cross-posted: past the
// teaser, the footer is what sends readers to the Vercel site.
export function nextLive<T extends CrossChapter>(live: T[], c: CrossChapter): T | null {
  const i = live.findIndex((x) => x.id === c.id);
  return i >= 0 && i + 1 < live.length ? live[i + 1] : null;
}

export function footerLines(cfg: SiteConfig, next: CrossChapter | null): string[] {
  const home = cfg.vercelUrl.replace(/\/+$/, '') + '/';
  const vars = { home, next: next ? linkName(next) : '', nextUrl: next ? chapterUrl(cfg, next.slug) : home };
  return [fill(next ? cfg.footer.next : cfg.footer.last, vars), fill(cfg.footer.home, vars)];
}

export function finalText(cfg: SiteConfig, c: CrossChapter, converted: string, next: CrossChapter | null): string {
  const parts: string[] = [];
  if (c.story_date) parts.push(`*${c.story_date}*`);
  parts.push(lf(converted).trim());
  parts.push('* * *');
  parts.push(footerLines(cfg, next).join('\n'));
  return parts.join('\n\n') + '\n';
}

// ───────────── Text → editor HTML ─────────────
// The converted text is plain paragraphs (blank line between), single line
// breaks inside a paragraph, *italic*, **bold**, and "* * *" as a scene break.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Only the footer uses links: [label](https://...) becomes <a href>. The
// converted body never has links (checks.ts rejects them).
const LINK = /\[([^\]\n]+)\]\((https:\/\/[^\s)]+)\)/g;

function inline(s: string): string {
  return esc(s)
    .replace(LINK, (_, label, url) => `<a href="${url}">${label}</a>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
}

export function textToHtml(text: string): string {
  return lf(text)
    .trim()
    .split(/\n{2,}/)
    .map((p) => {
      if (p.trim() === '* * *') return '<p style="text-align: center;">* * *</p>';
      return '<p>' + p.split('\n').map(inline).join('<br>') + '</p>';
    })
    .join('\n');
}

// What the editor should contain afterwards, as plain text with whitespace
// collapsed: used to check that the site really saved what we sent.
export function plainForCompare(text: string): string {
  return lf(text).replace(LINK, '$1').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(?!\s)(.+?)(?<!\s)\*/g, '$1').replace(/\s+/g, ' ').trim();
}

// ───────────── Status of one chapter on one site ─────────────

export type CrossState =
  | 'outside' //   not live on Vercel, or past the teaser limit
  | 'unconverted' // no site version yet: ask Claude to convert it
  | 'outdated' //  the Vercel chapter changed after it was converted
  | 'ready' //     converted, never posted
  | 'posted' //    posted, and the site has exactly the current version
  | 'update' //    posted, but the text, title or footer has changed since
  | 'queued'
  | 'running'
  | 'failed';

export const STATE_LABEL: Record<CrossState, string> = {
  outside: 'Chỉ có trên Vercel',
  unconverted: 'Chưa chuyển',
  outdated: 'Cần chuyển lại',
  ready: 'Sẵn sàng',
  posted: 'Đã đăng',
  update: 'Cần cập nhật',
  queued: 'Đang chờ',
  running: 'Đang đăng',
  failed: 'Lỗi',
};

export function crossState(opts: {
  eligible: boolean;
  source: string; // current source hash
  post: PostRow | null;
  wanted: string | null; // posted hash of what we would send now (null when not converted)
  job: JobRow | null; // the newest job for this chapter
}): CrossState {
  const { eligible, source, post, wanted, job } = opts;
  if (job && (job.status === 'queued' || job.status === 'running')) return job.status;
  if (!eligible) return 'outside';
  if (!post) return 'unconverted';
  if (post.source_hash !== source) return 'outdated';
  if (job && job.status === 'failed' && (!post.posted_at || Date.parse(job.created_at) > Date.parse(post.posted_at))) return 'failed';
  if (!post.remote_id) return 'ready';
  return post.posted_hash === wanted ? 'posted' : 'update';
}

// Chapters a sync may include: converted for the current source, inside the
// teaser, and not already exactly posted.
export function canSync(state: CrossState): boolean {
  return state === 'ready' || state === 'update' || state === 'failed';
}

// ───────────── One row per chapter, as shown in /admin/crosspost and `crosspost status` ─────────────

export interface SiteRow {
  site: string;
  name: string;
  teaser_limit: number | null;
  default_mode: 'publish' | 'draft';
  enabled: boolean;
}

export interface CrossRow {
  chapter: CrossChapter;
  live: boolean;
  eligible: boolean;
  title: string; // title on the other site
  sourceHash: string;
  wantedHash: string | null; // postedHash of what would be sent now; null when not converted for this source
  final: string | null; // what would be sent now
  post: PostRow | null;
  job: JobRow | null; // newest job
  state: CrossState;
}

export async function buildRows(
  all: CrossChapter[],
  site: SiteRow,
  cfg: SiteConfig,
  posts: PostRow[],
  jobs: JobRow[],
  now = Date.now(),
): Promise<CrossRow[]> {
  const live = liveInOrder(all, now);
  const allowed = teaserSet(live, site.teaser_limit);
  const postBy = new Map(posts.filter((p) => p.site === site.site).map((p) => [p.chapter_id, p]));
  const jobBy = new Map<string, JobRow>();
  for (const j of jobs) {
    if (j.site !== site.site) continue;
    const prev = jobBy.get(j.chapter_id);
    if (!prev || j.id > prev.id) jobBy.set(j.chapter_id, j);
  }
  const rows: CrossRow[] = [];
  for (const c of [...all].sort((a, b) => a.position - b.position)) {
    const isLiveNow = isLive(c, now);
    const post = postBy.get(c.id) ?? null;
    const job = jobBy.get(c.id) ?? null;
    const src = await sourceHash(c);
    const title = remoteTitle(c);
    let final: string | null = null;
    let wanted: string | null = null;
    if (post && post.source_hash === src) {
      final = finalText(cfg, c, post.converted_body, isLiveNow ? nextLive(live, c) : null);
      wanted = await postedHash(title, final);
    }
    const eligible = isLiveNow && allowed.has(c.id);
    rows.push({
      chapter: c,
      live: isLiveNow,
      eligible,
      title,
      sourceHash: src,
      wantedHash: wanted,
      final,
      post,
      job,
      state: crossState({ eligible, source: src, post, wanted, job }),
    });
  }
  return rows;
}
