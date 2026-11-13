---
id: GUIDE.task.revise-chapter
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[quy-trinh|quy-trinh.md §4.5]]"
---
# Task: revise a written chapter

**Trigger:** "sửa đoạn …", "chương N đọc chưa ổn".

## Steps
1. Wording only: edit the passage directly, following its write-kit (or the old `rules/` and `den-vang-van-phong` until migrated). Change nothing outside what was asked.
2. Large changes across chapters: `den-vang-pipeline`.
3. A change that alters canon goes through `record-decision` first.
4. Then `sync-blueprint`.

## Checks
Only the asked passage changed (diff); blueprint synced; `canon:check` clean.
