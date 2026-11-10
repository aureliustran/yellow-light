---
id: SPEC.storylines
kind: spec
status: draft
updated: 2026-11-10
sources: [content/de-xuat/kien-truc-framework.md §8.1–§8.3; decisions 10/11]
---
# Storylines

Fields: `content/schemas/node.md`, `goal.md`, `event.md`, `intersection.md`.

## Tree `agreed 05/11 · leaves proposed 10/11`

```
storyline (ROM)
└── node (ROM.TN)                one parent each
    ├── child node (…)           a child never outweighs its parent in the same phase
    └── event (ROM.TN-014)       leaf: the last level of the tree
```

Each node has exactly one parent. Many-to-many links between nodes go through intersections, never through extra parents. `SELF.<id>` is the node for a character's inner state.

## Node `agreed 05/11`

A node is a dynamic entity: a thread with people and events in time, serving at least one axis. It owns: its arc, its weight per phase, the relations and state it owns (per person × phase), its voice per person × phase, its decrees, and its **goals**. Its events table is a generated view of its leaves.

**Goals** `proposed 10/11`. A node lists goals as inline entities `<node>.G<n>`. Each goal `serves` a goal of the parent node; the roots serve axes. Goals decompose down the tree to events.

## Event: the leaf `proposed 10/11`

An event is one file inside its node's folder: `storylines/…/<NODE>/<NODE>-NNN.md`. Every node is a folder named by its id, holding `<NODE>.md` and its child-node subfolders; events are the last level and are always files. It is the unit that decides *content*: what must be written, when, for which goal, under which laws, in which way. Who writes it is decided by the blueprint scene that shows it.

**Declare little, resolve the rest.** The file has two parts:

1. **Declared** (written by the author or an agent): only what is the event's own (time, goal and done-when, participants, place, what happens, functions called, what must be shown or hidden, axis and level, cost, intersection beat, causes, changes) plus explicit overrides (`register`, `uses`, `override`) where it differs from what it inherits.
2. **Resolved** (written by tooling, at the end of the same file, in a block marked `<!-- SINH -->`): path from the root, phase and ages, goal chain, state before the event, applicable laws, effective register, voices, techniques and patterns in force, and where the event appears (blueprint, scene, role). Never edited by hand (`LAW.check.resolved-fresh`).

An agent reading one event file has everything it needs.

The event→chapter link is not stored on the event; blueprints own it ([blueprints.md](blueprints.md)).

## Inheritance `proposed 10/11`

| What | Rule | How to deviate |
| --- | --- | --- |
| preferences: register, voice, pattern | nearest wins: event > node × phase > `SELF` × phase > base voice of the character | write the new value in the event |
| laws | accumulate (see [rules-engine.md](rules-engine.md)) | `override` with a reason; articles never |
| goals | decompose: an event's goal `serves` a goal of its parent node | none; change the parent |

Checks: `LAW.check.goal-chain` (an event's goal serves a goal of its own parent), `LAW.check.goal-coverage` (a node goal with no serving event is reported as a gap), `LAW.check.override-reason`, `LAW.check.resolved-fresh`.

## Intersections `agreed 05/11`

An intersection `X-NNN` is an occasion several nodes write into: a hyperedge, outside the node tree, with its own tree of spans containing occasions. Events join it with `x` and `beat`.

- **Stored:** id, kind (`event`, `span`, `info`), parent, time, place, override, open questions.
- **Generated:** participating nodes; beat table (by `beat`); beat holder (the node with an event in that beat and the highest level; on a tie, the owning node); POV; register; level of the occasion; who knows what before and after (from `changes` on secrets); outcome.

Causality across nodes is the event field `causes`, not an intersection.

## Story rules

The story-level rules of the tree (deploying the root, generating threads, continuity of `level`) live with the content, in `content/storylines/README.md` (id `TREE`). This spec only defines the mechanics.

## Generated views

Node events table · `_views/X-NNN.view.md` (beats, knowledge ledger) · `_views/matrix.md` (level, role, register per node × phase) · `_views/CH.<id>.view.md` (a character across all nodes per phase) · `canon/bible.md` (every `locked` line by tree).
