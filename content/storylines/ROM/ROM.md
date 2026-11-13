---
id: ROM
kind: node
parent: "[[TREE]]"
status: proposed
updated: 2026-11-10
participants: []
axes: [AX1, AX3, AX7, AX8]
weight: {OPEN: B, P1: SS+, P2: SSS, BREAK: SS+, AFTER: S}
style: {default: REG.lang-man}
aliases: [RM, tuyến tình cảm]
sources:
  - "[[de-xuat/kien-truc-framework|de-xuat/kien-truc-framework.md §8.1, §13.4]]"
---
# ROM · Tuyến tình cảm

Gốc của các node quan hệ tình cảm `ROM.<cặp>`. Khung tạo sớm (10/11) để chứa lõi gương của [[ROM.TN]]; phần còn lại chuyển ở B4c.

## goals

none (chờ B4c)

## weight

| OPEN | P1 | P2 | BREAK | AFTER | POST |
| --- | --- | --- | --- | --- | --- |
| B† | SS+† | SSS† | SS+† | S |  |

Từ ma trận `_archive/tuyen/README.md` §4. Dấu `†`: mức tác giả đặt (25/10); ô không có `†`: Claude gán, chốt 26/10 (Q-028). Cột POST (hậu sân bay) `pending` tới khi "Phần" được định nghĩa (Q-043). Bảng được kiểm bằng `LAW.check.level-parent` (node con không vượt mức cha).

## style `proposed 13/11`

Style mặc định của tuyến: **[[REG.lang-man]]** (R2 Lãng mạn), rút từ ma trận `rules/registers.md` §3 (cột mặc định của các node con). Mọi node con và tình tiết kế thừa, trừ khi node khai register khác (mục `style` của node). Phần cứng của [[STY.default]] luôn áp. Luật: [[LAW.default]] cộng mục `laws` của từng node.

## children

- [[ROM.TN]] Thuyên – Nhi
- [[ROM.TD]] Thuyên – Diệp Anh · [[ROM.PN]] Phong → Nhi · [[ROM.LT]] Linh – Tùng · [[ROM.VA]] Vũ – An Nhiên

## gaps

- Toàn bộ node chờ B4c.
