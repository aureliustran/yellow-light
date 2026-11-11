---
id: SCH.character
kind: schema
entity: character
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, aliases, exports]
aliases: [schema.character]
sources: [kien-truc-framework.md §5]
---
# schema · character

A **static** entity (dimension table). Values over time live in nodes (`storylines/`), not here.

**Location:** `world/characters/<id>/` (a package). **Id:** `CH.<id>`. Crowd characters are rows in the `members` section of the node that owns them (e.g. `SOL.HD`) and have no package.

## Package

```
world/characters/<id>/
├── CH.<id>.md                 main file
├── CH.<id>.beliefs.md         BL-NNN (schemas/belief.md)
├── CH.<id>.voice.md           base voice: dialogue · narration (when POV) · lexicon · forbidden
└── mechanics/
    ├── CH.<id>.mechanics.md   signature of every function, one line each
    └── FN.<id>.<name>.md      one function per file (schemas/function.md)
```

Generated: `_views/CH.<id>.view.md` (cross-section per phase, from all nodes).

## Main file sections

Empty sections are written `none`, never omitted.

| Section | Content |
| --- | --- |
| `identity` | who, where, when: birth, hometown, job, appearance, body. **Defines the character directly.** |
| `purpose` | why the character is in the story; which axes it serves (`Need → AX`) |
| `rules` | the character's own hard limits. Link to `rules/` only for laws that apply to several people |
| `attributes` | dynamic attributes, each with its value set, e.g. `cai-toi-doc ∈ {ngu, thuc-co-dieu-kien, phong-kin-hong, chiem-cho}`, and its `owner` node. Names and value sets only |
| `record` | credentials with the date each was obtained: schools, awards, positions, jobs, certificates. Each row: what, when, level or result, status, and the event that shows it (a link once the event exists). The scene belongs to the event; the credential is part of who the character is |
| `exports` | ids other files may import: functions, beliefs, attributes |

Every file in the package opens with a head of about 20 lines: header, one-sentence summary, key index.

## Rules

1. Identity lives in the main file only.
2. Each dynamic attribute has **exactly one owner node** (`LAW.check.owner`), named in the attribute's `owner`.
3. Every character package has the **same** file names and section order.
4. No dated events except the dates of credentials in `record`. Scenes and changes over time belong to their node.
