---
id: schema.article
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §6]
---
# schema · article

Điều hiến pháp: bất biến chia từ trục AX; luật giai đoạn lấy căn cứ từ đây. **Vị trí:** `core/constitution/ART-AX<n>.md` (một chương một trục) và `ART-0.md` (chương nền). **Mã:** `ART-AX<n>.<số>`, `ART-0.<số>`.

| Trường | Ý |
| --- | --- |
| `id` | `ART-AX3.1` |
| `statement` | **Một câu**, tiếng Việt |
| `source` | Đoạn nào của câu gốc AX (`core/axes.md`) sinh ra điều này |
| `forbids` | Truyện không được làm gì (kiểm được bằng mắt hoặc máy) |
| `applies-to` | bộ chọn (xem `schemas/law.md`) |
| `status` | `config/statuses.md` |

**Chương 0 (nền)**: căn cứ cho các luật không sinh từ trục — hình thức, khối hiển thị, xưng hô, giọng địa phương, ranh 18, cấu trúc.

## Luật

1. Điều do Claude dựng nháp từ **câu gốc của tác giả**; tác giả duyệt từng điều (luật dùng câu gốc, `tuyen/goc.md` §2). Điều chưa duyệt là `proposed`.
2. Tầng dưới (luật, decree, override) chỉ cụ thể hóa, **không trái** tầng trên. Làm trái một điều thì phải sửa chính điều ấy bằng quyết định `D-` mức cao nhất.
3. Mỗi điều có ít nhất một `source`.
