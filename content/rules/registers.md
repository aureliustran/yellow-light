# Đèn vàng – Register (văn phong)

Oct 28, 2026 · @aureliustran. Sửa 13/11 (chuyển vào repo R10 Nội tâm và các sửa 01/11, 04/11 từ bản Project, tác giả chấp nhận; mục thư viện [[REG.noi-tam]]). Sửa 04/11 (thêm **R10 Nội tâm**, §2.6: người kể nói thẳng cảm xúc, suy nghĩ của nhân vật POV; hành động ít, nhanh, dứt khoát; QK.T interlude quãng 2 lấy R10 làm nền; 13:52: nhịp tiêu cực của interlude quãng 1 cũng dùng R10, ghép với bộ kỹ thuật tiêu cực đã có, §2.6.3). Sửa 01/11 (ba interlude đại học trước ch.5 được R8, R9; luật chữ tục; theo `_archive/tuyen/qua-khu/thuyen-cai-toi-doc-co-che.md`). Sửa 28/10 (thêm §2.4 thiết bị của cỗ máy, §2.5 hệ giác quan và cảm xúc; 13:22: QK.T quãng 1 gọi tên mãnh liệt, R8 lùi thành dư chấn, theo `rules/goi-ten-cam-xuc.md` §4a). Nguồn sự thật cho register, đúng chỗ `kien-truc.md` §2 đã chừa (Q-042: "Register về `rules/registers.md`"). Gộp bản đồ R1–R7 của skill `den-vang-van-phong`, thêm **R8 Sổ cái**, **R9 Đắng** và **R10 Nội tâm**, và đặt register vào cây tuyến.

Phân việc với các file khác:
- `den-vang/01-rules-viet.md` (sau khi chuyển: `content/rules/01-rules-viet.md`) giữ luật câu chữ: chuyển dạng theo tuổi, màu lời kể, tự thoại. Luật gọi tên cảm xúc ở POV Thuyên: `rules/goi-ten-cam-xuc.md` (thay luật "không gọi tên" cũ).
- File này giữ: có những register nào, register nào ở node nào trong giai đoạn nào, chuyển giữa chúng ra sao, liều bao nhiêu.
- Skill `den-vang-van-phong` đọc file này. Chỗ nào skill lệch file này thì file này thắng.

**Nhãn:** `[chốt dd/mm]` tác giả duyệt. `[chốt 28/10 · ủy quyền]` tác giả giao Claude quyết ("T cho phép quyết định sử dụng văn phong của m", 28/10); Claude quyết và ghi lý do, tác giả sửa bất cứ lúc nào. `[đề xuất]` chưa duyệt.

---

## 0. Nguyên tắc

1. **[chốt 13/11, thay chốt 28/10] Có văn phong mặc định cho cả truyện: R0 ([[REG.default]]), chỉ dành cho tình huống ít ảnh hưởng tới cốt truyện.** Mỗi tuyến đặt style mặc định, node tùy chỉnh theo giai đoạn, tình tiết kế thừa style của node, nên hiếm khi rơi xuống R0; rơi xuống thì `canon:check` cảnh báo theo mức của node (`docs/framework/library.md`). Văn phong vẫn chọn theo **node × giai đoạn × nhịp**, qua cây tuyến (§3; `storylines/README.md`, lối vào A bước 7). Mềm, ấm, ngôn tình là register của những node cụ thể, không phải giọng nền. Chốt v2 ngày 19/10 ("Tuyến tình cảm chính viết theo kiểu rom-com, văn phong ngôn tình Việt Nam") áp cho tuyến tình cảm (RM), không áp cho QK, TH, GD.
2. **[chốt 28/10] Kỹ thuật lạnh, đau, cực đoan được dùng ở:** QK.T (tuổi thơ: đòn roi, lời quát mắng, sự vô dụng của bản thân), TH.LAB ở GĐ2, và toàn bộ thời điểm đổ vỡ. Lý do của tác giả: độ cực đoan phải nằm trong cách viết, không chỉ trong nội dung, vì nếu không người đọc không hình dung được mức nghiêm trọng.
3. **[chốt 28/10 · ủy quyền] Độ gắt đến từ việc giấu, không từ tính từ.** R8 và R9 vẫn tuân luật "lời kể POV Thuyên không gọi tên cảm xúc". Gắt nằm ở: sự việc trần, con số, khuôn câu lặp, người gây đau thấy mình tử tế, và chỗ không ai an ủi.
   **[chốt 28/10, 13:22] Ngoại lệ QK.T quãng 1:** lời kể đứa trẻ gọi tên cảm xúc mãnh liệt, kèm kết luận nhân sinh của nó; cảnh đỉnh dựng, không tóm; R8 lùi thành dư chấn (chuỗi đếm, kiểm kê, dòng sổ) sau cảnh nóng (`goi-ten-cam-xuc.md` §4a). Lý do: roi vọt phổ biến và bị bình thường hóa trong khung "dạy con"; kể bằng giọng lạnh thì người đọc tự lấp bằng khung ấy (bản thử v4 bị chấm nhẹ, tự sự). Luật 3 này giữ nguyên cho TH.LAB GĐ2, GÃY và R9.
4. **[chốt 28/10 · ủy quyền] R8, R9 hiếm thì mới nặng.** Chỉ dùng ở ô ma trận cho phép (§3). Ngoài ô thì cần tác giả duyệt và ghi ở cột `Register` của tình tiết.
5. **[chốt 10/11] Từ phức là đa số, từ đơn là thiểu số, ở mọi register.** Luật gốc ở `01-rules-viet.md` (*Nguyên tắc chung*). Áp cho lời kể, tự thoại, độc thoại, tài liệu thiết kế; thoại thì tự nhiên, ưu tiên từ phức khi nhân vật thông minh, cân nhắc kỹ, hoặc đang diễn giải điều phức tạp. Register ngắn (R3, R7, R8) cũng áp đủ: ngắn là nhịp và cấu trúc câu, không phải độ nghèo của từ (§6.3); luật riêng của register vẫn đứng (R7 ít tính từ, R8 không tính từ chỉ đau và màu). Từ đơn dùng có chủ đích: nhịp cụt khi căng, câu chốt, chửi, âm đệm. Viết đổi từ, giữ nhịp. Trước khi nộp: §7. Quét lại văn bản có sẵn: `guidelines/tasks/compound-words-sweep.md`.
6. **[chốt 04/11] Nói thẳng cũng là một văn phong.** R10 Nội tâm (§2.6) cho người kể nói thẳng cảm xúc, suy nghĩ của nhân vật POV, thay cho việc dựng cảnh để người đọc tự suy ra. Luật 3 (gắt từ việc giấu) không áp cho R10. R10 không bao giờ chung một nhịp với R8. (Bản Project đánh số luật này là §0.5; trong repo §0.5 là luật từ phức 10/11, nên luật này là §0.6.)

## 1. Bảng register

| Mã      | Register                                                           | Dùng khi                                                                                                                       | Nhịp câu                                                                                              | Ngoại cảnh                                                               | Thoại                                                                             | Mẫu                             |
| ------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------- |
| R1      | Đời thường, hài                                                    | Sân bóng, Vũ, Nhi chọc, nhóm pickup                                                                                            | Vừa, lan man có chủ đích                                                                              | Sống động, cụ thể (hoa sữa, bác bảo vệ, giá rau)                         | Dày, âm đệm, tục với Vũ, meme                                                     | ch.9, ch.38 (bản cũ)            |
| R2      | Lãng mạn, slow burn (ngôn tình, rom-com)                           | Thuyên – Nhi; Thuyên – Diệp Anh trước khi yêu                                                                                  | Chậm lại quanh một chi tiết                                                                           | Hẹp dần về một chi tiết trên người                                       | Ít, có câu bỏ lửng; F8 ý nghĩ cắt giữa câu, F9 ba giây                            | ch.13, *Cam cháy*               |
| R3      | Thân mật                                                           | Cảnh giường, cảnh say mềm                                                                                                      | Câu vỡ, ngắt 1–2 lần                                                                                  | Tắt gần hết khi chạm; còn da, hơi thở, nhịp tim                          | Ít, câu nào cũng có âm thanh                                                      | *3107*, ch.39                   |
| R4      | Đấu trí văn phòng                                                  | Tầng 17, ván cờ, phép thử                                                                                                      | Dài khi ru, cụt khi chạm chỗ lệch                                                                     | Đồ vật có số liệu (log, dấu giờ, con trỏ chuột)                          | Mỗi câu là một nước                                                               | ch.35, ch.36                    |
| R5      | Lạnh, liệt kê                                                      | Interlude Khải, *Quân trắng*, *Quân đen*                                                                                       | Ngắn, đều, ngắn dần khi quân to dần                                                                   | Gần như không                                                            | Câu trọn, không âm đệm                                                            | chưa viết                       |
| R6      | Hồi tưởng                                                          | Quá khứ Thuyên, Nhi                                                                                                            | 6–15 mảnh, mỗi mảnh một cảnh có giác quan; nhảy thời gian giữa mảnh                                   | Giác quan, đồ vật để gọi lại                                             | Ít, đắt                                                                           | ch.2–7, *Đỏ sẫm*                |
| R7      | Đáy                                                                | Sau đổ vỡ, trầm cảm                                                                                                            | Phẳng, ít tính từ; ở đáy sâu nhất thì vụn (§2.3)                                                      | Thấy mà không đọc ("nhìn như nhìn tường")                                | Cạn; vắng ba giây ái mộ                                                           | phần hồi phục, ch.0 *Nước lạnh* |
| **R8**  | **Sổ cái** (lạnh, cực đoan)                                        | Đòn roi, mắng, phủ nhận ở QK.T; áp chế ở TH.LAB GĐ2; ngày gãy                                                                  | Ngắn, khẳng định, đếm; khoảng cách sụp vào thân thể ở cú đánh                                         | Đồ tiện nghi đặt ngang hàng với roi; con số; một vật sáng mà mắt bám vào | Người gây đau nói trọn, tự nhiên, tin mình đúng; người bị đau gần như không thoại | §5.1, §5.2                      |
| **R9**  | **Đắng** (hằn học, chửi đổng)                                      | Lớp người lớn nhìn lại (bản nháp bị xóa ở khung ch.2–6); interlude quãng 2 (bị lý trí cắt); độc thoại cái tôi độc ở GĐ2; đổ vỡ | Một khối không xuống dòng; điệp khúc; câu dài dồn; rơi về một câu lễ phép hoặc một hành động          | Gần như không; chữ của người khác là vật                                 | Không thoại; đây là giọng trong đầu hoặc chữ gõ ra                                | §5.1                            |
| **R10** | **Nội tâm** (gián tiếp tự do dày) `[chốt 04/11]` · [[REG.noi-tam]] | QK.T interlude quãng 2 (nền); nhịp tiêu cực của QK.T interlude quãng 1 (§2.6.3); ô khác theo §3 và §2.6.2                      | Khối nội tâm dài, dồn khi nhân vật đang thắng, đứt khi bị chạm; dòng hành động cụt chen giữa các khối | Chỉ ở chỗ quả ngọt và một chi tiết lóe                                   | Ít, ngắn; mỗi câu thoại là cò cho một khối nghĩ                                   | §2.6                            |

### Register theo POV interlude (giữ từ skill)

- **Nhi (tên là một màu):** nhìn vào trong; mở bằng `:::phone`; gọi tên cảm xúc nhưng sai lý do.
- **Diệp Anh (tên là một món trang phục):** nhìn ra ngoài; bảng tính phương án; trật tự cho đến chỗ cô không viết trước.
- **Khải (sắc độ trắng – đen):** R5, ngôi tôi.
- **Phong (tên loại phim):** người kể nói thẳng Phong thích Nhi từ bao giờ, vì sao; nhìn qua ống ngắm.
- **Thuyên (tên là một cảm xúc):** R6 làm nền. `[sửa 04/11]` Interlude quãng 1: R6 ở nhịp bình dị, **R10** ở nhịp tiêu cực (§2.6.3). Interlude quãng 2 lấy **R10** làm nền (§2.6.1); R9 bị cắt ở nhịp đi xuống (§2.2 luật 1). Ch.0 *Cô tịch*: R7.
- **Nhiều góc nhìn:** ghép quy ước tên; đổi góc nhìn bằng `---`.

## 2. Bộ kỹ thuật của R8, R9 (nghiên cứu 28/10)

Tên tác giả và tác phẩm chỉ ở tài liệu, không lên trang.

| Kỹ thuật | Nguồn | Cơ chế | Dùng ở |
| --- | --- | --- | --- |
| **Sổ cái** | Agota Kristof, *Cuốn sổ lớn* | Chỉ ghi sự thật; bỏ chữ chỉ cảm xúc vì "mơ hồ". Bạo lực kể cùng giọng với việc vặt. Người đọc gần như không để ý mình vừa đọc cảnh tàn nhẫn, rồi nó nằm lì trong đầu | R8 |
| **Kéo sập khoảng cách** | John Gardner, psychic distance | Năm mức từ xa ("Mùa đông năm 1853…") đến trong đầu ("Tuyết. Chui vào cổ áo…"). Đổi mức giữa cảnh là cách đổi nhiệt | R8: xa ở mở cảnh, sụp ở cú đánh, lùi ra ở câu kết |
| **Điệp khúc, chửi đổng** | Thomas Bernhard | Một khối chữ không xuống dòng, lặp một cụm, lời tuyệt đối, kết án cả một tầng lớp. Nhân vật đau vì vẫn còn bận tâm, không vì đã buông | R9 |
| **Hằn học tự hành** | Dostoevsky, *Bút ký dưới hầm* | Tự mâu thuẫn, tự xỉ vả, quay sang nói với người đọc, khoái cảm trong đau ("Gan tôi đau à? Tốt, cho nó đau thêm") | R9 ở GĐ2, đổ vỡ; interlude *Tủi hổ*, *Phẫn uất* |
| **Đẹp cạnh tàn bạo** | Ocean Vuong, *On Earth We're Briefly Gorgeous* | Câu vụn; nói thẳng với người không đọc được; một hình ảnh đẹp đặt sát cái tàn | R7 ở đáy sâu nhất; một nốt trong R8 (mắt đứa trẻ bám vào vật sáng) |

### 2.1 Luật R8 Sổ cái

**Phạm vi `[chốt 28/10, 13:22]`:** ở TH.LAB GĐ2 và GÃY, R8 là giọng của cả cảnh. Ở QK.T quãng 1, R8 chỉ áp cho **mảnh dư chấn** đứng sau cảnh nóng đã gọi tên (chuỗi đếm trong lúc bị đánh, danh sách kiểm kê, dòng sổ năm); cách nối: ngắt dòng hoặc `---` (`goi-ten-cam-xuc.md` §4a luật 5).

1. **Chỉ ghi sự việc.** Không tính từ chỉ đau (đau đớn, tủi nhục, uất ức), không tính từ màu (u ám, nặng nề).
2. **Bạo lực cùng giọng với việc vặt.** Roi được kể như cơm, như phích, như giờ thời sự.
3. **Mỗi mảnh R8 có ít nhất một chuỗi đếm hoặc một danh sách kiểm kê.** Đứa trẻ đếm roi để có việc trong lúc bị đánh. Thói đếm ấy về sau là cái cân, cây thước của anh, và ở GĐ2 anh đếm lỗi của người khác.
4. **Khoảng cách:** mở xa (mốc giờ, một sự việc trần), sụp vào thân thể ở cú đánh ("Một. Hai."), lùi ra ở câu kết.
5. **Kết bằng một dòng sổ sách hoặc một hệ quả vật chất.** Không câu đúc kết, không ẩn dụ được giải nghĩa. Câu đúc kết là dấu hiệu người kể đã nguôi.
6. **Người gây đau thấy mình tử tế.** Không phản diện hóa. Họ cho ăn, cho mặc, cho múi quýt. Càng bình thường càng đáng sợ.
7. **Người bị đau không than.** Trẻ: thân thể và con số. Người lớn: im, hoặc một câu lễ phép.
8. **Không thẩm mỹ hóa vết thương** (không tả máu, vết lằn cho đẹp). Mắt nhân vật được bám vào một vật sáng bên ngoài (mảnh ruột phích), không bám vào vết thương.
9. **Không hài chạm vào cái đau** (luật chuyển 8 của skill, giữ nguyên).

### 2.2 Luật R9 Đắng

1. **R9 luôn là giọng Thuyên, không phải người kể.** Người kể của Đèn vàng không phán xét. Chỗ đứng theo giai đoạn:
   - **Quãng 1** `[sửa 28/10, 14:15]`: trước summit chỉ một câu, gõ rồi xóa (*Sướng. Ai cũng bảo thế.*), vì người đọc mới có mảnh vụn (luật đủ). Khối đầy đủ ở cuối interlude *Nhục nhã*, gõ rồi xóa, rơi về câu cảm ơn. Mô tả cũ: anh gõ một khối trong `:::editor`, rồi bôi đen, xóa, gõ lại một câu cảm ơn. Bài phát biểu không bao giờ chứa nó; người đọc thì đã đọc. Đây cũng là bằng chứng cái tôi đại học *kiểm soát được* (chốt 27/10): cơn hằn có, nhưng bị xóa.
   - **Quãng 3, ba interlude đại học trước ch.5** `[chốt 01/11]` (*Cô độc*, *Mỏi mệt*, *Hoang mang*): khối R9 đầy đủ là giọng cái tôi độc nói với thằng bé ở cột lớp một, không bị xóa, rơi về một lệnh ngắn (*Dậy.*, *Không gõ.*, *Hủy diệt.*) rồi một hành động quá đà; hệ quả viết bằng R8. Giọng đi qua người kể, dùng từ phổ thông. Liều: *Cô độc* nhẹ, *Mỏi mệt* vừa, *Hoang mang* nặng. Cơ chế: [[FN.thuyen.phong-kin]] (`_archive/tuyen/qua-khu/thuyen-cai-toi-doc-co-che.md`).
   - **Quãng 2 (interlude Thuyên, tên là cảm xúc):** khối R9 bị lý trí cắt giữa câu. Tên interlude là chính cảm xúc mà lý trí vừa cắt. `[sửa 04/11]` Nền của interlude là R10 (§2.6.1); R9 bị cắt xuất hiện ở nhịp đi xuống, như chỗ khối nội tâm đứt.
   - **GĐ2 và đổ vỡ:** R9 hòa vào lời kể bằng gián tiếp tự do. Ở GĐ2 nó là giọng cái tôi độc; không còn bị xóa nữa. Sự vắng mặt của nút xóa là triệu chứng.
2. **Liều:** quãng 1 tối đa một khối mỗi chương, khoảng 200 chữ, và không chương nào cũng có. GĐ2 rải thành dòng, dày dần theo nấc nhờn thuốc. Đổ vỡ tối đa một khối mỗi cảnh.
3. **Điệp khúc là chữ của người khác:** *sướng, đủ, ngoan, giỏi, lì, sướng thế mà còn*. Lặp đến khi chữ ấy thành độc.
4. **Vẫn không gọi tên cảm xúc của chính anh.** Anh gọi tên chữ của người lớn, rồi xoay nó.
5. **Hằn học, không thương thân.** Hướng ra (người lớn, cả một thế hệ, "người ta") và hướng vào (tự xỉ vả, nhận đau như một thứ đáng được). Không cầu xin, không than. Luật "tới gần chỗ thương thân thì lý lẽ cắt ngang" vẫn giữ: R9 là chỗ lý lẽ ấy thành dao.
6. **Chữ tục** `[chốt 01/11]`: trên site viết đủ chữ; trong tin nhắn (`:::chat`) viết tắt (đm, vcl); bản crosspost cân nhắc viết tắt. Tối đa một chữ tục trong một câu thoại, không đứng sát nhau; trong một khối R9 tối đa hai, ba chữ. Cách thiết kế câu chửi (hình ảnh trước, chữ tục sau; ba mức; áp cho SL.Vũ, SL sân bóng, QK.T sân bóng): `rules/chui-bay-thiet-ke.md` `[chốt hướng 01/11]`. (Trước 01/11: "Tục viết tắt (đm, vcl) như luật thoại.")
7. **Kết:** lõi của khối là lời phủ nhận (chốt 28/10): cơn hằn với bố mẹ là vỏ, câu cuối trước khi rơi là "mình không thiếu" bằng bộ kết quả (TB-1). Rồi rơi về một câu lễ phép ("Cảm ơn bác.") hoặc một hành động (bôi đen, xóa, đóng máy). Không kết bằng câu đúc kết.
8. **Vẫn cấm thuật ngữ tâm lý, triết học,** tên hình mẫu tham chiếu.

### 2.3 R7 ở đáy sâu nhất `[chốt 28/10 · ủy quyền]`

Thuộc "toàn bộ thời điểm đổ vỡ" (§0.2). R7 thường phẳng. Ở vài nhịp sâu nhất (ch.0 *Nước lạnh*, chương nước lạnh của phần đổ vỡ) cho phép:
- câu vụn, cú pháp gãy;
- nói thẳng với một vật hoặc người không trả lời được (cái gối; mạ), ngôi thứ hai;
- một hình ảnh đẹp đặt sát cái tàn;
- dò liên tục, không đi đến *Vì vậy* (luật cũ của rules giữ nguyên).

### 2.4 Thiết bị của cỗ máy hiện sinh (TB-) `[chốt 28/10]`

Register là giọng; thiết bị là bộ phận của cỗ máy hiện sinh của Thuyên hiện lên trang. Định nghĩa đủ mười sáu thiết bị: `_archive/tuyen/qua-khu/thuyen-co-may.md` §5. Bảng dưới là **thiết bị bắt buộc** theo node × giai đoạn. Plan phải ghi thiết bị cho mỗi nhịp có mặt node ấy; reviewer chấm thiếu thiết bị bắt buộc là CHẶN.

**Hai thiết bị áp cho mọi tuyến, mọi session, mọi POV:**
- **TB-1 luật khóa:** trước HP, không nhân vật nào nói với Thuyên một câu thuộc bộ chịu đựng (*cố, chịu, mấy cái, mấy ngày, đau không, con nói thật mà*). Câu khen, câu an ủi dành cho Thuyên đều phải thuộc bộ kết quả, hoặc lệch khỏi cái cố, cái chịu.
- **TB-7:** khi một nhân vật tiến gần câu của cái gối, phản ứng đầu của Thuyên là tếu, lùi hoặc lạnh đi. Session RM, SL viết Nhi, Vũ, Diệp Anh phải tính phản ứng này vào cảnh.

| Node | MĐ | GĐ1 | GĐ2 | GÃY | HP |
| --- | --- | --- | --- | --- | --- |
| `QK.T` (ch.2–6, ch.0) | TB-1, 2, 5 (lớp 8–9), 13, 14, 15 (cài), 16 (bậc 1); khoảnh khắc ba linh kiện mỗi chương (`thuyen-co-may.md` §6) | Interlude quãng 2: TB-12, 4, 5, 8 (bóc vỏ), 3, 16 (bậc 2) | Một dòng gọi lại, đúng thiết bị của nấc | TB-15 (nhắc) | TB-15, 16 (bậc 3) |
| `RM.TN` | TB-9 | TB-9, 7, 8, 1 | TB-9, 7, 4, 5 ("Không thiếu gì"); TB-10 nếu H7 mở rộng | TB-5 (sổ hết mục), 1 | TB-14 (đặt gối xuống), 15, 7 (hết) |
| `RM.TD` | | TB-4 (gối đầu lên đùi cô: cuộc cãi dễ thắng) | TB-3 (độc) | | |
| `TH.LAB`, `TH.MD`, `TH.T18` | | TB-3 (lành), 6 (liều đầu kéo giãn) | TB-3 (độc), 6 (tóm lược → bỏ trống), 11; vang khuôn câu (§4.3) | TB-11, 1 (bộ kết quả mất chỗ chỉ) | TB-3 (phép thử phòng thủ) |
| `SL.VU` | | TB-8 (người bắt van xả, nếu là Vũ) | TB-8, 2, 11 (mắt người ngoài) | | TB-2 (không cần đếm), 15 |
| `SL.DT` | TB-2 | TB-2 | TB-2 (đếm dày lên) | TB-2 (thôi vì cạn) | TB-2 (không cần đếm) |
| `GD.T` | TB-1 (luật khóa với bố mẹ) | TB-6 (cuộc gọi tám giờ không còn làm đau sau lời khen) | TB-4 (giỗ ông) | | TB-16 (bậc 3 ở trị liệu gia đình) |
| Interlude POV khác (Nhi, Vũ, Phong) | | TB-9 (đưa sự thật cho người đọc trước) | TB-11 (mắt người ngoài) | TB-11 | |

### 2.5 Hệ giác quan và cảm xúc `[chốt 28/10]`

Kỹ thuật nối giác quan với cảm xúc ở khoảnh khắc lý trí dừng lại. Năm lớp, dùng cho QK.T trước hết và cho mọi đỉnh cảm xúc của Thuyên. Lời kể ghi **cảm xúc** (trạng thái cơ thể) trước, **cảm giác** (việc nhận biết nó) sau. Ở QK.T quãng 1, cảm giác được gọi tên, mãnh liệt, bằng chữ của đứa trẻ (`goi-ten-cam-xuc.md` §4a); ở R8, R9 và ở chỗ anh chưa tự nhận, khoảng trống giữa hai thứ ấy là Thuyên. `[sửa 28/10, 13:22]`

| Lớp | Nguồn | Luật | Gắn vào |
| --- | --- | --- | --- |
| **A. Vật tương quan** | T.S. Eliot, "Hamlet and His Problems" (1919): cảm xúc trong nghệ thuật chỉ biểu hiện được qua "một tập hợp đồ vật, một tình huống, một chuỗi sự kiện" làm công thức cho nó | Mỗi niềm tin có một chuỗi vật. **Luật đủ:** cảm xúc không được vượt quá sự việc đã có trên trang. Khối R9 chỉ đứng sau khi R8 đã đặt đủ sự việc | Cột "Cầu bằng vật" ở bảng neo QK; TB-14 cái gối |
| **B. Kênh theo loại ký ức** | van der Kolk, Fisler 1995; Siegel 2010: ký ức sang chấn lưu thành mảnh giác quan, không có thời điểm, sống lại như đang xảy ra, bật qua tác nhân giác quan. Hiệu ứng Proust (Chu, Downes 2000; Hackländer 2018): mùi gợi ký ức xa hơn, nhiều cảm xúc hơn | **Ký ức đau:** kênh âm thanh và xúc giác; bật vào khung hiện tại qua một tác nhân; mảnh vụn, không mốc thời gian (không "hồi lớp bốn", không "năm ấy"), như đang xảy ra. **Ký ức ấm:** kênh mùi và ánh sáng ở xa; kể có thời gian, nơi chốn, thành chuyện | Bảng kênh trong rules (*Màu sắc của lời kể*); khung soạn bài phát biểu ch.2–6 là nơi đặt tác nhân |
| **C. Thân biết trước** | Damasio: cảm xúc là trạng thái cơ thể, cảm giác là việc nhận biết nó; dấu ấn cơ thể dẫn quyết định trước lý trí | Ở mỗi quyết định lớn, cơ thể phản ứng trước (bụng, cổ họng, tay), lý trí gạt đi sau. Cơ thể đúng, lý trí thắng, cho đến đáy | Bảng *Chuyển dạng theo tuổi* trong rules; TB-5 thân vênh lời |
| **D. Chi tiết lóe** | Chekhov, thư gửi Alexander (5/1886): nắm lấy chi tiết nhỏ, xếp chúng lại; đêm trăng là mảnh thủy tinh chai vỡ lấp lánh như ngôi sao nhỏ trên đập nước | Ở đỉnh đau, mắt bám vào đúng một vật nhỏ phát sáng. Một chi tiết mỗi cảnh. Không bao giờ là vết thương | Luật R8 số 8 (mảnh ruột phích "sáng quá") |
| **E. Khuôn tràn** | Kỹ thuật cảnh nóng của truyện (`01d` §3; rules *Cảnh nóng và fan service*), bỏ toàn bộ phần gợi dục | Là **khuôn dùng bên trong R6, R7** (cảnh khóc, đêm, cảnh ôm ở hồi phục), không phải register riêng, vì cơn tràn luôn là đỉnh của một cảnh khác. Trình tự: ngưỡng (hòn bi trong cổ, môi run) → ý nghĩ chạy về nhu cầu, bị cắt giữa câu → hết tính toán, ngoại cảnh tắt, chỉ còn hơi thở, nước mũi, vị mặn → chạm để xác nhận một thứ còn ở đó (gối; ở hồi phục: người) → cắt sang cảnh sau (bể nước lạnh, sáng hôm sau). "Hức" chỉ ở chỗ yếu nhất; không kéo chữ khi khóc | Sợi gối; TB-15 (cảnh ôm ở hồi phục, chỗ câu cũ đổi nghĩa là chỗ nóng nhất) |

**Chất Việt cho mảnh ấm và mong:** Thạch Lam, *Hai đứa trẻ*: tâm trạng qua cảm giác mơ hồ, ánh sáng nhỏ chống lại bóng tối, tiếng đêm quê, mùi đất. Giữ phần giác quan; ở QK.T quãng 1 giữ cả phần gọi tên cảm xúc. Sao Hôm và đèn vàng là "chấm lửa nhỏ" của truyện. **Chất Việt cho đỉnh đau:** Nguyên Hồng, *Những ngày thơ ấu*: đứa trẻ gọi tên trực tiếp, mãnh liệt, kèm hành động tưởng tượng và nhịp câu dồn (`goi-ten-cam-xuc.md` §4a).

**Thứ tự trong một cảnh đỉnh của QK.T** `[sửa 28/10, 13:22; 04/11: từ "thân biết trước" đến "kết luận nhân sinh" chạy trong khối R10, §2.6.3]`: tác nhân ở hiện tại (B) → mảnh ký ức không mốc thời gian (B) → cảnh dựng, kéo vài giây thành thời gian tâm lý, lời người lớn nói đủ câu → thân biết trước (C) → gọi tên mãnh liệt, kèm một chi tiết lóe (D) → kết luận nhân sinh của đứa trẻ → dư chấn R8 (chuỗi đếm, dòng sổ) → đêm: khuôn tràn với cái gối (E, A). Ở khuôn tràn quãng 1, bước "ý nghĩ chạy về nhu cầu" được nói trọn ở lớp 1–5 (*muốn mạ ôm*), bị cắt giữa câu từ lớp 6 (đường mất lời, §4a luật 6).

**Ranh cứng:** khuôn tràn không bao giờ áp độ gần thân thể kiểu cảnh nóng cho cảnh bị đánh, và không bao giờ cho bất kỳ cảnh nào của nhân vật dưới 18 tuổi ngoài phần cấu trúc (ngưỡng, hết tính toán, cắt sang cảnh sau, ý nghĩ bị cắt) và chi tiết của chính cơn khóc (nước mắt, nước mũi, hơi thở, gối ướt). Cảnh đòn roi giữ R8.

**Mẫu:**
- Ký ức đau bật vào khung (ch.3): *Cái ấm kêu tách một tiếng rồi tắt đèn. / Tách. Nước sôi. Mảnh bạc dưới chân tủ bát. Một. Hai. / Anh đặt cái cốc thủy tinh xuống, lấy cái cốc sứ trên giá.*
- Ký ức ấm qua mùi, có thời gian và nơi chốn (ch.5): *Mùi lạc rang từ quán đầu ngõ bay lên tận tầng bốn. Mùa hè năm lớp tám, đĩa lạc nằm giữa bàn uống nước, bố đẩy nó sang phía anh một chút, mắt vẫn nhìn tivi.*
- Khuôn tràn (ch.0, khoảng một giờ sáng): *Cổ họng có một hòn bi. Anh nuốt. Nó không xuống. / Giá mà lúc này có ai— / Anh đứng dậy, rót nốt nửa cốc. Không. Không có ai cả. Không cần. / Rồi cái ấy tràn. Không còn căn phòng nữa. Chỉ còn hơi thở đứt từng khúc, nước mũi, và cái mặn chảy vào khóe miệng, mặn hơn mồ hôi. Anh kéo cái gối vào ngực, áp mặt vào chỗ khô, bấu vào vỏ gối đến trắng đốt tay, như để chắc là nó còn ở đó. / Nó còn ở đó. Nó không nói gì. / Sáu giờ, nước trong đường ống đã nguội.*

### 2.6 R10 Nội tâm `[chốt 04/11]`

**Nguồn:** tác giả, 04/11. 13:16: *"Văn phong, kĩ thuật viết phần này nên hướng đến việc lột tả vì nỗi đau mà cố gắng, vì cố gắng nên lần đầu được nếm quả ngọt, so sánh quả ngọt với người khác (cái thước), và nghĩ nó sẽ ở với mình mãi mãi 1 cách tự nhiên bởi đó là năng lực của mình. Khả năng phải nhấn mạnh độc thoại nội tâm."* 13:19: *"Thay vì mô tả cảm xúc của người đọc qua người kể, để cảm xúc, suy nghĩ của anh qua người kể thay thế. Phần ít là mô tả hành động, nhanh, dứt khoát, phần suy nghĩ, nội tâm là nhiều."* 13:23: *"Chốt kĩ thuật viết mới, đưa vào danh mục phù hợp để tái sử dụng cho tuyến khác."* Chuyển vào repo 13/11 (tác giả chấp nhận); mục trong thư viện: [[REG.noi-tam]].

**Định nghĩa.** Người kể khoác trọn giọng nghĩ của nhân vật POV (gián tiếp tự do toàn phần). Cảm xúc và suy nghĩ đi thẳng qua lời kể, thay cho việc dựng cảnh để người đọc tự suy ra. Hành động là phần ít: nhanh, dứt khoát. Nội tâm là phần nhiều.

**Khác các register gần nó:**

| | Người đọc nhận cảm xúc bằng | Nội tâm |
| --- | --- | --- |
| R6 Hồi tưởng | Tự ráp từ mảnh giác quan | Ít, đắt |
| R8 Sổ cái | Tự lấp chỗ bị giấu | Không có |
| R9 Đắng | Nghe giọng hằn học một khối | Một khối chửi đổng, hướng ra người khác và vào mình |
| Tự thoại hiện sinh (`01-rules-viet.md`) | Một câu hỏi lớn đứng trên chi tiết | 1–3 câu, câu hỏi hoặc mệnh đề trần |
| **R10 Nội tâm** | **Lời kể nói thẳng** | **Vận động: nghĩ, đo, so, kết luận, lên kế hoạch. Chiếm phần lớn trang** |

**Luật:**

1. **Gián tiếp tự do toàn phần.** Không thẻ dẫn "anh nghĩ", "anh cảm thấy", "anh nhận ra", "anh biết rằng". Câu nội tâm đứng như sự thật của lời kể: *Là tại anh. Là của anh.* Ngôi giữ theo POV ("anh" với Thuyên). Ý nghĩ trực tiếp in nghiêng chỉ dùng ở chỗ đậm nhất.
2. **Tỷ lệ.** Ở nhịp R10 dẫn: khoảng một phần hành động, năm phần nội tâm, tính bằng chữ.
3. **Hành động là dấu câu.** Dòng hành động đứng thành đoạn riêng, chỉ động từ, không tính từ, bỏ chủ ngữ nếu bỏ được: *Nhặt bóng. Ngẩng lên.* Việc của nó: cắt giữa hai khối nghĩ, cho người đọc thở, đánh dấu thời gian trôi.
4. **Gọi tên cảm xúc thẳng, rồi xử lý nó theo cách của POV.** Thuyên: quy ngay ra bằng chứng (con số, buổi tập, bảng xếp hạng, lịch), tức bộ kết quả. POV khác xử lý theo giọng riêng đã có ở mục *Register theo POV interlude* (Nhi gọi tên đúng nhưng lý do sai; Diệp Anh đưa vào bảng phương án).
5. **Mỗi khối đi từ A đến B, không quay về A.** Phép thử: cắt một câu mà khối vẫn đi được thì câu đó thừa. Khuôn gợi ý cho Thuyên: ký ức → con số → so sánh → kết luận → kế hoạch.
6. **Nhịp câu theo trạng thái.** Đang thắng: câu dài, dồn, mệnh đề nối mệnh đề, như người đang tính nhanh và tính trúng. Bị chạm: câu đứt, có "—". Cạn: không còn khối.
7. **Tỷ lệ là chiếc đồng hồ.** Khi nhân vật mất (đứt, đáy), đảo tỷ lệ: dòng hành động dài ra, phẳng, liệt kê; khối nội tâm co lại rồi im. Người đọc nghe ra đầu nhân vật im trước khi lời kể kể chuyện gì đã xảy ra.
8. **Niềm tin chưa tự soi nằm trong ngữ pháp, không được tuyên bố.** Ví dụ niềm tin "thứ này sẽ ở với mình mãi": không viết "anh tin nó sẽ ở mãi". Viết lịch tương lai như thể chắc chắn (*mai, tháng sau, lên lớp mười một thì…*), câu định nghĩa ở thì hiện tại, không có mốc hết hạn. Tuyên bố thì người đọc thấy ngạo; ngầm định thì người đọc thấy ngây thơ, và thương.
9. **Người kể không biết hơn nhân vật.** Không "anh chưa biết rằng…", không bình, không sửa. Trớ trêu đến từ thứ người đọc đã biết ở chỗ khác (chương trước, POV khác, khung hiện tại).

**Ranh (giữ nguyên các luật khác):**
- **Phần cần giấu** (`01-rules-viet.md` *Nguyên tắc chung*; `goi-ten-cam-xuc.md` §2): R10 không gọi tên cảm xúc mà nhân vật chưa tự nhận. Với Thuyên từ quãng 2: **cái cần** (được ôm, được nghe, được ghi nhận vì đã cố) không vào khối nội tâm; nó chỉ hiện qua hành vi (cái gối; `_archive/tuyen/qua-khu/thuyen.md` §6.9 D, "nói giáp, giấu cái cần"). Nội tâm càng dày, chỗ trống ấy càng lộ. Ghi chú 13/11: cái cần là cụm C7 của [[CH.thuyen.beliefs]] (`seen: khong`); mở luật 11/11 cho C7 có độc thoại **cảm xúc**, không **nhận thức**, áp ở đêm say ([[X-011-001]]), không áp cho interlude quãng 2.
- **Chữ của nhân vật**, không thuật ngữ tâm lý, triết học. Thuyên: *khuyết, sửa, đủ, cây thước, đường thẳng, bài chạy quá một giây*.
- **TB-1** giữ: khối nội tâm của Thuyên được mở bằng chữ bộ chịu đựng chỉ ở cú cắt TB-12.
- **Câu hỏi hiện sinh** nằm trong khối R10 vẫn theo luật ngắn (1–3 câu) của `01-rules-viet.md`. **Chuỗi đi đủ đến *Vì vậy*** vẫn tối đa một mỗi chương hoặc interlude (*Văn phong trần tục của tự thoại*); các khối khác kết bằng một dòng hành động hoặc một lịch tương lai.
- **Sáu thao tác** dò, lật, tự sửa, bỏ lửng, dồn, rơi (`01-rules-viet.md` *Lời kể biểu cảm có chủ đích*) dùng được trong R10; R10 là chỗ tự nhiên của chúng.
- **Không tự thương thân:** gần chỗ thương thân thì lý lẽ cắt ngang.
- **Không chung nhịp với R8.** Chuyển bằng ngắt dòng hoặc `---` (§4.2).
- **Từ phức** (§0.5) áp cho khối nội tâm như mọi lời kể; dòng hành động là register ngắn (§6.3).

**Mẫu** (QK.T *Hoan hỉ*, lớp 10, bản thử; "thằng áo đỏ" là tên tạm):

> Quả thứ ba mươi mốt. Vào.
>
> Tay không mỏi. Ba tháng trước, đến quả thứ hai mươi là cổ tay đã run như cổ tay của người khác, và anh đã đứng nhìn nó mà ghét, ghét như ghét một đứa cùng bàn chậm hiểu. Giờ nó không run. Anh sướng. Sướng thật, nóng ran từ bụng lên hai bả vai, cái sướng mà cả xóm vẫn bảo nhà anh có mà anh chưa lần nào cầm được trên tay. Lần này cầm được. Lần này nó có số: ba mươi mốt quả, tay không run, bốn rưỡi sáng, chín mươi hai buổi.
>
> Nhặt bóng. Ngẩng lên.
>
> Thằng áo đỏ chống tay lên gối. Tháng mười nó cướp bóng của anh bốn lần trong một trận, lần nào cũng cười. Cái cười không ác, chỉ là cái cười của đứa chưa bao giờ phải nghĩ xem mình có được đứng ở đây không. Hôm nay không lần nào. Anh đếm, đếm hai lần cho chắc. Không lần nào. Nó tập sân thành phố, có anh Long chỉ, có đèn, có hội. Anh tập một mình, sân quê không đèn, Casio của bố chèn sợi chun. Vậy thì không phải tại sân. Không phải tại người chỉ. Là tại anh. Là của anh. Thứ anh làm ra bằng hai tay thì không ai cãi cùn được, không ai bảo "đề nó khó hơn", không ai cầm lên rồi đặt sang chỗ khác.
>
> Dắt bóng về giữa sân. Đổi tay. Không nhìn bóng.
>
> Mai bốn rưỡi lại ra. Tháng sau năm mươi quả. Lớp mười một thì vào đội trường, rồi giải tỉnh, rồi— anh không nghĩ hết, vì không cần nghĩ hết. Đường thẳng thì nhìn một đoạn là biết nó đi đâu. Anh đã vẽ nó bằng chín mươi hai buổi sáng. Nó sẽ không tự cong.

Cố ý:
- Tỷ lệ khoảng một phần hành động, năm phần nội tâm; dòng hành động đứng riêng, không tính từ.
- *Sướng* là điệp khúc của người ngoài ở quãng 1 ("nhà mi sướng"); lần đầu chữ ấy thuộc về anh.
- *Vậy thì không phải tại…* là khuôn của B.thuyen-030 (cũ NT-30: *Mình hơn nó rồi mà mạ vẫn nói nó hơn. Vậy là không phải tại điểm*) lật chiều: ngày trước để đau, giờ để chiếm hữu.
- Giây đầu nhìn quả bóng, giây sau ngẩng lên xem người kia (TB-3).
- Niềm tin "ở mãi" nằm trong lịch tương lai và câu *Nó sẽ không tự cong*, không được tuyên bố (luật 8).
- Cái cần không có trong khối nào.

#### 2.6.1 Áp dụng: QK.T interlude quãng 2 `[chốt 04/11]`

R10 là register nền của tám interlude cấp 3 (*Hoan hỉ* → *Phẫn uất*). R6 chỉ còn ở mảnh quả ngọt (một chi tiết giác quan) và chi tiết lóe. R9 bị cắt (§2.2) xuất hiện ở nhịp đi xuống. Nội dung cấp 3: `de-xuat/qk-t-cap-3-motif-lop-10.md`.

**Cung năm nhịp** (hướng tác giả 04/11, 13:16):

| Nhịp | Khối nội tâm làm gì | Kỹ thuật |
| --- | --- | --- |
| Vì đau mà cố | Biến cái đau thành kế hoạch ngay lập tức; tốc độ chuyển đổi chính là cái đau | Mở bằng chữ bộ chịu đựng, cắt, nối bằng danh sách khuyết – sửa (TB-12): *Gà— Không. Ném: tay mỏi ở quả ba mươi. Core: không hạ được trọng tâm. Ba khuyết. Sửa.* |
| Cố | Khối ngắn lại, gần như chỉ còn đếm | Con số, Casio, 4:30; thân thể trả giá ở dòng hành động, nội tâm không nhắc (§2.5-C). ADHD: thế giới lùi xa khi não vào việc ([[FN.thuyen.adhd]]) |
| Lần đầu nếm quả ngọt | Gọi tên trọn cảm xúc ở bên trong; mặt ngoài để yên (`goi-ten-cam-xuc.md` §1, điều kiện 2) | Viết chậm, một chi tiết giác quan (R6). Quả ngọt **nhỏ** (lần đầu thắng đúng người từng thắng mình; khoản tiền MMO đầu tiên), vì liều đầu ngấm sâu nhất (cơ chế nhờn thuốc, `storylines/README.md`) |
| So với cây thước | Mở sổ, xếp hạng người khác | Giây đầu nhìn vào việc (cái tôi lành), giây sau ngẩng lên xem ai đang nhìn (cái tôi độc, TB-3). Lập luận so sánh dùng lại khuôn của B.thuyen-030, lật chiều |
| Tin là ở mãi, vì là năng lực của mình | Lên lịch tương lai như thể chắc chắn | Luật 8: ngầm định trong ngữ pháp, không tuyên bố |

**Đồng hồ qua chuỗi** (luật 7):

| Interlude | Nhịp | R10 |
| --- | --- | --- |
| *Hoan hỉ*, *Hiếu thắng*, *Kiêu hãnh* | ↑ | Khối to dần, dài dần, lịch tương lai dày |
| *Tủi hổ* | ↓↓ | Khối vẫn chạy nhưng đứt giữa câu (R9 bị cắt); Ngạo lần đầu mất vỏ đùa |
| *Hụt hẫng* | ↓↓↓ | Đảo tỷ lệ: hành động phẳng, dài, liệt kê; nội tâm gần như im, chỉ còn dòng giáo án *vì sao: dễ* |
| *Biết ơn*, *Hy vọng* | ↑ | Khối quay lại, ngắn hơn, ít lịch tương lai hơn; lần đầu có câu hỏi thay câu khẳng định |
| *Phẫn uất* | ↑ đỉnh | Đi hết câu *Vì vậy, mình phải mạnh hơn nữa* (chuỗi *Vì vậy* duy nhất của interlude); vẫn là lịch tương lai, nhưng dựng trên nén |

**Khung hiện tại** (đầu, cuối mỗi interlude): giữ khung ngắn của chuỗi hồi tưởng. Cuối khung được đặt một vật cho thấy thứ vừa kể đã mất; người kể không nối (tinh thần TB-4).

#### 2.6.2 Ô đề xuất cho tuyến khác `[đề xuất]`

R10 là kỹ thuật dùng chung. Ma trận §3 hiện chỉ ghi R10 ở QK.T. Các ô dưới chờ session của tuyến ấy đề xuất và tác giả duyệt; khi duyệt thì ghi vào §3 (hoặc mục `voice` của node, khi ma trận chuyển sang node).

| Node × giai đoạn | Dùng R10 cho | Ghi chú |
| --- | --- | --- |
| `TH.LAB` GĐ2 | Độc thoại cái tôi độc ở các nấc leo | Vang quãng 2: cùng cung năm nhịp, quả ngọt là 50 triệu và cái ghế; khác ở chỗ cây thước giờ đặt lên kẻ thù đã bị tên lửa kéo xuống (`_archive/tuyen/qua-khu/thuyen-lang-kinh.md` §3.1). R9 rải trong khối (§2.2). Không chung nhịp với cảnh R8 áp chế. Phiên bản lý tưởng lóe trong khối: [[TEC.interiority.ideal-self]] |
| `GD.T` GĐ2 | Giỗ ông, khoe 50 triệu | Khối so sánh với cây thước của bố mẹ; đồng hồ đứt ở câu cãi cùn |
| `QK.N` (interlude Nhi) | Nhi nhìn vào trong | R10 bằng giọng Nhi: gọi tên đúng, lý do sai; dòng hành động có thể là dòng `:::phone` |
| `RM.TD` (interlude Diệp Anh) | Bảng tính phương án | R10 bằng giọng biên bản; khối đứt ở chỗ cô không viết trước |
| HP | Độc thoại "có khi nào" quay lại | Đồng hồ chạy lại sau R7, nhưng khối mở bằng câu hỏi thay vì lịch tương lai |

Không dùng R10 cho phần cần giấu: Thuyên với Nhi ở GĐ1 trước đêm say; Khải, Morpheus, Diệp Anh phía bên kia trước nhịp lật. Đêm say ([[X-011-001]]) cũng không dùng R10 (ràng buộc của bản nháp).

#### 2.6.3 Áp dụng: QK.T interlude quãng 1, nhịp tiêu cực `[chốt 04/11, 13:52]`

**Nguồn:** tác giả, 04/11 13:40: *"Thiết nghĩ nên áp dụng kĩ thuật viết này cho cả quãng c1, với 1 số thiết lập: nhịp bình dị, không có gì tệ xảy ra thì sử dụng văn phong cũ, nhịp tiêu cực thì sử dụng văn phong này. Nên phối hợp với kĩ thuật viết thể hiện sự tiêu cực đã có. Liên kết giữa 2 nhịp cũng vì thế thể hiện dc sự tương phản giữa cả 2."* Phạm vi: cả quãng 1 (*Sợ*, *Tiếc nuối*, *Nhục nhã*, *Hả hê*, *Trống rỗng*), kể cả hai bài đã đăng (13:44). Chuỗi plan: `ok` 13:52.

**Luật chia nhịp:**

| Nhịp | Register | Mắt đứa trẻ |
| --- | --- | --- |
| **Bình dị** (không có gì tệ xảy ra, kể cả mảnh ấm) | **R6** như cũ: mảnh giác quan, ngoại cảnh sống động, nội tâm ít. Mảnh ấm theo chất Thạch Lam (§2.5) | **Ra ngoài:** con thạch sùng, Sao Hôm, đĩa lạc |
| **Tiêu cực** | **R10** làm nền, ghép với bộ kỹ thuật tiêu cực đã có (`goi-ten-cam-xuc.md` §4a; R8 dư chấn; R9 ở khung; khuôn tràn §2.5-E) | **Vào trong:** thế giới co lại, đầu óc tràn ra |

Tương phản giữa hai nhịp nằm ở hai chỗ cùng lúc: **hướng nhìn** đổi từ ngoài vào trong, và **tỷ lệ** lật (nhịp bình dị phần lớn là giác quan, hành động; nhịp tiêu cực phần lớn là nội tâm, hành động chỉ còn nhát cụt).

**Ghép với bộ kỹ thuật tiêu cực, thứ tự trong một cảnh đỉnh:**

1. **Cảnh dựng** (§4a luật 4): lời người lớn vẫn nói đủ câu, giọng Hà Tĩnh. Ở đây luật 3 của R10 mở rộng: **câu của người lớn cũng là dấu câu**, cùng với dòng hành động. Mỗi câu người lớn là cò cho một khối nội tâm; đứa trẻ phản ứng theo từng câu bằng một khối.
2. **Khối nội tâm** gánh việc §4a giao: thân biết trước (§2.5-C) → gọi tên mãnh liệt bằng chữ trẻ con → dò, lật sai (`01-rules-viet.md`, *Lời kể biểu cảm*) → kết luận nhân sinh ở cuối khối. Kết luận này được nói như chân lý (§4a luật 3); luật 8 của R10 ("niềm tin chưa tự soi không tuyên bố") không chặn nó, vì đây là thứ đứa trẻ tự rút ra. Niềm tin nền nó chưa soi vẫn nằm trong ngữ pháp. (Bản 04/11 lấy ví dụ *giỏi thì được thương*; phương trình ấy bỏ 11/11. Niềm tin nền và chặng tuổi của nó: [[CH.thuyen.beliefs]], trường `age`.)
3. **R8 dư chấn** tách bằng `---`: chuỗi đếm, kiểm kê, dòng sổ. R10 và R8 không chung một nhịp (§0.6).
4. **Đêm, khuôn tràn với cái gối** (§2.5-E): bước "ý nghĩ chạy về nhu cầu" là nội tâm, nên R10 nối thẳng vào.
5. **R9** giữ chỗ cũ: khung hiện tại, cuối *Nhục nhã* (§2.2).

**R10 đổi giọng theo tuổi** (đi cùng đường mất lời, `goi-ten-cam-xuc.md` §4a luật 6; khớp bảng `existential` của [[CH.thuyen.voice]]):

| Lớp | Khối nội tâm |
| --- | --- |
| 1–2 | Câu ngắn, chữ đơn, tuyệt đối, phóng đại kiểu trẻ con. Cái cần nói trọn: *muốn mạ ôm* |
| 3–5 | Gọi tên mà miệng không nói. Dò ngây thơ (*Hay là…*), lật sai (*À. Hóa ra…*) |
| 6–9 | Lý luận *Nếu… thì…*. Gọi tên rồi tự gạt bằng bộ kết quả. Lớp 9 lần đầu đi hết *Vì vậy* (bài văn *Ước mơ của em*). Giọng chảy liền sang quãng 2 |

ADHD ([[FN.thuyen.adhd]]) đi trong khối: lúc trôi thì câu nhảy cóc, ý đứt bằng "—"; lúc gặp Toán thì câu chậm, gọn.

**Cái cần, khác quãng 2:** ở quãng 1, cái cần **được vào khối nội tâm** (lớp 1–5 nói trọn; lớp 6–9 gọi tên rồi gạt). Ở quãng 2 nó ra khỏi khối (§2.6 *Ranh*). Đọc liền chuỗi mười ba đêm, chữ "muốn được ôm" tắt dần; không câu nào giải thích.

**Đồng hồ hai quãng:** ở quãng 1 khối nội tâm to nhất lúc đau; ở quãng 2 to nhất lúc thắng, và im ở đáy (*Hụt hẫng*). Giọng trong đầu chuyển từ chỗ đau sang chỗ kiêu hãnh, rồi đến lúc cái đau không còn lời. Đây là đường mất lời đi đến cuối.

**Chuyển giữa hai nhịp:**
- **Bình dị → tiêu cực (R6 → R10):** không cầu nối, không câu dẫn cảm xúc. Một âm thanh hoặc một câu người lớn (kênh ký ức đau, §2.5-B) lật tỷ lệ ngay trong đoạn.
- **Tiêu cực → bình dị (R10 → R6):** qua dòng sổ R8 hoặc qua đêm, rồi `---`, mở bằng mùi hoặc ánh sáng ở xa. Câu mở không an ủi.
- Luật hai register một cảnh (§4.1 luật 4) giữ: R6 → R10 trong một cảnh là đủ hai; R8 dư chấn phải sau `---`.

**Liều:** tối đa hai cảnh đỉnh R10 dựng đủ mỗi interlude (trần hai đỉnh của `goi-ten-cam-xuc.md` §4a luật 7). Nhịp tiêu cực nhỏ hơn: một, hai khối. Mỗi interlude vẫn có ít nhất một mảnh ấm viết bằng R6 (§5).

**Mẫu** (lớp 1, bản thử; cắt trước trận đòn):

> Đèn tuýp kêu rè rè. Mạ ngồi đầu bàn bóc hành, vỏ hành rơi thành một đống nhỏ trên tờ báo cũ. Ngoài sân con gà mái cục cục đi tìm chỗ ngủ. Anh viết chữ "bà". Chữ thứ năm. Bút chì vừa chuốt, thơm mùi gỗ.
>
> "[[ht: Đưa mạ coi. || Đưa mạ xem.]]"
>
> Anh đưa.
>
> Mạ nhìn. Mạ không nói gì. Cái không nói gì ấy dài, dài như lúc chờ xe đò mà xe không tới, và cái bụng biết trước cái đầu: chữ hỏng rồi. Cái móc chữ a lại chọc lên dòng trên. Cả buổi rồi, mỏi rụng cả tay, mà cái móc vẫn tự chạy lên như con giun, anh có bảo nó chạy đâu. Sao tay người ta viết được mà tay mình không viết được. Hay là tay mình hỏng. Hay là mình hỏng.
>
> "[[ht: Chữ ni là chữ chi? || Chữ này là chữ gì?]]"
>
> Anh sợ. Sợ cả người, sợ đến cả hai bàn chân. Anh muốn mạ ôm. Muốn mạ bảo chữ xấu cũng được. Muốn—
>
> "[[ht: Nằm xuống. || Nằm xuống.]]"

Cố ý:
- Đoạn đầu R6, mắt nhìn ra ngoài (đèn, hành, con gà, mùi gỗ). Từ "Mạ nhìn" thế giới tắt, đầu đứa trẻ tràn ra: không cầu nối.
- Câu người lớn là dấu câu chen giữa các khối; dòng hành động chỉ có "Anh đưa."
- Thân biết trước ("cái bụng biết trước cái đầu"), dò ngây thơ (*Hay là…*), gọi tên mãnh liệt, cái cần nói trọn, bị cắt bởi câu người lớn.
- ADHD: cái móc chữ "tự chạy", anh không bảo nó.

**Hai bài đã đăng:** *Sợ*, *Tiếc nuối* phải soát theo mục này (nhịp tiêu cực viết lại sang R10). Chưa sửa; xem §8.

## 3. Ma trận register theo node × giai đoạn

Mỗi ô: **mặc định** · *được thêm*. Register ngoài ô dùng được nếu ghi ở cột `Register` của tình tiết; **R8, R9 ngoài ô cần tác giả duyệt**. Ô trống: node không có mặt. Ô "chờ" là node của session khác, do session ấy đề xuất.

| Node | MĐ | GĐ1 | GĐ2 | GÃY | HP |
| --- | --- | --- | --- | --- | --- |
| `QK.T` | `[sửa 28/10, 14:15]` Chỉ phần né: mảnh vụn, cảm xúc không chủ (`goi-ten-cam-xuc.md` §1a), một câu R9 xóa. `[chốt 01/11]` **Ba interlude đại học trước ch.5:** R6 nền · **R9** (khối giọng cái tôi độc) · **R8** (hủy diệt, hệ quả) | **Interlude quãng 1** `[sửa 04/11]`: nhịp bình dị **R6**; nhịp tiêu cực **R10** gọi tên mãnh liệt + nhân sinh quan (§2.6.3, §4a) · *R8* dư chấn · *R9* (cuối *Nhục nhã*). **Interlude quãng 2** `[sửa 04/11]`: **R10** (§2.6.1) · *R6* (mảnh quả ngọt) · *R9 bị cắt* | **R6** một dòng · *R8* (vang khuôn câu quãng 1) | **R6** · *R8* `[chốt 28/10]` | **R6** |
| `QK.N`, `QK.DA`, `QK.K` | R6 theo giọng POV | chờ | chờ | chờ | chờ |
| `RM.TN` | R1, R2 | **R1, R2** (ngôn tình, rom-com) | **R2, R3** · nốt lạnh | **R8** (anh định nghĩa Nhi là nguồn tin) · *R9* (đêm buộc tội) `[chốt 28/10]` | R7 → R2 |
| `RM.TD` | R2 | R2, R4 | R2, R3, R4 | R4 · *R8* | R7 |
| `RM.PN` | | R1, R2 (POV Phong) | R1, R2 | R2 | R1 |
| `TH.MO` | R4 mầm, R1 | R4 | | | |
| `TH.LAB` | | **R4**, R1 | **R4** · **R8** (áp chế: Thuyên gây đau) · *R9* (độc thoại cái tôi độc) `[chốt 28/10]` | **R4 nhanh, R8** `[chốt 28/10]` | R7 |
| `TH.MD`, `TH.T18` | | R4 | R4 | **R8** (blacklist, bảng giá người) `[chốt 28/10]` · R5 cho interlude Khải | R4 |
| `TH.LM` | | R4 | R4 | R4 · *R8* | R4 |
| `TH.DR` | | R4, R1 | R4 | R4 | R4 |
| `SL.VU` | R1 | R1 | R1 chua · *R9* (câu cố tình làm đau, rạn nứt) | *R8* | R7 → R1 |
| `SL.DT` | R1, R6 | R1 | R1 thưa dần | **R7, R8** `[chốt 28/10]` | **R7** (§2.3 ở đáy) → R1 |
| `SL.SAN`, `SL.HD` | | R1 | R1 | R1 | R1 |
| `GD.T` | R6 · *R8* (qua QK.T) | R1 (cuộc gọi tám giờ) | R1 chua · *R9* (giỗ ông, khoe 50 triệu) | **R8** `[chốt 28/10]` | R7 → thoại gọi tên (trị liệu) |
| `GD.N` | chờ | chờ | chờ | chờ | chờ |

Ô không ghi nhãn là `[chốt 28/10 · ủy quyền]` nếu có R8 hoặc R9, còn lại `[đề xuất]` (gom từ skill và bản đồ văn phong ch.8–38). Ô R10 cho các node khác: §2.6.2.

**Va chạm ở giao điểm:** theo luật thang của cây (`_archive/tuyen/README.md` §3, luật 1). Node giữ nhịp quyết register của nhịp ấy. Một nhịp R8 của TH.LAB không được kéo theo R8 sang nhịp RM.TN liền sau; chuyển bằng `---` (§4).

## 4. Luật chuyển

### 4.1 Nguyên tắc chung (giữ từ skill)

1. Đổi nhịp câu trước, đổi nội dung sau.
2. Cầu nối bằng vật.
3. Nốt lạnh cuối cảnh ngọt, nốt ấm cuối cảnh lạnh. **Ngoại lệ:** cảnh R8 ở TH.LAB GĐ2 và GÃY **không có nốt ấm**. Thiếu nốt ấm là triệu chứng.
4. Không quá hai register trong một cảnh. Cần thứ ba thì ngắt `---`.
5. Chuyển giữa cảnh dùng `---` cộng mốc giờ.
6. R3 bắt đầu đúng lúc hết tính toán.
7. Giấu manh mối R4 bên trong R1 hoặc R2.
8. Không biến cảnh đau thành trò đùa.

### 4.2 Các cặp

| Từ → sang | Cách chuyển |
| --- | --- |
| R4 → R2/R3 | Kết R4 bằng một quân domino hoặc một dòng sổ; mở bằng giác quan |
| R2/R3 → R4 | Kết bằng một câu nhân vật không nghe ra; mở R4 bằng giờ và một tài liệu |
| R1 → R4 | Một câu đùa hai lớp làm bản lề |
| R4 → R5 | Không chuyển trong chương; R5 là interlude riêng |
| R3 → R1 | Một câu thoại đời thường kéo về |
| Bất kỳ → R6 | Một vật ở hiện tại kéo ký ức; khung đóng nối lại |
| R4 → R7 | Không báo trước; đổ vỡ gọn một chương, R7 bắt đầu chương sau |
| **R6 → R8** | Mở bằng một mốc giờ và một sự việc trần ("Phích vỡ lúc sáu giờ mười."). Không câu dẫn cảm xúc. Ở QK.T quãng 1: R8 đến *sau* nhịp gọi tên, như dư chấn; ngắt dòng hoặc `---` |
| **R8 → R6 ấm** (QK.T) | Nốt ấm duy nhất là cái gối: nó chỉ ghi nhận sức chịu ("Mi chịu được tám cái"), không khen giỏi. Sau đó một dòng sổ sách |
| **R8 → R9** | Luôn qua `---` và đổi thời điểm (về khung, hoặc về đêm). Không cùng cảnh với lớp đứa trẻ |
| **R9 → bất kỳ** | Rơi về câu lễ phép hoặc hành động (bôi đen, xóa) |
| **R2/R3 → R8** (GĐ2) | Không cầu nối ấm. `---` + mốc giờ. Cái ngọt vừa xong và cái gắt liền sau đặt sát nhau để người đọc thấy hai mặt của cùng một người |
| **R4 → R8** (GÃY) | R4 gọn dần đến khi chỉ còn sổ; câu cuối của R4 là một con số |
| **R8 → R7** | Sổ cái hết mục để ghi. Một trang trống, hoặc một dòng không có số |
| **R6 → R10** (QK.T quãng 1, nhịp tiêu cực) `[chốt 04/11]` | Không cầu nối, không câu dẫn cảm xúc. Một âm thanh hoặc một câu người lớn lật tỷ lệ ngay trong đoạn: mắt đứa trẻ thôi nhìn ra ngoài (§2.6.3) |
| **R10 → R6** (QK.T quãng 1, về nhịp bình dị) `[chốt 04/11]` | Qua dòng sổ R8 hoặc qua đêm, rồi `---`; mở bằng mùi hoặc ánh sáng ở xa. Câu mở không an ủi |
| **R10 ↔ R6** (QK.T quãng 2) `[chốt 04/11]` | Ở mảnh quả ngọt: khối nội tâm dừng lại trên một chi tiết giác quan (R6), rồi khối sau đo nó ngay. Không quá một chi tiết giác quan mỗi khối |
| **R10 → R9 bị cắt** (QK.T quãng 2) | Khối đang dồn thì một câu bộ chịu đựng lọt vào, bị cắt bằng bộ kết quả (TB-12); khối R9 bị lý trí cắt giữa câu, rơi về một dòng hành động |
| **R10 → R7** (đáy, *Hụt hẫng*) | Đảo tỷ lệ (§2.6 luật 7): dòng hành động dài ra, phẳng, liệt kê; khối nội tâm co lại rồi mất. Không câu báo trước |
| **R10 → R8** | Không chung nhịp. Ngắt dòng hoặc `---`; R8 không có nội tâm |

### 4.3 Vang khuôn câu (QK.T → TH.LAB) `[chốt 28/10 · ủy quyền]`

Cách cho thấy đứa trẻ bị bắt nạt thành con quái vật mà người kể không cần nói gì: R8 ở GĐ2 **lặp nguyên khuôn câu** của người lớn quãng 1, giờ phát ra từ miệng hoặc đầu Thuyên.

`[sửa 04/11]` Vang khuôn câu thuộc **khí thải** (sau khi kế hoạch đại bại, nhắm vào người chứng kiến bị xếp nhầm thành mối đe dọa) và **răn** (người yếu sẵn, có điểm dừng). Không thuộc **tên lửa**: tên lửa là lập luận khách quan, gọn, sạch. Thuyên không áp chế người yếu sẵn vô cớ. Ba chế độ: [[FN.thuyen.lang-kinh]] (`_archive/tuyen/qua-khu/thuyen-lang-kinh.md` §3).
- Khuôn liệt kê tiện nghi + "sướng thế mà còn…".
- Khuôn đếm + "anh biết là ba, vì anh đếm".
- "Lì như cục đất", "Văn mà bảy": tối đa một câu gọi lại cho cả GĐ2, đặt ở nấc áp chế cao nhất.

Mỗi khuôn tối đa ba lần trong cả GĐ2. Lần đầu người đọc nhận ra; lần ba họ sợ.

## 5. Liều theo giai đoạn

- `[sửa 28/10, 14:15]` **MĐ:** phần né trước summit: mỗi chương ít nhất ba điểm né, leo thang trong tuần. Liều dưới đây áp cho **interlude quãng 1** (sau summit). `[sửa 04/11]` R6 ở nhịp bình dị, R10 ở nhịp tiêu cực (§2.6.3), gọi tên mãnh liệt. Mỗi chương ít nhất một cảnh đỉnh dựng đủ, tối đa hai đoạn gọi tên dồn (`goi-ten-cam-xuc.md` §4a luật 4, 7). R8 tối đa ba mảnh dư chấn mỗi chương. R9 tối đa một khối mỗi chương, không chương nào cũng có. Mỗi chương vẫn có ít nhất một mảnh ấm thật (Sao Hôm, bánh chưng, cái Casio): tương phản để cú đau rõ, không phải để xoa.
- **GĐ1:** R1, R2 dẫn (ngôn tình, rom-com); R4 mầm. Interlude quãng 2 của Thuyên `[sửa 04/11]`: **R10** nền (§2.6.1) · R6 ở mảnh quả ngọt · R9 bị cắt ở nhịp đi xuống.
- **GĐ2 nửa đầu:** R2, R3 nhiều; R4 có một tiếng ù nền mỗi chương. R8 bắt đầu ở TH.LAB theo nấc áp chế (mức 1: một câu; mức 2: một mảnh; mức 3: một cảnh).
- **GĐ2 nửa sau:** R4 dẫn; R8 thành cảnh; R9 rải trong độc thoại; R2, R3 là cảnh thở có nốt lạnh, đặt sát cảnh R8.
- **GÃY:** R4 nhanh, R8 thống trị; R5 cho interlude Khải; R9 ở đêm buộc tội.
- **HP:** R7 (đáy theo §2.3) → R1; độc thoại "có khi nào" quay lại.

## 6. Mẫu kỹ thuật (không phải chương canon)

Đại từ gọi nhân vật lúc nhỏ theo quy ước của ch.2–6 khi viết thật. Mẫu R10: §2.6.

### 6.1 QK.T, ruột phích và "nhà mi sướng" (R8 → R6 ấm, khung R9)

*Ghi chú 28/10, 13:22:* mẫu này viết trước luật §4a của `goi-ten-cam-xuc.md`. Khung R9 và dòng sổ vẫn đúng. Lớp đứa trẻ nay phải có cảnh nóng gọi tên trước (mẫu: `goi-ten-cam-xuc.md` §4a), R8 chỉ còn là dư chấn.

> Phích vỡ lúc sáu giờ mười. Ruột phích tráng bạc, vỡ thành những mảnh mỏng như vảy cá. Nước sôi chảy theo khe gạch về phía chân bàn.
>
> Roi mây treo trên cái đinh cạnh cửa buồng. Bố lấy xuống mất hai giây. Thuyên biết là hai giây vì Thuyên đếm.
>
> Một. Hai.
>
> Roi thứ nhất vào bắp chân. Roi thứ hai vào bắp chân. Roi thứ ba lệch lên mông, vì Thuyên nhảy. Nhảy thì bị thêm. Thuyên biết thế. Chân không biết.
>
> "[[ht: Lì như cục đất. || Lì như cục đất.]]"
>
> Bảy roi. Có thể tám. Cái thứ tám Thuyên không chắc, vì lúc ấy Thuyên đang nhìn một mảnh ruột phích dưới chân bàn. Nó sáng quá.
>
> Tối, bác gái sang chơi. Bác ngồi ghế nhựa, bóc quýt, nhìn quanh nhà.
>
> "[[ht: Nhà mi sướng rứa còn chi nữa. Ti vi to, tủ lạnh to. Bác bằng tuổi mi là đi chăn trâu rồi. || Nhà cháu sướng thế còn gì nữa. Ti vi to, tủ lạnh to. Bác bằng tuổi cháu là đi chăn trâu rồi.]]"
>
> Nhà có ti vi. Có tủ lạnh. Có cá kho. Có xe máy. Có cái roi mây trên cái đinh cạnh cửa buồng. Nhà đủ cả.
>
> Mạ cười. Bố cười. Bác đưa cho Thuyên một múi quýt.
>
> "[[ht: Cảm ơn bác đi. || Cảm ơn bác đi.]]"
>
> Thuyên cảm ơn bác.
>
> Đêm. Bắp chân nóng. Thuyên nằm nghiêng, vì nằm ngửa thì rát. Vỏ gối có mùi nước miếng cũ.
>
> Gối nói: *Tám cái. Mi chịu được tám cái.*
>
> Sáng mai phải mua phích mới. Tiền phích trừ vào tiền ăn sáng của Thuyên, một tuần.
>
> ---
>
> *(khung hiện tại, tuần trước summit)*
>
> :::editor Bai_phat_bieu_v4.md
> Sướng. Cả cái huyện ấy nói chữ sướng như nói chữ ăn cơm. Sướng vì có ti vi, sướng vì có tủ lạnh, sướng vì không phải chăn trâu. Bố ngày xưa khổ hơn, mạ ngày xưa khổ hơn, bác ngày xưa khổ hơn, cả một thế hệ đem cái khổ của mình ra làm thước, đặt lên lưng một thằng bé, đo thấy chưa tới vạch, rồi kết luận: sướng. Cái thước ấy có đúng hai vạch, đói với no, rét với ấm. Không có vạch nào cho chuyện một đứa trẻ cắn gối mỗi tối mà cả nhà không ai biết, vì biết thì phải hỏi, hỏi thì phải nghe, nghe thì lỡ mất thời sự. Đm. Thôi. Người ta tử tế lắm. Người ta cho ăn, cho mặc, cho cả múi quýt. Mà con có thiếu gì đâu. Con có đề tài cấp quốc gia, có bài nói mười phút, có ba dòng tiểu sử không dòng nào sai.
> :::
>
> Anh bôi đen cả đoạn. Xóa. Gõ lại:
>
> :::editor Bai_phat_bieu_v4.md
> Em xin cảm ơn gia đình đã luôn là chỗ dựa cho em.
> :::

Cố ý:
- Khối R9 kết bằng lời phủ nhận bằng bộ kết quả (TB-1), gọi lại "ba dòng, không dòng nào sai" của ch.2.
- Lớp đứa trẻ là R8 thuần; lớp R9 nằm ở khung, là chữ anh gõ ra rồi xóa. Người kể không phán xét câu nào.
- "Cảm ơn bác" ở quá khứ và câu cảm ơn trong bài phát biểu là một khuôn.
- Cái gối chỉ ghi nhận sức chịu, không khen giỏi (luật cái gối, `qua-khu/thuyen.md` §6.3).
- Câu kết của mảnh quá khứ là một dòng sổ sách.

### 6.2 TH.LAB GĐ2, vang khuôn câu (R8, Thuyên gây đau)

> Máy lạnh hai lăm độ. Lương tháng tám triệu. Bốn con GPU. Một người ngồi cạnh sửa cho từng dòng code.
>
> "Sướng thế mà còn sai à?"
>
> Cậu thực tập sinh ngồi im. Lần thứ ba trong tuần. Thuyên biết là ba, vì Thuyên đếm.

Không có nốt ấm sau cảnh này (§4.1 luật 3). Người bị áp chế để trống tên ở mẫu; ai là người ấy chờ tác giả (đề xuất cũ: không phải Thảo).

`[sửa 04/11]` **Mẫu này phải đổi mục đích** ([[FN.thuyen.lang-kinh]]; `_archive/tuyen/qua-khu/thuyen-lang-kinh.md` §3): cậu thực tập sinh không bị áp chế chỉ vì yếu. Chọn một trong hai: **khí thải** (cảnh đứng ngay sau một lần kế hoạch của Thuyên đại bại; người nghe bị xếp nhầm thành mối đe dọa) hoặc **răn** (thấy phần yếu của mình ở cậu ta → mảnh hồi tưởng bật theo §2.5-B → câu răn kiểu *"Mày cứ sống như thế thì mày yếu mãi thôi"* → điểm dừng là một hành động). Session TH chọn.

### 6.3 Từ phức ở register ngắn `[chốt 10/11]`

Ngắn, phẳng, vỡ là nhịp và cấu trúc câu; từ phức giữ nhịp ấy mà mỗi chữ chở nhiều nghĩa hơn (`01-rules-viet.md`, *Từ phức là đa số*). Mẫu kỹ thuật, không phải canon.

**R8 Sổ cái** (QK.T). Bản từ đơn: *Bố lấy roi. Một. Hai. Ba. Phích trên bàn. Tám. Mạ dọn cơm.*

> *Bảy giờ tối. Thời sự vừa hết phần dự báo thời tiết. Bố rút cây roi mây khỏi khe tủ, đúng vị trí cất giữ hằng ngày.*
>
> *Một. Hai. Ba.*
>
> *Ruột phích trên bàn phản chiếu ánh đèn huỳnh quang.*
>
> *Bốn. Năm. Sáu. Bảy. Tám.*
>
> *Mạ dọn mâm cơm, sắp bát đũa theo thứ tự quen thuộc.*
>
> *Kiểm kê cuối ngày: tám roi, hai bát cơm, một phích nước còn nguyên vẹn.*

"Vị trí cất giữ hằng ngày", "thứ tự quen thuộc", "kiểm kê" nói bạo lực là thói quen (luật 2); không tính từ chỉ đau; kết bằng dòng sổ sách.

**R7 Đáy.** Bản từ đơn: *Anh nằm. Trần trắng. Máy rung. Anh không xem.*

> *Anh nằm nguyên tư thế từ buổi chiều. Trần nhà là một mặt phẳng không có chi tiết. Điện thoại rung; màn hình hiển thị một cái tên. Anh nhìn cái tên như nhìn một dãy ký tự. Thông báo tự động biến mất. Căn phòng trở lại trạng thái ban đầu.*

Phẳng, gần như không tính từ; "một dãy ký tự" làm việc "thấy mà không đọc": cái tên người thân bị hạ xuống thành dữ liệu.

**R3 Thân mật** (Thuyên – Nhi, đêm say). Bản từ đơn: *Cô dựa vào vai anh. Tóc thơm. Anh không thở.*

> *Cô ngả đầu vào bờ vai anh, chậm rãi, như một quyết định đã được cân nhắc từ lâu. Hơi thở ấm áp chạm vào cổ áo. Anh giữ nguyên tư thế. Nhịp tim lệch khỏi quỹ đạo, rồi…*
>
> *"Ừm."*
>
> *Mùi hương dịu nhẹ, quen thuộc đến mức…*

Vỡ hai lần; thoại là một âm thanh; "như một quyết định đã được cân nhắc từ lâu" cho thấy Nhi chủ động mà không gọi tên cảm xúc; nhịp tim là thân thể (luật POV Thuyên).

## 7. Soát nhanh trước khi nộp

- Mỗi cảnh ở register nào? Ô ma trận của node chủ, giai đoạn ấy có cho phép không?
- R8, R9 nằm ngoài ô thì đã có tác giả duyệt chưa?
- Mảnh R8: có tính từ chỉ đau không? Có chuỗi đếm hoặc kiểm kê không? Câu kết là sổ sách hay câu đúc kết?
- Khối R9: là giọng Thuyên hay đã trượt thành người kể phán xét? Có gọi tên cảm xúc của anh không? Kết bằng câu lễ phép hoặc hành động chưa?
- Cảnh ngọt GĐ2 có nốt lạnh chưa? Cảnh R8 GĐ2 có lỡ thêm nốt ấm không?
- Khuôn vang (§4.3) đã dùng mấy lần trong GĐ2?
- Thiết bị bắt buộc của ô (§2.4) đã có trên trang chưa? Có câu nào thuộc bộ chịu đựng nói với Thuyên trước HP không (TB-1)?
- Khối R9 có kết bằng lời phủ nhận không?
- Cảnh đỉnh của QK.T có đi đủ năm lớp của §2.5 không? Ký ức đau có lỡ mang mốc thời gian, ký ức ấm có lỡ thành mảnh vụn không? R9 có đứng trước khi R8 đặt đủ sự việc không (luật đủ)?
- QK.T quãng 1 (`goi-ten-cam-xuc.md` §4a): cảnh đỉnh có dựng đủ (thời gian tâm lý, lời người lớn nói đủ câu) hay đang tóm? Cảm xúc có được gọi tên mãnh liệt bằng chữ của đứa trẻ không? Có kết luận nhân sinh đúng chặng hiện sinh của tuổi (`CH.thuyen.voice` mục `existential`) không, và có vượt sự việc trên trang không? R8 có đứng sau nhịp gọi tên, như dư chấn, không? Khung hiện tại có khô quá mức so với §1 không?
- Từ phức (§0.5): lời kể, tự thoại, độc thoại có chuỗi từ một âm tiết kéo dài mà một từ ghép hoặc từ láy chở được nghĩa sâu hơn không? Đã đổi từ mà vẫn giữ nhịp ở R3, R7, R8 chưa? Từ đơn còn lại có phải nhịp cụt, câu chốt, chửi, âm đệm có chủ đích không? Ngoại lệ vẫn đứng: thoại tự nhiên, câu trích, từ vựng Thuyên dùng nguyên văn (*khuyết, sửa, đủ, chấm…*), *bố mẹ*, *sự công nhận*, *nó* ở POV Thuyên.
- Nhịp R10 (§2.6): có thẻ dẫn "anh nghĩ, anh cảm thấy, anh nhận ra" nào lọt vào không? Tỷ lệ hành động : nội tâm có gần 1 : 5 không? Dòng hành động có tính từ không? Mỗi khối có đi từ A đến B không, cắt câu nào mà khối vẫn đi được? Niềm tin chưa tự soi có bị tuyên bố thay vì nằm trong ngữ pháp không? Người kể có biết hơn nhân vật không? Cái cần của Thuyên có lọt vào khối nội tâm không? Ở nhịp mất, tỷ lệ đã đảo chưa?
- QK.T quãng 1 (§2.6.3): nhịp bình dị có còn là R6 nhìn ra ngoài không, hay đã lỡ trượt sang nội tâm? Nhịp tiêu cực có lật sang R10 không cầu nối không? Câu người lớn có nói đủ câu và làm cò cho từng khối không? R8 dư chấn có tách bằng `---` không? Giọng khối có đúng tuổi không? Interlude có quá hai cảnh đỉnh R10, và có thiếu mảnh ấm R6 không?
- Danh sách lặp phải đếm: xem skill `den-vang-van-phong` §5.

## 8. Còn chờ

- Ô "chờ" của QK.N, QK.DA, QK.K, GD.N; mức R8 có được dùng ở quá khứ Nhi (vụ Thảo, *Đỏ sẫm*) không: session RM hoặc kiến trúc đề xuất.
- Người bị áp chế ở TH.LAB GĐ2 và ba nấc áp chế cụ thể: session TH.
- Skill `den-vang-van-phong`, `den-vang-pipeline`, `den-vang-tong-hop-cach-viet` cần cập nhật theo §2.4 (đề xuất qua thẻ lưu skill, 28/10). `[thêm 04/11]` và theo R10 (§2.6); trong lúc chờ, file này thắng.
- TB-10 (câu gương) chờ tác giả chọn H7 mở rộng hay H9.
- `[thêm 04/11]` Ô R10 cho các node ngoài QK.T (§2.6.2): session từng tuyến đề xuất, tác giả duyệt.
- `[thêm 04/11]` **Soát hai interlude đã đăng theo §2.6.3:** *Sợ* (`content/v2/`, lớp 1–2) và *Tiếc nuối* (lớp 3): đánh dấu nhịp bình dị và nhịp tiêu cực, viết lại nhịp tiêu cực sang R10 ghép §4a. Chưa sửa; chờ tác giả gọi.
- `[thêm 13/11]` R1–R9 chưa có file `REG.*` trong thư viện; chỉ R10 có ([[REG.noi-tam]]).
