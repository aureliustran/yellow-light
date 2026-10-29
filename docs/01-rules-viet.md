# Đèn vàng – Rules viết

Oct 5, 2026 · @aureliustran. Sửa Oct 28, 2026 (văn phong theo cây tuyến; cỗ máy trên trang; kênh giác quan theo loại ký ức).

Kỹ thuật viết cho toàn truyện. Mạch truyện và nhân vật nằm ở file 02-mach-truyen.md.

**Sửa 28/10:** truyện không có văn phong mặc định chung. Register (văn phong) được chọn theo node × giai đoạn × nhịp qua cây tuyến, xem mục *Văn phong theo cây tuyến* ngay trước mục *Giọng của Thuyên theo đối tượng*, và `docs/rules/registers.md`. Các luật câu chữ trong file này (không gọi tên cảm xúc, chuyển dạng, màu lời kể, tự thoại) áp cho mọi register, trừ chỗ ghi ngoại lệ.

## Nguyên tắc chung

Cho thấy là mặc định: người đọc tự cảm nhận qua chi tiết. Nhưng giấu hay nói đều phải có mục đích (xem dòng đầu dưới đây).

- **Không gọi tên cảm xúc, không giải thích động cơ ở phần cần giấu, và giấu phải đi kèm mục đích** (chốt 15/10). Phần cần giấu là:
  - nhân vật truyện cần người đọc đi sau một bước: Khải (đến *Quân trắng*), ngài Morpheus (đến *Quân đen* và cảnh quán bia hơi), Diệp Anh ở phía bên kia (đến *Quân đen*). Mục đích: giữ bất ngờ cho lần lật bài, mọi manh mối đọc được theo hai nghĩa;
  - cảm xúc nhân vật POV chưa tự nhận ra hoặc chưa chịu nhận (Nhi với Thuyên trước khi cô gọi tên được; Thuyên với Nhi). Mục đích: người đọc nhận ra trước nhân vật.
  Ở các chỗ ấy, để hành động, chi tiết, phản ứng cơ thể tự nói. **Giấu là hoãn, không phải bỏ** (chốt 18/10): mọi điều đã giấu phải được nói ra ở nhịp lật của nó (xem mục *Ý định tác giả phải lên trang*).
- **Ngoài phần cần giấu, được gọi tên cảm xúc và nói động cơ** (không áp cho POV Thuyên: lời kể POV Thuyên không bao giờ gọi tên cảm xúc, xem mục *Cảm xúc chuyển dạng, không gọi tên*) khi nói thẳng giúp người đọc thấy đường đi của cảm xúc: nhân vật đi từ đâu đến đâu qua một cảnh. Ví dụ interlude POV Phong: người kể nói thẳng Phong thích Nhi từ bao giờ, vì sao, và buổi sáng ấy làm gì với cái thích đó. Gọi tên vẫn phải đi cùng chi tiết cụ thể, không thay chi tiết bằng tính từ.
- **Kiểm tra:** trước mỗi chỗ giấu hoặc nói, trả lời được câu *giấu để làm gì* hoặc *nói để làm gì*. Không trả lời được thì đang giấu theo thói quen.
- **Ngoại cảnh sống động:** thời tiết, mùi, âm thanh, đồ vật cụ thể (hoa sữa, đèn đếm ngược, vòi nước rỉ, lá bàng, đêm trắng Phần Lan…).
- **Suy nghĩ vu vơ có chủ đích:** ý lan man phải cài cắm điều gì đó về nhân vật hoặc cốt truyện.
- **Không viết quá chuẩn xác:** người thật không nói và nghĩ gọn gàng, logic tuyệt đối.

### Ý định tác giả phải lên trang (chốt 18/10)

**Luật:** toàn bộ ý định của tác giả viết trong tài liệu phải được kể lại trong truyện, ở một nhịp hợp lý, với độ chi tiết **từ nguyên văn trở lên**.

- **Ý định là gì:** mọi thứ tài liệu nói về *vì sao* và *nghĩa là gì*: động cơ, lý luận, cơ chế, nhân quả, hệ giá trị, gương giữa các nhân vật, mỉa mai, tầng nghĩa của một vật hay một câu, lý do một kế hoạch thành công hay thất bại. Nguồn: bible, rules, dàn ý, brief, plan, các module sửa đổi (`claude/sua-doi/`), thẻ nhân vật.
- **Không có ý định nào chỉ nằm trong tài liệu.** Người đọc chỉ đọc truyện. Ý nào không lên trang thì với người đọc là không tồn tại. Một ý không tìm được nhịp hợp lý thì hoặc thêm nhịp (cảnh, đoạn, dòng), hoặc cắt ý khỏi tài liệu.
- **Độ chi tiết từ nguyên văn trở lên:**
  - **Mức sàn là nguyên văn:** câu, lý lẽ, con số, phép tính trong tài liệu được đưa thẳng vào lời kể, tự thoại, thoại, tin nhắn, bảng (`:::sheet`, `:::note`), không cần paraphrase và không được tóm nhỏ hơn.
  - **Từ đó trở lên:** dựng thành cảnh, thoại, vật, hành động, tự thoại. Cho thấy được thì cho thấy, nhưng cho thấy phải đủ để người đọc ráp ra đúng ý; không đủ thì nói thêm bằng nguyên văn.
- **Nhịp hợp lý:**
  - **Phần cần giấu:** kể ở nhịp lật (*Quân trắng*, *Màu xám*, *Đen*, *Quân đen*, *Áo cử nhân*, chương lật bài…), không kể trước.
  - **Đúng POV:** người kể chỉ nói điều nhân vật POV biết hoặc nghĩ được. Điều chỉ Khải biết thì nằm trong interlude của Khải; điều Thuyên không biết thì để người đọc biết qua POV khác hoặc qua một nhịp sau.
  - **Đúng giọng:** nguyên văn được dùng khi khớp giọng người kể. Không khớp thì giữ ý, đổi chữ ít nhất có thể sang chữ của nhân vật (Thuyên: chữ của hệ giá trị; Nhi: câu ngắn thấu cảm, không rẽ nhánh; Khải: liệt kê lạnh, ngôi tôi; Diệp Anh: giọng biên bản).
  - **Đúng mật độ:** nhiều ý cùng chương thì rải ra theo nhịp; không dồn thành một đoạn giải thích.
- **Ranh với các luật khác:** vẫn cấm thuật ngữ tâm lý, triết học, MBTI, tên hình mẫu tham chiếu trong lời kể (mục *Tự thoại hiện sinh*, *Các rule khác*). Ý định được nói bằng chữ của nhân vật, không bằng chữ của tài liệu thiết kế.
- **Ngoại lệ:** các dòng ghi *"Ghi chú thiết kế, không đưa vào truyện"* (MBTI, chức năng bóng, hình mẫu tham chiếu, tham khảo ngoại hình) và ghi chú kỹ thuật (quy ước tên file, định dạng, site). Những thứ này chỉ hiện qua hành vi.
- **Khi lập plan hoặc brief:** mỗi ý định trong tài liệu liên quan đến khoảng chương phải được ánh xạ thành một dòng *ý định → chỗ (chương, nhịp, POV) → câu gài (nguyên văn hoặc hơn)*, như bảng G1–G11 ở module Hệ giá trị Diệp Anh (mục 8.4).
- **Khi đánh giá thành phẩm:** soát xem ý định nào của khoảng chương chưa lên trang, hoặc lên trang ở mức thấp hơn nguyên văn. Mỗi ý thiếu là một lỗi phải sửa.

### Lời thoại

- Tự nhiên, có thể lan man, ngắt quãng.
- Âm đệm: ừm, à, ơ, haha, ơ hay…
- Thoại nói viết đầy đủ, không viết tắt ("mày", "tao", "không"). Riêng chửi tục được viết tắt: đm, vcl, cc…
- Viết tắt (t, m, k…) chỉ dùng trong tin nhắn. Tin nhắn viết như chat thật: viết tắt, không dấu câu chuẩn, emoji. Mỗi tin nhắn một dòng.

### Xưng hô

| Quan hệ | Xưng hô |
| --- | --- |
| Con trai chưa thân | tôi – ông |
| Con trai thân | tao – mày (thoại), t – m (tin nhắn) |
| Đàn em | anh – em |
| Người lớn | cháu – bác, lễ phép |
| Diệp Anh (năm tư, hơn Thuyên một khóa) | Từ chương 12 (sau khi biết anh năm ba): Diệp Anh xưng **chị**, gọi Thuyên là **em**; lúc trêu hoặc lúc yêu gọi **bé**. Thuyên xưng **em**, gọi cô là **chị**; lúc nũng (sau khi yêu, chương 21 trở đi) gọi **chị bé**. Tin nhắn: Diệp Anh viết "Chị", "em" có chữ hoa đầu câu; Thuyên viết "e", "c" hoặc "em", "chị" thường. |
| Đồng nghiệp ở lab | Thuyên là **người nhỏ tuổi nhất phòng** (sinh viên năm ba, trường hợp đặc biệt: hiếm khi sinh viên được ký hợp đồng chính thức). Gọi mọi người là anh/chị (anh Tuấn, anh Bảo, anh Kiên, chị Quỳnh, chị Hạnh, chị Phương, chị Ngân, chị Trâm, chị My, chị Ly — Ly là thực tập sinh năm cuối, hơn anh một tuổi), xưng em. Mọi người gọi anh là em, đôi khi "em út", "thằng bé". |
| Thảo (bằng tuổi Thuyên, năm ba Kinh tế Quốc dân) | Thuyên: **tớ – cậu**. Thảo: **mình – cậu** (giữ khoảng cách, ít nói). Không dùng anh – em. |
| Nhi (năm hai, nhỏ hơn) | anh – em |

**Người kể gọi nhân vật (POV Thuyên, chốt 15/10).** Người kể gọi theo cách Thuyên gọi trong đầu, và đổi khi Thuyên đổi:

- **Tuấn:** "anh Tuấn" từ ch.14 đến hết buổi review tầng 18 ở ch.32. Từ câu *"Lão đứng được là nhờ ai."* (ch.32) trở đi, lời kể gọi **"lão"** (đầu câu "Lão"). Giữ "anh Tuấn" trong thoại của Thuyên và người khác, tên hiển thị trong tin nhắn, tên người gọi đến trên màn hình điện thoại, email. Câu ở ch.35 "Một người trong phòng sếp gọi *anh*. Một người ngồi ở bàn nhựa gọi *lão*." là nhận xét của chính Thuyên về hai giọng, giữ nguyên.
- **Khải:** **"anh Khải"** (đầu câu "Anh Khải"); lần đầu ở ch.16 là "Người tên Khải". "Anh ta" làm đại từ thay thế để tránh lặp. Chữ ký email giữ "Khải".
- Interlude POV Nhi: Nhi gọi Khải là "anh trai" / "anh". Interlude POV Khải (*Quân trắng*, *Quân đen*): theo luật riêng khi viết.

### Giọng địa phương

- Bố mẹ Thuyên nói giọng Hà Tĩnh đặc, rồi "phụ đề". Chủ đạo là phụ đề trong truyện: một nhân vật không hiểu, Thuyên dịch (Vũ thăm bố mẹ Thuyên, Nhi ăn Tết). Cảnh trị liệu gia đình: nhà trị liệu không theo kịp, Thuyên phải dịch lời bố, nói ra bằng giọng mình những câu như "bố sợ". Cảnh chỉ có Thuyên với bố mẹ: chú thích cuối trang hoặc cuối chương, chỉ cho câu then chốt. Nhờ người Hà Tĩnh đọc lại các đoạn thoại.
- Thuyên ở Hà Nội nói giọng chuẩn. Về nhà hoặc lúc mất kiểm soát thì lỡ bật lại giọng quê, chi tiết đắt cho cảnh Tết và cảnh trị liệu gia đình.
- Diệp Anh có thể đã giấu hẳn giọng quê, hợp với việc cô coi trọng hình ảnh. Một lần cô lỡ bật giọng quê là một khoảnh khắc thật hiếm hoi.

### Địa danh và tổ chức

- **Tên thật** cho trường học, phố phường, quê quán, nơi được miêu tả trung tính hoặc tích cực: Đại học Công nghệ (ĐHQGHN), RMIT Hà Nội, Học viện Ngoại giao, Hà Tĩnh, Cầu Giấy – Xuân Thủy… Trong truyện gọi trường bằng tên tiếng Việt, không viết tắt tiếng Anh (UET, ULIS, UEB, DAV). Trường không phải của nhân vật thì gắn kèm quan hệ để người đọc không nhầm, ví dụ "khuôn viên Đại học Ngoại ngữ, trường hàng xóm".
- **Tên hư cấu** cho tổ chức làm điều xấu hoặc gây tranh cãi: tập đoàn nhà Nhi, lab R&D, các công ty, startup, summit. Trường phổ thông của Nhi (từ tiểu học đến lớp 12) là hệ thống trường quốc tế song ngữ của chính tập đoàn nhà cô, không gọi tên: "trường của tập đoàn", "trường nhà cô".
- Nhân vật trong trường thật vẫn là hư cấu. Không dùng tên người thật.
- Chi tiết về địa điểm thật phải đúng. Kiểm tra lại hoặc hỏi người đang học, sống ở đó.

## Văn phong theo cây tuyến (chốt 28/10)

**Luật:** truyện không có một văn phong mặc định. Mềm, ấm, ngôn tình là register của những node cụ thể (RM.TN là chính; chốt v2 19/10 "văn phong ngôn tình Việt Nam" áp cho tuyến tình cảm), không phải giọng nền. Mỗi cảnh, mỗi nhịp lấy register từ ma trận node × giai đoạn ở `docs/rules/registers.md` §3. Khi lập plan, cây quyết định chọn register ở lối vào A bước 7 (`tuyen/README.md` §5).

**Vì sao (tác giả, 28/10):** độ cực đoan của một vấn đề phải nằm trong cách viết, không chỉ trong nội dung, vì nếu không người đọc không hình dung được mức nghiêm trọng. Một tuổi thơ chỉ có đòn roi, lời quát mắng và sự vô dụng của bản thân không kể được bằng giọng của một bản tự sự đã nguôi.

**Hai register lạnh, cực đoan:**
- **R8 Sổ cái:** chỉ ghi sự việc, đếm, kiểm kê; bạo lực kể cùng giọng với việc vặt; khoảng cách sụp vào thân thể ở cú đánh; kết bằng một dòng sổ sách.
- **R9 Đắng:** giọng Thuyên hằn học, điệp khúc chữ của người khác, một khối không xuống dòng, được chửi tục (viết tắt); kết bằng câu lễ phép hoặc một hành động.

**Chỗ được dùng [chốt 28/10]:** QK.T (đòn roi, mắng, sự vô dụng ở tuổi thơ); TH.LAB ở GĐ2; toàn bộ thời điểm đổ vỡ. Ngoài các ô ấy cần tác giả duyệt. Luật chi tiết, liều và luật chuyển: `registers.md` §2, §4, §5.

**Ranh với các luật trong file này:**
- R8 và R9 **vẫn không gọi tên cảm xúc** của Thuyên. Gắt đến từ việc giấu, không từ tính từ.
- R9 luôn là giọng Thuyên, không phải người kể; người kể vẫn không phán xét. Ở quãng 1 (ch.2–6), R9 chỉ nằm ở khung hiện tại, dưới dạng bản nháp bài phát biểu anh gõ rồi xóa.
- Luật "không tự thương thân" giữ nguyên: R9 là hằn học, không là than.
- Vẫn cấm thuật ngữ tâm lý, triết học, tên hình mẫu tham chiếu.

## Cỗ máy trên trang (chốt 28/10)

Nội tâm của Thuyên là một cỗ máy: thiếu thương → phương trình "giỏi thì được thương" → cái tôi → nhu cầu được ôm vẫn còn (cái gối) → phủ nhận → giấu con người thật → thiếu sâu thêm. Sơ đồ, trục H và mười sáu thiết bị trên trang (TB-1 đến TB-16): `docs/tuyen/qua-khu/thuyen-co-may.md`. Thiết bị bắt buộc theo node × giai đoạn: `docs/rules/registers.md` §2.4. Người kể không bao giờ nối các bộ phận giùm người đọc; họ tự ráp nhờ các thiết bị dưới đây.

### Hai bộ từ vựng và luật khóa (TB-1)

- **Bộ kết quả:** giỏi, mười, giải, đứng thứ mấy, thông minh, khuyết, sửa, đủ, chấm, kết quả, hiệu quả. Là tiếng của thế giới và của cái tôi. Gồm cả ngôn từ hệ giá trị ở mục *Tự thoại hiện sinh*.
- **Bộ chịu đựng:** cố, chịu, mấy cái (roi), mấy ngày, đau không, con nói thật mà. **Chỉ cái gối được dùng** với Thuyên.
- **Luật khóa:** trước giai đoạn hồi phục, không nhân vật nào (bố mẹ, Vũ, Nhi, Diệp Anh, bất kỳ ai) nói với Thuyên một câu thuộc bộ chịu đựng. Câu ấy để dành cho cảnh sửa (TB-15). Một câu "mày cố rồi" lọt ra sớm là lỗi CHẶN.
- **Phủ nhận** luôn là bộ kết quả trả lời một nhu cầu thuộc bộ chịu đựng. Người kể không chỉ ra chỗ lệch.
- Hai bộ không trộn trong cùng một câu, trừ cú cắt ở interlude quãng 2 (TB-12): câu mở bằng bộ chịu đựng, bị cắt, nối bằng bộ kết quả.

### Dấu phân biệt hai cái tôi (TB-3)

- **Cảnh thành công:** cái tôi lành nhìn vào bài, vào vật trước, thân thể phản ứng như hồi đọc tinh vân. Cái tôi độc ngẩng lên xem ai đang nhìn trước khi nhìn bài.
- **Kể thất bại:** cái tôi lành kể như một lỗi kỹ thuật, không phòng thủ. Cái tôi độc kể kèm một danh sách bào chữa.

### Cái gối (TB-14, TB-15)

- Giọng gối giống mạ mà nhỏ hơn, chậm hơn; in nghiêng; chỉ bộ chịu đựng; luôn có một con số đã đếm được. Không bao giờ khen cái giỏi.
- Cái gối chịu cả thương lẫn hận (ôm, cắn, ném, kéo về) và sống sót. Việc ôm gối giữ suốt đời anh.
- Câu gối là tài sản để dành: payoff cuối ở hồi phục, do một người thật nói, và nghĩa phải đổi. Ở đó cái gối được đặt sang một bên, không vứt.

### Lòng tốt kích hoạt đe dọa (TB-7)

Khi một người tiến gần câu của cái gối, phản ứng đầu tiên của Thuyên là tếu, lùi hoặc lạnh đi. Không nhận. Áp cho mọi tuyến có Thuyên, đến hết GÃY.

## Giọng của Thuyên theo đối tượng

### Nền chung: tinh ý thì không lạnh

Thuyên tinh ý, nên anh không bao giờ lạnh lùng hay cộc. Cái "ngầu cụt lủn" kiểu nam chính lạnh lùng là sai nhân vật. Anh nói vừa đủ: không quá ít, không nói nhiều.

- **Mỗi lượt thoại có hai lớp:** phần cần nói (trả lời, thông tin, quyết định) và một lớp người: hoặc đồng cảm (nói trúng cái đối phương chưa nói ra, hỏi lại đúng chỗ họ đang lo), hoặc chọc ngoáy (một câu trêu, một cú mỉa nhẹ, một chi tiết cho thấy anh để ý). Thường là một đến ba câu ngắn.
- **Tránh câu trơ trọi một chữ** ("Ừ.", "Không.", "Biết.", "Chết rồi.") đứng một mình làm câu trả lời. Được dùng khi có chủ đích: đang né, đang căng, đang giấu cảm xúc, hoặc làm nhịp hài (một chữ rồi người kia đập lại). Khi dùng, cảnh phải cho thấy đó là chủ đích, và thường có lượt sau bù lại.
- **Né không phải là cộc:** khi né, anh né bằng câu đùa, trả lời một nửa, đổi chủ đề mềm, hoặc trả lời đúng mà lệch trọng tâm. Người nghe vẫn thấy dễ chịu, chỉ người tinh (Nhi, Vũ, Diệp Anh) mới thấy là né.
- **Tin nhắn:** vẫn viết tắt, không dấu câu chuẩn, nhưng không trả lời như bot. Với Vũ: lầy, bóc phốt, khoe. Với Nhi: chọc như chọc trẻ con, hỏi lại. Với Diệp Anh: đùa ngang tốc độ. Với người lạ, người lớn: lịch sự, đủ ý.
- **Kiểm tra nhanh mỗi lượt thoại:** nếu bỏ câu này đi, người đối diện có thấy anh lạnh không? Nếu có, thêm lớp người. Nếu câu đã dài quá ba câu mà không phải đang giảng bài hay đang cãi, cắt.
- **Ngoại lệ có chủ đích:** giai đoạn biến chất (cụt dần với người thân, là triệu chứng), giai đoạn trầm cảm (nói ít vì cạn), những khoảnh khắc anh cố tình làm đau (đêm ghế đá), và **cảnh áp chế ở TH.LAB GĐ2** (R8, chốt 28/10): thoại của anh với người dưới lặp nguyên khuôn câu của người lớn thời anh còn nhỏ ("Sướng thế mà còn sai à?"), không lớp người. Khi đó cụt lủn là tín hiệu, người kể phải cho thấy.

Ví dụ:

| Cộc (tránh) | Đủ (dùng) |
| --- | --- |
| "Quên tháo." | "Quên tháo. Quên liên tục từ thứ Hai, mày đừng hỏi." |
| "Chết rồi." (về cái thẻ) | "Chết rồi. Nhưng chết đẹp, em nhìn ảnh thẻ xem." |
| *ok* (trả lời Vũ) | *ok. tháng sau t bao tiếp, coi như trả lãi cho cái mồm m* |
| "Không." (Nhi hỏi có dạy IELTS không) | "Không. Anh chưa dạy ai bao giờ. Em định làm chuột bạch đầu tiên à?" |

### Theo từng đối tượng


Thuyên đọc từng người và đổi giọng theo họ. Ba lớp giọng tự cho người đọc thấy khả năng đó, không cần kể.

- **Đàn em:** dịu dàng, nâng đỡ, góp ý cụ thể, động viên.
- **Bạn thân con trai:** chửi thẳng, thân mật, lầy bựa ("ok vua hợi", "im mồm đi"). Không mỉa. Với Vũ là trêu nhau, khoe khoang vớ vẩn, bóc phốt nhau trước mặt người khác.
- **Diệp Anh (v2: đồng minh, trên mức đối tác, tình cảm thật, không yêu chính thức):** đùa ngang tốc độ, sắc, có chủ đích; ít cợt nhả hơn với Nhi, vì đây là chỗ anh còn tính. Sau đêm 31/12 (anh từ chối lời tỏ tình), phần thân mật dừng hẳn. *Bản cũ:* người yêu, "cứng với cả thế giới, nũng với một người".
- **Nhi:** chọc như chọc trẻ con, độc miệng, cợt nhả gần như suốt. Đây là dấu hiệu anh đang thoải mái, không tính (v2). Dịu dàng nằm ở hành động (mục "Dịu dàng không thừa nhận" bên dưới).
- **Meme trẻ con:** Thuyên hay tự làm mấy trò meme của học sinh cấp hai (giơ tay "six seven", trùm mũ hoodie rồi nhận mình đang "aura farming"), xong quay sang gọi người khác là "kid". Thêm: chọc ngoáy ai đó xong lấy ngón tay vuốt dọc xương hàm, tự nhận mình là "sigma"; solo bóng rổ thắng Vũ thì "gg fvcking ez"; ghép đôi người khác (ghép Nhi với một bạn nào đó dai đến mức cô khóc). Tóm lại, với người thân Thuyên thích rage bait. Một kiểu tự giễu, dùng với Vũ, Nhi, đàn em. Không dùng ở chỗ làm, không dùng với người lớn: đây là dấu hiệu anh đang thoải mái. Ở giai đoạn biến chất, trò này thưa dần.
- **Con trai chưa thân:** thẳng nhưng nhẹ hơn một nấc.
- **Người lạ làm anh không vừa ý:** mỉa mai, cay ngầm, đủ để chích nhưng không đủ để đối phương nổi khùng.
- **Gốc của giọng mỉa và ragebait (chốt 19/10):** phần lớn sự mỉa mai và trò ragebait của Thuyên mọc từ những trận cãi với bố mẹ thời cấp 2 (ch.3 mới). Năng lực quan sát người bẩm sinh gặp tư duy logic thành phản xạ ngôn ngữ: nghe một câu là thấy chỗ hỏng, câu vặn bật ra, "Dạ" ở vỏ, lưỡi dao ở ruột. Khi viết một câu mỉa ở mạch chính, có thể gọi lại nhịp ấy, nhưng không giải thích.
- **Người lớn:** lễ phép, kiên nhẫn, chịu nghe chuyện.
- **Ở chỗ làm (Phần 1):** mỗi người một giọng. Ngọt với sếp, sắc và hùa theo với đồng nghiệp.
- **Khi vụng về việc nhỏ:** tự giễu, đùa cho qua ("kệ thừa ốc là do nhà sản xuất hào phóng").

## Lười có chọn lọc, tối ưu trước khi làm (chốt 19/10)

Thuyên tính chi phí – lợi ích trước khi tay động. Gốc của nét này là nghịch có tính toán hồi nhỏ, và nó đi cùng chống đối ngầm (đối phó hiệu quả, học theo barem). Chi tiết ở `claude/sua-doi/M-he-gia-tri.md`, mục 3b.

### Ba dạng
1. **Lười có chọn lọc:** việc không đáng thì làm tối thiểu hoặc bỏ (học thuộc, văn theo barem, việc nhà).
2. **Tối ưu trước khi làm:** việc gì cũng nghĩ cách nhanh nhất, ít bước nhất.
3. **Bận nghĩ nên không làm được gì:** tính cách tối ưu đến hết giờ, việc chưa động. Người ngoài thấy một người nằm im.

### Luật chăm
- **Chăm khi có mục đích và thành quả xứng với công lớn** (lab, thực tập, thi cử có cái cân). Khi ấy anh sẵn sàng bỏ công lớn.
- **Tối ưu không làm việc khó thành dễ; nó chỉ làm việc bất khả thi thành khả thi.** Sau tối ưu, việc vẫn nặng và anh vẫn cày.
- Lười và chăm là **cùng một phép tính, khác đầu vào.** Không viết hai nét này như mâu thuẫn.

### Cách viết
- **Hiện qua hành vi, không gọi tên.** Không viết "anh lười" hay "anh thích tối ưu". Viết cảnh anh nghĩ cách quét nhà theo đường ngắn nhất đến lúc mẹ về, nhà vẫn chưa quét.
- **Trớ trêu ba phía:** người ngoài thấy lười ("ăn rồi nằm"); anh tự thấy mình đang làm; người đọc thấy cả hai.
- **Hài:** cách tối ưu có khi hỏng vì một biến số nhỏ (xếp bát theo cỡ để rửa nhanh, rồi vỡ một cái; đường tắt nhanh ba phút, ống quần lấm bùn). Đây là nguồn chính của mảng "vụng việc nhỏ".
- **Phân biệt với rảnh là đau:** nằm tính tối ưu vẫn là có việc trong đầu. Rảnh chỉ đau khi cái đầu không còn gì để tính.
- **Ở lab:** lười nên tự động hóa (script, quy trình); thấy việc đáng thì cày đến sáng. Không để người đọc thấy anh lười ở việc có cái cân.
- **Ở đáy:** không còn thành quả nào xứng đáng, nên phép tính về không, và dạng 3 quay lại thành tê liệt.

## Tự thoại hiện sinh của Thuyên (chốt 18/10)

Tính hiện sinh là **đặc trưng của tự thoại qua lời kể của người kể**. Người kể đi theo Thuyên, kể bằng giọng nghĩ của anh (gián tiếp tự do), và chính lời kể ấy mang chất hiện sinh: chạm vào câu hỏi về giá trị, ý nghĩa, sự tồn tại của chính anh. Ý nghĩ in nghiêng chỉ là chỗ đậm nhất của cùng một giọng, không phải nơi duy nhất.

**Chỉ áp dụng cho Thuyên.** Các POV khác không dùng giọng này:
- Nhi gọi tên được cảm giác của mình, giọng ghi chú điện thoại;
- Diệp Anh sắc, giữ hình ảnh;
- Phong mềm, nhìn qua ống kính;
- Khải lạnh, gần như liệt kê.

Khi một nhân vật khác chạm vào câu hỏi lớn, họ chạm theo giọng của họ, không mượn khung khuyết – sửa – đủ của Thuyên.

Gốc của giọng này là hệ giá trị của Thuyên (xem `claude/sua-doi/M-he-gia-tri.md`):
- lăng kính khách quan;
- khuyết thì phải sửa;
- không còn gì để sửa nghĩa là kẻ thất bại;
- luôn cần một thứ ở phía trước để chạy.

### Nguồn

- Mỗi câu hiện sinh ngầm trả lời một câu hỏi: *mình đáng giá bao nhiêu khi…* (khi không còn việc, khi đã thắng, khi không ai chấm, khi không có ai hỏi).
- Các trục:
  - **đủ:** "đủ là bao nhiêu";
  - **thước:** ai đặt ra cây thước;
  - **chạy:** mình chạy tới hay đang bị đuổi;
  - **rỗng:** sau khi thắng;
  - **vô hình:** "không có chữ nào về mình";
  - **thời gian:** ánh sáng của ngôi sao đã chết vẫn đang bay tới.

### Hình thức

- **Ngắn: một đến ba câu.** Là câu hỏi không có câu trả lời, hoặc một mệnh đề trần. Ý nghĩ trực tiếp thì in nghiêng; ý nghĩ gián tiếp tự do thì hòa vào lời kể. Không độc thoại dài, không triết luận. **Ngoại lệ (chốt 28/10):** khối R9 Đắng (`registers.md` §2.2) được là một khối dài, không xuống dòng. Nó không phải tự thoại hiện sinh: nó hằn học về người khác và về chính mình, không hỏi về giá trị, và chỉ đứng ở ô ma trận cho phép.
- **Dùng thẳng ngôn từ của hệ giá trị, không cần paraphrase.** Hệ giá trị là khung nghĩ của chính Thuyên, nên chữ của nó là chữ của anh. Tự thoại và lời kể nội tâm được dùng nguyên các từ: *khuyết, sửa, sửa xong, đủ, chưa đủ, không bao giờ đủ, cây thước, chấm, kẻ thất bại, phía trước, chạy, đứng yên, lỗi ở đâu, mất ở câu nào*. Ví dụ: *Lại một khuyết. Sửa.*, *Không còn gì để sửa. Thế thì mình là kẻ thất bại.*, *Phải có cái gì ở phía trước.* Nói thẳng ý của hệ giá trị là cách giọng anh vận hành, không phải "gọi tên cảm xúc" hay giải thích động cơ.
- **Vẫn cấm thuật ngữ tâm lý và triết học** (không phải chữ của anh): "hiện sinh", "vô nghĩa", "trống rỗng hiện sinh", "trầm cảm", "giá trị bản thân", "cầu toàn", "tự ti". Không trích triết gia. Tên bệnh để đến cuối Phần 1.
- **Từ vựng là thứ anh sống cùng:**
  - **thiên văn:** quỹ đạo, ngôi sao đã chết, vũ trụ to ra vào cái gì, Sao Hôm không phải sao;
  - **lập trình:** vòng lặp không có điều kiện dừng, hàm không trả về gì, bài chạy quá một giây là không điểm, báo lỗi rồi đợi sửa;
  - **đồ vật của quá khứ:** tủ kính, vỏ gối, bể nước, cái Casio dây rộng.

  Câu hiện sinh của Thuyên nghe như một kỹ sư nhìn lên trời, không như một triết gia.
- **Vênh với lời kể:** lời kể khô ("Không buồn. Chỉ là thêm một dòng"), tự thoại để lộ chỗ đau. Không bao giờ ngược lại.
- **Không tự thương thân, không được an ủi:** tới gần chỗ thương thân thì lý lẽ "chắc ai cũng thế" cắt ngang. Lời kể không trả lời câu hỏi thay anh.

### Thời điểm

- **Đặt ở:** cảnh rảnh (hết việc, cuối tuần, sau deadline); ngay sau mỗi lần thắng; đêm muộn; lúc vừa rời đám đông về phòng (ch.7: cả ngày nói, "không có chữ nào về mình"); lúc nghe tiếng dép, tiếng bát, cuộc gọi tám giờ.
- **Không đặt giữa cảnh đấu trí, cảnh hài hay cảnh thân mật**, trừ một dòng lạnh ở cuối cảnh.
- **Mật độ:**
  - chương mạch hiện tại: tối đa một đến hai câu;
  - chương quá khứ (2–7): ba đến năm câu, rải theo mảnh.

  Cộng cả câu tự soi về đọc người: không vượt trần đã ghi ở bản rà soát ch.8–38. Khối R9 không tính vào trần này; nó có liều riêng (`registers.md` §2.2, §5).

### Đường đi theo giai đoạn

| Giai đoạn | Giọng tự thoại | Ví dụ hướng (không dùng nguyên văn) |
| --- | --- | --- |
| Lớp 3–7 | Hỏi ngây thơ về vũ trụ, câu hỏi bị gạt quay vào trong | Có những thứ đã mất rồi mà người ta vẫn còn nhìn thấy |
| Lớp 8–9 | Khóc không biết vì sao; trốn vào câu hỏi lớn | Nếu vũ trụ đang to ra thì nó to ra vào cái gì |
| Lớp 11 | Lần đầu hỏi về cây thước | *Đủ là bao nhiêu. Ai đếm.* |
| Lớp 12 | Lời thề lạnh | *Lần sau không hỏi ai nữa.* |
| Đại học | Vô hình giữa đám đông | Mấy nghìn chữ một ngày, không chữ nào về mình |
| Lab, giai đoạn 1 | Cảnh rảnh, tự đẻ việc | *Nếu mai không có ô đỏ nào, mình làm gì ở tầng mười bảy.* |
| Giai đoạn 2 | **Thưa dần.** Mục tiêu và tầm nhìn dài hạn lấp chỗ trống. Câu hiện sinh bị thay bằng danh sách | Sự vắng mặt của câu hỏi là triệu chứng |
| Đổ vỡ | Quay lại dồn dập, không còn mục tiêu nào chặn | Vòng lặp không có điều kiện dừng |
| Phần 2 | Được trả lời lần đầu, bằng hành động (ngồi yên), không bằng lý lẽ | — |

### Ranh với các luật khác

- **Không phá "phần cần giấu":** câu hiện sinh nói về giá trị và sự tồn tại của chính anh, không gọi tên tình cảm với Nhi hay Diệp Anh.
- **Không gắn nhãn tâm lý** (mục *Các rule khác*). Tên bệnh vẫn để đến cuối Phần 1.
- **Không thay chi tiết bằng câu hỏi lớn:** mỗi câu hiện sinh phải đứng trên một chi tiết cụ thể vừa xảy ra trong cảnh (vòi nước, cái cốc rung, số dư hai tài khoản, ô đỏ trên màn hình).

### Ví dụ

| Tránh | Dùng |
| --- | --- |
| *Cuộc sống của mình thật vô nghĩa.* | *Ba chấm trắng vẫn quay. Không ai chấm thì nó có đang quay không.* |
| *Mình cảm thấy trống rỗng sau chiến thắng.* | Anh tắt màn hình. Ô cuối cùng đã xanh. *Rồi sao nữa.* |
| *Mình luôn nghĩ mình là kẻ thất bại vì bố mẹ.* (giải thích nguyên nhân) | *Chín điểm. Một điểm kia mất ở câu nào.* Anh nghe câu ấy bằng giọng mình |
| *Anh cảm thấy bất an khi không có việc gì làm.* | Chủ nhật. Không còn ô đỏ nào. *Không còn gì để sửa. Thế thì mình là kẻ thất bại.* Anh mở laptop |
| Lời kể vòng vo để tránh chữ "khuyết" | *Khuyết: không có giải quốc gia. Sửa: thi.* |
| Một đoạn dài tự phân tích vì sao mình chạy | Anh mở file mới, gõ tiêu đề cho việc của tuần sau, dù tuần này chưa hết |

## Lời kể biểu cảm có chủ đích (chốt 18/10)

Người kể đi theo giọng nghĩ của Thuyên được phép **ngập ngừng như người nói**: dò, tự sửa, bỏ lửng, rồi nhận ra. Nhưng **mỗi lần ngập ngừng phải dẫn cảm xúc người đọc đi đâu đó**. Người kể dẫn người đọc bằng phương thức biểu cảm (nhịp câu, câu hỏi, chỗ ngắt, chỗ nhận ra), không bằng lời bình. Đây vẫn là giọng của Thuyên (gián tiếp tự do), không phải người kể đứng ngoài thương hại: những câu kiểu "tội nghiệp cậu bé" là cấm.

Chi tiết và cơ sở: `claude/sua-doi/M-dien-bien-cam-xuc.md`, mục 2.3.

### Sáu thao tác

| Thao tác | Dạng | Việc với người đọc |
| --- | --- | --- |
| **Dò** | *Liệu…? / Hay là…? / Có phải…?* | Mở một câu hỏi, kéo người đọc đoán cùng anh |
| **Lật** | *À. / À đúng rồi. / Hóa ra…* | Khoảnh khắc nhận ra. Thường là nhận ra **sai**, để người đọc thấy rõ hơn anh và đau thay anh |
| **Tự sửa** | *Không. Không phải thế. Mà là…* | Đi đến sát sự thật rồi lùi lại, hoặc vượt qua nó |
| **Bỏ lửng** | *Nhất huyện thì chắc…* | Chỗ anh không dám nghĩ hết; người đọc tự điền vế còn thiếu |
| **Dồn** | Liệt kê ngắn, nhịp nhanh dần | Tăng áp: đếm roi, đếm F5, đếm trang |
| **Rơi** | Một câu hai, ba chữ sau một câu dài | Đập; chốt cảm xúc mà không gọi tên |

### Luật

1. **Dò thì phải lật hoặc bỏ lửng có chủ đích**, trong vòng vài câu. Không có câu hỏi treo vô cớ.
2. **Cú lật đắt nhất là cú lật sai:** anh rút ra một bài học méo, người đọc thấy chỗ méo. Hệ giá trị của anh được dựng ngay trên trang bằng những cú lật sai.
3. **Mỗi mảnh đỉnh có một cụm dò → lật.** Không quá hai dấu chấm lửng trong một đoạn.
4. **Không ngập ngừng ở chỗ không có cảm xúc để dẫn** (tả cảnh, chuyển thời gian, kể việc vặt).
5. **Trong mảnh R8 không ngập ngừng** (chốt 28/10). Sổ cái không dò, không lật: chỉ đếm và ghi. Cụm dò → lật để sau mảnh R8, ở đêm hoặc ở khung.

### Hình thức theo giai đoạn

| Giai đoạn | Dò | Lật | Ví dụ hướng (không dùng nguyên văn) |
| --- | --- | --- | --- |
| Mầm non – lớp 5 | Nhiều, ngây thơ: *Hay là…? Liệu bố có…?* | *À. Hóa ra…*, kiểu trẻ con, thường sai | *Hay là bố không thích sao. À. Hóa ra sách nào thi không ra thì là sách xấu.* |
| Lớp 6–9 | Thành lý luận: *Nếu vì…, thì…* | Lạnh hơn, kèm kết luận thành quy tắc | *À. Không phải sai. Là chọn sai lúc.* |
| Lớp 10–12 | Ít dò; tự sửa nhiều | Rất ngắn: *À.* | *Không. Không phải ghen. Là chưa đủ.* |
| Đại học → lab | Gần như không dò; anh nghĩ mình đã biết hết | Cú lật biến mất. Đó là triệu chứng | — |
| Đổ vỡ | Dò quay lại, dồn dập | Không có *Hóa ra* nào đến | *Liệu từ đầu… Hay là… Không.* |

### Ví dụ (lớp 6, sau một trận đòn vì cãi)

> Đêm đó anh nằm sấp vì không nằm ngửa được, và lật chuyện ban chiều như lật một bài toán không có đáp án ở cuối sách. Liệu có phải vì con chín? Không. Chín là cao nhất, cô đã đọc to trước lớp. Hay là vì câu nói. Nhưng câu ấy sai ở đâu, mẹ có làm được bài ấy thật đâu… À. Hóa ra không phải sai. Là hỗn. Đúng mà nói ra thì thành hỗn, và hỗn thì bị đánh, đúng hay sai cũng thế.

Dò → tự sửa → dò → bỏ lửng → lật sai. Người đọc thấy bài học méo ("đúng mà nói ra thì thành hỗn"); anh thì mang nó đi tiếp.

### Ranh với các luật khác

- **Với luật vênh:** vênh nói về cách kể *sự việc* (vẫn khô). Ngập ngừng là chuyển động của *nội tâm*, nằm trong phần gián tiếp tự do. Một đoạn có thể khô ở sự việc và ngập ngừng ở chỗ nghĩ.
- **Với mật độ tự thoại:** các thao tác này nằm trong gián tiếp tự do, không tính vào trần câu in nghiêng.
- **Với thuật ngữ:** ngập ngừng vẫn bằng chữ của Thuyên ở đúng tuổi; không thuật ngữ tâm lý, triết học.
- **Chỉ áp cho POV Thuyên.** Các POV khác ngập ngừng theo giọng riêng (Nhi gọi tên cảm giác, Khải không ngập ngừng).

### Văn phong trần tục của tự thoại (chốt 19/10)

**Gốc:** bài văn *Ước mơ của em* (lớp 9) là lần đầu giọng nội tâm của Thuyên thành hình trọn vẹn. Từ đó lời kể mượn dần cấu trúc ấy (giọng nhân vật nhuộm lời kể).

**Đặc điểm:**
- câu khẳng định, không rào, không than;
- từ của nhà trường, phẳng, hơi trừu tượng (*công nhận, nuôi dưỡng, kết quả, hiệu quả*);
- chuỗi ba bước: tiền đề chung → trường hợp của mình → hệ quả;
- tự đặt mình vào như một dữ kiện;
- kết bằng *Vì vậy* + một quyết định ngược với điều mình muốn (cú rơi);
- không tính từ cảm xúc; nỗi đau nằm trong logic.

**Ghép với sáu thao tác: chứng minh bằng loại trừ.**
1. **Dò** đưa giả thuyết: *Liệu…? Có thể…*
2. **Tự sửa** loại từng giả thuyết bằng dữ kiện, giọng phẳng: *Không, chắc chắn là…*
3. **Vì vậy** chốt một quy tắc lệch tiêu cực: cú lật sai mang hình dạng logic.

> *Liệu mạ muốn con mười. Có thể. Nhưng có mười thì vẫn còn một chỗ trống khác. Không, chắc chắn không phải điểm. Thứ mạ muốn là cái chỗ trống. Vì vậy, đi bao nhiêu cũng không đến.*

> *Liệu khán giả muốn nghe chuyện thật. Có thể. Không, chắc chắn là không: chuyện thật không có tiếng vỗ tay. Vì vậy, anh gõ lại câu ấy.*

**Lộ trình theo tuổi:**

| Giai đoạn | Dạng |
| --- | --- |
| Tiểu học | Dò ngây thơ (*Hay là…*), lật kiểu trẻ con. Chưa có *Vì vậy* |
| Lớp 6–7 | Lý luận kiểu bài toán: *Nếu… thì…* |
| Lớp 9 | Bài văn: lần đầu đủ ba bước và có *Vì vậy* |
| Lớp 10 → đại học | Dò ngắn lại, tự sửa nhanh, *Vì vậy* đến sớm |
| Lab | Rút thành danh sách lạnh, cột *vì sao* |
| Đáy | Gãy: dò liên tục (*Liệu… Có thể… Không…*), không đi đến *Vì vậy*; vòng lặp không có điều kiện dừng |

**Luật:**
- Chỉ dùng ở mắt xích 5 (tự hỏi, suy diễn) và 7 (câu hỏi lớn). Cảnh, cảm giác, giác quan vẫn viết như cũ.
- Mỗi chương **nhiều nhất một chuỗi đi đủ đến *Vì vậy***. Các lần khác bỏ *Vì vậy*, kết bằng một hành động.
- Người kể mượn từ của anh, không bình luận.
- Trớ trêu với khung hiện tại: thầy Bình dặn "Đừng viết như báo cáo"; giọng thật của anh chính là một bản báo cáo.
- Rủi ro: dùng dày thì thành giọng răn dạy. Giữ cú rơi hiếm để nó còn nặng.

## Cảm xúc chuyển dạng, không gọi tên (chốt 18/10)

**Sửa 26–28/10:** ở POV Thuyên, luật gọi tên cảm xúc nay theo `docs/rules/goi-ten-cam-xuc.md` (thay câu luật đầu mục này; QK.T quãng 1 xem §4a của file ấy).

**Luật:** cảm xúc của Thuyên không bao giờ biến mất khỏi trang, và không bao giờ được người kể gọi tên. Nó **chuyển dạng** theo tuổi: càng lớn càng nhiều lớp, và khoảng cách giữa cái anh cảm thấy với cái anh làm ra càng xa. Đây không phải cơ chế bớt cảm xúc, mà là cảm xúc phức tạp dần theo quá trình trưởng thành của một con người. Áp dụng xuyên suốt truyện, mọi chương và đoạn POV Thuyên, từ mầm non đến Phần 2. POV khác Thuyên dùng kỹ thuật này và được gọi tên thêm (xem *Ranh*).

Người kể phải làm người đọc **cảm được** cái buồn, cái tủi trong lời kể, mà không nêu tên nó.

Chi tiết và cơ sở: `claude/sua-doi/M-dien-bien-cam-xuc.md`, mục 2.2.

### Chuỗi thay cho tên gọi

- **Không viết:** *Anh tủi thân. Anh khóc.*
- **Viết:** hành vi hoặc cơ thể → anh **đoán nguyên nhân**, bằng giọng anh, có thể đoán lệch → anh **xử lý** cái cảm ấy (gạt đi, gọi nó bằng tên khác, chuyển sang việc khác) → dấu vết.
- **Anh được đoán nguyên nhân, không gọi tên cảm xúc.** Người kể không xác nhận cái đoán ấy đúng hay sai.

Ví dụ:

> Anh khóc. Chắc là vì không ai đứng về phía mình, anh đoán thế, rồi thấy cái đoán ấy nghe như một đứa trẻ đi mách, nên thôi không đoán nữa. Anh lật gối sang mặt khô.

### Chuyển dạng theo tuổi

| Giai đoạn | Cảm xúc đi ra bằng | Anh xử lý bằng | Độ phức tạp |
| --- | --- | --- | --- |
| Mầm non – lớp 5 | Tràn thẳng ra cơ thể: khóc, chạy, nắm chặt, trốn | Đoán nguyên nhân kiểu trẻ con, rồi ngủ thiếp đi | Một lớp |
| Lớp 6–9 | Cơ thể và lời cãi | Lý luận hóa: biến thành bài toán để gạt đi | Hai lớp cùng lúc (vừa cay vừa sướng) |
| Lớp 10–12 | Khinh, học, thi, chữ "khuyết" | Gọi bằng tên khác: buồn thành "mệt", ghen thành "chưa đủ", nhục thành "một khuyết" | Nhiều lớp, lẫn vào nhau (mặt cười theo câu nhục) |
| Đại học → lab | Vai trò, kiểm soát, nhịp làm việc | Không chạm tới; chỉ lộ qua cơ thể và quyết định | Lớp chồng lớp, xa hành vi nhất |
| Đổ vỡ | Các lớp bong ra; cái thô quay lại | Không còn cách xử lý nào chạy | Thô như hồi bé, nhưng không còn ngây thơ. Register R8, R7 (`registers.md`) |
| Hồi phục | Học nói ra bằng thoại (với bác sĩ, Vũ, bố) | — | Anh được tự nói tên trong **thoại**; lời kể vẫn không gọi tên |

### Màu sắc của lời kể

Lời kể được **nhuộm** bởi trạng thái của anh. Người đọc cảm được cái anh cảm qua màu của câu chữ, trước cả khi hiểu ra.

1. **Nhuộm chữ:** lời kể mượn chữ và nhịp của trạng thái anh đang ở trong. Lúc co lại thì động từ nhỏ đi (co, nép, lùi, rúc); lúc mong thì câu hướng ra xa; lúc khinh thì câu chính xác, đo đếm.
2. **Bảng màu giác quan** (bảng cho người viết, không đưa tên trạng thái vào truyện):

| Trạng thái | Ánh sáng, nhiệt độ, âm thanh, vật | Nhịp câu |
| --- | --- | --- |
| Mong | Ánh sáng ở xa; âm thanh đang tới (tiếng xe đầu ngõ) | Câu hướng tới, có chỗ chờ |
| Tủi | Ẩm, nhỏ, gần; tiếng khẽ (gối ẩm, nước nhỏ giọt, góc phòng) | Câu co lại, động từ nhỏ |
| Cay | Nóng, khô, sắc cạnh (nắng gắt, mép giấy cứa tay, sạn trong cơm) | Câu cứng, cụt |
| Nhục | Ánh sáng quá rõ, bị nhìn, phản chiếu (kính tủ, đèn trần, ô camera) | Câu dừng lâu trên một chi tiết |
| Sợ | Âm thanh phóng to, thời gian chậm (tiếng quạt, nồi cơm tách) | Câu ngắn, đếm |
| Rỗng | Không gian rộng, vang, đều (sân vắng, quạt trần, hành lang) | Câu đều, lặp |
| Ấm | Mùi, vật chạm tay (dầu gió, lạc rang, chăn) | Câu mềm, dài vừa |
| Khinh | Lạnh, chính xác, đo đếm (con số, khoảng cách, cỡ chữ) | Câu gọn, liệt kê |
| Hằn (thêm 28/10) | Đồ tiện nghi đặt ngang hàng với vật gây đau (ti vi, tủ lạnh, cái roi trên cái đinh); chữ của người khác lặp lại | Liệt kê sổ cái (R8), hoặc một khối dồn không xuống dòng (R9) |

   **Kênh theo loại ký ức (thêm 28/10, `registers.md` §2.5):**

   | Loại ký ức | Kênh mở cửa | Cách kể |
   | --- | --- | --- |
   | Đau (đòn, mắng, bị phủ nhận) | Âm thanh, xúc giác: tiếng rút thắt lưng, tiếng roi rời cái đinh, tiếng kẻng xe rác, tiếng *tách*, vỏ gối | Bật vào hiện tại qua một tác nhân; mảnh vụn, không mốc thời gian, như đang xảy ra |
   | Ấm, mong (Sao Hôm, đĩa lạc, đêm quê) | Mùi, ánh sáng ở xa: lạc rang, dầu gió, khói đèn dầu, một chấm sáng | Kể có thời gian, nơi chốn, thành chuyện |

   Nhiều trạng thái cùng lúc thì ghép màu. Ví dụ mặt cười theo câu "cục đất": ấm cộng ánh sáng quá rõ.
3. **Cùng một vật, đổi màu theo tâm trạng:** tủ kính lúc mong thì sáng như cửa hiệu; lúc nhục thì lạnh như quầy thuốc; lúc khinh thì chỉ còn là mấy tấm kính và một cái khóa. Vật lặp lại là thước đo cảm xúc.
4. **Nhịp câu là nhiệt độ:** nóng thì cụt; lạnh thì đều; tràn thì một câu dài không ngắt.
5. **Chọn chi tiết, không bẻ thế giới:** màu nằm ở việc chọn chi tiết nào để kể và kể bằng chữ nào, không phải đổi thời tiết theo tâm trạng (không cho trời mưa vì anh buồn).

### Ranh với các luật khác

- **Cấm gọi tên trong lời kể POV Thuyên:** tủi, buồn, vui, ghen, nhục, sợ, cô đơn, hạnh phúc, tự hào… Không thay bằng tính từ màu ("buồn bã", "u ám", "nặng nề"). Ngoại lệ duy nhất: **tiêu đề** interlude của Thuyên là tên một cảm xúc (Chương 0: *Cô tịch*); lời kể bên trong vẫn không gọi tên. Luật này áp cả cho R8 và R9.
- **Phủ định của chính anh được giữ:** câu như "Không buồn." là hành vi gạt đi của anh trong giọng gián tiếp tự do, không phải người kể gọi tên.
- **Thoại được nói tên:** người khác nói về anh; anh nói ở phần hồi phục ("bố sợ").
- **Với lời kể biểu cảm có chủ đích:** dò và lật dẫn tới chỗ anh đoán nguyên nhân, không dẫn tới tên cảm xúc.
- **Vẫn cấm thuật ngữ tâm lý.**
- **POV khác Thuyên** (Nhi, Phong, Diệp Anh, Khải và mọi interlude, chốt 18/10): dùng **cả hai**, kỹ thuật chuyển dạng và màu lời kể ở trên, **và** được gọi tên cảm xúc. Điều kiện:
  - gọi tên vẫn đi cùng chi tiết cụ thể, không thay chi tiết bằng tính từ (mục *Nguyên tắc chung*);
  - màu lời kể theo giọng riêng của POV đó: Nhi gọi tên thẳng, giọng ghi chú điện thoại; Phong nhìn qua ống kính, màu là ánh sáng và hạt phim; Diệp Anh giữ hình ảnh, gọi tên rồi tự sửa cho đẹp; Khải gần như không gọi tên, màu lạnh, liệt kê;
  - phần cần giấu vẫn giữ (cảm xúc nhân vật POV chưa tự nhận ra thì chưa gọi tên).

### Dịu dàng không thừa nhận (với Nhi, v2, chốt 19/10)

Kho hành động cụ thể nằm ở `docs/brief-tinh-cam-thuyen-nhi.md`, mục 5d.

- **Độc miệng là mặc định, dịu dàng là hành động.** Anh chê, cợt nhả, nói móc; sự chăm sóc nằm ở việc tay anh làm, không nằm ở lời.
- **Không bao giờ gọi tên việc mình làm.** Mỗi cử chỉ đi kèm một câu che: "tiện tay", "tiện đường", "thừa", "đặt nhầm", hoặc một câu độc miệng ("Ăn đi rồi chữa. Đói thì viết như người say.").
- **Giọng chỉ đổi khi cô dỗi hoặc buồn:** câu ngắn lại, chữ "kid" mềm đi, không đùa. Hết dỗi là độc miệng lại ngay.
- **Đọc trước nhu cầu:** dùng kỹ năng đọc người theo chiều ngược với ở lab. Anh làm trước khi cô kịp nói, nên phần lớn cô không thấy.
- **Ai thấy:** phần lớn là hội đồng, Vũ, Linh và người đọc. Nhi thấy ít hơn họ. Người kể POV Thuyên chỉ tả hành động, không giải thích động cơ (phần cần giấu: cảm xúc của Thuyên với Nhi).
- **Tỉ lệ:** khoảng bốn phần độc miệng, một phần dịu dàng.
- **Anh chê cô được, người khác thì không.** Trước người lạ, anh che chở cô bằng hành động, không bằng lời.
- **Gương với Diệp Anh:** với Diệp Anh, sự chu đáo của anh đúng chuẩn, hợp lý (đặt xe vì an toàn, đúng giờ). Với Nhi, nó là đọc trước rồi giấu đi.
- **Biến chất (giai đoạn 2):** khi anh bắt đầu tính toán, cử chỉ thành có chủ đích, câu đùa thưa dần. Nhi cảm được trước tiên.

## Nhịp kể

Hồi tưởng và nghĩ về tương lai được phép đi nhanh. Mạch kể hiện tại thì không bao giờ được rush.

### Vì sao hiện tại không được rush

Mạch hiện tại gánh những việc mà một đoạn tóm tắt không gánh nổi:

- **Cảm xúc nhân vật:** cảm xúc cần thời gian trên trang, qua phản ứng cơ thể, khoảng lặng, việc vặt làm trong lúc đang nghĩ chuyện khác.
- **Sự ngộ nhận:** nhân vật đọc sai nhau, người đọc phải đứng đủ lâu trong cái sai đó mới thấy đau khi nó vỡ.
- **Điều hướng người đọc:** cài nghi ngờ, đánh lạc hướng, cho người đọc biết nhiều hơn hoặc ít hơn nhân vật.
- **Liên kết thông tin:** gọi lại chi tiết từ quá khứ và từ các chương trước, nối các mảng đã rải rác.

Một sự kiện ở hiện tại mà chỉ được kể qua một câu tóm tắt là một sự kiện bị lãng phí.

### Được phép đi nhanh

- **Hồi tưởng:** nhanh hơn hiện tại, nhưng không phải tóm tắt. Chuẩn là pace của chương 2–7 (quá khứ Thuyên), áp dụng cho mọi hồi tưởng, kể cả quá khứ Nhi:
  - Mỗi chương hoặc interlude phủ một giai đoạn (vài tháng đến hai năm), khoảng 2.000–3.000 chữ.
  - Chia thành nhiều mảnh ngắn (khoảng 6–15 mảnh), mỗi mảnh là một cảnh có giác quan, có thoại hoặc có hành động cụ thể. Giữa các mảnh được nhảy thời gian, nối bằng vài câu tóm tắt.
  - Khung hiện tại mở và đóng, một hai đoạn, nối ký ức với điều đang xảy ra.
  - Chọn mảnh đắt, cắt ngang khi mảnh đã làm xong việc. Quá khứ là nguyên liệu, không phải sân khấu chính.
- **Nghĩ về tương lai:** kế hoạch, dự định, nỗi lo, vài dòng là đủ.
- **Chuyển cảnh trong hiện tại:** được nhảy qua thời gian chết ("Ba tuần sau…"), nhưng mỗi cảnh hiện tại đã mở ra thì phải được viết trọn.

### Tỷ lệ dung lượng

- Phần drama ở lab (từ sau summit đến sụp đổ) phải **dài hơn toàn bộ phần quá khứ** của Thuyên (chương 2–7). Quá khứ dựng nền, lab mới là câu chuyện.
- Quá khứ Thuyên (chương 2–7) khoảng 16.000 chữ. Riêng các chương lab, không tính interlude của Nhi, phải vượt con số này.
- Các interlude quá khứ của Nhi đi cùng pace với quá khứ Thuyên, nhưng ít giai đoạn hơn (khoảng 4 interlude), nên tổng dung lượng ngắn hơn quá khứ Thuyên.
- Khi phải cắt, cắt hồi tưởng trước, cắt hiện tại sau cùng.

## Tiết lộ thông tin và kể quá khứ

**Quy ước tên và mốc:** chương mạch chính đánh số, tên đồ vật hoặc âm thanh. Interlude không đánh số, tên là một màu (POV Nhi), mở bằng một dòng trích ghi chú trong điện thoại cô; interlude POV Diệp Anh mang tên một món trang phục cô mặc trong interlude (Măng tô, Váy cổ thuyền, Áo cử nhân, Áo dài); interlude POV anh trai mang tên một sắc độ trắng – đen (*Màu xám*, *Đen*). Màu sắc có sắc độ (hồng, xanh, vàng…) là của Nhi; trắng, xám, đen là của Khải; tên Nhi không dùng trắng, xám, đen. Không gắn tên nhân vật lên đầu chương. Mỗi chương và interlude có một dòng ngày ở đầu.

**Chương 0, interlude của Thuyên** (chốt 19/10): vừa là chương vừa là interlude.
- **Tên là một cảm xúc** (chương 0: *Cô tịch*). Đây là chỗ duy nhất tên một cảm xúc của Thuyên được nói thẳng, và nó chỉ nằm ở tiêu đề. Lời kể bên trong vẫn không gọi tên, như mọi chương POV Thuyên. Một người sống bằng lý trí: cái tên chỉ được đặt ở ngoài, trên đầu trang.
- **Là chương:** POV Thuyên. Tiêu đề `# Chương 0: Cô tịch`. Số 0 không chiếm thứ tự; site hiện như chương đặc biệt (cách đã làm cho 3107), nhãn "Chương 0".
- **Là interlude:** đứng ngoài dòng thời gian của mạch chính (25/7/2027), và mở bằng một dòng trích như interlude của Nhi. Của Thuyên là câu anh viết dở, trong khối `:::note`: *Từ nhỏ em đã…*.
- **Vòng khép:** cảnh ở chương 0 lặp lại với đủ ngữ cảnh ở chương *Nước lạnh* của phần đổ vỡ (chương mạch chính, tên đồ vật như thường).
- Hiện chỉ có một interlude Thuyên. Thêm cái nào nữa thì theo đúng ba điều trên: tên là một cảm xúc, đứng ngoài dòng thời gian, mở bằng một câu anh viết dở.

**Interlude POV Phong** (chốt 15/10): tên một loại phim chụp ảnh (ví dụ *Portra 400*), vì cậu và Nhi cùng chụp phim.

**Interlude nhiều góc nhìn** (chốt 15/10): một interlude kể bằng hai góc nhìn trở lên của các nhân vật ngoài Thuyên thì **gộp quy ước đặt tên của từng người** thành một tên, mỗi người góp một phần, đọc lên vẫn tự nhiên như một cụm người trong nghề vẫn nói; không đặt hai tên cạnh nhau một cách thô. Ví dụ Phong (phim) + Nhi (màu theo cách chỉnh màu ảnh, color grading): *Quầng cam Cinestill*: phim CineStill 800T làm mỗi ngọn đèn có một quầng sáng, quầng ấy màu cam trên nền đêm xanh lam. Tên phải là một hình ảnh có thật trong cảnh, như mọi interlude khác. Màu ghép vẫn theo luật của Nhi (có sắc độ, không trắng, xám, đen) và nên tránh màu đã dùng nhiều (hồng). Trong interlude, đổi góc nhìn bằng ngắt đoạn `---`; mỗi đoạn giữ trọn một góc nhìn, không trộn trong cùng đoạn. Chương mạch chính vẫn một góc nhìn (Thuyên); đêm cần cả Thuyên cùng kể thì dùng chương chỉ có số (như *3107*).

### Mục đích của từng loại chương ngoài mạch chính

| Loại | Mục đích |
| --- | --- |
| Chương quá khứ Thuyên (2–7) | Tương phản cảm xúc trước đỉnh summit, và giảm công kể về sau |
| Interlude quá khứ Nhi | Cùng mục đích với chương quá khứ Thuyên: tương phản cảm xúc (quá khứ tối đặt cạnh hiện tại sáng của cô), và giảm công kể về sau. Cùng pace, cùng cách cài chi tiết để gọi lại |
| Interlude cái bẫy (POV anh trai) | Chỉ một việc: tiết lộ cách Thuyên bị đánh bại. Không dùng để kể quá khứ hay nội tâm của anh trai |

Quá khứ của Thuyên được kể trọn một lần ở chương 2–7. Các chương sau chỉ gọi lại bằng một chi tiết, không kể lại. Quá khứ của Nhi kể sau summit, xen giữa các chương lab (xem mục Trục đối xứng trong tài liệu mạch truyện).

### Hai mục đích của chương 2–7

1. **Tương phản cảm xúc:** người đọc đi qua một đoạn dài u tối để summit (chương 8) bật sáng, tin rằng chuỗi đau khổ đã kết thúc. Sau đó mọi thứ sụp đổ dần qua nhiều đợt lên xuống.
2. **Giảm công kể về sau:** các chương sau chỉ thêm mắm muối cho phần tự sự đầu tiên.

### Cách kể

- **Khung nhẹ ở hiện tại:** tuần soạn bài phát biểu cho summit. Một hai đoạn đầu và cuối mỗi chương, mỗi bản nháp kéo ra một mảng ký ức. Khung cũng là chỗ duy nhất của khối R9 ở quãng 1: bản nháp anh gõ rồi xóa (chốt 28/10, `registers.md` §2.2).
- **Kể đầy đủ:** tuổi thơ, thích nghi, cấp 3, Vy, đêm ghế đá, câu nói, cú tát, đáy kép, chọn ngành.
- **Chỉ giữ lại hai thứ:** ẩn ý câu nói với Vy (không giải thích, để người đọc tự thấy) và tên bệnh (chỉ tả hành vi, chẩn đoán ở cuối Phần 1).
- **Cài chi tiết để gọi lại:** cụ thể, giác quan, dễ nhớ. Kho chi tiết nằm trong tài liệu mạch truyện.
- **Cách gọi lại:** một dòng là đủ. Ví dụ ở lab nghe sếp nói một câu thiếu một bước: *"Câu này có lỗ. Như câu của bố."*

### Các rule khác

- Thành tích lộ gián tiếp qua ngoại cảnh: tin nhắn group, đồ vật, lời người khác.
- Không gắn nhãn tính cách (không MBTI, không thuật ngữ tâm lý) trong lời kể.
- Khả năng đọc người của Thuyên thể hiện qua chi tiết anh để ý và kết luận anh rút ra, có thể đúng hoặc sai.

## Viết chuyên môn cho người đọc phổ thông

Người đọc không cần hiểu chuyên môn, họ chỉ cần hiểu ai được, ai mất, ai bị phản bội.

- **Quy về câu hỏi cảm xúc:** mỗi cảnh chuyên môn phải trả lời được: quan hệ giữa ai với ai vừa thay đổi?
- **Dịch sang hình ảnh đời thường:** "Hàng tốt nhưng mang ra bán nhầm chợ. Bán rau muống ở chợ hoa thì ai mua."
- **Nhân vật cầu nối:** nữ chính ở Phần 1 và Vũ Béo hỏi đúng câu người đọc muốn hỏi ("nói tiếng người đi mày").
- **Năng lực qua hậu quả:** phòng họp im lặng, sếp tránh ánh mắt, tin nhắn "anh làm thế nào vậy". Không tả thao tác.
- **Quyền lực là chuyện văn phòng:** ai ngồi cạnh sếp, ai được CC email, ai được mời ăn tối, ai bị loại khỏi group chat.
- **Thuật ngữ chỉ là gia vị:** hiểu được qua ngữ cảnh và thái độ. Ví dụ: "Họ đem model đi bán B2C, đm, tao nói từ hồi tháng ba rồi."
- **Xen cảnh thở:** sau chương căng thẳng là sân bóng, vườn, bữa cơm.
- **Tham khảo:** The Social Network, Succession, Start-Up. Nhiều chuyên môn nhưng người xem luôn biết ai đang đau.

## Đấu trí và trinh thám (từ Phần 1, sau khi Thuyên vào lab)

Không phải kiểu nhân vật tính trước mười bước như anime. Đấu trí ở đây là hai người đọc nhau bằng thông tin không đầy đủ.

- **Công bằng với người đọc:** mọi manh mối dùng để lật bài phải xuất hiện trên trang trước đó, đặt giữa chuyện thường ngày để người đọc lướt qua (bún và bánh mì). Đến lúc lật bài, người đọc giở lại là thấy.
- **Chứng cứ đời thường:** lịch sử chỉnh sửa, giờ giấc, ai cc ai, ai ngồi cạnh ai, một câu lỡ lời, hai lời kể không khớp. Không có đọc vị thần sầu.
- **Ai cũng có thể sai:** suy luận là giả thuyết, cần kiểm chứng, có lần đoán nhầm. Kế hoạch tối đa một hai bước. Có may rủi, có cảm xúc làm hỏng việc.
- **Không POV cho đối thủ:** anh trai Nhi chỉ hiện qua mắt Thuyên và Nhi, nên người đọc luôn đi sau anh ta một bước. Ngoại lệ duy nhất: interlude cái bẫy ngay sau chương lật bài, giọng lạnh, ngắn, đóng vai phần giải đáp trinh thám, không phơi hết động cơ.
- **Đỉnh trước cú rơi:** chương đỉnh (đầu production) viết như thể Thuyên đã bất bại, không có đợt xuống báo trước. Cú rơi gọn trong một chương.
- **Đấu trí dưới lớp chuyện phiếm:** cả hai bên đều nói nhiều, thân thiện, kể chuyện vụn để giữ lõi. Điều quan trọng nằm ở thứ không được nói và câu hỏi đặt sai chỗ.
- **Nguyên lý cốt lõi:** người nói nhiều mà giữ được lõi là người giỏi. Nhưng chuyện vụn cũng được may đo theo người nghe, nên ai đứng đủ cao để gom lời từ nhiều phía sẽ thấy chỗ lệch.
- **Mỗi cảnh đấu trí phải đổi cán cân:** sau cảnh, ai biết thêm điều gì, ai lộ thêm điều gì.
- **Đấu trí một chiều trước khi lật bài:** Thuyên không biết mình đang bị truy. Kịch tính đến từ dramatic irony: người đọc thấy những câu hỏi đặt sai chỗ, Thuyên đọc chúng thành chuyện bình thường. Thuyên chỉ đề phòng người làm việc trực tiếp với mình, vì anh đang thích nghi để sống sót chứ không thao túng để thắng.

## Cảnh thân mật

- Viết kín, dừng ở ngưỡng cửa. Không mô tả tình dục. Truyện đăng trên nền tảng phổ thông, không gắn nhãn 18+.
- Giữ lại cảm xúc và chi tiết người: sự vụng về, ngại ngùng của Thuyên, một câu nói, một đồ vật trong phòng. Sáng hôm sau quan trọng hơn đêm hôm trước.

### Kỹ thuật trinh thám áp dụng cho mạch lab

Tham khảo: Columbo (trinh thám đảo ngược, "howcatchem"), nguyên tắc quả bom dưới gầm bàn của Hitchcock, kỹ thuật giấu manh mối của Kurt Steel và S.S. Van Dine, Succession (quyền lực văn phòng). Tránh lối tính trước mười bước kiểu anime.

**Cấu trúc hai mặt trận:**
- **Mặt trận sếp và đồng nghiệp = hồi hộp (suspense).** Người đọc biết rõ mối nguy, như quả bom đã thấy dưới gầm bàn: ai ghen, ai đang gom công, phiên bản nào Thuyên kể cho ai. Mỗi lần các phe ngồi gần nhau, người đọc nín thở xem lời kể có bị chạm nhau không. Thuyên thắng ở mặt trận này.
- **Mặt trận anh trai = bất ngờ (surprise).** Manh mối có trên trang nhưng bị giấu. Người đọc chỉ thấy một cảm giác lấn cấn mơ hồ, không ráp được, cho đến chương lật bài. Interlude cái bẫy là lúc người đọc giở lại và thấy hết.
- Hai mặt trận che cho nhau: mặt trận ồn ào thu hút sự chú ý, mặt trận im lặng đi ngầm bên dưới.

**Giấu manh mối trong tầm mắt:**
- **Đặt manh mối rồi lập tức cắt sang chuyện gây chú ý:** ngay câu sau là một biến cố, một câu đùa, một cuộc gọi. Người đọc lướt qua trước khi kịp xử lý.
- **Manh mối nằm trong danh sách:** người đọc nhớ được khoảng ba thứ. Manh mối là món thứ tư, bên cạnh một món gây chú ý hơn.
- **Đặt người lặng lẽ cạnh người ồn ào:** anh trai luôn xuất hiện bên cạnh một nhân vật ồn hơn (sếp đang khoe, một đồng nghiệp đang cãi, Diệp Anh đang tỏa sáng).
- **Giấu manh mối trong cảnh thở và fan service:** câu hỏi bâng quơ của anh trai nằm giữa một bữa ăn vui, giữa một khoảnh khắc Thuyên – Nhi, nơi người đọc đang bận cảm chứ không bận nghi.
- **Ít chữ cho manh mối:** mô tả manh mối càng gọn càng tốt. Bớt một tính từ là bớt một dấu hiệu.
- **Manh mối phải đọc được theo hai nghĩa:** lần đầu là chuyện thường, lần hai là bằng chứng (anh trai hỏi giờ dạy IELTS là người anh lo cho em gái, rồi mới là kiểm chứng mốc giờ).

**Nhịp đuổi bắt (kiểu Columbo, nhìn từ phía bị đuổi):** phát hiện một chỗ lệch, Thuyên vá, chính việc vá tạo ra chỗ lệch mới. Mỗi vòng, Thuyên tưởng mình chặt hơn, thực ra hở hơn.

**Văn phong:**
- **Suy luận của Thuyên là giả thuyết:** "có khi nào…", có xác suất, có lúc sai. Không độc thoại dài giải thích kế hoạch.
- **Trí tuệ của anh trai thể hiện qua kết quả,** không qua lời giải thích, cho đến interlude cái bẫy. Trước đó, người đọc chỉ thấy anh ta hỏi đúng chỗ, im đúng lúc.
- **Cảnh đấu trí ngắn câu khi căng, dài câu khi đang ru:** chuyện phiếm thì thoải mái, lan man; khoảnh khắc chạm vào chỗ lệch thì câu cụt, một dòng một ý.
- **Chương lật bài:** nhịp nhanh, cắt cảnh gọn, không cho Thuyên thời gian vá. Giọng không bình luận, để sự việc tự nặng. Từ chương lật bài trở đi, lời kể được xuống R8 (`registers.md`, ô GÃY).
- **Interlude cái bẫy (Màu xám: phát hiện; Đen: hành động):** giọng lạnh, gần như liệt kê, câu ngắn. Mỗi manh mối một đoạn, gọi lại đúng chi tiết người đọc đã thấy, không thêm chi tiết mới (không gian lận).
- **Mỗi lần lật bài trả lời một câu hỏi và mở một câu hỏi mới** (lật bài Phần 1 mở câu hỏi: vì sao anh trai đổ lên Nhi?).

## Cảnh nóng và fan service

Truyện có cảnh thân mật và fan service, gắn nhãn 18+ khi đăng. Mục tiêu là kích thích người đọc, nhưng cảnh nào cũng phải làm được việc của một cảnh truyện: đổi quan hệ, lộ nhân vật.

### Giới hạn cứng

- **Không mô tả hành vi quan hệ tình dục.** Đây là giới hạn duy nhất về mức độ. Mọi thứ trước đó và sau đó được viết gợi dục: ánh nhìn, đụng chạm, hôn, cởi áo, hơi thở, nhiệt độ da, lời nói khẽ, những giây ngại ngùng buồn cười. Đến ngưỡng quan hệ thì cắt cảnh (xuống dòng, ngắt bằng `---`, hoặc chuyển sang một chi tiết bên ngoài: đèn đường, tiếng điều hòa, cái điện thoại úp trên bàn), rồi mở lại ở sau đó: nằm cạnh nhau, sáng hôm sau.
- **Quấy rối không bao giờ là fan service:** hành vi tán tỉnh, quấy rối của sếp với nhân viên và thực tập sinh được viết như thứ xấu xí, khó chịu, qua phản ứng của người bị làm phiền và ánh nhìn của Thuyên. Không tả gợi dục cơ thể người bị quấy rối, không làm cảnh đó hấp dẫn.
- **Gợi dục nhưng không phản cảm:** không từ ngữ thô tục khi tả cơ thể, không tả bộ phận sinh dục, không liệt kê số đo, không biến nhân vật thành đồ vật. Gợi bằng phản ứng và chi tiết nhỏ, không bằng phơi bày.
- **Chỉ giữa người trưởng thành, đồng thuận rõ ràng, tỉnh táo.** Không có cảnh thân mật khi một bên say. Đêm say của Diệp Anh là đêm chia tay, không phải đêm ân ái.
- **Không có bất kỳ yếu tố gợi dục nào với nhân vật dưới 18 tuổi**, kể cả trong hồi tưởng: Thuyên – Vy (lớp 10–12), Nhi thời cấp 2–3 và thằng boy phố, mọi interlude quá khứ. Các cảnh đó chỉ giữ cảm xúc, ngại ngùng, nắm tay là tối đa. Fan service chỉ bắt đầu từ mạch hiện tại (tháng 10/2026), khi mọi nhân vật đã trưởng thành.

### Cách viết cảnh thân mật

- **Vẫn là show, don't tell, vẫn là POV của nhân vật:** cảm giác, hơi thở, nhiệt độ, những chi tiết người đó để ý. Thuyên để ý người kia nhiều hơn để ý mình, kể cả lúc này. Nhi gọi tên được cảm giác của mình.
- **Dồn sức vào phần dẫn vào:** khoảnh khắc quyết định, nụ hôn đầu, bàn tay dừng ở cúc áo, câu hỏi khẽ "được không", câu trả lời. Đây là chỗ gợi dục nhất và cũng là chỗ lộ nhân vật nhất.
- **Nhân vật vẫn là chính họ:** Thuyên vụng việc nhỏ, yêu thì ngại. Lần đầu của anh phải vụng, buồn cười, thật (vướng cúc áo, đụng đầu vào thành giường, cười phá lên giữa chừng), tất cả nằm ở phần trước ngưỡng. Diệp Anh chủ động và sắc. Nhi thẳng, nói ra điều mình muốn.
- **Có lời, có đồng thuận trong cảnh**, viết tự nhiên như thoại, không như thủ tục.
- **Cảnh cắt phải đẹp:** câu cuối trước khi cắt là một chi tiết đắt (một câu nói, một cái nhìn, một âm thanh), không phải câu tóm tắt kiểu "và họ đã…".
- **Cảnh sau quan trọng ngang cảnh trong:** nằm cạnh nhau, sáng hôm sau, ai dậy trước, ai nói gì, ai im. Đây là chỗ quan hệ thật sự đổi, và được viết gợi cảm thoải mái (da, chăn, áo mượn, vết son).
- **Mỗi cảnh thân mật gắn một mốc cảm xúc.** Không chèn chỉ để đủ số lượng.

### Fan service

- **Mật độ:** mạch hiện tại có một khoảnh khắc fan service mỗi hai, ba chương, kể cả trong giai đoạn lab căng thẳng (thường đặt ở cảnh thở).
- **Fan service phải mang chất nhân vật,** không lấy trope rời rạc. Lấy từ chính kho chi tiết của truyện: Thuyên hay quên ô; vụng việc nhỏ; ngoại hình hơi bad (sẹo lông mày, khuyên tai, tóc rơi một lọn); bóng rổ buổi sáng mồ hôi ướt áo; Nhi tone hồng, bướng, nói thẳng.
- **Căng thẳng trước, thỏa mãn sau:** slow burn với Nhi. Những lần suýt chạm, bị cắt ngang, rồi mới đến lúc chạm.
- **Fan service không phá tông:** ngay sau một cảnh đau có thể là một khoảnh khắc dễ thương, nhưng không biến cảnh đau thành trò đùa. Ngay sau cảnh R8 ở TH.LAB GĐ2 thì không đặt fan service trong cùng chương nếu không có `---` và mốc giờ ngăn cách (`registers.md` §4.2).

### Miêu tả ngoại hình gợi cảm

Chỉ áp dụng cho nhân vật trưởng thành ở mạch hiện tại. Mục tiêu là để người đọc nhìn qua mắt nhân vật đang bị cuốn hút, không phải để người kể đứng ngoài liệt kê cơ thể.

- **Luôn qua ánh nhìn của một POV:** không tả "cô ấy có xương quai xanh đẹp". Viết Thuyên đang giảng bài, mắt trượt xuống chỗ cổ áo cô lệch sang một bên, rồi quên mất mình đang nói đến câu điều kiện loại mấy.
- **Từng mảnh một, gắn với hành động:** một chi tiết mỗi lần, xuất hiện vì nhân vật đang làm gì đó (buộc tóc lộ gáy, xắn tay áo, ngửa cổ uống nước, cúi xuống nhặt bút). Không tả từ đầu đến chân.
- **Phản ứng quan trọng hơn chi tiết:** cổ họng khô, quên câu đang nói, nhìn đi chỗ khác quá nhanh, cầm cốc nước dù không khát. Người đọc bị kích thích bởi việc nhân vật bị kích thích.
- **Liếc rồi bị bắt quả tang:** trope hiệu quả nhất. Thuyên liếc, cô thấy, và cô nói thẳng ("Anh nhìn gì đấy?"). Với Nhi, cô nói thẳng hơn nữa. Với Diệp Anh, cô cố tình đứng yên cho anh nhìn tiếp.
- **Hai chiều, có female gaze:** Thuyên cũng bị nhìn. POV Nhi và các cảnh có Diệp Anh tả anh theo cách người đọc nữ muốn thấy.
- **Thuyên vẫn là Thuyên khi nhìn:** anh để ý chi tiết như khi đọc người, rồi tự giễu mình trong đầu ("đọc người chứ có phải đọc cổ áo đâu"). Sự ngại ngùng của anh là một phần của cái gợi cảm.
- **Ý nghĩ bỏ lửng, rồi kệ:** Thuyên thấy một chi tiết dễ thương hoặc gợi cảm, ý nghĩ chạy trước ("cặp má này mà cắn một phát thì…", "đầu mình mà gối lên đây thì…"), tự cắt giữa câu, sống lưng lạnh, rồi quay về vẻ điềm tĩnh, không quan tâm. Thích mà không biết tán nên kệ, với cả Nhi lẫn Diệp Anh. Mỗi chương hiện tại có tối đa một, hai lần, không lặp nguyên công thức chữ (đổi cách cắt: đạp phanh, nhìn xe buýt, nhìn đồng hồ, không cho đi hết câu). Chiều nữ nhìn nam: Nhi nói thẳng ra một nửa, phần còn lại ngượng trong interlude; Diệp Anh nhìn lâu có chủ đích. Kho tình huống ở mục F8 trong bible.
- **Ba giây đầu:** lần đầu thấy một cô gái, viết theo thứ tự nhìn chi tiết xinh trước (một đến bốn mảnh), đếm thời gian đơ, rồi mới đến lúc anh lấy lại đầu óc và đọc người. Không bao giờ để phán đoán đi trước ái mộ ở lần gặp đầu. Quen thì số giây giảm; chi tiết mới thì reset. Đây là thước đo cảm xúc của anh, dùng nó để cho người đọc thấy quan hệ đang ở đâu (xem F9 trong bible).
- **Gợi hơn phơi:** che một nửa thì hấp dẫn hơn lộ hết. Áo sơ mi mở một cúc kích thích hơn cởi trần.
- **Không thô, không liệt kê số đo, không biến nhân vật nữ thành đồ vật:** người được nhìn luôn có phản ứng, có ý chí, có thể nhìn lại.

## Nhân vật xám và trầm cảm

Không ai tốt hoàn toàn, và không ai được chữa lành bằng một cảnh duy nhất.

### Nguyên tắc nhân vật xám

- Ai cũng có lý do hợp lý cho việc mình làm, kể cả việc xấu.
- Mỗi nhân vật vừa làm điều tốt vừa làm điều sai. Người đọc hiểu họ trước khi kịp phán xét.
- Cái sai phải có hậu quả thật về sau, không được bỏ qua.
- Phản diện không ác thuần túy: đúng ở một điểm, sai vì lợi ích riêng.

### Vết răng căm hận (nửa tà)

- Phần quá khứ phải để lại dấu căm hận lặng lẽ: cắn gối mà không khóc, một ý nghĩ lạnh trong đầu khi đang mỉm cười với người lớn, lần đầu đổi thành tích lấy tự do bằng một lời nói dối vô hại.
- Đây là ngòi nổ cho nửa tà về sau: Thuyên có khả năng cân nhắc những lựa chọn không quang minh chính đại, mâu thuẫn về đạo đức nhưng không đủ để bị gọi là trái đạo đức.
- Không gọi tên căm hận, không giải thích. Chỉ để lại dấu. Ở lớp đứa trẻ (R8), dấu là thân thể và con số. Căm hận được lên tiếng, không bằng tên, ở khối R9 của khung (bản nháp bị xóa) và ở cái tôi độc GĐ2 (chốt 28/10).
- **Đau nhưng kiềm chế** ở register R6 thường: không than vãn, luôn có niềm vui thật xen vào, để khi niềm vui bị lấy đi thì cú đau mới rõ. **Sửa 28/10:** ở mảnh R8 và khối R9, không bắt buộc niềm vui xen vào trong mảnh; niềm vui thật vẫn phải có ở chương (ít nhất một mảnh ấm mỗi chương quãng 1, `registers.md` §5), để tương phản chứ không để xoa. "Không than vãn" giữ nguyên: R8 không than, R9 hằn học chứ không than.

### Khắc họa trầm cảm

- Điều trị được thể hiện thật: thuốc kết hợp trị liệu, tiến triển chậm, có lúc tốt lên rồi tệ đi.
- Chẩn đoán không phải nút "giải thích mọi thứ". Nó là một phần của Thuyên, không phải toàn bộ.
- Điều trị không phải phép màu: đang điều trị anh vẫn có thể nói lời làm tổn thương người khác.
- Điều trị bắt đầu từ chính Thuyên. Tình yêu giúp anh duy trì và mở lòng, không phải thứ chữa anh.
- Khi viết các chương này, nên tham khảo tài liệu chuyên môn hoặc nhờ người có chuyên môn đọc lại.
