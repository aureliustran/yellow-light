---
id: SCH.law
kind: schema
entity: law
status: proposed
updated: 2026-11-13
required: [id, kind, status, updated, aspect, tier, basis, effective, applies-to, check, severity]
aliases: [schema.law]
sources:
  - "[[docs/framework/rules-engine|docs/framework/rules-engine.md]]"
  - "[[de-xuat/kien-truc-framework|kien-truc-framework.md §7]]"
---
# schema · law

A law answers **what may or may not be written** `locked 13/11`: facts, disclosure, limits, names. How to write is a style ([schema](style.md)). Rules and laws are the same entity: `rules/` is its folder, `LAW` its kind; a node's decrees (`<node>.R<n>`) are laws scoped to the node.

A law is an **entity of its own**, not a block of text. One law applies to some targets; a target is under several laws. Semantics (hierarchy, selectors, how laws combine): [rules-engine](../../docs/framework/rules-engine.md).

**Location:** `rules/<aspect>/LAW.<aspect>.<scope>.md`; structural laws in `rules/check/`. **Id:** `LAW.<aspect>.<scope>`; clauses inline `LAW.<aspect>.<scope>.C<n>`.

## Shape

```
id          LAW.naming.pov-thuyen
aspect      naming
basis       [[ART.AX7.1]]
effective   OPEN → AFTER
applies-to  pov = CH.thuyen · channel = narration
except      PAST.T × span-1 → [[LAW.naming.past-t-span1]] · concealed part → [[LAW.conceal]]
supersedes  [[LAW.naming.legacy]]
technique   [[TEC.naming.transform]]
data        [[STO.ha-tinh]]
tier        cung | mem
check       human
severity    error
```

Body: the clauses (Vietnamese), one heading per clause with block id `^C<n>`.

## Fields

| Field | Meaning |
| --- | --- |
| `aspect` | **one** aspect |
| `tier` | `cung` (hard: makes an article concrete; nothing removes it) · `mem` (soft: a safe default; a narrower law replaces it with `supersedes` and a reason). Every law in [[LAW.default]] has one; node decrees are `mem` unless they restate an article |
| `basis` | the article it rests on (mandatory) |
| `effective` | one phase, or a range `P1 → P2`; a phase law expires when the next phase starts unless marked extended |
| `applies-to` | selector |
| `except` | selector → the more specific law that applies instead |
| `supersedes` | the law it replaces |
| `technique` | styles in `lib/` that help achieve it (optional); a law never contains technique |
| `data` | the store(s) it reads its list from (`[[STO.…]]`, [schema](store.md)); the law states the rule, the store holds the rows (13/11). Optional; must point to a store (`LAW.check.store`) |
| `check` | `machine` (run by `canon:check`) or `human` |
| `severity` | `error` · `warn` · `info` |

## Rules

1. One law, one aspect.
2. Same aspect with overlapping scope needs `except`, `supersedes` or a more specific scope; otherwise error (`LAW.check.overlap`).
3. No technique inside a law; how to write belongs to a style. A law may point to styles that help (`technique`); styles no longer have to serve a law (13/11).
4. No story facts inside a law; read attributes from `world/`, and lists (words, names, tables) from a store via `data`.
5. Every law has a `basis` (`LAW.check.basis`).
