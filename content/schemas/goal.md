---
id: SCH.goal
kind: schema
entity: goal
status: proposed
updated: 2026-11-10
required: [id, statement, serves]
sources:
  - "[[docs/framework/storylines|docs/framework/storylines.md (10/11)]]"
---
# schema · goal

A goal of a node, decomposed down the tree. See [storylines](../../docs/framework/storylines.md#node).

**Location:** inline in the node file, section `goals`, heading `### <node>.G<n>` with block id `^G<n>`. **Id:** `<node>.G<n>` (`ROM.TN.G2`).

| Field | Meaning |
| --- | --- |
| `statement` | one sentence, Vietnamese |
| `serves` | a goal of the parent node; for a storyline, an axis `AX` |
| `phase` | phases in which it is pursued |
| `done-when` | observable condition |

Generated: `served-by` (child goals and events), coverage gaps (`LAW.check.goal-coverage`).
