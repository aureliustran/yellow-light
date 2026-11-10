---
id: SCH.node
kind: schema
entity: node
status: proposed
updated: 2026-11-10
required: [id, kind, parent, status, updated, participants, axes]
aliases: [schema.node]
sources: [docs/framework/storylines.md, kien-truc-framework.md §8.1]
---
# schema · node

A **dynamic** entity: a thread with people and events in time, serving at least one axis. Storylines (`ROM`, `PAST`, …) and `SELF.<id>` are nodes too. See [storylines](../../docs/framework/storylines.md).

**Location:** every node is a **folder** named by its id, holding its definition file `<NODE>/<NODE>.md` `proposed 10/11`. A child node is a subfolder of its parent's folder (`storylines/ROM/ROM.TN/ROM.TN.md`; `PAST/PAST.N/PAST.N.HD/PAST.N.HD.md`). Events are the last level of entity: plain files inside the folder of the node that owns them (`storylines/PAST/PAST.T/PAST.T-001.md`); an event is never a folder. **Nesting has no fixed depth:** a node may spawn and contain child nodes, which may contain their own, until the event, which is always the bottom entity. Intersections are folders too, under `storylines/intersections/` ([schema](intersection.md)). **No child id may differ from its parent's definition file only by letter case** (Windows folders are case-insensitive): `THR/THR.md` and a folder `THR/THR.MD/` collide; hence `THR.MD` was renamed `THR.MODEL` (10/11, old id kept as alias). The tree root `TREE` is `storylines/README.md`. **Id:** `ROM.TN`, `PAST.N.HD`, `SELF.thuyen` (registry: [ids](../../docs/framework/ids.md)).

Header: `parent` (exactly **one**), `participants` (links to `CH.`, `GRP.`, `SET.`), `axes`.

## Sections

| Section | Content |
| --- | --- |
| `arc` | one paragraph: where it starts, where it ends, what changes in the people |
| `goals` | inline goals `<node>.G<n>` (schemas/goal.md), each `serves` a goal of the parent |
| `weight` | level per phase (`config/levels.md`): `OPEN`, `P1`, `P2`, `BREAK`, `AFTER`, `POST`. **The node owns this value** |
| `mirror` | the contrast the relationship runs on (premise, `pairs`, `meeting`, `crossing`, `breaks`, `samples`). **Depends one way on the participants' beliefs and functions**: it links to them, they never link back. Edit a belief in its character package; the mirror only assembles `agreed 10/11` |
| `relation` | per phase × direction: what they are to each other, who knows what, step on `SCALE.rom` / `SCALE.exl` |
| `state` | attributes this node owns, per person × phase |
| `voice` | per person × phase: narration register (`REG.*`), dialogue voice |
| `rules` | decrees: the node's own laws, inline `<node>.R<n>` (law shape, scope limited to the node) |
| `events` | **generated** table of the event leaves |
| `transitions` | generated: which value changes at which event |
| `gaps` | goals or phases with no event yet |

## Rules

1. **One owner per attribute.** Relations → the relation's node; inner state → `SELF.<id>` (`LAW.check.owner`).
2. A child node never outweighs its parent in the same phase; a storyline's level is the highest of its children (`LAW.check.level-parent`).
3. Voice cascade: event > node × phase > `SELF` × phase > base voice (`CH.<id>.voice`).
4. A node never reads another node directly; only through `world/` or an intersection.
5. One parent per node; many-to-many goes through intersections.
