import { isConfigured } from '../lib/supabase';
import { anonTag } from '../lib/avatar';
import { onMe, setDisplayName, signIn, signOut, openLogin, type Me } from './auth';
import { store, toast } from './ui';

export function initAccount(): void {
  const root = document.querySelector<HTMLElement>('[data-account]');
  if (!root || root.dataset.bound) return;
  root.dataset.bound = '1';

  const loginBtn = root.querySelector<HTMLButtonElement>('[data-login-open]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-account-toggle]')!;
  const menu = root.querySelector<HTMLElement>('[data-account-menu]')!;
  const name = root.querySelector<HTMLElement>('[data-account-name]')!;
  const number = root.querySelector<HTMLElement>('[data-account-no]')!;
  const renameDialog = document.getElementById('rename-dialog') as HTMLDialogElement | null;
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

  // Rename dialog
  let current: Me | null = null;
  const renameForm = renameDialog?.querySelector<HTMLFormElement>('[data-rename-form]');
  const renameInput = renameForm?.querySelector<HTMLInputElement>('input');
  const renameError = renameDialog?.querySelector<HTMLElement>('[data-rename-error]');
  const showRenameError = (msg: string | null) => {
    if (!renameError) return;
    renameError.hidden = !msg;
    renameError.textContent = msg ?? '';
  };
  const openRename = () => {
    if (!current || !renameDialog || !renameInput) return;
    closeMenu();
    renameDialog.querySelector<HTMLElement>('[data-rename-no]')!.textContent = anonTag(current.anonNo);
    renameInput.value = current.name;
    showRenameError(null);
    renameDialog.showModal();
    renameInput.select();
  };
  root.querySelector('[data-rename-open]')?.addEventListener('click', openRename);
  renameDialog?.querySelector('[data-rename-close]')?.addEventListener('click', () => renameDialog.close());
  renameDialog?.addEventListener('click', (e) => {
    if (e.target === renameDialog) renameDialog.close();
  });
  renameForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = renameInput!.value.replace(/\s+/g, ' ').trim();
    if (value.length < 2 || value.length > 30) return showRenameError('Tên hiển thị phải dài 2–30 ký tự.');
    const submit = renameForm.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    submit.disabled = true;
    showRenameError(null);
    try {
      const saved = await setDisplayName(value);
      renameDialog!.close();
      toast(`Đã đổi tên thành "${saved}".`);
    } catch (err) {
      showRenameError((err as Error).message || 'Không đổi được tên.');
    } finally {
      submit.disabled = false;
    }
  });

  onMe((me) => {
    current = me;
    loginBtn.hidden = !!me;
    toggle.hidden = !me;
    adminLink.hidden = !me?.isAdmin;
    if (!me) {
      closeMenu();
      return;
    }
    name.textContent = me.name;
    number.textContent = anonTag(me.anonNo);
    toggle.setAttribute('aria-label', `Tài khoản: ${me.name} ${anonTag(me.anonNo)}`.trim());
    const img = document.createElement('img');
    img.src = me.avatar;
    img.alt = '';
    img.className = 'avatar';
    toggle.replaceChildren(img);

    // Once per browser: tell new readers they are anonymous and can pick a name.
    if (me.name === 'Ẩn danh' && !me.isAdmin && !store('dv:anon-hint')) {
      store('dv:anon-hint', '1');
      toast(`Bạn đang ẩn danh với số ${anonTag(me.anonNo)}. Đổi tên ở menu tài khoản nếu muốn.`);
    }
  });
}
