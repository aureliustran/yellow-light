---
id: SCH.register
kind: schema
entity: register
status: dropped
updated: 2026-11-10
required: [id, kind, status, updated, aliases, applies-to, effective]
sources:
  - "[[docs/framework/library|docs/framework/library.md (10/11)]]"
  - "[[rules/registers|rules/registers.md]]"
---
# schema · register

**Bỏ 13/11** (tác giả): gộp vào kind `style` ([[schemas/style|schemas/style.md]]).

A register (văn phong): a voice bundle for narration or dialogue. See [library](../../docs/framework/library.md).

**Location:** `lib/registers/REG.<name>.md`. **Id:** `REG.<name>`; the old code `R1`–`R9` goes in `aliases`.

## Shape

```
id          REG.so-cai              aliases [R8, Sổ cái]
basis       [[ART.…]]               serves [[LAW.naming.pov-thuyen]]
effective   P1 → AFTER
applies-to  pov = CH.thuyen · channel = narration
uses        [[TEC.ledger.*]]        forbids [[TEC.naming.direct]]
```

## Sections

| Section       | Content                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| `markers`     | how it reads: sentence length, lexicon, punctuation, what is never there                   |
| `dose`        | how much per phase (table by phase)                                                        |
| `transitions` | table: to `[[REG.…]]` · allowed when · forbidden when · how (inline ids `REG.<name>.T<n>`) |
| `samples`     | links to `assets/samples/SMP-NNN`                                                          |

## Rules

1. A register uses or forbids techniques; it does not restate them.
2. Its scope (`applies-to`, `effective`) uses the law selector syntax.
3. Per-node and per-phase choice of register belongs to the node's `voice`, not here.
