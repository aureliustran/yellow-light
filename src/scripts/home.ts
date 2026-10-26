import { browserClient, isConfigured } from '../lib/supabase';
import { onMe, openLogin, type Me } from './auth';
import { attachStars, formatNumber, store, toast } from './ui';
import { editions } from '../config';

export function initHome(): void {
  // Cover: if the new picture cannot load, show the old one
  const cover = document.querySelector<HTMLImageElement>('img[data-fallback]');
  if (cover) {
    const swap = () => {
      const old = cover.dataset.fallback;
      if (old && !cover.src.endsWith(old)) cover.src = old;
    };
    cover.addEventListener('error', swap, { once: true });
    if (cover.complete && cover.naturalWidth === 0) swap();
  }

  // "Đọc tiếp": the last chapter opened on this device
  try {
    // Entries from before editions have no path: /doc/ sends them on to /legacy/ if needed.
    const last = JSON.parse(store('dv:last') ?? 'null') as
      | { slug: string; path?: string; title: string; label: string; legacy?: boolean }
      | null;
    const link = document.querySelector<HTMLAnchorElement>('[data-continue]');
    if (last?.slug && link) {
      link.href = last.path ?? `/doc/${encodeURIComponent(last.slug)}`;
      const where = last.label === 'Interlude' ? last.title : last.label;
      link.textContent = last.legacy ? `Đọc tiếp ${editions.names[editions.legacy.id]} · ${where}` : `Đọc tiếp · ${where}`;
      link.hidden = false;
    }
  } catch {
    /* ignore */
  }

  if (!isConfigured) return;
  const sb = browserClient();

  const loadStats = async () => {
    // Views of the current edition only; the story rating covers the whole work.
    const { data } = await sb.rpc('get_story_stats', { p_edition: editions.current });
    const s = Array.isArray(data) ? data[0] : data;
    if (!s) return;
    const views = document.querySelector('[data-story-views]');
    const rating = document.querySelector('[data-story-rating]');
    const count = document.querySelector('[data-story-rating-count]');
    if (views) views.textContent = formatNumber(Number(s.views));
    if (rating) rating.textContent = s.rating_avg != null ? String(s.rating_avg).replace('.', ',') : '—';
    if (count) count.textContent = Number(s.rating_count) > 0 ? `điểm · ${formatNumber(Number(s.rating_count))} lượt` : 'điểm đánh giá';
  };
  loadStats();

  let me: Me | null = null;
  const starsEl = document.querySelector<HTMLElement>('[data-story-stars]');
  const hint = document.querySelector<HTMLElement>('[data-story-hint]');
  if (!starsEl) return;
  const show = attachStars(starsEl, async (n) => {
    if (!me) return openLogin('Đăng nhập để chấm điểm truyện.');
    show(n);
    const { error } = await sb.from('story_ratings').upsert({ user_id: me.user.id, stars: n, updated_at: new Date().toISOString() });
    if (error) return toast('Không lưu được đánh giá: ' + error.message);
    if (hint) hint.textContent = `Bạn chấm truyện ${n}/5.`;
    loadStats();
  });
  onMe(async (m) => {
    me = m;
    if (!m) {
      show(0);
      if (hint) hint.textContent = 'Chấm điểm cả truyện (cần đăng nhập)';
      return;
    }
    const { data } = await sb.from('story_ratings').select('stars').eq('user_id', m.user.id).maybeSingle();
    show(data?.stars ?? 0);
    if (hint) hint.textContent = data ? `Bạn đã chấm truyện ${data.stars}/5` : 'Chấm điểm cả truyện';
  });
}
