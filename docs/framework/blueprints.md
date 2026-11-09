---
id: SPEC.blueprints
kind: spec
status: draft
updated: 2026-11-10
sources: [content/de-xuat/kien-truc-framework.md §8.4 (10/11)]
---
# Blueprints and outputs `proposed 10/11`

Fields: schema `blueprint` (planned, B3), `content/schemas/chapter.md`.

## Three tiers

```
storylines/   events                 what happens
plans/        blueprints             how events combine into a chapter: order, scenes, register, who writes
posts/        written chapters       the output
```

Tracing back goes chapter → blueprint → events → nodes → laws, without reading the chapter.

## Blueprint

One per chapter: `plans/chapters/BP.<edition>.<nn>.md`, linked to its output `POST.<edition>.<nn>` (the chapter file in `posts/<edition-dir>/`). It holds:

- **header:** edition, POV, time span, status, output;
- **scenes** (inline `BP.<edition>.<nn>.S<n>`): purpose; register and transitions; pattern; the events it uses, each with a **role**; the assigned writer; the **anchor** (the scene's first sentence, quoted verbatim);
- **in / out:** state at chapter start and end (generated from events' `changes`);
- **hooks:** what opens and what is left hanging;
- **write-kit:** generated, `_views/write-kit/BP.<edition>.<nn>.md`: the resolved blocks of all events in each scene plus the scene's own choices. This is what a writer reads.

**Roles** of an event in a scene: `shows` (on the page in full), `mentions` (referred to), `recalls` (remembered). One event can appear in several chapters.

**Work is assigned per scene** (`writer`). Events decide the content of the assigned part.

## Lifecycle

| Status | Means |
| --- | --- |
| `planned` | written before the chapter |
| `written` | the chapter exists; blueprint not yet checked against it |
| `synced` | blueprint matches the chapter as written (cuts and additions included); chapter hash recorded |

Tracing is only true when the blueprint matches the chapter. Checks: `LAW.check.bp-anchor` (an anchor is no longer in the chapter), `LAW.check.bp-drift` (the chapter changed after `synced`), `LAW.check.bp-coverage` (a `locked` event that should be on the page is shown by no blueprint). Chapter text is never modified to fit a blueprint.

Already written v2 chapters get blueprints built backwards from the text (first sync). Legacy v1 chapters get none unless needed.

## Outputs

| Kind | Id | File |
| --- | --- | --- |
| edition | `ED.v2`, `ED.v1` | `plans/ED.*.md` (maps post ids to chapter files) |
| post | `POST.v2.05` | `posts/vercel/05-chuong-05-san-khau.md` (name unchanged) |
| site | `SITE.rookies` | `crosspost/sites/rookies/` (code), `posts/rookies.vn/` (text) |
| cross-post | `XP.rookies.012` | `posts/rookies.vn/012-hong-dat.txt` |

Cross-post conversion rules per site: `posts/<domain>/convert.md`; workflow: guideline task `crosspost-convert`.
