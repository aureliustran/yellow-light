---
id: GUIDE.reading
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "docs/framework/*"
  - "content/README.md"
  - "[[quy-trinh|quy-trinh.md §3]]"
---
# Reading: what to load, and when to stop

Tokens are the budget. Every task starts from one entry and follows links; nothing is loaded "to be safe".

## Start of a session

1. This guide's entry, `content/GUIDELINES.md`.
2. `git status`, current branch, distance to `origin/main`.
3. Sort the author's request into a task (`tasks/`) and open that playbook only.
4. Open questions that may block the task: `canon/cau-hoi.md` (later `canon/questions.md`), searched by the ids the task touches, not read whole.

## Where to start for each kind of question

| You need | Open | Then follow |
| --- | --- | --- |
| what an id is | `content/symbols.md` (grep the id) | the file it points to |
| everything needed to write a scene | the write-kit `_views/write-kit/BP.<edition>.<nn>.md` | event files it lists, only if the kit is not enough |
| one event | the event file; its resolved block at the end | the parent node only for context the block lacks |
| the laws on something | `_views/rules-for/<id>.md` | the law files listed |
| a character | the package main file, first ~20 lines | the section or function you need |
| how a field works | the kind's schema in `content/schemas/` | the spec page it links |
| how the system fits together | `docs/framework/README.md` | one spec page |

## Reading a file

- Read the first ~20 lines (header, summary, key index) and decide whether to read on.
- Read sections by heading, not whole files, when the file is long.
- Generated files (`_views/`, `symbols.md`, resolved blocks) are for reading only.

## Obsidian

The author browses the vault at the repo root (graph, backlinks, Breadcrumbs). Agents read raw files; anything Obsidian computes (Dataview, backlinks) is either written into `_views/` by `canon:check` or not available to you. Rename or move files only through Obsidian or by updating every link yourself, then run `canon:check`.

## Transitional

Until a folder is migrated (steps B3–B8 in `de-xuat/kien-truc-framework.md`), write-kits and resolved blocks do not exist yet. Then use the old sources, by index: `content/README.md`; rules in `01-rules-viet.md`, `01c-rules-thanh-phan.md`, `rules/`; registers in `rules/registers.md`; storylines in `_archive/tuyen/`; decisions in `canon/bible-v2.md`. Read the section you need, not the file.
