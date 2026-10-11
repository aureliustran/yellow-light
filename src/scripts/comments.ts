import { anonTag, defaultAvatar } from '../lib/avatar';
import { browserClient } from '../lib/supabase';
import { onMe, openLogin, type Me } from './auth';
import { h, timeAgo, toast } from './ui';

interface CommentRow {
  id: string;
  body: string;
  created_at: string;
  parent_id: string | null;
  user_id: string;
  status: 'visible' | 'hidden';
  hidden_reason: string | null;
  edited_at: string | null;
  profiles: { display_name: string; anon_no: number; is_admin: boolean } | null;
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
      .select('id, body, created_at, parent_id, user_id, status, hidden_reason, edited_at, profiles(display_name, anon_no, is_admin)')
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

  async function report(id: string) {
    if (!me) return openLogin('Đăng nhập để báo cáo bình luận.');
    const reason = prompt('Lý do báo cáo (không bắt buộc):');
    if (reason === null) return;
    const { error } = await sb.from('comment_reports').insert({ comment_id: id, reason: reason.trim().slice(0, 300) });
    if (!error) return toast('Đã gửi báo cáo. Cảm ơn bạn.');
    toast(error.code === '23505' ? 'Bạn đã báo cáo bình luận này rồi.' : 'Không gửi được báo cáo: ' + error.message);
  }

  async function setHidden(id: string, hidden: boolean) {
    let reason: string | null = null;
    if (hidden) {
      reason = prompt('Lý do ẩn (chỉ tác giả bình luận và bạn thấy):');
      if (reason === null) return;
    }
    const { error } = await sb.rpc('admin_set_comment_status', { p_id: id, p_status: hidden ? 'hidden' : 'visible', p_reason: reason });
    if (error) toast('Không đổi được trạng thái: ' + error.message);
    else await load();
  }

  // Admin only: edit the text in place. The database logs the old text.
  function editForm(c: CommentRow, bodyEl: HTMLElement) {
    const ta = h('textarea', { 'aria-label': 'Sửa bình luận', maxlength: String(MAX), rows: '3' });
    ta.value = c.body;
    const save = h('button', { type: 'submit', class: 'btn primary small', text: 'Lưu' });
    const cancel = h('button', { type: 'button', class: 'btn ghost small', text: 'Hủy' });
    const f = h('form', { class: 'comment-form reply-form' }, ta, h('div', { class: 'row' }, h('span'), h('div', { style: 'display:flex;gap:8px' }, cancel, save)));
    cancel.addEventListener('click', () => f.replaceWith(bodyEl));
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = ta.value.trim();
      if (!body) return;
      save.disabled = true;
      const { error } = await sb.rpc('admin_edit_comment', { p_id: c.id, p_body: body });
      if (error) {
        toast('Không sửa được: ' + error.message);
        save.disabled = false;
        return;
      }
      await load();
    });
    bodyEl.replaceWith(f);
    ta.focus();
  }

  function avatarFor(c: CommentRow): HTMLElement {
    // Always the generated avatar: nobody's Google photo is shown.
    return h('img', { class: 'avatar', src: defaultAvatar(c.profiles?.anon_no ?? 0), alt: '' });
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
      h('div', { class: 'comment-who' }, h('strong', { text: c.profiles?.display_name ?? 'Ẩn danh' }), c.profiles?.anon_no ? h('span', { class: 'anon-no', text: anonTag(c.profiles.anon_no) }) : null, c.profiles?.is_admin ? h('span', { class: 'badge-author', text: 'Tác giả' }) : null, h('time', { datetime: c.created_at, text: timeAgo(c.created_at) }), c.edited_at ? h('span', { class: 'anon-no', text: '· đã chỉnh sửa' }) : null),
      c.status === 'hidden' &&
        h('div', { class: 'comment-hidden-note', text: me?.isAdmin ? `Đang bị ẩn${c.hidden_reason ? ': ' + c.hidden_reason : ''}` : 'Bình luận của bạn đang bị ẩn khỏi người đọc khác.' }),
      h('div', { class: `comment-body${c.status === 'hidden' ? ' is-hidden' : ''}`, text: c.body }),
      actions,
    );
    const reply = h('button', { type: 'button', text: 'Trả lời' });
    reply.addEventListener('click', () => (me ? replyForm(threadId, actions) : openLogin('Đăng nhập để trả lời bình luận.')));
    actions.append(reply);
    if (c.status === 'visible' && me && me.user.id !== c.user_id) {
      const rep = h('button', { type: 'button', class: 'del', text: 'Báo cáo' });
      rep.addEventListener('click', () => report(c.id));
      actions.append(rep);
    }
    if (me?.isAdmin) {
      const editBtn = h('button', { type: 'button', class: 'del', text: 'Sửa' });
      editBtn.addEventListener('click', () => editForm(c, main.querySelector<HTMLElement>('.comment-body')!));
      actions.append(editBtn);
      const hide = h('button', { type: 'button', class: 'del', text: c.status === 'hidden' ? 'Khôi phục' : 'Ẩn' });
      hide.addEventListener('click', () => setHidden(c.id, c.status !== 'hidden'));
      actions.append(hide);
    }
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
    onCount?.(rows.filter((r) => r.status !== 'hidden').length);
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
