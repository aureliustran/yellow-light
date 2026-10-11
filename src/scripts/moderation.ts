// /admin/comments: every comment on the site, reported ones first if you want,
// with hide / restore / delete / ban, plus the blocked-word list.
import { askBanDays, banLabel, guardAdmin } from './admin-gate';
import { formatNumber, h, timeAgo, toast } from './ui';

interface AdminComment {
  id: string; chapter_id: string; chapter_title: string; parent_id: string | null; user_id: string;
  author: string; email: string | null; body: string; created_at: string; status: 'visible' | 'hidden';
  hidden_reason: string | null; report_count: number; report_reasons: string[]; banned_until: string | null;
}

const PAGE = 30;
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;

export function initModeration(): void {
  guardAdmin((sb) => {
    let filter = 'reported';
    let rows: AdminComment[] = [];
    let more = true;
    const list = $('[data-comment-queue]');
    const moreBtn = $<HTMLButtonElement>('[data-more]');
    const empty = $('[data-queue-empty]');

    async function load(reset: boolean) {
      if (reset) {
        rows = [];
        more = true;
      }
      const before = rows.length ? rows[rows.length - 1].created_at : null;
      const { data, error } = await sb.rpc('admin_comments', { p_filter: filter, p_limit: PAGE, p_before: before });
      if (error) return toast('Không tải được bình luận: ' + error.message);
      const page = (data ?? []) as AdminComment[];
      rows = rows.concat(page);
      more = page.length === PAGE;
      render();
    }

    function render() {
      list.replaceChildren(...rows.map(card));
      empty.hidden = rows.length > 0;
      empty.textContent =
        filter === 'reported' ? 'Không có bình luận nào bị báo cáo.' : filter === 'hidden' ? 'Chưa ẩn bình luận nào.' : 'Chưa có bình luận nào.';
      moreBtn.hidden = !more;
    }

    // Reload everything the author has changed: bans affect every comment of that user.
    const after = (msg: string) => (error: { message: string } | null) => {
      if (error) return toast('Không thực hiện được: ' + error.message);
      toast(msg);
      return load(true);
    };

    function card(c: AdminComment): HTMLElement {
      const ban = banLabel(c.banned_until);
      const actions = h('div', { class: 'mod-actions' });
      const hide = h('button', { type: 'button', class: 'btn small', text: c.status === 'hidden' ? 'Khôi phục' : 'Ẩn' });
      hide.addEventListener('click', async () => {
        let reason: string | null = null;
        if (c.status !== 'hidden') {
          reason = prompt('Lý do ẩn (chỉ tác giả bình luận và bạn thấy):');
          if (reason === null) return;
        }
        const { error } = await sb.rpc('admin_set_comment_status', { p_id: c.id, p_status: c.status === 'hidden' ? 'visible' : 'hidden', p_reason: reason });
        await after(c.status === 'hidden' ? 'Đã khôi phục.' : 'Đã ẩn.')(error);
      });
      const del = h('button', { type: 'button', class: 'btn small danger', text: 'Xóa' });
      del.addEventListener('click', async () => {
        if (!confirm('Xóa hẳn bình luận này (và các trả lời của nó)? Không khôi phục được.')) return;
        const { error } = await sb.from('comments').delete().eq('id', c.id);
        await after('Đã xóa.')(error);
      });
      const banBtn = h('button', { type: 'button', class: 'btn small', text: ban ? 'Đổi / gỡ cấm' : 'Cấm người này' });
      banBtn.addEventListener('click', async () => {
        const days = askBanDays(c.author);
        if (days === null) return;
        const reason = days === 0 ? null : prompt('Lý do (ghi vào nhật ký):');
        const { error } = await sb.rpc('admin_ban_user', { p_user: c.user_id, p_days: days, p_reason: reason });
        await after(days === 0 ? 'Đã gỡ cấm.' : 'Đã cấm.')(error);
      });
      const bodyEl = h('div', { class: 'mod-body', text: c.body });
      const editBtn = h('button', { type: 'button', class: 'btn small', text: 'Sửa' });
      editBtn.addEventListener('click', () => {
        const ta = h('textarea', { 'aria-label': 'Sửa bình luận', maxlength: '2000', rows: '4' });
        ta.value = c.body;
        const save = h('button', { type: 'submit', class: 'btn primary small', text: 'Lưu' });
        const cancel = h('button', { type: 'button', class: 'btn small ghost', text: 'Hủy' });
        const f = h('form', { class: 'mod-edit' }, ta, h('div', { class: 'mod-actions' }, save, cancel));
        cancel.addEventListener('click', () => f.replaceWith(bodyEl));
        f.addEventListener('submit', async (e) => {
          e.preventDefault();
          if (!ta.value.trim()) return;
          save.disabled = true;
          const { error } = await sb.rpc('admin_edit_comment', { p_id: c.id, p_body: ta.value });
          if (error) save.disabled = false;
          await after('Đã sửa bình luận.')(error);
        });
        bodyEl.replaceWith(f);
        ta.focus();
      });
      actions.append(editBtn, hide, del, banBtn);
      if (c.author !== 'Ẩn danh') {
        const resetName = h('button', { type: 'button', class: 'btn small', text: 'Đặt lại tên' });
        resetName.addEventListener('click', async () => {
          if (!confirm(`Đặt lại tên "${c.author}" về "Ẩn danh"?`)) return;
          const reason = prompt('Lý do (ghi vào nhật ký):');
          if (reason === null) return;
          const { error } = await sb.rpc('admin_reset_display_name', { p_user: c.user_id, p_reason: reason });
          await after('Đã đặt lại tên.')(error);
        });
        actions.append(resetName);
      }
      if (c.report_count > 0 && c.status === 'visible') {
        const dismiss = h('button', { type: 'button', class: 'btn small ghost', text: 'Bỏ qua báo cáo' });
        dismiss.addEventListener('click', async () => {
          const { error } = await sb.from('comment_reports').delete().eq('comment_id', c.id);
          await after('Đã bỏ qua báo cáo.')(error);
        });
        actions.append(dismiss);
      }

      return h(
        'li',
        { class: `mod-card${c.status === 'hidden' ? ' is-hidden' : ''}` },
        h(
          'div',
          { class: 'mod-head' },
          h('strong', { text: c.author }),
          c.email ? h('span', { class: 'meta-small', text: c.email }) : null,
          h('span', { class: 'meta-small', text: `· ${c.chapter_title} · ${timeAgo(c.created_at)}${c.parent_id ? ' · trả lời' : ''}` }),
          c.status === 'hidden' ? h('span', { class: 'pill draft', text: 'Đã ẩn' }) : null,
          c.report_count > 0 ? h('span', { class: 'pill flag', text: `${formatNumber(Number(c.report_count))} báo cáo` }) : null,
          ban ? h('span', { class: 'pill flag', text: ban }) : null,
        ),
        bodyEl,
        c.report_reasons?.length ? h('div', { class: 'mod-reasons', text: 'Lý do báo cáo: ' + c.report_reasons.join(' · ') }) : null,
        c.status === 'hidden' && c.hidden_reason ? h('div', { class: 'mod-reasons', text: 'Lý do ẩn: ' + c.hidden_reason }) : null,
        actions,
      );
    }

    $('[data-filters]').addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-filter]');
      if (!b) return;
      filter = b.dataset.filter!;
      document.querySelectorAll<HTMLButtonElement>('[data-filters] button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      load(true);
    });
    moreBtn.addEventListener('click', () => load(false));

    // ── Blocked words
    const terms = $('[data-terms]');
    const termForm = $<HTMLFormElement>('[data-term-form]');
    async function loadTerms() {
      const { data, error } = await sb.from('blocked_terms').select('term').order('term');
      if (error) return toast('Không tải được danh sách từ cấm: ' + error.message);
      terms.replaceChildren(
        ...((data ?? []) as { term: string }[]).map((t) => {
          const x = h('button', { type: 'button', class: 'chip-x', 'aria-label': `Bỏ từ "${t.term}"`, text: '×' });
          x.addEventListener('click', async () => {
            const { error: e } = await sb.from('blocked_terms').delete().eq('term', t.term);
            if (e) toast('Không xóa được: ' + e.message);
            else loadTerms();
          });
          return h('li', { class: 'chip' }, h('span', { text: t.term }), x);
        }),
      );
      if (!data?.length) terms.replaceChildren(h('li', { class: 'meta-small', text: 'Chưa có từ nào.' }));
    }
    termForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = termForm.querySelector<HTMLInputElement>('input')!;
      const term = input.value.trim().toLowerCase();
      if (term.length < 2) return toast('Từ cấm cần ít nhất 2 ký tự.');
      const { error } = await sb.from('blocked_terms').insert({ term });
      if (error) return toast(error.code === '23505' ? 'Từ này đã có trong danh sách.' : 'Không thêm được: ' + error.message);
      input.value = '';
      loadTerms();
    });

    load(true);
    loadTerms();
  });
}
