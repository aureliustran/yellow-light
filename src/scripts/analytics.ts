// Anonymous reading statistics: what kind of device opened a chapter, where the
// reader came from and how far down they got. No IP address, no cookies and no
// fingerprinting: the only identifier is a random value this browser makes up
// for itself, kept in localStorage.
import type { SupabaseClient } from '@supabase/supabase-js';
import { store } from './ui';

const HOURS_12 = 12 * 3600 * 1000;
const MILESTONES = [25, 50, 75, 95]; // 95 counts as "finished" and is stored as 100
const MIN_READ_MS = 15_000; // scrolling to the bottom in a flash is not reading

function sessionId(): string {
  let id = store('dv:sid');
  if (!id || id.length < 8) {
    id = (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 36);
    store('dv:sid', id);
  }
  return id;
}

export function describeDevice(ua = navigator.userAgent, touchPoints = navigator.maxTouchPoints): {
  device: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
} {
  const iPadOS = /Macintosh/.test(ua) && touchPoints > 1;
  let device: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || iPadOS || (/Android/i.test(ua) && !/Mobi/i.test(ua))) device = 'tablet';
  else if (/Mobi|iPhone|iPod|Android/i.test(ua)) device = 'mobile';

  let browser = 'Khác';
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) browser = 'Facebook app';
  else if (/Zalo/i.test(ua)) browser = 'Zalo';
  else if (/coc_coc/i.test(ua)) browser = 'Cốc Cốc';
  else if (/Edg(e|A|iOS)?\//.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
  else if (/SamsungBrowser/.test(ua)) browser = 'Samsung Internet';
  else if (/Firefox|FxiOS/.test(ua)) browser = 'Firefox';
  else if (/Chrome|CriOS/.test(ua)) browser = 'Chrome';
  else if (/Safari/.test(ua)) browser = 'Safari';

  let os = 'Khác';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua) || iPadOS) os = 'iOS';
  else if (/Mac OS X|Macintosh/i.test(ua)) os = 'macOS';
  else if (/CrOS/.test(ua)) os = 'ChromeOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return { device, browser, os };
}

// 'direct' = typed or bookmarked, 'internal' = came from another page of this site.
export function referrerHost(referrer = document.referrer, host = location.hostname): string {
  try {
    const h = new URL(referrer).hostname.replace(/^www\./, '');
    if (!h) return 'direct';
    return h === host.replace(/^www\./, '') ? 'internal' : h;
  } catch {
    return 'direct';
  }
}

interface Saved {
  t: number;
  e: number;
}

function readSaved(key: string): Saved | null {
  try {
    const v = JSON.parse(store(key) ?? 'null');
    return v && typeof v.t === 'number' && typeof v.e === 'number' && Date.now() - v.t < HOURS_12 ? v : null;
  } catch {
    return null;
  }
}

// Record this visit (once per 12 hours per browser per chapter) and report how
// far the reader scrolls. Never throws and never blocks reading.
export async function trackView(sb: SupabaseClient, chapterId: string, prose: HTMLElement | null): Promise<void> {
  try {
    const sid = sessionId();
    const key = `dv:ev:${chapterId}`;
    let eventId = readSaved(key)?.e ?? null;
    if (eventId == null) {
      const { device, browser, os } = describeDevice();
      const { data, error } = await sb.rpc('record_view_event', {
        p_chapter: chapterId,
        p_session: sid,
        p_device: device,
        p_browser: browser,
        p_os: os,
        p_referrer: referrerHost(),
      });
      if (error || data == null) return;
      eventId = Number(data);
      store(key, JSON.stringify({ t: Date.now(), e: eventId }));
    }
    if (prose) watchProgress(sb, eventId, sid, prose);
  } catch {
    /* statistics are optional */
  }
}

function watchProgress(sb: SupabaseClient, eventId: number, sid: string, prose: HTMLElement): void {
  const t0 = Date.now();
  const sent = new Set<number>();
  let ticking = false;

  const send = (pct: number, finished: boolean) =>
    sb.rpc('update_view_progress', { p_event: eventId, p_session: sid, p_progress: pct, p_finished: finished }).then(
      () => {},
      () => {},
    );

  const check = () => {
    ticking = false;
    if (Date.now() - t0 < MIN_READ_MS) return;
    const r = prose.getBoundingClientRect();
    const total = r.height - innerHeight * 0.6;
    const done = r.bottom <= innerHeight ? 1 : Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
    const pct = Math.floor(done * 100);
    for (const m of MILESTONES) {
      if (pct >= m && !sent.has(m)) {
        sent.add(m);
        const finished = m === MILESTONES[MILESTONES.length - 1];
        send(finished ? 100 : m, finished);
      }
    }
    if (sent.size === MILESTONES.length) removeEventListener('scroll', onScroll);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(check);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  // A short chapter may already be fully on screen once the minimum time has passed.
  setTimeout(check, MIN_READ_MS + 500);
}
