---
id: SCH.belief
kind: schema
entity: belief
status: proposed
updated: 2026-11-10
required: [id, statement, axis, status]
aliases: [schema.belief]
sources: [kien-truc-framework.md §5]
---
# schema · belief

A belief (old `NT-`): a product of a past anchor, consumed by present events.

**Location:** inline in `world/characters/<id>/CH.<id>.beliefs.md` (one file, many beliefs). **Id:** `BL-NNN`, unique across the vault; heading `### BL-024` with block id `^BL-024`.

## Fields

| Field | Meaning |
| --- | --- |
| `statement` | one sentence, in the voice of the character who holds it |
| `other-face` | what makes it false or void |
| `axis` | the axis `AX` it runs on |
| `origin` | the past event that produced it (`[[PAST.T-031]]`) |
| `status` | `config/statuses.md` |

`consumed-by` is generated from events' `beliefs` field. A belief no event consumes is listed as *waiting*: a candidate for planning.

A belief shared by several characters still has **one** owning character; others `uses` it.
