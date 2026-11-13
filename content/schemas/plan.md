---
id: SCH.plan
kind: schema
entity: plan
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, range, phase]
aliases: [schema.plan]
sources:
  - "[[de-xuat/kien-truc-framework|kien-truc-framework.md §13.6]]"
---
# schema · plan (range plan)

A plan for a range of chapters: which nodes are in scope and what is due. It groups blueprints; each chapter's detail is its blueprint (schemas/blueprint.md).

**Location:** `plans/PLAN.<edition>.<from>-<to>.md`. **Id:** `PLAN.v2.06-10`.

Sections: `scope` (table: node, level · role, events due, intersections, gaps, beliefs, register) · `not-touched` (nodes out of scope; writers and reviewers do not pull them in without asking) · `blueprints` (links `[[BP.…]]`, in order) · `notes`.

Rule: a plan only **reads** `world/`, `storylines/`, `rules/`; it never writes new values into them. Decisions that arise go through `proposals/` first.
