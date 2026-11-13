---
id: SPEC.ids
kind: spec
status: draft
updated: 2026-11-10
sources:
  - "[[config/ids|content/config/ids.md §0 (10/11)]]"
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §3]]"
---
# Ids `proposed 10/11`

Every entity that can be pointed at has an id, including inline entities (goals, scenes, clauses, beats, steps). Old → new code mapping (migration data) stays in `content/config/ids.md`.

## Four forms

| Form | When | Examples |
| --- | --- | --- |
| `KIND.name` | named entity | `CH.thuyen`, `REG.so-cai`, `LAW.naming.pov-thuyen` |
| `KIND-NNN` | globally numbered register | `SEC-003`, `D-031` |
| `B.<char>-<NNN>` | belief, numbered within its character | `B.thuyen-024`, `B.nhi-006` |
| `V.<char>-<NNN>` | value (one criterion of the character's value system), numbered within its character | `V.thuyen-001` |
| `parent.local` | child living inside its parent | `ROM.TN.G2`, `BP.v2.05.S2`, `PAST.N.HD` |
| `parent-NNN` | ordered child | `ROM.TN-014` |

`.` means "inside", `-NNN` means "n-th member".

## Segments

An id is segments joined by `.`. Each segment is either a **code** (`[A-Z][A-Z0-9]*`) or a **name** (`[a-z0-9][a-z0-9-]*`); no mixed case inside one segment. The first segment is the kind code. Later segments may be codes or names at **any level**: `ROM.TN`, `PAST.N.HD`, `FN.thuyen.phong-kin` are all valid; uppercase is not reserved for the top level.

```
SEG = [A-Z][A-Z0-9]* | [a-z0-9][a-z0-9-]*
ID  = [A-Z][A-Z0-9]* (\.SEG)* (-[0-9]{3})? (\.SEG)*        → LAW.check.id-grammar
```

Numbers in `-NNN` are always three digits. Shorter old codes (`BL-24`, `X-09`, `DV-7`) are kept as aliases. Names of story things keep Vietnamese ASCII (`thuyen`, `phong-kin`), like domain variable names.

## Case

Ids are case-sensitive: `ROM.TN` is not `rom.tn`. Because Windows, macOS and Obsidian treat file names case-insensitively, two ids must **not differ only by case**; `LAW.check.unique-id` compares lower-cased forms too.

## File and inline entities

- **File entity:** file name = id; the header has `id:`.
- **Inline entity:** lives in its parent's file. Its Obsidian block id is the local part (`^G2`); the full id (`ROM.TN.G2`) is what the symbol table, grep and other files use; a link is `[[ROM.TN#^G2]]`.
- An inline entity promoted to a file keeps its id.

## Immutability and aliases

An id never changes (`LAW.check.id-immutable`, compared with the previous commit). To rename: create the new id, put the old one in `aliases`. Old codes from before the framework (`QK.T`, `H3`, `NT-07`, `R8`) are aliases of their new ids, so search by old code still finds the entity.

## Not entities

Enumerated values have no id: phases (`P1`), levels (`SS+`), statuses (`locked`), channels (`narration`), roles (`lead`).

## Kind registry

| Layer | Kind | Id |
| --- | --- | --- |
| core | axis · article · scale | `AX3` · `ART.AX3.1`, `ART.0.4` · `SCALE.exl` (alias `EXL`), `SCALE.pride`, `SCALE.rom` |
| rules | law · clause · node decree | `LAW.naming.pov-thuyen` · `LAW.naming.pov-thuyen.C2` · `ROM.TN.R2` |
| library | register · technique · pattern · beat | `REG.so-cai` (alias `R8`) · `TEC.humor.escalation` · `PAT.anchor-5-step` · `PAT.anchor-5-step.B3` |
| world | character · setting · object · secret · belief · value · function · device | `CH.thuyen` · `SET.phong-kin` · `OBJ-012` · `SEC-003` · `B.thuyen-024` · `V.thuyen-001` · `FN.thuyen.phong-kin` · `DV-007` |
| storylines | storyline · node · self · goal · event · intersection · intersection event | `ROM` · `ROM.TN` · `SELF.thuyen` · `ROM.TN.G2` · `ROM.TN-014` · `X-005` · `X-005-001` |
| plans | edition · range plan · blueprint · scene | `ED.v2` · `PLAN.v2.06-10` · `BP.v2.05` · `BP.v2.05.S2` |
| output | post · site · cross-post | `POST.v2.05` · `SITE.rookies` · `XP.rookies.012` |
| cross-cutting | decision · question · proposal · audit · sample · asset | `D-031` · `Q-045` · `PROP-012` · `AUD-003` · `SMP-007` · `AST.<name>` |
| meta | config · schema · spec · guide | `CFG.ids` · `SCH.event` · `SPEC.model` · `GUIDE.main` |

Storyline codes: `PAST`, `ROM`, `THR`, `SOL`, `FAM`, `SELF` (old `QK`, `RM`, `TH`, `SL`, `GD` are aliases).
