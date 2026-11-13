---
id: SCH.info
kind: schema
entity: info
status: locked
updated: 2026-11-13
required: [id, kind, level, domain, status, updated]
aliases: [schema.info]
sources:
  - "tác giả 13/11 (info theo domain, node và leaf; INFO.humor, INFO.humor.meme, INFO.economics; valid chỉ cảnh báo lúc viết)"
---
# schema · info

Info is **real-world knowledge** the story uses: memes and slang, economics, technology, places as they are in reality `locked 13/11`. It answers "what exists in the real world, since when, and who would know it". Story facts are not info (they live in `world/` and `storylines/`); how to write is style; what may be written is law.

**Location:** `content/info/<domain>/`. **Id:** `INFO.<domain>` (node, one per domain) · `INFO.<domain>.<topic>` (leaf) · items inline in a leaf: `INFO.<domain>.<topic>.<item>`, written as `### <item>` under `## items`, linked as `[[INFO.<domain>.<topic>#<item>]]`. **Layer:** L2, beside `world/` (static): it may reference L0–L1.5 and characters; storylines and plans reference it.

## Header

| Field | Level | Meaning |
| --- | --- | --- |
| `level` | all | `node` · `leaf` |
| `domain` | all | folder name: `humor`, `economics`, … |
| `parent` | leaf | `[[INFO.<domain>]]` |
| `style` | node | registers and styles in whose scenes this knowledge is used (`[[REG.…]]`, `[[TEC.…]]`); drives the info suggestion in the event's resolved block |
| `children` | node | its leaves, or `none` |
| `calendar` | node | `[[CFG.calendar]]`: dates are compared with the story calendar (2024–2025) |
| `items` | leaf | the item names, in order |

## Item fields (leaf)

Each item is a `### <item>` heading followed by a list:

| Field | Meaning | Required |
| --- | --- | --- |
| `fact` | what it is, where it comes from, in the real world | yes |
| `valid` | real time span when it exists and is common enough: `YYYY[-MM[-DD]] → YYYY[-MM[-DD]]` or `→ nay`; notes in brackets | yes |
| `known-by` | who knows it: real-world groups · characters in the story (`[[CH.…]]`, node members) | yes |
| `sources` | external sources for `fact` and `valid`, or `none (cần nguồn)` | yes |
| `seen-in` | where the story used it (material codes, chapters, scenes) with the date on the story calendar | when any |

## Rules

1. `valid` **only warns when writing** (`LAW.check.info-valid`, `warn`): an event that declares an item in `info` with a date outside `valid` is reported; nothing is deleted and published chapters are not edited because of it.
2. An event declares the knowledge it uses in its `info` field (`schemas/event.md`); `canon:check` also suggests items in the event's resolved block (`<!-- SINH -->`): items of a leaf whose node `style` contains the event's resolved register, `valid` at the event's date, and known by a participant.
3. Info holds no story facts beyond `known-by` and `seen-in`, which only point.
