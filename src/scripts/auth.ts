// Login state for the browser. Reading never needs this; it is only used for
// comments, ratings and the admin page.
import type { User } from '@supabase/supabase-js';
import { browserClient, isConfigured } from '../lib/supabase';

export interface Me {
  user: User;
  name: string;
  avatar: string | null;
  isAdmin: boolean;
}

let me: Me | null = null;
let ready: Promise<Me | null> | null = null;
const listeners = new Set<(m: Me | null) => void>();

async function loadProfile(user: User | null): Promise<Me | null> {
  if (!user) return null;
  const { data } = await browserClient()
    .from('profiles')
    .select('display_name, avatar_url, is_admin')
    .eq('id', user.id)
    .maybeSingle();
  return {
    user,
    name: data?.display_name ?? user.user_metadata?.full_name ?? user.email ?? 'Độc giả',
    avatar: data?.avatar_url ?? user.user_metadata?.avatar_url ?? null,
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
