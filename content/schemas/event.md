---
id: SCH.event
kind: schema
entity: event
status: proposed
updated: 2026-11-10
required: [id, kind, parent, status, updated, goal, event]
required-one-of: [date, span]
aliases: [schema.event]
sources: [docs/framework/storylines.md (10/11)]
---
# schema · event

The **leaf** of a storyline tree: the unit that decides content (what must be written, when, for which goal, under which laws, how). See [storylines](../../docs/framework/storylines.md#event-the-leaf).

**Location:** a file inside the folder of its node: `storylines/…/<NODE>/<NODE>-NNN.md` (`storylines/ROM/ROM.TN/ROM.TN-014.md`). The event is the last level of entity: a file, never a folder. **Id:** `<node>-NNN` (`ROM.TN-014`). Old event rows are migrated into leaves; the node's events table becomes a generated view.

## Declared part (frontmatter)

Only what is the event's own, plus explicit deviations from what it inherits.

| Field | Meaning | Required |
| --- | --- | --- |
| `parent` | the node | yes |
| `date` · `span` | day (`config/calendar.md`), or a stretch | one of them |
| `goal` | `serves [[<parent>.G<n>]]` + the event's own goal in one sentence | yes |
| `done-when` | observable end condition | when useful |
| `event` | what happens, one or two sentences | yes |
| `participants` · `place` | `[[CH.…]]` · `[[SET.…]]` | when not all of the node's |
| `calls` | functions called: `[[FN.thuyen.phong-kin]](K1+K2+K4)` | when any |
| `must-show` · `must-hide` | what has to reach the page · what must not (`[[SEC-003]]`) | when any |
| `axis` · `level` | `AX1` · step with its scale: `EXL 5`, `SCALE.pride 3` (default scale EXL) | inside an existential band |
| `beliefs` | `BL-` consumed or produced | when any |
| `fuel` · `cost` | fuel (7 kinds, `core/shared-mechanics`) · price paid | from node level `S` up |
| `x` · `beat` | occasion and order in it: `[[X.PAST.T+ROM.PN+ROM.TN-001]]` · `2` (an occasion, [schema](occasion.md)) | when part of one |
| `changes` | attributes, relations, secrets that change: `SEC-003: +[[CH.thuyen]]` | when any |
| `causes` | events in other nodes it causes | when any |
| `register` · `uses` | only when different from the inherited one: `[[REG.…]]` · `[[PAT.…]]`, `[[TEC.…]]` | optional |
| `override` | `[[LAW.…]]: reason` | optional |

No `chapter` field: the blueprint owns event ↔ chapter.

Body: a few lines of free notes. Then the resolved block.

## Resolved part (generated)

At the end of the file, between `<!-- SINH -->` and `<!-- /SINH -->`, written by `canon:check`: `path`, `phase` and ages, `goal-chain`, `state-in`, `laws`, `register` (with where it came from), `voices`, `how` (patterns and techniques in force), `appears` (blueprint, scene, role). Never edited by hand (`LAW.check.resolved-fresh`).

## Rules

1. Exactly one parent node; other nodes refer to the event by id only.
2. Goal serves a goal of its own parent (`LAW.check.goal-chain`).
3. Every event has a `status`; a `locked` event has a date or span.
4. An override without a reason, or of an article, is an error (`LAW.check.override-reason`).
5. In generated tables, wikilinks never use aliases `[[a|b]]` (`LAW.check.table-pipe`).
