// rookies.vn has no API: this drives the author pages in a real browser
// (Playwright), signed in once with `npm run crosspost -- login rookies`.
// Everything that depends on how rookies.vn's pages look is in this file, so
// when the site changes, this is the only file to fix.
//
// Every adapter exports the same functions:
//   open() → session with: signedIn(), loginWithPassword(user, pass),
//            listRemote(), create(post), update(id, post), close()
//   An error with code 'SIGNED_OUT' means the site signed the worker out.
//   post = { title, html, plain, mode: 'publish' | 'draft' }
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SEL = {
  title: 'input[placeholder="Nhập tên chương"]',
  editorId: 'chapter-detail', // TinyMCE editor id
  saveMenu: 'div.cursor-pointer:text-is("Lưu")', // "Lưu ▾" in the bottom bar
  confirm: '.swal2-confirm', // "Chắc chắn …?" dialogs
};

export async function open(cfg, { profileDir, headless = false } = {}) {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    throw new Error('Chưa cài Playwright. Chạy một lần: npm run crosspost:setup');
  }
  await mkdir(profileDir, { recursive: true });
  const opts = { headless, viewport: { width: 1280, height: 900 }, locale: 'vi-VN' };
  let context;
  try {
    // Your own Chrome looks like a normal visitor to Cloudflare.
    context = await chromium.launchPersistentContext(profileDir, { ...opts, channel: 'chrome' });
  } catch {
    context = await chromium.launchPersistentContext(profileDir, opts);
  }
  const page = context.pages()[0] ?? (await context.newPage());
  const r = cfg.rookies;
  const base = r.base.replace(/\/+$/, '');
  const editUrl = (id) => `${base}/author/chinh-sua-chuong/${r.storySlug}/${id}`;

  async function signedIn() {
    await page.goto(`${base}/author/muc-luc/${r.storyId}`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    return /\/author\/muc-luc\//.test(page.url()) && (await page.locator(`a[href*="/author/tao-chuong/${r.storyId}"]`).count()) > 0;
  }

  async function ensureSignedIn() {
    if (!(await signedIn())) {
      const e = new Error('rookies.vn đã đăng xuất worker. Đăng nhập lại ở /admin/crosspost, hoặc chạy: npm run crosspost -- login rookies');
      e.code = 'SIGNED_OUT';
      throw e;
    }
  }

  // The login form at /dang-nhap: "username" (tên đăng nhập, email hoặc số điện
  // thoại), "password", and the "Duy trì đăng nhập" box. Errors come back in a
  // SweetAlert popup. Accounts that only sign in with Google cannot use this.
  async function loginWithPassword(username, password) {
    await page.goto(`${base}/dang-nhap`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    const form = page.locator('form:has(input[name="password"])').first();
    if (!(await form.count())) {
      if (await signedIn()) return; // already signed in
      const challenged = await page.locator('iframe[src*="challenges.cloudflare.com"], #challenge-form, #cf-challenge-running').count();
      throw new Error(
        challenged
          ? 'rookies.vn đang hỏi kiểm tra "bạn có phải người không". Chạy: npm run crosspost -- login rookies và tự đăng nhập trong cửa sổ đó.'
          : 'Không thấy ô đăng nhập trên rookies.vn/dang-nhap (trang có thể đã đổi).',
      );
    }
    await form.locator('input[name="username"]').fill(username);
    await form.locator('input[name="password"]').fill(password);
    const keep = form.getByLabel('Duy trì đăng nhập');
    if ((await keep.count()) && !(await keep.isChecked())) await keep.check().catch(() => {});
    await form.locator('input[name="password"]').press('Enter');
    const outcome = await Promise.race([
      page.waitForURL((u) => !/\/dang-nhap/.test(u.toString()), { timeout: 30000 }).then(() => 'left'),
      page.locator('.swal2-popup').waitFor({ state: 'visible', timeout: 30000 }).then(() => 'popup'),
    ]).catch(() => 'timeout');
    if (outcome === 'popup') {
      const msg = (await page.locator('.swal2-html-container').innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
      await page.locator(SEL.confirm).click().catch(() => {});
      throw new Error('rookies.vn không cho đăng nhập: ' + (msg || 'sai tên đăng nhập hoặc mật khẩu'));
    }
    if (!(await signedIn())) {
      throw new Error(
        outcome === 'timeout'
          ? 'Đăng nhập không xong sau 30 giây (rookies.vn có thể đang hỏi kiểm tra). Chạy: npm run crosspost -- login rookies'
          : 'Đã gửi đăng nhập nhưng vẫn chưa vào được trang tác giả của truyện.',
      );
    }
  }

  // Chapters already on rookies.vn for this story: [{ id, title, url, status }]
  async function listRemote() {
    await ensureSignedIn();
    return page.evaluate((slug) => {
      const seen = new Map();
      for (const a of document.querySelectorAll(`a[href*="/author/chinh-sua-chuong/${slug}/"]`)) {
        const m = /\/chinh-sua-chuong\/[^/]+\/(\d+)/.exec(a.getAttribute('href') || '');
        if (!m || seen.has(m[1])) continue;
        const row = a.closest('li, tr, div');
        const text = row ? row.innerText : '';
        seen.set(m[1], {
          id: m[1],
          title: (a.innerText || '').trim(),
          url: a.href,
          status: /Bản thảo/i.test(text) ? 'draft' : 'published',
        });
      }
      return [...seen.values()];
    }, r.storySlug);
  }

  async function fillEditor(post) {
    await page.waitForSelector(SEL.title, { timeout: 30000 });
    await page.waitForFunction((id) => !!window.tinymce?.get(id)?.initialized, SEL.editorId, { timeout: 30000 });
    await page.fill(SEL.title, post.title);
    const got = await page.evaluate(
      ({ id, html }) => {
        const ed = window.tinymce.get(id);
        ed.setContent(html);
        ed.save();
        ed.fire('change');
        return ed.getContent({ format: 'text' }).replace(/\s+/g, ' ').trim();
      },
      { id: SEL.editorId, html: post.html },
    );
    const loose = (t) => t.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
    if (loose(got) !== loose(post.plain)) throw new Error('Nội dung trong trình soạn thảo không khớp bản cần đăng (chưa lưu gì).');
    return got; // exactly what the editor holds: the site must give this back after saving
  }

  // The "Lưu ▾" menu differs: the new-chapter page has "Đăng" / "Lưu bản thảo",
  // an existing chapter has "Đăng & tiếp tục chỉnh sửa" / "Lưu bản thảo" (and no plain "Đăng").
  async function save(mode, { existing = false } = {}) {
    const item = (existing ? r.modeMenuItemEdit : r.modeMenuItem)[mode];
    await page.locator(SEL.saveMenu).last().click();
    await page.getByText(item, { exact: true }).last().click();
    const confirm = page.locator(SEL.confirm);
    if (await confirm.isVisible({ timeout: 5000 }).catch(() => false)) await confirm.click();
  }

  // After saving, rookies.vn shows a popup ("Đăng thành công!" with Tiếp tục tạo chương mới /
  // Đóng / Thoát) and stays on the same URL, or shows a SweetAlert error. Returns when it is done.
  async function waitSaved({ watchUrl = false } = {}) {
    const ok = page.getByText(/^\s*[\p{L} ]{0,25}thành công!?\s*$/iu).first(); // a short popup line, not story text
    const err = page.locator('.swal2-popup');
    const outcome = await Promise.race([
      ok.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'ok'),
      // Only on the new-chapter page: an existing chapter's URL already matches.
      ...(watchUrl ? [page.waitForURL(/\/author\/chinh-sua-chuong\/[^/]+\/\d+/, { timeout: 30000 }).then(() => 'moved')] : []),
      err.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'error'),
    ]).catch(() => 'timeout');
    if (outcome === 'error') {
      const msg = (await page.locator('.swal2-html-container').innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
      if (!/thành công/i.test(msg)) throw new Error('rookies.vn báo lỗi khi lưu: ' + (msg || '(không có nội dung)'));
    }
    // No popup at all (timeout): carry on; the reload-and-compare in verify() decides.
    if (outcome === 'timeout') await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.getByRole('button', { name: /^\s*đóng\s*$/i }).first().click({ timeout: 5000 })
      .catch(() => page.getByText(/^\s*đóng\s*$/i).first().click({ timeout: 5000 }).catch(() => {}));
  }

  // Reload the chapter and check that the site kept exactly our text.
  async function verify(id, post, expected) {
    await page.goto(editUrl(id), { waitUntil: 'domcontentloaded' });
    await page.waitForFunction((eid) => !!window.tinymce?.get(eid)?.initialized, SEL.editorId, { timeout: 30000 });
    const [title, text] = await page.evaluate(
      ({ sel, eid }) => [document.querySelector(sel)?.value ?? '', window.tinymce.get(eid).getContent({ format: 'text' }).replace(/\s+/g, ' ').trim()],
      { sel: SEL.title, eid: SEL.editorId },
    );
    if (title.trim() !== post.title.trim()) throw new Error(`Đã lưu nhưng tiêu đề trên rookies.vn khác: "${title}"`);
    if (text !== expected) throw new Error('Đã lưu nhưng nội dung trên rookies.vn khác bản đã gửi. Mở chương để xem.');
  }

  const normTitle = (t) => t.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();

  async function create(post) {
    await ensureSignedIn();
    await page.goto(`${base}/author/tao-chuong/${r.storyId}`, { waitUntil: 'domcontentloaded' });
    const expected = await fillEditor(post);
    await save(post.mode);
    await waitSaved({ watchUrl: true });
    // The page does not move to the new chapter, so find it in the chapter list by title.
    let id = /\/chinh-sua-chuong\/[^/]+\/(\d+)/.exec(page.url())?.[1];
    if (!id) {
      const same = (await listRemote()).filter((x) => normTitle(x.title) === normTitle(post.title));
      if (same.length !== 1) throw new Error(`Đã đăng "${post.title}" nhưng tìm thấy ${same.length} chương cùng tên trong mục lục rookies.vn. Kiểm tra mục lục rồi chạy lại (worker sẽ tự nhận lại chương).`);
      id = same[0].id;
    }
    await verify(id, post, expected);
    return { id, url: editUrl(id) };
  }

  async function update(id, post) {
    await ensureSignedIn();
    await page.goto(editUrl(id), { waitUntil: 'domcontentloaded' });
    if (!page.url().includes(`/${id}`)) throw new Error(`Không mở được chương ${id} trên rookies.vn (đã bị xóa?)`);
    const expected = await fillEditor(post);
    await save(post.mode, { existing: true });
    await waitSaved();
    await verify(id, post, expected);
    return { id, url: editUrl(id) };
  }

  async function screenshot(dir, name) {
    await mkdir(dir, { recursive: true });
    const path = join(dir, `${name}.png`);
    await page.screenshot({ path, fullPage: true }).catch(() => {});
    return path;
  }

  return {
    page,
    signedIn,
    loginWithPassword,
    listRemote,
    create,
    update,
    screenshot,
    loginUrl: `${base}/`,
    close: () => context.close(),
  };
}
