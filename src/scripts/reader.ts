import { browserClient, isConfigured } from '../lib/supabase';
import { onMe, openLogin, type Me } from './auth';
import { trackView } from './analytics';
import { initComments } from './comments';
import { initTranslations } from './translations';
import { initNotifications } from './notifications';
import { attachStars, formatNumber, store, toast } from './ui';

export function initReader(): void {
  const article = document.querySelector<HTMLElement>('[data-chapter]');
  if (!article) return;
  const { id, slug, title, label, path } = article.dataset as Record<string, string>;
  const legacy = article.dataset.legacy != null;
  const root = document.documentElement;

  // Text size
  const readSize = () => parseInt(getComputedStyle(root).getPropertyValue('--read-size'), 10) || 21;
  const setSize = (n: number) => {
    const v = Math.min(28, Math.max(16, n));
    root.style.setProperty('--read-size', v + 'px');
    store('dv:size', String(v));
  };
  document.querySelector('[data-size-dec]')?.addEventListener('click', () => setSize(readSize() - 1));
  document.querySelector('[data-size-inc]')?.addEventListener('click', () => setSize(readSize() + 1));

  // Reading progress bar
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  const prose = article.querySelector<HTMLElement>('.prose');
  if (bar && prose) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = prose.getBoundingClientRect();
      const total = r.height - innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
      bar.style.width = (done * 100).toFixed(1) + '%';
    };
    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  // Remember where the reader is, for "Đọc tiếp" on the home page
  store('dv:last', JSON.stringify({ slug, path, title, label, legacy }));

  // Translations
  if (prose) initTranslations(prose, document.querySelector<HTMLButtonElement>('[data-tr-all]'));
  if (prose) initNotifications(prose);

  if (!isConfigured) return;
  const sb = browserClient();

  const setText = (sel: string, text: string) =>
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => (el.textContent = text));

  const loadStats = async () => {
    const { data } = await sb.rpc('get_chapter_stats', { p_chapter: id });
    const s = Array.isArray(data) ? data[0] : data;
    if (!s) return;
    setText('[data-stat-views]', `${formatNumber(Number(s.views))} lượt đọc`);
    setText(
      '[data-rating-summary]',
      Number(s.rating_count) > 0
        ? `Điểm trung bình ${String(s.rating_avg).replace('.', ',')}/5 · ${formatNumber(Number(s.rating_count))} lượt chấm`
        : 'Chưa có ai chấm điểm chương này.',
    );
  };

  // Anonymous reading statistics (device type, how far the reader got), then refresh the counters
  (async () => {
    await trackView(sb, id, prose);
    loadStats();
  })();

  // Rating
  let me: Me | null = null;
  const starsEl = document.querySelector<HTMLElement>('[data-chapter-stars]');
  const hint = document.querySelector<HTMLElement>('[data-rating-hint]');
  if (starsEl) {
    const show = attachStars(starsEl, async (n) => {
      if (!me) return openLogin('Đăng nhập để chấm điểm chương này.');
      show(n);
      const { error } = await sb
        .from('ratings')
        .upsert({ user_id: me.user.id, chapter_id: id, stars: n, updated_at: new Date().toISOString() }, { onConflict: 'user_id,chapter_id' });
      if (error) return toast('Không lưu được đánh giá: ' + error.message);
      if (hint) hint.textContent = `Bạn chấm ${n}/5. Cảm ơn bạn!`;
      loadStats();
    });
    onMe(async (m) => {
      me = m;
      if (!m) {
        show(0);
        if (hint) hint.textContent = 'Chạm vào sao để chấm điểm. Cần đăng nhập.';
        return;
      }
      const { data } = await sb.from('ratings').select('stars').eq('chapter_id', id).eq('user_id', m.user.id).maybeSingle();
      show(data?.stars ?? 0);
      if (hint) hint.textContent = data ? `Bạn đã chấm ${data.stars}/5. Chạm để đổi.` : 'Chạm vào sao để chấm điểm.';
    });
  }

  // Comments
  const commentsEl = document.querySelector<HTMLElement>('[data-comments]');
  if (commentsEl) {
    initComments(commentsEl, id, (n) => setText('[data-comment-count]', `${formatNumber(n)} bình luận`));
  }
}
