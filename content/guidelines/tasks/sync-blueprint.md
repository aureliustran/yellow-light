---
id: GUIDE.task.sync-blueprint
kind: guide
status: draft
updated: 2026-11-10
sources: [docs/framework/blueprints.md]
---
# Task: sync a blueprint with its chapter

**Trigger:** after writing; after the author edits a chapter; `LAW.check.bp-drift` or `bp-anchor` reports.

## Steps
1. Read the chapter and its blueprint.
2. Update the blueprint to the chapter **as written**: scenes cut, added, reordered; events whose role changed; anchors (first sentence of each scene, verbatim).
3. Events that reached the page but are not in canon → `add-event` as `proposed`, then ask the author.
4. Set `stage: synced`; `canon:check` records the chapter hash.

## Output
A blueprint that tells the truth about the chapter.

## Checks
No `bp-anchor`, `bp-drift`, `bp-coverage` findings for this chapter.

## Stop and ask
Never edit the chapter to match the blueprint. New canon on the page goes to the author.

## First sync of already written chapters
Build the blueprint backwards from the text (scenes, events, anchors), then sync as above.
