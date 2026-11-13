---
id: SCH.value
kind: schema
entity: value
status: agreed
updated: 2026-11-13
required: [id, statement, from, status]
aliases: [schema.value, SCH.values]
sources:
  - "tác giả 13/11 (trục → niềm tin → value system; vòng vận hành; ranh giới)"
  - "[[docs/framework/model|docs/framework/model.md]]"
---
# schema · value

A value is one **criterion a character chooses by**: what is worth something to the character, and how much. A character's values together are its **value system**: the world view formed from its beliefs. A value is used **outward**, whenever the character deals with the world or with other people: solving a problem, making a decision, treating someone.

A value is **not** a belief. A belief is a claim drawn after a result and can be false; a value is a comparison used before an action and can only be costly or in conflict. Boundary, three tests and rules: [[docs/framework/model|model]] *Axis → belief → value*.

**Location:** inline in `world/characters/<id>/CH.<id>.values.md` (one file, one value system). **Id:** `V.<character id>-<NNN>`, numbered within the character; heading `### V.thuyen-001`, link `[[CH.thuyen.values#V.thuyen-001]]`.

## File sections

| Section | Content |
| --- | --- |
| `system` | the system in one paragraph: what machine these criteria make together |
| `measure` | what the character measures worth with (its ruler or scale) |
| `blind` | what the system cannot see or question; the limit of the character's reflection |
| `values` | the criteria, one `### V.<id>-NNN` each |
| `rank` | order between criteria when they collide |
| `gaps` | what is not decided |

## Fields of a value

| Field | Meaning |
| --- | --- |
| `statement` | the criterion, as a comparison or a rule of choice |
| `from` | the beliefs it is formed from (required, at least one `[[CH.<id>.beliefs#B.<id>-NNN]]`) |
| `applies` | the kinds of situation it is used in; per phase when it changes |
| `tactics` | habits of action that apply it (old "mẹo") |
| `cost` | what choosing by it costs |
| `status` | `config/statuses.md` |

`axes` is generated: the union of the axes of the beliefs in `from`.

## Rules

1. One value system per character, with few criteria.
2. `from` is required; a belief never links back (`LAW.check.value-from`, `LAW.check.belief-value`).
3. A value has no history of its own. It changes only when a belief in `from` changes; per-phase differences are written in `applies`.
4. On the page a value shows as a choice or behaviour, not as a thought. The reason the character gives may be wrong when a source belief is blind.
5. An event names the values used in its `values` field (`schemas/event.md`).
