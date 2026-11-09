# symbols (SINH)

Sinh bởi `npm run canon:check`. Không sửa tay. Mã → file → một câu. Mã viết trong backtick để file này không tạo cạnh trong đồ thị.

Có phần đầu (frontmatter): 31 file. Chưa chuyển sang khuôn mới (legacy): 153 file.

| Mã | Loại | Trạng thái | File | Tóm tắt |
| --- | --- | --- | --- | --- |
| `CFG.calendar` | `config` | `proposed` | `config/calendar.md` | Một nguồn duy nhất cho ngày tháng. Luật `LAW.check.weekday` kiểm mọi ngày trong tài liệu theo file này. |
| `CFG.ids` | `config` | `proposed` | `config/ids.md` | Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; … |
| `CFG.levels` | `config` | `proposed` | `config/levels.md` | Mức đo **độ cần thiết** của một tuyến, node hoặc giao điểm đối với truyện **trong một giai đoạn**. Không đo độ hay của chất liệu. |
| `CFG.phases` | `config` | `proposed` | `config/phases.md` | Chiều thời gian của star schema. Mọi giá trị động (weight, relation, state, voice, hiệu lực luật) được ghi **theo giai đoạn**. Thứ tự cố … |
| `CFG.statuses` | `config` | `proposed` | `config/statuses.md` | Mỗi dòng, mỗi file mang một trạng thái. Trạng thái là mức ổn định: tầng nào dựa vào tầng nào thì không được ổn định hơn nó. |
| `GUIDE.main` | `guide` | `draft` | `GUIDELINES.md` | Read this first in every session. It says how to work on the story. For what the system *is* (entities, ids, inheritance, tooling), look … |
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
