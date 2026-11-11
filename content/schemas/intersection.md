---
id: SCH.intersection
kind: schema
entity: intersection
status: proposed
updated: 2026-11-11
required: [id, kind, status, updated, nodes]
aliases: [schema.intersection]
sources: [kien-truc-framework.md §8.3, tác giả 10/11, 11/11]
---
# schema · intersection

A **meeting of nodes**: a hyperedge, not a node. It sits outside the node tree and is **defined by foreign keys** to two or more nodes, of any depth (`ROM.TN`, or a root such as `PAST`). See [storylines](../../docs/framework/storylines.md#intersections).

**Location:** a folder `storylines/intersections/X-NNN/` holding its definition file `X-NNN.md` and its event leaves `X-NNN-NNN.md` (the same shape as a node). **Id:** `X-NNN`, its own number, not built from the keys `proposed 11/11`. One set of nodes has exactly one intersection (`LAW.check.x-unique`, planned): a new meeting of the same nodes is a new event in the existing intersection, not a new intersection.

## Stored

| Field | Meaning |
| --- | --- |
| `nodes` | `[[node]]` links, at least two: the foreign keys. A different set of nodes is a different intersection |
| `share` | optional: which section of which node is readable through this intersection, and by whom (`[[FAM.T]] relation → [[PAST.T]]`). The only way a node reads another node's definitions |
| `goals` | the intersection's own goals `X-NNN.G<n>`: goals that are not part of any single node's goal |
| `seed` | old meetings carried over without a goal yet (old codes as aliases) |
| `override` | laws or register for every event of this intersection, with a reason |
| `open` | open questions (`Q-`) |

## Ownership of events `proposed 11/11`

An event belongs to the goal it serves, not to who is in it:
1. If its purpose is part of one node's goal, it is a leaf of **that node**, even when people of other nodes take part (a flashback about the family that serves `PAST.T` is a `PAST.T` leaf).
2. If its purpose is not part of any single node's goal, it is a leaf of the **intersection**, and only once the intersection has a goal of its own for it to serve.

## Rules

1. `nodes` holds at least two nodes; no two intersections share the same set.
2. Nodes never point at each other directly; they meet only at intersections. A node reads another node's definitions only through a `share` of an intersection both belong to.
3. An intersection event's `goal` serves a goal of the intersection (`LAW.check.goal-chain`); the people in it come from the intersection's `nodes`.
4. Causality across nodes is the event's `causes`.
