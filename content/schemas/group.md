---
id: SCH.group
kind: schema
entity: group
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, aliases]
aliases: [schema.group]
sources: [kien-truc-framework.md §5]
---
# schema · group

A group of people and its crowd characters.

**Location:** `world/groups/<name>.md`. **Id:** `GRP.<name>`. Header also: `members` (links `[[CH.…]]` for members who have a package).

## Sections

- `identity`: who the group is, what it does, where (`[[SET.…]]`).
- `members`: one row per member: `name`, `role`, `traits`, `appears` (generated when empty).
- `rules`: the group's limits (e.g. Nhi's council: three people, no male member).
- `exports`.

A member used in two or more nodes, or with a function of their own, is **promoted to a package** `CH.<id>`; the row becomes a link.
