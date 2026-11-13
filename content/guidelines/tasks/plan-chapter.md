---
id: GUIDE.task.plan-chapter
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[docs/framework/blueprints|docs/framework/blueprints.md]]"
  - "[[schemas/blueprint|schemas/blueprint.md]]"
  - "[[quy-trinh|quy-trinh.md §4.4]]"
---
# Task: plan a chapter (create its blueprint)

**Trigger:** "lên plan ch.N", step 1–2 of "viết ch.N–M".

## Input
The edition and chapter number; the range plan `PLAN.*` if there is one; the events due.

## Steps
1. List blocking `Q-` for the events in scope; ask the author to settle them first.
2. Pick the events (`locked` or `agreed`) the chapter will carry. Missing events → `add-event` first, as `proposed`.
3. Create `content/plans/chapters/BP.<edition>.<nn>.md` (schema `blueprint`), `stage: planned`: scenes in order; per scene its purpose, register and transitions, pattern, events with role (`shows`, `mentions`, `recalls`), writer, and leave `anchor` empty until written.
4. Fill `hooks`. `in`/`out` and the write-kit are generated: run `canon:check` and read the write-kit.
5. For larger ranges use the skills `den-vang-tong-hop-cot-truyen` (plot) and `den-vang-tong-hop-cach-viet` (writing synthesis).

## Output
A blueprint and its write-kit.

## Checks
Every `shows` event is `locked` or `agreed`; registers and patterns allowed by the laws in the kit; `canon:check` clean.

## Stop and ask
The author approves the blueprint before writing starts, unless they said to go on.

## Transitional
Before `content/plans/` exists, write the blueprint at `content/de-xuat/BP.<edition>.<nn>.md` (transitional table in `content/GUIDELINES.md`).
