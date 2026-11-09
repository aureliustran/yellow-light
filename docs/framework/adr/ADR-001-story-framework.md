---
id: SPEC.adr-001
kind: spec
status: agreed
updated: 2026-11-10
sources: [content/de-xuat/kien-truc-framework.md §1, §15, versions 1–3 (05–06/11), decisions 08/11 and 10/11]
---
# ADR-001: the story repository as a typed codebase

## Context

Before the framework (state of early November 2026):

- Two overlapping trees (content tiers T0–T4 and the storyline tree). Characters, value systems and laws had no home, so they fell into the nearest node (six files on Thuyên's psychology under `tuyen/qua-khu/`, Vũ's card under `tuyen/sl/vu.md`).
- One file mixed definition, mechanism, development by school year, how it reaches the page, research and open items; the same machine was described from six angles.
- References were `file §number`; reverse references were written by hand.
- Laws were one block (`01-rules-viet.md`, 64 KB); one law replaced another in prose ("this file replaces line … of …").
- Eleven files existed only in the claude.ai Project.
- Agents spent many tokens loading whole files to find one rule.

## Decision

| Decision | Status |
| --- | --- |
| Static `world/` vs dynamic `storylines/`, star-schema style; dependency only dynamic → static | agreed 05/11 |
| One template per kind; one owner per attribute; inner state in `SELF.<id>` | agreed 05/11 |
| Intersections are occasions (hyperedges) with their own tree; causality is `causes` | agreed 05/11 |
| Constitution split from the axes; phase laws derived from it; laws are scoped entities | agreed 06/11 |
| All conventions in English, story text in Vietnamese; old codes renamed once by script | locked 06/11 |
| Obsidian as link and view layer; `canon:check` as rule runner; graph page | agreed 06/11 |
| Story material in `content/`, `docs/` for specs; chapters by where they are published; vault at repo root | agreed 08/11 |
| Every entity has an id; four id forms; uppercase segments at any level; case-sensitive, no case-only clashes | agreed 10/11 |
| Library of registers, techniques, patterns mirroring rules | proposed 10/11 |
| Events are leaves with inheritance and a generated resolved block | proposed 10/11 |
| Chapter blueprints own event ↔ chapter; tracing reads blueprints | proposed 10/11 |
| Schemas stay in `content/schemas/` as the models; spec in `docs/framework/` in English; guidelines in `content/` in English | agreed 10/11 |

## Options rejected

| Option | Why not |
| --- | --- |
| Keep the tiers T0–T4 and add folders | the overlap of two trees was the problem |
| Rules as one document with sections | no scope, no basis, replacement in prose; cannot be checked |
| Intersections as nodes with several parents | breaks one-parent trees; hides who owns an event |
| Causality through intersections | conflates "happened together" with "caused" |
| Events as rows in the node file | no room for goals, overrides and resolved data; invisible in the graph; long tables |
| Views only through Dataview | agents read raw files and cannot see Dataview results |
| Vault in `docs/` (06/11) | could not see published chapters and cross-posts |
| Schemas in `docs/` | schemas are the models of the codebase; models stay with the code |

## Consequences on earlier decisions

| Earlier decision | Becomes |
| --- | --- |
| `goc.md` (28/10): a mechanism lives in the node that carries it | definition in the character package; values over time in nodes |
| `goc.md`: the root holds axes, no laws | the root also produces the constitution; laws rest on it |
| `kien-truc.md` §1.5: a session reads README, bible, questions | read `GUIDELINES.md`; `symbols.md`; questions; the bible is a view |
| M1 (Q-031) | kept and extended: every dynamic value in its owner node |
| Q-027 | kept; intersections have their own tree |
| `registers.md` §3 | becomes the `voice` of nodes; the matrix is a view |
| `goi-ten-cam-xuc.md` replacing a line of `01-rules-viet.md` | becomes `supersedes` |
| codes H, NT, TB, QK, RM, TH, SL, GD, MĐ, GĐ, GÃY, HP | renamed by script; old codes become aliases |

Migration and open questions: `content/de-xuat/kien-truc-framework.md`.
