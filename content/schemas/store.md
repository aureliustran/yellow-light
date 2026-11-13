---
id: SCH.store
kind: schema
entity: store
status: locked
updated: 2026-11-13
required: [id, kind, status, updated, columns, key]
aliases: [schema.store]
sources:
  - "tác giả 13/11 (storage: kind store, id STO.<tên>, mỗi kho một file, mỗi mục một dòng; law trỏ bằng data)"
---
# schema · store

A store holds **data a law or a style reads**: lists, tables, dictionaries (the Hà Tĩnh dictionary, the address table, display blocks, real and fictional names) `locked 13/11`. A law says what may be written; the store says with which words. Keeping the rows out of the law lets the list grow without touching the law.

**Location:** `content/storage/STO.<name>.md`, one store per file. **Id:** `STO.<name>` (name in Vietnamese ASCII, like other story names). **Layer:** L1.5, next to `rules/` and `lib/`: it may reference L0–L1 and the laws that read it; `world/`, `storylines/` and `plans/` may reference it.

## Header

| Field | Meaning |
| --- | --- |
| `columns` | column names of the `entries` table, in order (English or Vietnamese ASCII) |
| `key` | the column that identifies a row; unique in the store |

No `used-by`: which laws read a store is a reverse lookup, generated (laws point to stores with `data`).

## Sections

- one-sentence summary, the law(s) that read it, legend of coded values;
- `entries`: one table, **one row per entry**, header row equal to `columns`.

## Rules

1. One entry, one row; no entry spread over several rows, no rows outside `entries` (`LAW.check.store`).
2. A store holds no rule text. A sentence that says what may or may not be written goes to the law; how to write goes to a style.
3. A law reads a store through its header field `data: "[[STO.<name>]]"`; `data` must point to a store (`LAW.check.store`).
4. Adding or changing a row does not change the law's status; the row carries its own source in a column when sources differ.
