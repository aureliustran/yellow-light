---
id: SPEC.skills
kind: spec
status: draft
updated: 2026-11-10
sources:
  - "[[docs/framework/README|docs/framework/README.md]]"
  - "[[docs/framework/library|docs/framework/library.md]]"
  - "[[docs/framework/blueprints|docs/framework/blueprints.md]]"
  - "[[GUIDELINES|content/GUIDELINES.md]]"
  - "content/guidelines/tasks/*"
---
# Skills: map to the framework

Skills carry **method** (how to do a kind of work); the repository carries **facts** (canon, laws, characters, plans). A skill never stores story facts that the repo owns: it says where to read them. This keeps one owner per value (principle 2) and lets the framework change without rewriting skills.

Skill names are English and do not contain the story's name, so a skill can be reused for another story built on the same framework.

## Skill ↔ framework

| Skill (new name) | Replaces | Framework layer it works on | Playbook that calls it | Reads | Writes |
| --- | --- | --- | --- | --- | --- |
| `prose-registers` | `den-vang-van-phong` | `rules/` (laws) + `lib/` (registers, techniques, patterns) | `write-scene`, `revise-chapter`, `add-law-or-technique` | `rules/registers.md` (until `lib/registers/REG.*`), `rules-for` view, node × phase matrix | nothing (advice and review) |
| `character-cards` | `den-vang-nhan-vat` | `world/characters/CH.*` (identity, record, purpose, rules, attributes) + `mechanics/FN.*` + `beliefs` + `voice`; state in `storylines/**/SELF.*` | `add-event`, `propose-options`, `plan-chapter` | the character package, `SELF.<id>` | proposals only (`proposed`) |
| `plot-synthesis` | `den-vang-tong-hop-cot-truyen` | `storylines/` (nodes, goals, events) + `canon/` (questions) | `propose-options`, `plan-chapter` | storylines, canon, published chapters | a proposal (`PROP-`) and, after approval, events |
| `writing-technique-synthesis` | `den-vang-tong-hop-cach-viet` | `lib/` + `plans/` (blueprints, scenes, write-kit) | `plan-chapter`, `add-law-or-technique` | approved plot, registers, techniques, samples | blueprint scenes, techniques/patterns (`proposed`), scene briefs |
| `multi-agent-pipeline` | `den-vang-pipeline` | `plans/` → `posts/` (blueprint → chapter) | `write-scene`, `revise-chapter` | write-kit, laws, previous chapter | chapter files (draft), review notes |
| `chapter-range-audit` | `den-vang-ra-soat` | `posts/` read back against `canon/`, `storylines/`, `plans/` | `audit` | published chapters, canon, blueprints | `audits/AUD-NNN/`, `Q-` |
| `crosspost-site` | (unchanged) | `crosspost/`, `posts/<domain>/` | `crosspost-convert` | site adapters | adapters, converted text |

Not a skill: `compound-words-sweep`, `add-event`, `record-decision`, `sync-blueprint`, `placement` stay playbooks in `content/guidelines/tasks/`, because they are repo procedures with checks, not reusable craft.

## Rules for every skill

1. **Entry:** start from `content/GUIDELINES.md`; follow its reading rules; never load a folder "to be safe".
2. **Ids:** use the framework ids (`PAST.T`, `ROM.TN`, `THR.LAB`, `SELF.thuyen`, `FN.*`, `DV-*`, `BL-*`). Old codes (`QK.T`, `RM.TN`, `TH.LAB`, `TB-*`) appear only as aliases.
3. **Status:** a skill proposes; only the author's words make `locked`. Output files carry `proposed`.
4. **Generated content** (`_views/`, `symbols.md`, resolved blocks) is read, never written.
5. **Checks:** finish with `npm run canon:check`; checks marked `planned` in [tooling](tooling.md) are done by reading and reported.
6. **No story facts inside skills:** no character snapshots, chapter numbers, dates, motif lists. Point to the owner file.
7. **Style rules** come from `rules/registers.md` §0 (including the compound-words rule, `01-rules-viet.md`), not from a copy.
8. **Transitional:** until a folder is migrated, use the old sources listed in the GUIDELINES transitional table.

## Gaps this map shows

| Gap | Effect | Fix |
| --- | --- | --- |
| Registers are still one legacy file, no `REG.*` entities | `prose-registers` must read prose sections | migrate to `lib/registers/` (B4–B7), then point the skill at `REG.*` |
| Write-kit and resolved blocks are `planned` | pipeline briefs are assembled by hand | switch to `_views/write-kit/` when `canon:check` generates it |
| Devices `TB-` were renamed `DV-` and moved into the character's mechanics | old skills, `registers.md` §2.4 still say `TB-` | skills use `DV-`; `registers.md` §2.4 to be renamed by the author's approval |
| Character snapshot (16/10) in the old card skill is stale | wrong stage numbers, old chapter numbers | removed; read the package |
| Playbooks name the old skills | `plan-chapter`, `write-scene`, `revise-chapter`, `audit`, `propose-options` | update names after the author saves the new skills |

## Migration of skills

1. Author saves the new skills from the review cards.
2. Playbooks switch to the new names (one commit).
3. Author deletes the six `den-vang-*` skills.
