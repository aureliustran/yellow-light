# Plan: old story becomes "Bản cũ", v2 comes first

Oct 20, 2026. Development plan, not built yet.

## Goal

The v2 rewrite (`docs/00-quyet-dinh-v2.md`: "Toàn bộ truyện viết lại") goes on the
site as *the* story. The current 60-odd chapters and interludes stay readable as
**Bản cũ** (legacy edition), with their comments, ratings and read counts intact,
but they no longer sit on the home page, in "Đọc từ đầu" or in "Mới nhất".

Readers should see:

- Home: hero, blurb, stats and **Mục lục** are v2 only. Below the TOC, a quiet
  "Bản cũ" card: one line on what it is ("Bản viết đầu tiên, 2026, đã dừng ở
  chương 39"), chapter count, and a link to `/ban-cu`.
- `/ban-cu`: the old TOC exactly as today's home TOC, under a banner saying this
  edition is finished and replaced.
- An old chapter page: a thin banner at the top ("Bạn đang đọc bản cũ. Bản mới →"),
  prev/next stay inside the old edition, numbering stays as it is today.

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
- `get_story_stats()` → takes `p_edition text default 'v2'`. Story rating
  (`story_ratings`) stays one rating for the work; decide below whether to reset it.
- RLS does not change: an old chapter stays public because it is published.

Which edition is current lives in code, not the database:

```ts
// src/config.ts
export const editions = {
  current: 'v2',
  legacy: { id: 'v1', name: 'Bản cũ', path: '/ban-cu', note: 'Bản viết đầu tiên…' },
};
```

### URLs

Old chapters move to **`/ban-cu/<slug>`**. `/doc/<slug>` becomes v2 only.

`/doc/<slug>` lookup order: v2 chapter with that slug → render it; otherwise a v1
chapter with that slug → **301 to `/ban-cu/<slug>`**; otherwise 404. This keeps
every link already out there (rookies.vn footers, shares, Google) working until v2
reuses a slug, e.g. `den-vang` for the new chapter 1. When v2 takes a slug, the
old link opens the new chapter, which is the intended behaviour for a rewrite.

### Code changes

1. `src/lib/chapters.ts`: `getPublishedChapters(edition = current)` adds
   `.eq('edition', edition)`; `getChapterPage(slug, edition)`; new
   `findLegacySlug(slug)` for the redirect. `LIST_COLUMNS` gains `edition`.
2. `src/lib/chapters-shared.ts`: `ChapterRow.edition`; `withNumbers` unchanged
   (it is called per edition, so numbering restarts at 1 for v2 and old numbers stay).
3. Extract the TOC `<ol class="lane">` from `index.astro` into
   `src/components/Toc.astro` (props: chapters, base path).
4. `src/pages/index.astro`: v2 list; add the "Bản cũ" card after the TOC. With no
   v2 chapter published yet: "Chương đầu tiên sắp lên đèn…" plus the card, so the
   switch can happen before v2 ch. 1 is out.
5. `src/pages/ban-cu/index.astro` and `src/pages/ban-cu/[slug].astro`. Move the
   chapter page body of `doc/[slug].astro` into `src/components/ChapterPage.astro`
   so both routes share it; it takes `basePath` for prev/next/TOC links and
   `legacy` for the banner.
6. `src/scripts/home.ts`: `dv:last` stores `path` instead of `slug` (read both;
   old entries have only `slug`, which still works through the redirect). If the
   last chapter read is legacy, label it "Đọc tiếp bản cũ · Chương N".
7. `src/scripts/reader.ts`/`stats.ts`: `get_story_stats` call passes the edition.
8. `src/pages/sitemap.xml.ts`: v2 under `/doc/`, legacy under `/ban-cu/`.
9. Admin (`src/scripts/admin.ts`, `src/pages/admin/index.astro`): an edition
   switch above the list (default v2); new chapter gets the selected edition;
   reorder passes it. Stats/comments/ratings pages show the edition next to the
   chapter name.
10. `scripts/import-chapters.mjs`: `--edition v1|v2` (default v2), matching and
    `--reorder` inside that edition. New v2 files in `content/v2/`; move the
    current `content/import/` to `content/v1/` (Makefile and README updated).
11. `scripts/export-chapters.mjs`: write `backup/chapters/v1/` and `backup/chapters/v2/`.
12. `scripts/digest-lib.mjs`: prefix legacy chapter names with "Bản cũ ·".
13. Crosspost (`crosspost/core/data.mjs`, `crosspost-admin.ts`, cli): only the
    current edition by default; `--edition v1` to keep managing old posts.
    The anti-duplicate keys (`site, chapter_id`) stay as they are; v2 chapters
    are new ids so they never collide with v1 posts. Read
    `.claude/skills/crosspost-site/SKILL.md` before touching this.
14. `src/config.ts`: v2 blurb, intro, tagline, tags, status.
15. Tests: `withNumbers` per edition, `/doc` redirect lookup, import `--edition`,
    crosspost list filter.

## Rollout order

Each step deploys alone and changes nothing visible until step 4.

1. Migration 0008 (all rows become `v1`). Code from steps 1–2, 9–11 reads
   `edition` but the home page still shows v1 as current (`current: 'v1'`).
2. `/ban-cu` routes and the shared chapter component; check every old chapter
   opens there with comments, ratings and views.
3. Import v2 chapters as **drafts** with `--edition v2`; preview in admin.
4. Switch `editions.current` to `'v2'`, publish v2 ch. 1 (or schedule it).
   From here `/doc/<old slug>` redirects.
5. Crosspost decisions (below), then config texts on other sites.

Rollback at any point before 4: nothing reader-facing changed. After 4: set
`current` back to `'v1'` and redeploy.

## Decisions for the author

1. **Comments on Bản cũ:** keep open, or read-only (old comments visible, no new
   ones)? Read-only needs one RLS change: `chapter_is_public` stays, comment insert
   also checks `edition = current`.
2. **Story rating** (`story_ratings`): carry over to v2, or start fresh and show
   the old score on `/ban-cu`?
3. **Total views** on the home page: v2 only, or both editions together?
4. **rookies.vn / truyennhaong:** leave the old chapters there, replace them
   chapter by chapter with v2, or open v2 as a new work? This decides whether
   crosspost needs a "replace remote chapter" mode.
5. **Search engines:** index old chapters, or `noindex` them so Google sends
   readers to v2?
6. **Name** on the site: "Bản cũ", "Bản đầu", or "Lưu trữ"?

## Rough size

Migration and lib: half a day. Routes, shared component, home card: a day.
Admin, import/export, digest: half a day. Crosspost filter and tests: half a day.
