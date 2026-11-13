---
id: GUIDE.invariants
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "docs/framework/*"
  - "CLAUDE.md"
  - "[[quy-trinh|quy-trinh.md §5]]"
---
# Invariants

Rules that always hold. Machine-checked ones name their check (`docs/framework/tooling.md`); the rest are checked by you before saying "done".

| # | Invariant | Check |
| --- | --- | --- |
| 1 | The author decides canon; agents propose | human |
| 2 | Every value has one owner; elsewhere, link by id | `LAW.check.owner` |
| 3 | Every entity has a valid, unique id; no two ids differ only by case | `LAW.check.id-grammar`, `unique-id` |
| 4 | Ids never change; renames add aliases | `LAW.check.id-immutable` |
| 5 | Every link resolves | `LAW.check.resolve` |
| 6 | Every entity has the header fields its schema requires, and a valid status | `LAW.check.schema`, `status` |
| 7 | References follow the layer direction (dynamic → static, never the reverse) | `LAW.check.layer` |
| 8 | Generated content is never edited by hand (`_views/`, `symbols.md`, `<!-- SINH -->` blocks) | `LAW.check.resolved-fresh` |
| 9 | Every law has a basis; overlapping laws have an order; overrides have a reason | `LAW.check.basis`, `overlap`, `override-reason` |
| 10 | Every technique serves a law or register, within its scope | `LAW.check.lib-basis`, `lib-scope` |
| 11 | An event's goal serves a goal of its parent | `LAW.check.goal-chain` |
| 12a | New events agree with published chapters; a clash is a `Q-` | human |
| 12 | Published chapter text changes only in a writing task that asks for it; never to fit canon or a blueprint | human, `LAW.check.bp-drift` |
| 13 | Chapter files get no frontmatter or markers (the importer reads them as they are) | human |
| 14 | Story text in Vietnamese; conventions, fields and framework docs in English | human |
| 15 | Weekdays are computed, never guessed | `LAW.check.weekday` |
| 16 | No secret is used in a scene by someone who does not know it yet | `LAW.check.secret-leak` |
| 17 | Never `git push`; never post or queue cross-posts unless asked | human |
| 18 | `npm run canon:check` passes with no new errors before "done" | the run itself |

Checks marked planned in `tooling.md` are not automated yet: verify those by reading.
