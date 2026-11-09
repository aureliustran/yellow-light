# symbols (SINH)

Sinh bởi `npm run canon:check`. Không sửa tay. Mã → file → một câu. Mã viết trong backtick để file này không tạo cạnh trong đồ thị.

Có phần đầu (frontmatter): 61 file. Chưa chuyển sang khuôn mới (legacy): 151 file.

| Mã | Loại | Trạng thái | File | Tóm tắt |
| --- | --- | --- | --- | --- |
| `CFG.calendar` | `config` | `proposed` | `config/calendar.md` | Một nguồn duy nhất cho ngày tháng. Luật `LAW.check.weekday` kiểm mọi ngày trong tài liệu theo file này. |
| `CFG.ids` | `config` | `proposed` | `config/ids.md` | Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; … |
| `CFG.levels` | `config` | `proposed` | `config/levels.md` | Mức đo **độ cần thiết** của một tuyến, node hoặc giao điểm đối với truyện **trong một giai đoạn**. Không đo độ hay của chất liệu. |
| `CFG.phases` | `config` | `proposed` | `config/phases.md` | Chiều thời gian của star schema. Mọi giá trị động (weight, relation, state, voice, hiệu lực luật) được ghi **theo giai đoạn**. Thứ tự cố … |
| `CFG.statuses` | `config` | `proposed` | `config/statuses.md` | Mỗi dòng, mỗi file mang một trạng thái. Trạng thái là mức ổn định: tầng nào dựa vào tầng nào thì không được ổn định hơn nó. |
| `CH.thuyen` | `character` | `agreed` | `world/characters/thuyen/CH.thuyen.md` | Nam chính, POV chính. Một chàng trai giỏi đọc người, mù với chính mình, chạy bằng một cỗ máy hiện sinh mà nhiên liệu là sự công nhận. |
| `CH.thuyen.mechanics` | `character` | `agreed` | `world/characters/thuyen/mechanics/CH.thuyen.mechanics.md` | Sơ đồ và chữ ký mọi hàm, mỗi hàm một dòng. Thân từng hàm ở `FN.thuyen.<tên>.md` (B3b; id ghi dạng code cho tới khi file có). |
| `GUIDE.invariants` | `guide` | `draft` | `guidelines/invariants.md` | Rules that always hold. Machine-checked ones name their check (`docs/framework/tooling.md`); the rest are checked by you before saying "d… |
| `GUIDE.main` | `guide` | `draft` | `GUIDELINES.md` | Read this first in every session. It says how to work on the story. For what the system *is* (entities, ids, inheritance, tooling), look … |
| `GUIDE.old-workflow` | `guide` | `superseded` | `quy-trinh.md` | Oct 25, 2026 · @aureliustran. Cách tác giả và Claude làm việc với nhau, theo từng loại việc. Kiến trúc nền: `kien-truc.md`. |
| `GUIDE.placement` | `guide` | `draft` | `guidelines/placement.md` | Ask the questions in order; the first "yes" decides. Ids: `docs/framework/ids.md`. Fields: the kind's schema. |
| `GUIDE.reading` | `guide` | `draft` | `guidelines/reading.md` | Tokens are the budget. Every task starts from one entry and follows links; nothing is loaded "to be safe". |
| `GUIDE.roles-and-status` | `guide` | `draft` | `guidelines/roles-and-status.md` | **When to ask.** Anything that touches canon: ask first (at most four questions at once, each with a recommendation). Anything inside an … |
| `GUIDE.task.add-event` | `guide` | `draft` | `guidelines/tasks/add-event.md` | What happens; the node it belongs to; the goal it serves. |
| `GUIDE.task.add-law-or-technique` | `guide` | `draft` | `guidelines/tasks/add-law-or-technique.md` | Must hold (pass/fail) → **law**. A voice bundle → **register**. A method → **technique**. The shape of a beat or scene → **pattern**. A m… |
| `GUIDE.task.audit` | `guide` | `draft` | `guidelines/tasks/audit.md` | **Trigger:** "rà soát ch.N–M", or before a new phase. |
| `GUIDE.task.crosspost-convert` | `guide` | `draft` | `guidelines/tasks/crosspost-convert.md` | **Trigger:** "chuyển chương 1–5 cho rookies", "convert chapter 12 for rookies", "làm bản đăng chéo". |
| `GUIDE.task.plan-chapter` | `guide` | `draft` | `guidelines/tasks/plan-chapter.md` | **Trigger:** "lên plan ch.N", step 1–2 of "viết ch.N–M". |
| `GUIDE.task.propose-options` | `guide` | `draft` | `guidelines/tasks/propose-options.md` | **Trigger:** "nghĩ cách xử lý …", "có những hướng nào cho …", "dựng kho cho …", "thiết kế sự kiện …". |
| `GUIDE.task.record-decision` | `guide` | `draft` | `guidelines/tasks/record-decision.md` | **Trigger:** "chốt …", "ok cái này", "chọn phương án 2", an answer to a `Q-`. |
| `GUIDE.task.revise-chapter` | `guide` | `draft` | `guidelines/tasks/revise-chapter.md` | **Trigger:** "sửa đoạn …", "chương N đọc chưa ổn". |
| `GUIDE.task.sync-blueprint` | `guide` | `draft` | `guidelines/tasks/sync-blueprint.md` | **Trigger:** after writing; after the author edits a chapter; `LAW.check.bp-drift` or `bp-anchor` reports. |
| `GUIDE.task.write-scene` | `guide` | `draft` | `guidelines/tasks/write-scene.md` | The blueprint scene(s) assigned to you; its write-kit. |
| `SCH.article` | `schema` | `proposed` | `schemas/article.md` | A constitution article: an invariant split from an axis; phase laws take their basis from it. See [rules-engine](../../docs/framework/rul… |
| `SCH.belief` | `schema` | `proposed` | `schemas/belief.md` | A belief (old `NT-`): a product of a past anchor, consumed by present events. |
| `SCH.blueprint` | `schema` | `proposed` | `schemas/blueprint.md` | The plan of one chapter: how events combine into it. See [blueprints](../../docs/framework/blueprints.md). |
| `SCH.character` | `schema` | `proposed` | `schemas/character.md` | A **static** entity (dimension table). Values over time live in nodes (`storylines/`), not here. |
| `SCH.config` | `schema` | `proposed` | `schemas/config.md` | A constant of the story (calendar, phases, levels, statuses, old→new id map). **Location:** `content/config/<name>.md`. **Id:** `CFG.<nam… |
| `SCH.edition` | `schema` | `proposed` | `schemas/edition.md` | One edition of the story (`v1` Legacy, `v2` the main site). **Location:** `plans/ED.<edition>.md`. **Id:** `ED.v2`. |
| `SCH.event` | `schema` | `proposed` | `schemas/event.md` | The **leaf** of a storyline tree: the unit that decides content (what must be written, when, for which goal, under which laws, how). See … |
| `SCH.function` | `schema` | `proposed` | `schemas/function.md` | A **mechanism** of one character, written like a function with a signature. An agent reads `in` and `when` to know when to call it, witho… |
| `SCH.goal` | `schema` | `proposed` | `schemas/goal.md` | A goal of a node, decomposed down the tree. See [storylines](../../docs/framework/storylines.md#node). |
| `SCH.group` | `schema` | `proposed` | `schemas/group.md` | A group of people and its crowd characters. |
| `SCH.guide` | `schema` | `proposed` | `schemas/guide.md` | A guideline for agents: how to work. **Location:** `content/GUIDELINES.md` (entry) and `content/guidelines/**`. **Id:** `GUIDE.<name>`; t… |
| `SCH.intersection` | `schema` | `proposed` | `schemas/intersection.md` | An **occasion** several nodes write into: a hyperedge, not a node. It sits outside the node tree and has its own tree (spans contain occa… |
| `SCH.law` | `schema` | `proposed` | `schemas/law.md` | A law is an **entity of its own**, not a block of text. One law applies to some targets; a target is under several laws. Semantics (hiera… |
| `SCH.node` | `schema` | `proposed` | `schemas/node.md` | A **dynamic** entity: a thread with people and events in time, serving at least one axis. Storylines (`ROM`, `PAST`, …) and `SELF.<id>` a… |
| `SCH.object` | `schema` | `proposed` | `schemas/object.md` | A meaningful object (recurring, symbolic, or evidence). **Location:** `world/objects/OBJ-NNN.md`, or inline in a setting when minor. **Id… |
| `SCH.pattern` | `schema` | `proposed` | `schemas/pattern.md` | The shape of a beat or a scene (e.g. anchor in five steps, twist in five steps, inference beat, emotion chain of eight links). See [libra… |
| `SCH.plan` | `schema` | `proposed` | `schemas/plan.md` | A plan for a range of chapters: which nodes are in scope and what is due. It groups blueprints; each chapter's detail is its blueprint (s… |
| `SCH.post` | `schema` | `proposed` | `schemas/chapter.md` | A chapter as published, in `content/posts/<edition-dir>/`. The chapter file is never renamed or given metadata (the import parser and the… |
| `SCH.proposal` | `schema` | `proposed` | `schemas/proposal.md` | An unapproved proposal (old `de-xuat/`). **Location:** `proposals/PROP-NNN.md`; once merged, `proposals/_merged/`. **Id:** `PROP-NNN`; ol… |
| `SCH.register` | `schema` | `proposed` | `schemas/register.md` | A register (văn phong): a voice bundle for narration or dialogue. See [library](../../docs/framework/library.md). |
| `SCH.schema` | `schema` | `proposed` | `schemas/schema.md` | A model of one entity kind. **Location:** `content/schemas/<kind>.md`. **Id:** `SCH.<kind>`. |
| `SCH.secret` | `schema` | `proposed` | `schemas/secret.md` | A secret, tracked as an entity to know **who knows what, when**. **Location:** `world/secrets/SEC-NNN.md`. **Id:** `SEC-NNN`. |
| `SCH.setting` | `schema` | `proposed` | `schemas/setting.md` | A place, a recurring space. **Location:** `world/settings/SET.<name>.md`. **Id:** `SET.<name>`. Header: `parent` (larger setting, if any). |
| `SCH.spec` | `schema` | `proposed` | `schemas/spec.md` | A specification page of the framework or the app. **Location:** `docs/**`. **Id:** `SPEC.<name>`. |
| `SCH.technique` | `schema` | `proposed` | `schemas/technique.md` | A sentence- or paragraph-level method that achieves a law or a register. See [library](../../docs/framework/library.md). |
| `SPEC.adr-001` | `spec` | `agreed` | `docs/framework/adr/ADR-001-story-framework.md` | Before the framework (state of early November 2026): |
| `SPEC.blueprints` | `spec` | `draft` | `docs/framework/blueprints.md` | Fields: `content/schemas/blueprint.md`, `edition.md`, `chapter.md`. |
| `SPEC.editions` | `spec` | `locked` | `docs/plan-legacy.md` | Oct 20, 2026. Development plan. **Rollout steps 1 and 2 are built** (Oct 21, see "Status"). |
| `SPEC.framework` | `spec` | `draft` | `docs/framework/README.md` | Entry point of the **spec**: what the system is. For *how to work in it*, read [`content/GUIDELINES.md`](../../content/GUIDELINES.md) first. |
| `SPEC.ids` | `spec` | `draft` | `docs/framework/ids.md` | Every entity that can be pointed at has an id, including inline entities (goals, scenes, clauses, beats, steps). Old → new code mapping (… |
| `SPEC.index` | `spec` | `draft` | `docs/README.md` | Specs only: how the framework and the app are built. Story material is in [`content/`](../content/GUIDELINES.md). |
| `SPEC.layout` | `spec` | `draft` | `docs/framework/layout.md` | content/ |
| `SPEC.library` | `spec` | `draft` | `docs/framework/library.md` | `lib/` mirrors `rules/`: same aspects, same selector syntax (`applies-to`, `effective`, `except`), so one engine answers "what applies he… |
| `SPEC.model` | `spec` | `draft` | `docs/framework/model.md` | How entities fit together. Fields of each kind are defined in its schema under `content/schemas/`; this file never repeats them. |
| `SPEC.old-architecture` | `spec` | `superseded` | `kien-truc.md` | Oct 25, 2026 · @aureliustran. **[chốt 25/10]** repo là kho gốc. Phần còn lại là thiết kế đang áp dụng; chỗ nào chưa triển khai có ghi rõ. |
| `SPEC.rules-engine` | `spec` | `draft` | `docs/framework/rules-engine.md` | How rules are derived, scoped and combined. Fields: `content/schemas/article.md`, `content/schemas/law.md`. |
| `SPEC.storylines` | `spec` | `draft` | `docs/framework/storylines.md` | Fields: `content/schemas/node.md`, `goal.md`, `event.md`, `intersection.md`. |
| `SPEC.tooling` | `spec` | `draft` | `docs/framework/tooling.md` | `npm run canon:check` (`scripts/canon-check.mjs`, no dependencies) is the rule runner. It reads every entity under `content/` and every p… |
