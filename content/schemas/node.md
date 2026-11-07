---
id: schema.node
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §8.1]
---
# schema · node

Node là thực thể **động** (bảng sự kiện): một mạch có người, có sự kiện trên trục thời gian, phục vụ ít nhất một trục AX. **Vị trí:** `storylines/<tuyến>/<NODE>.md`. **Mã:** `ROM.TN`, `PAST.T`, `SELF.thuyen`… (xem `config/ids.md`).

## Property

`id`, `kind: node`, `parent` (đúng **một** cha), `status`, `updated`, `participants` (link tới `CH.`, `GRP.`, `SET.`), `axes` (`AX…`).

## Mục

| Mục | Nội dung |
| --- | --- |
| `arc` | Một đoạn: bắt đầu ở đâu, kết thúc ở đâu, đổi gì trong nhân vật |
| `weight` | Mức theo giai đoạn (`config/levels.md`): `OPEN`, `P1`, `P2`, `BREAK`, `AFTER`, `POST`. **Node làm chủ giá trị này** |
| `relation` | Theo giai đoạn × chiều: là gì của nhau, ai biết gì, `STEP.rom` / `EXL` |
| `state` | Thuộc tính node làm chủ, theo người × giai đoạn |
| `voice` | Theo người × giai đoạn: register lời kể (`R1`–`R9`), giọng thoại → `lib/`, `rules/` |
| `rules` | Decree: luật riêng của node (khuôn `schemas/law.md`, phạm vi chỉ trong node) |
| `events` | Bảng tình tiết (`schemas/event.md`) |
| `transitions` | Giá trị nào đổi ở tình tiết nào |
| `gaps` | Khoảng trống: chỗ chưa có tình tiết |

## Luật

1. **Một chủ cho mỗi thuộc tính.** Quan hệ → node của quan hệ. Nội tâm → `SELF.<id>`. (`LAW.check.owner`)
2. **Node con không vượt mức cha** trong cùng giai đoạn; mức tuyến cha = mức cao nhất của node con.
3. **Giọng theo tầng:** tình tiết > node × giai đoạn > `SELF` × giai đoạn > giọng nền (`CH.<id>.voice`).
4. Node **không trỏ node khác trực tiếp** để lấy giá trị; chỉ qua `world/` (tĩnh) hoặc giao điểm `X-` (động).
5. Mỗi node một cha; quan hệ nhiều chiều đi qua giao điểm.
