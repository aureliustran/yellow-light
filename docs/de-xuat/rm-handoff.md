# Handoff – Tuyến RM (Romance)

Oct 26, 2026 · @aureliustran. Bàn giao từ session 19/10 → 26/10 (session dựng v2: tái định hướng truyện, Diệp Anh đồng minh, hội đồng của Nhi, kho "Nhi thích Thuyên") sang một session mới **chuyên viết tuyến RM**. Session TH và session kiến trúc vẫn chạy song song; xem mục 6 để không giẫm chân nhau.

## 1. Việc của session này

Dựng và viết tuyến RM theo cây tuyến (`docs/de-xuat/cay-tuyen.md` §4 RM, §5, §6, §11 bước 4–5):
1. **RM.TN** (Thuyên – Nhi, mức GĐ1 SS+, GĐ2 SSS, GÃY SS+): chuyển BRIEF, KHO, RR vào node; đánh mã `TN-`; tách tình tiết của Phong sang `RM.PN`, của Diệp Anh sang `RM.TD`; ghi khoảng trống.
2. **RM.PN, RM.TD, RM.LT, RM.VA**: dựng khung, chỉ chuyển cái đã có.
3. **Giao điểm có RM**, dày nhất trước: X-06 (quân sư bí mật), X-09 (tất niên, gala), X-10 (*Mixue*), X-11 (đêm say), rồi X-05, X-08, X-12, X-13, X-17.
4. Chốt với tác giả **bộ quy ước viết cảnh tình cảm** (mục 5), rồi đưa vào `rules/` khi kiến trúc cho phép.
5. Khi tác giả bảo viết: viết cảnh, chương thuộc RM theo `quy-trinh.md` và skill tương ứng.

Tác giả chốt, Claude ghi sổ. Claude chỉ đề xuất.

## 2. Đọc gì, theo thứ tự

| # | File | Để biết |
| --- | --- | --- |
| 1 | `docs/README.md`, `docs/kien-truc.md`, `docs/quy-trinh.md` | Kho gốc là repo; nhãn; thứ tự ưu tiên khi lệch |
| 2 | `docs/de-xuat/cay-tuyen.md` §1a, §4 (RM), §5, §6, §8, §11 | Node, mức, giao điểm, khuôn file, ánh xạ |
| 3 | `docs/canon/cau-hoi.md` | Q-001 → Q-021 phần lớn thuộc RM; Q-101 → Q-107 đã đóng |
| 4 | **BRIEF:** `docs/brief-tinh-cam-thuyen-nhi.md` | Mạch tình cảm chính, lịch 2024–2025 theo ngày, khung chương GĐ1. **Chỉ có trên `origin/main`**, đọc bằng `git show origin/main:docs/brief-tinh-cam-thuyen-nhi.md` (mục 7) |
| 5 | **GALA:** Project `claude/v2/05-gala-va-quan-su-bi-mat.md` | Tất niên, gala, quân sư bí mật; chốt 24/10 (mới hơn 00, 01) |
| 6 | **KHO:** `docs/03-kho-nhi-thich-thuyen.md` | Ba gu của Nhi, chín nấc, kho khuôn A–H, E2, E3, công thức sinh tình tiết |
| 7 | **RR:** Project `claude/v2/04-rui-ro-tuyen-thuyen-nhi.md` | Rủi ro tuyến; một phần đã lỗi thời (Q-003) |
| 8 | `docs/de-xuat/q-001-thuyen-biet-than-phan-nhi.md` | Thuyên biết thân phận Nhi lúc nào: dàn xếp khách quan, sổ 16 kênh (X-13) |
| 9 | `docs/02-hoi-dong-nhi.md` | HĐQT 🎀: ba thành viên, người yêu cũ là công tử thật, "Hai cách sa ngã" |
| 10 | `docs/00-quyet-dinh-v2.md` mục 2, 4, 5, 8; `docs/01-mach-truyen-v2.md` mục 2, 4 | Nền chốt 19/10; nhớ đọc cùng mục 4 dưới đây (chỗ đã bị thay) |
| 11 | `docs/de-xuat/th-handoff-x11-dem-say.md` | X-11 đêm say đã được session TH đặt lại ở bản lề GĐ1 → GĐ2 |
| 12 | Project `claude/v2/bible-v2.md` | Bible hợp nhất tạm (chưa chuyển về `canon/bible.md`) |
| 13 | Project `docs/tuyen/qua-khu/nhi.md` (QK.N) | **Mọi chất liệu về Nhi** do session QK.N giữ: tuổi, chiều cao, KOC và shop, khéo và đanh đá, màu hồng, gu tự khai, hai lượt mai mối, Phong, NT. Đọc thẳng, không chép lại (mục 9) |

Thẻ nhân vật cũ ở Project (`the-nhan-vat-nhi.md`, `M-he-gia-tri-nhi.md`, `M-he-gia-tri-diep-anh.md`) là nguyên liệu, không phải canon v2.

## 3. Tác giả đã chốt gì ở session cũ (nguồn đã có trong doc)

Không chép lại; đây là bản đồ để biết tìm ở đâu. Tất cả là `[chốt dd/mm]` chưa có mã D-.

| Ngày | Chốt | Nằm ở |
| --- | --- | --- |
| 19/10 | Tuyến chính Thuyên – Nhi, rom-com, văn phong ngôn tình Việt | 00 §1 |
| 19/10 | Diệp Anh là đồng minh, không yêu chính thức; fan service đụng chạm, gợi dục, chưa mập mờ; MUN do cô sắp đặt sau khi nghe Chủ tịch bảo Khải "để ý nó"; cô nghĩ mình là người chơi cầm lá Thuyên | 00 §2, §6 |
| 19/10 | Phong là nam phụ thật; Vũ là hội đồng một người của Thuyên | 00 §2 |
| 19/10 | Thuyên không biết Nhi thích mình, né thính, tin cô không thích anh; dịu dàng không thừa nhận; không ghen ra mặt, lùi lại quan sát; quân sư cho Phong, ghép đôi khi Phong vắng; Nhi tát, anh không chặn | 00 §4 |
| 19/10 | Ngày gãy: ngày định nhận ghế vận hành 50 triệu là ngày định tỏ tình; Nhi bị cáo buộc | 00 §5 |
| 19/10 | HĐQT chống Thuyên vô tội vạ vì gia thế, càng phá càng bất lực, dần có cảm tình; anh miễn nhiễm vì tin Nhi không thích mình; "bàn cào móng" là tin nhắn trả lời story; bỏ thành viên nam, không đưa LGBTQ+ và nét kỳ thị | 00 §8, 02 |
| 19/10 | Hai sân bóng: cột rổ khu tập thể nhà Vũ, sân thuê pickup; bỏ sân trường hàng xóm | 00 §7 |
| 23/10 | Người yêu cũ của Nhi là công tử thật; bố mẹ phá sản, lao vào cờ bạc; hội đồng xúi khi còn 15–16 tuổi | 02 §1 |
| 23/10 | Điểm khác Thuyên: hắn hưởng thụ; Thuyên tự làm tự ăn, biết trân trọng; tội của Thuyên là tham, kiêu, được đà lấn tới | 02 §1 |
| 23/10 | Drone sinh từ việc đặt đồ ăn cho Nhi (thay bản đặt matcha cho Diệp Anh) | 03 §2C (X-12) |
| 23/10 | E2: Nhi chọc anh bằng chính sự để ý của anh; anh chối bằng cách **chứng minh cô sai**, không nhận; cãi nhau để sinh fan service | 03 §2 E2 |
| 23/10 | E3: một khi Nhi thừa nhận cô cho nhìn, anh dùng làm giấy phép để nhìn thật | 03 §2 E3 |
| 23/10 | Được gọi thẳng tên bộ phận cơ thể trong lời kể (giữ hai giới hạn cứng của rules) | 03 §2A |
| 23/10 | Lý do Nhi thích Thuyên: ấn tượng từ profile, ngoại hình rồi khuếch đại; gu lòng (quan tâm tinh tế); gu ẩn là đầu óc, cô không biết mình thích người thông minh đến khi gặp; witty, sarcastic không làm cô chán và chứa quan tâm | 03 §0, §1 |
| 23/10 | Cần **flow và kho** để sinh tình tiết, chưa cần chuỗi sự kiện | 03 (toàn bộ) |

## 4. Chỗ đã bị thay hoặc cần đối chiếu

Doc của session cũ viết trước các chốt 20/10 và 24/10. Khi lệch, theo thứ tự ưu tiên ở `README.md`.

| Doc session cũ nói | Hiện hành | Nguồn |
| --- | --- | --- |
| Nhi nhận ra giọng Thuyên trong lời Phong, từ chối "Câu này không phải của cậu" (00 §4, 01 §2.2, 03 nấc 8) | **Bỏ.** Phong nói thẳng với Nhi; Nhi vẫn hỏi lại ở đêm say | Q-102, GALA, chốt 24/10 |
| Phong tỏ tình giai đoạn 2 / không tỏ tình ở GĐ1 | Xung đột: GALA cho Phong tỏ tình trước màn nhảy mở màn ở gala | Q-002 |
| Lịch 2026–2027, ngày gãy "16/7" | Lịch 2024–2025 theo luật dời mốc (+2 ngày, giữ thứ); ngày gãy chờ chọn 16/7 hay 18/7/2025 | BRIEF, Q-004 |
| Thuyên biết thân phận Nhi: chưa định | Không biết đến sát ngày gãy, đứng ở mép sự thật một lần; phương pháp là dàn xếp khách quan | Q-001, chốt 25/10 |
| Phong có trong danh sách mai mối: đề xuất | **Có** (hai gia đình xếp prom date); Phong có biết hay không còn mở | Q-101, Q-006 |
| Mốc mập mờ: đề xuất | Fan service Diệp Anh đỉnh tháng 11–12, khép 31/12; Nhi mập mờ tháng 1–3; Thuyên mập mờ ở GĐ2 | Q-104, chốt 20/10 |
| Biệt danh của Nhi | Thuyên biết ở đêm say ("Sóc ơi") | Q-107 |
| Đêm say chưa có vị trí | X-11, bản lề GĐ1 → GĐ2, giao RM và TH ở SSS | `th-handoff-x11-dem-say.md` |
| 01 §6 kho nguyên liệu, lưu ý skill trỏ `claude/v2/` | Kho gốc là repo `docs/`; Project chỉ là bản sao | README |

## 5. Việc treo: bộ quy ước viết cảnh tình cảm Thuyên – Nhi

Session cũ đề xuất (23/10), tác giả mới chốt **một điểm** (gọi thẳng tên bộ phận cơ thể, đã ghi vào KHO §2A). Chưa có file nào lưu phần còn lại; đây là bản duy nhất. Khi chốt xong, đưa vào `rules/` (hoặc nơi `kien-truc.md` quy định).

**[đề xuất] 1. POV**
- **POV Thuyên** (mặc định ở chương mạch chính): cảnh trêu nhau, cãi nhau, ánh nhìn. Cái bạo của Nhi hiện ra qua chỗ anh đứng nhận đòn. Được: đếm giây, cái tật, lập luận ngoại phạm, ý nghĩ bỏ lửng, "À." Không được: gọi tên cảm xúc của anh; giải thích Nhi đang nghĩ gì.
- **POV Nhi** (interlude): mặt sau của cùng loại cảnh, họp hội đồng. Được: gọi tên cảm xúc nhưng gán sai nguyên nhân; câu ngắn thấu cảm; register rom-com. Không được: lập luận nhiều bước; tính phương án.

**[đề xuất] 2. "Văn phong ngôn tình Việt" cụ thể**
- POV Nhi và hội đồng: dùng chất ngôn tình (độc thoại phóng đại, tự mắng mình, biệt danh, cường điệu hài, tin nhắn nhóm dồn dập).
- POV Thuyên: giữ giọng hiện tại. Chất ngôn tình chỉ lọt vào qua thoại và hành động, không vào lời kể. Cái hay nằm ở độ lệch: cùng một cảnh, Thuyên kể như biên bản thí nghiệm, Nhi kể như phim truyền hình.

**[đề xuất] 3. Nhịp cảnh trêu nhau (E2/E3)**
1. Mở bằng không khí và một chi tiết thật, không mở bằng thoại.
2. Ánh nhìn của anh được kể như đang phân tích; lời kể không nói anh đang ngắm.
3. Nhi mở đòn bằng câu khẳng định, không dấu hỏi, không ngẩng lên.
4. Hai giây có dấu hiệu cơ thể (nuốt khan, gõ tay hai lần).
5. Thoại bóng bàn, mỗi lượt một đến hai câu; anh "đều như đọc đáp án"; cô đáp bằng sự thật hoặc hành động, không bằng lý lẽ.
6. Phép thử bằng hành động là chỗ đặt fan service.
7. Cú lật theo một kiểu kết trong KHO.
8. Đóng bằng một vật hoặc một âm thanh, không đóng bằng câu tổng kết.

**4. Fan service trong lời kể POV Thuyên**
- **[chốt 23/10]** Gọi thẳng tên bộ phận cơ thể bằng từ phổ thông, trung tính; giữ hai giới hạn cứng (không tả bộ phận sinh dục, không từ thô tục).
- [đề xuất] Từng mảnh, theo mắt kỹ sư: gọi đúng tên rồi tả hình dạng, vị trí, nguyên nhân; không tính từ khen. Phản ứng của anh kể bằng hành động. Ý nghĩ bỏ lửng tối đa một lần mỗi cảnh. Chi tiết riêng tư chỉ xuất hiện khi có giấy phép. Những gì Nhi giấu (tai đỏ, kéo váy xuống) chỉ lọt vào trang qua thứ anh thấy mà không hiểu, hoặc nghe mà không quay lại nhìn.

**[đề xuất] 5. Hài**
- Sinh từ logic bị dồn đến chỗ vô lý ("Cong nhiều."), không từ câu đùa chen ngang. Mỗi cảnh nhiều nhất hai câu đáp ngắn kiểu ấy. Không giải thích câu đùa, không để nhân vật cười câu đùa của mình.

**Ba câu chờ tác giả** (đề xuất thêm vào `cau-hoi.md`, đánh mã Q- tiếp theo khi ghi):
- **A.** Mốc lớn (khoảnh khắc "rung", cú tát, ngày gãy) có được kể hai lần, POV Thuyên ở chương rồi POV Nhi ở interlude kế tiếp? Khuyến nghị: có, nhưng hiếm.
- **B.** Ở nấc muộn (sau nấc 6, khi anh bắt đầu nghi mình thích cô), có cho chất ngôn tình lọt vào lời kể POV Thuyên như dấu hiệu anh đang đổi?
- **C.** Một cảnh trêu nhau khoảng 800–1.200 chữ. Mật độ fan service giữ "một khoảnh khắc mỗi hai, ba chương" (rules cũ) hay tăng vì tình cảm là tuyến chính? Nối với ngân sách theo tuyến (Q-034 → Q-036).

**Cảnh mẫu:** session cũ viết thử một cảnh khoảng 1.000 chữ (E2 nối E3, POV Thuyên, quán ghế nhung, "Sao anh nhìn đùi em lâu thế", đồng hồ phản chiếu trên kính tủ bánh, Nhi dời ghế, đồng hồ điện tử không có kim, "Em cho phép rồi", Nhi không rút mà nhìn trả, anh quay đi trước, tiếng vải sột soạt, hàng vạch mực tím). Tác giả dặn **chưa lưu cảnh**. Nếu cần mẫu giọng, viết lại từ mô tả này sau khi bộ quy ước được chốt.

## 6. Ranh giới với các session khác

| | Session RM (này) | Session TH | Session kiến trúc |
| --- | --- | --- | --- |
| Được ghi | `docs/tuyen/romance/*`, giao điểm mà node chủ là RM, `docs/de-xuat/rm-*.md`, Q- mới về romance | `docs/tuyen/thriller/*`, `docs/de-xuat/th-*.md`, Q- mới về lab | `kien-truc.md`, `quy-trinh.md`, `README.md`, `docs/canon/*`, `docs/tuyen/` trừ `thriller/` và `romance/`, `cay-tuyen.md`, `hop-nhat-cay-tuyen.md`, `ngan-sach-tuyen.md`, skill |
| Không ghi | file của hai cột kia | | `thriller/`, `romance/`, `th-*`, `rm-*` |

- **Đổi so với handoff kiến trúc:** bước 4 của lộ trình cây tuyến (RM.TN) chuyển từ session kiến trúc sang session này; `docs/tuyen/romance/` thuộc session này. **Báo tác giả để tác giả báo lại session kiến trúc**, hoặc ghi một dòng vào `handoff-kien-truc-cay-tuyen.md` nếu tác giả cho phép.
- Giao điểm nhiều tuyến (X-09, X-11, X-13, X-18): file giao điểm do node chủ ghi. Nếu node chủ chưa định, đề xuất trong `de-xuat/rm-*.md` và hỏi tác giả, không ghi đè bản của session TH.
- HĐQT 🎀 (`SL.HD`): chờ Q-024 (SL hay dưới RM.TN). Trước khi có đáp án, chỉ đề xuất.
- Mức node RM: không tự đổi; đề xuất trong `de-xuat/rm-*.md`, session kiến trúc cập nhật ma trận khi tác giả duyệt.
- `docs/canon/cau-hoi.md`: đọc lại ngay trước khi ghi, chỉ thêm dòng, không viết lại cả file.

## 7. Trạng thái file và git

- Mọi thay đổi **chưa commit**, nằm trong working tree trên máy tác giả (`D:\PROJECTS\den-vang-site\den-vang-site`), nhánh `main`.
- `main` ở máy **chậm so với `origin/main`** (gồm `docs/brief-tinh-cam-thuyen-nhi.md`). BRIEF chỉ đọc được qua `git show origin/main:docs/brief-tinh-cam-thuyen-nhi.md`. Không pull đè lên thay đổi chưa commit.
- Working tree có nhiều thay đổi của tác giả và các session khác (`content/v2/01-…`, `docs/01-rules-viet.md`, `src/config.ts`, `docs/canon/`, `docs/de-xuat/`, `docs/README.md`, `kien-truc.md`, `quy-trinh.md`, các file `M-*.md`…).
- Session cũ đã đưa vào `docs/`: `02-hoi-dong-nhi.md` (bản 23/10) và `03-kho-nhi-thich-thuyen.md` (mới). `00` và `01` ở `docs/` đã là bản cuối của session cũ.
- **Việc đầu tiên:** hỏi tác giả xử lý git thế nào (tác giả tự commit và pull, hay Claude tạo nhánh `claude/tuyen-rm`; xóa file trong repo cần quyền xóa, xem `kien-truc.md` §7).

## 8. Quy ước giữ nguyên

- Tác giả chốt, Claude ghi sổ; Claude chỉ đề xuất.
- Văn bản trong doc: tiếng Việt, câu ngắn, không gạch ngang dài làm dấu câu, header ngày như các file khác.
- Lời kể POV Thuyên không gọi tên cảm xúc; POV khác được gọi tên kèm chi tiết (`01-rules-viet.md`).
- Kiểm thứ trong tuần bằng code; lịch 2024–2025 theo luật dời mốc "+2 ngày, giữ thứ".
- Cuối mỗi lượt có thay đổi: đồng bộ file đã đổi lên Project, cùng đường dẫn.

## 9. Ghi chú từ session QK.N (29–30/10)

Session QK.N ghi, không sửa node RM. **Mọi chất liệu về Nhi nằm ở `tuyen/qua-khu/nhi.md` (Project `docs/tuyen/qua-khu/nhi.md`; thư mục `docs/tuyen/` hiện chưa có trong repo). Session RM đọc thẳng file ấy;** mục này không chép lại, chỉ giữ bản đồ và việc riêng của RM.

### 9.1 Bản đồ chốt chạm RM

| Chốt | Ngày | `nhi.md` |
| --- | --- | --- |
| Nhi 19 tuổi, sinh 2005, hiện tại 2024; Nhi 1m62, Thuyên 1m83 | 29–30/10 | §0 |
| KOC, shop handmade; không áp lực doanh thu | 29/10 | §1.1 |
| Tiểu thư nổi loạn: khéo là công cụ, đanh đá là bản tính; với Thuyên bị chọc tới mức đanh đá; ba ranh | 30/10 | §1.2 |
| Kênh K17 | 29/10 | §1.3 |
| Lớp nghi ngờ: tiểu thư nhà giàu, hot mạng mà thích mình thì vô lý | 29/10 | §1.4 |
| Màu hồng; "tone hồng" là slang bánh bèo, giữ | 30/10 | §1.5 |
| Gu tự khai; môn đăng hộ đối ba tầng; Thuyên trượt cái thước gia thế, đạt nhu cầu thật | 30/10 | §1.6 |
| Hai lượt mai mối; lượt 2 là Phong; Phong biết; Khải biết; lộ ra ở timeline Thuyên chữa lành | 30/10 | §1.7, N.4, N.4b |
| Cân nhắc bỏ Thảo và người yêu cũ (chưa quyết) | 30/10 | §5 |

### 9.2 Lớp nghi ngờ của Thuyên: việc của RM `[đề xuất]`

- Hai lần đọc ngược: cô khéo với mọi người, anh đọc sự dịu dàng với mình là mức nền; cô chỉ đanh đá với anh, anh đọc thành không thích. Lập luận lên trang bằng một dòng (luật minh bạch, Q-001 §2).
- Cơ chế GĐ2: anh đủ tự tin xác nhận Nhi thích mình không vì có thêm bằng chứng về cô, mà vì con số của chính anh tăng (lab, kim bài, ghế 50 triệu).
- Lớp mỉa: anh nghe gu tự khai (X-05) theo nghĩa đen là tiền, gia thế, và ở GĐ2 đuổi theo đúng cái thước Nhi không thật sự cần; thứ cô cần là bộ óc của anh, anh có từ đầu (`nhi.md` §1.6).
- Gốc ở QK.T: NT-14, NT-24, *Tủi hổ*; trục H5.

### 9.3 Nhi kéo Thuyên hợp tác shop từ GĐ1 `[đề xuất, tác giả 29/10]`

**Nội dung:** Nhi đòi anh hợp tác: làm website, làm mẫu nam, chọn đồ nam từ nguồn hàng vì anh có gu. Cô bán vì đam mê, và vì thích anh, thấy thuận mắt nên đòi anh support.

**Lý do của tác giả:** (1) giảm sức nặng của RM.TN (SS+) dồn lên các buổi học IELTS; (2) kinh doanh cùng nhau từ GĐ1 làm nền cho startup sau thạc sĩ (Phần 3), vì cả hai biết điểm mạnh, yếu của người kia từ đầu.

**Session QK.N đánh giá: dùng được.** Thêm:
- Khớp canon: Thuyên có gu, "ảnh aesthetic", Crocs, Casio (bible §4.1); ngoại hình đủ làm mẫu; website là nghề của anh. Trả lời một phần Q-013 (tài năng của Nhi, vai đồng sáng lập ở Phần 3) và phương án 7b.2 của doc 04.
- Fan service đảo vai: buổi chụp là chỗ cô nhìn anh, chỉnh tư thế anh; E2, E3 chạy ngược chiều.
- Đọc ngược thêm một lần: anh đọc lời mời thành "cô cần mẫu nam miễn phí, cần người làm web", không phải thích.
- Nền Phần 3: anh làm sản phẩm, đo, tối ưu, tham; cô cảm người mua, làm hình ảnh, không kỷ luật doanh thu. Mâu thuẫn của startup có sẵn từ GĐ1.
- Mốc biến chất GĐ2 (gợi ý): anh bắt đầu gắn số liệu, mục tiêu vào shop của cô; đam mê không áp lực của cô bị thước của anh chạm vào. Cô nhận ra trước ai hết (nối "Dạo này anh nói chuyện như người đang thắng").

**Ranh phải xử trước khi viết:**
1. **Tiền.** Canon: Thuyên là người đầu tiên từ chối tiền của Nhi; hội đồng đổi ý vì tiền (02 §1). Hợp tác phải có cách trả công không phá chốt này. Chờ tác giả.
2. **Q-001.** Website, tên miền, thanh toán, đăng ký kinh doanh đứng tên Nhi, không qua công ty của mẹ hay Astrea. Ảnh anh làm mẫu trên kênh hot: chị Hạnh và Khải (đã biết Nhi là ai) thấy; với Khải đây là dữ liệu về độ gần của hai người (L4), còn Thuyên không biết thêm gì. Soát với session TH (TH.LAB, TH.T18).
3. **Thời gian GĐ1.** Anh đã có lab, buổi học, pickup, Diệp Anh. Hợp tác thay một phần buổi ngoại khóa, không cộng thêm (đúng mục đích giảm tải). Nối Q-034 đến Q-036.
4. **Diệp Anh:** anh làm mẫu cho Nhi là tín hiệu cô đọc được (RM.TD).
5. **Gãy (gợi ý):** quyền quản trị shop và website anh giữ thành vật cầu: ai rút quyền, ai đổi mật khẩu.
6. **Dưới 18 tuổi:** mảnh quá khứ về shop chỉ nói đồ, màu, cảnh.

### 9.4 Tuyến Phong: việc của RM

- Phong biết mình được tạo điều kiện (trả lời Q-006, chốt 30/10). Luật "Phong không bao giờ làm điều xấu để giữ chỗ" cần cân lại: Phong không làm gì xấu nhưng có im lặng.
- `[đề xuất]` Phong nói thật với Nhi chuyện Thuyên làm quân sư (chốt 24/10) một phần vì cậu đang giữ cho mình một điều không nói.
- `[đề xuất]` Đóng Q-006 trong `canon/cau-hoi.md` (session kiến trúc ghi).

### 9.5 Gương ở hiện tại `[đề xuất]`

- Ch.1 đèn vàng: lần đầu có người không nói "ừ" với cô (gương nhịp 3 của lượt 1 mai mối).
- Thuyên làm mẫu cho shop, cãi từng chỉ đạo, ảnh sống, cô không xóa tấm nào (gương nhịp 4: ảnh chết, xóa cả thư mục).
- POV Thuyên nhấn chi tiết hồng; POV Nhi kể bộ đồ như cô chọn (`nhi.md` §1.5).

### 9.6 Canon RM cần sửa theo `nhi.md` (không sửa hộ)

- BRIEF §3 "cãi là mặc định": đọc là đanh đá khi giành quyền lợi hoặc bị chọc cay quá.
- `03-kho-nhi-thich-thuyen.md` §0: gốc của gu mắt và gu lòng (đang ghi từ người yêu cũ) đổi thành lời cô tự khai năm 16 tuổi, gia đình dạy; thêm môn đăng hộ đối là hình dạng vẽ sai của gu ẩn.
- Thẻ Nhi: nếu bỏ Thảo, thang nấc cần chiếc thang khác (ứng viên: Thuyên, Khải, hội đồng, shop).

### 9.7 Bổ trợ cảm xúc và lý trí: động lực của RM.TN

- `[chốt 30/10]` Ngoài sự tương xứng, Nhi và Thuyên là sự bổ trợ: cô sống bằng cảm xúc, anh dựa vào lý trí; anh chọc, cô cãi; cô có vấn đề, anh càu nhàu rồi vẫn giải quyết.
- `[đề xuất]` Cơ chế, mặt tối ở GĐ2 và ngày gãy, và nguồn nghiên cứu: `tuyen/qua-khu/nhi.md` §1.6. Tóm: giống nhau về giá trị, bổ trợ về cách xử lý; Nhi gọi tên cảm xúc cho Thuyên, Thuyên giải quyết vấn đề cho Nhi; bổ trợ vỡ khi anh thôi nghe và chỉ còn giải quyết (H7 của Nhi quay lại qua người cô yêu).
