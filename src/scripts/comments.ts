import { browserClient } from '../lib/supabase';
import { onMe, openLogin, type Me } from './auth';
import { h, timeAgo, toast } from './ui';

interface CommentRow {
  id: string;
  body: string;
  created_at: string;
  parent_id: string | null;
  user_id: string;
  profiles: { display_name: string; avatar_url: string | null } | null;
}

const MAX = 2000;

export function initComments(section: HTMLElement, chapterId: string, onCount?: (n: number) => void): void {
  const sb = browserClient();
  const list = section.querySelector<HTMLUListElement>('[data-comment-list]')!;
  const empty = section.querySelector<HTMLElement>('[data-comment-empty]')!;
  const form = section.querySelector<HTMLFormElement>('[data-comment-form]')!;
  const textarea = form.querySelector<HTMLTextAreaElement>('textarea')!;
  const counter = form.querySelector<HTMLElement>('[data-comment-counter]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-comment-submit]')!;
  const loggedOut = form.querySelector<HTMLElement>('[data-comment-loggedout]')!;
  const loggedIn = form.querySelector<HTMLElement>('[data-comment-loggedin]')!;

  let me: Me | null = null;
  let rows: CommentRow[] = [];

  const paintForm = () => {
    textarea.disabled = !me;
    loggedOut.hidden = !!me;
    loggedIn.hidden = !me;
    counter.textContent = `${textarea.value.length}/${MAX}`;
    submit.disabled = !me || !textarea.value.trim();
  };

  async function load() {
    const { data, error } = await sb
      .from('comments')
      .select('id, body, created_at, parent_id, user_id, profiles(display_name, avatar_url)')
      .eq('chapter_id', chapterId)
      .order('created_at', { ascending: true });
    if (error) {
      empty.hidden = false;
      empty.textContent = 'Không tải được bình luận.';
      return;
    }
    rows = (data ?? []) as unknown as CommentRow[];
    render();
  }

  async function post(body: string, parentId: string | null): Promise<boolean> {
    if (!me) {
      openLogin('Đăng nhập để bình luận.');
      return false;
    }
    const { error } = await sb.from('comments').insert({ chapter_id: chapterId, body, parent_id: parentId, user_id: me.user.id });
    if (error) {
      toast(error.message || 'Không gửi được bình luận.');
      return false;
    }
    await load();
    return true;
  }

  async function remove(id: string) {
    if (!confirm('Xóa bình luận này?')) return;
    const { error } = await sb.from('comments').delete().eq('id', id);
    if (error) toast('Không xóa được: ' + error.message);
    else await load();
  }

  function avatarFor(c: CommentRow): HTMLElement {
    const url = c.profiles?.avatar_url;
    if (url) {
      const img = h('img', { class: 'avatar', src: url, alt: '' });
      img.referrerPolicy = 'no-referrer';
      return img;
    }
    return h('span', { class: 'avatar', 'aria-hidden': 'true', text: (c.profiles?.display_name ?? '?').trim().charAt(0).toUpperCase() });
  }

  function replyForm(threadId: string, after: HTMLElement) {
    const existing = after.parentElement?.querySelector('.reply-form');
    if (existing) {
      existing.remove();
      return;
    }
    const ta = h('textarea', { 'aria-label': 'Viết trả lời', maxlength: String(MAX), rows: '2', placeholder: 'Viết trả lời…' });
    const send = h('button', { type: 'submit', class: 'btn primary small', text: 'Gửi' });
    const cancel = h('button', { type: 'button', class: 'btn ghost small', text: 'Hủy' });
    const f = h('form', { class: 'comment-form reply-form' }, ta, h('div', { class: 'row' }, h('span'), h('div', { style: 'display:flex;gap:8px' }, cancel, send)));
    cancel.addEventListener('click', () => f.remove());
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!ta.value.trim()) return;
      send.disabled = true;
      if (!(await post(ta.value, threadId))) send.disabled = false;
    });
    after.after(f);
    ta.focus();
  }

  function item(c: CommentRow, threadId: string): HTMLLIElement {
    const actions = h('div', { class: 'comment-actions' });
    const main = h(
      'div',
      { class: 'comment-main' },
      h('div', { class: 'comment-who' }, h('strong', { text: c.profiles?.display_name ?? 'Độc giả' }), h('time', { datetime: c.created_at, text: timeAgo(c.created_at) })),
      h('div', { class: 'comment-body', text: c.body }),
      actions,
    );
    const reply = h('button', { type: 'button', text: 'Trả lời' });
    reply.addEventListener('click', () => (me ? replyForm(threadId, actions) : openLogin('Đăng nhập để trả lời bình luận.')));
    actions.append(reply);
    if (me && (me.user.id === c.user_id || me.isAdmin)) {
      const del = h('button', { type: 'button', class: 'del', text: 'Xóa' });
      del.addEventListener('click', () => remove(c.id));
      actions.append(del);
    }
    return h('li', { class: 'comment' }, avatarFor(c), main);
  }

  function render() {
    const top = rows.filter((r) => !r.parent_id).reverse(); // newest threads first
    const replies = new Map<string, CommentRow[]>();
    rows.filter((r) => r.parent_id).forEach((r) => {
      const arr = replies.get(r.parent_id!) ?? [];
      arr.push(r);
      replies.set(r.parent_id!, arr);
    });
    list.replaceChildren(
      ...top.map((c) => {
        const li = item(c, c.id);
        const kids = replies.get(c.id);
        if (kids?.length) {
          li.querySelector('.comment-main')!.append(h('ul', { class: 'replies' }, ...kids.map((k) => item(k, c.id))));
        }
        return li;
      }),
    );
    empty.hidden = rows.length > 0;
    onCount?.(rows.length);
  }

  textarea.maxLength = MAX;
  textarea.addEventListener('input', paintForm);
  form.querySelector('[data-comment-login]')?.addEventListener('click', () => openLogin('Đăng nhập để bình luận.'));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = textarea.value.trim();
    if (!body) return;
    submit.disabled = true;
    if (await post(body, null)) textarea.value = '';
    paintForm();
  });

  onMe((m) => {
    me = m;
    paintForm();
    render();
  });
  load();
}
