---
id: SCH.proposal
kind: schema
entity: proposal
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, touches]
aliases: [schema.proposal]
sources: [kien-truc-framework.md §13.6]
---
# schema · proposal

An unapproved proposal (old `de-xuat/`). **Location:** `proposals/PROP-NNN.md`; once merged, `proposals/_merged/`. **Id:** `PROP-NNN`; old file names are aliases. Questions it raises are `Q-NNN`.

Header: `status` (`proposed` · `agreed` · `superseded`), `touches` (entities affected), `by` (session: arch, ROM, THR, PAST…).

Sections: `summary` (3 lines) · `options` (table: intervention level, gains, losses) · `recommendation` · `impact` (which earlier decisions change) · `questions` (new `Q-`).

Rule: a proposal is **never** a source of canon. When the author decides, the content goes into the target entities (with a `D-`), the file moves to `_merged/` and records `merged-into`.
