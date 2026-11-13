---
id: GUIDE.main
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[quy-trinh|content/quy-trinh.md]]"
  - "content/README.md"
  - "CLAUDE.md"
  - "[[docs/framework/README|docs/framework/README.md]]"
---
# Đèn Vàng: guidelines for agents

Read this first in every session. It says how to work on the story. For what the system *is* (entities, ids, inheritance, tooling), look things up in [`docs/framework/README.md`](../docs/framework/README.md); for the fields of an entity, read its schema in [`content/schemas/`](schemas/).

## Ground rules

1. **The author decides, you propose.** Never write a decision as canon. Statuses say who decided what (`locked` = author; `proposed` = you).
2. **Read narrowly.** Start from the write-kit or the entity you were given, follow its links, stop. Never load a whole folder "to be safe". Details: [guidelines/reading.md](guidelines/reading.md).
3. **One owner.** Write each value only in the entity that owns it; elsewhere, link by id.
4. **Ids never change.** New id + old one in `aliases`.
5. **Never edit generated content** (`<!-- SINH -->` blocks, `_views/`, `symbols.md`). Change the source and re-run the tooling.
6. **Chapter text is the author's.** Do not touch published chapters except in a writing task that asks for it; then change only what the task names.
7. **Story text in Vietnamese, conventions in English.**
8. **Published chapters win.** Before adding anything that happens on a date, check the published chapters around that date (`content/posts/vercel/`): what they show outranks any plan or request. A clash becomes a `Q-`, and the new thing stays proposed.
9. **Before you say "done":** run `npm run canon:check`; no new errors. Checks still `planned` are yours to do by reading.

## Contents

| File | Covers | Status |
| --- | --- | --- |
| [guidelines/reading.md](guidelines/reading.md) | what to read for each kind of task, write-kits, Obsidian, token budget | draft |
| [guidelines/roles-and-status.md](guidelines/roles-and-status.md) | author vs agent, decision lifecycle, statuses, priority when sources disagree | draft |
| [guidelines/placement.md](guidelines/placement.md) | decision tree: where a new thing goes and which id it gets | draft |
| [guidelines/invariants.md](guidelines/invariants.md) | full list of rules that must always hold, with the check that enforces each | draft |
| [guidelines/tasks/](guidelines/tasks/) | one playbook per task: input, steps, output, checks, when to stop and ask | draft |

### Task playbooks

| Task | Playbook |
| --- | --- |
| Record an author decision | [tasks/record-decision.md](guidelines/tasks/record-decision.md) |
| Propose options, design material | [tasks/propose-options.md](guidelines/tasks/propose-options.md) |
| Add or change an event | [tasks/add-event.md](guidelines/tasks/add-event.md) |
| Add a law, register, technique or pattern | [tasks/add-law-or-technique.md](guidelines/tasks/add-law-or-technique.md) |
| Plan a chapter (create its blueprint) | [tasks/plan-chapter.md](guidelines/tasks/plan-chapter.md) |
| Write a scene or a chapter from a blueprint | [tasks/write-scene.md](guidelines/tasks/write-scene.md) |
| Sync a blueprint after the chapter changed | [tasks/sync-blueprint.md](guidelines/tasks/sync-blueprint.md) |
| Revise a written chapter | [tasks/revise-chapter.md](guidelines/tasks/revise-chapter.md) |
| Audit a range of chapters | [tasks/audit.md](guidelines/tasks/audit.md) |
| Convert chapters for a cross-posting site | [tasks/crosspost-convert.md](guidelines/tasks/crosspost-convert.md) |
| Sweep design text for the compound-words rule (scan and fix) | [tasks/compound-words-sweep.md](guidelines/tasks/compound-words-sweep.md) |

## Transitional mode (until migration B3–B8 is done)

Most of the story still lives in old files. Until a folder exists in its new form, these rules **override** the target-state steps in every playbook:

| Topic | Rule while not migrated |
| --- | --- |
| Where an event goes | a new row in the node's old table in `content/_archive/tuyen/…` (e.g. RM.TN → `content/_archive/tuyen/romance/thuyen-nhi.md` §2), with the **old columns** (including `Chương`), the **old id convention** of that file (e.g. `TN-?` until numbered), the **old labels** (`[đề xuất]`, `[chốt dd/mm]`; mapping in `content/config/statuses.md`) |
| Goals | not required if the node has none yet; write the event's purpose in the row and report "node has no goals" |
| Anything else with no folder yet (blueprint, law, technique, register) | a file in `content/de-xuat/`: a blueprint as `de-xuat/BP.<edition>.<nn>.md` with the blueprint schema's header and sections (fields that point to entities that do not exist yet, like `edition: [[ED.v2]]`, are written as plain text: `edition: v2`) |
| Referring to events that have no id yet | node code + old row id or a short description (`RM.TN · "Nhi hỏi anh ở summit"`) |
| Registers | `R0`–`R10` as `lib/registers/REG.*` (aliases); full rules still in `content/rules/registers.md` |
| Laws | old sources: `content/01-rules-viet.md`, `content/01c-rules-thanh-phan.md`, `content/rules/` |
| Checks marked `planned` in `docs/framework/tooling.md` | not run by `canon:check` yet: do them by reading, and say so in your report. No resolved blocks or write-kits are generated yet |
| Proposals | `content/de-xuat/<descriptive-name>.md`; frontmatter `kind: proposal` with `id: PROP-NNN` (next free number: grep `PROP-`) |

Index of old sources: `content/README.md`.
