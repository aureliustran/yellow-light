---
id: SCH.axis
kind: schema
entity: axis
status: agreed
updated: 2026-11-10
required: [id, kind, status, updated, name]
aliases: [schema.axis]
sources: [docs/framework/model.md, _archive/tuyen/goc.md §2 (chuyển 10/11)]
---
# schema · axis

An existential axis of the story (old `H<n>`). The root holds axes, not mechanisms: how an axis runs lives in the node that carries it, and that node points back to the axis.

**Location:** `core/axes/AX<n>.md`. **Id:** `AX<n>`; old code `H<n>` is an alias. No events, no weight.

## Sections

| Section | Content |
| --- | --- |
| `root` | the root sentence (one aphorism, or a paragraph when the axis joins several components). A ruler for planners. Not printed on the page unless the axis says otherwise. Older versions kept below it |
| `on-page` | the plain, spoken version for the right speaker; optional |
| `author` | the author's raw sentences with dates; lines Claude joined are marked |
| `components` | components merged into the axis (text only; nodes point here, the axis does not link to nodes) |
| `ideas` | names or concepts outside the story ("Họ ý"); quotes only when public domain |

## Rules (from `_archive/tuyen/goc.md` §2, locked 28/10)

1. The root sentence is the author's. Outside sources go to `ideas` only.
2. Public-domain quotes may be used verbatim with source; on the page a character knows them from elsewhere, never quotes them at the reader.
3. Living modern authors: idea and concept name only.
4. A component becomes an axis when it is concise and has enough layers of meaning; several components may join one axis.
5. A paragraph root is woven from the author's raw sentences; what Claude joined is marked in `author`.
6. Root sentences follow the compound-words rule (`01-rules-viet.md`, locked 10/11).
