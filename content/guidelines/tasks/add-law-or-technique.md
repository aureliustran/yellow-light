---
id: GUIDE.task.add-law-or-technique
kind: guide
status: draft
updated: 2026-11-13
sources:
  - "[[docs/framework/rules-engine|docs/framework/rules-engine.md]]"
  - "[[docs/framework/library|library.md]]"
  - "[[schemas/law|schemas/law.md]]"
  - "[[schemas/style|schemas/style.md]]"
---
# Task: add a law or a style

## Decide which `locked 13/11`
What may or may not be written (facts, disclosure, limits, names) → **law**. How to write → **style**: a voice bundle (`grain: bundle`, register), the shape of a beat or scene (`grain: shape`, pattern), a sentence or paragraph method (`grain: move`, technique). A form that must always hold is a `move` with `force: bat-buoc`, added to [[STY.default]]; it is not a law.

Before adding anything for one storyline or node, check whether the node's `style` or `laws` section is the right place: settings shared by every event of a node live there, not on each event.

## Steps for a law
1. Find its basis: an article `ART.*`. No article fits → stop and ask (the constitution changes first).
2. One aspect; `tier` (`cung` makes an article concrete, `mem` is a replaceable default); scope with `applies-to`, `effective`, `except`. Search laws of the same aspect; if scopes overlap, order them (`except`, `supersedes`, or narrower scope).
3. Clauses in Vietnamese, one heading per clause (`^C<n>`). No technique, no story facts.
4. A law for every event goes into [[LAW.default]] (`hard` or `soft`); a law for one node is a decree in its `laws` section.
5. `check: machine` only if `canon:check` can run it; otherwise `human`.

## Steps for a style
1. Pick `grain` and `force`; scope with `applies-to`, `effective`.
2. Fill the sections of its grain (`schemas/style.md`). Samples go to `assets/samples/SMP-NNN`.
3. A bundle lists the moves it `uses` or `forbids`; it cannot forbid a `bat-buoc` move.
4. Choose it where it is used: the `style` of a storyline or node, or (rarely) an event.

## Output
The new entity, linked from where it is used.

## Checks
`LAW.check.basis`, `overlap`, `style-ref`, `default-style`; `canon:check` clean.

## Stop and ask
New laws and styles are `proposed` until the author approves. Articles are never written without the author's root sentence.
