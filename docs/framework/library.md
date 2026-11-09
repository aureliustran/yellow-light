---
id: SPEC.library
kind: spec
status: draft
updated: 2026-11-10
sources: [content/de-xuat/kien-truc-framework.md §7b (10/11)]
---
# Library: registers, techniques, patterns `proposed 10/11`

`lib/` mirrors `rules/`: same aspects, same selector syntax (`applies-to`, `effective`, `except`), so one engine answers "what applies here". Fields: `content/schemas/register.md`, `technique.md`, `pattern.md`.

**Boundary.** A **law** says *what must hold* (pass or fail). A **register**, **technique** or **pattern** says *how to get there* (a choice, with a dose and samples). When a practice becomes mandatory it is promoted to a law, and the law links down to the technique.

| Kind | Id | Is | Distinctive parts |
| --- | --- | --- | --- |
| register (văn phong) | `REG.<name>`, alias `R1`–`R9` | a voice bundle | markers, dose per phase, techniques used / forbidden, transitions to other registers, samples |
| technique | `TEC.<aspect>.<name>` | sentence- and paragraph-level method | serves ≥1 law or register; steps, dials, failure modes, check, samples |
| pattern | `PAT.<name>` | beat or scene shape | beats (inline `.B<n>`), slots (which register or technique each beat calls) |

## Tree

```
lib/registers/REG.*.md
lib/<aspect>/TEC.<aspect>.*.md      same aspect names as rules/, plus humor/ senses/ inference/ interiority/
lib/patterns/PAT.*.md
assets/samples/SMP-NNN.md           samples; raw humor material → assets/humor/
```

The nine registers: humor, romance, intimacy, duel of wits, cold enumeration, recollection, rock bottom, ledger, bitter (Vietnamese names in each file).

## Links and precedence

- A law declares `technique: [[TEC.*]]`; the technique declares `serves: [[LAW.*]]` (or a register). Both sides must agree.
- A technique's scope stays inside the scope of the law it serves.
- Order: `ART → LAW → REG/TEC/PAT → node decree (voice, chosen techniques) → event override`.
- Devices of a character's inner machinery (old `TB-`) belong to that character (`FN.thuyen.*`), not to the library.

## Checks

| Check | Fails when |
| --- | --- |
| `LAW.check.lib-basis` | a technique or pattern serves no law or register |
| `LAW.check.lib-scope` | a technique's scope exceeds the law it serves |
| `LAW.check.reg-conflict` | an event uses a technique its register forbids |
| `LAW.check.technique-gap` (info) | a `check: human` law has no technique |
