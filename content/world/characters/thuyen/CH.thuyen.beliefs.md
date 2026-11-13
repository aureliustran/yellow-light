---
id: CH.thuyen.beliefs
kind: character
status: agreed
updated: 2026-11-13
aliases:
  - niềm tin Thuyên
  - NT Thuyên
exports:
  - "[[B.thuyen-001]]"
  - "[[B.thuyen-002]]"
  - "[[world/characters/thuyen/CH.thuyen.beliefs#B.thuyen-003]]"
  - "[[B.thuyen-004]]"
  - "[[B.thuyen-005]]"
  - "[[B.thuyen-006]]"
  - "[[B.thuyen-007]]"
  - "[[B.thuyen-008]]"
  - "[[B.thuyen-009]]"
  - "[[B.thuyen-010]]"
  - "[[B.thuyen-011]]"
  - "[[world/characters/thuyen/CH.thuyen.beliefs#B.thuyen-012]]"
  - "[[world/characters/thuyen/CH.thuyen.beliefs#B.thuyen-013]]"
  - "[[B.thuyen-014]]"
  - "[[world/characters/thuyen/CH.thuyen.beliefs#B.thuyen-015]]"
  - "[[B.thuyen-016]]"
  - "[[B.thuyen-017]]"
  - "[[B.thuyen-018]]"
  - "[[world/characters/thuyen/CH.thuyen.beliefs#B.thuyen-019]]"
  - "[[B.thuyen-020]]"
  - "[[B.thuyen-021]]"
  - "[[B.thuyen-022]]"
  - "[[B.thuyen-023]]"
  - "[[B.thuyen-024]]"
  - "[[B.thuyen-025]]"
  - "[[B.thuyen-026]]"
  - "[[B.thuyen-027]]"
  - "[[B.thuyen-029]]"
  - "[[B.thuyen-030]]"
  - "[[B.thuyen-031]]"
  - "[[B.thuyen-032]]"
  - "[[B.thuyen-033]]"
  - "[[B.thuyen-034]]"
  - "[[B.thuyen-035]]"
parent: "[[CH.thuyen]]"
sources:
  - "_archive/tuyen/qua-khu/README.md §4"
  - "_archive/tuyen/qua-khu/thuyen.md §1, §4, §6"
  - "_archive/tuyen/qua-khu/thuyen-hai-cai-toi.md §11"
  - "_archive/tuyen/qua-khu/thuyen-da-nhan-cach.md §7"
  - "_archive/tuyen/qua-khu/thuyen-cai-toi-doc-co-che.md §4.5"
  - "[[de-xuat/qk-t-plan-viet-lai-quang-1-v3|de-xuat/qk-t-plan-viet-lai-quang-1-v3.md §0]]"
---
# CH.thuyen.beliefs · Niềm tin của Thuyên

**Luật của gói** `locked 10/11`: tình thương, nhu cầu được ôm và nỗi cô độc luôn `seen: khong` suốt Phần 1; chúng thuộc AX7 và AX8, và lộ qua hành vi (cái gối, những đêm khóc). Mở luật 11/11 (tác giả): cụm C7 được có độc thoại thể hiện **cảm xúc** của anh, không bao giờ thể hiện **nhận thức** về nhu cầu; không có niềm tin đánh số nào trong cụm (xem *Khuếch đại ở đêm say*). `seen: khong` chỉ là nhân vật không nhìn thấy; người đọc vẫn được kể (lời kể, chi tiết, POV người khác) theo luật giấu hay nói. Lần đầu anh nói thành lời là ở hồi phục (ứng viên: *"Con tưởng giỏi thì được thương."*).

Mỗi niềm tin là một mục `### BL-NNN`. Mã cũ `NT-nn` là alias (`NT-24` = `B.thuyen-024`). `consumed-by` sẽ sinh từ trường `beliefs` của tình tiết; cột *Tiêu thụ* dưới đây chép từ nguồn cũ, giữ tới khi tình tiết chuyển xong.

**Mã** `locked 11/11` (tác giả): `B.<id nhân vật>-<số>`; số đếm riêng trong từng nhân vật, nên thêm niềm tin cho một người không đẩy số của người khác. Mã cũ: `BL-001…035` → `B.thuyen-001…035` (giữ số); `BL-040…045` → `B.nhi-001…006`; `BL-050` → `B.vu-001`. Số `028`, `036`, `037` của Thuyên không dùng.

Trạng thái: `agreed` cho NT-01 … NT-10 (đã lên trang ở bản v2 cũ, nay ở `_archive/`, sẽ kể lại ở interlude quãng 1); còn lại theo nguồn. Mặt kia (`other-face`) chưa có trong nguồn cho phần lớn niềm tin: ghi `none`, điền khi chuyển PAST.T.

**Ranh giới với value** `locked 13/11` (tác giả): niềm tin là kết luận rút ra sau một kết quả, một khẳng định có thể sai, dùng để độc thoại và tự soi. Tiêu chí dùng trước một hành động (cái gì đáng hơn cái gì) là value, nằm ở gói value của nhân vật. Niềm tin không trỏ tới value; value trỏ về niềm tin. Cách đối phó (hàm, tư duy đối phó, hành động) là method: nằm ở `mechanics/`, sinh từ `tactics` của một value và trỏ về value ấy. B.thuyen-004, 005, 011, 020, 025 chỉ còn giữ số. Định nghĩa: `schemas/belief.md`, `schemas/value.md`.

**Cụm** `agreed 10/11`: niềm tin gom theo câu hỏi anh tự trả lời, không theo trục. Mỗi cụm có câu hỏi, gốc, trục và một định nghĩa chung; trong cụm, niềm tin xếp theo tuổi. Niềm tin thuộc hai cụm có một cụm chính, cụm kia ghi ở trường `cluster`.

## C1 · Công nhận

- **question:** Giá trị của mình do đâu mà có?
- **root:** B.thuyen-024
- **axes:** AX7, AX5
- **definition:** Giá trị con người được cấp từ bên ngoài, qua sự công nhận; người cấp là người cầm thước. Anh dịch nhu cầu được thương thành nhu cầu được công nhận, và từ cấp 2 giành sự công nhận bằng cái cân của mình. Đây là chỗ của AX5 (định giá): ai có quyền đặt giá cho anh.
- **members:** [[B.thuyen-024]], [[B.thuyen-004]], [[B.thuyen-017]], [[B.thuyen-023]]

## C2 · Cái cân

- **question:** Mình đo bằng gì?
- **root:** B.thuyen-021
- **axes:** AX3
- **definition:** Phép đo khách quan anh tự làm và tự chọn mục tiêu: phần lành của cái tôi, và cũng là chỗ nỗi sợ góp tay đặt vạch đích ([[ART.AX3]]).
- **members:** [[B.thuyen-005]], [[B.thuyen-021]], [[B.thuyen-030]], [[B.thuyen-010]], [[B.thuyen-035]], [[B.thuyen-020]], [[B.thuyen-007]], [[B.thuyen-034]]

## C3 · Lời nói

- **question:** Lời mình có giá trị không?
- **root:** B.thuyen-001
- **axes:** AX7, AX9, AX4
- **definition:** Lời của anh bị trừ giá trị vì người nói là anh; từ đó anh im, giấu, nói vòng, hỏi chọn lọc, hoặc leo lên chỗ cao để lời mình thành luật.
- **members:** [[B.thuyen-001]], [[B.thuyen-026]], [[B.thuyen-033]], [[B.thuyen-006]], [[B.thuyen-008]], [[B.thuyen-009]]

## C4 · Mặt nạ

- **question:** Mình được phép để lộ gì?
- **root:** B.thuyen-022
- **axes:** AX4, AX8
- **definition:** Phần thật nhất của anh bị dùng để làm anh đau, nên anh đeo mặt nạ vô cảm, đùa, phủ nhận; đeo đủ lâu thì tin đó là mặt thật.
- **members:** [[B.thuyen-022]], [[B.thuyen-011]], [[B.thuyen-014]], [[B.thuyen-032]], [[B.thuyen-025]]

## C5 · Sức mạnh

- **question:** Làm sao để không bị đau?
- **root:** B.thuyen-029
- **axes:** AX9
- **definition:** Không ai được chọn có đau hay không, chỉ được chọn đau cái nào; sức mạnh là cách chọn. Bản độc là đè người khác; bản lành là nâng người khác lên.
- **chặng thuốc giảm đau** `locked 10/11`: không cần niềm tin riêng; cặp lực đẩy (B.thuyen-029) và lực kéo (B.thuyen-034) gánh chặng này. Mỗi lần mạnh lên, nỗi sợ thành người đau cho lợi ích kẻ khác lắng xuống một lúc (cái bớt đau); phiên bản lý tưởng đổi hình theo mục đích, nên đạt được thứ này thì vạch đích mới hiện ra ngay. Hai lực cùng mạnh khi anh tính toán hoặc tham vọng (`luc-keo`, `luc-day` của [[SELF.thuyen]]): đẩy lắng rồi quay lại, kéo dời vạch; hai nhịp ấy là tăng liều. Ở P2 anh không thấy mình nhờn thuốc, vì anh tưởng mọi thứ là lực kéo (G3). **Ở lại nơi mình là kẻ mạnh:** khi đẩy lấn át, anh chọn chỗ ít rủi ro đau nhất; ở P2 mọi vạch đích của lực kéo nằm trong cùng một đấu trường (tập đoàn), nên kéo không đưa anh đi chỗ khác. Cơ chế: [[FN.thuyen.nhien-lieu]].
- **members:** [[B.thuyen-029]], [[B.thuyen-027]], [[B.thuyen-031]], [[B.thuyen-016]]

## C6 · Thứ mình yêu

- **question:** Điều mình yêu được sống ở đâu?
- **root:** B.thuyen-002
- **axes:** AX2, AX6
- **definition:** Thứ anh yêu không có chỗ trong thước của người khác: hoặc bị vứt, hoặc phải khoác một công dụng, hoặc được cất "cho sau này" ở một nơi không ai xếp hạng. Chỗ của AX6: ai có quyền tạo ra thị trường cho thứ mình yêu.
- **members:** [[B.thuyen-002]], [[B.thuyen-018]]

## C7 · Tình thương

- **question:** (anh không hỏi; `seen: khong` suốt Phần 1)
- **axes:** AX7, AX8
- **definition:** Nhu cầu được ôm, được nghe khóc, được thừa nhận vì đã cố và đã chịu; nỗi cô độc vì không ai ở lại với phần thật nhất của anh. Đứng riêng, không gắn với thành tích (bỏ phương trình "giỏi thì được thương" 11/11). Nối: tầng không thấy của B.thuyen-024, mặt kia của B.thuyen-024 và B.thuyen-025, khóa 3 của B.thuyen-017; cơ chế: [[FN.thuyen.cai-goi]].

### Khuếch đại ở đêm say `locked 11/11`

Không phải niềm tin mới: chính niềm tin của cụm này, **được khuếch đại lớn nhất** ở [[X-011-001]] (lời hứa, phục vụ X-011.G1). Từ đêm ấy nó có hình hài: **anh tin rằng nếu có Nhi thì sẽ có cái ôm, sự yêu thương**, và buộc nó vào điều kiện "xứng đáng" của lời hứa. Vẫn là **niềm tin mù**: anh không biết mình mang nó.

- **page:** lên trang **chỉ bằng cảm xúc và hồi tưởng về lúc đau** (cái gối, những đêm khóc, những lần không được ôm); không câu nào cho thấy anh nhận thức rõ nhu cầu này; người kể không gọi tên nó.
- **kỹ thuật:** trong đêm say, viết hơi ấm của Nhi khi cô ôm anh; ở các lần sau, skinship (chạm, tựa, nắm) gọi lại hơi ấm ấy. Độc thoại **được mở** (mở luật của gói cho cụm này): độc thoại thể hiện cảm xúc của anh, không thể hiện nhận thức về nhu cầu.
- **GĐ2** `locked 11/11`: anh đã biết mình có tình yêu của Nhi (đêm say). Thứ anh chưa có là quyền thương cô trọn vẹn trước mọi lời phán xét; cái tôi độc dùng sự công nhận làm khiên cho quyền ấy (B.thuyen-024 `amplified`, [[FN.thuyen.cai-toi]]). Nhu cầu bên dưới vẫn mù.
- **consumed:** biến chất GĐ2 ở THR.LAB (X-011.G1); tình tiết cụ thể chưa có.

## Đã gộp, đã chuyển

### B.thuyen-003

- **merged:** gộp vào [[B.thuyen-033]] làm nấc ngộ nhận lớp 4 (10/11). Số 003 để trống; alias `NT-03` trỏ về 033.

### B.thuyen-012

- **merged:** gộp vào [[B.thuyen-011]] (dạng *đùa xong thì không phải trả lời*) 10/11. Alias `NT-12`.

### B.thuyen-013

- **merged:** gộp vào [[B.thuyen-011]] (dạng *nói thật bằng giọng đùa*) 10/11. Alias `NT-13`.

### B.thuyen-015

- **moved:** chuyển vào [[FN.thuyen.quan-su]] (mô tả cơ chế, không phải điều anh tin) 10/11. Alias `NT-15`.

### B.thuyen-019

- **moved:** chuyển vào [[FN.thuyen.nang-khieu]] (cách tư duy học bằng liên kết, không phải niềm tin) 10/11. Alias `NT-19`.
