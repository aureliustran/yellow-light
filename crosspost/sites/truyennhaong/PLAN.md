# truyennhaong.vn (Truyện nhà Ong, TNO): status and how to use

## Research result (15/10/2026, from the author pages)

**Yes: once the work is approved, a new chapter is public as soon as it is saved
as "Đăng".** Evidence:
- The chapter list (`#tab-chapters`) has only two chapter states, "Đã xuất bản" and
  "Nháp". There is no "chờ duyệt" for a chapter anywhere in the page or its scripts.
- The chapter form's "Hành động" is `Đăng` (4) or `Lưu nháp` (1); nothing else.
- Review exists only for the whole work: "Nháp" / "Đợi duyệt" / "Yêu cầu sửa" →
  "Đang sáng tác" (TNO guide). Today the work is "Yêu cầu sửa", its 8 chapters
  are "Đã xuất bản" with 0 views: not public until the BTV approves the work.
- TNO keeps the right to hide or remove content after publishing (Chính sách sử
  dụng §6.3), and can ask for edits in "Trao đổi với BTV".
Not tested live: no chapter was posted by the tool.

Also found: pressing "Lưu" runs TNO's lint (`/js/office-text-lint.js`), which blocks
the save above 10 errors / 1000 words (em dash, space before , . ! ?, lowercase
after . ! ?). Đèn Vàng's chapters measure at most ~4 / 1000.

## Rules in force

1. No external URL or link on TNO until its editors approve links by hand
   (`linksAllowed: false` in config.json → no footer, worker and checker refuse links,
   story intro sync refuses links). Turn on only after the BTV agrees, then fill
   `footer.next/last/home` as wanted.
2. Presentation rules: `convert.md`.
3. The tool never presses "Gửi duyệt", "Gửi duyệt độc quyền", "Yêu cầu xóa",
   "Khóa chương" or "Xóa". Submitting the work for review is the author's.

## What was built

| Piece | File |
|---|---|
| Site config (whole story, links off, TNO checks) | `config.json` |
| Browser adapter: list / create / update chapters, read work status, sync story intro, ad hosts blocked, lint banner reported, read-back after every save | `adapter.mjs` |
| No-links footer, `linksAllowed` | `crosspost/core/crosspost.ts` |
| Dash-line check, TNO lint (`formatLint`) per site | `crosspost/core/checks.ts` |
| `npm run crosspost -- info truyennhaong [--save]` (story intro from `src/config.ts` → TNO) | `crosspost/cli.mjs` |
| `story.tagline` + `story.intro` (source of the intro; copied from TNO as it is today) | `src/config.ts` |
| DB row (no teaser limit, default "Đăng") | `supabase/migrations/0007_crosspost_truyennhaong.sql` |
| Admin page site switcher `/admin/crosspost?site=truyennhaong` | `src/scripts/crosspost-admin.ts`, `src/pages/admin/crosspost.astro` |
| Makefile `SITES`, `npm run crosspost:worker:truyennhaong`, tests | |

## To do by the author, in order

1. Run `0007_crosspost_truyennhaong.sql` in Supabase → SQL Editor.
2. `npm run crosspost -- login truyennhaong`, sign in by hand in the window.
3. `npm run crosspost -- info truyennhaong` (read-only: should say it matches).
4. Ask Claude: "chuyển chương 1–8 cho nhà Ong" → pull / convert / check --save.
   The 8 chapters already on TNO are adopted by title and updated, not duplicated.
5. First run on one chapter: `npm run crosspost -- queue truyennhaong --only <slug> --draft`,
   then `npm run crosspost -- worker truyennhaong --once`. Check it in Mục lục.
   Note: `--draft` turns an already published chapter back into "Nháp" on update.
6. Then the rest (`queue … --range 1-8`), answer the BTV, press "Gửi duyệt" yourself.

## Open points

- Interludes: the 8 chapters on TNO are numbered chapters only. Decide whether
  interludes go to TNO; if not, queue with `--no-interludes`.
- "Thứ tự chương" is left as TNO sets it; check the order after the first new chapter.
- Saving "Sửa thông tin" might send the work back to review; untested. `info --save`
  only saves when the text differs.
- Cover credit on TNO says "Gemini" on a platform that rejects suspected AI content;
  worth a look by the author.
- The work is filed under "Truyện ngắn" although it is a long novel.
