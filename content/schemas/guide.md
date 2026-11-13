---
id: SCH.guide
kind: schema
entity: guide
status: proposed
updated: 2026-11-10
required: [id, kind, status, updated]
sources:
  - "[[docs/framework/README|docs/framework/README.md]]"
---
# schema · guide

A guideline for agents: how to work. **Location:** `content/GUIDELINES.md` (entry) and `content/guidelines/**`. **Id:** `GUIDE.<name>`; task playbooks `GUIDE.task.<name>`.

Task playbooks have sections: `input` · `steps` · `output` · `checks` · `stop-and-ask` (when to hand back to the author).
