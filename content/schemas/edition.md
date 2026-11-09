---
id: SCH.edition
kind: schema
entity: edition
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, dir]
sources: [docs/framework/blueprints.md (10/11), src/config.ts editions]
---
# schema · edition

One edition of the story (`v1` Legacy, `v2` the main site). **Location:** `plans/ED.<edition>.md`. **Id:** `ED.v2`.

Header: `dir` (`content/posts/vercel`, as in `scripts/paths.mjs`), `current` (true for the one the site shows first, as in `src/config.ts`).

Section `posts`: table, one row per published chapter (schemas/chapter.md): `id` · `file` · `status` · `blueprint`. This is where `POST.*` ids are mapped to file names.
