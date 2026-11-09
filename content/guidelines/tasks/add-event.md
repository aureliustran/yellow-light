---
id: GUIDE.task.add-event
kind: guide
status: draft
updated: 2026-11-10
sources: [docs/framework/storylines.md, schemas/event.md]
---
# Task: add or change an event

## Input
What happens; the node it belongs to; the goal it serves.

## Steps
1. Find the owner node (placement guide, row 15). One node only; other nodes refer to the event by id.
2. Pick the next free id `<node>-NNN`.
3. Create `storylines/<storyline>/<NODE>/<NODE>-NNN.md` from `schemas/event.md`: declare only the event's own fields. Set `goal: serves [[<node>.G<n>]]`; if no parent goal fits, stop and ask (the parent's goals change first).
4. Inherit by default: write `register`, `uses` only when this event differs from its node; write `override` only with a reason.
5. Record effects as `changes` (attributes, relations, secrets) and cross-node causality as `causes`. Do not write the chapter: blueprints own that.
6. Status `proposed` unless the author decided it.
7. Run `canon:check`; it writes the resolved block. Read it: laws, register and state-in must make sense.

## Output
One event file with its resolved block.

## Checks
Goal chain valid; no value written outside its owner; no secret used before its holder knows it; `canon:check` clean.

## Stop and ask
The event changes canon (new fact, relation step, secret reveal) and the author has not decided it: write it `proposed` and ask.

## Transitional
Until the node is migrated, events are rows in `tuyen/` module tables: add the row there with the old columns and tell the author it will become a leaf at migration.
