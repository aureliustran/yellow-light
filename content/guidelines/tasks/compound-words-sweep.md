---
id: GUIDE.task.compound-words-sweep
kind: guide
status: draft
updated: 2026-11-10
sources:
  - "[[01-rules-viet|01-rules-viet.md]]"
  - "Nguyên tắc chung"
  - "\"Từ phức là đa số, từ đơn là thiểu số\" (locked 10/11); hội thoại 10/11"
---
# Task: compound-words sweep (scan and fix)

**Trigger:** "rà luật từ phức", "scan and fix từ phức", or after a batch of new design files.

**Rule (Vietnamese, `01-rules-viet.md`, *Nguyên tắc chung*):** *từ phức là đa số, từ đơn là thiểu số*. Từ phức = từ ghép (Hán Việt và thuần Việt) và từ láy. Each compound word carries a concept, so meaning is deeper and more concise than a chain of single-syllable words. Short rhythm stays short: rewrite the words, not the rhythm.

> Before: *Thương thì người ta rút lại được.*
> After: *Tình thương là một ân huệ: người khác ban cho, nên người khác có quyền thu hồi.*

## Scope

**Fix** (Vietnamese prose written by the author or Claude as design text):
- `content/world/**`: opening sentence of each package, `purpose`, `rules`, `notes`, `detail`, function intros and `notes`, belief `definition` and `monologue`, group and secret prose.
- `content/storylines/**`: `arc`, goal `statement`, `voice`, `transitions` prose, event body prose.
- `content/core/**`, `content/lib/**`: article `statement`, `forbids`, technique steps and notes.

**Do not touch:**
- Text quoted from published or draft chapters, dialogue lines, *câu trên trang*, `[[ht: … || …]]` blocks, chat blocks.
- The author's raw sentences (*Nguồn của tác giả*, lines marked as the author's words) and any line whose status note says the author wrote it.
- Root sentences already rewritten 10/11 (H1, H2, H3, H7, H9; `ART.AX3` `samples`), belief monologues marked `locked 10/11` today, quotes in `ref`.
- Identity and record tables (data), ids, links, frontmatter, status tags, English spec (`docs/`, `content/schemas/`, `content/guidelines/`).
- Value-system terms used verbatim on purpose (`CH.thuyen.voice` `lexicon`): *khuyết, sửa, đủ, chưa đủ, cây thước, chấm, kẻ thất bại, phía trước*.

**Keep these constraints while rewriting:**
- Dialogue is exempt unless the speaker is intelligent and thinking before speaking, or explaining something complex (then compound words are preferred). Monologue: full rule.
- Registers R3, R7, R8 follow the rule; their own laws still win (R7 few adjectives; R8 no adjectives of pain or colour, counting keeps the numbers).
- Monologues stay in the **design register**, not the character's voice (`schemas/belief.md`).
- Thuyên's POV and monologue: *bố mẹ* (never *bọ, mạ*); praise is *sự công nhận, sự thừa nhận* (never *khen*); his brother is *nó*.
- Not machine-like (`Không viết quá máy móc`): precision follows the speaker's fluency and knowledge.
- Meaning must not change. If a rewrite would change canon, list it instead of editing.

## Steps
1. **Scan.** For each file in scope, list sentences where single-syllable words dominate (rough test: fewer than about half of the content words are compounds) and a compound rewrite adds meaning. Skip lists, tables and short labels.
2. **Batch by package** (one character package, one node, one constitution file at a time). Show the author a before/after table per batch when the batch touches `locked` or `agreed` text; `proposed` and `draft` text may be fixed directly.
3. **Apply** with exact replacements (assert each old string occurs once). On the user's device, write each staged file under a **new, unique name**: the file-commit tool can reuse an earlier staged copy of the same path.
4. `npm run canon:check`: 0 errors; the only acceptable new warnings are `LAW.check.gap` on purposeful gaps.
5. Commit per batch: `git -c user.name=aureliustran -c user.email=12a1tranphamtuan@gmail.com commit -m "content: luật từ phức cho <batch>"` with the session's attribution trailers. **Never push.**

## Report
Files changed; sentences rewritten (count); sentences left unchanged on purpose and why; doubtful items needing the author.

## Order (first run, 10/11)
1. `world/characters/thuyen/` (`CH.thuyen.md` opening and `purpose`, `CH.thuyen.voice.md`, `mechanics/` 12 functions and `CH.thuyen.mechanics.md`).
2. `storylines/SELF/SELF.thuyen/SELF.thuyen.md`, `storylines/PAST/PAST.T/PAST.T.md` and `PAST.T-*.md` in the same folder.
3. `world/characters/nhi/` (`CH.nhi.md` `purpose`, `CH.nhi.voice.md`, function `notes`), `world/characters/vu/`, `world/secrets/`; `storylines/SOL/SOL.HD/` (`identity`, `members`, `rules`).
4. `core/constitution/` (`ART.0`, `ART.AX3` articles), `lib/`.
