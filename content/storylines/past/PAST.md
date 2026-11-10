---
id: PAST
kind: node
parent: "[[TREE]]"
status: agreed
updated: 2026-11-10
participants: []
axes: [AX2, AX3, AX4, AX7, AX9]
weight: {OPEN: SSS, P1: A, P2: B, BREAK: A, AFTER: S}
aliases: [QK, tuyến quá khứ]
sources: [tuyen/qua-khu/README.md, tuyen/goc.md]
---
# PAST · Tuyến quá khứ

Gốc của các node quá khứ: mỗi node là một bảng neo sinh niềm tin mà hiện tại tiêu thụ. Luật kể quá khứ (bốn luật QK): `tuyen/qua-khu/README.md` §3 (chuyển sang `rules/` ở B4).

## goals

### PAST.G1

- **statement:** Quá khứ sinh ra những niềm tin mà hiện tại tiêu thụ; mỗi neo phải có chỗ được tiêu thụ ở hiện tại.
- **serves:** AX3, AX7, AX9 (trục nặng của phần mở đầu, `goc.md` §4)
- **status:** `agreed`

## weight

| OPEN | P1 | P2 | BREAK | AFTER | POST |
| --- | --- | --- | --- | --- | --- |
| SSS | A | B | A | S |  |

Từ ma trận `tuyen/README.md` §4. Dấu `†`: mức tác giả đặt (25/10); ô không có `†`: Claude gán, chốt 26/10 (Q-028). Cột POST (hậu sân bay) `pending` tới khi "Phần" được định nghĩa (Q-043). Bảng được kiểm bằng `LAW.check.level-parent` (node con không vượt mức cha).

## children

[[PAST.T]] · [[PAST.N]] · [[PAST.DA]] · [[PAST.K]]
