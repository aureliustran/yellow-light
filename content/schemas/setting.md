---
id: schema.setting
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §4]
---
# schema · setting

Bối cảnh (nơi, không gian lặp lại). **Vị trí:** `world/settings/<id>.md`. **Mã:** `SET.<id>`.

Property: `id`, `kind: setting`, `status`, `updated`, `aliases`, `parent` (bối cảnh lớn hơn, nếu có).

Mục: `identity` (là nơi nào, ở đâu, ra sao) · `features` (đặc điểm giác quan dùng đi dùng lại) · `rules` (ví dụ: chỉ có hai sân bóng) · `exports`.

`appears-in` (những node, giao điểm dùng nơi này) **sinh tự động** từ backlinks, không viết tay.
