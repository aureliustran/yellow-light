// /admin/crosspost: which chapters are on the other site, select them (one by
// one, a range, or all) and queue a sync. This page never posts anything
// itself: the worker on the author's computer takes the queue
// (crosspost/worker.mjs). The database refuses duplicates on its own.
import type { SupabaseClient } from '@supabase/supabase-js';
import { guardAdmin } from './admin-gate';
import { h, timeAgo, toast } from './ui';
import { withNumbers, type ChapterRow } from '../lib/chapters-shared';
import {
  buildRows,
  canSync,
  selectByRange,
  STATE_LABEL,
  type CrossChapter,
  type CrossRow,
  type JobRow,
  type PostRow,
  type SiteConfig,
  type SiteRow,
} from '../../crosspost/core/crosspost';
import { seal, type LoginPayload } from '../../crosspost/core/seal';
import rookiesConfig from '../../crosspost/sites/rookies/config.json';
import truyennhaongConfig from '../../crosspost/sites/truyennhaong/config.json';

// One page for every site: /admin/crosspost?site=<slug>. Add a site's config here.
export const SITE_CONFIGS: Record<string, SiteConfig> = {
  rookies: rookiesConfig as SiteConfig,
  truyennhaong: truyennhaongConfig as SiteConfig,
};
const wantedSite = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('site') : null;
const SITE = wantedSite && SITE_CONFIGS[wantedSite] ? wantedSite : 'rookies';
const cfg = SITE_CONFIGS[SITE];
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

const PILL: Record<string, string> = {
  outside: 'xs-outside',
  unconverted: 'draft',
  outdated: 'scheduled',
  ready: 'xs-ready',
  posted: 'live',
  update: 'scheduled',
  queued: 'xs-busy',
  running: 'xs-busy',
  failed: 'flag',
};
const JOB_STATUS: Record<JobRow['status'], string> = {
  queued: 'Đang chờ',
  running: 'Đang đăng',
  done: 'Xong',
  failed: 'Lỗi',
  cancelled: 'Đã hủy',
};
const JOB_RESULT: Record<string, string> = {
  created: 'tạo chương mới',
  updated: 'cập nhật',
  adopted: 'nhận lại chương có sẵn',
  unchanged: 'không đổi',
};

interface Worker {
  worker: string;
  last_seen: string;
  info: string | null;
  public_key: JsonWebKey | null;
  needs_login: boolean;
  has_saved_login: boolean;
  login_note: string | null;
}
const WORKER_COLS = 'worker, last_seen, info, public_key, needs_login, has_saved_login, login_note';
const ALIVE_MS = 60_000;

function fillSiteText() {
  for (const el of $$('[data-site-name]')) el.textContent = cfg.name;
  for (const el of $$('[data-site-slug]')) el.textContent = SITE;
  for (const a of $$<HTMLAnchorElement>('[data-site-tab]')) {
    const on = a.dataset.siteTab === SITE;
    a.classList.toggle('primary', on);
    a.classList.toggle('ghost', !on);
    if (on) a.setAttribute('aria-current', 'page');
  }
  const links = $('[data-links-note]');
  if (links) links.hidden = cfg.linksAllowed !== false;
}

export function initCrosspostAdmin(): void {
  fillSiteText();
  guardAdmin((sb) => start(sb));
}

function start(sb: SupabaseClient): void {
  let site: SiteRow | null = null;
  let rows: CrossRow[] = [];
  let jobs: JobRow[] = [];
  const selected = new Set<string>();
  const open = new Set<string>(); // rows whose preview is shown
  let timer: number | undefined;

  const body = $('[data-rows]');
  const syncBtn = $<HTMLButtonElement>('[data-sync]');
  const modeSel = $<HTMLSelectElement>('[data-mode]');
  const teaserInput = $<HTMLInputElement>('[data-teaser]');
  let modeTouched = false;
  modeSel.addEventListener('change', () => (modeTouched = true));

  async function load() {
    const [ch, st, ps, js, ws] = await Promise.all([
      // Pinned to Legacy (v1), like crosspost/core/data.mjs: the other sites carry v1.
      sb.from('chapters').select('id, slug, kind, title, color, story_date, status, publish_at, position, body').eq('edition', 'v1').order('position'),
      sb.from('crosspost_sites').select('*').eq('site', SITE).maybeSingle(),
      sb.from('crosspost_posts').select('*').eq('site', SITE),
      sb.from('crosspost_jobs').select('*').eq('site', SITE).order('id', { ascending: false }).limit(300),
      sb.from('crosspost_workers').select(WORKER_COLS).eq('site', SITE),
    ]);
    const err = ch.error || st.error || ps.error || js.error || ws.error;
    if (err) {
      const hint = /crosspost_/.test(err.message) ? ' Đã chạy supabase/migrations/0005_crosspost.sql trong Supabase chưa?' : '';
      return toast('Không tải được: ' + err.message + hint, 8000);
    }
    if (!st.data) return toast(`Chưa có trang "${SITE}" trong crosspost_sites. Chạy migration của trang này trong Supabase.`, 8000);
    site = st.data as SiteRow;
    jobs = (js.data ?? []) as JobRow[];
    const chapters: CrossChapter[] = withNumbers((ch.data ?? []) as ChapterRow[]);
    rows = await buildRows(chapters, site, cfg, (ps.data ?? []) as PostRow[], jobs);
    for (const id of [...selected]) if (!rows.some((r) => r.chapter.id === id && canSync(r.state))) selected.delete(id);
    if (!modeTouched) modeSel.value = site.default_mode;
    if (document.activeElement !== teaserInput) teaserInput.value = site.teaser_limit == null ? '' : String(site.teaser_limit);
    $$('[data-site-name]').forEach((e) => (e.textContent = site!.name));
    renderWorker((ws.data ?? []) as Worker[]);
    render();
    // Refresh while the worker has something to do.
    clearTimeout(timer);
    if (jobs.some((j) => j.status === 'queued' || j.status === 'running')) timer = window.setTimeout(load, 8000);
  }

  // The worker that answers sign-in requests: the one seen most recently.
  let worker: Worker | null = null;
  const alive = (w: Worker | null) => !!w && Date.now() - Date.parse(w.last_seen) < ALIVE_MS;

  function renderWorker(ws: Worker[]) {
    worker = [...ws].sort((a, b) => Date.parse(b.last_seen) - Date.parse(a.last_seen))[0] ?? null;
    const el = $('[data-worker]');
    const on = alive(worker);
    el.className = 'worker-state ' + (on ? (worker!.needs_login ? 'warn' : 'on') : 'off');
    el.textContent = !worker
      ? 'Worker chưa chạy lần nào. Chạy: npm run crosspost:worker'
      : !on
        ? `Worker đã tắt (lần cuối ${timeAgo(worker.last_seen)}). Chạy: npm run crosspost:worker`
        : worker.needs_login
          ? 'Worker cần đăng nhập lại: các chương đang chờ trong hàng đợi'
          : `Worker đang chạy · ${worker.info ?? ''}`;

    const panel = $('[data-login-panel]');
    panel.classList.toggle('attention', on && worker!.needs_login);
    const state = $('[data-login-state]');
    state.textContent = !on
      ? 'Bật worker trước (npm run crosspost:worker), rồi mới gửi đăng nhập được.'
      : [worker!.needs_login ? 'Đang bị đăng xuất.' : null, worker!.login_note, worker!.has_saved_login ? 'Đã lưu mật khẩu trên máy worker.' : null]
          .filter(Boolean)
          .join(' ') || 'Worker đang dùng phiên đăng nhập đã lưu trong trình duyệt của nó.';
    $('[data-forget]').hidden = !(on && worker!.has_saved_login);
    $<HTMLButtonElement>('[data-login-send]').disabled = !on || !worker!.public_key;
  }

  function remoteLink(r: CrossRow): HTMLElement | null {
    if (!r.post?.remote_id) return null;
    const href = cfg.remoteViewUrl ? cfg.remoteViewUrl.replace('{id}', r.post.remote_id) : r.post.remote_url ?? '#';
    return h('a', { href, target: '_blank', rel: 'noopener', class: 'xs-remote', text: 'Mở ↗' });
  }

  function render() {
    const count = (...s: string[]) => rows.filter((r) => s.includes(r.state)).length;
    $('[data-cards]').replaceChildren(
      card('Đã đăng', count('posted')),
      card('Cần cập nhật', count('update', 'failed')),
      card('Sẵn sàng', count('ready')),
      card('Cần Claude chuyển', count('unconverted', 'outdated')),
    );

    const live = rows.filter((r) => r.live);
    body.replaceChildren(
      ...live.flatMap((r) => {
        const id = r.chapter.id;
        const syncable = canSync(r.state);
        const box = h('input', { type: 'checkbox', 'aria-label': `Chọn ${r.title}`, disabled: !syncable });
        box.checked = selected.has(id);
        box.addEventListener('change', () => {
          if (box.checked) selected.add(id);
          else selected.delete(id);
          updateSync();
        });
        const label = r.chapter.kind === 'interlude' ? 'Interlude' : r.chapter.number != null ? `Chương ${r.chapter.number}` : 'Chương đặc biệt';
        const name = h('th', { scope: 'row' }, h('span', { class: 'ch-label', text: label }), h('span', { class: 'xs-title', text: r.chapter.title }));
        const note = r.state === 'failed' || r.job?.status === 'failed' ? r.job?.error ?? r.post?.last_error : null;
        const state = h(
          'td',
          {},
          h('span', { class: `pill ${PILL[r.state]}`, text: STATE_LABEL[r.state] }),
          note ? h('span', { class: 'xs-error', text: note }) : null,
        );
        const actions = h('td', {}, h('span', { class: 'row-actions' }, remoteLink(r) ?? '', previewButton(r)));
        const tr = h('tr', { class: r.eligible ? '' : 'xs-muted' }, h('td', {}, box), name, h('td', {}, h('span', { class: 'pill live', text: 'Đã đăng' })), state, actions);
        if (!open.has(id) || !r.final) return [tr];
        const pre = h('pre', { class: 'xs-preview', text: `${r.title}\n\n${r.final}` });
        return [tr, h('tr', { class: 'xs-preview-row' }, h('td', { colspan: '5' }, pre))];
      }),
    );
    const hiddenDrafts = rows.length - live.length;
    if (hiddenDrafts) body.append(h('tr', {}, h('td', { colspan: '5', class: 'meta-small', text: `${hiddenDrafts} chương chưa đăng trên Vercel không hiện ở đây.` })));

    renderJobs();
    updateSync();
  }

  function previewButton(r: CrossRow): HTMLElement | string {
    if (!r.final) return '';
    const id = r.chapter.id;
    const b = h('button', { type: 'button', class: 'btn small ghost', 'aria-expanded': String(open.has(id)), text: open.has(id) ? 'Ẩn' : 'Xem bản đăng' });
    b.addEventListener('click', () => {
      if (open.has(id)) open.delete(id);
      else open.add(id);
      render();
    });
    return b;
  }

  function card(label: string, n: number) {
    return h('div', { class: 'stat-card' }, h('span', { class: 'stat-label', text: label }), h('span', { class: 'stat-value', text: String(n) }));
  }

  function renderJobs() {
    const list = $('[data-jobs]');
    const title = new Map(rows.map((r) => [r.chapter.id, r.title]));
    const recent = jobs.slice(0, 25);
    list.replaceChildren(
      ...recent.map((j) => {
        const result = j.status === 'done' && j.result ? ` · ${JOB_RESULT[j.result] ?? j.result}` : '';
        const when = j.finished_at ?? j.started_at ?? j.created_at;
        return h(
          'li',
          { class: `xs-job ${j.status}` },
          h('span', { class: 'xs-job-title', text: title.get(j.chapter_id) ?? '(chương đã xóa)' }),
          h('span', { class: 'meta-small', text: `${JOB_STATUS[j.status]}${result} · ${j.mode === 'publish' ? 'đăng ngay' : 'bản thảo'} · ${timeAgo(when)}` }),
          j.error ? h('span', { class: 'xs-error', text: j.error }) : null,
        );
      }),
    );
    $('[data-jobs-empty]').hidden = recent.length > 0;
    $('[data-cancel]').hidden = !jobs.some((j) => j.status === 'queued');
  }

  function updateSync() {
    const n = selected.size;
    syncBtn.disabled = n === 0;
    syncBtn.textContent = n ? `Đồng bộ ${n} chương` : 'Đồng bộ';
  }

  // ── selection ──
  $('[data-select-all]').addEventListener('click', () => {
    rows.filter((r) => canSync(r.state)).forEach((r) => selected.add(r.chapter.id));
    render();
  });
  $('[data-select-none]').addEventListener('click', () => {
    selected.clear();
    render();
  });
  $<HTMLFormElement>('[data-range-form]').addEventListener('submit', (e) => {
    e.preventDefault();
    const spec = $<HTMLInputElement>('[data-range]').value.trim();
    if (!spec) return;
    try {
      const ids = new Set(selectByRange(rows.filter((r) => r.live).map((r) => r.chapter), spec).map((c) => c.id));
      let added = 0;
      let skipped = 0;
      for (const r of rows) {
        if (!ids.has(r.chapter.id)) continue;
        if (canSync(r.state)) {
          selected.add(r.chapter.id);
          added++;
        } else skipped++;
      }
      toast(skipped ? `Đã chọn ${added} chương; ${skipped} chương bỏ qua (đã đăng, chưa chuyển, hoặc ngoài giới hạn).` : `Đã chọn ${added} chương.`);
      render();
    } catch (err) {
      toast((err as Error).message);
    }
  });

  // ── sync ──
  syncBtn.addEventListener('click', async () => {
    const picked = rows.filter((r) => selected.has(r.chapter.id) && canSync(r.state));
    if (!picked.length) return;
    const creates = picked.filter((r) => !r.post?.remote_id);
    const updates = picked.length - creates.length;
    // Same rule as the worker: new chapters go up in story order, no gaps.
    const firstNew = creates[0];
    if (firstNew) {
      const gap = rows.filter(
        (r) =>
          r.eligible &&
          r.chapter.position < firstNew.chapter.position &&
          !r.post?.remote_id &&
          !selected.has(r.chapter.id) &&
          !(r.job && (r.job.status === 'queued' || r.job.status === 'running')),
      );
      if (gap.length) {
        return toast(`Đăng theo thứ tự: chọn cả ${gap.map((r) => r.title).join(', ')} (hoặc chuyển chúng trước).`, 8000);
      }
    }
    const mode = modeSel.value as 'publish' | 'draft';
    const ok = confirm(
      `Đồng bộ ${picked.length} chương lên ${site!.name} (${mode === 'publish' ? 'ĐĂNG NGAY, công khai' : 'lưu bản thảo'}):\n` +
        `• tạo mới: ${creates.length}\n• cập nhật: ${updates}\n\nWorker trên máy bạn sẽ đăng lần lượt. Tiếp tục?`,
    );
    if (!ok) return;
    syncBtn.disabled = true;
    const { data, error } = await sb.rpc('crosspost_enqueue', { p_site: SITE, p_chapters: picked.map((r) => r.chapter.id), p_mode: mode });
    if (error) {
      updateSync();
      return toast('Không xếp hàng được: ' + error.message, 6000);
    }
    const added = Number(data ?? 0);
    toast(added < picked.length ? `Đã xếp hàng ${added} chương (${picked.length - added} chương đã có trong hàng đợi).` : `Đã xếp hàng ${added} chương.`);
    selected.clear();
    await load();
  });

  $('[data-cancel]').addEventListener('click', async () => {
    const ids = jobs.filter((j) => j.status === 'queued').map((j) => j.id);
    if (!ids.length || !confirm(`Hủy ${ids.length} việc chưa bắt đầu?`)) return;
    const { error } = await sb.rpc('crosspost_cancel', { p_ids: ids });
    if (error) return toast('Không hủy được: ' + error.message);
    toast('Đã hủy.');
    await load();
  });

  // ── signing the worker in ──
  async function sendLoginRequest(kind: 'login' | 'forget', payload: unknown): Promise<void> {
    const { data, error } = await sb
      .from('crosspost_login_requests')
      .insert({ worker: worker!.worker, kind, payload })
      .select('id')
      .single();
    if (error) return toast('Không gửi được: ' + error.message, 6000);
    toast('Đã gửi cho worker, đang chờ trả lời…');
    // The worker checks every few seconds; signing in takes up to ~30 s.
    const until = Date.now() + 120_000;
    while (Date.now() < until) {
      await new Promise((r) => setTimeout(r, 2500));
      const res = await sb.from('crosspost_login_requests').select('status, message').eq('id', data.id).single();
      if (res.data && res.data.status !== 'new') {
        toast(res.data.message ?? (res.data.status === 'done' ? 'Xong.' : 'Không được.'), 7000);
        await load();
        return;
      }
    }
    toast('Worker chưa trả lời sau 2 phút. Worker còn chạy không?', 7000);
    await load();
  }

  const loginForm = $<HTMLFormElement>('[data-login-form]');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!alive(worker) || !worker?.public_key) return toast('Bật worker trước: npm run crosspost:worker');
    const f = new FormData(loginForm);
    const payload: LoginPayload = {
      username: String(f.get('username') ?? '').trim(),
      password: String(f.get('password') ?? ''),
      remember: f.get('remember') === 'on',
      sentAt: new Date().toISOString(),
    };
    if (!payload.username || !payload.password) return;
    const sendBtn = $<HTMLButtonElement>('[data-login-send]');
    sendBtn.disabled = true;
    try {
      const sealed = await seal(worker.public_key, payload);
      // The readable password is not kept anywhere on this page after this.
      payload.password = '';
      (loginForm.elements.namedItem('password') as HTMLInputElement).value = '';
      await sendLoginRequest('login', sealed);
    } catch (err) {
      toast('Không mã hóa được: ' + (err as Error).message, 6000);
    } finally {
      sendBtn.disabled = !alive(worker);
    }
  });

  $('[data-forget]').addEventListener('click', async () => {
    if (!alive(worker) || !confirm(`Xóa mật khẩu ${cfg.name} đã lưu trên máy chạy worker?`)) return;
    await sendLoginRequest('forget', null);
  });

  // ── teaser limit ──
  $('[data-teaser-save]').addEventListener('click', async () => {
    const v = teaserInput.value.trim();
    const n = v === '' ? null : Number.parseInt(v, 10);
    if (n !== null && (!Number.isFinite(n) || n < 0)) return toast('Nhập số chương (0 trở lên), hoặc để trống để đăng tất cả.');
    const { error } = await sb.from('crosspost_sites').update({ teaser_limit: n }).eq('site', SITE);
    if (error) return toast('Không lưu được: ' + error.message);
    toast(n == null ? 'Sẽ đăng tất cả chương.' : `Sẽ đăng ${n} chương đầu.`);
    await load();
  });

  load();
}
