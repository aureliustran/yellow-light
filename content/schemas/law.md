---
id: SCH.law
kind: schema
entity: law
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, aspect, basis, effective, applies-to, check, severity]
aliases: [schema.law]
sources:
  - "[[docs/framework/rules-engine|docs/framework/rules-engine.md]]"
  - "[[de-xuat/kien-truc-framework|kien-truc-framework.md §7]]"
---
# schema · law

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
check       human
severity    error
```

Body: the clauses (Vietnamese), one heading per clause with block id `^C<n>`.

## Fields

| Field | Meaning |
| --- | --- |
| `aspect` | **one** aspect |
| `basis` | the article it rests on (mandatory) |
| `effective` | one phase, or a range `P1 → P2`; a phase law expires when the next phase starts unless marked extended |
| `applies-to` | selector |
| `except` | selector → the more specific law that applies instead |
| `supersedes` | the law it replaces |
| `technique` | techniques in `lib/` that achieve it; a law never contains technique |
| `check` | `machine` (run by `canon:check`) or `human` |
| `severity` | `error` · `warn` · `info` |

## Rules

1. One law, one aspect.
2. Same aspect with overlapping scope needs `except`, `supersedes` or a more specific scope; otherwise error (`LAW.check.overlap`).
3. No technique inside a law; link to `lib/`. Every `technique` link must be answered by the technique's `serves` (`LAW.check.lib-basis`).
4. No story facts inside a law; read attributes from `world/`.
5. Every law has a `basis` (`LAW.check.basis`).
