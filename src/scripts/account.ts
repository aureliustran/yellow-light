import { isConfigured } from '../lib/supabase';
import { onMe, signIn, signOut, openLogin } from './auth';
import { toast } from './ui';

export function initAccount(): void {
  const root = document.querySelector<HTMLElement>('[data-account]');
  if (!root || root.dataset.bound) return;
  root.dataset.bound = '1';

  const loginBtn = root.querySelector<HTMLButtonElement>('[data-login-open]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-account-toggle]')!;
  const menu = root.querySelector<HTMLElement>('[data-account-menu]')!;
  const avatar = root.querySelector<HTMLElement>('[data-account-avatar]')!;
  const name = root.querySelector<HTMLElement>('[data-account-name]')!;
  const adminLink = root.querySelector<HTMLElement>('[data-account-admin]')!;
  const dialog = document.getElementById('login-dialog') as HTMLDialogElement | null;

  if (!isConfigured) {
    root.hidden = true;
    return;
  }

  loginBtn.addEventListener('click', () => openLogin());

  dialog?.querySelector('[data-login-close]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close(); // click on backdrop
  });
  dialog?.querySelectorAll<HTMLButtonElement>('[data-provider]').forEach((b) =>
    b.addEventListener('click', async () => {
      b.disabled = true;
      try {
        await signIn(b.dataset.provider as 'google');
      } catch (err) {
        b.disabled = false;
        toast('Không đăng nhập được: ' + (err as Error).message);
      }
    }),
  );

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    toggle.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target as Node)) closeMenu();
  });
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });
  root.querySelector('[data-logout]')?.addEventListener('click', async () => {
    closeMenu();
    await signOut();
    toast('Đã đăng xuất.');
  });

  onMe((me) => {
    loginBtn.hidden = !!me;
    toggle.hidden = !me;
    adminLink.hidden = !me?.isAdmin;
    if (!me) {
      closeMenu();
      return;
    }
    name.textContent = me.name;
    toggle.setAttribute('aria-label', `Tài khoản: ${me.name}`);
    if (me.avatar) {
      const img = document.createElement('img');
      img.src = me.avatar;
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.className = 'avatar';
      toggle.replaceChildren(img);
    } else {
      avatar.textContent = me.name.trim().charAt(0).toUpperCase();
      toggle.replaceChildren(avatar);
    }
  });
}
