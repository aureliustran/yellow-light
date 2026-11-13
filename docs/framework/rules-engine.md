---
id: SPEC.rules-engine
kind: spec
status: draft
updated: 2026-11-10
sources:
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §6, §7, §8.2 (10/11)]]"
---
# Rules engine

How rules are derived, scoped and combined. Fields: `content/schemas/article.md`, `content/schemas/law.md`.

## Hierarchy `agreed 06/11`

```
AX1 … AX9                 axes (core/)
  │ split into
ART  constitution          invariant articles, one chapter per axis + chapter 0 (form, display, address, dialect, under-18, structure)
  │ derived per phase      from the stage of the beliefs carrying the axis and the phase's lead node
LAW  phase law             how an article shows at OPEN, P1, P2, BREAK, AFTER, POST
  │ made concrete
DECREE                     a node's or an intersection's own rules (inline, `<node>.R<n>`)
  │
OVERRIDE                   on one event, with a reason
```

A lower tier only makes a higher tier concrete; it never contradicts it. To go against an article, change the article (a decision `D-`). Articles cannot be overridden.

**Deriving a law.** Article × the stage, in that phase, of the beliefs that carry the axis (scales dropped 13/11) × the phase's lead node → Claude drafts `proposed` → the author approves → `locked`. A belief changes stage only through an event whose `belief-out` says so (replaces "steps never go back" and `LAW.check.exl-monotonic`, dropped 13/11).

## Law semantics `agreed 06/11`

- **One aspect per law** (naming, swearing, address, dialect, under-18, display, dose, …). Folder `rules/<aspect>/`.
- **Basis is mandatory**: an article `ART.*` (`LAW.check.basis`).
- **Effective**: one phase, or a range (`P1 → P2`). A phase law expires when the next phase starts unless marked as extended.
- **No story facts**: a law reads attributes from `world/` (ages, identities), never restates them.
- **No technique**: a law links to the library (`technique: [[TEC.*]]`); see [library.md](library.md).
- **The law owns its scope.** Links law ↔ target live in the law file; a target sees its laws through the generated view `_views/rules-for/<id>.md` and backlinks.

## Selectors `agreed 06/11`

`applies-to` and `except` select targets by: `kind`, `id`, storyline, phase, `pov`, `channel` (`dialogue`, `narration`, `chat`), `register`, who is present, and attributes of present characters. Example: `LAW.under-18` applies to every event with a participant under 18, computed from `world/` identity and `config/calendar.md`.

## Resolving the laws of a target `proposed 10/11`

For an event (or a scene, a node), the applicable set is:

1. every law whose `applies-to` matches and whose `effective` covers the target's phase;
2. plus the decrees of every ancestor node and of the intersection the event belongs to;
3. minus laws excluded by a matching `except` (which points to the more specific law that applies instead);
4. minus laws replaced through `supersedes`;
5. then the event's own `override` entries, each with a reason.

Laws **accumulate**; closeness does not make one law win over another. Two laws of the same aspect with overlapping scope must be ordered by `except`, `supersedes` or a more specific scope; otherwise it is an error (`LAW.check.overlap`). An override without a reason, or of an article, is an error (`LAW.check.override-reason`).

The result is written into the event's resolved block (see [storylines.md](storylines.md)) and into write-kits (see [blueprints.md](blueprints.md)).

## Checking

A law with `check: machine` is run by `canon:check` on exactly its scope; `check: human` laws are listed in write-kits and audits. Structural laws (`LAW.check.*`) live in `rules/check/` and are listed in [tooling.md](tooling.md).
