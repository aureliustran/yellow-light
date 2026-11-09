---
id: GUIDE.roles-and-status
kind: guide
status: draft
updated: 2026-11-10
sources: [quy-trinh.md §1–§3, §4.8, config/statuses.md]
---
# Roles, decisions and status

## Who decides

| | Author | Agent |
| --- | --- | --- |
| canon: names, events, relations, numbers, who knows what when | decides | proposes only |
| keeping files consistent with a decision | — | does it, in the same turn the author decides |
| wording, rhythm, scene order inside an approved blueprint | approves the result | decides, notes the reason |
| `git push`, merging to `main` | yes | never |

**When to ask.** Anything that touches canon: ask first (at most four questions at once, each with a recommendation). Anything inside an approved frame: do it, then report.

## Life of a decision

```
question Q-  →  proposal (proposals/, PROP-NNN)  →  author decides  →  D-NNN recorded
                                                                    ├→ target entities updated (status locked)
                                                                    ├→ entities citing the old decision fixed or marked superseded
                                                                    ├→ related Q- closed; new Q- opened if needed
                                                                    └→ generated views refreshed (canon:check)
```

A decision is done only when every branch is done. Playbook: `tasks/record-decision.md`.

## Status

Values, meaning and stability: `content/config/statuses.md`. In short:

- `page` > `locked`/`delegated` > `agreed` > `proposed` > `draft` > `raw`; `superseded` keeps history (with `by`); `conflict` and `needs-decision` block writing the affected part.
- Something that rests on a less stable thing is a warning (a `locked` law on a `proposed` article).
- In prose, a status is a suffix in code with the date: `` `locked 06/11` ``.
- `assumed` is used only inside proposals: written per the agent's recommendation, the author has not answered separately.
- Writers mark a gap in a draft with `[[CẦN CHỐT: …]]`; it becomes a `Q-` before the draft is done.

**Priority when sources disagree:** published chapter > newer `locked` > older `locked` > `agreed` > `proposed` > `raw`. If that does not settle it, mark `conflict` and open a `Q-`. Never edit a published chapter silently to match canon.

## Repo and Project

The repo is the source. The claude.ai Project "Đèn Vàng" is a selected copy for chat; when they differ, the repo wins.

- **End of a session with changes:** commit (author's identity as configured, never push); copy changed files the Project also holds to the same Project path; report what changed (ids of decisions, closed questions), what waits for the author.
- **Chat without the repo:** answer from the Project copy. Write any decision verbatim to `claude/inbox/<yyyy-mm-dd>-<topic>.md` in the Project; never edit the Project's canon copy. Tell the author it will enter the repo in the next session with the repo; that session merges the inbox first.
