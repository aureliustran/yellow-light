---
id: schema.belief
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §5]
---
# schema · belief

Niềm tin (cũ: NT-) là sản phẩm của một neo quá khứ, được tình tiết hiện tại tiêu thụ. **Vị trí:** `world/characters/<id>/CH.<id>.beliefs.md` (một file, nhiều BL). **Mã:** `BL-<nn>` (số duy nhất toàn vault).

Mỗi niềm tin là một mục `### BL-nn`:

| Trường | Ý |
| --- | --- |
| `statement` | Phát biểu một câu, bằng giọng nhân vật tin |
| `other-face` | Mặt kia: điều gì làm nó sai hoặc mất hiệu lực |
| `axis` | Trục `AX` mà nó vận hành |
| `origin` | Neo quá khứ sinh ra nó (`[[PAST.…-nn]]`) |
| `status` | `locked` / `proposed` / … |

`consumed-by` (tình tiết nào tiêu thụ niềm tin) **sinh tự động** từ cột `beliefs` của tình tiết; `[chờ tiêu thụ]` là niềm tin chưa có tình tiết nào gọi nó — ứng viên cho plan.

Niềm tin dùng chung nhiều nhân vật thì vẫn thuộc **một** nhân vật gốc; người khác `uses` nó.
