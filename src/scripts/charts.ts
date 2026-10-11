// Small hand-made charts for the admin pages. Single series, one colour,
// thin bars with rounded tops, a hover tooltip and a table view for anyone who
// cannot use the picture. No chart library.
import { h, formatNumber } from './ui';

export interface Bar {
  label: string;
  value: number;
  tip: string;
}

const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag: string, attrs: Record<string, string | number>): SVGElement => {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
};

let tipEl: HTMLElement | null = null;
function tooltip(): HTMLElement {
  if (!tipEl) {
    tipEl = h('div', { class: 'chart-tip', role: 'presentation' });
    tipEl.hidden = true;
    document.body.append(tipEl);
  }
  return tipEl;
}
function showTip(e: PointerEvent, text: string) {
  const t = tooltip();
  t.textContent = text;
  t.hidden = false;
  const x = Math.min(e.clientX + 14, innerWidth - t.offsetWidth - 8);
  t.style.left = `${Math.max(8, x)}px`;
  t.style.top = `${e.clientY + 16}px`;
}
const hideTip = () => {
  if (tipEl) tipEl.hidden = true;
};

// 1, 2, 5 × a power of ten, at or above v.
export function niceMax(v: number): number {
  if (v <= 4) return Math.max(4, Math.ceil(v));
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 2, 4, 5, 10]) if (v <= m * p) return m * p;
  return 10 * p;
}

export function columnChart(root: HTMLElement, bars: Bar[], ariaLabel: string): void {
  const W = 720;
  const H = 220;
  const L = 44;
  const R = 8;
  const T = 12;
  const B = 26;
  const top = niceMax(Math.max(1, ...bars.map((b) => b.value)));
  const plotH = H - T - B;
  const slot = (W - L - R) / Math.max(bars.length, 1);
  const bw = Math.min(28, Math.max(3, slot * 0.6));
  const y = (v: number) => T + plotH - (v / top) * plotH;

  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img', 'aria-label': ariaLabel }) as SVGSVGElement;

  for (const v of [0, top / 2, top]) {
    svg.append(svgEl('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), class: 'grid' }));
    const t = svgEl('text', { x: L - 8, y: y(v) + 4, class: 'tick', 'text-anchor': 'end' });
    t.textContent = formatNumber(Math.round(v));
    svg.append(t);
  }

  // Label the first, last and a few evenly spaced bars in between.
  const labelAt = new Set<number>();
  const marks = bars.length > 12 ? 5 : 3;
  for (let i = 0; i < marks; i++) labelAt.add(Math.round((i * (bars.length - 1)) / (marks - 1)));
  bars.forEach((b, i) => {
    const x = L + slot * i + (slot - bw) / 2;
    const hgt = (b.value / top) * plotH;
    if (hgt > 0) {
      const r = Math.min(4, bw / 2, hgt);
      svg.append(
        svgEl('path', {
          class: 'bar',
          d: `M${x},${T + plotH} v${-(hgt - r)} a${r},${r} 0 0 1 ${r},${-r} h${bw - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${hgt - r} z`,
        }),
      );
    }
    if (labelAt.has(i)) {
      const t = svgEl('text', { x: x + bw / 2, y: H - 8, class: 'tick', 'text-anchor': 'middle' });
      t.textContent = b.label;
      svg.append(t);
    }
    // Wide invisible target so thin bars are easy to hover.
    const hit = svgEl('rect', { x: L + slot * i, y: T, width: slot, height: plotH + B, fill: 'transparent' });
    hit.addEventListener('pointermove', (e) => showTip(e as PointerEvent, b.tip));
    hit.addEventListener('pointerleave', hideTip);
    svg.append(hit);
  });

  root.replaceChildren(svg);
}

export interface Item {
  k: string;
  n: number;
}

// Horizontal bars with the value written next to each one.
export function hbars(root: HTMLElement, items: Item[], label: (k: string) => string = (k) => k): void {
  const total = items.reduce((a, i) => a + i.n, 0);
  const max = Math.max(1, ...items.map((i) => i.n));
  if (!items.length) {
    root.replaceChildren(h('p', { class: 'meta-small', text: 'Chưa có dữ liệu.' }));
    return;
  }
  root.replaceChildren(
    h(
      'ul',
      { class: 'hbars' },
      ...items.map((i) => {
        const fill = h('span', { class: 'fill' });
        fill.style.width = `${Math.max(2, (i.n / max) * 100)}%`;
        return h(
          'li',
          {},
          h('span', { class: 'k', text: label(i.k) }),
          h('span', { class: 'track' }, fill),
          h('span', { class: 'n', text: `${formatNumber(i.n)} · ${Math.round((i.n / total) * 100)}%` }),
        );
      }),
    ),
  );
}

// "Xem dạng bảng": the same numbers as text.
export function tableView(root: HTMLElement, headers: string[], rows: (string | number)[][]): void {
  const table = h(
    'table',
    { class: 'data-table' },
    h('thead', {}, h('tr', {}, ...headers.map((t) => h('th', { scope: 'col', text: t })))),
    h('tbody', {}, ...rows.map((r) => h('tr', {}, ...r.map((c) => h('td', { text: String(c) }))))),
  );
  root.replaceChildren(h('details', { class: 'table-view' }, h('summary', { text: 'Xem dạng bảng' }), h('div', { class: 'table-scroll' }, table)));
}
