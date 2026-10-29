# Plan – Khoanh vùng: phép thử bàn giao (chốt 14/10, đang viết)

Thay cho phần "nghỉ một ngày" trong `claude/plan-phep-thu.md`. Nguyên tắc giữ nguyên: mọi lập luận nằm trên trang, dùng thẳng chữ *cơ sở, mục đích, phép thử, đỗ, trượt, phán quyết*; ngắn, không bắt người đọc tự liên tưởng.

## Lịch

| Ngày | Chương | Việc |
| --- | --- | --- |
| Thứ Năm 27/5, tối | Cuối ch.36 | Câu hỏi, mục đích, vì sao chiều 21/5 chưa đủ, **vì sao nghỉ một ngày cũng chưa đủ**, khoanh vùng 10 việc, tiêu chí, đoán trước, xin lão, viết bàn giao có cột *vì sao* đến hai giờ sáng |
| Thứ Sáu 28/5 | Ch.37 | Buổi bàn giao. Anh ngồi tại chỗ, không làm hộ. Ô 712 đỏ, anh Kiên tự sửa (dữ kiện đầu tiên ngược với dự đoán). Tối: Diệp Anh |
| 31/5 – 3/6 | Ch.38 (lướt) | Người nhận làm; anh chỉ trả lời "xem mục X" |
| Thứ Sáu 4/6 | Ch.38 | Anh nghỉ hẳn. 18h đọc kết quả, chấm A/B/C, phán quyết, lấy lại vận hành, rồi mới điền form 360 (hạn đúng 4/6) |

## Vì sao không chỉ nghỉ một ngày (phải lên trang)

Nghỉ một ngày thì người ta chỉ cần đợi đến thứ Hai: lại là một chiều thứ Sáu khác. Muốn biết có ai thay được mình thì phải để người ta không còn cách nào đợi: giao hết, giao thật, giao đủ.

## Khoanh vùng (bảng `khoanh_vung.md` trong ch.36)

| # | Việc | Người nhận | Anh đoán |
| --- | --- | --- | --- |
| 1 | Vận hành đường ống: mẻ đêm, cảnh báo, chạy lại ô lỗi | Kiên | B |
| 2 | Ô lỗi theo mùa: mây, bóng mây, ngưỡng | Kiên, Bảo | C |
| 3 | Huấn luyện lại mô hình khi có dữ liệu mới | Bảo | C |
| 4 | Quy chuẩn nhãn, kiểm định nhãn | Quỳnh | A |
| 5 | Câu hỏi kỹ thuật của đối tác | Bảo viết, Trâm gửi | B |
| 6 | Tài liệu, câu hỏi từ tầng 18 | Bảo | B |
| 7 | Số liệu, phụ lục cho báo cáo của lão | Hạnh | B |
| 8 | Kế hoạch scaling lên production | Bảo | C |
| 9 | Kiến trúc production (hệ phân tán) | Bảo | C |
| 10 | Tinh chỉnh mô hình theo kiến trúc và yêu cầu khách | Bảo | C |

**Tiêu chí (note mực, viết trước khi giao):** đo bốn thứ (xong chưa / đúng không / mất bao lâu / nói được vì sao không). A = làm ngang mình. B = làm được, chậm hơn hoặc kém hơn. C = không làm được. Toàn A, B: trượt, mình thay được. Có C: đỗ, ở đúng những ô C.
- **Vì sao B cũng là trượt:** lão không cần người làm ngang anh, lão chỉ cần người làm được.
- **Vì sao đoán trước:** đoán sau khi thấy kết quả là kể chuyện, không phải đo (nối với câu "tháo một lớp ra" thời làm đề tài).
- **Vì sao 8–10 đoán C:** ba việc nằm ở giao của hệ phân tán, toán của mô hình và yêu cầu khách. Anh Bảo giỏi hệ thống, không biết sai số lan qua biên ô thế nào; khối kinh doanh biết yêu cầu khách, không biết mô hình.
- **Cách thử 8–10:** giao anh Bảo chương *Kiến trúc triển khai* cùng yêu cầu thật cho một tỉnh miền núi (Lào Cai: ruộng bậc thang, dốc). Thiết kế được tinh chỉnh cho đồng bằng; ở đồi dốc, sai số độ cao dồn ở biên ô. Kết quả ch.38: triển khai theo thiết kế B, tự chỉnh cho địa hình mới C. "Phần này chú làm đi."

**Phép thử trung thực:** bàn giao đủ, có cả cột *vì sao*. Anh biết bàn giao đủ có thể làm phép thử trượt, và vẫn viết: nếu dưới chân là cát thì phải biết trước khi dồn sức nặng lên. Bỏ chi tiết "biết mà chọn không sửa" của bản cũ. Biến chất nằm ở phản ứng sau kết quả (ch.38 lấy lại vận hành; ch.44 kế hoạch Go và cắt mối nối).

**Vỏ với lão:** "chuẩn bị người dự phòng trước production; khối hỏi rủi ro phụ thuộc một người thì mình có câu trả lời". Lão duyệt vì vừa thắng và vì cần tên cho danh sách. Chữ *rủi ro phụ thuộc một người* sau này quay lại ở *Quân đen*.

## Ch.37 (28/5): buổi bàn giao

1. Sáng: phòng họp nhỏ, mười tờ, mỗi người nhận một tập. Cuốn sách hệ thống phân tán nằm trên bàn, gáy sờn, đầy giấy nhớ; người kể nói thẳng: sách mượn làm bình phong là sách anh đọc thật.
2. Anh Kiên đọc dòng *vì sao* của bước 3, hiểu ra 0,35. Chị Quỳnh hỏi đúng một câu. Chị Hạnh đọc việc giao cho mình như một cử chỉ làm hòa. Anh Bảo nhận sáu việc: "Chú đang thử ai? Thử bọn anh hay thử chú?" / "Thử cái lab." Người kể: thật ra là thử anh.
3. Luật của anh: ngồi tại bàn, không làm hộ, ai hỏi chỉ trả lời "mục X".
4. 9h email form 360 (hạn 4/6): anh không mở. *Chưa có cơ sở thì chưa đặt quân.*
5. 10h05 ô 712 đỏ (bóng mây). Anh Kiên đọc cột *vì sao*, bật bước lọc bóng mây, xanh sau hai mươi hai phút. Anh ghi: *1. Kiên. 22'. đúng. nói được vì sao. → A?* Dấu hỏi để đó; một ô chưa phải một tuần. Dữ kiện đầu tiên đi ngược dự đoán.
6. 15h30 thưởng nóng năm triệu "vụ hôm qua". *Tiền trả cho chỗ người ta đứng. Hôm nay anh vừa giao chỗ ấy đi, và tiền vẫn đến.*
7. Lần đầu trong bảy tháng không ai cần anh ở tầng mười bảy; anh đọc sách thật. Không thêm quân domino nào: hôm nay anh không đẩy ai. Hàng vẫn bảy quân.
8. Tối ở nhà Diệp Anh: giữ cá rán, "Em giỏi thật" / "Em biết", lịch gặp "một tập đoàn" thứ Hai, cào lưng, "Ở lại". Đổi lý do khen: "Người ta giấu việc để giữ ghế. Em giao hết việc để xem ghế có phải của em không." Đổi câu cuối: chưa có phán quyết, nhưng anh tin mình đã biết nó.

## Ch.38 *Danh sách* (1–4/6): ghép kết quả phép thử với dàn ý cũ

- Lão giao anh viết nháp danh sách nhân sự production (giữ dàn ý cũ), đúng tuần anh rảnh tay: anh xếp người trong lúc người khác làm việc của anh.
- 18h thứ Sáu 4/6: màn hình thông báo (`:::notifications` nếu dev đã làm) và bảng kết quả. **Kết quả:** 1 A (sai dự đoán), 4 A, 2 C, 3 C, 5 B, 6 B, 7 B, 8–10 C (anh Bảo chia ô Lào Cai, sai số dồn ở biên vượt ±1,5 m, không giải thích được vì sao: "Phần này chú làm đi").
- Phán quyết: *không ai thay được mình. trước tháng bảy.* Gạch *không ai*, không gạch *trước tháng bảy*. Mỉa mai: anh đang xây một cái máy chạy không cần người, và người đầu tiên nó không cần là anh.
- Phản ứng (biến chất bước một, còn sạch): lấy lại vận hành bằng một lý do hợp lý. Chưa có Go, chưa có vết khâu.
- Rồi mới đặt quân: form 360 (mười lăm phút), bảng chị Phương thiếu Thảo để nguyên, câu cho Thảo, danh sách nháp; anh Bảo: "Ở đây không có ghế ở giữa đâu em."
- Domino: lên 12 ở cuối ch.38 (thay vì cuối ch.37). Bảng ở `brief-van-phong-dau-tri.md` mục 2 dời quân 5 sang ch.38.

## Ảnh hưởng chỗ khác

- `characters.yaml`: các nấc mở ở `38-chuong-37…` không được nhắc phán quyết, form 360 hay ô 712 sửa trong chín phút.
- Dàn ý (`11-dan-y-phan-1.md`), `plan-mo-rong-giai-doan-2.md`, bảng domino: cập nhật ch.37, ch.38 theo bảng trên.
