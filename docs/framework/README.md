---
id: SPEC.framework
kind: spec
status: draft
updated: 2026-11-10
sources:
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §0–§12]]"
  - "[[config/ids|content/config/ids.md §0]]"
---
# Đèn Vàng story framework: specification

Entry point of the **spec**: what the system is. For *how to work in it*, read [`content/GUIDELINES.md`](../../content/GUIDELINES.md) first.

The story repository is treated as a codebase. Story material lives in `content/` as typed entities (one file per entity, or an inline block inside its parent), linked by ids, checked by a rule runner, and viewed through Obsidian and generated views. Story text is Vietnamese; every convention (folder, file, field, enum, id prefix) is English.

Entity definitions (fields, types, per-kind rules) live in [`content/schemas/`](../../content/schemas/) and are the source of truth. This spec describes how the entities fit together and never repeats schema fields.

## Principles

1. **Static vs dynamic.** `world/` holds definitions (characters, groups, settings, objects, secrets). `storylines/` holds values over time (nodes and their events). Dynamic points to static, never the reverse; reverse lookups are generated views.
2. **One owner per attribute.** Every value is written in exactly one place. Inner state belongs to `SELF.<id>`, relation state to the relation's node.
3. **Every entity has an id.** Four id forms, immutable, case-sensitive, unique even when lower-cased. See [ids](ids.md).
4. **Rules are scoped entities.** Constitution articles derive from the axes; phase laws derive from the constitution; nodes add decrees; events may override with a reason. Laws reach entities through selectors, not by being copied.
5. **How-to-write is a library.** Registers, techniques and patterns mirror the rules tree and serve laws; mandatory practice is promoted to a law.
6. **Events are leaves.** An event is the last node of a storyline tree. It declares only what is its own; everything inherited (laws, register, voices, goal chain, state before) is resolved by the tooling into a generated block.
7. **Blueprints combine events into chapters.** Output is the written chapter; tracing back reads the blueprint, not the chapter.
8. **Declare little, generate the rest.** Generated content is marked and never edited by hand; `canon:check` enforces it.

## Concept map

| Codebase / database | Đèn Vàng | Where |
| --- | --- | --- |
| Entry point | guidelines, spec | `content/GUIDELINES.md`, `docs/framework/README.md` |
| Models | entity schemas | `content/schemas/` |
| Config, constants | calendar, phases, levels, statuses | `content/config/` |
| Domain core, ADR base | axes, constitution | `content/core/` |
| Scoped lint rules, policy | laws | `content/rules/` |
| Library | registers, techniques, patterns | `content/lib/` |
| Dimension tables, classes | characters, groups, settings, objects, secrets | `content/world/` |
| Fact tables | nodes; events as leaf rows | `content/storylines/` |
| Hyperedge, mediator | intersections (folders with their own id, foreign keys to ≥2 nodes; own events only with an own goal) | `content/storylines/intersections/` |
| Build plan | chapter blueprints | `content/plans/` |
| Release artifacts | published chapters, cross-posts | `content/posts/` |
| CHANGELOG, issues | decisions `D-`, questions `Q-` | `content/canon/` |
| Branches, PRs | proposals | `content/proposals/` (now `de-xuat/`) |
| Tests | audits | `content/audits/` |
| Vendor | research, samples, legacy material | `content/assets/` |
| CI | `canon:check` | `scripts/canon-check.mjs` |
| Views, ctags | write-kits, matrices, `symbols.md`, graph | generated (`content/_views/`) |

## Contents

| File | Covers | Status |
| --- | --- | --- |
| [model.md](model.md) | layers, entity kinds (one line each → schema), ownership, static/dynamic, dependency direction | draft |
| [ids.md](ids.md) | id grammar, kind registry, case rules, inline ids, immutability, aliases | draft |
| [layout.md](layout.md) | folder tree of `content/`, `posts/`, `crosspost/`, `scripts/paths.mjs`, Obsidian vault | draft |
| [rules-engine.md](rules-engine.md) | constitution → law → decree → override, selectors, overlap resolution, phase effect | draft |
| [library.md](library.md) | registers, techniques, patterns; links to laws; checks | draft |
| [storylines.md](storylines.md) | trees, nodes, goals, event leaves, inheritance and the resolved block, intersections | draft |
| [blueprints.md](blueprints.md) | chapter blueprints, scenes, roles, anchors, sync lifecycle, outputs | draft |
| [tooling.md](tooling.md) | `canon:check` and its laws, generated views, graph page, Obsidian setup | draft |
| [skills.md](skills.md) | which skill works on which layer, rules for skills, gaps, migration of the old skills | draft |
| [adr/ADR-001-story-framework.md](adr/ADR-001-story-framework.md) | why, rejected options, effect on earlier decisions | draft |

Migration (moving old files into this structure, steps B0–B8, open questions) is not spec. It is tracked in `content/de-xuat/kien-truc-framework.md`.

## Status vocabulary

Every spec section and every entity carries a `status` from `content/config/statuses.md`: `page` · `locked` · `delegated` · `agreed` · `proposed` · `draft` · `raw` · `superseded` · `conflict` · `needs-decision`. In this spec, `locked` means the author decided; `proposed` means Claude proposed and the author has not decided.
