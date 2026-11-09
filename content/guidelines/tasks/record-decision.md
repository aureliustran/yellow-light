---
id: GUIDE.task.record-decision
kind: guide
status: draft
updated: 2026-11-10
sources: [quy-trinh.md §2, §4.1, §5]
---
# Task: record an author decision

**Trigger:** "chốt …", "ok cái này", "chọn phương án 2", an answer to a `Q-`.

## Input
The author's words; the question or proposal they answer.

## Steps
1. Write the decision verbatim (the author's meaning, not your paraphrase) as a new `D-NNN` with the date in `canon/` decisions (until migrated: the decision log the author uses, or `canon/bible-v2.md` with the label `` `locked dd/mm` ``).
2. Apply it to the **owner** entities (placement guide), setting their status to `locked`. If it replaces an older decision, mark the old one `superseded` with `by: D-NNN`; never rewrite the old text.
3. Search every id the decision touches (`symbols.md`, grep, backlinks). Fix entities that cite the old state; in historical proposals add `` `superseded by D-NNN` `` instead.
4. Close the related `Q-`; open new `Q-` for questions the decision raises.
5. If a proposal was merged, move it to `proposals/_merged/` with `merged-into`.
6. Run `canon:check`.

## Output
`D-NNN`; updated entities; closed and new questions.

## Checks
All five branches done; no entity still cites the replaced state; `canon:check` clean.

## Stop and ask
The decision contradicts a published chapter or an article (`ART`): say so and ask which gives way.

Report one line per decision: id, files changed.
