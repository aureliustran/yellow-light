---
id: CH.thuyen.voice
kind: character
status: locked
updated: 2026-11-10
aliases: [giọng Thuyên, giọng nền Thuyên]
exports: []
parent: "[[CH.thuyen]]"
sources: [01-rules-viet.md (Giọng của Thuyên theo đối tượng; Tự thoại hiện sinh, chốt 18/10; Lời kể biểu cảm có chủ đích, chốt 18/10; Văn phong trần tục, chốt 19/10), _archive/tuyen/qua-khu/thuyen-cai-toi-doc-co-che.md §4.6, rules/registers.md]
---
# CH.thuyen.voice · Giọng nền của Thuyên

Tầng thấp nhất của chuỗi giọng: tình tiết > node × giai đoạn > `SELF.thuyen` × giai đoạn > **giọng nền (file này)**. Giọng với từng người cụ thể (Nhi, Vũ, Diệp Anh, lab) là của node quan hệ, không ở đây. Kỹ thuật viết chi tiết sẽ thành `TEC.*` ở `lib/` (B4–B7); file này chỉ tả giọng.

**Mục:** `dialogue` · `narration` · `lexicon` · `forbidden`.

## dialogue

**Nền: tinh ý thì không lạnh** `locked`. Không bao giờ lạnh lùng hay cộc; nói vừa đủ.

- Mỗi lượt thoại hai lớp: phần cần nói + một lớp người (đồng cảm: nói trúng điều đối phương chưa nói ra; hoặc chọc ngoáy: một câu trêu, một cú mỉa nhẹ). Thường một đến ba câu ngắn.
- Tránh câu trơ trọi một chữ ("Ừ.", "Không.") đứng một mình, trừ khi có chủ đích (né, căng, giấu, nhịp hài) và cảnh cho thấy chủ đích ấy.
- Né tránh không đồng nghĩa với cộc: né tránh bằng câu đùa, trả lời một nửa, chuyển hướng đề tài nhẹ nhàng; chỉ người tinh ý mới nhận ra đó là né tránh.
- Tin nhắn: viết tắt, không dấu câu chuẩn, nhưng không trả lời như bot.
- Kiểm nhanh: bỏ câu này đi, người đối diện có thấy anh lạnh không? Có thì thêm lớp người. Quá ba câu mà không giảng bài, không cãi thì cắt.
- Ngoại lệ có chủ đích: giai đoạn biến chất (cụt dần với người thân), trầm cảm (nói ít vì cạn), lúc cố tình làm đau. Khi đó cụt là tín hiệu.

**Theo loại người** (đổi giọng theo người là cách người đọc thấy năng lực đọc người, không cần kể):

| Loại | Giọng |
| --- | --- |
| đàn em | dịu dàng, nâng đỡ, góp ý cụ thể |
| bạn thân con trai | chửi thẳng, thân, lầy bựa; không mỉa |
| con trai chưa thân | thẳng, nhẹ hơn một nấc |
| người lạ làm anh không vừa ý | mỉa, cay ngầm, đủ chích mà không đủ để đối phương nổi khùng |
| người lớn | lễ phép, kiên nhẫn, chịu nghe |
| chỗ làm | mỗi người một giọng: ngọt với sếp, sắc và hùa theo với đồng nghiệp |
| khi vụng việc nhỏ | tự giễu, đùa cho qua |

**Meme trẻ con** với người thân: "six seven", "aura farming", gọi người khác là "kid", vuốt xương hàm tự nhận "sigma", "gg fvcking ez".

**Giọng trong đầu của cái tôi độc** (thằng bé ở cột lớp một, gọi nó là *mày*): thuộc [[FN.thuyen.phong-kin]], không phải giọng nền.

## narration

Người kể đi theo Thuyên bằng gián tiếp tự do. Ba lớp:

1. **Tự thoại hiện sinh** `locked 18/10`, chỉ của Thuyên. Một đến ba câu; câu hỏi không có trả lời hoặc mệnh đề trần; ngầm trả lời *mình đáng giá bao nhiêu khi…*; trục: đủ · thước · chạy · rỗng · vô hình · thời gian. Đứng trên một chi tiết cụ thể vừa xảy ra. Vênh với lời kể: lời kể khô, tự thoại lộ chỗ đau, không bao giờ ngược lại. Tới gần chỗ thương thân thì "chắc ai cũng thế" cắt ngang. Đặt ở cảnh rảnh, ngay sau thắng, đêm muộn, lúc vừa rời đám đông; không giữa cảnh đấu trí, hài, thân mật. Mật độ: mạch hiện tại tối đa một đến hai câu một chương; chương quá khứ ba đến năm câu.
2. **Lời kể biểu cảm có chủ đích** `locked 18/10`: được ngập ngừng như người nói, nhưng mỗi lần phải dẫn cảm xúc người đọc đi đâu đó. Sáu thao tác: *dò* · *lật* (cú lật đắt nhất là cú lật sai) · *tự sửa* · *bỏ lửng* · *dồn* · *rơi*. Không quá hai dấu chấm lửng một đoạn.
3. **Văn phong trần tục** `locked 19/10`, gốc từ bài văn *Ước mơ của em* (lớp 9): câu khẳng định, không rào, không than; từ nhà trường phẳng (*công nhận, kết quả, hiệu quả*); chuỗi tiền đề chung → trường hợp của mình → hệ quả; tự đặt mình vào như một dữ kiện; kết bằng *Vì vậy* + một quyết định ngược với điều mình muốn; nỗi đau nằm trong logic.

**Theo giai đoạn** (giá trị theo giai đoạn thuộc `SELF.thuyen`, B3c): tự thoại từ hỏi ngây thơ về vũ trụ (lớp 3–7) → lần đầu hỏi về cây thước (lớp 11) → lời thề lạnh (lớp 12) → vô hình giữa đám đông (đại học) → tự đẻ việc (P1) → thưa dần, thay bằng danh sách (P2) → quay lại dồn dập (đổ vỡ). Dò/lật: nhiều và ngây thơ (mầm non – lớp 5) → lý luận (lớp 6–9) → ít dò, *À.* (lớp 10–12) → cú lật biến mất (đại học → lab) → dò quay lại mà không có *Hóa ra* nào đến (đổ vỡ).

## lexicon

- **Hệ giá trị** (dùng thẳng, không paraphrase): *khuyết, sửa, sửa xong, đủ, chưa đủ, không bao giờ đủ, cây thước, chấm, kẻ thất bại, phía trước*.
- **Thiên văn:** quỹ đạo, ngôi sao đã chết, vũ trụ to ra vào cái gì, Sao Hôm không phải sao.
- **Lập trình:** vòng lặp không có điều kiện dừng, hàm không trả về gì, bài chạy quá một giây là không điểm, báo lỗi rồi đợi sửa.
- **Đồ vật của quá khứ:** tủ kính, vỏ gối, bể nước, cái Casio dây rộng.
- **Đơn vị bún riêu:** quy tiền ra bát bún riêu `proposed`.
- **Gọi Khánh là "nó"** `locked 10/11`: trong tự thoại và lời kể POV Thuyên, em trai là *nó*, không phải *em*.
- **Công nhận, thừa nhận thay cho khen** `locked 10/11`: trong tự thoại và lời kể POV Thuyên, lời khen là *sự công nhận*, *sự thừa nhận*; *khen* là *công nhận*, *thừa nhận*.
- Hai bộ từ vựng (DV-001): **bộ kết quả** (giỏi, mười, giải, thứ mấy, khuyết, sửa, đủ, chấm) là tiếng của thế giới và cái tôi; **bộ chịu đựng** (cố, chịu, mấy cái…) bị khóa, chỉ cái gối dùng (xem [[FN.thuyen.cai-goi]]).

Câu hiện sinh của anh nghe như một kỹ sư nhìn lên trời, không như một triết gia.

## forbidden

- Thuật ngữ tâm lý, triết học trong lời kể, tự thoại: "hiện sinh", "vô nghĩa", "trống rỗng", "trầm cảm", "giá trị bản thân", "cầu toàn", "tự ti"; không trích triết gia. Tên bệnh để đến cuối Phần 1.
- Gọi tên tình cảm với Nhi hay Diệp Anh trong câu hiện sinh (phần cần giấu).
- Độc thoại dài, triết luận; câu hỏi lớn thay cho chi tiết.
- "Ngầu cụt lủn" kiểu nam chính lạnh lùng.
- Tả hành vi quan sát khi đọc người (tiếng dép, tiếng bát, nét mặt): năng lực chỉ lộ qua cái anh nói và cái anh nghe ra.
