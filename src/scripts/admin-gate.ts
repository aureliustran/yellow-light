// Shared by the admin pages: show the right "gate" screen, and only run the
// page once the signed-in account is the admin. The database enforces this
// again on every request, so this is for the screen, not for security.
import type { SupabaseClient } from '@supabase/supabase-js';
import { browserClient, isConfigured } from '../lib/supabase';
import { onMe, openLogin } from './auth';
import { editions } from '../config';

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;

export function guardAdmin(start: (sb: SupabaseClient) => void): void {
  const gates = [...document.querySelectorAll<HTMLElement>('[data-gate]')];
  const adminEl = $('[data-admin]');
  const show = (name: string) => {
    gates.forEach((g) => (g.hidden = g.dataset.gate !== name));
    adminEl.hidden = name !== 'admin';
  };

  if (!isConfigured) return show('config');
  $('[data-gate-login]').addEventListener('click', () => openLogin('Đăng nhập bằng tài khoản Google của tác giả.'));

  let started = false;
  onMe((me) => {
    if (!me) return show('signedout');
    if (!me.isAdmin) {
      $('[data-gate-email]').textContent = me.user.email ?? me.name;
      $('[data-gate-sql]').textContent = `update public.profiles set is_admin = true\nwhere id = '${me.user.id}';`;
      return show('denied');
    }
    show('admin');
    if (!started) {
      started = true;
      start(browserClient());
    }
  });
}

// "infinity" (a permanent ban) is not a date JavaScript can parse.
export function banLabel(until: string | null): string | null {
  if (!until) return null;
  if (until === 'infinity') return 'Bị cấm vĩnh viễn';
  const d = new Date(until);
  if (Number.isNaN(d.getTime()) || d.getTime() <= Date.now()) return null;
  return 'Bị cấm đến ' + d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

// Ask how long to ban for. Returns null when cancelled.
export function askBanDays(name: string): number | null {
  const v = prompt(`Cấm "${name}" bình luận và chấm điểm bao nhiêu ngày?\nNhập -1 để cấm vĩnh viễn, 0 để gỡ cấm.`, '7');
  if (v === null) return null;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

// Chapter titles in admin lists, with the edition's name in front for chapters
// that are not in the current edition ("Legacy · Đèn vàng"). Loaded once per page.
let legacyIds: Promise<Set<string>> | null = null;
async function loadLegacyIds(sb: SupabaseClient): Promise<Set<string>> {
  const { data } = await sb.from('chapters').select('id').neq('edition', editions.current);
  return new Set((data ?? []).map((r: { id: string }) => r.id));
}
export async function chapterTitler(sb: SupabaseClient): Promise<(id: string | null, title: string) => string> {
  const ids = await (legacyIds ??= loadLegacyIds(sb));
  return (id, title) => (id && ids.has(id) ? `${editions.names[editions.legacy.id]} · ${title}` : title);
}
