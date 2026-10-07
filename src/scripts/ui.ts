// Small browser helpers shared by every page.

let toastTimer: number | undefined;

export function toast(message: string, ms = 3200): void {
  const el = document.querySelector<HTMLElement>('.toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (el.hidden = true), ms);
}

export function store(key: string, value?: string | null): string | null {
  try {
    if (value === undefined) return localStorage.getItem(key);
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* private mode or storage blocked: features still work for this visit */
  }
  return value ?? null;
}

// Create an element with text content only (never innerHTML for user data).
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Record<string, string | boolean | undefined> = {},
  ...children: (Node | string | null | undefined | false)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === false) continue;
    if (k === 'class') el.className = String(v);
    else if (k === 'text') el.textContent = String(v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of children) if (c) el.append(c);
  return el;
}

export function timeAgo(iso: string): string {
  const d = new Date(iso);
  const s = Math.round((Date.now() - d.getTime()) / 1000);
  if (s < 60) return 'vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)} ngày trước`;
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

export function formatNumber(n: number | null | undefined): string {
  return n == null ? '—' : new Intl.NumberFormat('vi-VN').format(n);
}

export function initThemeToggle(): void {
  const root = document.documentElement;
  const current = () =>
    (root.dataset.theme as 'light' | 'dark' | undefined) ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const paint = () => {
    document.querySelectorAll<HTMLElement>('[data-theme-label]').forEach((l) => {
      l.textContent = current() === 'dark' ? 'Ban ngày' : 'Ban đêm';
    });
  };
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      store('dv:theme', next);
      paint();
    });
  });
  paint();
}

// Wire up a <Stars> group. onPick gets 1–5. Returns a setter for the shown value.
export function attachStars(root: HTMLElement, onPick: (n: number) => void): (n: number) => void {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('.star-btn')];
  let value = 0;
  const paint = (hover = 0) =>
    buttons.forEach((b, i) => {
      b.classList.toggle('on', !hover && i < value);
      b.classList.toggle('hover', !!hover && i < hover);
      b.setAttribute('aria-pressed', String(i + 1 === value));
    });
  buttons.forEach((b, i) => {
    b.addEventListener('mouseenter', () => paint(i + 1));
    b.addEventListener('mouseleave', () => paint());
    b.addEventListener('click', () => onPick(i + 1));
  });
  return (n: number) => {
    value = n;
    paint();
  };
}
