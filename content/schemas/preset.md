---
id: SCH.preset
kind: schema
entity: preset
status: locked
updated: 2026-11-13
required: [id, kind, of, status, updated]
aliases: [schema.preset]
sources:
  - "tác giả 13/11 (style mặc định, luật mặc định)"
---
# schema · preset

A preset is a **set** of styles or laws used as the default for every event `locked 13/11`. It is not a new entity: it lists entities. Two exist.

| Id | `of` | Location | Fields |
| --- | --- | --- | --- |
| [[STY.default]] | `style` | `lib/STY.default.md` | `register` (the fallback bundle, R0), `pattern`, `required` (moves `bat-buoc`), `defaults` (moves `mac-dinh`) |
| [[LAW.default]] | `laws` | `rules/LAW.default.md` | `hard` (laws `tier: cung`), `soft` (laws `tier: mem`) |

A storyline's or node's `style` and `laws` sections are overrides on top of the presets, not replacements. Resolution: [[docs/framework/library|library]] (style), [[docs/framework/rules-engine|rules-engine]] (laws).
