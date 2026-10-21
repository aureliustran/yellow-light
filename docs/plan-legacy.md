# Plan: old story becomes "Legacy", v2 comes first; whole-story comments

Oct 20, 2026. Development plan. **Step 1 of the rollout is built** (Oct 21, see "Status").

## Goal

The v2 rewrite (`docs/00-quyet-dinh-v2.md`: "Toàn bộ truyện viết lại") goes on the
site as *the* story. The current 60-odd chapters and interludes stay readable as
**Legacy**, with their comments, ratings and read counts intact,
but they no longer sit on the home page, in "Đọc từ đầu" or in "Mới nhất".

Readers should see:

- Home: hero, blurb, stats and **Mục lục** are v2 only, starting at **Chương 0**.
  Below the TOC, a quiet "Legacy" card: one line on what it is (e.g. "Bản viết
  đầu tiên, đã dừng lại"), chapter count, and a link to `/legacy`.
- `/legacy`: the old TOC exactly as today's home TOC, under a banner saying this
  edition is finished and replaced.
- Search engines go to v2: every Legacy page has `noindex` (with
  `<link rel="canonical">` to the home page) and Legacy is left out of the sitemap.
- An old chapter page: a thin "Legacy" banner at the top with a link to the new
  version, prev/next stay inside the old edition, numbering stays as it is today
  (starts at Chương 1). Comments and chapter ratings stay open.
- Wherever the other sites are listed (footer, the Legacy card, `/legacy`), a line
  says they carry Legacy, e.g. footer "Rookies.vn · bản Legacy" and on `/legacy`:
  "Bản Legacy cũng đang đăng trên Rookies.vn." The site list comes from
  `story.crossposts` in `src/config.ts`; each entry gets `edition: 'v1'`, and the
  line is built from it, so when a site later moves to v2 only the config changes.

## Where things are today (what assumes one story)

| Place | Assumption |
| --- | --- |
| `supabase/migrations/0001_init.sql` `chapters` | `slug` unique, `position` unique across all chapters; `reorder_chapters` needs every chapter |
| `src/lib/chapters-shared.ts` `withNumbers` | one running number over the whole list |
| `src/lib/chapters.ts` | one list; prev/next/progress over it |
| `src/pages/index.astro` | first = "Đọc từ đầu", last = "Mới nhất", counts every row |
| `src/pages/doc/[slug].astro` | every chapter at `/doc/<slug>` |
| `src/scripts/home.ts` | "Đọc tiếp" from `dv:last` (may point at an old chapter) |
| `get_story_stats()` | views and ratings of everything |
| `src/scripts/admin.ts` | one list, one reorder |
| `crosspost/core/data.mjs` | all chapters by `position`; rookies.vn carries the old ch. 1–36 |
| `scripts/import-chapters.mjs`, `export-chapters.mjs` | one folder, one order |
| `src/pages/sitemap.xml.ts` | every chapter |

## Design

### Data: an `edition` column, not a second table

Comments, ratings, views, analytics and crosspost rows all reference `chapters.id`,
so keeping old chapters as rows in the same table keeps all of that for free.

New migration `0008_editions.sql`:

```sql
alter table public.chapters add column edition text not null default 'v1'
  check (edition in ('v1', 'v2'));
alter table public.chapters alter column edition set default 'v2';

-- Positions and slugs are per edition.
alter table public.chapters drop constraint chapters_position_key;
alter table public.chapters add constraint chapters_position_key
  unique (edition, position) deferrable initially deferred;
alter table public.chapters drop constraint chapters_slug_key;
alter table public.chapters add constraint chapters_slug_key unique (edition, slug);
```

- `chapters_before_write`: next position = `max(position) + 1` **within** `new.edition`.
- `reorder_chapters(p_ids uuid[])` → `reorder_chapters(p_edition text, p_ids uuid[])`:
  the "every chapter exactly once" check runs over that edition only.
- `get_story_stats()` → takes `p_edition text default 'v2'`: views count only
  that edition's chapters. Story rating (`story_ratings`) stays one rating for
  the whole work and carries over to v2 unchanged.
- RLS does not change: an old chapter stays public because it is published, and
  comments and ratings on it stay open.

Which edition is current lives in code, not the database:

```ts
// src/config.ts
export const editions = {
  current: 'v2',
  legacy: { id: 'v1', name: 'Legacy', path: '/legacy', note: 'Bản viết đầu tiên…' },
  // First chapter number per edition: v2 opens with Chương 0.
  firstNumber: { v1: 1, v2: 0 },
};
```

### URLs

Old chapters move to **`/legacy/<slug>`**. `/doc/<slug>` becomes v2 only.

`/doc/<slug>` lookup order: v2 chapter with that slug → render it; otherwise a v1
chapter with that slug → **301 to `/legacy/<slug>`**; otherwise 404. This keeps
every link already out there (rookies.vn footers, shares, Google) working until v2
reuses a slug, e.g. `den-vang` for the new Chương 0. When v2 takes a slug, the
old link opens the new chapter, which is the intended behaviour for a rewrite.

### Code changes

1. `src/lib/chapters.ts`: `getPublishedChapters(edition = current)` adds
   `.eq('edition', edition)`; `getChapterPage(slug, edition)`; new
   `findLegacySlug(slug)` for the redirect. `LIST_COLUMNS` gains `edition`.
2. `src/lib/chapters-shared.ts`: `ChapterRow.edition`; `withNumbers(list, first = 1)`
   counts from `first`, called per edition with `editions.firstNumber[edition]`:
   v2 runs Chương 0, 1, 2…; legacy keeps today's numbers. Chương 0 is a normal
   numbered chapter, not a special one (special stays "title is only digits").
   Check every `number` use treats 0 as a number, never `if (c.number)`: today
   `chapterLabel`, `chapterLinkName` and the home "Mới nhất" button already use
   `!= null` / `??`, so they are fine.
3. Extract the TOC `<ol class="lane">` from `index.astro` into
   `src/components/Toc.astro` (props: chapters, base path).
4. `src/pages/index.astro`: v2 list; add the "Legacy" card after the TOC. With no
   v2 chapter published yet: "Chương đầu tiên sắp lên đèn…" plus the card, so the
   switch can happen before v2 Chương 0 is out.
5. `src/pages/legacy/index.astro` and `src/pages/legacy/[slug].astro`. Move the
   chapter page body of `doc/[slug].astro` into `src/components/ChapterPage.astro`
   so both routes share it; it takes `basePath` for prev/next/TOC links and
   `legacy` for the banner.
6. `src/scripts/home.ts`: `dv:last` stores `path` instead of `slug` (read both;
   old entries have only `slug`, which still works through the redirect). If the
   last chapter read is legacy, label it "Đọc tiếp Legacy · Chương N".
7. `src/scripts/reader.ts`/`stats.ts`: `get_story_stats` call passes the edition.
8. `src/pages/sitemap.xml.ts`: v2 only (it already lists only the current edition).
   Legacy pages render `Base` with `noindex`.
9. Admin (`src/scripts/admin.ts`, `src/pages/admin/index.astro`): an edition
   switch above the list (default v2); new chapter gets the selected edition;
   reorder passes it. Stats/comments/ratings pages show the edition next to the
   chapter name.
10. `scripts/import-chapters.mjs`: `--edition v1|v2` (default v2), matching and
    `--reorder` inside that edition. New v2 files in `content/v2/`; move the
    current `content/import/` to `content/v1/` (Makefile and README updated).
11. `scripts/export-chapters.mjs`: write `backup/chapters/v1/` and `backup/chapters/v2/`.
12. `scripts/digest-lib.mjs`: prefix legacy chapter names with "Legacy ·".
13. Crosspost: **not changed in this work.** The other sites keep the Legacy
    chapters as they are. One guard is still needed, because crosspost reads
    every row of `chapters` by `position` (`crosspost/core/data.mjs`,
    `src/scripts/crosspost-admin.ts`): once v2 rows exist, positions repeat per
    edition and v2 chapters would mix into the list, get numbered with the old
    ones, and could be queued. So both reads get `.eq('edition', 'v1')` (one
    line each, no behaviour change today since every row is v1), with a comment
    that crosspost is pinned to Legacy until the v2 crosspost work.
    Known side effect: footer links already posted on rookies.vn point at
    `/doc/<slug>`. They redirect to `/legacy/<slug>` until v2 reuses a slug,
    then that link opens the v2 chapter. Fine for now; fix in the v2 crosspost
    work by building footer links from the edition's path.

    Later, v2 crosspost work (not now): current edition by default,
    `--edition v1` for old posts. The anti-duplicate keys (`site, chapter_id`)
    stay; v2 chapters are new ids so they never collide with v1 posts. Read
    `.claude/skills/crosspost-site/SKILL.md` first.
    Chương 0 also touches crosspost numbering (`crosspost/core/crosspost.ts`):
    `parseRange` treats an open start ("-3") as 1, so it must become the
    edition's first number; `groups()` folds anything before "chapter 1" into
    the first group, which already works with 0 as the first group;
    `teaser_limit` counts groups, so a limit of 5 means ch. 0–4 on v2; and
    `--range 1-5` would skip ch. 0, so the docs and Makefile examples become
    `--range 0-5`. Site chapter titles ("Chương 0: …") need a check per site,
    since some sites number chapters themselves.
14. `src/config.ts`: v2 blurb, intro, tagline, tags, status; `edition: 'v1'` on
    each `crossposts` entry. `src/components/Footer.astro` and the Legacy card
    show "· bản Legacy" for those entries. (`tagline`/`intro` are also copied to
    other sites by `crosspost info --save`; don't run that until those sites
    move to v2, or they would get the v2 intro on the Legacy story.)
15. Tests: `withNumbers` per edition (v2 starts at 0), `/doc` redirect lookup,
    import `--edition`, crosspost still sees only v1 rows.

## Whole-story comments

A comment section for the story itself, on the home page, under Mục lục and the
Legacy card ("Bình luận về truyện"). It works exactly like a chapter's comments:
same form, sign-in, anonymous names, replies (one level), report, hide/restore,
admin edit, ban, blocked words, rate limits, digest. Like the story rating, it
belongs to the whole work, not to an edition, so it stays when v2 takes over.

### Data: `chapter_id is null` means "the story"

No new table, so every moderation path already built keeps working. Migration
`0009_story_comments.sql`:

```sql
alter table public.comments alter column chapter_id drop not null;
create index comments_story_idx on public.comments (created_at) where chapter_id is null;

-- A story comment is public whenever it is visible.
create or replace function public.comment_target_is_public(p_chapter uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select p_chapter is null or public.chapter_is_public(p_chapter)
$$;
```

Then swap `chapter_is_public(chapter_id)` for `comment_target_is_public(chapter_id)` in:

- policy "read comments" (latest in `0002_analytics_moderation.sql`)
- policy "post comment" (`0001_init.sql`), keeping `not is_banned()` as in 0002
- policy "report a comment" on `comment_reports` (`0002`)
- `comments_before_insert`: the reply check becomes
  `p.chapter_id is distinct from new.chapter_id` (plain `<>` is null for story
  comments, so a story reply would pass a chapter parent through)
- `admin_comments`: `join chapters` → `left join`, `chapter_title` =
  `coalesce(c.title, 'Cả truyện')`; add filter `p_filter = 'story'`
- `get_story_stats()`: add `comment_count` (visible story comments)

### Code

1. `src/components/Comments.astro`: the `<section class="comments" data-comments>`
   block moved out of `doc/[slug].astro` (props: heading, placeholder), used by
   the chapter page and the home page.
2. `src/scripts/comments.ts`: `initComments(section, chapterId: string | null)`;
   load uses `.is('chapter_id', null)` when null, insert sends `chapter_id: null`.
   Nothing else changes.
3. `src/pages/index.astro` + `src/scripts/home.ts`: render the section with
   `id="binh-luan"`, call `initComments(el, null)`; show the count next to the
   heading and as a stat in the hero ("bình luận"). Comments load in the browser,
   so the home page's 30 s cache does not delay them.
4. `src/scripts/moderation.ts`, `/admin/comments`: "Cả truyện" as the place,
   linking to `/#binh-luan`; a "Cả truyện" filter.
5. `scripts/digest.mjs`: `chapters(title)` is null for story comments → "Cả truyện".
6. Tests: insert/read as anon and signed-in for a story comment, a reply to a story
   comment, a story reply pointed at a chapter comment (rejected), report.

### Order

Independent of the Legacy work: it can ship before or after. If before, the
`Comments.astro` extraction is done here and step 5 of the Legacy code reuses it.

## Rollout order

Each step deploys alone and changes nothing visible until step 4.

1. Migration 0008 (all rows become `v1`). Code from steps 1–2, 9–11 reads
   `edition` but the home page still shows v1 as current (`current: 'v1'`).
   The crosspost `v1` pin (13) ships here too: it must be live before any v2
   row exists.
2. `/legacy` routes and the shared chapter component; check every old chapter
   opens there with comments, ratings and views.
3. Import v2 chapters as **drafts** with `--edition v2`; preview in admin.
4. Switch `editions.current` to `'v2'`, publish v2 Chương 0 (or schedule it).
   From here `/doc/<old slug>` redirects.

Rollback at any point before 4: nothing reader-facing changed. After 4: set
`current` back to `'v1'` and redeploy.

## Decisions

Decided (Oct 21, 2026):

1. Comments and chapter ratings on Legacy stay open.
2. The story rating carries over to v2.
3. Home page views count v2 only.
4. Other sites keep Legacy; crosspost is not changed beyond the v1 pin. The site
   says they carry Legacy.

5. Google leads to v2: Legacy pages are `noindex` and not in the sitemap.

Nothing is open.

## Status

### Step 1: built (Oct 21, 2026)

What shipped, and where it differs from the design above:

- `supabase/migrations/0008_editions.sql`: `edition` column, per-edition
  `unique (edition, slug)` and `unique (edition, position)`, per-edition next
  position, a chapter can't change edition, `reorder_chapters(p_ids)` keeps its
  signature and takes the edition from the first id (so old admin code keeps
  working), `get_story_stats(p_edition text default null)` (null = all, so old
  code calling it without arguments still works), `admin_chapter_stats()` returns
  `edition`. The column default stays `'v1'` (not `'v2'`): code that does not
  send an edition lands where the site shows it; the site code always sends it.
  Checked on a local Postgres 16 with the 0001–0007 schema and seed data, and
  re-running the file is safe.
- `src/config.ts`: `editions` (`current: 'v1'`, names, `firstNumber`).
- `src/lib/chapters-shared.ts`: `withNumbers(list, first = 1)`, `ChapterRow.edition`.
- `src/lib/chapters.ts`: reads filter by edition (default current).
- `src/scripts/home.ts`: views of the current edition.
- Admin: edition picker above the chapter list (`/admin`); new chapters go into
  the picked edition; "Xem" only for the current edition (until `/legacy`
  exists). `/admin/stats` numbers per edition and names the edition once both exist.
- `scripts/import-chapters.mjs`: `--edition v1|v2` (default current); v1 reads
  `content/import/`, v2 reads `content/v2/`. **Changed from the design:**
  `content/import/` is not renamed to `content/v1/`, because
  `apply-translations`, `apply-chats`, `apply-blocks` and the writing docs use
  that path. Make: `import-v2-dry`, `import-v2-draft`. Import workflow: `edition` input.
- `scripts/export-chapters.mjs`: `backup/chapters/v1/`, `backup/chapters/v2/`
  (old files in `backup/chapters/*.md` are removed on the first run). The
  `number:` field now skips special chapters, like the site does.
- Crosspost pinned to v1 (`crosspost/core/data.mjs` `CROSSPOST_EDITION`,
  `src/scripts/crosspost-admin.ts`).
- Tests: `withNumbers` from 0.

Not in step 1, moved to step 2: comment/rating admin pages and the digest
naming the edition (they only matter once v2 chapters are public).

**To deploy:** run `0008_editions.sql` in Supabase → SQL Editor first, then
deploy the code. The other order breaks the home page's view count until the
migration runs.

## Cross-posting handoff (for another agent)

Moving cross-posting to v2 is separate work that another agent can take on. Not
started; the author said not to touch it yet. Read first:
`.claude/skills/crosspost-site/SKILL.md` (anti-duplicate layers that must stay),
`CLAUDE.md` (conversion rules), this file.

State when handed over:

- Every crosspost read is pinned to Legacy: `CROSSPOST_EDITION = 'v1'` in
  `crosspost/core/data.mjs` and `.eq('edition', 'v1')` in
  `src/scripts/crosspost-admin.ts`. Grep for `edition` in `crosspost/` and
  `crosspost-admin.ts` to find every pin.
- rookies.vn (ch. 1–36 posted) and truyennhaong (8 chapters, work waiting for
  its editors, per `crosspost/sites/truyennhaong/PLAN.md` on 15/10) carry v1.
  Check `npm run crosspost -- status <site>` for the real state. The author wants them left there.
- `crosspost_posts` / `crosspost_jobs` key on `chapter_id`; v2 chapters are new
  rows, so they can never match a v1 post. Don't key anything on slug: v2 may
  reuse v1 slugs (`den-vang`).

Questions to settle with the author before coding:

1. v2 on each site: a new work (new `storyId`), or replace the Legacy chapters
   in the same work? A new work is far safer: no remote edits or deletes, no
   chance of overwriting a posted Legacy chapter.
2. If a new work: a site config per edition (e.g. `sites/rookies/config.json`
   gets `edition` and a second entry, or `sites/rookies-v2/`), and `crosspost_sites`
   one row per (site, edition).

Things that will bite:

- **Footer links.** `chapterUrl` in `crosspost/core/crosspost.ts` builds
  `${vercelUrl}/doc/${slug}`. After the switch, `/doc/<slug>` is v2: a Legacy
  footer link redirects to `/legacy/<slug>` only while v2 has no chapter with
  that slug. Fix: build Legacy links as `/legacy/<slug>`. But the footer is part
  of `source_hash`, so this marks every posted Legacy chapter "update"; decide
  with the author whether to re-sync them (one queue, worker edits in place) or
  leave the old links.
- **Footer text.** rookies' `footer.last` says new chapters appear first on the
  official site; for a finished Legacy edition that is no longer true. Legacy
  may want its own `footer` templates ("Bản Legacy · đọc bản mới tại …").
- **Chương 0.** `parseRange` treats an open start (`-3`) as 1; `groups()` folds
  anything before the first numbered chapter into it (fine with 0); `teaser_limit`
  counts groups (limit 5 = ch. 0–4); docs and Makefile examples say `--range 1-5`.
  Check how each site numbers chapters ("Chương 0: …" in the title, or does the
  site number them itself?).
- **Story intro.** `crosspost info <site> --save` copies `story.tagline` and
  `story.intro` from `src/config.ts`. Once those are rewritten for v2, running it
  for a Legacy work would put the v2 intro there. Keep a per-edition intro or
  refuse `info` for Legacy.
- **Admin page** `/admin/crosspost` is hard-coded to rookies; an edition picker
  belongs next to the site picker.
- **Tests:** `tests/crosspost.test.ts`: v1 and v2 rows mixed in one list must
  never be numbered or queued together.

Done means: v1 posts untouched (same `remote_id`, no new jobs for them unless
the author asked for a footer re-sync), v2 chapters posting to the chosen
target, `npm test` green, and `npm run crosspost -- status <site>` showing both.

## Rough size

Migration and lib: half a day. Routes, shared component, home card: a day.
Admin, import/export, digest, crosspost pin and tests: half a day.
Whole-story comments: half a day.
