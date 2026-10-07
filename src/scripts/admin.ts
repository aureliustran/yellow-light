// Admin page: list, reorder, create, edit and delete chapters.
// Every write is checked again by the database, so hiding this page is not
// what protects the story: the security rules are.
import { browserClient, isConfigured } from '../lib/supabase';
import { renderMarkdown, findMarkupProblems } from '../lib/markdown';
import { slugify } from '../lib/slug';
import { withNumbers, chapterLabel, isLive, type ChapterRow } from '../lib/chapters-shared';
import { onMe, openLogin } from './auth';
import { initTranslations } from './translations';
import { h, toast } from './ui';

type Row = ChapterRow & { number: number | null };
const COLS = 'id, slug, kind, title, color, story_date, status, publish_at, position, updated_at';
const DEFAULT_COLOR = '#D9C8B0';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;

function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatShort(iso: string): string {
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function statusPill(r: Pick<ChapterRow, 'status' | 'publish_at'>): [string, string] {
  if (r.status === 'draft') return ['draft', 'Nháp'];
  if (!isLive(r)) return ['scheduled', `Hẹn ${formatShort(r.publish_at!)}`];
  return ['live', 'Đã đăng'];
}

const GRIP =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';

export function initAdmin(): void {
  const gates = [...document.querySelectorAll<HTMLElement>('[data-gate]')];
  const adminEl = $('[data-admin]');
  const show = (name: string) => {
    gates.forEach((g) => (g.hidden = g.dataset.gate !== name));
    adminEl.hidden = name !== 'admin';
  };

  if (!isConfigured) return show('config');
  $('[data-gate-login]').addEventListener('click', () => openLogin('Đăng nhập bằng tài khoản Google của tác giả.'));

  let started = false;
  onMe((me) => {
    if (!me) return show('signedout');
    if (!me.isAdmin) {
      $('[data-gate-email]').textContent = me.user.email ?? me.name;
      $('[data-gate-sql]').textContent = `update public.profiles set is_admin = true\nwhere id = '${me.user.id}';`;
      return show('denied');
    }
    show('admin');
    if (!started) {
      started = true;
      startEditor();
    }
  });
}

function startEditor(): void {
  const sb = browserClient();
  const list = $<HTMLOListElement>('[data-list]');
  const form = $<HTMLFormElement>('[data-editor]');
  const emptyEditor = $('[data-empty-editor]');
  const f = {
    title: $<HTMLInputElement>('#f-title'),
    slug: $<HTMLInputElement>('#f-slug'),
    kinds: [...form.querySelectorAll<HTMLInputElement>('input[name="kind"]')],
    color: $<HTMLInputElement>('input[name="color"]', form),
    date: $<HTMLInputElement>('#f-date'),
    status: $<HTMLSelectElement>('#f-status'),
    publish: $<HTMLInputElement>('#f-publish'),
    body: $<HTMLTextAreaElement>('#f-body'),
  };
  const colorField = $('[data-color-field]');
  const publishField = $('[data-publish-field]');
  const slugPreview = $('[data-slug-preview]');
  const swatches = [...form.querySelectorAll<HTMLButtonElement>('[data-swatch]')];
  const preview = $('[data-preview]');
  const previewBody = $('[data-preview-body]');
  const problemsEl = $<HTMLUListElement>('[data-problems]');
  const saveBtn = $<HTMLButtonElement>('[data-save]');
  const viewLink = $<HTMLAnchorElement>('[data-view]');
  const deleteBtn = $<HTMLButtonElement>('[data-delete]');
  const saveState = $('[data-save-state]');

  let rows: Row[] = [];
  let currentId: string | null = null; // 'new' while creating
  let snapshot = '';
  let slugTouched = false;
  let saving = false;

  // ───── Form state ─────

  const kind = () => (f.kinds.find((k) => k.checked)?.value ?? 'chapter') as 'chapter' | 'interlude';
  const serialize = () =>
    JSON.stringify([f.title.value, f.slug.value, kind(), f.color.value, f.date.value, f.status.value, f.publish.value, f.body.value]);
  const isDirty = () => currentId !== null && serialize() !== snapshot;

  const paintKind = () => (colorField.hidden = kind() !== 'interlude');
  const paintStatus = () => (publishField.hidden = f.status.value !== 'published');
  const paintSlug = () => (slugPreview.textContent = f.slug.value || '…');
  const paintSwatches = () =>
    swatches.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.swatch!.toLowerCase() === f.color.value.toLowerCase())));

  let problemTimer: number | undefined;
  const paintProblems = () => {
    const problems = findMarkupProblems(f.body.value);
    problemsEl.replaceChildren(...problems.map((p) => h('li', { text: p })));
    problemsEl.hidden = problems.length === 0;
    return problems;
  };
  const paintPreview = () => {
    if (preview.hidden) return;
    previewBody.innerHTML = renderMarkdown(f.body.value); // renderer escapes raw HTML
    initTranslations(previewBody);
  };

  function fill(r: Partial<ChapterRow> & { body?: string }) {
    f.title.value = r.title ?? '';
    f.slug.value = r.slug ?? '';
    f.kinds.forEach((k) => (k.checked = k.value === (r.kind ?? 'chapter')));
    f.color.value = r.color ?? DEFAULT_COLOR;
    f.date.value = r.story_date ?? '';
    f.status.value = r.status ?? 'draft';
    f.publish.value = toLocalInput(r.publish_at ?? null);
    f.body.value = r.body ?? '';
    paintKind();
    paintStatus();
    paintSlug();
    paintSwatches();
    paintProblems();
    paintPreview();
    snapshot = serialize();
    form.hidden = false;
    emptyEditor.hidden = true;
    const exists = currentId !== 'new';
    deleteBtn.hidden = !exists;
    viewLink.hidden = !(exists && r.status && isLive(r as ChapterRow));
    viewLink.href = `/doc/${r.slug ?? ''}`;
    saveState.textContent = exists && r.updated_at ? `Lưu lần cuối ${formatShort(r.updated_at)}` : 'Chưa lưu';
  }

  const confirmLeave = () => !isDirty() || confirm('Có thay đổi chưa lưu. Bỏ qua thay đổi?');

  // ───── List ─────

  async function loadList() {
    const { data, error } = await sb.from('chapters').select(COLS).order('position', { ascending: true });
    if (error) return toast('Không tải được danh sách: ' + error.message);
    rows = withNumbers((data ?? []) as ChapterRow[]);
    renderList();
  }

  function renderList() {
    list.replaceChildren(...rows.map((r, i) => listItem(r, i)));
    if (!rows.length) list.append(h('li', { class: 'ch-item', style: 'padding:20px;color:var(--ink-2)', text: 'Chưa có chương nào.' }));
  }

  function listItem(r: Row, i: number): HTMLLIElement {
    const [pillClass, pillText] = statusPill(r);
    const dot = h('span', { class: `ch-dot ${r.kind}`, 'aria-hidden': 'true' });
    if (r.kind === 'interlude') dot.style.background = r.color ?? DEFAULT_COLOR;
    const open = h(
      'button',
      { type: 'button', class: 'open', 'aria-current': r.id === currentId ? 'true' : undefined },
      dot,
      h('span', { class: 'ch-text' }, h('span', { class: 'ch-label', text: chapterLabel(r) }), h('span', { class: 'ch-title', text: r.title })),
    );
    open.addEventListener('click', () => selectChapter(r.id));
    const handle = h('span', { class: 'handle', title: 'Kéo để đổi thứ tự' });
    handle.innerHTML = GRIP;
    const up = h('button', { type: 'button', 'aria-label': `Đưa "${r.title}" lên`, text: '▲' });
    const down = h('button', { type: 'button', 'aria-label': `Đưa "${r.title}" xuống`, text: '▼' });
    up.disabled = i === 0;
    down.disabled = i === rows.length - 1;
    up.addEventListener('click', () => move(i, i - 1));
    down.addEventListener('click', () => move(i, i + 1));
    const li = h(
      'li',
      { class: `ch-item${r.id === currentId ? ' active' : ''}`, draggable: 'true', 'data-id': r.id },
      handle,
      open,
      h('span', { class: `pill ${pillClass}`, text: pillText }),
      h('span', { class: 'ch-move' }, up, down),
    );
    return li;
  }

  async function saveOrder(ids: string[]) {
    const before = rows;
    const byId = new Map(rows.map((r) => [r.id, r]));
    rows = withNumbers(ids.map((id, i) => ({ ...byId.get(id)!, position: i + 1 })));
    renderList();
    const { error } = await sb.rpc('reorder_chapters', { p_ids: ids });
    if (error) {
      rows = before;
      renderList();
      toast('Không lưu được thứ tự: ' + error.message);
    } else {
      toast('Đã lưu thứ tự.');
    }
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= rows.length) return;
    const ids = rows.map((r) => r.id);
    [ids[from], ids[to]] = [ids[to], ids[from]];
    saveOrder(ids).then(() => {
      list.querySelectorAll<HTMLElement>('.ch-item')[to]?.querySelector<HTMLButtonElement>(to < from ? '.ch-move button' : '.ch-move button:last-child')?.focus();
    });
  }

  // Drag and drop (mouse). Phones use the arrow buttons.
  let dragging: HTMLElement | null = null;
  list.addEventListener('dragstart', (e) => {
    dragging = (e.target as HTMLElement).closest('.ch-item');
    if (!dragging) return;
    dragging.classList.add('dragging');
    e.dataTransfer?.setData('text/plain', dragging.dataset.id ?? '');
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
  });
  list.addEventListener('dragover', (e) => {
    if (!dragging) return;
    e.preventDefault();
    const over = (e.target as HTMLElement).closest<HTMLElement>('.ch-item');
    if (!over || over === dragging) return;
    const r = over.getBoundingClientRect();
    over[e.clientY < r.top + r.height / 2 ? 'before' : 'after'](dragging);
  });
  list.addEventListener('drop', (e) => e.preventDefault());
  list.addEventListener('dragend', () => {
    if (!dragging) return;
    dragging.classList.remove('dragging');
    dragging = null;
    const ids = [...list.querySelectorAll<HTMLElement>('.ch-item[data-id]')].map((li) => li.dataset.id!);
    if (ids.join() !== rows.map((r) => r.id).join()) saveOrder(ids);
  });

  // ───── Open / new ─────

  async function selectChapter(id: string) {
    if (id === currentId || !confirmLeave()) return;
    const { data, error } = await sb.from('chapters').select(`${COLS}, body`).eq('id', id).single();
    if (error) return toast('Không mở được chương: ' + error.message);
    currentId = id;
    slugTouched = true;
    fill(data as ChapterRow);
    renderList();
  }

  $('[data-new]').addEventListener('click', () => {
    if (!confirmLeave()) return;
    currentId = 'new';
    slugTouched = false;
    fill({ kind: 'chapter', status: 'draft', body: '' });
    renderList();
    f.title.focus();
  });

  // ───── Field behaviour ─────

  f.title.addEventListener('input', () => {
    if (currentId === 'new' && !slugTouched) {
      f.slug.value = slugify(f.title.value);
      paintSlug();
    }
  });
  f.slug.addEventListener('input', () => {
    slugTouched = true;
    paintSlug();
  });
  f.slug.addEventListener('blur', () => {
    if (f.slug.value) f.slug.value = slugify(f.slug.value);
    paintSlug();
  });
  f.kinds.forEach((k) => k.addEventListener('change', paintKind));
  f.status.addEventListener('change', paintStatus);
  swatches.forEach((s) =>
    s.addEventListener('click', () => {
      f.color.value = s.dataset.swatch!;
      paintSwatches();
    }),
  );
  f.color.addEventListener('input', paintSwatches);
  f.body.addEventListener('input', () => {
    window.clearTimeout(problemTimer);
    problemTimer = window.setTimeout(paintProblems, 300);
  });

  // Tabs
  const tabs = [...form.querySelectorAll<HTMLButtonElement>('[data-tab]')];
  tabs.forEach((t) =>
    t.addEventListener('click', () => {
      const isPreview = t.dataset.tab === 'preview';
      tabs.forEach((x) => x.setAttribute('aria-selected', String(x === t)));
      preview.hidden = !isPreview;
      f.body.hidden = isPreview;
      paintPreview();
    }),
  );

  // Insert helpers
  const place = (text: string, selectFrom: number, selectTo: number) => {
    const s = f.body.selectionStart;
    f.body.setRangeText(text, s, f.body.selectionEnd, 'start');
    f.body.focus();
    f.body.setSelectionRange(s + selectFrom, s + selectTo);
    f.body.dispatchEvent(new Event('input'));
  };
  form.querySelectorAll<HTMLButtonElement>('[data-insert]').forEach((b) =>
    b.addEventListener('click', () => {
      if (f.body.hidden) tabs[0].click(); // switch back from preview first
      const sel = f.body.value.slice(f.body.selectionStart, f.body.selectionEnd);
      switch (b.dataset.insert) {
        case 'break': {
          const t = '\n\n---\n\n';
          return place(t, t.length, t.length);
        }
        case 'chat': {
          const t = '\n\n:::chat Tên nhóm\nTên: tin nhắn\n> tin nhắn gửi đi\n:::\n\n';
          return place(t, 10, 18); // selects "Tên nhóm"
        }
        case 'en':
        case 'ht': {
          const orig = sel || 'nguyên bản';
          const t = `[[${b.dataset.insert}: ${orig} || ]]`;
          const start = 6;
          return sel ? place(t, t.length - 2, t.length - 2) : place(t, start, start + orig.length);
        }
        case 'block': {
          const orig = sel || 'Nguyên bản';
          const t = `\n\n:::dich en\n${orig}\n||\n\n:::\n\n`;
          const cursor = t.indexOf('||\n') + 3;
          return place(t, cursor, cursor);
        }
      }
    }),
  );

  // ───── Save / delete ─────

  async function save() {
    if (saving || currentId === null) return;
    const title = f.title.value.trim();
    const slug = slugify(f.slug.value || title);
    if (!title) {
      toast('Cần có tên chương.');
      return f.title.focus();
    }
    const problems = paintProblems();
    if (problems.length && !confirm(`Có ${problems.length} lỗi định dạng (xem bên dưới). Vẫn lưu?`)) return;

    const payload = {
      title,
      slug,
      kind: kind(),
      color: kind() === 'interlude' ? f.color.value : null,
      story_date: f.date.value.trim() || null,
      status: f.status.value,
      publish_at: f.status.value === 'published' && f.publish.value ? new Date(f.publish.value).toISOString() : null,
      body: f.body.value,
    };

    saving = true;
    saveBtn.disabled = true;
    saveState.textContent = 'Đang lưu…';
    const query =
      currentId === 'new'
        ? sb.from('chapters').insert(payload).select(`${COLS}, body`).single()
        : sb.from('chapters').update(payload).eq('id', currentId).select(`${COLS}, body`).single();
    const { data, error } = await query;
    saving = false;
    saveBtn.disabled = false;

    if (error) {
      saveState.textContent = 'Chưa lưu';
      if (error.code === '23505') return toast(`Địa chỉ "/doc/${slug}" đã có chương khác dùng. Đổi địa chỉ trang nhé.`);
      if (error.code === '42501') return toast('Tài khoản này không có quyền ghi.');
      return toast('Không lưu được: ' + error.message);
    }
    const saved = data as ChapterRow;
    currentId = saved.id;
    slugTouched = true;
    fill(saved);
    await loadList();
    const [kindOfPill] = statusPill(saved);
    toast(
      kindOfPill === 'scheduled'
        ? `Đã lưu. Sẽ lên đèn lúc ${formatShort(saved.publish_at!)}.`
        : kindOfPill === 'live'
          ? 'Đã lưu. Trang cho độc giả cập nhật trong khoảng 30 giây.'
          : 'Đã lưu bản nháp.',
    );
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    save();
  });
  form.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      save();
    }
  });

  deleteBtn.addEventListener('click', async () => {
    if (!currentId || currentId === 'new') return;
    const title = f.title.value || 'chương này';
    if (!confirm(`Xóa "${title}"?\n\nBình luận, đánh giá và lượt đọc của chương này cũng bị xóa. Không hoàn tác được.`)) return;
    const { error } = await sb.from('chapters').delete().eq('id', currentId);
    if (error) return toast('Không xóa được: ' + error.message);
    currentId = null;
    snapshot = '';
    form.hidden = true;
    emptyEditor.hidden = false;
    toast(`Đã xóa "${title}".`);
    loadList();
  });

  addEventListener('beforeunload', (e) => {
    if (isDirty()) e.preventDefault();
  });

  loadList();
}
