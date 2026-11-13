---
id: SCH.article
kind: schema
entity: article
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, statement, source]
aliases: [schema.article]
sources:
  - "[[docs/framework/rules-engine|docs/framework/rules-engine.md]]"
  - "[[de-xuat/kien-truc-framework|kien-truc-framework.md §6]]"
---
# schema · article

A constitution article: an invariant split from an axis; phase laws take their basis from it. See [rules-engine](../../docs/framework/rules-engine.md).

**Location:** inline in `core/constitution/ART.AX<n>.md` (one chapter per axis) or `ART.0.md` (chapter 0, foundations). **Id:** `ART.AX<n>.<k>`, `ART.0.<k>`; block id `^<k>`.

## Fields

| Field | Meaning |
| --- | --- |
| `statement` | **One sentence**, in Vietnamese |
| `source` | which passage of the axis's root sentence (`core/axes.md`) produces it |
| `forbids` | what the story must never do (checkable by eye or machine) |
| `applies-to` | selector (syntax: [rules-engine](../../docs/framework/rules-engine.md#selectors)) |
| `status` | `config/statuses.md` |

Chapter 0 is the basis for laws not derived from an axis: form, display blocks, address, dialect, under-18, structure.

## Rules

1. Claude drafts articles from the **author's root sentences**; the author approves each one. Unapproved articles are `proposed`.
2. Lower tiers (law, decree, override) only make an article concrete; they never contradict it. Going against an article means changing it through a top-level decision `D-`.
3. Every article has at least one `source`.
