---
id: SCH.occasion
kind: schema
entity: occasion
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, parent, time]
aliases: [schema.occasion]
sources: [schemas/intersection.md (tách 10/11)]
---
# schema · occasion

One **meeting** of the nodes of an [intersection](intersection.md): the unit events join with `x` and `beat`. Like an event, it is the last level: always a file, never a folder.

**Location:** a file inside its intersection's folder: `storylines/intersections/X.<key>/X.<key>-NNN.md`. **Id:** `X.<key>-NNN`, numbered in order of appearance within that intersection. Old global codes (`X-005`, `X-05`) are kept as aliases. Beats are inline ids `X.<key>-NNN.B<n>` (generated).

## Stored: the head only

| Field | Meaning |
| --- | --- |
| `type` | `event` (one happening) · `span` (a stretch containing occasions) · `info` (a knowledge occasion: who learns what) |
| `parent` | parent occasion (a `span`) or `none` |
| `time` | date or date range |
| `place` | `[[SET.…]]` |
| `override` | laws or register for this occasion only, with a reason |
| `open` | open questions (`Q-`) |

## Everything else is generated (`_views/<id>.view.md`)

Participating nodes · beat table (events with `x: <id>`, sorted by `beat`) · **beat holder** (node with an event in the beat and the highest level; on a tie, the owning node) · POV · register · level of the occasion · who knows what before and after (from `changes` on `SEC-`) · outcome.

## Rules

1. An occasion **holds no events**; events live in their own node and point to it with `x` and `beat` (`LAW.check.x-consistency`).
2. Causality across nodes is the event's `causes`, not an occasion.
3. An occasion's level is not below the highest level of its events in that phase, unless `override` says why.
