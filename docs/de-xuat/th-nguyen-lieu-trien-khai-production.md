# Đèn vàng – Nguyên liệu TH: thiết kế hệ phân tán đưa model lên production (bản cũ)

Oct 25, 2026 · @aureliustran. **[nguyên liệu: bản cũ]** Tác giả (25/10, 22:35): phần bản thiết kế hệ thống phân tán để đưa model lên production của Thuyên ở bản cũ cần giữ; đưa mạch ấy về đây, chưa sửa gì.

File này **chỉ chép**, không sửa chữ, không đổi lịch (mọi ngày vẫn theo lịch bản cũ 2026–2027, chưa dời sang 2024–2025). Đánh giá giữ, sửa, bỏ để ở bước kiểm kê (`th-tai-cau-truc-lab.md` bước 0).

## Mạch, theo thứ tự trên trang

| # | Chỗ (bản cũ) | Ngày truyện | Lõi |
| --- | --- | --- | --- |
| 1 | Ch.7 *Người được hỏi* | quá khứ, thời thực tập | Thuyên trực hệ phân tán hơn một trăm service viết bằng Go; bị gọi dậy mỗi khi có service im lặng giữa đêm |
| 2 | Ch.10 *Người được mời* | trước khi vào lab | Yêu cầu tuyển ưu tiên người có kinh nghiệm vận hành hệ thống |
| 3 | Interlude *Ánh xanh màn hình* | GĐ1 | Môn hệ thống phân tán chiều thứ Ba ở trường |
| 4 | Ch.28 *Giáo trình* | tháng 3/2027 | File `terminal_to_cluster_v0.md` ra đời: model chạy trên một máy, một tỉnh mất một đêm; muốn chạy cả nước phải cắt ô, chia máy, ghép ở biên |
| 5 | Ch.31 *Biểu đồ* | 2027 | Bộ tài liệu kỹ thuật 214 trang; chương *Kiến trúc triển khai* 40 trang: cắt ô, xếp hàng đợi, chạy song song, ghép biên, tự chạy lại phần lỗi, tự hiệu chỉnh theo mùa và theo tỉnh; phụ lục `future_directions/as_the_crow_flies_v0.md` |
| 6 | Ch.35 *Hai mươi tám quân* | 17–21/5/2027 | Email production: đối tác cần kết quả theo huyện trong 48 giờ, sai số độ cao ≤ ±1,5 m, 34 tỉnh; danh sách nhân sự vận hành |
| 7 | Ch.36 *Bản nháp* | 24–27/5/2027 | Khải hỏi chạy cả nước cần bao nhiêu máy; bảng `khoanh_vung.md` mười việc, ba việc cuối (scaling, kiến trúc production, tinh chỉnh theo kiến trúc và hợp đồng) đoán C; tiêu chí viết bằng mực; xin anh Tuấn bàn giao dự phòng |
| 8 | Ch.37 *Mục 2.4* | 28/5/2027 | Buổi bàn giao; đề bài Lào Cai cho anh Bảo; "Chú đang thử ai?"; câu "Biên ô anh ạ" bị nuốt lại |
| 9 | Ch.38 *Danh sách* | 31/5–7/6/2027 | Anh Bảo triển khai đúng thiết kế, sai số dồn ở biên ô vượt ±1,5 m, "Phần này chú làm đi"; năm ô C đúng như đoán; phán quyết "không ai thay được mình. trước tháng bảy"; email giữ lại đầu mối vận hành |
| 10 | Ch.39 *Câu hỏi của em* | 7/6/2027 | Kể lại phép thử với Diệp Anh; production chạy, năm ô C vẫn là C |
| 11 | Plan, chưa lên trang (ch.41–48, 14–16/7) | 6–7/2027 | Mạch Java → Go: ADR, cắt mối nối, dán lại. Xem mục dưới |

Plan đi kèm của bản cũ (trên Project, không chép lại ở đây): `claude/plan-khoanh-vung.md` (bảng mười việc, tiêu chí, vì sao 8–10 đoán C, cách thử bằng Lào Cai), `claude/plan-ch37-38.md`, `claude/plan-ch39.md`, `claude/plan-giai-doan-2-hop-nhat.md`.

## Mạch Java → Go (bản cũ: một phần lên trang, phần lớn ở plan)

Tác giả (25/10, 22:39): chi tiết siêu quan trọng; bản thiết kế ban đầu chạy bằng Java, bản sau chạy bằng Go. Chép mạch truyện và ý định viết, không cần nguyên văn.

**Nguồn:** ch.31 cũ *Biểu đồ* (đoạn *Vì sao Java*, đã lên trang); ch.35 cũ (email, chuẩn công nghệ tập đoàn, đã lên trang); Project `claude/plan-phep-thu.md` (chốt 14/10: đổi ngôn ngữ để dựng rào; động cơ Java và Go; năng lực có cơ sở; CTO tập đoàn); `claude/tong-hop-cai-cam-14-10.md` mục A, C; `claude/plan-giai-doan-2-hop-nhat.md` (15/10, ghi rõ "chỗ nào bản này khác các file cũ thì bản này thắng").

### Mạch truyện

| # | Chỗ (bản cũ) | Việc |
| --- | --- | --- |
| 1 | Ch.7 *Người được hỏi* (quá khứ) | Sáu tháng thực tập ở một công ty công nghệ đa quốc gia, nhóm giữ một hệ phân tán hơn một trăm service viết bằng Go. Tháng đầu đọc code đến hai giờ sáng, tháng thứ ba là người bị gọi dậy giữa đêm. Có làm thêm với một kiến trúc RAG: học cách đưa mô hình ra phục vụ thật. **Go là sân nhà của Thuyên** |
| 2 | Ch.10 *Người được mời* | Thư mời ghi ưu tiên người có đề tài NCKH cấp quốc gia về ảnh vệ tinh và kinh nghiệm vận hành hệ phân tán: đúng hai dòng trong CV của anh. Đây là cơ sở trên giấy để một sinh viên năm ba được ký hợp đồng |
| 3 | Ch.28 *Giáo trình* (tháng 3) | Mở `terminal_to_cluster_v0.md`: model chạy một máy, một tỉnh một đêm |
| 4 | Ch.31 *Biểu đồ* (bản thiết kế nộp tầng 18) | Chương *Kiến trúc triển khai*, đầu chương có đoạn ***Vì sao Java***: lõi mô hình giữ **Python** làm worker suy luận; lớp phân tán bao quanh (điều phối, chia ô, hàng đợi, ghép kết quả, API) viết bằng **Java**, vì đó là ngôn ngữ chung của tập đoàn, ai vào dự án cũng đọc được, anh Bảo đọc được, anh Kiên đọc được. Go là ngôn ngữ anh thạo nhất, anh không chọn nó. "Một hệ thống để nhiều người cùng làm thì phải viết bằng thứ nhiều người cùng đọc. Lúc ấy anh tin thế, và lúc ấy điều đó đúng." Chưa code dòng nào. Bản thiết kế có bước **tự hiệu chỉnh** hệ số theo mùa và theo tỉnh |
| 5 | Ch.35 (email production) | Chuẩn công nghệ của tập đoàn: Java, C#, Node.js, Python. Đề xuất ngoài chuẩn do Tổng giám đốc công ty con duyệt thử nghiệm và báo cáo Văn phòng CTO Tập đoàn. Đây là đường đi của ADR về sau |
| 6 | Ch.36–38 | Phép thử bàn giao mười việc (mục trên). **Ch.38 giữ sạch:** sau phép thử anh chỉ lấy lại đầu mối vận hành; chưa có Go, chưa có vết khâu |
| 7 | Ch.41 | Ôm cả lớp Go một mình (viết, vận hành, cập nhật bảng hệ số mỗi tháng) là lý do có thật để anh bỏ pickup thứ Bảy, giai đoạn rạn nứt với Vũ. Bận là thật, nhưng bận do anh tự chọn ôm. Vũ thấy cái bận, không thấy cái chọn |
| 8 | Ch.44 *Phòng chờ* (21–24/6) | **Kế hoạch Go và cắt mối nối là một kế hoạch**, lên cùng tuần anh kéo anh Kiên về "đội vận hành" bằng một lời hứa không giữ được (hai thủ đoạn với người không phải đối thủ đi cùng nhau). Anh viết **ADR "Chuyển lớp điều phối từ Java sang Go"**, gửi trước khi về quê |
| 9 | Ch.45–46 (giỗ ông) | Dòng *"Duyệt thử nghiệm"* về hộp thư lúc anh đang ở mâm giỗ; anh đọc nó trên điện thoại giữa bữa cơm, như một nhiên liệu nữa |
| 10 | Ch.47 *Đỉnh* | Được giao production, có quyền đổi stack: triển khai bằng Go, và cắt mối nối trong lúc triển khai (gỡ bước tự hiệu chỉnh, thay bằng bảng hệ số làm tay, commit tách bước) |
| 11 | Ch.48 | Anh Kiên nhận ra điểm gãy; mốc so sánh chính là tuần bàn giao ở ch.37–38 |
| 12 | 14–15/7 | CTO tập đoàn mở song song bản thiết kế đã nộp và hệ thống thật, thấy vết khâu trong một buổi chiều, lắp lại đúng như bản thiết kế. Commit khuya: *"restore auto-calibration per design doc v1 (Thuyên)"*. **Giữ nguyên Go.** Anh Kiên chạy vận hành từ sáng hôm sau |
| 13 | *Quân đen*, đổ vỡ | Chữ *rủi ro phụ thuộc một người* (Thuyên tự viết cho anh Tuấn ở ch.36) quay lại. Khải: *"Tôi không đấu với nó. Nó tự xưng là không ai thay được. Tôi gọi anh Morpheus."* Câu chốt nếu hai người gặp mặt: *"Go là lựa chọn đúng. Lý do của cậu thì không."* |

### ADR: luận điểm Thuyên viết ra (đều là ưu điểm có thật của Go)

1. Đồng thời rẻ: goroutine nhẹ, hàng chục nghìn tác vụ song song trên một máy; channel cho các ô ảnh chảy qua hàng đợi.
2. Triển khai gọn: một file nhị phân tĩnh, không cần JVM; image nhỏ, khởi động tính bằng mili giây, hợp với tự co giãn số worker.
3. Tốn ít bộ nhớ: cùng máy chủ chạy được nhiều worker hơn, tính ra tiền (lão hiểu).
4. Bộ gom rác độ trễ thấp, ít khựng lúc tải cao, hợp với khung giờ hợp đồng.
5. Hạ tầng phân tán viết bằng Go (Kubernetes, Docker, etcd, Prometheus; gRPC tốt): "Người ta xây đường cao tốc bằng vật liệu nào thì mình đi bằng xe ấy."
6. Ngôn ngữ nhỏ (25 từ khóa), ai viết cũng gần giống nhau, dễ đọc lại.

**Những gì anh không viết vào ADR** (người kể nói thẳng): Java từ bản 21 có virtual thread, khoảng cách về đồng thời đã hẹp; hệ sinh thái Java trong công ty có sẵn người, thư viện, quy trình; chi phí lớn nhất của Go ở đây là con người, cả công ty phải học lại, **và đó chính là lý do anh chọn nó**. Lõi Python nối với các service Go qua gRPC. Lão duyệt vì con số tiết kiệm máy chủ. Anh Bảo đọc ADR, không cãi được điểm nào: *"Chú viết thì chú chọn."* Người đọc nghe ra câu ấy không phải đồng ý.

### Ý định viết

- **Hai quyết định, cùng một năng lực, động cơ ngược nhau** (chốt 14/10). Java là Thuyên lúc còn công tâm, xây cho hệ thống, để mọi người cùng làm được; người kể nói thẳng động cơ này khi bản thiết kế được viết. Go là Thuyên đã biến chất đủ nặng, xây cho mình, để chắc chắn chỉ mình làm được. Vì vậy kế hoạch Go **không thể đến sớm**: phải đợi biến chất lên nấc tham và coi nguồn cũ là nhỏ.
- **Viết ngược lại chính mình:** ADR viết lý lẽ ngược đoạn *Vì sao Java*, trong cùng một bộ tài liệu. Người kể đặt hai đoạn cạnh nhau, không bình luận.
- **Lý do thật và lý do nói ra:** lý do nói ra là lý lẽ kỹ thuật, và lý lẽ ấy đúng; lý do thật là dựng thêm một lớp rào.
- **Dấu vết thứ hai cho tầng 18:** tài liệu đã nộp ghi *Java* và *tự hiệu chỉnh*; hệ thống thật là *Go* và *bảng hệ số làm tay*. Hai chỗ lệch nằm cạnh nhau.
- **Mỉa mai cốt lõi:** anh chứng minh mình không thể thay bằng một bản thiết kế hoàn chỉnh, và bản thiết kế hoàn chỉnh ấy là thứ làm anh thay được. Vết khâu anh tạo ra để giữ chỗ là thứ để lộ anh. Rào Go mỏng hơn anh tưởng, vì chính luận điểm anh viết trong ADR (ngôn ngữ nhỏ, dễ đọc): một kỹ sư giỏi đọc được trong một tuần. Luận điểm dùng để thuyết phục lão cũng là luận điểm tháo rào của chính anh. Mối đứt chỉ cần một người dán lại một lần, không cần một người giữ nó mãi.
- **Tên mình:** thứ anh sợ cả đời là việc mình làm không có tên mình. Lần này tên anh có ở đó (dòng commit), và đó là cách anh thua.
- **Lớp nghĩa của Go:** Go sinh ra ở Google (2009). CTO tập đoàn từng là kỹ sư ở Google, trong thế hệ đưa transformer vào sản phẩm, đọc Go như tiếng mẹ đẻ. Thuyên dựng rào bằng chính sân nhà mình, và người tháo rào đến từ nơi Go được sinh ra. Tấm thẻ thực tập đã khóa quyền mà anh đeo suốt Phần 1 là bằng chứng của sáu tháng Go ấy.
- **Cuốn sách hệ thống phân tán:** anh biết làm từ thực tập; đọc sách để hiểu vì sao những thứ mình đã làm lại chạy được. Sách là bình phong, và cũng là thứ anh đọc thật (payoff ở ch.37).

### Hai nguồn bản cũ lệch nhau (để kiểm kê xử lý, chưa sửa)

| Điểm | `plan-phep-thu.md` (14/10) | `plan-giai-doan-2-hop-nhat.md` (15/10, ghi là bản thắng) |
| --- | --- | --- |
| Ai ký ADR | CTO tập đoàn ký: *"Duyệt thử nghiệm. Morpheus Đỗ, Giám đốc Công nghệ Tập đoàn (CTO)"*; Thuyên đọc chữ CTO thành một chức điều hành không còn code | **Khải ký**, cc văn phòng CTO; chữ *thử nghiệm* là của ngài |
| CTO lộ mặt | Ba lần: cài ở review tầng 18, chữ ký ADR, dán lại | **Giấu tiệt đến sau đổ vỡ**; nhân viên cỡ đồng nghiệp không biết danh tính ngài; mọi chữ ký kỹ thuật là của Khải |

Lưu ý v2: chốt 24/10 cho Morpheus xuất hiện ở sự kiện tất niên (GĐ1) và Thuyên ngưỡng mộ ông; khác cả hai bản trên.

## Trích nguyên văn

## Ch.7 cũ *Người được hỏi*: nền hệ phân tán thời thực tập

Nguồn: `content/import/09-chuong-07-nguoi-duoc-hoi.md`

*Dòng 250–254:*

Nhóm anh sử dụng ngôn ngữ lập trình Go. Ngày đầu mở trang tài liệu của nó, anh thấy linh vật: một con gopher xanh, mắt lồi, hai cái răng cửa chìa ra, mà anh nhìn kiểu gì cũng thấy là một con hải ly mặt ngố. Cũng cute. Anh đặt nó làm hình nền.

Đằng sau con hải ly ấy là hơn một trăm service, tức là hơn một trăm chương trình nhỏ, mỗi cái làm một việc, chạy trên những máy khác nhau và gọi nhau qua mạng như một tổng đài: cái này hỏi, cái kia trả lời, cái thứ ba ghi sổ. Người ta gọi thế là hệ phân tán. Một cái im lặng là cả dây phía sau đứng chờ theo. Trên cùng còn một tầng cả nhóm gọi tắt là RAG: trước khi con chatbot của công ty trả lời khách, nó phải đi lục đúng tài liệu ra đọc đã, như học sinh được mở sách trước khi làm bài.

Tháng đầu, con hải ly hành anh đến hai giờ sáng. Đến tháng thứ ba, anh là người bị gọi dậy mỗi khi có một service im lặng giữa đêm. Hình nền thì anh vẫn để. Ba giờ sáng nhìn cái mặt ngố ấy, anh không biết nên thương nó hay ghét nó.

[…]

## Ch.10 cũ *Người được mời*: yêu cầu tuyển

Nguồn: `content/import/13-chuong-10-nguoi-duoc-moi.md`

*Dòng 173–175:*

Dòng yêu cầu cuối cùng không chung chung như các tờ kia: *Ưu tiên ứng viên đã tham gia đề tài nghiên cứu khoa học sinh viên cấp quốc gia về ảnh vệ tinh, có kinh nghiệm vận hành hệ thống phân tán trong môi trường doanh nghiệp.* Hai vế, đúng hai dòng trong CV của anh. Người viết tờ này không đi tìm một sinh viên. Người ta có sẵn một cái tên, rồi viết yêu cầu ngược lại từ cái tên ấy.

[…]

## Interlude *Ánh xanh màn hình*: môn hệ thống phân tán

Nguồn: `content/import/21b-anh-xanh-man-hinh.md`

*Dòng 14–16:*

"Chiều thứ Ba thầy cũng là học sinh," anh nói. "Môn hệ thống phân tán. Anh ngồi hàng cuối, nghe như nghe tụng kinh."

[…]

*Dòng 24–26:*

Cô không hỏi hệ thống phân tán là cái gì. Cô nhớ cái thẻ chết, và nhớ rằng anh nói *sống chết* bằng giọng người ta kể chuyện cười. Cô mở lịch điện thoại, chấm vào ô thứ Ba một cái chấm xám, không ghi chữ nào.

[…]

## Ch.28 cũ *Giáo trình* (tháng 3/2027): file `terminal_to_cluster_v0.md` ra đời

Nguồn: `content/import/31-chuong-28-giao-trinh.md`

*Dòng 21–22:*

Thuyên mở một file mới, đặt tên bằng tiếng Anh như mọi file của riêng anh: *terminal_to_cluster_v0.md*. Mô hình của Thiên Nhãn đang chạy trên đúng một cái máy, gõ lệnh từ terminal, một tỉnh mất một đêm. Muốn chạy cả nước thì phải cắt ảnh thành ô, chia ô cho nhiều máy chạy song song, rồi ghép lại ở biên. Anh viết ba gạch đầu dòng, vẽ một cái hộp, rồi để đấy. Không ai hỏi. Chưa ai cần.

[…]

## Ch.31 cũ *Biểu đồ*: chương *Kiến trúc triển khai* trong bộ tài liệu 214 trang

Nguồn: `content/import/34-chuong-31-bieu-do.md`

*Dòng 294–306:*

Ba giờ chiều, anh gửi bộ tài liệu kỹ thuật đầy đủ cho lão, để lão gửi lên văn phòng Tổng giám đốc.

Hai trăm mười bốn trang. Không phải hai trang trên ổ chung. Không phải những cuốn sổ tay riêng của con AI. Một phiên bản ở giữa: đủ dày để không ai bảo là thiếu, đủ khô để không ai đọc hết. Mục lục, sơ đồ con sông, các khúc lọc mây, cắt ô, mô hình, ghép kết quả.

Chương cuối trước phụ lục là chương anh viết lâu nhất: *Kiến trúc triển khai.* File *terminal_to_cluster_v0.md* từ tháng ba đã thành bốn mươi trang. Đưa mô hình từ một cái máy gõ lệnh ra một hệ chạy cả nước: cắt ảnh thành ô, xếp hàng đợi, chia cho nhiều máy chạy song song, ghép lại ở biên, tự chạy lại phần lỗi, tự hiệu chỉnh hệ số theo mùa và theo tỉnh. Thiết kế để chạy không cần người ngồi trông. Đầu chương có một đoạn ngắn tên *Vì sao Java*: lõi mô hình giữ Python, lớp điều phối bao quanh viết bằng Java, vì đó là ngôn ngữ chung của tập đoàn, ai vào dự án cũng đọc được, anh Bảo đọc được, anh Kiên đọc được. Ngôn ngữ anh thạo nhất là Go, sáu tháng ở tòa nhà kính. Anh không chọn nó. Một hệ thống để nhiều người cùng làm thì phải viết bằng thứ nhiều người cùng đọc. Lúc ấy anh tin thế, và lúc ấy điều đó đúng.

Ở phụ lục cuối, anh để lại một thư mục con anh chưa bao giờ nhắc tới với ai trong lab, đặt tên bằng tiếng Anh như mọi file của riêng anh.

*future_directions/*

Trong đó có một file. *as_the_crow_flies_v0.md.* Năm tuần nay anh đã sửa nó đến phiên bản thứ bảy mà vẫn để tên v0, vì đổi tên thì phải nói với ai đó nó là gì.

Anh nhìn cái thư mục ấy một lúc. Rồi để nguyên. Tài liệu kỹ thuật đầy đủ thì phải đầy đủ. Để nó ở đây thì nó có ngày tạo, có tên người tạo, nằm trong một bộ hồ sơ đã gửi lên tầng mười tám. Một ngày nào đó có ai hỏi *ai nghĩ ra*, câu trả lời sẽ không cần ai đỡ. Mà người ta sẽ không đọc đến phụ lục.

[…]

## Ch.35 cũ *Hai mươi tám quân* (17–21/5/2027): email production, yêu cầu của đối tác

Nguồn: `content/import/36-chuong-35-hai-muoi-tam-quan.md`

*Dòng 9–42:*

:::email
Từ: Khối Chiến lược – Phát triển Kinh doanh
Đến: Trưởng nhóm R&D Thiên Nhãn
Cc: Nhóm R&D Thiên Nhãn; Văn phòng Tổng giám đốc
Chủ đề: Kế hoạch chuyển giao sang vận hành thương mại (production) – dự kiến tháng 7/2027

Kính gửi anh Tuấn,

Sau buổi demo nội bộ ngày 4/5, Ban Lãnh đạo thống nhất chuẩn bị chuyển Thiên Nhãn sang giai đoạn vận hành thương mại từ tháng 7/2027.

Yêu cầu của đối tác (theo biên bản làm việc ngày 12/5): trả kết quả biến động đất theo từng huyện trong vòng 48 giờ kể từ khi nhận ảnh; sai số độ cao công trình không vượt quá ±1,5 m; phủ toàn bộ 34 tỉnh, thành trong quý IV/2027.

Hệ thống vận hành triển khai theo chuẩn công nghệ của Tập đoàn (Java, C#, Node.js, Python). Đề xuất sử dụng công nghệ ngoài chuẩn do Tổng giám đốc phê duyệt thử nghiệm và báo cáo Văn phòng CTO Tập đoàn.

Đề nghị trưởng nhóm gửi đề xuất nhân sự phụ trách giai đoạn vận hành (kỹ thuật, dữ liệu, truyền thông, đầu mối đối tác) trước ngày 15/6.

Nhân sự giai đoạn vận hành ưu tiên sử dụng nguồn lực hiện có của lab, không phát sinh tuyển mới. Khối Kinh doanh sẽ gửi đề xuất bổ sung cho hạng mục đầu mối đối tác và truyền thông.

Trân trọng.
:::

Anh đọc nó hai lần. Rồi anh không đọc email nữa. Anh đọc tầng mười bảy.

Trâm là người đầu tiên đứng dậy, cầm cốc đi về phía pantry, và trên đường đi chị dừng ở bàn chị Hạnh đúng ba giây, cúi xuống nói một câu không ai nghe thấy. Chị Phương mở một file bảng tính mới, gõ tiêu đề, xóa, gõ lại. Chị Ngân không làm gì cả. Chị Ngân ngồi im, nhìn cánh cửa phòng lão, như người ngồi canh một cái nồi sắp sôi. Hà My cầm điện thoại, chụp màn hình email, rồi mở Zalo, ngón cái chạy nhanh đến mức anh nhìn từ bàn mình cũng thấy nó mờ đi.

Anh Bảo kéo tai nghe xuống một bên. Đọc. Kéo lên.

Anh Kiên không ngẩng đầu, nhưng tay anh Kiên dừng gõ.

Bốn mục trong ngoặc đơn: *kỹ thuật, dữ liệu, truyền thông, đầu mối đối tác*. Bốn dòng, mười hai người, và một danh sách sẽ được viết bởi người hiểu ít nhất về cả bốn dòng ấy.

Còn một đoạn không ai ở tầng mười bảy chụp màn hình: bốn mươi tám giờ một huyện, sai số một mét rưỡi, ba mươi tư tỉnh. Mô hình hôm nay chạy một tỉnh mất một đêm, trên một cái máy. Người ta đọc đoạn ấy và thấy một mốc tháng. Anh đọc nó và thấy chương cuối của bộ tài liệu hai trăm mười bốn trang, chương anh đã viết xong từ tháng tư.

Danh sách nghĩa là ghế, mà ghế có hạn. Từ lúc email ấy đến, ai ở tầng mười bảy cũng hiểu: sau tháng bảy, người có tên sẽ ở lại theo dự án, người không có tên sẽ ra rìa.

[…]

*Dòng 460–463:*

Thứ Sáu, anh lên trường lúc một giờ chiều.

Anh không có gì để làm ở trường. Anh ngồi ở thư viện tầng ba, mở một cuốn sách về hệ thống phân tán, đọc cùng một trang trong bốn mươi phút. Anh đi vì nếu không đi, có thể có ai đó nhìn thấy anh ở tầng mười bảy vào chiều thứ Sáu. Một lời nói dối nhỏ cần một buổi chiều thật để đứng lên.

[…]

## Ch.36 cũ *Bản nháp* (24–27/5/2027): Khải hỏi bao nhiêu máy; khoanh vùng mười việc

Nguồn: `content/import/37-chuong-36-ban-nhap.md`

*Dòng 305–312:*

---

Phòng họp 18B có một cửa sổ nhìn thẳng ra Keangnam, và một cái bàn tròn nhỏ, sáu ghế. Anh Khải ngồi sẵn, áo sơ mi trắng, không vest, cốc cà phê giấy trước mặt. Anh ta đứng dậy bắt tay lão trước, rồi bắt tay anh, cái bắt tay khô và ngắn.

Bốn mươi phút. Anh Khải hỏi ba câu. Hai câu đầu, anh ta nhìn lão: tiến độ đóng gói, và chạy cả nước thì sao, ba mươi tư tỉnh, mỗi huyện bốn mươi tám giờ, cần bao nhiêu máy. Lão trả lời cả hai, trôi chảy hơn hồi tháng tư rất nhiều, vì tối qua lão đã gọi anh đến chín giờ để tập. Câu thứ hai lão trả lời bằng đúng chữ trong chương *Kiến trúc triển khai*: chia ô, xếp hàng đợi, chạy song song, ghép lại ở biên. Chữ nào cũng của anh, đọc bằng giọng lão. Anh Khải gật, viết một chữ. Câu thứ ba anh Khải nhìn anh, hỏi về cách mô hình xử lý vùng ảnh bị mây che quá bảy mươi phần trăm. Anh trả lời. Lão gật bên cạnh, gật đúng chỗ, như người gật theo nhạc. Nhạc là anh.

Anh Khải không ghi gì. Anh ta chỉ nghe, và nhìn ra cửa sổ những lúc người khác đang nói, lâu đến mức tưởng anh ta đang nghĩ chuyện khác.

[…]

*Dòng 428–432:*

Lý lẽ thì anh có sẵn. Anh Kiên đọc được code, nhưng không biết vì sao nó chạy. Bốn mươi lần thử thất bại nằm trong đầu anh, không nằm trong bất cứ file nào. Con AI giải thích được từng phương trình, nhưng không giải thích được vì sao chọn phương trình này mà không chọn phương trình kia.

Rồi anh tự cãi lại, như đã cãi lại mình chiều thứ Sáu. Tài liệu hai trăm mười bốn trang đã nằm ở tầng mười tám: tài liệu ghi *cái gì*, không ghi *vì sao*, ai đọc cũng phải quay lại hỏi người viết. Thuê người ngoài: tám mươi, một trăm hai mươi triệu một tháng, mất ba đến sáu tháng tìm người và ba tháng mới hiểu, mà production là tháng bảy, mà email đã ghi *không phát sinh tuyển mới*. Giữ anh thì hai mươi lăm triệu. Không ai bỏ ra gấp năm để thay một thứ còn chạy tốt. Còn Sơn. Sơn đi rồi đường ống vẫn chạy. Nhưng Sơn viết đường ống. Anh viết mô hình.

Ba lần cãi, ba lần thắng.

[…]

*Dòng 460–530:*

Việc đầu tiên là khoanh vùng: anh đang cầm những gì. Anh tưởng mất năm phút. Mất gần một tiếng, vì cứ viết xong một dòng anh lại nhớ ra một việc mình vẫn làm mà không ai gọi là việc.

:::sheet khoanh_vung.md
| # | Việc | Giao cho | Đoán |
| --- | --- | --- | --- |
| 1 | Vận hành đường ống: mẻ đêm, cảnh báo, chạy lại ô lỗi | a Kiên | B |
| 2 | Ô lỗi theo mùa: mây, bóng mây, ngưỡng | a Kiên + a Bảo | C |
| 3 | Huấn luyện lại mô hình khi có dữ liệu mới | a Bảo | C |
| 4 | Quy chuẩn nhãn, kiểm định nhãn | c Quỳnh | A |
| 5 | Trả lời câu hỏi kỹ thuật của đối tác | a Bảo viết, Trâm gửi | B |
| 6 | Tài liệu kỹ thuật, câu hỏi từ tầng 18 | a Bảo | B |
| 7 | Số liệu, phụ lục cho báo cáo của lão | c Hạnh | B |
| 8 | Kế hoạch scaling lên production | a Bảo | C |
| 9 | Kiến trúc production: từ một máy ra cả nước | a Bảo | C |
| 10 | Tinh chỉnh mô hình cho khớp kiến trúc và hợp đồng | a Bảo | C |
:::

Bảy việc đầu, cả lab đều biết là việc, chỉ không biết ai đang làm. Ba việc cuối, cả lab chưa biết là việc. Chúng nằm trong chương *Kiến trúc triển khai*, và trong ba con số của email production: bốn mươi tám giờ một huyện, một mét rưỡi, ba mươi tư tỉnh.

Người nhận, anh chọn người mạnh nhất có thể nhận từng việc, không chọn người dễ kẹt. Giao cho người yếu rồi người ta kẹt thì chẳng chứng minh được gì. Gần như dòng nào cũng có tên anh Bảo, vì anh Bảo là người duy nhất ở tầng mười bảy anh không chắc thắng được.

Cột cuối là anh đoán trước. Viết ra, ghi giờ, để một tuần sau không tự lừa mình rằng mình đã biết từ đầu.

Ba việc cuối anh đoán C, và lý do phải viết được thành câu, không thì cũng chỉ là một cảm giác nữa. Kiến trúc production nằm ở chỗ giao của ba thứ: hệ thống phân tán, toán của mô hình, và yêu cầu của khách. Anh Bảo giỏi thứ nhất, nhưng không biết mô hình chỗ nào chia ra chạy được, chỗ nào phải chạy liền, sai số đi qua biên ô thì lan thế nào. Khối kinh doanh biết thứ ba, nhưng không biết hai thứ kia tồn tại. Ở tầng mười bảy, chỉ một người đứng được ở cả ba chỗ. Cái bảng này là để kiểm xem câu ấy có đúng không.

Việc thứ hai là tiêu chí. Viết trước khi giao, viết bằng mực, để không sửa được.

:::note ink
phép thử: không có mình, tầng 17 có chạy không?
giao hết 10 việc. 28/5 → 4/6. bàn giao đủ, có cả vì sao.
mình ngồi đó, không làm hộ. 4/6 nghỉ hẳn. 6h tối mới đọc.
đo: xong chưa / đúng không / mất bao lâu / nói được vì sao không.
A: làm ngang mình. B: làm được, chậm hơn hoặc kém hơn. C: không làm được.
toàn A và B: trượt. mình thay được.
có C: đỗ. ở đúng những ô C.
:::

B cũng tính là trượt, và anh để thế có chủ đích. Lão không cần người làm ngang anh. Lão chỉ cần người làm được: chậm hơn một chút, kém hơn một chút, rẻ hơn nhiều. Việc nào có người làm được là việc ấy lão có lựa chọn khác. Chỉ ở những ô không ai làm được, cơ sở mới đủ chắc để đứng lên.

Đến dòng *bàn giao đủ, có cả vì sao* thì anh dừng lâu hơn.

Runbook hiện tại có mười hai mục, mục nào cũng ghi đủ từng bước, không mục nào ghi vì sao. Vì sao bước 3 lọc mây ở ngưỡng không phẩy ba lăm mà không phải không phẩy bốn, câu trả lời nằm trong bốn mươi lần thử thất bại, và bốn mươi lần ấy nằm trong đầu anh, không nằm trong file nào. Giao nguyên như thế thì người ta kẹt là chắc. Phép thử sẽ đỗ, và đỗ vì anh giấu.

Thêm cột *vì sao* cho mười việc thì mất cả đêm, và có thể làm phép thử trượt. Anh biết. Nhưng một cơ sở đứng được nhờ mình giấu bớt thì không phải cơ sở, chỉ là một cái hố mình tự đào rồi tự phủ lá lên. Nếu dưới chân là cát, anh cần biết trước khi dồn cả sức nặng lên.

Rồi anh mở Teams.

:::chat Teams · anh Tuấn
> Anh ơi, trước production em muốn bàn giao thử toàn bộ phần em đang cầm cho các anh chị, một tuần, từ mai đến thứ Sáu sau, để lab có người dự phòng ạ
> Tầng mười tám mà hỏi rủi ro phụ thuộc một người thì mình có sẵn câu trả lời
> Thứ Sáu 4/6 em xin nghỉ một ngày, để mọi người chạy thử không có em
Anh Tuấn: Ý hay đấy em
Anh Tuấn: Đúng cái anh đang cần cho danh sách 😄
Anh Tuấn: Ok, hôm ấy nghỉ cho lại sức 👍
:::

Lão duyệt trong bốn phút. Người vừa thắng thì xin gì cũng dễ. Còn chữ *rủi ro phụ thuộc một người*, lão đọc lướt, như đọc một câu trong slide của người khác.

Anh mở một thư mục mới, đặt tên *ban_giao/*. Mười file, mỗi file một việc. File nào cũng hai cột. Cột trái là bước. Cột phải là vì sao.

Bước 3 của file thứ nhất: lọc mây ở ngưỡng không phẩy ba lăm. Cột phải: *0,4 thì mây mỏng trên ruộng lúa lọt vào, trông như mái tôn; 0,3 thì cắt mất mái tôn thật. Thử bốn mươi lần trên ảnh tháng mười đến tháng hai. Mùa mưa (tháng năm đến tháng chín) mây dày và thấp, ngưỡng vẫn đúng nhưng phải bật thêm bước lọc bóng mây, xem mục 2.4.*

Viết xong dòng ấy, anh ngồi nhìn nó lâu hơn cần. Bốn mươi lần thử thất bại, bốn tháng, những đêm ở tầng mười bảy một mình với tiếng điều hòa, bây giờ nằm gọn trong bốn dòng. Lần đầu tiên chúng có một chỗ ở ngoài đầu anh. Chúng trông nhỏ hơn anh tưởng.

Anh viết tiếp.

Ba việc cuối thì không có runbook để viết. Anh gom chương *Kiến trúc triển khai*, file *terminal_to_cluster_v0.md* từ tháng ba, và một đề bài thật: chạy thử cho một tỉnh, yêu cầu đúng như hợp đồng. Anh chọn Lào Cai. Ruộng bậc thang, đồi dốc, mây núi. Bản thiết kế của anh được chỉnh trên ảnh đồng bằng; nếu nó gãy thì sẽ gãy ở đây. Chọn một tỉnh dễ cũng là một cách giấu.

Bảy quân domino đứng dọc mép bàn, trong một dãy đèn trần duy nhất còn sáng. Bảy quân bằng nhau, cách nhau đúng một đốt ngón tay. Đêm nay anh không thêm quân nào.

Điện thoại sáng lên.

[…]

## Ch.37 cũ *Mục 2.4* (28/5/2027): buổi bàn giao, đề bài Lào Cai, biên ô

Nguồn: `content/import/38-chuong-37-muc-2-4.md`

*Dòng 9–100:*

Lịch mời gửi lúc bảy giờ năm mươi: *Bàn giao dự phòng trước production – phòng họp nhỏ, 9h00.* Tám phút sau, bảy người đã bấm *Chấp nhận*. Một cuộc họp có chữ *production* trong tiêu đề thì không ai dám từ chối.

Chín giờ kém năm, anh xếp mười tập giấy thành một hàng dọc trên bàn họp, đúng thứ tự trong bảng `khoanh_vung.md`. Cạnh hàng giấy, anh đặt cuốn sách về hệ thống phân tán.

Gáy sách đã sờn thành màu trắng. Giấy nhớ vàng thò ra ở mép như một hàng răng. Mấy tuần nay ai thấy nó trong ba lô anh cũng nghĩ đó là một cái cớ, và có những ngày nó là cái cớ thật: ở thư viện, ở quán trà, anh cầm nó bốn mươi phút mà không lật trang nào. Nhưng những đêm không ai thấy, anh đọc nó thật, từng trang, gạch dưới bằng bút chì. Sáu tháng ở tòa nhà kính dạy anh *làm*. Cuốn sách dạy anh vì sao những thứ mình làm lại chạy được. Một trăm mười hai dòng *vì sao* đêm qua, có một nửa anh viết được là nhờ nó.

---

Họ vào theo đúng thứ tự anh đoán. Chị Ngân trước, vì chị đến đâu cũng đến trước. Rồi chị Hạnh với cuốn sổ bìa da, Trâm với cốc trà sữa, chị Quỳnh với một cây bút duy nhất. Anh Kiên vào cùng anh Bảo, như hai đoạn của cùng một dòng code. Chị Phương vào sau cùng, đứng ở cửa nhìn mười tập giấy một giây rồi mới ngồi.

Cái ghế của Hà My ở bàn họp vẫn để trống. Không ai kéo nó ra.

Lão không vào. Lão thò đầu qua cửa kính, giơ ngón cái, đi.

"Em nói ngắn thôi ạ," anh nói. "Trước production, lab cần có người làm được mọi phần em đang cầm. Em giao hết cho các anh chị trong một tuần, đến hết thứ Sáu sau. Mỗi người một tập. Trong tập có từng bước, và vì sao làm bước ấy."

Anh dừng một nhịp.

"Tuần này em vẫn ngồi ở bàn em, nhưng em không làm hộ. Ai hỏi gì, em chỉ nói mục mấy. Thứ Sáu sau em nghỉ."

Chị Ngân ghi giờ vào sổ. Trâm nhìn chị Hạnh. Chị Phương nhìn anh như nhìn một bảng tính có một ô công thức chị không đoán được.

Anh phát từng tập.

Anh Kiên nhận hai tập, số một và số hai, và lật thẳng đến bước ba, như người ta lật đến trang có tên mình trong danh sách thi. Đọc cột bên phải. Đọc lại.

"Ra thế," anh Kiên nói, không với ai.

Chỉ hai chữ, nhưng mặt anh Kiên sáng lên một cách rất cụ thể, như một cái ô vừa chuyển từ đỏ sang xanh. "Anh chạy bước ba nửa năm nay," anh Kiên nói, lần này với anh. "Không biết nó đỡ cái gì. Cứ chạy thôi. Hóa ra không phẩy bốn thì mây mỏng lọt vào thành mái tôn."

"Giờ anh biết rồi ạ."

"Ừ." Anh Kiên cúi xuống đọc tiếp, ngón tay dò theo dòng. Anh nhìn ngón tay ấy đi qua bốn mươi lần thất bại của mình trong ba giây, và thấy chúng nhỏ hơn hẳn khi nằm trên giấy.

Chị Quỳnh nhận tập số bốn, lật từ đầu đến cuối, hỏi đúng một câu: "Bộ nhãn tháng sáu theo quy chuẩn cũ hay mới?"

"Mới ạ. Mục 4.2."

Chị ghi vào lề bằng cây bút duy nhất. "Ừ." Rồi gập tập lại, như gập một cái hộp đã kiểm đủ đồ.

Chị Hạnh nhận tập số bảy bằng hai tay, như nhận một cái phong bì. "Em giao cho chị thật à?"

"Dạ. Số liệu, phụ lục cho báo cáo của anh Tuấn. Chị là người biết anh ấy cần gì nhất."

Chị cười, một cái cười nở chậm. Anh thấy chị đọc tập giấy ấy thành một lời làm hòa, sau một tuần chị đứng ở phía bên kia bàn cờ mà không biết mình đứng ở đó. Anh để chị đọc thế. Đọc thế cũng không sai.

Trâm nhận tập số năm, làm chung với anh Bảo. "Câu hỏi kỹ thuật của đối tác, từ nay anh Bảo viết, em gửi," anh nói. Trâm nhìn anh Bảo, rồi nhìn anh, như người được bảo đổi bàn giữa bữa ăn. "Dạ."

Còn lại anh Bảo.

Anh đẩy sang bốn tập: ba, sáu, và một tập dày hơn tất cả, ghi *8–10*. Cộng với số hai và số năm làm chung với người khác, anh Bảo nhận sáu việc.

Anh Bảo lật tập dày trước. Bốn mươi trang đầu là chương *Kiến trúc triển khai*. Trang cuối là đề bài, một tờ:

:::note
Chạy thử production cho một tỉnh: Lào Cai.
Ảnh: kho tháng 4/2027.
Yêu cầu theo hợp đồng: kết quả theo huyện trong 48 giờ, sai số độ cao ≤ ±1,5 m.
Tài liệu: chương Kiến trúc triển khai; terminal_to_cluster_v0.md.
Hạn: thứ Năm 3/6.
:::

Anh Bảo đọc tờ đề, không nói gì. Anh Bảo kéo cái tai nghe trên cổ xuống, đặt lên bàn, cạnh tập giấy. Cả lab biết tai nghe của anh Bảo là cái cửa. Đeo lên là đóng. Tháo khỏi cổ, đặt xuống bàn, thì hiếm.

Mọi người đứng dậy, ôm tập của mình ra. Chị Ngân giữ cửa cho chị Hạnh. Trâm đi sau cùng, cốc trà sữa đã cạn.

Anh Bảo vẫn ngồi. Anh thu dọn ba tập giấy thừa vào một chồng, chậm, chờ.

Khi cửa kính khép lại, anh Bảo nói, không ngẩng lên khỏi tờ đề:

"Lào Cai. Chú chọn tỉnh khó nhất."

*Chú.* Tối hôm qua, lúc khoác ba lô đi ngang bàn anh, anh Bảo đã gọi anh là *em*. Anh nghe chữ *chú* quay lại, và anh không đọc tiếp.

"Tỉnh nào dễ thì không đo được gì anh ạ."

Anh Bảo ngẩng lên. Không phải cái nhìn của người lớn tuổi hơn. Cái nhìn của một kỹ sư đọc log.

"Chú đang thử ai?" anh Bảo hỏi. "Thử bọn anh, hay thử chú?"

Phòng họp nhỏ im đến mức nghe được tiếng điều hòa.

"Thử cái lab anh ạ," anh nói. "Production mà một người cầm thì nguy."

"Ừ." Anh Bảo cầm tai nghe lên, đeo lại lên cổ, chưa đeo lên tai. "Thì thử."

Câu trả lời của anh đúng. Chỉ là không trọn. Thử cái lab là thử xem cái lab có cần anh không. Trong câu hỏi của anh Bảo, vế thứ hai mới là vế thật, và anh Bảo biết anh vừa trả lời thiếu một nửa. Anh Bảo cầm tập *8–10* đi ra, không nói thêm câu nào.

---

Về bàn, anh xé một mẩu giấy nhớ, dán lên mép màn hình, chỗ ai đi qua cũng không đọc được.

[…]

*Dòng 258–268:*

Bốn giờ, anh đi rót nước, và đi đường vòng qua bàn anh Bảo.

Trên màn hình anh Bảo là một tấm ảnh vệ tinh Lào Cai, những bậc ruộng cong như vân tay, chồng lên một lưới ô vuông màu xanh. Anh Bảo đang chia ô. Chia gọn, đều, kiểu một kỹ sư hệ thống chia việc cho máy: mỗi ô một tác vụ, các ô chạy song song, không ô nào phải chờ ô nào. Đúng như chương *Kiến trúc triển khai* viết. Đẹp.

Anh nhìn thấy một đường lưới cắt ngang một sườn đồi, đúng chỗ độ dốc đổi chiều. Ở đồng bằng, chỗ ấy không có gì. Ở đây, hai ô hai bên đường lưới sẽ tính độ cao của cùng một mái nhà theo hai cách khác nhau, và chỗ hai ô gặp nhau sẽ có một bậc thang không có thật.

Câu ấy lên đến tận đầu lưỡi anh. *Biên ô anh ạ.*

Anh cắn má trong. Uống một ngụm nước. Đi tiếp.

[…]

## Ch.38 cũ *Danh sách* (31/5–7/6/2027): kết quả, ô C, lấy lại đầu mối vận hành

Nguồn: `content/import/39-chuong-38-danh-sach.md`

*Dòng 55–60:*

Anh Bảo hỏi đúng một lần, chiều thứ Tư, bằng tin nhắn riêng.

:::chat Teams · anh Bảo
Anh Bảo: Lào Cai. Chỗ ghép kết quả ở biên, thiết kế ghi trung bình có trọng số. Trọng số lấy theo cái gì
> mục 3.2 a
:::

[…]

*Dòng 123–127:*

:::chat
Anh Bảo: Lào Cai lệch ở biên. Anh không biết vì sao
Anh Bảo: Phần này chú làm đi
Teams · Thiên Nhãn – Cảnh báo: Đường ống: 186/186 ô hoàn thành. 0 ô lỗi.

[…]

*Dòng 140–160:*

| # | Việc | Giao cho | Đoán | Kết quả | Vì sao |
| --- | --- | --- | --- | --- | --- |
| 1 | Vận hành đường ống | a Kiên | B | **A** | ngày 1: 22'. ngày 3: 9'. có script. nói được vì sao |
| 2 | Ô lỗi theo mùa | a Kiên + a Bảo | C | **C** | chạy đúng mục, nhưng ảnh tháng 6 cần ngưỡng mới: không ai chỉnh |
| 3 | Huấn luyện lại | a Bảo | C | **C** | chạy được, độ chính xác tụt 4%, không biết tụt vì đâu |
| 4 | Quy chuẩn nhãn | c Quỳnh | A | **A** | không hỏi lần nào. đúng |
| 5 | Câu hỏi đối tác | a Bảo + Trâm | B | **B** | đúng, chậm 1 ngày |
| 6 | Tài liệu tầng 18 | a Bảo | B | **B** | đúng, chậm |
| 7 | Phụ lục báo cáo | c Hạnh | B | **B** | 1 số sai. vẫn gửi. không ai hỏi |
| 8–10 | Scaling, kiến trúc, tinh chỉnh | a Bảo | C | **C** | Lào Cai: triển khai đúng thiết kế. sai số ở biên ô vượt ±1,5 m. không nói được vì sao |
:::

Anh nhìn cái bảng một lúc lâu.

Năm ô C. Đúng năm ô anh đoán C. Không lệch ô nào.

Ba việc cuối, anh đã viết lý do từ tối hai mươi bảy, và lý do ấy đứng được. Sai số độ cao trên sườn dốc không nằm trong ô. Nó nằm ở chỗ hai ô gặp nhau. Muốn sửa phải biết mô hình chỗ nào chia ra chạy riêng được, chỗ nào phải chạy liền, sai số đi qua biên thì lan theo hướng nào. Trong chương *Kiến trúc triển khai* có công thức ghép biên. Không có chỗ nào ghi vì sao trọng số lấy theo độ dốc chứ không theo khoảng cách. Câu ấy nằm trong đầu anh, ở một đêm tháng ba, trên một tấm ảnh đồng bằng, khi anh thử bốn kiểu trọng số và chọn kiểu thứ ba. Anh Bảo hỏi đúng câu ấy, chiều thứ Tư. Anh trả lời bằng một số mục. Mục ấy ghi công thức, không ghi vì sao.

Đó là chỗ anh không viết vào một trăm mười hai dòng. Không phải vì giấu. Vì đêm hai mươi bảy anh chưa biết nó là một *vì sao*. Anh tưởng nó là toán.

Anh ghi chú thêm vào lề, để công bằng:

[…]

*Dòng 195–200:*

:::

Anh không gạch *trước tháng bảy*. Anh đọc lại hai chữ ấy, biết chúng có nghĩa là có hạn, và để nguyên. Production là tháng bảy. Trước tháng bảy là đủ.

Đây là một phán quyết có cơ sở. Nó đứng trên một tuần dữ liệu, mười dòng đoán viết trước bằng mực, bốn tiêu chí không sửa, và một bảng bàn giao trung thực đến mức có thể làm chính anh trượt. Trong mọi thông tin anh có, nó đúng.

[…]

*Dòng 210–270:*

Nhưng dòng một là A.

Anh đặt mình vào chỗ lão. Lão không đọc được mô hình. Lão không biết biên ô là gì. Nhưng lão đọc được một bảng. Nếu bảng này nằm trên bàn lão, mắt lão sẽ đi từ trên xuống, và dừng ở dòng đầu tiên có chữ A. Vận hành: có người làm được, ngang anh, rẻ hơn anh. Việc dễ thấy nhất, việc cả lab nhìn mỗi sáng, việc tầng mười tám hỏi đầu tiên mỗi khi có sự cố. Năm ô C nằm ở chỗ lão không đọc được. Ô A nằm ở chỗ lão đọc được.

Một ô A trong tay anh Kiên là một cái lý do có sẵn, để ai đó, một ngày nào đó, viết tên anh Kiên vào chỗ của anh.

Anh không cần nghĩ lâu. Anh chỉ cần một lý do hợp lý, và lý do ấy có sẵn: production cần một đầu mối duy nhất trong giai đoạn chuyển giao cho đối tác. Đúng. Hợp lý. Ai đọc cũng gật.

Anh mở email.

:::email
Từ: Thuyên
Đến: anh Tuấn
Cc: anh Kiên
Tiêu đề: Đầu mối vận hành giai đoạn chuyển giao production

Anh ơi,

Tuần bàn giao chạy tốt ạ, đường ống ổn định, anh Kiên đã nắm được phần vận hành và có viết thêm script tự động rất hay.

Giai đoạn chuyển giao production, em xin phép giữ lại vai trò đầu mối vận hành, để phía đối tác có một người chịu trách nhiệm duy nhất khi phát sinh sự cố. Anh Kiên em vẫn để tên dự phòng như đã bàn giao.

Em cảm ơn anh ạ.
:::

Anh đọc lại hai lần. Không có chữ nào sai. Không có con số nào bẻ. Không có gì bị cắt, bị giấu. Anh Kiên được khen bằng tên, được nhắc đến script, được giữ tên dự phòng. Anh chỉ lấy lại một thứ người khác vừa làm được.

Gửi. Bảy giờ mười hai phút.

Bảy giờ mười sáu, lão trả lời.

:::email
Từ: anh Tuấn
Đến: Thuyên
Cc: anh Kiên
Tiêu đề: Re: Đầu mối vận hành giai đoạn chuyển giao production

Ok em. Production một đầu mối là chuẩn rồi 👍
:::

Rồi anh nhắn riêng cho anh Kiên.

:::chat Teams · anh Kiên
> anh ơi script hay lắm
> giai đoạn production anh để em cầm lại vận hành đến qua chuyển giao nhé, có gì em vẫn nhờ anh
Anh Kiên: 👍
:::

Một ngón tay cái. Không hỏi. Anh Kiên chưa bao giờ hỏi vì sao một quyết định được đưa ra; anh Kiên chỉ hỏi bước tiếp theo là gì. Anh đã dựa vào điều ấy, và biết là mình đang dựa vào nó.

Anh tắt email. Đây là việc duy nhất anh làm sau phán quyết, và anh giữ nó là việc duy nhất. Không đụng vào đường ống. Không xóa script của anh Kiên. Không sửa dòng *vì sao* nào. Một ô A được trả về chỗ cũ, bằng một lý do đúng, và mọi thứ khác vẫn nguyên.

Anh ghi vào sổ, dưới phán quyết, bằng bút chì:

:::note
1 → lấy lại. lý do: production 1 đầu mối. (đúng)
:::

Anh viết chữ *đúng* trong ngoặc, như người ta ghi chú cho một bài làm đã chấm. Rồi anh để cây bút chì nằm ngang trên trang, đè lên chữ ấy.

[…]

*Dòng 330–338:*

:::sheet danh_sach_nhap.md
| Vị trí | Người phụ trách | Lý do |
| --- | --- | --- |
| Trưởng nhóm | anh Tuấn | định hướng, đầu mối với tầng 18 |
| Đầu mối kỹ thuật – vận hành | Thuyên | production 1 đầu mối; thiết kế kiến trúc triển khai |
| Dự phòng vận hành | anh Kiên | đã vận hành độc lập trong tuần bàn giao |
| Hệ thống – hạ tầng | anh Bảo | mạnh nhất lab về hệ thống |
| Dữ liệu | chị Phương | theo bảng phần dữ liệu |

[…]

## Ch.39 cũ *Câu hỏi của em* (7/6/2027): kể lại với Diệp Anh; production chạy

Nguồn: `content/import/40-chuong-39-cau-hoi-cua-em.md`

*Dòng 130–140:*

Cô cúi xuống nhìn màn hình. Mái tóc buông của cô rủ xuống, chạm vào cổ tay anh.

"Ô nào là của anh Bảo?"

"Hai, ba, và cái ô to nhất. Tám đến mười." Anh chạm vào dòng cuối. "Lào Cai. Anh ấy triển khai đúng thiết kế. Đúng từng dòng. Nhưng sai số dồn ở biên ô, vượt một mét rưỡi, và anh ấy không giải thích được vì sao."

"Vì sao?"

"Vì cái *vì sao* ấy em không viết vào đâu cả." Anh cười. "Em còn không biết nó là một *vì sao*. Em tưởng nó là toán."

[…]

*Dòng 290–305:*

Anh đọc chữ *trước tháng bảy* một lúc lâu. Rồi anh nghĩ đến cái gì sẽ đến sau tháng bảy.

Production chạy. Năm ô C vẫn là năm ô C, vì cái *vì sao* nằm trong đầu anh không tự chuyển sang đầu ai được trong một tháng. Hợp đồng part-time của anh còn đến tháng mười, nhưng một hệ thống chạy cả nước thì không ai để nó nằm trong tay một người part-time. Sau production, người ta sẽ phải tính chuyện giữ anh, và anh sẽ ngồi ở bàn bên kia với một tờ giấy mà anh biết rõ mình là người không thay được ở những dòng nào.

Full-time. Mức lương gấp đôi. Không phải đòi. Đặt lên bàn, có cơ sở, như đặt một cái bảng.

Anh mở ghi chú, gõ ba dòng, một tay, tay kia vẫn vòng qua eo cô. Ngón cái trượt sai hai lần. Anh xóa, gõ lại, chậm, như người say vẫn cố viết cho đúng chính tả.

:::phone
sau production (cuối t7):
– xin full-time. mức: x2.
– cơ sở: bảng 4/6. ô 2, 3, 8, 9, 10.
:::

Anh đọc lại. Không có chữ nào là một lời nói dối. Không có con số nào bị bẻ. Đó là một kế hoạch đứng trên dữ kiện, viết bằng chính những dòng anh đã chấm bằng mực.

[…]
