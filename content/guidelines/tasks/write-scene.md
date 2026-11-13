---
id: GUIDE.task.write-scene
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[docs/framework/blueprints|docs/framework/blueprints.md]]"
  - "[[quy-trinh|quy-trinh.md §4.4]]"
  - "rules/01c"
---
# Task: write a scene or a chapter from a blueprint

## Input
The blueprint scene(s) assigned to you; its write-kit.

## Steps
1. Read the write-kit for your scene only. Open an event file only if the kit lacks something.
2. Write in Vietnamese, following the laws, register and pattern in the kit. Use the skills `den-vang-van-phong` (registers) and `den-vang-nhan-vat` (characters); for several scenes in parallel with an independent review, `den-vang-pipeline`. Apply the compound-words rule (`rules/registers.md` §0.5, source `01-rules-viet.md`): narration, monologue and design text mostly use compound words (từ ghép, từ láy); dialogue stays natural; short registers (R3, R7, R8) keep their rhythm and change the words. Check it with `registers.md` §7.
3. A gap in canon → mark `[[CẦN CHỐT: …]]` in the draft; never invent canon.
4. Chapter file format: `# Title`, date line, body; display blocks per `01c-rules-thanh-phan.md`; no frontmatter, no ids or markers in the text.
5. After the text is final, fill each scene's `anchor` with its first sentence, set `stage: written`, then run `sync-blueprint`.

## Output
The chapter file in `posts/vercel/` (on a branch or as a draft the author reviews).

## Checks
Independent review done; every `[[CẦN CHỐT]]` turned into a `Q-`; weekdays computed; header and blocks correct.

## Stop and ask
The scene cannot satisfy a law in the kit: report it instead of breaking the law.
