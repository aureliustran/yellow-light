---
id: SCH.constitution
kind: schema
entity: constitution
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, axis]
sources:
  - "[[docs/framework/rules-engine|docs/framework/rules-engine.md]]"
---
# schema · constitution (chapter)

One chapter of the constitution: the articles split from one axis (`ART.AX<n>.md`) or the foundations (`ART.0.md`). **Location:** `core/constitution/`. **Id:** `ART.AX3`, `ART.0`. Header `axis`: the axis (`AX3`), or `none` for chapter 0.

Body: the axis's root sentence (quoted, with its source), then one heading per article `### ART.AX3.<k>` with the fields of `schemas/article.md`. Every article is drafted by Claude from the author's words and approved one by one.
