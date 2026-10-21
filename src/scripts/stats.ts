// /admin/stats: traffic, devices, per-chapter reading and rating numbers.
// Every number comes from an admin_* database function that refuses anyone
// who is not the admin.
import type { SupabaseClient } from '@supabase/supabase-js';
import { chapterLabel, withNumbers, type ChapterRow } from '../lib/chapters-shared';
import { guardAdmin } from './admin-gate';
import { columnChart, hbars, tableView, type Item } from './charts';
import { formatNumber, h, toast } from './ui';
import { editions, type Edition } from '../config';

interface Overview {
  views_today: number; views_7d: number; views_30d: number;
  readers_today: number; readers_7d: number; readers_30d: number;
  views_total: number; users_total: number; users_new_7d: number;
  comments_7d: number; comments_hidden: number; reports_open: number;
  ratings_7d: number; story_rating_avg: number | null; story_rating_count: number; banned_users: number;
}
interface ChapterStat {
  chapter_id: string; edition?: Edition; kind: 'chapter' | 'interlude'; title: string; pos: number; is_public: boolean;
  views: number; readers: number; avg_progress: number; completion: number;
  rating_avg: number | null; rating_count: number; comments: number; hidden: number;
}
interface Breakdown { device: Item[]; browser: Item[]; os: Item[]; referrer: Item[]; hours: number[] }

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const DEVICE: Record<string, string> = { mobile: 'Điện thoại', tablet: 'Máy tính bảng', desktop: 'Máy tính', other: 'Khác' };
const REFERRER: Record<string, string> = { direct: 'Truy cập trực tiếp', internal: 'Từ trang khác của truyện' };
const num = (v: unknown) => Number(v ?? 0);

function statCard(label: string, value: string, sub?: string, href?: string): HTMLElement {
  const body = [h('span', { class: 'stat-label', text: label }), h('span', { class: 'stat-value', text: value }), sub ? h('span', { class: 'stat-sub', text: sub }) : null];
  return href ? h('a', { class: 'stat-card link', href }, ...body) : h('div', { class: 'stat-card' }, ...body);
}

export function initStats(): void {
  guardAdmin(async (sb) => {
    let days = 30;
    $('[data-ranges]').addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-days]');
      if (!b) return;
      days = Number(b.dataset.days);
      document.querySelectorAll<HTMLButtonElement>('[data-ranges] button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      loadRange(sb, days);
    });
    loadOverview(sb);
    loadRange(sb, days);
    loadChapters(sb);
    loadRatings(sb);
  });
}

async function loadOverview(sb: SupabaseClient) {
  const { data, error } = await sb.rpc('admin_overview');
  if (error) return toast('Không tải được số liệu: ' + error.message);
  const o = data as Overview;
  $('[data-cards]').replaceChildren(
    statCard('Lượt đọc hôm nay', formatNumber(num(o.views_today)), `${formatNumber(num(o.readers_today))} người đọc`),
    statCard('7 ngày qua', formatNumber(num(o.views_7d)), `${formatNumber(num(o.readers_7d))} người đọc`),
    statCard('30 ngày qua', formatNumber(num(o.views_30d)), `${formatNumber(num(o.readers_30d))} người đọc`),
    statCard('Tổng lượt đọc', formatNumber(num(o.views_total)), 'bộ đếm công khai'),
    statCard('Thành viên', formatNumber(num(o.users_total)), `+${formatNumber(num(o.users_new_7d))} trong 7 ngày`),
    statCard('Bình luận 7 ngày', formatNumber(num(o.comments_7d)), `${formatNumber(num(o.comments_hidden))} đang ẩn`, '/admin/comments'),
    statCard('Cần xem', formatNumber(num(o.reports_open)), 'bình luận bị báo cáo', '/admin/comments'),
    statCard(
      'Điểm cả truyện',
      o.story_rating_avg == null ? '—' : String(o.story_rating_avg).replace('.', ',') + '/5',
      `${formatNumber(num(o.story_rating_count))} lượt chấm`,
      '/admin/ratings',
    ),
  );
}

async function loadRange(sb: SupabaseClient, days: number) {
  const [byDay, breakdown] = await Promise.all([
    sb.rpc('admin_views_by_day', { p_days: days }),
    sb.rpc('admin_breakdown', { p_days: days }),
  ]);
  if (byDay.error) toast('Không tải được biểu đồ: ' + byDay.error.message);
  else {
    const rows = (byDay.data ?? []) as { day: string; views: number; readers: number }[];
    const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' });
    const total = rows.reduce((a, r) => a + num(r.views), 0);
    columnChart(
      $('[data-chart-days]'),
      rows.map((r) => ({
        label: fmt(r.day),
        value: num(r.views),
        tip: `${fmt(r.day)}: ${formatNumber(num(r.views))} lượt đọc, ${formatNumber(num(r.readers))} người đọc`,
      })),
      `Lượt đọc mỗi ngày trong ${days} ngày qua, tổng ${total}`,
    );
    tableView($('[data-table-days]'), ['Ngày', 'Lượt đọc', 'Người đọc'], rows.map((r) => [fmt(r.day), num(r.views), num(r.readers)]).reverse());
  }

  if (breakdown.error) return toast('Không tải được phân tích: ' + breakdown.error.message);
  const b = breakdown.data as Breakdown;
  hbars($('[data-device]'), b.device, (k) => DEVICE[k] ?? k);
  hbars($('[data-browser]'), b.browser);
  hbars($('[data-os]'), b.os);
  hbars($('[data-referrer]'), b.referrer, (k) => REFERRER[k] ?? k);
  const hours = b.hours ?? [];
  columnChart(
    $('[data-chart-hours]'),
    hours.map((n, i) => ({ label: `${i}h`, value: num(n), tip: `${i}h–${i + 1}h: ${formatNumber(num(n))} lượt đọc` })),
    'Lượt đọc theo giờ trong ngày, giờ Việt Nam',
  );
}

async function loadChapters(sb: SupabaseClient) {
  const { data, error } = await sb.rpc('admin_chapter_stats');
  if (error) return toast('Không tải được thống kê chương: ' + error.message);
  const rows = (data ?? []) as ChapterStat[];
  // Numbers run per edition; the edition's name shows once there is more than one.
  const label = new Map<string, string>();
  const present = editions.list.filter((ed) => rows.some((r) => (r.edition ?? 'v1') === ed));
  for (const ed of present) {
    const numbered = withNumbers(
      rows
        .filter((r) => (r.edition ?? 'v1') === ed)
        .map((r) => ({ id: r.chapter_id, slug: '', kind: r.kind, title: r.title, color: null, story_date: null, status: 'published', publish_at: null, position: r.pos })) as ChapterRow[],
      editions.firstNumber[ed],
    );
    for (const c of numbered) label.set(c.id, present.length > 1 ? `${editions.names[ed]} · ${chapterLabel(c)}` : chapterLabel(c));
  }
  const tbody = $('[data-chapter-rows]');
  tbody.replaceChildren(
    ...rows.map((r) => {
      const bar = h('span', { class: 'minibar' }, h('span', { class: 'fill' }));
      (bar.firstElementChild as HTMLElement).style.width = `${r.completion}%`;
      return h(
        'tr',
        {},
        h('th', { scope: 'row' }, h('span', { class: 'ch-label', text: label.get(r.chapter_id) ?? '' }), ' ', h('span', { text: r.title }), r.is_public ? null : h('span', { class: 'pill draft', text: 'Chưa đăng' })),
        h('td', { text: formatNumber(num(r.views)) }),
        h('td', { text: formatNumber(num(r.readers)) }),
        h('td', { text: `${r.avg_progress}%` }),
        h('td', { class: 'with-bar' }, bar, h('span', { text: `${r.completion}%` })),
        h('td', { text: r.rating_avg == null ? '—' : `${String(r.rating_avg).replace('.', ',')} (${num(r.rating_count)})` }),
        h('td', { text: num(r.hidden) ? `${num(r.comments)} + ${num(r.hidden)} ẩn` : String(num(r.comments)) }),
      );
    }),
  );
}

async function loadRatings(sb: SupabaseClient) {
  const { data, error } = await sb.rpc('admin_rating_summary');
  if (error) return toast('Không tải được điểm đánh giá: ' + error.message);
  const s = data as { chapters: number[]; story: number[] };
  const toItems = (a: number[]): Item[] => a.map((n, i) => ({ k: String(i + 1), n: num(n) })).reverse();
  hbars($('[data-rating-chapters]'), toItems(s.chapters), (k) => `${k} sao`);
  hbars($('[data-rating-story]'), toItems(s.story), (k) => `${k} sao`);
}
