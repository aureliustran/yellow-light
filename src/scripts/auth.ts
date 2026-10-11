// Login state for the browser. Reading never needs this; it is only used for
// comments, ratings and the admin page.
import type { User } from '@supabase/supabase-js';
import { defaultAvatar } from '../lib/avatar';
import { browserClient, isConfigured } from '../lib/supabase';

export interface Me {
  user: User;
  name: string;
  anonNo: number; // permanent anonymous number, shown as #1042
  avatar: string; // generated from the number, never the Google photo
  isAdmin: boolean;
}

let me: Me | null = null;
let ready: Promise<Me | null> | null = null;
const listeners = new Set<(m: Me | null) => void>();

async function loadProfile(user: User | null): Promise<Me | null> {
  if (!user) return null;
  const { data } = await browserClient()
    .from('profiles')
    .select('display_name, anon_no, is_admin')
    .eq('id', user.id)
    .maybeSingle();
  const anonNo = Number(data?.anon_no ?? 0);
  return {
    user,
    name: data?.display_name ?? 'Ẩn danh',
    anonNo,
    avatar: defaultAvatar(anonNo),
    isAdmin: !!data?.is_admin,
  };
}

export function getMe(): Promise<Me | null> {
  if (!isConfigured) return Promise.resolve(null);
  if (!ready) {
    const sb = browserClient();
    ready = sb.auth
      .getSession()
      .then(({ data }) => loadProfile(data.session?.user ?? null))
      .catch(() => null)
      .then((m) => (me = m));
    sb.auth.onAuthStateChange((event, session) => {
      const changed =
        (event === 'SIGNED_OUT' && me) || (event === 'SIGNED_IN' && session?.user.id !== me?.user.id);
      if (!changed) return;
      // Supabase advises not awaiting other calls inside this callback.
      setTimeout(async () => {
        me = await loadProfile(session?.user ?? null);
        listeners.forEach((f) => f(me));
      }, 0);
    });
  }
  return ready;
}

export function onMe(cb: (m: Me | null) => void): void {
  listeners.add(cb);
  getMe().then(cb);
}

function safeNext(path: string): string {
  return path.startsWith('/') && !path.startsWith('//') ? path : '/';
}

export async function signIn(provider: 'google'): Promise<void> {
  const next = safeNext(location.pathname + location.search);
  const { error } = await browserClient().auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) throw error;
}

// Change the name shown next to comments. The database checks length, reserved
// names, blocked words and a short cool-down, and its message is shown as is.
export async function setDisplayName(name: string): Promise<string> {
  const current = await getMe();
  if (!current) throw new Error('Bạn chưa đăng nhập.');
  const { data, error } = await browserClient()
    .from('profiles')
    .update({ display_name: name })
    .eq('id', current.user.id)
    .select('display_name')
    .single();
  if (error) throw error;
  me = { ...current, name: data.display_name };
  ready = Promise.resolve(me);
  listeners.forEach((f) => f(me));
  return data.display_name;
}

export async function signOut(): Promise<void> {
  await browserClient().auth.signOut();
}

export function openLogin(reason?: string): void {
  const dialog = document.getElementById('login-dialog') as HTMLDialogElement | null;
  if (!dialog) return;
  const p = dialog.querySelector<HTMLElement>('[data-login-reason]');
  if (p) p.textContent = reason ?? 'Đọc truyện không cần tài khoản. Đăng nhập để bình luận và chấm điểm.';
  dialog.showModal();
}

export { safeNext };
