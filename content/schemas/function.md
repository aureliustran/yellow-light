---
id: SCH.function
kind: schema
entity: function
status: proposed
updated: 2026-11-13
required: [id, kind, status, updated, parent]
aliases: [schema.function]
sources:
  - "[[de-xuat/kien-truc-framework|kien-truc-framework.md §5]]"
---
# schema · function

A **mechanism** of one character, written like a function with a signature. An agent reads `in` and `when` to know when to call it, without reading the whole machine.

**Location:** `world/characters/<id>/mechanics/FN.<id>.<name>.md`. **Id:** `FN.<id>.<name>`. Header `parent: [[CH.<id>.mechanics]]`.

## Shape

```
in        trigger ∈ {K1 harmless court, K2 worthy opponent showing contempt, K3 force needed, K4 the pain surfaces}, license?
when      attribute cai-toi-doc ≠ ngu
body      voice (REG.dang block, calls the boy "mày") → translator → rule-of-the-game channel → shutdown ritual
out       translated line + overreaching action within the rules
effects   consequences written in REG.so-cai; people nearby uneasy without knowing why
uses      [[B.thuyen-014]], [[B.thuyen-029]], [[REG.so-cai]], [[REG.dang]], [[LAW.swearing.density]]
render    DV-…; writing laws of the function
```

## Fields

| Field | Meaning |
| --- | --- |
| `in` | parameters and calling conditions, with value sets |
| `when` | attribute conditions under which it works (from the character's `attributes`) |
| `body` | steps, one per line |
| `out` | what it produces on the page |
| `effects` | consequences; attribute changes |
| `uses` | imports: beliefs, registers, laws, other functions |
| `render` | how it reaches the page: devices `DV-`, writing laws, links to `lib/` (`none` if nothing) |

## Types `locked 13/11`

Header field `type`:

| Type | Meaning | `from` |
| --- | --- | --- |
| `innate` | a capacity or effect the character is born with (observation, a nervous system, a gift) | none |
| `method` | a way of coping learned for specific cases: a function, a coping thought, an action. Produced by the tactics of a value | required: `[[V.<id>-NNN]]`, at least one |

The case a method answers is its `in`. A method points to its value; the value's `tactics` mirrors that list. Chain: axis → belief → value → tactics → method ([[docs/framework/model|model]] *Axis → belief → value*). A function with no `type` is not yet classified.

## Rules

1. **One function per file**; its signature also has one line in `CH.<id>.mechanics.md`.
2. A function has **no date**. Who calls it and when is the event's `calls`.
3. A function holds no general technique (→ `lib/`) and no general law (→ `rules/`); it only `uses` them.
4. Everything in `uses` must exist (`LAW.check.resolve`).
5. Devices of the character's inner machinery (old `TB-`, now `DV-NNN`) are functions or parts of functions here, not library entries.
6. An action in an event may be built from several functions, innate and method together; the event's `calls` lists them all.
