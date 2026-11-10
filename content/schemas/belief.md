---
id: SCH.belief
kind: schema
entity: belief
status: agreed
updated: 2026-11-10
required: [id, definition, axis, status]
aliases: [schema.belief]
sources: [kien-truc-framework.md §5, hội thoại 10/11 (hai lớp, tham chiếu, ngộ nhận và diễn giải)]
---
# schema · belief

A belief (old `NT-`): what a character holds about self, others or the world, produced by personality meeting a wound, consumed by present events.

**Location:** inline in `world/characters/<id>/CH.<id>.beliefs.md` (one file, many beliefs). **Id:** `BL-NNN`, unique across the vault; heading `### BL-024`.

## Two layers `agreed 10/11`

| Layer | Required | Content |
| --- | --- | --- |
| **definition** | yes | What the belief means, from the author's side: the core proposition, why it is half true, what it protects, what it costs. May cite a reference (`ref`). No separate title or slogan line: the definition carries the meaning |
| **monologue** | optional | The belief described **as the character thinks it**, written only when the character sees it. A design tool: it tells the writer how the belief surfaces and is narrated in the story. Copying its words onto the page is optional. Field `seen`: `thay` (has words) · `nua` (surfaces, then denied) · `khong` (shows only in behaviour; no monologue). `seen` may change by phase |

The monologue keeps the **design register** (compound words, a complete chain of reasoning); it is **not** adjusted to the character's voice. Adapting it to the voice happens only when a scene is written `locked 10/11`.

A monologue may have **stages**, each tagged with an age or phase:
- `ngo-nhan` (misconception): the child's conclusion, usually an accusation, drawn straight from the wound.
- `dien-giai` (interpretation): the same belief re-derived later through the objective lens, more general and more defensible.

`seen` describes **only what the character sees**. It never limits what the reader is told: a belief with `seen: khong` can still reach the reader through narration, details, behaviour, or another character's POV, under the hide-or-tell rules (`01-rules-viet.md`, *Nguyên tắc chung*) `agreed 10/11`.

An innate psychological effect that the character holds no thought about is **not a belief**: it goes to a function (`FN.*`) as a definition only.

## Fields

| Field | Meaning |
| --- | --- |
| `definition` | the definition layer, prose; its first sentence states the belief (used by tables and indexes) |
| `ref` | optional: `câu` (verbatim quote, with source and link checked) or `ý` (concept, author and work). Never copied onto the page; no character speaks it (same convention as `tuyen/goc.md` "Họ ý") |
| `deviation` | where the character bends the reference, and which personality trait does the bending |
| `seen` | `thay` · `nua` · `khong`, per phase if it changes |
| `monologue` | stages `ngo-nhan` / `dien-giai`, each with age or phase: the belief in the character's own thinking (design tool; on-page use optional) |
| `other-face` | what makes it false or void |
| `axis` | the axis `AX` it runs on |
| `parent` | for a tactic: the core belief it derives from |
| `cluster` | the cluster (`C<n>`) the belief answers; one primary cluster, others noted after it |
| `origin` | the past event that produced it (`[[PAST.T-031]]`) |
| `status` | `config/statuses.md` |

`consumed-by` is generated from events' `beliefs` field. A belief no event consumes is listed as *waiting*: a candidate for planning.

**Clusters** `agreed 10/11`: beliefs are grouped by the existential question the character answers, not by axis. Each cluster is a `## C<n> · <name>` section in the beliefs file with `question`, `root`, `axes` and a shared `definition`; members follow in age order. A cluster may be definition-only (a question the character never asks, all `seen: khong`).

**Mirrors** `agreed 10/11`: a contrast between two characters' beliefs lives in the `mirror` section of their relationship node (e.g. [[ROM.TN]]), never inside either character's beliefs. A belief describes only its own side and does not link to the mirror; the mirror links to the beliefs.

A belief shared by several characters still has **one** owning character; others `uses` it.
