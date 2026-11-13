---
id: SCH.style
kind: schema
entity: style
status: locked
updated: 2026-11-13
required: [id, kind, grain, status, updated, force, applies-to]
aliases: [schema.style, SCH.register, SCH.technique, SCH.pattern]
sources:
  - "tác giả 13/11 (gộp register, technique, pattern; style mặc định; fallback theo tuyến, node)"
  - "[[docs/framework/library|docs/framework/library.md]]"
---
# schema · style

A style answers **how to write** `locked 13/11`. Register (văn phong), technique (kỹ thuật) and pattern (khuôn beat) are one kind, `style`, told apart by `grain`. What may or may not be written is a law ([schema](law.md)). See [library](../../docs/framework/library.md).

| `grain` | Id | Location | Level | Was |
| --- | --- | --- | --- | --- |
| `bundle` | `REG.<name>`, alias `R0`–`R10` | `lib/registers/` | a scene or a beat: a voice bundle | `schemas/register.md` |
| `shape` | `PAT.<name>`, beats `PAT.<name>.B<n>` | `lib/patterns/` | the shape of a beat or a scene | `schemas/pattern.md` |
| `move` | `TEC.<aspect>.<name>`, steps `.S<n>` | `lib/<aspect>/` | a sentence or paragraph method | `schemas/technique.md` |

## Header

| Field | Meaning |
| --- | --- |
| `grain` | `bundle` · `shape` · `move` |
| `force` | `bat-buoc`: always on, in every register including R0; only `except` with a reason loosens it · `mac-dinh`: on unless the register in force `forbids` it · `tuy-chon`: on only when a storyline, node or event names it |
| `applies-to` · `effective` | selector and phases (law selector syntax); `*` = everywhere |
| `uses` · `forbids` | `bundle`, `shape`: the moves it calls or forbids |
| `use-when` | constraint on when it may be chosen (R0: low-level nodes only) |
| `aspect` | `move` only: the folder name |
| `check` | `human` · `machine` |

## Sections

| Grain | Sections |
| --- | --- |
| `bundle` | `markers` · `dose` (per phase) · `transitions` (to `[[REG.…]]`, allowed, forbidden, how) · `samples` |
| `shape` | `beats` (`B<n>`) · `slots` (beat → register, moves) · `fails` · `samples` |
| `move` | `steps` · `dials` · `fails` · `samples` |

## Rules

1. A style never contains story facts; it reads them from `world/` and the node.
2. A bundle uses or forbids moves; it does not restate them. A bundle cannot forbid a `bat-buoc` move.
3. Which style a storyline, node or event uses is chosen there (`style`), never here.
4. A style is not promoted to a law. A form that must always hold is a `move` with `force: bat-buoc` in [[STY.default]] `locked 13/11`.
