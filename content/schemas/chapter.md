---
id: schema.chapter
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §4]
---
# schema · chapter

Chương đã viết hoặc đang viết, nằm ở `content/posts/vercel/` (không đổi tên, không chuyển). Schema này mô tả **hồ sơ chương** ghi bên ngoài chương, để chương không bị nhồi metadata.

**Vị trí hồ sơ:** hàng trong `plans/` hoặc `_views/chapters.md` (sinh). **Mã:** `ch-<số>` theo tên file trong `content/posts/vercel/`.

| Trường | Ý |
| --- | --- |
| `file` | `content/posts/vercel/NN-….md` |
| `status` | `page` (đã đăng) / `draft` / `needs-decision` |
| `phase` | giai đoạn |
| `pov` | `CH.…` |
| `register` | `R1`–`R9` theo nhịp |
| `events` | tình tiết lên trang (`[[ROM.TN-014]]`…) |
| `x` | giao điểm |

Luật: chương `page` đứng đầu thứ tự ưu tiên (`config/statuses.md`): khi canon trong `content/` trái chương đã đăng, sửa canon hoặc mở `Q-`, không sửa chương ngầm.
