---
id: config.calendar
kind: config
status: proposed
updated: 2026-11-08
sources: [canon/bible-v2.md §2, brief-tinh-cam-thuyen-nhi.md]
---
# calendar · Lịch

Một nguồn duy nhất cho ngày tháng. Luật `LAW.check.weekday` kiểm mọi ngày trong tài liệu theo file này.

## Luật dời mốc

Bản cũ dùng 2026–2027. Phần 1 của v2 dùng **2024–2025**: lùi hai năm, cộng hai ngày để giữ thứ trong tuần (+2 ngày, giữ thứ) `locked` (theo brief). Ví dụ: 16/7/2027 (T6) → 18/7/2025 (T6). Nhãn cũ "15/7", "16/7" sai thứ ở 2025 (T3, T4); xem `X4`.

Tết Ất Tỵ: T4 29/1/2025 `locked 24/10`.

## Mốc

| Mốc | Bản cũ | v2 | Giai đoạn | Trạng thái |
| --- | --- | --- | --- | --- |
| Summit | khoảng 10/10/2026 | khoảng T7 12/10/2024 | `OPEN` | proposed |
| Buổi học 1 | CN 25/10/2026 | CN 27/10/2024 | `P1` | proposed |
| Vào lab | T2 26/10/2026 | T2 28/10/2024 | `P1` | proposed (suy ra) |
| Đề boyfriend | — | CN 8/12/2024 | `P1` | locked (dời lên tháng 12) |
| Diệp Anh tỏ tình | 31/12 | T3 31/12/2024 | `P1` | locked 20/10 |
| Sự kiện tất niên | — | T5 16 – T7 18/1/2025, gala tối T7 | `P1` | locked 24/10 (khung); ngày cụ thể proposed |
| Tết | — | T4 29/1/2025 | `P1` | locked 24/10 |
| Khảo sát | tháng 3/2027 | tháng 3/2025 | `P1` | proposed |
| Email production | 17/5/2027 | T2 19/5/2025 | `P2` | proposed (suy ra) |
| Rạn nứt với Vũ | 12/6/2027 | T7 14/6/2025 | `P2` | proposed (suy ra) |
| Tiệc mừng R&D | 18/6/2027 | T6 20/6/2025 | `P2` | proposed (suy ra) |
| Giỗ ông | 26/6/2027 | T7 28/6/2025 | `P2` | proposed (suy ra) |
| Ba mảnh khớp lại | 15/7/2027 | T5 17/7/2025 | `BREAK` | proposed (áp khi Q-004 chốt, Q-045) |
| **Điểm gãy** | **16/7/2027** | **T6 18/7/2025** | `BREAK` | **conflict X4 / Q-004**: các doc vẫn gọi "16/7" |
| Lễ tốt nghiệp | 24/7/2027 | T7 26/7/2025 | `AFTER` | proposed (suy ra) |

## Còn thiếu (làm ở B3, khi cắt gói Thuyên)

- Bảng **lớp ↔ năm học ↔ tuổi** của Thuyên và Nhi (nguồn: `tuyen/qua-khu/thuyen.md`, `nhi.md`). `LAW.under-18` cần bảng này để tính ai dưới 18 tuổi ở một ngày. Chưa chép ở B1 để khỏi nhân đôi nguồn.
- Ngày Q-004: cả chuỗi mốc trong tuần ấy đi theo cùng một lựa chọn.
