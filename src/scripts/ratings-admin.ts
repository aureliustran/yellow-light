// /admin/ratings: who rated what, with flags for patterns that look like abuse.
import { askBanDays, banLabel, guardAdmin } from './admin-gate';
import { h, timeAgo, toast } from './ui';

interface AdminRating {
  user_id: string; author: string; email: string | null; chapter_id: string | null; chapter_title: string;
  stars: number; rated_at: string; suspect: 'burst' | 'all-low' | null; banned_until: string | null;
}

const PAGE = 50;
const FLAG: Record<string, string> = {
  burst: 'Chấm dồn dập (5+ lượt trong 10 phút)',
  'all-low': 'Chỉ toàn chấm 1 sao',
};
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;

export function initRatingsAdmin(): void {
  guardAdmin((sb) => {
    let rows: AdminRating[] = [];
    let flaggedOnly = false;
    let more = true;
    const body = $('[data-rating-rows]');
    const moreBtn = $<HTMLButtonElement>('[data-more]');
    const empty = $('[data-rating-empty]');

    async function load(reset: boolean) {
      if (reset) {
        rows = [];
        more = true;
      }
      const before = rows.length ? rows[rows.length - 1].rated_at : null;
      const { data, error } = await sb.rpc('admin_ratings', { p_limit: PAGE, p_before: before });
      if (error) return toast('Không tải được đánh giá: ' + error.message);
      const page = (data ?? []) as AdminRating[];
      rows = rows.concat(page);
      more = page.length === PAGE;
      render();
    }

    const done = (msg: string) => (error: { message: string } | null) => {
      if (error) return toast('Không thực hiện được: ' + error.message);
      toast(msg);
      return load(true);
    };

    function render() {
      const shown = flaggedOnly ? rows.filter((r) => r.suspect) : rows;
      body.replaceChildren(
        ...shown.map((r) => {
          const ban = banLabel(r.banned_until);
          const remove = h('button', { type: 'button', class: 'btn small danger', text: 'Xóa điểm' });
          remove.addEventListener('click', async () => {
            if (!confirm(`Xóa điểm ${r.stars} sao của ${r.author} cho "${r.chapter_title}"?`)) return;
            const { error } = await sb.rpc('admin_remove_rating', { p_user: r.user_id, p_chapter: r.chapter_id });
            await done('Đã xóa điểm.')(error);
          });
          const banBtn = h('button', { type: 'button', class: 'btn small', text: ban ? 'Đổi / gỡ cấm' : 'Cấm' });
          banBtn.addEventListener('click', async () => {
            const days = askBanDays(r.author);
            if (days === null) return;
            const reason = days === 0 ? null : prompt('Lý do (ghi vào nhật ký):');
            const { error } = await sb.rpc('admin_ban_user', { p_user: r.user_id, p_days: days, p_reason: reason });
            await done(days === 0 ? 'Đã gỡ cấm.' : 'Đã cấm.')(error);
          });
          return h(
            'tr',
            {},
            h('th', { scope: 'row' }, h('strong', { text: r.author }), h('br'), h('span', { class: 'meta-small', text: r.email ?? '' })),
            h('td', { text: r.chapter_title }),
            h('td', { class: 'stars-cell', 'aria-label': `${r.stars} sao`, text: '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars) }),
            h('td', { text: timeAgo(r.rated_at) }),
            h('td', {}, r.suspect ? h('span', { class: 'pill flag', text: FLAG[r.suspect] }) : null, ban ? h('span', { class: 'pill flag', text: ban }) : null),
            h('td', { class: 'row-actions' }, remove, banBtn),
          );
        }),
      );
      empty.hidden = shown.length > 0;
      empty.textContent = flaggedOnly ? 'Không có đánh giá nào đáng ngờ trong các lượt đã tải.' : 'Chưa có đánh giá nào.';
      moreBtn.hidden = !more;
    }

    $('[data-flag-toggle]').addEventListener('click', (e) => {
      flaggedOnly = !flaggedOnly;
      (e.currentTarget as HTMLElement).setAttribute('aria-pressed', String(flaggedOnly));
      render();
    });
    moreBtn.addEventListener('click', () => load(false));
    load(true);
  });
}
