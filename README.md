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

Example:

```
:::chat CLB Tin học – Ban điều hành
Ngọc Anh (K71): anh Thuyên ơi slide workshop tuần sau anh duyệt giúp em với ạ
> ok trưa a xem
:::

Mạ hỏi: "[[ht: Học hành răng rồi? || Học hành thế nào rồi?]]"
```

**`docs/ban-dich-de-xuat.md`** lists every English and Hà Tĩnh line in chapters 1–13 with the marker ready to paste. Hà Tĩnh translations come from your own footnotes; English ones are suggestions to check.

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
src/lib/markdown.ts                 Markdown + chat, scene breaks, translations
src/pages/index.astro               home: cover, stats, story rating, contents
src/pages/doc/[slug].astro          reader
src/pages/admin/index.astro         admin (logic in src/scripts/admin.ts)
src/scripts/                        browser code: login, comments, ratings, translations
scripts/import-chapters.mjs         one-time import
scripts/export-chapters.mjs         backup (used by the GitHub Action)
content/import/                     your chapters as of 7/10/2026
docs/ban-dich-de-xuat.md            translation list to review
tests/                              npm test
```

## Useful commands

```bash
npm run dev       # local site
npm test          # renderer, import parser, numbering
npm run check     # type check
npm run build     # production build
npm run export    # back up chapters to backup/chapters now
```

## Notes and limits

- **Free plans:** Vercel's Hobby plan is for non-commercial use. If you add ads or paid chapters, move to a paid plan. Free Supabase projects pause after about a week without activity; the daily backup prevents that. Check both providers' current terms.
- **Comments:** limited to one per 15 seconds and 100 per day per reader. You can delete any comment from the reader page while signed in as admin.
- **Deleting a chapter** also deletes its comments, ratings and read count. Backups keep the text.
- **Read counts** are counted once per browser per chapter, so they are approximate, not unique people.
