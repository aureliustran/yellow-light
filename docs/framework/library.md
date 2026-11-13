---
id: SPEC.library
kind: spec
status: agreed
updated: 2026-11-13
sources:
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §7b (10/11)]]"
  - "tác giả 13/11 (gộp register, technique, pattern thành style; style mặc định R0; fallback theo tuyến, node; cảnh báo theo mức)"
---
# Library: style `locked 13/11`

`lib/` holds **style**: how to write. Laws in `rules/` hold what may or may not be written. Fields: `content/schemas/style.md`, `content/schemas/preset.md`.

## Boundary

| | **Law** (`rules/`) | **Style** (`lib/`) |
| --- | --- | --- |
| Answers | what may or may not be written | how to write |
| Object | content on the page: facts, disclosure, limits, names | form: sentence rhythm, word choice, scene shape, transitions |
| Test | "does this passage break it?" | "is it in character, at the right dose?" |
| When several apply | **accumulate**; a hard law is never removed, a soft one is replaced with `supersedes` | **nearest wins**, with fallback |

A form that must always hold (compound words, natural dialogue, present scenes never summarised, common transitions) stays a style with `force: bat-buoc`; it is not promoted to a law.

## One kind, three grains

| `grain` | Id | Is |
| --- | --- | --- |
| `bundle` | `REG.<name>`, alias `R0`–`R10` | a register (văn phong): markers, dose, transitions, samples; uses or forbids moves |
| `shape` | `PAT.<name>` | a pattern: the beats of a scene and which register or move each beat calls |
| `move` | `TEC.<aspect>.<name>` | a technique: steps, dials, failures |

```
lib/STY.default.md               the default style (preset)
lib/registers/REG.*.md           bundles, R0 = REG.default
lib/patterns/PAT.*.md            shapes
lib/<aspect>/TEC.<aspect>.*.md   moves
assets/samples/SMP-NNN.md        samples; raw humor material → assets/humor/
```

Registers: R0 default, R1 everyday and humor, R2 romance, R3 intimacy, R4 duel of wits, R5 cold enumeration, R6 recollection, R7 rock bottom, R8 ledger, R9 bitter, R10 interior (Vietnamese names in each file).

## The default style `locked 13/11`

[[STY.default]] is the top of every chain. Two parts:

| Part | Holds | Override |
| --- | --- | --- |
| hard (`required`) | moves with `force: bat-buoc` | never; only `except` with a reason |
| soft | register R0 ([[REG.default]]), pattern, moves with `force: mac-dinh` (`defaults`) | any storyline, node or event that names another; a register `forbids` a default move |

**R0 carries a constraint**: it is meant only for situations of low weight in the plot. To avoid R0, each storyline sets a default style, and nodes customise it; events inherit the style of their owner node, so the writer configures storylines and nodes, not events.

## Resolving the style of an event

Nearest wins, each layer inherits from the one above and overrides only what it names:

1. the event's `register` / `uses` (rare);
2. owner node × phase (`style` map in the node header, `## style` section);
3. owner node, any phase (`default` in the map);
4. parent nodes, up to the storyline root;
5. [[STY.default]]: register R0.

An event owned by an intersection: the intersection's own `style`, else the node that leads that beat (`config/levels.md` law 1). With neither, it is reported, never silently resolved to R0, because intersection beats are never low-weight.

Moves: the hard moves of the default are always on; then the default moves unless forbidden by the register in force; then the moves of the register, the nodes and the event.

Voice (how a character speaks) is a separate axis, from `CH.<id>.voice` and the node's `voice`; it layers on top of the register.

## Alert on R0 `locked 13/11`

When an event resolves to R0, `canon:check` reports it by the level of the owner node in the event's phase (`weight`, `config/levels.md`). Unknown phase: the node's highest level across phases.

| Level | Role | Report |
| --- | --- | --- |
| `C`, `D` | minor | `info` (R0 allowed, listed) |
| `A`, `B`, `pending`, none | support, unknown | `warn` |
| `S`, `SS`, `SS+`, `SSS` | main, lead | `error` |

## Checks

| Check | Fails when |
| --- | --- |
| `LAW.check.default-style` | an event resolves to R0 (severity by level, above) |
| `LAW.check.style-ref` | a storyline or node `style` map names a register that does not exist |
| `LAW.check.reg-conflict` (planned) | an event uses a move its register forbids, or a register forbids a `bat-buoc` move |

Devices of a character's inner machinery (old `TB-`) belong to that character (`FN.thuyen.*`), not to the library.
