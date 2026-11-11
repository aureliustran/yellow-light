---
id: SCH.intersection
kind: schema
entity: intersection
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, nodes]
aliases: [schema.intersection]
sources: [kien-truc-framework.md §8.3, tác giả 10/11]
---
# schema · intersection

A **meeting of nodes**: a hyperedge, not a node. It sits outside the node tree and is **defined by its foreign keys**: two or more nodes, of any depth (`ROM.TN`, or a root such as `PAST`). Its occasions are the times those nodes actually meet. See [storylines](../../docs/framework/storylines.md#intersections).

**Location** `proposed 10/11`: every intersection is a **folder** under `storylines/intersections/`, named by its id, holding its definition file `<id>/<id>.md`. Its occasions ([schema](occasion.md)) are files in the same folder.

**Id:** `X.<key>`, where `<key>` is the node ids of `nodes`, sorted, joined by `+` (`X.PAST.T+ROM.PN+ROM.TN`). One set of nodes has exactly one intersection: a new meeting of the same nodes is a **new occasion** in the existing folder, numbered in order of appearance (`X.PAST.T+ROM.PN+ROM.TN-001`, `-002`). A meeting with a different set of nodes is a different intersection.

## Stored

| Field | Meaning |
| --- | --- |
| `nodes` | `[[node]]` links, at least two; the key of the id; never edited after creation (a new set is a new intersection) |
| `share` | optional: which section of which node is readable through this intersection, and by whom (`[[FAM.T]] relation → [[PAST.T]]`) `proposed 11/11`. The only way a node reads another node's definitions |
| `override` | laws or register for every occasion of this intersection, with a reason |
| `open` | open questions (`Q-`) |

The `occasions` table in the body (occasion, name, time) is a convenience index; the files in the folder are the source.

## Rules

1. `nodes` holds at least two nodes and matches the id key (`LAW.check.x-key`, planned).
2. An intersection **holds no events**; events live in their own node and point to an occasion with `x` and `beat`.
3. Nodes never point at each other directly; they meet only at intersections. When one node must read another's definitions (FAM.T defines the family, PAST.T writes its past), the intersection declares it in `share`, and the reading node's events join an occasion of that intersection.
4. An occasion's participating nodes (generated from events) must be a subset of its intersection's `nodes`; an event from another node means the meeting belongs to a different intersection.
