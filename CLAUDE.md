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
