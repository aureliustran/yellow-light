---
id: schema.group
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §5]
---
# schema · group

Nhóm người và nhân vật quần chúng. **Vị trí:** `world/groups/<nhóm>.md`. **Mã:** `GRP.<id>` (đề xuất; chưa có trong `config/ids.md`).

Property: `id`, `kind: group`, `status`, `updated`, `aliases`, `members` (danh sách `[[CH.…]]` nếu thành viên đã có gói).

Mục:
- `identity`: nhóm là ai, nhóm làm gì, ở đâu (`[[SET.…]]`).
- `members`: bảng một hàng một thành viên: `name`, `role`, `traits`, `appears` (`[[node]]` — để trống nếu sinh tự động).
- `rules`: ranh của nhóm (ví dụ hội đồng Nhi: ba người, bỏ thành viên nam).
- `exports`.

Thành viên được dùng ở ≥2 node hoặc có hàm riêng thì **nâng thành gói** `CH.<id>`; hàng trong bảng đổi thành link.
