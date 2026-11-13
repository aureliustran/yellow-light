---
id: SCH.event
kind: schema
entity: event
status: proposed
updated: 2026-11-13
required: [id, kind, parent, status, updated, goal, event]
required-one-of: [date, span]
aliases: [SCH.event, schema.event]
sources:
  - "[[docs/framework/storylines|docs/framework/storylines.md (10/11)]]"
---
# schema · event

The **leaf** of a storyline tree: the unit that decides content (what must be written, when, for which goal, under which laws, how). See [storylines](../../docs/framework/storylines.md#event-the-leaf).

**Location:** a file inside the folder of its owner: a node (`storylines/…/<NODE>/<NODE>-NNN.md`, `storylines/ROM/ROM.TN/ROM.TN-014.md`) or an intersection (`storylines/intersections/X-NNN/X-NNN-NNN.md`). The event is the last level of entity: a file, never a folder. **Id:** `<owner>-NNN` (`ROM.TN-014`, `X-005-001`). **Owner** `proposed 11/11`: the node whose goal the event serves; if it serves no single node's goal, the intersection whose own goal it serves ([schema](intersection.md#ownership-of-events-proposed-1111)). Old event rows are migrated into leaves; the node's events table becomes a generated view.

## Declared part (frontmatter)

Only what is the event's own, plus explicit deviations from what it inherits.

| Field | Meaning | Required |
| --- | --- | --- |
| `parent` | the owning node or intersection | yes |
| `date` · `span` | day (`config/calendar.md`), or a stretch | one of them |
| `goal` | `serves [[<parent>.G<n>]]` + the event's own goal in one sentence | yes |
| `done-when` | observable end condition | when useful |
| `event` | what happens, one or two sentences | yes |
| `participants` · `place` | `[[CH.…]]` · `[[SET.…]]` | when not all of the node's |
| `calls` | the functions the action is built from, any number of `innate` functions and `method`s together: `[[FN.thuyen.phong-kin]](K1+K2+K4)` | when any |
| `must-show` · `must-hide` | what has to reach the page · what must not (`[[SEC-003]]`) | when any |
| `axis` | `AX1` | inside an existential band |
| `beliefs` | beliefs consumed or produced, with the stage when it matters: `[[B.thuyen-030]] (dien-giai)`. Replaces `level` (dropped with the scales, 13/11) | when any |
| `values` | values used to choose in this event: `[[V.thuyen-004]]` | when any; required in a PAST event |
| `outcome` | the result of the action | required in a PAST event |
| `reflect` | how the character reads the result, with which tool and inside which limit | required in a PAST event |
| `belief-out` | the belief the turn produces, with the operation: `new` · `upgrade` · `change` | required in a PAST event |
| `fuel` · `cost` | fuel (7 kinds, `core/shared-mechanics`) · price paid | from node level `S` up |
| `changes` | attributes, relations, secrets that change: `SEC-003: +[[CH.thuyen]]` | when any |
| `causes` | events in other nodes it causes | when any |
| `register` · `uses` | only when different from the style inherited from the owner node (13/11: the node carries it, the event rarely needs it): `[[REG.…]]` · `[[PAT.…]]`, `[[TEC.…]]` | optional |
| `phase` | `OPEN` … `POST`, when `date`/`span` does not make it plain; used to read the node's level and style per phase | optional |
| `override` | `[[LAW.…]]: reason` | optional |

**Loop fields** `locked 13/11`: `values` → `event` (the action) → `outcome` → `reflect` → `belief-out` are one turn of the loop ([[docs/framework/model|model]] *Axis → belief → value*). A PAST event runs the whole turn, because PAST exists to build beliefs. A present-time event needs only `values`; its turn may stay open. They apply to PAST as it is rewritten.

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
