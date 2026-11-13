---
id: CFG.phases
aliases: [config.phases]
kind: config
status: proposed
updated: 2026-11-08
sources:
  - "_archive/tuyen/README.md §3"
  - "[[canon/bible-v2|canon/bible-v2.md §2]]"
---
# phases · Giai đoạn

Chiều thời gian của star schema. Mọi giá trị động (weight, relation, state, voice, hiệu lực luật) được ghi **theo giai đoạn**. Thứ tự cố định, các giai đoạn không chồng nhau.

| Code | Cũ | Tên | Mốc (lịch 2024–2025) | Lõi |
| --- | --- | --- | --- | --- |
| `OPEN` | MĐ | Mở đầu | ch.0 *Nước lạnh* (kể trước) · hiện tại: tuần trước summit · summit khoảng T7 12/10/2024 → vào lab T2 28/10/2024 | Quá khứ từ mầm non đến đại học; summit; nhận lab; Nhi thuê dạy IELTS; MUN |
| `P1` | GĐ1 | Phòng thủ | 28/10/2024 → khảo sát cuối 3/2025 | Thuyên có làm chủ được model không; chuỗi Phong, 31/12, tất niên, *Mixue*, đêm say |
| `P2` | GĐ2 | Tấn công | 4/2025 → trước ngày gãy | Kim bài miễn tử; tự mãn; xác nhận Nhi thích mình nhưng chờ ghế 50 triệu |
| `BREAK` | GÃY | Điểm gãy | từ đêm Khải lật → tối ngày gãy. **Ngày chờ Q-004** (T6 18/7/2025 theo luật dời mốc, hay nhãn "16/7") | Ngày nhận ghế là ngày định tỏ tình; Nhi bị cáo buộc |
| `AFTER` | HP | Hậu quả và hồi phục | sau ngày gãy → sân bay | Đuổi việc, blacklist, làm lành với Vũ, chẩn đoán, NUC, trị liệu gia đình, lớp essay, sân bay |
| `POST` | hậu sân bay | Sau sân bay | bible §9 (Phần 2–4) | **Chưa định nghĩa.** Mức ghi `pending` cho đến khi "Phần" được định nghĩa (Q-043) |

## Ghi chú

- Ch.0 *Nước lạnh* nằm trong `OPEN` theo thứ tự đọc nhưng thuộc `AFTER` theo lịch. Mức tính cho `OPEN`.
- `POST` có mặt từ đầu để node có chỗ ghi `pending`; luật `LAW.check.exl-monotonic` bỏ qua `POST` cho đến khi nó có mốc.
- Ngày của mọi mốc đi theo `config/calendar.md`; không ghi lại ngày ở nơi khác.

## Thứ tự và tính toán

`OPEN < P1 < P2 < BREAK < AFTER < POST`. Một khoảng chương vắt qua hai giai đoạn thì xử lý từng nửa (cây quyết định, lối vào A bước 1).
