// truyennhaong.vn (Truyện nhà Ong, TNO) has no API: this drives the author pages
// ("Văn phòng") in a real browser (Playwright), signed in once with
// `npm run crosspost -- login truyennhaong`. Everything that depends on how TNO's
// pages look is in this file.
//
// Same contract as every adapter (see .claude/skills/crosspost-site/SKILL.md):
//   open() → session with: signedIn(), loginWithPassword(user, pass),
//            listRemote(), create(post), update(id, post), close()
//   plus, TNO only: workStatus(), syncInfo(info, { save })
//   post = { title, html, plain, mode: 'publish' | 'draft' }
//
// What we know about TNO (read from the pages, 15/10/2026):
//   * A chapter is either "Đã xuất bản" or "Nháp"; there is no per-chapter review.
//     Readers only see chapters once the whole work has been approved by an editor
//     (BTV); from then on a chapter saved as "Đăng" is public at once.
//   * Pressing "Lưu" runs OfficeTextLint: above 10 formatting errors per 1000
//     words the page refuses to save and shows #lintWarningBanner. We never get
//     around it: we report it (crosspost check runs the same lint beforehand).
//   * Ads cover parts of the page, so ad hosts are blocked and every action uses
//     form fields / element handles, never screen coordinates.
//   * The worker never touches "Gửi duyệt", "Gửi duyệt độc quyền", "Yêu cầu xóa",
//     "Khóa chương" or "Xóa": those stay with the author.
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SEL = {
  title: '#CreateChapterDto_ChapterName',
  status: 'select[name="CreateChapterDto.Status"]',
  editorId: 'chapterContent', // TinyMCE id of "Nội dung chương" (the page has a second one for "Giới thiệu ngắn")
  saveButton: 'button[onclick^="getEditorData"]',
  lintBanner: '#lintWarningBanner',
  lintText: '#lintWarningText',
  chapterRows: '#tab-chapters tbody tr',
  editLink: 'a[href*="/vanphong/sua-chuong?id="]',
  // Story info form ("Sửa thông tin")
  infoForm: 'form[action="/vanphong/sua-truyen"]',
  infoIntroId: 'storyIntro',
  infoShort: '#storyShortIntro',
};

const STATUSES = ['Nháp', 'Đợi duyệt', 'Yêu cầu sửa', 'Đã duyệt', 'Đang sáng tác', 'Hoàn thành', 'Từ chối', 'Tạm ngưng'];
const HAS_URL = /https?:\/\/|www\.|\]\(/i;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const squash = (t) => t.normalize('NFC').replace(/\s+/g, ' ').trim();

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
    context = await chromium.launchPersistentContext(profileDir, { ...opts, channel: 'chrome' });
  } catch {
    context = await chromium.launchPersistentContext(profileDir, opts);
  }
  const t = cfg.truyennhaong;
  const base = t.base.replace(/\/+$/, '');
  const blocked = (t.blockHosts ?? []).map((h) => h.toLowerCase());
  if (blocked.length) {
    await context.route('**/*', (route) => {
      let host = '';
      try {
        host = new URL(route.request().url()).hostname.toLowerCase();
      } catch {}
      return blocked.some((h) => host === h || host.endsWith('.' + h)) ? route.abort() : route.continue();
    });
  }
  const page = context.pages()[0] ?? (await context.newPage());
  const workUrl = `${base}/vanphong/tac-pham?id=${t.workId}`;
  const newUrl = `${base}/vanphong/viet-chuong?id=${t.workId}`;
  const editUrl = (id) => `${base}/vanphong/sua-chuong?id=${id}`;
  const infoUrl = `${base}/vanphong/sua?id=${t.workId}`;

  async function go(url) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  }

  async function signedIn() {
    await go(workUrl);
    return /\/vanphong\/tac-pham/.test(page.url()) && (await page.locator(`a[href*="/vanphong/viet-chuong?id=${t.workId}"]`).count()) > 0;
  }

  async function ensureSignedIn() {
    if (!(await signedIn())) {
      const e = new Error('truyennhaong.vn đã đăng xuất worker. Chạy: npm run crosspost -- login truyennhaong và tự đăng nhập.');
      e.code = 'SIGNED_OUT';
      throw e;
    }
  }

  // The TNO sign-in page has not been mapped yet (and may be Google-only), so
  // the worker never types a password there: the author signs in by hand once.
  async function loginWithPassword() {
    if (await signedIn()) return;
    throw new Error('Chưa hỗ trợ tự đăng nhập truyennhaong.vn. Chạy: npm run crosspost -- login truyennhaong và tự đăng nhập trong cửa sổ đó.');
  }

  // Status of the whole work, e.g. "Yêu cầu sửa", "Đang sáng tác".
  async function workStatus() {
    await ensureSignedIn();
    return page.evaluate((known) => {
      for (const el of document.querySelectorAll('main span, main div')) {
        const txt = (el.textContent || '').trim();
        if (el.children.length === 0 && known.includes(txt)) return txt;
      }
      return null;
    }, STATUSES);
  }

  // Every chapter of the work, in TNO's order (the "Mục lục" table is in the
  // page even while its tab is hidden, so nothing has to be clicked).
  async function listRemote() {
    await ensureSignedIn();
    return page.evaluate(({ rowsSel, linkSel, base }) => {
      const out = [];
      for (const tr of document.querySelectorAll(rowsSel)) {
        const a = tr.querySelector(linkSel);
        const id = a && new URL(a.getAttribute('href'), base).searchParams.get('id');
        if (!id) continue;
        const cells = [...tr.cells].map((c) => (c.textContent || '').trim());
        out.push({ id, title: cells[1] ?? '', url: new URL(a.getAttribute('href'), base).href, status: /Nháp/i.test(cells[3] ?? '') ? 'draft' : 'published' });
      }
      return out;
    }, { rowsSel: SEL.chapterRows, linkSel: SEL.editLink, base });
  }

  // A leftover autosave ("Khôi phục" / "Bỏ qua") must not restore an older text:
  // close its dialog without pressing either button (both are submit buttons).
  async function dismissAutosave() {
    await page.evaluate(() => {
      const b = document.getElementById('dismissDraftBtn');
      const d = b && b.closest('dialog');
      if (d && d.open) d.close();
    });
  }

  async function fillEditor(post) {
    await page.waitForSelector(SEL.title, { timeout: 30000 });
    await page.waitForFunction((id) => !!window.tinymce?.get(id)?.initialized, SEL.editorId, { timeout: 30000 });
    await dismissAutosave();
    if (HAS_URL.test(post.html.replace(/<[^>]+>/g, ' ')) && cfg.linksAllowed === false) throw new Error('Bản cần đăng có link, mà truyennhaong chưa được phép gửi link (linksAllowed: false).');
    if (cfg.linksAllowed === false && /<a\s/i.test(post.html)) throw new Error('Bản cần đăng có thẻ link, mà truyennhaong chưa được phép gửi link.');
    await page.fill(SEL.title, post.title);
    await page.selectOption(SEL.status, t.status[post.mode]);
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
    const loose = (s) => s.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
    if (loose(got) !== loose(post.plain)) throw new Error('Nội dung trong trình soạn thảo không khớp bản cần đăng (chưa lưu gì).');
    return got;
  }

  // Press "Lưu" and wait: either the page submits (navigation), or TNO's lint
  // refuses the save and shows its banner.
  async function save() {
    const before = page.url();
    const nav = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 45000 }).then(() => 'saved');
    const lint = page.locator(SEL.lintBanner).waitFor({ state: 'visible', timeout: 45000 }).then(() => 'lint');
    await page.locator(SEL.saveButton).first().click();
    const outcome = await Promise.race([nav, lint]).catch(() => 'timeout');
    if (outcome === 'lint') {
      const msg = squash(await page.locator(SEL.lintText).innerText().catch(() => ''));
      throw new Error('truyennhaong.vn không cho lưu vì lỗi định dạng: ' + (msg || '(không đọc được thông báo)') + ' Sửa ở bản gốc trên Vercel rồi chuyển lại.');
    }
    if (outcome === 'timeout' && page.url() === before) throw new Error('Bấm Lưu nhưng trang không phản hồi sau 45 giây. Kiểm tra mục lục trước khi chạy lại.');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  }

  async function verify(id, post, expected) {
    await go(editUrl(id));
    await page.waitForFunction((eid) => !!window.tinymce?.get(eid)?.initialized, SEL.editorId, { timeout: 30000 });
    await dismissAutosave();
    const [title, text, html, status] = await page.evaluate(
      ({ sel, eid, st }) => [
        document.querySelector(sel)?.value ?? '',
        window.tinymce.get(eid).getContent({ format: 'text' }).replace(/\s+/g, ' ').trim(),
        window.tinymce.get(eid).getContent(),
        document.querySelector(st)?.value ?? '',
      ],
      { sel: SEL.title, eid: SEL.editorId, st: SEL.status },
    );
    if (cfg.linksAllowed !== false) {
      for (const [, url] of post.html.matchAll(/<a href="([^"]+)"/g)) {
        if (!html.includes(`href="${url}"`)) throw new Error(`Đã lưu nhưng truyennhaong.vn bỏ mất link ở chân trang (${url}).`);
      }
    } else if (/<a\s/i.test(html)) throw new Error('Chương trên truyennhaong.vn đang có link, mà chưa được phép gửi link. Mở chương để xem.');
    if (title.trim() !== post.title.trim()) throw new Error(`Đã lưu nhưng tiêu đề trên truyennhaong.vn khác: "${title}"`);
    if (squash(text) !== squash(expected)) throw new Error('Đã lưu nhưng nội dung trên truyennhaong.vn khác bản đã gửi. Mở chương để xem.');
    if (status && status !== t.status[post.mode]) throw new Error(`Đã lưu nhưng trạng thái chương trên truyennhaong.vn là ${status}, không phải ${post.mode}.`);
  }

  const normTitle = (s) => s.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();

  async function create(post) {
    await ensureSignedIn();
    await go(newUrl);
    const expected = await fillEditor(post);
    await save();
    let id = new URL(page.url()).pathname.includes('/sua-chuong') ? new URL(page.url()).searchParams.get('id') : null;
    if (!id) {
      const same = (await listRemote()).filter((x) => normTitle(x.title) === normTitle(post.title));
      if (same.length !== 1) throw new Error(`Đã lưu "${post.title}" nhưng tìm thấy ${same.length} chương cùng tên trong mục lục truyennhaong.vn. Kiểm tra mục lục rồi chạy lại (worker sẽ tự nhận lại chương).`);
      id = same[0].id;
    }
    await verify(id, post, expected);
    return { id, url: editUrl(id) };
  }

  async function update(id, post) {
    await ensureSignedIn();
    await go(editUrl(id));
    if (!(await page.locator(SEL.title).count())) throw new Error(`Không mở được chương ${id} trên truyennhaong.vn (đã bị xóa?)`);
    const expected = await fillEditor(post);
    await save();
    await verify(id, post, expected);
    return { id, url: editUrl(id) };
  }

  // Story info ("Sửa thông tin"): the one-line intro and the long intro.
  // info = { tagline: string, intro: string[] (paragraphs) }
  // Returns { changed, current, wanted }. Saves only with { save: true }.
  async function syncInfo(info, { save: doSave = false } = {}) {
    await ensureSignedIn();
    const text = [info.tagline, ...info.intro].join('\n');
    if (cfg.linksAllowed === false && HAS_URL.test(text)) throw new Error('Giới thiệu truyện có link, mà truyennhaong chưa được phép gửi link (linksAllowed: false).');
    const read = async () => {
      await go(infoUrl);
      await page.waitForFunction((id) => !!window.tinymce?.get(id)?.initialized, SEL.infoIntroId, { timeout: 30000 });
      return page.evaluate(({ id, shortSel }) => {
        const body = window.tinymce.get(id).getBody();
        const paras = [...body.querySelectorAll('p')].map((p) => (p.textContent || '').replace(/\s+/g, ' ').trim()).filter(Boolean);
        return { tagline: (document.querySelector(shortSel)?.value ?? '').trim(), intro: paras };
      }, { id: SEL.infoIntroId, shortSel: SEL.infoShort });
    };
    const wanted = { tagline: squash(info.tagline), intro: info.intro.map(squash).filter(Boolean) };
    const same = (a) => a.tagline.normalize('NFC') === wanted.tagline.normalize('NFC') && JSON.stringify(a.intro.map((x) => x.normalize('NFC'))) === JSON.stringify(wanted.intro.map((x) => x.normalize('NFC')));
    const current = await read();
    if (same(current) || !doSave) return { changed: !same(current), current, wanted };
    await page.fill(SEL.infoShort, wanted.tagline);
    await page.evaluate(({ id, html }) => {
      const ed = window.tinymce.get(id);
      ed.setContent(html);
      ed.save();
      ed.fire('change');
    }, { id: SEL.infoIntroId, html: wanted.intro.map((p) => `<p>${esc(p)}</p>`).join('\n') });
    const nav = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => null);
    await page.locator(`${SEL.infoForm} button[type="submit"]`).first().click();
    await nav;
    const after = await read();
    if (!same(after)) throw new Error('Đã bấm Lưu nhưng giới thiệu truyện trên truyennhaong.vn vẫn khác. Mở "Sửa thông tin" để xem.');
    return { changed: true, current: after, wanted };
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
    workStatus,
    listRemote,
    create,
    update,
    syncInfo,
    screenshot,
    loginUrl: `${base}/vanphong`,
    close: () => context.close(),
  };
}
