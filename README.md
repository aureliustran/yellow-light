# Đèn Vàng – reading site

The reading site for *Đèn Vàng* by Aurelius. Astro on Vercel, with Supabase for chapters, Google login, comments, ratings and read counts.

- **Readers** read everything without an account. Signing in (Google) is only needed to comment or rate.
- **You** write, edit, schedule, reorder and delete chapters at `/admin`.
- **English and Hà Tĩnh lines** can be tapped to show a translation.
- **Daily backups** of every chapter are committed to this repo as Markdown, which also keeps the free Supabase project awake.

## How it works

```
Reader's browser ──► Vercel (Astro pages, cached ~30 s) ──► Supabase (chapters, read as anonymous)
       │
       └──► Supabase directly (login, comments, ratings, views, admin writes)
```

Every permission is enforced by the database's row-level security rules in `supabase/migrations/0001_init.sql`, not by hiding buttons. Only published chapters whose publish time has passed are visible to readers. Only accounts with `is_admin = true` can write chapters.

## Setup (about 20–30 minutes, once)

You need Node.js **22.18 or newer**, plus free accounts on GitHub, Supabase, Vercel and Google Cloud.

### 1. Supabase project and database

1. Create a project at [supabase.com](https://supabase.com). A region close to Vietnam (Singapore) is fastest.
2. Open **SQL Editor**, paste all of `supabase/migrations/0001_init.sql`, and click **Run**.
3. Open **Project Settings → API** and copy:
   - the **Project URL**
   - the **anon / publishable** key (safe in browsers)
   - the **service_role / secret** key (never share it, never put it on Vercel)

### 2. Google login

1. In [Google Cloud Console](https://console.cloud.google.com/), go to **APIs & Services → Credentials → Create credentials → OAuth client ID**.
2. Choose **Web application**. Under **Authorized redirect URIs**, add `https://YOUR-PROJECT.supabase.co/auth/v1/callback`.
3. Copy the client ID and secret into Supabase: **Authentication → Providers → Google**, then enable it.
4. In Supabase **Authentication → URL Configuration**:
   - **Site URL:** your Vercel address (fill in after step 5; `http://localhost:4321` for now)
   - **Redirect URLs:** add `http://localhost:4321/auth/callback`, and later `https://YOUR-SITE/auth/callback`

### 3. Run it locally

```bash
npm install
cp .env.example .env      # then fill in the three Supabase values
npm run dev               # http://localhost:4321
```

### 4. Make yourself the admin

1. Open the site, click **Đăng nhập**, and sign in with your Google account.
2. Go to `/admin`. It shows a one-line SQL command containing your account ID.
3. Run that command in Supabase **SQL Editor**, then reload `/admin`.

### 5. Import your chapters

The 17 existing chapter and interlude files are already in `content/import/`.

```bash
npm run import -- --dry-run   # shows what would be imported, changes nothing
npm run import                # imports them, published immediately
npm run import -- --overwrite --reorder   # also replaces existing chapters, and puts every chapter in file-name order (interludes like 17b- go right after 17-)
```

The import:

- Reads `# Chương N: Title` as a numbered chapter and any other `# Title` as an interlude.
- Moves the in-story date line (e.g. `*Thứ Bảy, 3/10/2026*`) into its own field and removes the `Oct 4, 2026 · @aureliustran.` line.
- Keeps file-name order and sets interlude colours from `src/config.ts`.
- Skips chapters that already exist (same web address), so running it twice is safe. Use `--overwrite` to replace them, or `--draft` to import as drafts.

The originals in `content/import/` were copied from the Claude project files. Skim each chapter in `/admin` once.

### 6. Put it on GitHub (private)

```bash
git remote add origin https://github.com/YOUR-NAME/den-vang-site.git
git push -u origin main
```

### 7. Deploy on Vercel

1. In Vercel, click **Add New → Project** and import the repo. The framework is detected as Astro.
2. Under **Environment Variables**, add:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `SITE_URL` (e.g. `https://den-vang.vercel.app`)
3. Click **Deploy**.
4. Go back to Supabase **Authentication → URL Configuration** and set the Site URL and the `/auth/callback` redirect to the real address.

### 8. Daily backups and keep-alive

In GitHub, open **Settings → Secrets and variables → Actions** and add:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Then open **Actions → Backup chapters → Run workflow** once to test it. After that it runs every day at 02:17 Vietnam time:

- It writes every chapter (drafts too) to `backup/chapters/` and commits only when something changed.
- Vercel skips redeploying for commits that only touch `backup/` or `content/` (see `vercel.json`).
- The daily database read counts as activity, so the free Supabase project doesn't pause.

## Writing chapters

Use normal Markdown (`*nghiêng*`, `**đậm**`) plus these extras. The admin editor has buttons that insert each one, and the **Xem trước** tab shows exactly what readers will see.

| What | Write |
| --- | --- |
| Scene break (traffic light) | a line with `---` |
| Text messages | `:::chat Group name` … `:::`, one message per line: `Name: text` for received, `> text` for sent |
| English phrase readers can translate | `[[en: original || bản dịch]]` |
| Hà Tĩnh phrase readers can translate | `[[ht: original || bản dịch]]` |
| Longer passage with translation | `:::dich en` (or `ht`), the original, a line with `\|\|`, the translation, then `:::` |
| Reply to a message | inside `:::chat`, a line `^ Name: the quoted message` right before the reply |
| Email shown in full | `:::email` with `Từ:` / `Đến:` / `Chủ đề:` lines, a blank line, then the body, then `:::` |
| Text editor window | `:::editor file.md` … `:::`, lines shown as typed (`[[en: … \|\| …]]` still works) |
| IDE or terminal window | `:::ide file.py` or `:::ide Terminal` … `:::`; a line starting `$ ` is a shell command |
| Note typed in a phone | `:::phone Title` … `:::` (title optional; every line is a line of the note) |
| Handwritten note or list | `:::note Title` … `:::` (a `-` list becomes handwritten lines); `:::note ink` is a margin note |
| Spreadsheet | `:::sheet File name` + a Markdown table. Start a row with `[x]` (done, green) or `[~]` (waiting, yellow); an empty cell or `(trống)` is a blank cell |

Example:

```
:::chat CLB Tin học – Ban điều hành
Ngọc Anh (K71): anh Thuyên ơi slide workshop tuần sau anh duyệt giúp em với ạ
> ok trưa a xem
:::

Mạ hỏi: "[[ht: Học hành răng rồi? || Học hành thế nào rồi?]]"
```

**Rule for new chapters:** whenever the story shows a document in full, use its block instead of italics or plain paragraphs: a text conversation → `:::chat`, an email with its full content → `:::email`, an IDE, terminal or text editor → `:::ide` / `:::editor`, a spreadsheet → `:::sheet`, a handwritten note or list → `:::note`, a note typed in a phone's notes app → `:::phone`. Only a short quoted line inside a sentence stays inline.

**`docs/ban-dich-de-xuat.md`** lists every English and Hà Tĩnh line in chapters 1–13 and 28–29 with the marker ready to paste. Hà Tĩnh translations come from your own footnotes; English ones are suggestions to check.

**Publishing:**

- **Đăng** with an empty time publishes now.
- A future time schedules it. It appears by itself, no action needed.
- **Nháp** keeps it visible only to you.
- Readers see changes within about 30 seconds (page cache).

**Order:** drag rows in the chapter list, or use the arrows on a phone. Chapter numbers come from the order and skip interludes, so they renumber themselves.

## Project layout

```
supabase/migrations/0001_init.sql   database, security rules, functions
src/config.ts                       title, blurb, tags, login, interlude colours  ← edit me
src/lib/markdown.ts                 Markdown + chat, email, editor/IDE, note, sheet, scene breaks, translations
src/pages/index.astro               home: cover, stats, story rating, contents
src/pages/doc/[slug].astro          reader
src/pages/admin/index.astro         admin (logic in src/scripts/admin.ts)
src/scripts/                        browser code: login, comments, ratings, translations
scripts/import-chapters.mjs         one-time import
scripts/export-chapters.mjs         backup (used by the GitHub Action)
scripts/apply-blocks.mjs            turns spreadsheet / note / editor / terminal passages in new chapters into blocks
content/import/                     your chapters as of 7/10/2026
docs/ban-dich-de-xuat.md            translation list to review
tests/                              npm test
crosspost/                          cross-posting: core, worker, CLI (never deployed to Vercel)
crosspost/sites/rookies/convert.md  conversion rules Claude follows  ← edit to change conversions
crosspost/sites/rookies/adapter.mjs every rookies.vn page step (fix here if rookies.vn changes)
crosspost/out/rookies/              the converted versions (committed)
src/pages/admin/crosspost.astro     /admin/crosspost (logic in src/scripts/crosspost-admin.ts)
CLAUDE.md                           rules for Claude sessions in this project
```

## Cross-posting to other sites (rookies.vn)

The first chapters also go up on rookies.vn, each with a footer linking to the
next chapter here, so readers come over to this site. The code lives in
`crosspost/` (outside the site build) and the controls in `/admin/crosspost`.

A **foreword** on rookies.vn is written by hand and never synced or adopted. Its
title is in `crosspost/sites/rookies/config.json` (`foreword`). The worker only
notices it and prints a note before creating Chapter 1; nothing is enforced.

How the pieces fit:

```
Supabase chapter ──► Claude converts (convert.md) ──► checks ──► /admin/crosspost: select + Đồng bộ
                                                                        │ (queue in Supabase)
                                              worker on your computer ◄─┘ ──► rookies.vn
```

The admin page (production or local, both work) only queues. Nothing reaches
rookies.vn unless `npm run crosspost:worker` is running on your computer.

### One-time setup

1. Supabase → SQL Editor: run `supabase/migrations/0005_crosspost.sql`, then `0006_crosspost_login.sql`.
2. On your computer: `npm run crosspost:setup` (installs the worker's browser, Playwright).
3. Start the worker: `npm run crosspost:worker`, and leave the terminal open.
4. Sign it in to rookies.vn from `/admin/crosspost` (see "Signing the worker in" below).
5. In `/admin/crosspost`, set **Số chương đầu được đăng** (the teaser: how many chapters go up).

### Converting chapters (Claude)

rookies.vn can't show chat bubbles, emails, notes, emoji or tap-to-translate, so
each chapter needs a site version. Claude makes it, on request:

- In chat (with this folder connected) or in a coding session here, say
  *"chuyển chương 1–5 cho rookies"*.
- Claude follows `crosspost/sites/rookies/convert.md`, the only place the rules are
  written (block formats, emoji table, translations). To change how chapters are
  converted, edit that file.
- `CLAUDE.md` (repo root) tells any Claude session in this project the workflow and
  the hard rules. The `den-vang-crosspost` personal skill does the same in chat.
- The versions are written to `crosspost/out/rookies/` (committed, so you can review
  diffs), checked, and saved. The check rejects any version that changes, drops or
  reorders the story's words, loses a chat line, or leaves emoji, `:::` blocks or links.

The same steps by hand:

```bash
npm run crosspost -- pull rookies --range 1-5    # sources → crosspost/work/rookies/
# write crosspost/out/rookies/<same name>.txt for each, following convert.md
npm run crosspost -- check rookies               # fix until every chapter shows ✓
npm run crosspost -- check rookies --save        # store them in Supabase
```

### Using /admin/crosspost

1. **Check the worker** (top right): green "Worker đang chạy" is ready; amber "cần đăng
   nhập lại" means sign it in again; grey means start `npm run crosspost:worker`.
2. **Pick chapters**: tick them one by one, type a range (`1-5`, `8`, `10-`, `1-3,8`) and
   press **Chọn khoảng**, or press **Chọn tất cả**. Only chapters that can be synced are
   selectable (see the statuses below). Interludes come along with the chapter before them.
3. **Choose the mode**: **Đăng ngay** (public right away) or **Lưu bản thảo** (draft on
   rookies.vn, publish there by hand).
4. **Press Đồng bộ N chương** and confirm. The dialog shows how many are new and how many
   are updates. New chapters must go up in story order: if an earlier chapter is missing,
   the page asks you to include it.
5. **Watch Hàng đợi**: each job shows Đang chờ → Đang đăng → Xong (or Lỗi with the reason).
   The page refreshes itself while jobs are running. **Hủy việc đang chờ** cancels jobs that
   have not started.
6. **Xem bản đăng** on a row shows exactly what will be sent (title, date, text, footer).
   **Mở ↗** opens the chapter on rookies.vn.

Statuses in the "Trên Rookies.vn" column:

| Status | Meaning | What to do |
|---|---|---|
| Chỉ có trên Vercel | Past the teaser limit (or not published here) | Nothing; raise the limit to include it |
| Chưa chuyển | No rookies.vn version yet | Ask Claude to convert it |
| Cần chuyển lại | The chapter was edited here after converting | Ask Claude to convert it again |
| Sẵn sàng | Converted, not posted yet | Select it and sync |
| Đã đăng | rookies.vn has exactly the current version | Nothing |
| Cần cập nhật | Posted, but the footer or title changed (e.g. a new next chapter) | Select it and sync |
| Đang chờ / Đang đăng | In the queue / being posted by the worker | Wait |
| Lỗi | The last attempt failed; the reason is under the status | Fix the reason, then sync again |

### Signing the worker in

The form **Đăng nhập Rookies.vn cho worker** on `/admin/crosspost` (the worker must be running):

- The email/username and password are encrypted in your browser with a key that only the
  worker's computer holds (`crosspost/.profile/`, never committed). Vercel and Supabase only
  ever see the encrypted data, and the worker blanks it as soon as it has read it.
- Tick **Ghi nhớ** to let the worker sign itself in again when rookies.vn signs it out. It is
  kept only in `crosspost/.profile/` on that computer. **Xóa mật khẩu đã lưu** removes it.
- While the worker is signed out, queued chapters wait instead of failing.
- Accounts that only use Google sign-in, or when rookies.vn asks "are you human": run
  `npm run crosspost -- login rookies` and sign in by hand in the window it opens.

### No duplicates

One record and one open job per chapter (enforced by the database, so double-clicking or two
open tabs can't queue twice), an update instead of a new chapter once it has a rookies.vn id,
a check of the rookies.vn chapter list before creating (a chapter with the same title is taken
over, not duplicated), a "pending" mark so a crash mid-post never reposts, and a read-back
after saving to confirm rookies.vn kept exactly what was sent.

### Command line

```bash
npm run crosspost -- status rookies                 # every chapter and its status
npm run crosspost -- pull rookies --all             # sources for Claude (also --range, --only, --force, --any)
npm run crosspost -- check rookies [--save]         # check Claude's versions; --save stores them
npm run crosspost -- queue rookies --range 1-5      # same as Đồng bộ (add --draft or --publish)
npm run crosspost -- cancel rookies                 # cancel jobs that have not started
npm run crosspost -- login rookies                  # sign the worker in by hand
npm run crosspost:worker                            # post queued chapters, keep running
npm run crosspost -- worker rookies --once          # post what is queued, then stop
```

### When something goes wrong

- **A job failed**: the reason shows under the chapter and in Hàng đợi; a screenshot is saved
  in `crosspost/logs/rookies/job-<id>.png`. Fix it and sync again; the worker never creates
  a second copy of a chapter it already posted.
- **"Chưa đăng chương trước"**: new chapters go up in order. Sync the earlier ones too.
- **rookies.vn changed its pages**: every step that depends on how rookies.vn looks is in
  `crosspost/sites/rookies/adapter.mjs`; that is the only file to fix.

### Adding another site

A new folder in `crosspost/sites/<site>/` with `config.json`, `convert.md` and `adapter.mjs`
(the same functions as the rookies one), plus a row in the `crosspost_sites` table.

## Useful commands

```bash
npm run dev       # local site
npm test          # renderer, import parser, numbering
npm run check     # type check
npm run build     # production build
npm run export    # back up chapters to backup/chapters now
npm run crosspost -- status rookies   # what is posted on rookies.vn
npm run crosspost:worker              # post queued chapters
```

## Notes and limits

- **Free plans:** Vercel's Hobby plan is for non-commercial use. If you add ads or paid chapters, move to a paid plan. Free Supabase projects pause after about a week without activity; the daily backup prevents that. Check both providers' current terms.
- **Comments:** limited to one per 15 seconds and 100 per day per reader. You can delete any comment from the reader page while signed in as admin.
- **Deleting a chapter** also deletes its comments, ratings and read count. Backups keep the text.
- **Read counts** are counted once per browser per chapter, so they are approximate, not unique people.
