---
id: GUIDE.main
kind: guide
status: draft
updated: 2026-11-10
sources: [content/quy-trinh.md, content/README.md, CLAUDE.md, docs/framework/README.md]
---
# Đèn Vàng: guidelines for agents

Read this first in every session. It says how to work on the story. For what the system *is* (entities, ids, inheritance, tooling), look things up in [`docs/framework/README.md`](../docs/framework/README.md); for the fields of an entity, read its schema in [`schemas/`](schemas/).

## Ground rules

1. **The author decides, you propose.** Never write a decision as canon. Statuses say who decided what (`locked` = author; `proposed` = you).
2. **Read narrowly.** Start from the write-kit or the entity you were given, follow its links, stop. Never load a whole folder "to be safe".
3. **One owner.** Write each value only in the entity that owns it; elsewhere, link by id.
4. **Ids never change.** New id + old one in `aliases`.
5. **Never edit generated content** (`<!-- SINH -->` blocks, `_views/`, `symbols.md`). Change the source and re-run the tooling.
6. **Chapter text is the author's.** Do not touch published chapters except in a writing task that asks for it; then change only what the task names.
7. **Story text in Vietnamese, conventions in English.**
8. **Before you say "done":** run `npm run canon:check`; no new errors.

## Contents

| File | Covers | Status |
| --- | --- | --- |
| [guidelines/reading.md](guidelines/reading.md) | what to read for each kind of task, write-kits, Obsidian, token budget | planned |
| [guidelines/roles-and-status.md](guidelines/roles-and-status.md) | author vs agent, decision lifecycle, statuses, priority when sources disagree | planned |
| [guidelines/placement.md](guidelines/placement.md) | decision tree: where a new thing goes and which id it gets | planned |
| [guidelines/invariants.md](guidelines/invariants.md) | full list of rules that must always hold, with the check that enforces each | planned |
| [guidelines/tasks/](guidelines/tasks/) | one playbook per task: input, steps, output, checks, when to stop and ask | planned |

### Task playbooks (planned)

| Task | Playbook |
| --- | --- |
| Plan a chapter (create its blueprint) | `tasks/plan-chapter.md` |
| Write a scene from a blueprint | `tasks/write-scene.md` |
| Sync a blueprint after the chapter changed | `tasks/sync-blueprint.md` |
| Add or change an event | `tasks/add-event.md` |
| Add a law or a technique | `tasks/add-law-or-technique.md` |
| Record an author decision | `tasks/record-decision.md` |
| Convert chapters for a cross-posting site | `tasks/crosspost-convert.md` |

## Transitional note

The framework is being built (`content/de-xuat/kien-truc-framework.md`, steps B3–B8). Until a folder is migrated, its old files are still the source: `README.md` lists them, `01-rules-viet.md` and `rules/` hold the rules, `rules/registers.md` the registers.
