---
id: SPEC.tooling
kind: spec
status: draft
updated: 2026-11-10
sources:
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §9–§12; scripts/canon-check.mjs (B2, F3)]]"
---
# Tooling

## `canon:check` `agreed 06/11`

`npm run canon:check` (`scripts/canon-check.mjs`, no dependencies) is the rule runner. It reads every entity under `content/` and every page under `docs/`, builds the symbol table, runs the checks, then writes the generated views. It exits non-zero on errors (`--strict`: also on warnings).

| Option | Effect | State |
| --- | --- | --- |
| `--law <id>` | run one check | built |
| `--target <id>` | only findings on one entity | built |
| `--strict` | warnings fail too | built |
| `--limit <n>` · `--all` | how many findings to print (default 40) | built |
| `--phase <P>` | only laws effective in a phase | planned |

**Target design.** The runner keeps no rules of its own: it reads every law with `check: machine`, matches its selector, runs it on its scope, reports by law. Until structural laws are files in `rules/check/`, they are code in the script with the same ids.

**Severity.** Findings in migrated parts (now: `config/`, `schemas/`, `guidelines/`, `GUIDELINES.md`, `docs/`) are errors; elsewhere (legacy, not yet migrated) they are warnings. Each migration step adds its folders to the migrated list.

**Schemas drive the schema check.** Required header fields per kind come from each schema's `entity`, `required` and `required-one-of` (see `content/schemas/schema.md`); only the `schema` kind is bootstrapped in code.

### Checks

| Check | Fails when | Scope | State |
| --- | --- | --- | --- |
| `LAW.check.unique-id` | two entities share an id, or differ only by case; duplicate file names | all | built (case rule planned) |
| `LAW.check.resolve` | a wikilink points nowhere | all except `assets/`, `kho/` | built |
| `LAW.check.md-link` | a relative markdown link `[x](path)` points to no file | migrated parts | built |
| `LAW.check.schema` | a header misses a required field of its kind | entities with `kind` | built |
| `LAW.check.status` | a status is not in the vocabulary; `locked` depends on `proposed` | all | built |
| `LAW.check.table-pipe` | a wikilink alias `[[a\|b]]` inside a table row | all | built |
| `LAW.check.weekday` | a weekday does not match its date | all | built |
| `LAW.check.level-parent` | a child node outweighs its parent in a phase | nodes | built |
| `LAW.check.id-grammar` | an id breaks the grammar or its parent part disagrees with `parent` | all | planned |
| `LAW.check.id-immutable` | an id changed since the previous commit without an alias | all | planned |
| `LAW.check.layer` | a reference goes against the layer direction | `world/`, `storylines/`, `rules/`, `core/` | planned |
| `LAW.check.owner` | a value is written outside its owner | `storylines/` | planned |
| `LAW.check.basis` | a law without an article basis | `rules/` | planned |
| `LAW.check.overlap` | same-aspect laws overlap without an order | `rules/`, decrees | planned |
| `LAW.check.exl-monotonic` | a step goes back between consecutive phase laws | phase laws, `SELF` | planned |
| `LAW.check.x-consistency` | an intersection holds events, or `x`/`beat` disagree | events, intersections | planned |
| `LAW.check.secret-leak` | a scene uses a secret someone present does not know yet | events | planned |
| `LAW.check.goal-chain` · `goal-coverage` | an event goal does not serve its parent's goal · a node goal has no serving event | storylines | planned |
| `LAW.check.override-reason` | an override without a reason, or of an article | events | planned |
| `LAW.check.resolved-fresh` | a resolved block was edited by hand or is stale | events | planned |
| `LAW.check.lib-basis` · `lib-scope` · `reg-conflict` · `technique-gap` | see [library](library.md#checks) | `lib/`, events | planned |
| `LAW.check.bp-anchor` · `bp-drift` · `bp-coverage` | see [blueprints](blueprints.md#lifecycle) | `plans/` | planned |
| `LAW.check.spec-schema` | a kind named in the spec has no schema, or the reverse | `docs/framework/`, `schemas/` | planned |

## Generated views

Written as real files so agents can read them (Obsidian's Dataview results are invisible to agents). Never edited by hand.

| View | From | State |
| --- | --- | --- |
| `content/symbols.md` | every id → file → one line | built |
| `content/_views/graph.json`, `graph.html` | every entity and typed edge | built |
| resolved block in each event (`<!-- SINH -->`) | inheritance ([storylines](storylines.md#inheritance)) | planned |
| `_views/write-kit/BP.<edition>.<nn>.md` | resolved blocks of a blueprint's events + scene choices | planned |
| `_views/rules-for/<id>.md` | laws applying to one entity | planned |
| `_views/laws-<phase>.md` | laws in force in a phase, by article | planned |
| `_views/CH.<id>.view.md` · `characters.md` | a character across nodes per phase · all characters | planned |
| `_views/matrix.md` | level, role, register per node × phase | planned |
| `_views/X-NNN.view.md` | beats, beat holder, knowledge ledger of an occasion | planned |
| node `events` tables | event leaves | planned |
| `canon/bible.md` | every `locked` line, by tree | planned |
| `posts/<domain>/_index.md` | chapters × cross-post state | planned (needs Supabase state) |

## Graph page `agreed 06/11`

`content/_views/graph.html` (template `scripts/graph-template.html`) reads `graph.json`: nodes coloured by layer (posts: main site, Legacy, cross-posts) and sized by `weight`; edges coloured by type (`ref`, `link`, `parent`, `participants`, `uses`, `basis`, `exports`, `calls`, `causes`); a phase slider lights nodes and laws effective in a phase; clicking a node shows its neighbours. Open it in a browser.

## Obsidian `agreed 06/11`

| Framework needs | Obsidian gives |
| --- | --- |
| import | wikilink `[[id]]`, `[[id#^block]]` |
| typed relations | properties holding links (`participants`, `uses`, `basis`, `parent`) |
| used-by | backlinks |
| safe rename and move | automatic link update, **only when done inside Obsidian** |
| parent/child and basis trees | Breadcrumbs plugin reading `parent`, `basis` |
| local neighbourhood | local graph, groups coloured by layer folder |

Limits: Dataview results exist only inside Obsidian; Obsidian checks nothing (that is `canon:check`); links are untyped (the property name is the type); an Obsidian MCP server runs only on the author's machine. Vault setup: [layout](layout.md#obsidian-vault).

## Other scripts

`scripts/paths.mjs` (where story files live, [layout](layout.md#published-text)); `import-chapters`, `export-chapters`, `apply-blocks`, `apply-chats`, `apply-translations` (site import pipeline); `crosspost/cli.mjs` (cross-posting; workflow in the guideline task `crosspost-convert`).
