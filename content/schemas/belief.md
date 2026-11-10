---
id: SCH.belief
kind: schema
entity: belief
status: agreed
updated: 2026-11-10
required: [id, statement, axis, status]
aliases: [schema.belief]
sources: [kien-truc-framework.md §5, hội thoại 10/11 (hai lớp, tham chiếu, ngộ nhận và diễn giải)]
---
# schema · belief

A belief (old `NT-`): what a character holds about self, others or the world, produced by personality meeting a wound, consumed by present events.

**Location:** inline in `world/characters/<id>/CH.<id>.beliefs.md` (one file, many beliefs). **Id:** `BL-NNN`, unique across the vault; heading `### BL-024`.

## Two layers `agreed 10/11`

| Layer | Required | Content |
| --- | --- | --- |
| **definition** | yes | What the belief is, from the author's side: the core proposition, why it is half true, what it protects, what it costs. May cite a reference (`ref`). This is what an agent reads to know what to write |
| **monologue** | optional | How it sounds inside the character's head, **only when the character sees it**. Field `seen`: `thay` (has words) · `nua` (surfaces, then denied) · `khong` (shows only in behaviour; no monologue). `seen` may change by phase |

A monologue may have **stages**, each tagged with an age or phase:
- `ngo-nhan` (misconception): the child's conclusion, usually an accusation, drawn straight from the wound.
- `dien-giai` (interpretation): the same belief re-derived later through the objective lens, more general and more defensible.

An innate psychological effect that the character holds no thought about is **not a belief**: it goes to a function (`FN.*`) as a definition only.

## Fields

| Field | Meaning |
| --- | --- |
| `statement` | one line: the core of the definition (for tables and indexes) |
| `definition` | the definition layer, prose |
| `ref` | optional: `câu` (verbatim quote, with source and link checked) or `ý` (concept, author and work). Never copied onto the page; no character speaks it (same convention as `tuyen/goc.md` "Họ ý") |
| `deviation` | where the character bends the reference, and which personality trait does the bending |
| `seen` | `thay` · `nua` · `khong`, per phase if it changes |
| `monologue` | stages `ngo-nhan` / `dien-giai`, each with age or phase and the words |
| `other-face` | what makes it false or void |
| `axis` | the axis `AX` it runs on |
| `parent` | for a tactic: the core belief it derives from |
| `origin` | the past event that produced it (`[[PAST.T-031]]`) |
| `status` | `config/statuses.md` |

`consumed-by` is generated from events' `beliefs` field. A belief no event consumes is listed as *waiting*: a candidate for planning.

A belief shared by several characters still has **one** owning character; others `uses` it.
