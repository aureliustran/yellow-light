---
id: THR
kind: node
parent: "[[TREE]]"
status: proposed
updated: 2026-11-10
participants: []
axes: [AX4, AX5, AX6, AX3]
weight: {OPEN: A, P1: SS+, P2: SSS, BREAK: SSS, AFTER: A}
style: {default: REG.dau-tri}
aliases: [TH, Tuyến thriller, đấu trí]
sources:
  - "_archive/tuyen/README.md §4 (chuyển 10/11)"
  - "[[de-xuat/cay-tuyen|de-xuat/cay-tuyen.md]]"
---
# THR · Tuyến thriller, đấu trí

Gốc của các node `THR.*`. Khung (T2, 10/11): chỉ có `weight` và `children`; mọi mục khác chờ chuyển.

## weight

| OPEN | P1 | P2 | BREAK | AFTER | POST |
| --- | --- | --- | --- | --- | --- |
| A | SS+† | SSS† | SSS† | A |  |

Từ ma trận `_archive/tuyen/README.md` §4. Dấu `†`: mức tác giả đặt (25/10); ô không có `†`: Claude gán, chốt 26/10 (Q-028). Cột POST (hậu sân bay) `pending` tới khi "Phần" được định nghĩa (Q-043). Bảng được kiểm bằng `LAW.check.level-parent` (node con không vượt mức cha).

## style `proposed 13/11`

Style mặc định của tuyến: **[[REG.dau-tri]]** (R4 Đấu trí), rút từ ma trận `rules/registers.md` §3 (cột mặc định của các node con). Mọi node con và tình tiết kế thừa, trừ khi node khai register khác (mục `style` của node). Phần cứng của [[STY.default]] luôn áp. Luật: [[LAW.default]] cộng mục `laws` của từng node.

## children

[[THR.MO]] · [[THR.LAB]] · [[THR.MODEL]] · [[THR.LM]] · [[THR.T18]] · [[THR.DR]]

## gaps

- `arc`, `goals`, `style`, `voice`, `laws`: chờ chuyển.
