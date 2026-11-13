---
id: PAT.humor.beat
kind: style
grain: shape
status: proposed
updated: 2026-11-13
force: tuy-chon
applies-to: "cảnh hoặc nhịp hài; chọn qua mục style của tuyến, node hoặc event (R1, R2)"
effective: "OPEN → AFTER"
uses: ["[[TEC.humor.twist]]", "[[TEC.humor.reaction]]", "[[TEC.humor.heighten]]", "[[TEC.humor.button]]", "[[TEC.humor.lenses]]"]
forbids: []
check: human
aliases: ["nhịp hài", "quy trình sinh một nhịp hài"]
sources:
  - "kho/hai-ky-thuat.md §5, §7 (nghiên cứu 05/11; tách 13/11)"
---
# PAT.humor.beat · Một nhịp hài

Khuôn của một nhịp hài, từ sự thật của nhân vật đến nút chặn. Mẩu vật liệu (`kho/hai.md`) khi đưa vào dùng thì ghi đủ các beat này, không chỉ ghi nhãn.

## beats

| Beat | Việc |
| --- | --- |
| B1 | **Sự thật và nỗi đau** của nhân vật trong cảnh: nhân vật đang muốn gì, thiếu gì ([[PAT.humor.game]] S1) |
| B2 | **Dựng** và **giả định**: viết ra điều người đọc chờ; đó là giả định để phá |
| B3 | **Cầu nối** trong cảnh: một vật có mặt, một chữ nhân vật vừa nói |
| B4 | **Vỡ** và **chốt**: liệt kê nhiều cú đảo, bỏ những cái đầu tiên (ai cũng nghĩ ra); chọn cú thuộc về đúng nhân vật này (thay tên người nói mà câu vẫn chạy thì bỏ); có câu chốt hay thì viết ngược |
| B5 | **Phản ứng** hợp lý của người nhìn, viết trước khi viết cú tiếp theo; rồi **leo thang** ("nếu điều này đúng, còn gì đúng") |
| B6 | **Nút chặn** |
| B7 | **Soát** ba lăng kính |

## slots

| Beat | Register | Moves |
| --- | --- | --- |
| B1 | theo node | [[TEC.humor.want-clash]] |
| B2–B4 | R1 hoặc R2 | [[TEC.humor.twist]] |
| B5 | R1 hoặc R2 | [[TEC.humor.reaction]], [[TEC.humor.heighten]] |
| B6 | R1 → register kế tiếp | [[TEC.humor.button]] |
| B7 | — | [[TEC.humor.lenses]] |

## fails

| Triệu chứng | Nguyên nhân thường gặp | Sửa |
| --- | --- | --- |
| Đọc xong không có chỗ "à" | Dựng phẳng, không có giả định để vỡ | B2 |
| Câu đùa rơi xuống không ai đỡ | Người nhìn hùa theo, cười theo, hoặc đáp bằng câu đùa ngang cơ | B5, [[TEC.humor.reaction]] |
| Câu đùa ai nói cũng được | Thiếu tính cách | B4, [[TEC.humor.volley]] S3 |
| Cú đảo xẹp | Cách hiểu thứ hai yếu hơn giả định | B4 |
| Leo thang hụt | Nhảy thẳng tới vô lý | B5, [[TEC.humor.heighten]] |
| Cảnh kết bằng giải thích | Thiếu nút chặn | B6 |
| Hài thành ác | Thiếu chỗ lành, thiếu thiện ý | B7, [[TEC.humor.volley]] |
| Kho chỉ có nhãn | Ghi "meme, logic dồn" thay cho cơ chế | Ghi đủ B2–B6 |

## samples

Bài học so bản 05/11: [[TEC.humor.want-clash]].
