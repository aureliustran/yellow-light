---
id: SCH.intersection
kind: schema
entity: intersection
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, parent, time]
aliases: [schema.intersection]
sources: [kien-truc-framework.md §8.3]
---
# schema · intersection

An **occasion** several nodes write into: a hyperedge, not a node. It sits outside the node tree and has its own tree (spans contain occasions). See [storylines](../../docs/framework/storylines.md#intersections).

**Location:** `storylines/intersections/X-NNN.md`. **Id:** `X-NNN`. Beats are inline ids `X-NNN.B<n>` (generated).

## Stored: the head only

| Field | Meaning |
| --- | --- |
| `type` | `event` (one happening) · `span` (a stretch containing events) · `info` (a knowledge occasion: who learns what) |
| `parent` | parent intersection or `none` |
| `time` | date or date range |
| `place` | `[[SET.…]]` |
| `override` | laws or register for this occasion only, with a reason |
| `open` | open questions (`Q-`) |

## Everything else is generated (`_views/X-NNN.view.md`)

Participating nodes · beat table (events with `x: X-NNN`, sorted by `beat`) · **beat holder** (node with an event in the beat and the highest level; on a tie, the owning node) · POV · register · level of the occasion · who knows what before and after (from `changes` on `SEC-`) · outcome.

## Rules

1. An intersection **holds no events**; events live in their own node and point to it with `x` and `beat` (`LAW.check.x-consistency`).
2. Causality across nodes is the event's `causes`, not an intersection.
3. Nodes never point at each other directly; they meet only at intersections.
4. An occasion's level is not below the highest level of its events in that phase, unless `override` says why.
