---
id: schema.plan
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §13.6]
---
# schema · plan

Plan cho một khoảng chương. **Vị trí:** `plans/<khoảng>/…`. Đầu ra của lối vào A (cây quyết định, `tuyen/README.md` §5).

Property: `id`, `kind: plan`, `status`, `updated`, `range` (chương đầu–cuối), `phase`.

Mục: `scope` (bảng: node, mức · vai, tình tiết đến hạn, giao điểm, khoảng trống, `BL`, register) · `not-touched` (node ngoài phạm vi; writer và reviewer không kéo vào nếu chưa hỏi) · `beats` (khung chương) · `notes`.

Luật: plan chỉ **đọc** `world/`, `storylines/`, `rules/`; không ghi giá trị mới vào chúng. Quyết định phát sinh đi qua `proposals/` rồi mới vào node.
