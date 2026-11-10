---
id: CORE
kind: spec
status: locked
updated: 2026-11-10
aliases: [gốc, core]
sources: [tuyen/goc.md §1, §2 (luật dùng), §4, §5 (chuyển 10/11)]
---
# Gốc (core)

Gốc không có tình tiết và không có mức. Nó giữ thứ mọi tuyến được sinh ra để phục vụ: chín trục hiện sinh (`core/axes/AX1` … `AX9`), các thang (`core/SCALE.*`), hiến pháp (`core/constitution/`), và một cơ chế dùng chung (nhờn thuốc, dưới đây). Nó có mặt ở mọi giai đoạn, qua mọi tuyến, và được triển khai trong các tuyến chứ không có node riêng.

**Gốc giữ trục, không giữ cơ chế vận hành** `locked 28/10`. Cách một trục chạy trong truyện (một cỗ máy tâm lý, một chuỗi nhân quả) nằm ở node hoặc nhân vật mang nó, và nơi ấy trỏ về trục. Ngoại lệ: cơ chế nhờn thuốc, vì nhiều node dùng chung.

Lý do và lịch sử thiết kế: `de-xuat/cay-tuyen.md` §2; đối chiếu lõi cũ: `de-xuat/hop-nhat-loi-cu.md`.

## Một câu

Chép từ bible §3:

> Một chàng trai sống bằng khả năng đọc người lập phe để sống sót trong một lab độc hại. Anh lùi lại nhìn cô gái mình thích đi về phía người khác, đợi đến ngày thấy mình "đủ" mới dám bước lên, và đúng ngày ấy mất tất cả, rồi đổ lỗi cho chính cô.

## Trục

| Mã | Trục | Trạng thái |
| --- | --- | --- |
| [[AX1]] | Đèn vàng | `locked 10/11` |
| [[AX2]] | Sống hay sống sót | `locked 26/10` |
| [[AX3]] | Cây thước | `locked 28/10` |
| [[AX4]] | Đọc người, mù với mình | `locked 10/11` |
| [[AX5]] | Định giá | `locked 10/11` |
| [[AX6]] | Thị trường là thứ người có quyền tạo ra | `locked 10/11` |
| [[AX7]] | Được đồng ý mà không được nghe; được khen mà không được ôm | `locked 28/10` |
| [[AX8]] | Điều trị bắt đầu từ chính mình | `locked 10/11` |
| [[AX9]] | Kẻ mạnh | `locked 28/10` |

Khuôn và luật dùng trục: `schemas/axis.md`. **"Cần" của các nhân vật khác** (Nhi, Diệp Anh, Khải) ánh xạ vào trục có sẵn qua mục `purpose` của gói nhân vật (`Cần → AX`) `locked 26/10`; thêm trục mới chỉ khi có một "Cần" không vào trục nào, hoặc một linh kiện đủ điều kiện lên trục.

## Cung hiện sinh theo giai đoạn

Gốc nói mỗi giai đoạn đứng ở nấc nào ([[SCALE.exl]]), trục nào nặng nhất. Node mang nó là gợi ý, không phải chủ.

| Giai đoạn | Nấc | Trục nặng | Node đang mang (gợi ý) |
| --- | --- | --- | --- |
| OPEN (MĐ) | 1 đến 7 qua hồi tưởng; mở bằng nấc 9 (*Nước lạnh*) | AX3, AX7, AX4 | `PAST.T` sinh từng nấc; `SOL.DT` (ba dòng tiểu sử "không dòng nào sai", Casio dây rộng); `FAM.T` (cuộc gọi, áo sơ mi trắng) |
| P1 (GĐ1) | 7: cô đơn giữa đám đông, hài hước khô | AX1, AX4, AX7 | `ROM.TN` (lùi, quân sư; phương trình đẩy Nhi ra); `THR.LAB` (phòng thủ, sửa lỗi người khác); `SOL.VU` ("Mày đang lùi đấy à?") |
| P2 (GĐ2) | 8: câu hỏi bị thay bằng danh sách; vắng mặt | AX3, AX5, AX2, AX9 | `THR.LAB` (thủ đoạn chủ động; áp chế, kẻ bị đo thành kẻ cầm thước); `ROM.TN` (bảng tính tỏ tình); `SOL.DT` (thôi quy ra bún riêu, câu đùa thưa dần); `SOL.VU` (rạn nứt, "sống hay sống sót"); `FAM.T` (khoe 50 triệu ở giỗ ông). Câu tác giả 25/10 22:27 (AX5, AX4) ở nấc 8 |
| BREAK (GÃY) | 9: đáy, cả bốn mối lo dồn lại | AX5, AX3, AX4, AX9 | `THR` (blacklist là cả thị trường định giá lại anh; bảng giá người); `ROM.TN` (định nghĩa Nhi là nguồn tin); `FAM.N` (thân phận). Ứng viên 26/10 14:42: bốn người đứng dậy nhờ phần tốt của Thuyên ở GĐ1, phần tốt sống sót, người làm ra nó thì không |
| AFTER (HP) | sau đáy; AX8 mở, vẫn không trả lời thay anh | AX8, AX2, AX7, AX9 | `FAM.T` (trị liệu gia đình); `SOL.DT` (chẩn đoán); `SOL.VU` (cột rổ sáng sớm); `SOL.SAN` (NUC) |

## Cơ chế dùng chung: nhờn thuốc `locked 11/10`

Nguồn: `brief-kieu-ngao-tang-dan.md` §1–3, `brief-van-phong-dau-tri.md` §8. Phần thuộc thriller (domino, *Quân trắng*, *Quân đen*) ở node `THR`. Gốc của thuốc (sức mạnh làm bớt đau) ở [[AX9]]; vận hành ở nhân vật: `FN.thuyen.nhien-lieu`, cụm C5 của niềm tin Thuyên (lực kéo và lực đẩy).

Kiêu ngạo của Thuyên vận hành như một thứ gây nghiện:
- **Liều đầu thì ngấm sâu.** Sự công nhận đầu tiên làm anh dừng tay một giây, và cái giây ấy ở lại cả buổi chiều.
- **Liều lặp lại thì nhạt dần.** Cùng một lời công nhận, lần sau anh thấy nhạt, thậm chí phiền.
- **Phải tăng liều.** Nguồn cao hơn: sếp, hội đồng, người lạ, rồi chính bố mẹ phải thua lý lẽ của anh.
- **Nguồn cũ bị coi thường.** Những ai từng làm anh ấm (Vũ, đàn em ở sân, anh Tuấn, cả Nhi) dần thành "nhỏ".

Công thức mỗi nấc: **nhiên liệu → phản ứng của anh → nấc mới → cái giá chỉ người đọc thấy.** Kiểu kiêu ngạo của kẻ mạnh âm thầm (tĩnh, kiệm lời, nhìn xuống hoặc nhìn ra, không bao giờ nhìn lên). Người kể không gọi tên cơ chế; chỉ đặt cạnh nhau. Hai trường tùy chọn của tình tiết lấy từ đây: `fuel` (nhiên liệu) và `cost` (giá), bắt buộc với node mức S trở lên `locked 26/10`.

## Luật triển khai và luật sinh tuyến

Chuyển sang `docs/framework/storylines.md` (*Axis rules*).
