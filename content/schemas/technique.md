---
id: SCH.technique
kind: schema
entity: technique
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, aspect, serves]
sources: [docs/framework/library.md (10/11)]
---
# schema · technique

A sentence- or paragraph-level method that achieves a law or a register. See [library](../../docs/framework/library.md).

**Location:** `lib/<aspect>/TEC.<aspect>.<name>.md` (aspect names match `rules/`, plus `humor`, `senses`, `inference`, `interiority`). **Id:** `TEC.<aspect>.<name>`; steps inline `.S<n>`.

## Shape

```
id          TEC.naming.transform
aspect      naming
serves      [[LAW.naming.pov-thuyen]]
applies-to  (optional; must stay inside the scope of what it serves)
effective   OPEN → P2
check       human | machine
```

## Sections

| Section | Content |
| --- | --- |
| `steps` | the method, one step per line |
| `dials` | what can be turned up or down (dose, intensity scale) |
| `fails` | common failures and how they read |
| `samples` | links to samples |

## Rules

1. Serves at least one law or register (`LAW.check.lib-basis`), and the served law lists it under `technique`.
2. Scope never exceeds the served law (`LAW.check.lib-scope`).
3. If it becomes mandatory, it is promoted: write a law and point it here.
