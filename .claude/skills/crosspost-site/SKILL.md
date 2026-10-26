---
name: crosspost-site
description: Use when adding a new cross-posting site (Wattpad, etc.) to Đèn Vàng, or changing a site adapter, its config, convert.md, or the crosspost worker/core. Not for converting chapters (that is crosspost/sites/<site>/convert.md, see CLAUDE.md).
---

# Developing cross-posting sites

Cross-posting puts the first chapters of Đèn Vàng on other reading sites, each with
a footer that sends readers back to https://yellow-light.vercel.app. The Vercel
site is the source of truth; other sites are teasers. Read `README.md`
("Cross-posting") and the header comments of `crosspost/worker.mjs` before changing
anything.

## Map

| Path | What it is | Site-specific? |
|---|---|---|
| `crosspost/core/crosspost.ts` | Pure rules: teaser, ranges, titles, footer, text→HTML, states. Loaded by browser and Node, so **no imports, no Node APIs** | no |
| `crosspost/core/checks.ts` | Rejects conversions that changed the prose or left markup | no (see "Checks") |
| `crosspost/core/seal.ts` | Encrypted login handoff (RSA-OAEP + AES-GCM) | no |
| `crosspost/core/data.mjs` | Supabase access, `siteConfig(site)` reads `sites/<site>/config.json` | no |
| `crosspost/cli.mjs`, `crosspost/worker.mjs` | Commands and the posting loop; load `sites/<site>/adapter.mjs` dynamically | no |
| `crosspost/sites/<site>/config.json` | Name, footer templates, foreword, site options | **yes** |
| `crosspost/sites/<site>/adapter.mjs` | Everything that depends on the site's pages | **yes** |
| `crosspost/sites/<site>/convert.md` | Conversion rules Claude follows | **yes** |
| `supabase/migrations/0005_*.sql`, `0006_*.sql` | Tables, RLS, enqueue/claim/cancel functions | row per site |
| `src/pages/admin/crosspost.astro`, `src/scripts/crosspost-admin.ts` | Admin UI | currently hard-coded to rookies |
| `tests/crosspost.test.ts` | `npm test` | add cases |

**Editions (v1 Legacy / v2):** cross-posting is pinned to v1 until the v2
crosspost work. Before changing anything here, read "Cross-posting handoff" in
`docs/plan-legacy.md`.

Rule of thumb: if the code would change when the site redesigns its pages, it
belongs in `adapter.mjs`. If it would change when the story changes, it belongs
in core. Never put site quirks in core.

## Adding a site: checklist

1. **Explore by hand first** (built-in browser, the author signed in themselves;
   never type passwords). Write down: create-chapter URL and form, title field,
   editor type (TinyMCE? contenteditable? textarea?), save/publish controls and
   any confirm dialog, the author's chapter list (TOC) URL and how ids appear in
   links, what the editor keeps on save (paragraphs, line breaks, italic/bold,
   `<a>` links, emoji), how sign-out looks, rate limits, bot protection, and
   whether the site needs a VPN or proxy. Test on a draft only; publishing
   anything needs the author's explicit yes.
2. **`sites/<site>/config.json`** — copy rookies and change:
   - `site` (slug, `^[a-z0-9]+(-[a-z0-9]+)*$`), `name`, `vercelUrl`
   - `footer.next` / `footer.last` / `footer.home`: Vietnamese unless the site's
     audience isn't; `[label](url)` becomes a real `<a>` only if the site keeps
     links (if not, use plain URLs and drop the link check in `verify`)
   - `foreword` (optional, `{ "title": ... }`): a handwritten chapter on the
     site. The worker only notices it, never syncs, adopts or blocks on it
   - `remoteViewUrl`, and a key named after the site for adapter options
     (story id/slug, delays, menu labels, proxy)
3. **`sites/<site>/adapter.mjs`** — implement the contract below.
4. **`sites/<site>/convert.md`** — start from rookies' file; rewrite "What the
   site can show" from step 1, and the per-block rules accordingly. Keep the
   workflow and "change markup only" sections word for word.
5. **Database** — a new migration (never edit applied ones) inserting the
   `crosspost_sites` row: `insert into public.crosspost_sites (site, name, teaser_limit, default_mode) values (...)`.
   The author runs it in Supabase → SQL Editor; say so.
6. **Wire-up** — add the site to: `SITES` in `Makefile`; `story.crossposts` in
   `src/config.ts` only once the story is public there; a
   `crosspost:worker:<site>` script in `package.json` if wanted; the admin page
   (today `SITE = 'rookies'` in `crosspost-admin.ts`: make it a site switcher
   before adding the second site, do not copy the page).
7. **Tests and checks** — `npm test`, `npx tsc --noEmit`; dry run the adapter on
   a draft with `npm run crosspost -- worker <site> --once` after queueing one
   chapter as draft. Report what was and wasn't tested against the live site.
8. **Docs** — README section, and this skill if the contract changed.

## Adapter contract

```js
export async function open(cfg, { profileDir, headless }) → session
session.signedIn()                    → boolean
session.loginWithPassword(user, pass) → void (throws on failure)
session.listRemote()                  → [{ id, title, url, status: 'draft'|'published' }] in TOC order
session.create(post)                  → { id, url }   // must verify before returning
session.update(id, post)              → { id, url }   // must verify before returning
session.close()
// optional: session.workStatus() → string, session.syncInfo({ tagline, intro[] }, { save }) → { changed, current, wanted }
// post = { title, html, plain, mode: 'publish' | 'draft' }
```

- Use a persistent Playwright profile in `profileDir` (`crosspost/.profile/`,
  gitignored) so sign-ins survive. Prefer the user's Chrome channel; fall back
  to bundled Chromium.
- When the site has signed the worker out, throw an error with
  `e.code = 'SIGNED_OUT'`. The worker then pauses and jobs wait; any other
  error fails the job.
- `listRemote()` must return **every** chapter of the story, drafts included,
  in the site's order. Reconciliation depends on it.
- `create`/`update` must **read back** what the site saved (title, text
  compared with `post.plain` whitespace-collapsed, and each footer `href`) and
  throw if it differs. Never report success on a timeout alone.
- Keep selectors in one `SEL` object at the top; prefer role/text/placeholder
  selectors over generated class names. Re-query after every re-render.
- Never type or log passwords except via `loginWithPassword`, whose input comes
  only from the encrypted handoff or the author.
- A VPN-only site: give the browser a proxy (`launchPersistentContext({ proxy })`
  from config) rather than requiring a system VPN.

## Anti-duplicate layers (never remove one)

1. A chapter with a `remote_id` is only ever updated.
2. Before creating, `listRemote()` and adopt a chapter with the same normalized
   title (foreword excluded); two matches → stop and ask the author.
3. `pending_since` is set just before submitting; cleared when the id is saved.
4. DB: PK `(site, chapter_id)`, unique `remote_id`, one open job per chapter,
   `skip locked` claiming.
5. Read-back verification after every save.
6. Ordering: never create a chapter while an earlier eligible one is unposted.

A change that weakens any of these needs the author's explicit agreement.

## Links

`linksAllowed: false` in a site's config means no URL may reach that site:
`footerLines` uses `footer.noLinks` (plain lines, may be empty → no footer at all)
and throws on a link there; adapters must also refuse links. Use it for curated
sites until their editors approve links by hand (truyennhaong).

## Checks

`checks.ts` is shared and currently strict for every site (rejects emoji, HTML,
links, `:::`, `[[en:`, headings). If a new site *can* show something (e.g.
Wattpad keeps emoji), make that check depend on an option in the site's
config; don't loosen it globally, and keep the prose-unchanged check
unconditional. Per-site options live in `config.json` → `checks`
(`noDashLines`, `lint.maxPerThousand` = the site's own save-time lint).

## Hashes and states

`sourceHash` changes when the Vercel chapter changes (→ "outdated", needs a new
conversion); `postedHash` covers title + converted text + footer (→ "update").
Changing footer templates or title format therefore marks every posted chapter
for update. Say so when you do it.

## Working rules

- The repo may have another Claude session's uncommitted work. Commit only
  your files (temp index + `git commit-tree` when the real index has others'
  staged changes), never stage or revert theirs.
- Nothing is published, posted or queued without the author asking.
- Vietnamese for all reader-facing text (footers, admin UI, worker messages).
