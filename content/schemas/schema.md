---
id: SCH.schema
kind: schema
entity: schema
status: proposed
updated: 2026-11-10
required: [id, kind, entity, status, updated, required]
sources: [docs/framework/model.md]
---
# schema · schema

A model of one entity kind. **Location:** `content/schemas/<kind>.md`. **Id:** `SCH.<kind>`.

Header: `entity` (the kind it defines), `required` (header fields every entity of that kind must have; `canon:check` reads this list), optional `required-one-of`.

Body: what the kind is, location and id, fields, sections, rules. Semantics shared by several kinds belong in `docs/framework/`, not here.
