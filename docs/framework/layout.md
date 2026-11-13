---
id: SPEC.layout
kind: spec
status: draft
updated: 2026-11-13
sources:
  - "[[de-xuat/kien-truc-framework|content/de-xuat/kien-truc-framework.md §4, §9; scripts/paths.mjs; commit 1c15ec8 (B2.5)]]"
---
# Layout

## Repository `agreed 08/11`

| Path | Holds |
| --- | --- |
| `content/` | everything about the story: entities, rules, library, plans, published text |
| `docs/` | specifications only: this framework, app specs (`plan-legacy.md`) |
| `crosspost/` | cross-posting code only: CLI, worker, site adapters, scratch `work/`, `logs/` |
| `scripts/` | tooling: `canon-check.mjs`, import/export, `paths.mjs` |
| `src/`, `supabase/` | the reading site |
| `.obsidian/` | shared Obsidian config; the vault is the repo root |
| `CLAUDE.md` | points to the two entry points only |

## `content/` (target) `agreed 06/11 · posts agreed 08/11`

```
content/
├── GUIDELINES.md          agent entry point
├── README.md              index of story documents (transitional)
├── config/                L0 · calendar · phases · levels · statuses · ids (old→new map)
├── schemas/               L0 · one file per kind
├── core/                  L1 · axes · scales · shared mechanics · constitution/ART.<AX>.md
├── rules/<aspect>/        L1.5 · LAW.default.md · LAW.<aspect>.*.md ; rules/check/ structural laws
├── lib/                   L1.5 · style: STY.default.md · registers/ · <aspect>/TEC.* · patterns/
├── storage/               L1.5 · STO.<name>.md: stores (one row per entry) read by laws via `data` (13/11)
├── info/<domain>/         L2 · INFO.<domain>.md (node) · INFO.<domain>.<topic>.md (leaf): real-world knowledge (13/11)
├── world/                 L2 · characters/<id>/ · settings/ · objects/ · secrets/
├── storylines/            L3 · README.md (TREE) · SELF/ PAST/ ROM/ THR/ SOL/ FAM/
│   ├── <ROOT>/<ROOT>.md                       every node is a folder named by its id
│   ├── <ROOT>/<NODE>/<NODE>.md                child node = subfolder of its parent
│   ├── <ROOT>/<NODE>/<NODE>-NNN.md            event leaves: files, never folders
│   └── intersections/X-NNN/X-NNN.md          intersection = folder, own id, foreign keys in `nodes` (≥2)
│       └── X-NNN-NNN.md                       its events (only with a goal of its own)
├── plans/                 L4 · editions · chapters/BP.<edition>.<nn>.md
├── posts/                 output
│   ├── vercel/            edition v2, the main site
│   ├── legacy/            edition v1, read under /legacy
│   └── <domain>/          one per cross-posting site: *.txt, convert.md
├── canon/ · proposals/ · audits/ · assets/    cross-cutting
├── _views/ · symbols.md   generated
└── _archive/              dropped or fully migrated material, read-only, out of the graph (`_archive/tuyen/`: old thread modules, migrated into `storylines/` 10/11)
```

Folders not yet created are built during migration (B3–B7). Until then, flat files at the top of `content/` and `de-xuat/`, `kho/` are the old sources (`_archive/tuyen/` is fully migrated, kept read-only for tracing) (`content/README.md`).

**File name = id**, unique across the vault (see [ids.md](ids.md)). Chapter files in `posts/` keep their names because the import parser and the site depend on them; their ids are mapped in the edition file.

## Published text `agreed 08/11`

One place declares where story files live: `scripts/paths.mjs`. Every script and the cross-posting CLI read paths from it.

| Constant | Value | Used by |
| --- | --- | --- |
| `EDITION_DIRS.v2` | `content/posts/vercel` | `npm run import` |
| `EDITION_DIRS.v1` | `content/posts/legacy` | import, `apply-blocks`, `apply-chats`, `apply-translations` |
| `siteDir(site)` | `content/posts/<domain>` | `crosspost` CLI (converted `*.txt`, `convert.md`) |
| `SITE_DOMAINS` | `rookies → rookies.vn`, `truyennhaong → truyennhaong.vn` | |

A site **key** (`rookies`) is the CLI argument and the `site` column in Supabase; the **folder** is the domain. Chapter bodies have no frontmatter (the parser reads `# Title`, a date line, then the body); the framework never writes into them.

## Obsidian vault `agreed 06/11 · root agreed 08/11`

The vault is the repo root, so the graph sees `content/`, `docs/` and `crosspost/` together. Exclude in *Settings → Files and links → Excluded files*: `node_modules`, `dist`, `.astro`, `.vercel`, `src`, `supabase`, `crosspost/work`, `crosspost/logs`, `content/_archive`. Committed: `.obsidian/` shared config. Ignored: `workspace.json`, `workspaces.json`, `plugins/` (installed per machine: Breadcrumbs, Dataview).
