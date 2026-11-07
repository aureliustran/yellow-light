---
id: schema.secret
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §8.3]
---
# schema · secret

Bí mật là thực thể riêng để theo dõi **ai biết gì lúc nào**. **Vị trí:** `world/secrets/<id>.md`. **Mã:** `SEC-<n>`.

Property: `id`, `kind: secret`, `status`, `updated`, `aliases`.

Mục:
- `truth`: sự thật là gì (một câu).
- `initial-holders`: ai biết khi truyện bắt đầu.
- `guard`: điều kiện để bí mật còn giữ (ví dụ: sự kiện khách quan dàn xếp, Q-001).
- `reveal`: tình tiết dự kiến làm lộ (`[[node-nn]]`) — tùy chọn.

Quy ước: sổ ai biết gì **không viết tay** ở đây. Tình tiết khai `changes: SEC-n: +[[CH.…]]`; script sinh sổ theo thời gian vào view của giao điểm. `LAW.check.secret-leak` bắt cảnh dùng điều bí mật khi người trong cảnh chưa biết.

Ví dụ nên thành secret: thân phận Nhi (Q-001), quân sư bí mật (X-06), kênh K17.
