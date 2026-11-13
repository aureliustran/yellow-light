---
id: CFG.calendar
aliases: [config.calendar]
kind: config
status: proposed
updated: 2026-11-10
sources:
  - "[[canon/bible-v2|canon/bible-v2.md §2]]"
  - "[[brief-tinh-cam-thuyen-nhi|brief-tinh-cam-thuyen-nhi.md]]"
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

## Lớp ↔ năm học ↔ tuổi `proposed 10/11`

Năm học bắt đầu tháng 9. Tuổi ghi là tuổi tròn vào ngày 5/9 đầu năm học. Công thức (dùng cho `LAW.under-18`): tuổi ở một ngày = năm của ngày ấy − năm sinh, trừ 1 nếu chưa tới ngày sinh nhật.

| Mốc | Thuyên | Nhi |
| --- | --- | --- |
| Sinh | 17h, 8/5/2004 `locked 31/10` | Thứ Hai 3/10/2005, cung Thiên Bình `agreed 10/11` (tác giả: Thiên Bình, một ngày tháng 10; Claude chọn ngày, đổi được trong khoảng 1–12/10) |
| Đủ 18 tuổi | 8/5/2022 (giữa lớp 12) | 3/10/2023 (đầu năm nhất đại học) |
| Ở hiện tại | 20 tuổi ở summit 12/10/2024; 21 tuổi ở ch.0 27/7/2025 `locked 31/10` | "luôn 19 tuổi ở hiện tại" `locked 29/10` |
| Đại học | vào 2022, K67 `locked 31/10`; năm ba ở summit | vào 2023 (suy ra); năm hai ở summit |

| Lớp | Thuyên: năm học · tuổi | Nhi: năm học · tuổi |
| --- | --- | --- |
| 1 | 2010–11 · 6 | 2011–12 · 6 |
| 2 | 2011–12 · 7 | 2012–13 · 7 |
| 3 | 2012–13 · 8 | 2013–14 · 8 |
| 4 | 2013–14 · 9 | 2014–15 · 9 |
| 5 | 2014–15 · 10 | 2015–16 · 10 |
| 6 | 2015–16 · 11 | 2016–17 · 11 |
| 7 | 2016–17 · 12 | 2017–18 · 12 |
| 8 | 2017–18 · 13 | 2018–19 · 13 |
| 9 | 2018–19 · 14 | 2019–20 · 14 |
| 10 | 2019–20 · 15 | 2020–21 · 15 |
| 11 | 2020–21 · 16 | 2021–22 · 16 |
| 12 | 2021–22 · 17 | 2022–23 · 17 |

Nguồn: `_archive/tuyen/qua-khu/thuyen.md` (đầu file, mốc `locked 31/10`: lớp 1 2010–11, lớp 3 2012–13 lúc 8 tuổi, lớp 6 2015–16, thi chuyên 6/2019, lớp 10–11 2019–21, lớp 12 2021–22, đại học 2022); `_archive/tuyen/qua-khu/nhi.md` §1 (sinh 2005; mốc cũ lùi 2 năm; N.1 8 tuổi 2013; N.6 lớp 12 2022–23). Bảng Nhi suy ra theo cùng quy tắc (vào lớp 1 năm tròn 6 tuổi). Misha sinh 2004, cùng năm Thuyên `locked 31/10`. Khánh, em trai Thuyên: sinh 2009 `proposed 10/11`; lớp 1 năm 2015–16, lớp 10 năm 2024–25; đủ 18 tuổi năm 2027.

**Ràng buộc** (đã thỏa): Nhi sinh 2005 mà 19 tuổi suốt hiện tại (12/10/2024 → 27/7/2025) thì sinh nhật phải trong khoảng 28/7 – 12/10; cộng cung Thiên Bình (từ 23/9) còn **1/10 – 12/10**. Ngày 3/10 đặt trước ch.1 (T7 5/10/2024) để không chạm chương đã đăng.

### Mốc cũ chưa đổi theo lịch 31/10 `conflict` · cách xử lý `agreed 10/11`

Bảng neo QK.T còn ghi năm theo lịch cũ; các năm này lệch với bảng trên. Lịch `locked 31/10` thắng; tác giả đồng ý sửa các dòng sau khi chuyển `PAST.T` (B3c):

| Dòng (`_archive/tuyen/qua-khu/thuyen.md`) | Ghi | Theo lịch 31/10 |
| --- | --- | --- |
| 1.5 Tờ nháp, lớp 6 | 12/2017 | lớp 6 là 2015–16 → 12/2015 |
| 1.7 Bẻ roi, lớp 7 | 4/2019 | lớp 7 là 2016–17 → 4/2017 |
| 1.8 Giấy khen, lớp 8 | 7/2020 | lớp 8 là 2017–18 → 7/2018 |
| 1.11 Phiếu thi chuyên | 5–6/2021 | thi chuyên 6/2019 |
| §2 *Phẫn uất*, lớp 12 | 2023–24 | 2021–22 |
| "Mốc đã chốt 27/10": HSG quốc gia Tin | 2023 | lớp 11 là 2020–21 → 2021 |
| §2 *Hoan hỉ*, lớp 10 | 2021–22 | 2019–20 |
| §2 *Hụt hẫng* (thi quốc gia 24–25/2, kết quả 13/3) | 2023 | 2021 |
| §2 *Biết ơn*, *Hy vọng* | 4–5/2023, hè 2023 | 4–5/2021, hè 2021 |

Thứ trong tuần của mọi ngày mới đổi phải kiểm bằng code (`LAW.check.weekday`).

## Còn thiếu

- Ngày Q-004: cả chuỗi mốc trong tuần ấy đi theo cùng một lựa chọn.
