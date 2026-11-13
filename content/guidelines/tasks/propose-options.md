---
id: GUIDE.task.propose-options
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[quy-trinh|quy-trinh.md §4.2, §4.3]]"
---
# Task: propose options

**Trigger:** "nghĩ cách xử lý …", "có những hướng nào cho …", "dựng kho cho …", "thiết kế sự kiện …".

## Input
The problem; the entities it touches (find them by id).

## Steps
1. Read only the entities the problem touches, plus their laws (`rules-for` view) and open questions on them.
2. Write `proposals/PROP-NNN.md` (schema `proposal`): problem; options ordered by intervention (light, medium, strong, very strong), each with gains and losses; which decisions each option touches; which options exclude each other; a recommendation; questions for the author as new `Q-`.
3. For character or register work, use the skills `den-vang-nhan-vat`, `den-vang-van-phong`; for causal changes across many chapters, `den-vang-tong-hop-cot-truyen`.

## Output
One proposal file; new `Q-`.

## Checks
Every option names the decisions it touches; there is a recommendation; no canon file was changed.

## Stop and ask
Always: a proposal ends with the author. Decisions they give during the work go through `record-decision` at once, never stay inside the proposal.
