# Đèn Vàng – notes for Claude

## Cross-posting conversions (rookies.vn and other sites)

When asked to convert chapters for another site ("chuyển chương 1–5 cho rookies",
"convert chapter 12 for rookies", "làm bản đăng chéo"), follow
`crosspost/sites/<site>/convert.md` exactly. That file is the only source of the
conversion rules; do not rely on memory of it, read it every time.

Workflow (run from the repo root; needs `.env` with the Supabase service key):

1. `npm run crosspost -- pull <site> --range 1-5` (or `--all`, `--only slug,slug`, `--force`).
   It writes `crosspost/work/<site>/<file>.source.md` for each chapter that needs a
   new conversion, and prints the output path for each.
2. For each source file: read the whole file, then write the converted body to
   `crosspost/out/<site>/<same name>.txt`. One chapter at a time; never from a summary.
3. `npm run crosspost -- check <site>`. Fix every reported problem in the `.txt`
   (never by editing the source), and re-run until every chapter shows ✓.
4. `npm run crosspost -- check <site> --save` to store them in Supabase.
5. Tell the author which chapters are ready, and that they can sync them in
   `/admin/crosspost`. Do not queue or post anything unless asked.

Hard rules:

- Change markup only. Every word, spelling, slang, swear word, punctuation mark and
  the order of paragraphs stay exactly as in the source. No typo fixes, no
  translation, no summaries, no added commentary.
- Never write the chapter title, the date line, the footer or any link: code adds them.
- A new emoji gets one replacement, added to the table in `convert.md` in the same change.
- If the checker rejects something you believe is right, report it instead of
  rewording the story to get past it.

## Developing cross-posting (new sites, adapters, worker)

Use the `crosspost-site` skill (`.claude/skills/crosspost-site/SKILL.md`): file map,
checklist for a new site, adapter contract, and the anti-duplicate layers that must stay.

## Story docs (canon, plans, rules)

- Start at `docs/README.md`. The repo is the source of truth; the claude.ai Project
  "Đèn Vàng" is a selective mirror at the same paths (`docs/kien-truc.md` §3).
- After changing any doc the Project mirrors (`docs/README.md`, `kien-truc.md`,
  `quy-trinh.md`, `docs/canon/*`, `docs/tuyen/*`, `docs/rules/*`, `docs/de-xuat/*`),
  upload the changed files to the Project at the same path.
- Chat-only sessions write to `claude/inbox/` on the Project; the next session with the
  repo merges the inbox into `docs/` and deletes it.
- Legacy notes that only lived on the Project are archived in
  `docs/kho/legacy/project/` (same paths as on the Project). Do not re-upload them.
- Draft chapters still being worked on: `docs/ke-hoach/ban-nhap/`. Published v2
  chapters: `content/v2/`. Legacy chapters: `content/import/`.

## Site (Astro + Supabase on Vercel)

- Import chapters: `npm run import -- --overwrite --reorder` (a dry run does not
  query the DB).
- Chapter markup blocks: `:::phone`, `:::notifications`, `[[en: … || …]]`, `[[ht: …]]`.
- Pages are cached for 30 s plus stale-while-revalidate 300 s.
- Before committing: `npx astro check`, `npm test`, `npm run build`. Build in a clean
  copy with `.env.example`; never copy `.env`.
- On the author's Windows-mounted folder git leaves lock files; use `git commit -o`.
- Product decisions: Google-only login, reading open to all; comments are anonymous
  numbered readers with a default avatar and a name they can change; comments go live
  at once and admin moderates afterwards (daily alert digest); no Hà Tĩnh footnote
  section (the site has the translator); the Vercel site is the main version and
  cross-posted copies carry a note; no external URLs on truyennhaong.vn until its
  editors approve; skill names in English.
