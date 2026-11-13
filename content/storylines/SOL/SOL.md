---
id: SOL
kind: node
parent: "[[TREE]]"
status: proposed
updated: 2026-11-10
participants: []
axes: [AX2, AX5, AX7]
weight: {OPEN: A, P1: A, P2: S, BREAK: B, AFTER: S}
style: {default: REG.doi-thuong}
aliases: [SL, Tuyến đời thường]
sources:
  - "_archive/tuyen/README.md §4 (chuyển 10/11)"
  - "[[de-xuat/cay-tuyen|de-xuat/cay-tuyen.md]]"
---
# SOL · Tuyến đời thường

Gốc của các node `SOL.*`. Khung (T2, 10/11): chỉ có `weight` và `children`; mọi mục khác chờ chuyển.

## weight

| OPEN | P1 | P2 | BREAK | AFTER | POST |
| --- | --- | --- | --- | --- | --- |
| A | A | S | B | S |  |

Từ ma trận `_archive/tuyen/README.md` §4. Dấu `†`: mức tác giả đặt (25/10); ô không có `†`: Claude gán, chốt 26/10 (Q-028). Cột POST (hậu sân bay) `pending` tới khi "Phần" được định nghĩa (Q-043). Bảng được kiểm bằng `LAW.check.level-parent` (node con không vượt mức cha).

## style `proposed 13/11`

Style mặc định của tuyến: **[[REG.doi-thuong]]** (R1 Đời thường), rút từ ma trận `rules/registers.md` §3 (cột mặc định của các node con). Mọi node con và tình tiết kế thừa, trừ khi node khai register khác (mục `style` của node). Phần cứng của [[STY.default]] luôn áp. Luật: [[LAW.default]] cộng mục `laws` của từng node.

## children

[[SOL.VU]] · [[SOL.SAN]] · [[SOL.HD]] · [[SOL.DT]]

## gaps

- `arc`, `goals`, `style`, `voice`, `laws`: chờ chuyển.
