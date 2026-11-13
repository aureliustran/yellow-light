---
id: SCH.pattern
kind: schema
entity: pattern
status: dropped
updated: 2026-11-10
required: [id, kind, status, updated, serves]
sources:
  - "[[docs/framework/library|docs/framework/library.md (10/11)]]"
---
# schema · pattern

**Bỏ 13/11** (tác giả): gộp vào kind `style` ([[schemas/style|schemas/style.md]]).

The shape of a beat or a scene (e.g. anchor in five steps, twist in five steps, inference beat, emotion chain of eight links). See [library](../../docs/framework/library.md).

**Location:** `lib/patterns/PAT.<name>.md`. **Id:** `PAT.<name>`; beats inline `PAT.<name>.B<n>`.

Header: `serves` (laws or registers), optional `applies-to`, `effective`.

## Sections

| Section | Content |
| --- | --- |
| `beats` | ordered beats, each a heading `B<n>` with what happens in it |
| `slots` | table: beat → register, techniques it calls |
| `fails` | common failures |
| `samples` | links to samples |

Rule: a pattern is used by an event (`uses`) or a blueprint scene (`pattern`); it never carries story facts.
