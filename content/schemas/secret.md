---
id: SCH.secret
kind: schema
entity: secret
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated, aliases]
aliases: [schema.secret]
sources:
  - "[[de-xuat/kien-truc-framework|kien-truc-framework.md §8.3]]"
---
# schema · secret

A secret, tracked as an entity to know **who knows what, when**. **Location:** `world/secrets/SEC-NNN.md`. **Id:** `SEC-NNN`.

Sections:
- `truth`: what is true (one sentence).
- `initial-holders`: who knows when the story starts.
- `guard`: conditions for it to stay hidden (e.g. an arranged objective event, Q-001).
- `reveal`: event expected to expose it (`[[<node>-NNN]]`), optional.

The knowledge ledger is **never written by hand** here. Events declare `changes: SEC-NNN: +[[CH.…]]`; the tooling builds the ledger over time into intersection views. `LAW.check.secret-leak` catches a scene using the secret when someone present does not know it yet.

Candidates: Nhi's identity (Q-001), the secret adviser (`X-005`, old meeting `X-006`), channel K17.
