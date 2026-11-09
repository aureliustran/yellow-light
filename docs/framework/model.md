---
id: SPEC.model
kind: spec
status: draft
updated: 2026-11-10
sources: [content/de-xuat/kien-truc-framework.md §0, §2, §4, §5, §8.1]
---
# Model

How entities fit together. Fields of each kind are defined in its schema under `content/schemas/`; this file never repeats them.

## Layers `agreed 06/11`

| Layer | Folder | Holds | May reference |
| --- | --- | --- | --- |
| L0 foundation | `config/`, `schemas/` | constants of the story (calendar, phases, levels, statuses); entity models | nothing |
| L1 core | `core/` | axes `AX`, scales `SCALE`, shared mechanics, the constitution `ART` | L0 |
| L1.5 rules | `rules/` | laws `LAW` | L0, L1 |
| L1.5 library | `lib/` | registers `REG`, techniques `TEC`, patterns `PAT` | L0, L1, rules |
| L2 world (static) | `world/` | characters, groups, settings, objects, secrets, beliefs, functions | L0–L1.5 |
| L3 storylines (dynamic) | `storylines/` | storylines, nodes, goals, events, intersections | L0–L2 |
| L4 plans | `plans/` | editions, chapter blueprints, scenes | L0–L3 |
| Output | `posts/` | published chapters, cross-posts | nothing (text only) |
| Cross-cutting | `canon/`, `proposals/`, `audits/`, `assets/` | decisions, questions, proposals, audits, samples, research | anything |
| Generated | `_views/`, `symbols.md`, resolved blocks | views, indexes | (written by tooling only) |

**Direction.** A layer references only layers above it in this table. Dynamic points to static, never the reverse; reverse lookups (who uses this character, which laws apply here) are generated views. L0–L4 never depend on `proposals/`. `LAW.check.layer` enforces this.

## Kinds

One line per kind; the schema is the source of truth. Ids follow [ids.md](ids.md).

| Kind | Id | Lives as | Schema |
| --- | --- | --- | --- |
| axis | `AX3` | file in `core/` | (planned) |
| scale | `SCALE.exl` | file in `core/` | (planned) |
| article | `ART.AX3.1` | inline in `core/constitution/ART.AX3.md` | `schemas/article.md` |
| law | `LAW.<aspect>.<scope>` | file | `schemas/law.md` |
| register | `REG.<name>` | file | (planned, B3) |
| technique | `TEC.<aspect>.<name>` | file | (planned, B3) |
| pattern | `PAT.<name>` | file | (planned, B3) |
| character | `CH.<name>` | package folder | `schemas/character.md` |
| group | `GRP.<name>` | file | `schemas/group.md` |
| setting | `SET.<name>` | file | `schemas/setting.md` |
| object | `OBJ-NNN` | file or inline | `schemas/object.md` |
| secret | `SEC-NNN` | file | `schemas/secret.md` |
| belief | `BL-NNN` | inline in the character's beliefs file | `schemas/belief.md` |
| function | `FN.<character>.<name>` | file in the character package | `schemas/function.md` |
| storyline | `ROM`, `PAST`, … | file | `schemas/node.md` |
| node | `ROM.TN`, `PAST.N.HD`, `SELF.thuyen` | file | `schemas/node.md` |
| goal | `ROM.TN.G2` | inline in its node | (planned, B3) |
| event | `ROM.TN-014` | file (leaf of the node) | `schemas/event.md` |
| intersection | `X-009` | file | `schemas/intersection.md` |
| edition | `ED.v2` | file in `plans/` | (planned) |
| blueprint | `BP.v2.05` | file in `plans/chapters/` | (planned, B3) |
| scene | `BP.v2.05.S2` | inline in its blueprint | (with blueprint) |
| chapter (post) | `POST.v2.05` | chapter file in `posts/`, id kept in a map | `schemas/chapter.md` |
| decision · question | `D-031` · `Q-045` | inline in `canon/` | (planned) |
| proposal · audit | `PROP-012` · `AUD-003` | file | `schemas/proposal.md` |
| plan (work plan) | per schema | file | `schemas/plan.md` |
| config · schema · spec · guide | `CFG.*` · `SCH.*` · `SPEC.*` · `GUIDE.*` | file | — |

## Ownership `agreed 05/11`

Every value has exactly one owner; everywhere else links to it by id. `LAW.check.owner` enforces this.

| Value | Owner |
| --- | --- |
| identity, purpose, attribute *definitions* and their value sets | the `world/` entity |
| attribute *values* over time | the node that owns that attribute |
| inner state of a character | `SELF.<id>` |
| relation state between characters | the relation's node (e.g. `ROM.TN`) |
| which chapter shows an event, and in which role | the blueprint |
| scope of a law | the law file (`applies-to`, `except`) |
| goal of a node | the node; goals of events point up with `serves` |
| everything inherited by an event | nobody: resolved by tooling, never stored |

A node never reads another node directly. Values cross nodes only through `world/` (static) or an intersection `X-` (dynamic); causality across nodes is the event field `causes`.

## Static vs dynamic `agreed 05/11`

`world/` declares *what can vary* (an attribute and its allowed values, e.g. `cai-toi-doc ∈ {ngu, thuc-co-dieu-kien, …}`). `storylines/` records *what it is at a given time*. Phases (`OPEN`, `P1`, `P2`, `BREAK`, `AFTER`, `POST`) are the time dimension; levels (`D` … `SSS`) are the weight of a node per phase.

A character is a package: main file (identity, purpose, attributes, exports), beliefs, base voice, mechanics (function signatures, one file per function). Crowd characters are rows in a group file.

## Common header

Every entity file starts with a frontmatter header (`id`, `kind`, `status`, `updated`, and the kind's own fields), then a one-sentence summary and a key index, within about 20 lines. Empty sections are written as `none`, never omitted. Exact fields: the kind's schema.

## Status and priority

`status` values and their meaning: `content/config/statuses.md`. When two sources disagree, the higher one wins: published chapter (`page`) > newer `locked` > older `locked` > `agreed` > `proposed` > `raw`. A conflict that cannot be settled this way is marked `conflict` and becomes a question `Q-`.
