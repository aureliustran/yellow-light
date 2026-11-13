---
id: SCH.post
kind: schema
entity: post
status: proposed
updated: 2026-11-10
required: [id, file, edition, status]
aliases: [schema.post]
sources:
  - "[[docs/framework/blueprints|docs/framework/blueprints.md]]"
---
# schema · post (published chapter)

A chapter as published, in `content/posts/<edition-dir>/`. The chapter file is never renamed or given metadata (the import parser and the site read it as is), so its record lives **outside** the chapter.

**Location:** a row in the edition file `plans/ED.<edition>.md`. **Id:** `POST.<edition>.<nn>` (number = order in the edition, two digits; interludes take the number of the chapter they follow plus a letter: `POST.v2.04b`).

## Fields

| Field | Meaning |
| --- | --- |
| `id` | `POST.v2.05` |
| `file` | `posts/vercel/05-chuong-05-san-khau.md` |
| `edition` | `[[ED.v2]]` |
| `status` | `page` (published) · `draft` · `needs-decision` |
| `blueprint` | `[[BP.v2.05]]` when one exists |

Which events, register and POV a chapter carries is owned by its blueprint, not repeated here.

## Rules

1. A `page` chapter is first in the priority order (`config/statuses.md`): when canon contradicts it, fix canon or open a `Q-`; never edit the chapter silently.
2. Cross-posts (`XP.<site>.<nnn>`) are files in `posts/<domain>/`; their rules are in that folder's `convert.md`.
