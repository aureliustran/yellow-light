# Tổng hợp cài cắm và mạch truyện cập nhật (14/10/2026)

Chi tiết từng quyết định nằm ở `claude/plan-phep-thu.md` (Morpheus, Go, cắt mối nối) và `claude/plan-khoanh-vung.md` (phép thử bàn giao). File này là bản tổng hợp để sửa chương và viết tiếp.

## A. Cài cắm vào các chương đã viết (đã cài hết, 13–14/10)

| Chương | Đã thêm | Phục vụ |
| --- | --- | --- |
| Ch.1 *Đèn vàng* | Đoạn "phiên bản ba mươi giây" của Thuyên; một câu giới thiệu Vũ | Giới thiệu nhân vật |
| *Hồng phấn* | Câu bố giới thiệu Nhi với khách | Giới thiệu nhân vật |
| **Ch.7 *Người được hỏi*** | Nhóm thực tập giữ hệ phân tán viết bằng Go, hơn trăm service, thêm tầng RAG; tháng đầu đọc code đến 2 giờ sáng, tháng thứ ba bị gọi dậy giữa đêm | Năng lực có cơ sở; Go là sân nhà |
| Ch.8 *Sân khấu* | Cả hàng ghế ngoái nhìn Nhi | Mỏ neo địa vị Nhi |
| **Ch.10 *Người được mời*** | Dòng yêu cầu trong thư mời khớp đúng hai dòng CV (NCKH cấp quốc gia về ảnh vệ tinh, vận hành hệ phân tán); "người ta có sẵn một cái tên, rồi viết yêu cầu ngược lại" | Cơ sở trên giấy cho offer; lớp ẩn Khải tuyển có chủ đích |
| Ch.12 *Chủ tọa* | Thầy cố vấn giới thiệu Diệp Anh với khách đại sứ quán; tài liệu ban tổ chức | Mỏ neo Diệp Anh |
| Ch.15 *Dự thính* | Thầy chuyển bài của cô sang Vụ, ba đàn em đứng chờ | Mỏ neo Diệp Anh |
| **Ch.16 *Bản đồ*** | Khúc thứ ba của con sông: khung transformer cho ảnh, ô mười sáu nhân mười sáu điểm; "Khung ấy người ta làm sẵn" | Cành và gốc (ViT); vết khâu ở biên ô |
| ***Ánh xanh màn hình*** | "Khó. Anh chẳng hiểu gì… Đùa đấy. Dễ…"; gõ lên thẻ chết: "Sáu tháng sống chết ở chỗ này mới mua được giấc ngủ ấy" | Năng lực có giá; Nhi nghe trước |
| Ch.23 *Sân sáng* | Cả sân nhìn Nhi; bà xôi rắc thêm hành | Mỏ neo ngoại hình Nhi |
| Ch.26 *Bảng tính* | Dao dĩa; "nhà giàu thật và có kỷ luật"; cột sống ở thang máy | Diệp Anh nhà từng giàu |
| **Ch.28 *Giáo trình*** | Tuần lab ngồi chờ: Thuyên mở `terminal_to_cluster_v0.md`, một tỉnh một đêm trên một máy; "Không ai hỏi. Chưa ai cần." | Kiến trúc phân tán là của anh từ sớm |
| **Ch.32 *Biểu đồ*** | Ngài Morpheus vào sau Khải, áo phông trơn, cả phòng thưa "ngài", không ai giới thiệu; chị Hạnh thì thầm "ngài Morpheus"; hỏi đúng một câu về độ trễ khi chạy cả nước; ra sau cùng: "Cậu chọn. Có chủ đích."; Thuyên thấy phiên bản bốn mươi tuổi của mình và thích ông. Tài liệu 214 trang có chương *Kiến trúc triển khai* (bốn mươi trang, tự hiệu chỉnh, chạy không cần người trông) với đoạn *Vì sao Java* | Lần đầu của ngài; bản thiết kế hoàn chỉnh nộp tầng 18; động cơ Java công tâm |
| **Ch.35** email production | Yêu cầu đối tác (48 giờ một huyện, ±1,5 m, 34 tỉnh, quý IV); chuẩn công nghệ tập đoàn, ngoài chuẩn phải được Giám đốc Công nghệ Tập đoàn duyệt; Thuyên thấy chương mình đã viết sẵn | Đầu việc 10; đường ADR về sau |
| **Ch.36** họp với Khải | Câu hỏi thứ hai về chạy cả nước; lão trả lời bằng chữ trong *Kiến trúc triển khai* | Kiến trúc là của Thuyên |
| *Ánh xanh màn hình*, ch.35, **ch.37** | Cuốn sách hệ thống phân tán: bình phong, và payoff ở ch.37 (gáy sờn, giấy nhớ, đọc thật) | Payoff |

## B. Phép thử bàn giao (đã viết 14/10)

- **Cuối ch.36 (viết lại):** câu hỏi, lý lẽ cũ giữ nguyên, "người cãi và người chấm là cùng một người", mục đích, ba lỗ của chiều 21/5; **vì sao nghỉ một ngày cũng chưa đủ** (người ta chỉ cần đợi đến thứ Hai); bảng `khoanh_vung.md` mười việc với cột *Đoán*; lý do 8–10 đoán C; note mực tiêu chí A/B/C, toàn A/B là trượt; vì sao B cũng trượt; chọn bàn giao đủ cả *vì sao* dù có thể làm phép thử trượt; xin lão bằng vỏ "dự phòng trước production, rủi ro phụ thuộc một người"; thư mục `ban_giao/`, 112 dòng *vì sao*; chọn Lào Cai vì nếu thiết kế gãy thì gãy ở đó. Domino giữ bảy quân.
- **Ch.37 (viết lại, 28/5):** buổi bàn giao, từng người nhận; anh Bảo: "Chú đang thử ai? Thử bọn anh, hay thử chú?"; luật "không làm hộ"; form 360 để sang thư mục *sau 4/6* ("Chưa có cơ sở thì chưa đặt quân"); ô 712 anh Kiên tự sửa 22 phút, ghi B, "Lần sau anh làm nhanh hơn"; thưởng nóng và "tiền trả cho chỗ người ta đứng"; suýt nói "Biên ô anh ạ" với lưới Lào Cai; không thêm quân domino nào; Diệp Anh: "Người ta giấu việc để giữ ghế. Em giao hết việc để xem ghế có phải của em không. Em giỏi thật." / "Em biết."; "Ở lại".
- **Ch.38 *Danh sách* (1–4/6, chưa viết):** theo `plan-khoanh-vung.md`. Kết quả, phán quyết, lấy lại vận hành; rồi form 360 (dời từ ch.37 cũ), bảng chị Phương thiếu Thảo, danh sách nháp. Domino lên 12 ở cuối ch.38.

## C. Mạch truyện sau ch.38 (giữ như bản trước)

1. **Kế hoạch Go và cắt mối nối (một kế hoạch):** lên ở ch.44 *Phòng chờ*; ADR viết ngược đoạn *Vì sao Java*; gửi trước khi về quê; "Duyệt thử nghiệm. Morpheus Đỗ, Giám đốc Công nghệ Tập đoàn (CTO)" đọc ở mâm giỗ (ch.45–46). Thực thi ở ch.47. Ôm lớp Go là lý do thật bỏ pickup (ch.41).
2. **Ch.47 *Đỉnh*:** ngài Morpheus xé báo cáo của anh Tuấn ("Tuần trước cậu ký duyệt…", *mood board*, "rác có font chữ", "ông ấy chọn đối tác giỏi hơn chọn người"); "Cậu kia. Phần số liệu ai làm thì người ấy nói."
3. **Ch.48:** anh Kiên nhận ra điểm gãy (mốc so sánh chính là tuần bàn giao ở ch.37–38).
4. **14–15/7:** ngài dán lại trong một buổi chiều, commit *"restore auto-calibration per design doc v1 (Thuyên)"*.
5. **Ch.51 *Một phẩy năm*, lật bài 16/7, email *Mr. M*.**
6. ***Quân trắng*, *Quân đen*:** quân đen *mời Morpheus về*, *Duyệt thử nghiệm*, *một buổi chiều*; chữ *rủi ro phụ thuộc một người* (Thuyên tự viết cho lão ở ch.36) quay lại.
7. **Đổ vỡ:** anh Bảo ở quán bia hơi kể lý lịch ngài; cành và gốc; "anh đã chứng minh được điều anh muốn chứng minh. Đó là lý do anh thua."

## D. Còn mở

1. Anh Kiên báo lên qua ai: anh Bảo, chị Hạnh hay thẳng Khải.
2. Duyệt mốc: kế hoạch ch.44, duyệt ch.45–46, cắt ch.47.
3. Có cảnh Thuyên và ngài Morpheus đối mặt trực tiếp không.
4. Tên ch.37 *Ba trăm sáu mươi độ*: form 360 giờ chỉ đến bằng email, điền ở ch.38. Giữ tên (nhìn lab từ mọi phía khi đứng ngoài) hay đổi.
5. Bible, dàn ý (`02-mach-truyen.md`, `11-dan-y-phan-1.md`, `plan-mo-rong-giai-doan-2.md`, bảng domino trong `brief-van-phong-dau-tri.md`) chưa cập nhật Morpheus, phép thử bàn giao, mạch Go.
