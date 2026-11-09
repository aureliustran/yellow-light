---
id: SCH.blueprint
kind: schema
entity: blueprint
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, stage, edition, output, pov]
sources: [docs/framework/blueprints.md (10/11)]
---
# schema · blueprint

The plan of one chapter: how events combine into it. See [blueprints](../../docs/framework/blueprints.md).

**Location:** `plans/chapters/BP.<edition>.<nn>.md`. **Id:** `BP.v2.05`; scenes inline `BP.v2.05.S<n>`.

Header: `edition` (`[[ED.v2]]`), `output` (`POST.v2.05`), `pov`, `span`, `status` (decision status, `config/statuses.md`), `stage` (`planned` → `written` → `synced`), `synced-hash` (set on sync): `sha256:` + the first 16 hex digits of the SHA-256 of the chapter file with line endings normalised to LF (`node -e` or `sha256sum` after `tr -d "\r"`).

## Sections

| Section | Content |
| --- | --- |
| `scenes` | one heading per scene `S<n>`: `purpose` · `register` and transitions · `pattern` · `events` (each with role `shows`, `mentions`, `recalls`) · `writer` · `anchor` (first sentence, verbatim) |
| `in` · `out` | state at start and end (generated from `changes`) |
| `hooks` | what opens, what is left hanging |
| `gaps` | events on the page not yet in canon; differences from an earlier plan |

Generated: `_views/write-kit/BP.<edition>.<nn>.md`.

## Rules

1. The blueprint owns event ↔ chapter; events do not store their chapter.
2. Anchors must exist in the chapter (`LAW.check.bp-anchor`); a chapter changed after `synced` is reported (`LAW.check.bp-drift`).
3. Chapter text is never edited to fit a blueprint.
