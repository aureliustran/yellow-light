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
1. Find the owner node (`content/guidelines/placement.md`, row 15). One node only; other nodes refer to the event by id.
2. Pick the next free id `<node>-NNN`.
3. **Check it against the page:** grep `content/posts/vercel/` for the participants around the date. Anything the published chapters contradict (people who have not met yet, no way to contact each other, wrong time of day) → write the event `proposed`, open a `Q-`, and report it.
4. Create `content/storylines/<storyline>/<NODE>/<NODE>-NNN.md` from `content/schemas/event.md`: declare only the event's own fields. Set `goal: serves [[<node>.G<n>]]`; if no parent goal fits, stop and ask (the parent's goals change first).
5. Inherit by default: write `register`, `uses` only when this event differs from its node; write `override` only with a reason.
6. Record effects as `changes` (attributes, relations, secrets) and cross-node causality as `causes`. Do not write the chapter: blueprints own that.
7. Status `proposed` unless the author decided it.
8. Run `canon:check`. Once resolved blocks are built it writes one; read it: laws, register and state-in must make sense. Until then, check the node's laws and register by reading.

## Output
One event file with its resolved block.

## Checks
Consistent with published chapters; goal chain valid; no value written outside its owner; no secret used before its holder knows it; `canon:check` clean.

## Stop and ask
The event changes canon (new fact, relation step, secret reveal) and the author has not decided it: write it `proposed` and ask.

## Transitional
Follow the transitional table in `content/GUIDELINES.md` (old table row, old columns and labels, old id convention; goals optional). Tell the author it will become a leaf at migration.
