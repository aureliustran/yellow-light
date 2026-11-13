---
id: SPEC.model
kind: spec
status: draft
updated: 2026-11-10
sources:
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §0, §2, §4, §5, §8.1]]"
---
# Model

How entities fit together. Fields of each kind are defined in its schema under `content/schemas/`; this file never repeats them.

## Layers `agreed 06/11`

| Layer | Folder | Holds | May reference |
| --- | --- | --- | --- |
| L0 foundation | `config/`, `schemas/` | constants of the story (calendar, phases, levels, statuses); entity models | nothing |
| L1 core | `core/` | axes `AX`, shared mechanics, the constitution `ART` | L0 |
| L1.5 rules | `rules/` | laws `LAW` | L0, L1 |
| L1.5 library | `lib/` | style: registers `REG`, patterns `PAT`, techniques `TEC`; preset `STY.default` | L0, L1, rules |
| L2 world (static) | `world/` | characters, settings, objects, secrets, beliefs, value systems, functions | L0–L1.5 |
| L3 storylines (dynamic) | `storylines/` | storylines, nodes, goals, events, intersections | L0–L2 |
| L4 plans | `plans/` | editions, chapter blueprints, scenes | L0–L3 |
| Output | `posts/` | published chapters, cross-posts | nothing (text only) |
| Cross-cutting | `canon/`, `proposals/`, `audits/`, `assets/` | decisions, questions, proposals, audits, samples, research | anything |
| Generated | `_views/`, `symbols.md`, resolved blocks | views, indexes | (written by tooling only) |

**Direction.** A layer references only layers above it in this table. Dynamic points to static, never the reverse; reverse lookups (who uses this character, which laws apply here) are generated views. L0–L4 never depend on `proposals/`. `LAW.check.layer` enforces this.

## Kinds

One line per kind; the schema is the source of truth. Ids follow [ids.md](ids.md).

| Kind | Id | Lives as | Schema |
| --- | --- | --- | --- |
| axis | `AX3` | `core/axes/AX3.md` | `schemas/axis.md` |
| article | `ART.AX3.1` | inline in `core/constitution/ART.AX3.md` | `schemas/article.md` |
| law | `LAW.<aspect>.<scope>` | file | `schemas/law.md` |
| style (`grain` bundle · shape · move) | `REG.<name>` · `PAT.<name>` · `TEC.<aspect>.<name>` | file | `schemas/style.md` |
| preset | `STY.default` · `LAW.default` | file | `schemas/preset.md` |
| character | `CH.<name>` | package folder | `schemas/character.md` |
| setting | `SET.<name>` | file | `schemas/setting.md` |
| object | `OBJ-NNN` | file or inline | `schemas/object.md` |
| secret | `SEC-NNN` | file | `schemas/secret.md` |
| belief | `B.<char>-<NNN>` | one file in `beliefs/` of the character package | `schemas/belief.md` |
| value | `V.<char>-<NNN>` | one file in `values/` of the character package | `schemas/value.md` |
| function | `FN.<character>.<name>` | file in the character package | `schemas/function.md` |
| storyline | `ROM`, `PAST`, … | file | `schemas/node.md` |
| node | `ROM.TN`, `PAST.N.HD`, `SELF.thuyen` | file | `schemas/node.md` |
| goal | `ROM.TN.G2` | inline in its node | `schemas/goal.md` |
| event | `ROM.TN-014` | file (leaf of the node) | `schemas/event.md` |
| intersection | `X-005` | folder | `schemas/intersection.md` |
| edition | `ED.v2` | file in `plans/` | `schemas/edition.md` |
| blueprint | `BP.v2.05` | file in `plans/chapters/` | `schemas/blueprint.md` |
| scene | `BP.v2.05.S2` | inline in its blueprint | (with blueprint) |
| chapter (post) | `POST.v2.05` | chapter file in `posts/`; record is a row in the edition file | `schemas/chapter.md` |
| decision · question | `D-031` · `Q-045` | inline in `canon/` | (planned) |
| proposal · audit | `PROP-012` · `AUD-003` | file | `schemas/proposal.md` |
| range plan | `PLAN.v2.06-10` | file in `plans/` | `schemas/plan.md` |
| config · schema · spec · guide | `CFG.*` · `SCH.*` · `SPEC.*` · `GUIDE.*` | file | `schemas/config.md` · `schema.md` · `spec.md` · `guide.md` |

## Ownership `agreed 05/11`

Every value has exactly one owner; everywhere else links to it by id. `LAW.check.owner` enforces this.

| Value | Owner |
| --- | --- |
| identity, purpose, attribute *definitions* and their value sets | the `world/` entity |
| attribute *values* over time | the node that owns that attribute |
| inner state of a character | `SELF.<id>` |
| relation state between characters | the relation's node (e.g. `ROM.TN`) |
| which chapter shows an event, and in which role | the blueprint |
| scope of a law | the law file (`applies-to`, `except`) |
| goal of a node | the node; goals of events point up with `serves` |
| everything inherited by an event | nobody: resolved by tooling, never stored |

A node never reads another node directly. Values cross nodes only through `world/` (static) or an intersection `X.` (dynamic); causality across nodes is the event field `causes`.

## Static vs dynamic `agreed 05/11`

`world/` declares *what can vary* (an attribute and its allowed values, e.g. `cai-toi-doc ∈ {ngu, thuc-co-dieu-kien, …}`). `storylines/` records *what it is at a given time*. Phases (`OPEN`, `P1`, `P2`, `BREAK`, `AFTER`, `POST`) are the time dimension; levels (`D` … `SSS`) are the weight of a node per phase.

A character is a package: main file (identity, purpose, attributes, exports), beliefs, base voice, mechanics (function signatures, one file per function). Crowd characters are rows in the `members` section of the node that owns them (a group is a node, e.g. `SOL.HD`; `GRP.` dropped 11/11).

## Axis → belief → value `locked 13/11`

**Chain.** The writer defines the axes (`AX`) directly. From an axis the writer designs a character's **beliefs**, bending the axis by the character's personality and by the purpose the character is built for. From its beliefs the character forms a **value system**. `PAST` writes the events that make the beliefs form on the page; present-time storylines consume beliefs and values.

```
AX (core) ─► belief (world) ─► value system (world) ─► tactics ─► method (FN, world)
PAST events: form beliefs          present events: consume beliefs and values
```

**Loop.** One turn of the loop is one event:

```
reflection ─► BELIEF ─► VALUE ─► tactics ─► ACTION (built from innate functions and methods) ─► result ─► reflection ─► new belief, upgraded belief, or changed belief
```

**Boundary.** The two are different things, defined by where they stand in the loop.

| | Belief | Value |
| --- | --- | --- |
| Position | after a result: the output of reflection | before an action: the input of a choice |
| Answers | "what does that mean?" | "what do I choose now?" |
| Form | a claim about self, others or the world: "X is so" | a comparison: "X is worth more than Y", "when A, choose B" |
| Fails by | being **false** (hence "half true", "false in") | never false; only **costly**, or in **conflict** with another value |
| Changes by | reflection on a result | never directly; recomputed when a source belief changes |
| Used | inward: monologue, self-reflection | outward: decisions, problem solving, dealing with other people |
| On the page | thought, when `seen` allows | choices and behaviour, always visible |
| Awareness | may be blind (`seen: khong`) | the character always sees what it chose, but may give the wrong reason (a value fed by a blind belief) |

**Three tests** for a sentence: (1) can it be false? then it is a belief; if one can only ask "was it worth it?", it is a value. (2) Is it thought after something happened (belief) or used at the moment of choosing (value)? (3) Two characters with the same belief can still choose differently; the part that differs is the value.

**Rules.**
1. A value has `from`, at least one belief. A belief never points to a value (`LAW.check.value-from`, `LAW.check.belief-value`).
2. A result never edits a value. It passes through reflection, changes a belief, and the value is recomputed.
3. Two values in conflict are settled by `rank`. Two beliefs in contradiction may coexist: that is material for monologue.
4. Functions (`FN`) have two types `locked 13/11`. `innate`: a capacity or effect the character is born with; it comes from no value. `method`: a way of coping the character has learned for specific cases (a function, a coping thought, an action); it is produced by the tactics of a value and has `from` pointing to that value (`LAW.check.method-from`). Before the first belief exists, innate functions act in place of values; the result meeting the wound yields the first misconception (`ngo-nhan`).
5. A blind belief still feeds values and shows in behaviour, but reflection cannot reach it, so it cannot be upgraded until the story opens it.
6. Reflection has a tool and limits per character (for Thuyên: the lens [[FN.thuyen.lang-kinh]], and the `blind` section of his value system).
7. A value's tactics produce methods. Coping material found inside a belief (a habit of action, a coping thought, a way of deceiving oneself) is migrated to a method; the belief keeps only its claim, or only its number when no claim remains.
8. **An action is designed from several functions** `locked 13/11`: one action in an event may combine any number of innate functions and methods; the event lists them in `calls`.

**Scales dropped** `locked 13/11`: beliefs and values describe a character's inner progression better than a numbered scale. The existential scale became the belief field `age`, the `existential` section of the character's voice (sentence shapes by age) and `rules/hien-sinh.md` (three writing rules). The pride scale is read from the attribute `cai-toi-doc` and the belief field `amplified`. The scale of how far Nhi likes Thuyên became the `nac-thich` section of `ROM.TN`. The event field `level` is gone; an event names beliefs and their stage in `beliefs`.

Schemas: `schemas/belief.md`, `schemas/value.md`, `schemas/function.md`; loop fields of an event: `schemas/event.md`.

## Common header

Every entity file starts with a frontmatter header (`id`, `kind`, `status`, `updated`, and the kind's own fields), then a one-sentence summary and a key index, within about 20 lines. Empty sections are written as `none`, never omitted. Exact fields: the kind's schema.

## Status and priority

`status` values and their meaning: `content/config/statuses.md`. When two sources disagree, the higher one wins: published chapter (`page`) > newer `locked` > older `locked` > `agreed` > `proposed` > `raw`. A conflict that cannot be settled this way is marked `conflict` and becomes a question `Q-`.
