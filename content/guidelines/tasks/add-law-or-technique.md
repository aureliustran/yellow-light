---
id: GUIDE.task.add-law-or-technique
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[docs/framework/rules-engine|docs/framework/rules-engine.md]]"
  - "[[docs/framework/library|library.md]]"
  - "[[schemas/law|schemas/law.md]]"
  - "[[schemas/technique|technique.md]]"
---
# Task: add a law, a register, a technique or a pattern

## Decide which
Must hold (pass/fail) → **law**. A voice bundle → **register**. A method → **technique**. The shape of a beat or scene → **pattern**. A mandatory method is a law that links to a technique.

## Steps for a law
1. Find its basis: an article `ART.*`. No article fits → stop and ask (the constitution changes first).
2. One aspect; scope with `applies-to`, `effective`, `except`. Search laws of the same aspect; if scopes overlap, order them (`except`, `supersedes`, or narrower scope).
3. Clauses in Vietnamese, one heading per clause (`^C<n>`). No technique, no story facts.
4. Link `technique` to existing techniques, or create them (below).
5. `check: machine` only if `canon:check` can run it; otherwise `human`.

## Steps for a technique, register or pattern
1. Name what it `serves` (a law or register). Its scope stays inside that.
2. Fill the schema sections (steps or beats, dials, failures, samples). Samples go to `assets/samples/SMP-NNN`.
3. Add it to the served law's `technique` (or the register's `uses`).

## Output
The new entity, linked both ways.

## Checks
`LAW.check.basis`, `overlap`, `lib-basis`, `lib-scope`; `canon:check` clean.

## Stop and ask
New laws are `proposed` until the author approves. Articles are never written without the author's root sentence.
