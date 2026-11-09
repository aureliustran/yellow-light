---
id: GUIDE.placement
kind: guide
status: draft
updated: 2026-11-10
sources: [docs/framework/model.md, ids.md, layout.md]
---
# Placement: where a new thing goes, and its id

Ask the questions in order; the first "yes" decides. Ids: `docs/framework/ids.md`. Fields: the kind's schema.

| # | Is it… | Goes to | Id |
| --- | --- | --- | --- |
| 1 | a decision the author just made | `canon/` decisions, then into the target entity | `D-NNN` |
| 2 | an open question or a conflict | `canon/` questions | `Q-NNN` |
| 3 | an idea or options not yet approved | `proposals/` | `PROP-NNN` |
| 4 | an invariant derived from an axis | `core/constitution/ART.<AX>.md` | `ART.<AX>.<k>` |
| 5 | something that must hold in some scope (pass/fail) | `rules/<aspect>/` | `LAW.<aspect>.<scope>` |
| 6 | only for one node or occasion | the node's or intersection's `rules` section | `<node>.R<n>` |
| 7 | how to write: a voice bundle | `lib/registers/` | `REG.<name>` |
| 8 | how to write: a method | `lib/<aspect>/` | `TEC.<aspect>.<name>` |
| 9 | how to write: the shape of a beat or scene | `lib/patterns/` | `PAT.<name>` |
| 10 | what a character *is* (identity, purpose, attribute and its value set, base voice) | the character package | `CH.<id>`, sections |
| 11 | how a character *works* (a mechanism with triggers) | `mechanics/` in the package | `FN.<id>.<name>` |
| 12 | a belief a character holds | `CH.<id>.beliefs.md` | `BL-NNN` |
| 13 | a group, place, object, secret | `world/groups/`, `settings/`, `objects/`, `secrets/` | `GRP.`, `SET.`, `OBJ-NNN`, `SEC-NNN` |
| 14 | a value of an attribute at a time, a relation state | the owner node (`state`, `relation`), never the character | — |
| 15 | something that happens | an event leaf under its node | `<node>-NNN` |
| 16 | an occasion several nodes share | `storylines/intersections/` | `X-NNN` |
| 17 | a goal of a thread | the node's `goals` | `<node>.G<n>` |
| 18 | how events combine into a chapter | `plans/chapters/` | `BP.<edition>.<nn>` |
| 19 | research, samples, raw material | `assets/` | `AST.<name>`, `SMP-NNN` |
| 20 | a check of written chapters | `audits/` | `AUD-NNN` |

## Before creating

- Search `symbols.md` and aliases first: the thing may exist under another name.
- One owner: if the value already has an owner, link to it instead of writing it again.
- A file name is its id; ids never change.

## Transitional

Follow the transitional table in `content/GUIDELINES.md`: events go to the old `tuyen/` tables; other kinds go to `content/de-xuat/` under their future file name.
