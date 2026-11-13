---
id: SCH.scale
kind: schema
entity: scale
status: agreed
updated: 2026-11-10
required: [id, kind, status, updated, name]
aliases: [schema.scale]
sources:
  - "[[docs/framework/model|docs/framework/model.md]]"
  - "_archive/tuyen/goc.md §3 (chuyển 10/11)"
---
# schema · scale

A graded scale (steps) used by events and attributes, e.g. `SCALE.exl` (old Nấc-HS). **Location:** `core/SCALE.<name>.md`.

Sections: `steps` (table: step, age or phase, concern, sentence shape), `rules`, `notes` (relation to other scales). An event's `level` field defaults to `SCALE.exl`; other scales are written with their name (`SCALE.pride 3`).
