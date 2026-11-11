# Checklist B4: chuyển tuyến sang khung mới

Cập nhật 11/11/2026. `[x]` đã giải quyết (cách giải quyết, commit); `[ ]` còn mở (ai quyết). Commit ghi 7 ký tự đầu; chưa push.

## A. Đã giải quyết

### Gốc, trục, hiến pháp
- [x] **Cây thước và lăng kính mâu thuẫn.** Mô hình thước và cân (AX3): hai cây thước (bố mẹ: vạch dời, luôn "chưa đủ"; lâu đài: vạch luôn dưới chân, luôn "đủ"); Thuyên và Nhi đều bỏ cây thước áp lên mình, đo bằng cái cân của mình; phép đo khách quan, chủ quan nằm ở vạch đích. Thành tố ghi ở `ART.AX3` (`locked 10/11`).
- [x] **Lực kéo, lực đẩy.** Kéo là phiên bản lý tưởng (BL-034), đẩy là nỗi sợ từ quá khứ (BL-029); đẩy chỉ yếu khi bình yên; trong phần đang plan, kéo luôn cao. Ghi ở `SELF.thuyen`, cụm C5 (987548e).
- [x] **Vạch của hai người.** Thuyên: cột mốc dài hạn, vertical scaling, tiêu cực; Nhi: hoàn thành ngắn hạn, horizontal scaling, tích cực (9df3707).
- [x] **Hiến pháp.** ART.0 sáu điều (tác giả sửa) và ART.AX3 bốn điều được duyệt; câu gốc viết lại theo luật từ phức, giữ bản cũ ở mục `moved`.
- [x] **Chín trục và thang** chuyển vào `core/axes/AX1…AX9`, `core/SCALE.exl` (T1, 5b62b65).

### Niềm tin
- [x] **Khuôn hai lớp.** `definition` (dùng được quote) và `monologue` (công cụ thiết kế, giọng thiết kế, không phải giọng nhân vật, lên trang tùy chọn); `seen` chỉ là nhân vật thấy, người đọc vẫn có thể được kể; giai đoạn `ngo-nhan`, `dien-giai`; `ref`; cụm (062460c, 377e126).
- [x] **Gom niềm tin Thuyên thành 7 cụm** (C1 Công nhận … C7 Tình thương); gộp, chuyển BL-003, 012, 013, 015, 019 (c5c2076, 55d0626).
- [x] **Chỗ trống C1**: lúc đầu để trống có chủ đích với cảnh báo `LAW.check.gap` (8657981); 11/11 tác giả xóa hẳn vì sai định nghĩa: lời hứa đêm say là tình tiết đẩy tuyến ở giao điểm X-011, không phải niềm tin; niềm tin sinh từ nó (nếu có) ghi số mới.
- [x] **BL-024**: sườn bài văn *Ước mơ của em*; công nhận là bảo hộ chủ kiến, nối thước đo; cấp 2 giành công nhận bằng cái cân của mình; tình thương `seen: khong` (05a73d1, 73275b6, 7352c1e).
- [x] **Từ vựng Thuyên.** "bố mẹ" (bỏ bọ, mạ), "công nhận, thừa nhận" thay "khen", Khánh là "nó" (f503e3f, b0225e5).
- [x] **Niềm tin Nhi**: cụm C1 Lâu đài (gốc BL-045, độc thoại của tác giả), C2; không ghi niềm tin Thuyên vào gói Nhi (7914591, 7f97924).
- [x] **Lâu đài** định nghĩa sáu phần trong `CH.nhi` (c13a526).
- [x] **Gương Thuyên – Nhi** đặt ở mục `mirror` của ROM.TN, phụ thuộc một chiều vào niềm tin (e49737f); thêm gương quá khứ (bcb96db).
- [x] **X-011 (đêm say)**: mục tiêu riêng X-011.G1 (tác giả 11/11): khuếch đại các niềm tin liên quan để biến chất GĐ2 ở lab xảy ra; lời hứa thành lá X-011-001.
- [x] **X-011-001 (lời hứa)** duyệt 11/11, gồm các niềm tin khuếch đại BL-024, 034, 030; thêm BL-029 (vạch đã nâng lên: ghế 50 triệu).
- [x] **BL-034** (11/11): vạch dời theo mục tiêu của anh; phiên bản lý tưởng là ảo tưởng về mình lúc đạt mục tiêu; ref Markus và Nurius (possible selves), Higgins (self-discrepancy); expression theo mục tiêu từng chặng; behavior từ nghiên cứu chủ nghĩa hoàn hảo.
- [x] **Bỏ "giỏi thì được thương"** (tác giả 11/11, cách a): gỡ khỏi BL-024 (tầng không thấy, alias), BL-004, C7, BL-030, FN.thuyen.phuong-trinh (bộ chuyển đổi còn "thiếu = khuyết chưa sửa"), sơ đồ cỗ máy, CH.thuyen, CH.vu, rules/goi-ten-cam-xuc §8, PAST.T.G1, AX7 (on-page, components).
- [x] **BL-030** (11/11): nối nghiên cứu chủ nghĩa hoàn hảo: nguồn gốc (tình cảm có điều kiện, Assor và Tal), ref Shafran (dời vạch), other-face *socially prescribed* lộ lại ở đêm say.
- [x] **BL-029, các chặng** (tác giả 11/11): dạng diễn giải hình thành ở lớp 11; kéo mọi lúc, đẩy lúc cực đoan, nên biểu hiện dàn trải cả truyện, mức luôn cao: lớp 11 thô, trực tiếp → lớp 12 biến động, nhận ra thấu cảm → ĐH–GĐ1 hòa khí → GĐ2–gãy tinh vi, thao túng.
- [x] **Khuếch đại lớn nhất ở X-011-001** (tác giả 11/11): niềm tin có sẵn của C7 Tình thương (có Nhi thì có cái ôm), không sinh niềm tin mới; niềm tin mù, lên trang chỉ bằng cảm xúc và hồi tưởng lúc đau; kỹ thuật: hơi ấm khi ôm, skinship về sau; mở luật cho C7 có độc thoại cảm xúc, không nhận thức.
- [x] **BL-022, chặng đổ vỡ lớp 11**: sự kiện làm chủ là thất bại HSG quốc gia lớp 11 và quá trình vực dậy (tác giả 11/11); lá chưa định nghĩa, ghi ở gaps của PAST.T.
- [x] **Vũ, Nhi** nâng theo khuôn hai lớp và luật từ phức (7107865).

### Luật viết
- [x] **Luật từ phức** cho toàn truyện: đa số từ phức; thoại miễn trừ trừ người thông minh hoặc giải thích chuyện phức tạp; độc thoại áp đủ; "không viết quá máy móc" (01-rules-viet, registers §6.3; 06aef59).
- [x] **Quét từ phức** cho world, storylines, core, lib (session khác, 10/11 sáng: 7066b28 … 754992a).

### Chuyển `tuyen/` sang `storylines/` (T1–T6)
- [x] **T1** gốc và trục (5b62b65). **TREE** nhận mọi chức năng của tuyen (687a902).
- [x] **T2** node gốc THR, SOL, FAM; 21 node khung có `weight`; cây quyết định (2c1e004).
- [x] **T3a** PAST, PAST.N (lá PAST.N-001…006), PAST.N.HD (bcb96db). **T3b** phần còn lại của sáu file Thuyên vào PAST.T (5a90288).
- [x] **T4** ROM.TN: lá ROM.TN-001, 002; bản nháp sang `claude/ban-nhap/rom-tn/`; bài học sang `lib/humor/TEC.humor.want-clash` (db02d53).
- [x] **T5** SOL.VU; mốc L2 sửa 2023 → 2021 (bde552d).
- [x] **T6** `tuyen/` dời vào `_archive/tuyen/`, chỉ đọc; sửa đường dẫn ở 184 file (a121e03).

### Cấu trúc khung
- [x] **Node là thư mục**: `<id>/<id>.md`, node con là thư mục con, lồng không giới hạn tầng; tình tiết là file lá (d4bc392).
- [x] **THR.MD trùng tên với THR.md trên Windows** → đổi `THR.MODEL`, mã cũ làm alias; tác giả giữ tên này (11/11).
- [x] **Giao điểm**: id riêng `X-NNN`, khóa ngoại ở `nodes` (≥2), một tập node một giao điểm; X-005 gộp hai cuộc gặp cũ X-005, X-006; cuộc gặp cũ ở mục `seed` (100f5f5).
- [x] **Luật sở hữu tình tiết**: thuộc mục tiêu nó phục vụ; node nếu là một phần mục tiêu của node, giao điểm nếu giao điểm có mục tiêu riêng; bỏ kind `occasion`, trường `x`, `beat` (100f5f5).
- [x] **Đọc chéo node** chỉ qua `share` của giao điểm (70c6439).
- [x] **FAM.T** định nghĩa nhà Thuyên (cấu trúc, thao túng Khánh, thước di động, giáp nói); không node con; quá khứ chỉ định nghĩa, hồi tưởng là lá PAST.T đọc qua X-019; tình tiết hiện tại là lá FAM.T (70c6439, 100f5f5).
- [x] **Bỏ kind group**: hội đồng Nhi vào SOL.HD (`identity`, `members`, `rules`); PAST.N.HD đọc qua X-020; quần chúng là dòng `members` của node (00de60a).

## B. Còn mở: cần tác giả quyết

### Niềm tin
- [ ] **BL-026**: thời điểm bộ lọc.
- [ ] **BL-034 `origin`**: đề xuất lớp 9 (ôn thi chuyên), suy từ `expression`.
- [ ] **Dải số niềm tin PAST.N.HD**: dải cũ NT-45…49 trùng BL-045 của Nhi.

### Gốc
- [ ] **SCALE.pride** (kiêu ngạo, 8 nấc) và **SCALE.rom** (Nhi thích Thuyên, 9 nấc): chưa có file.
- [ ] **AX9**: đề xuất cũ còn treo.
- [ ] **R10**: chuyển register sang khuôn mới.

### Nhân vật, bí mật
- [ ] **Q-001**: họ của Nhi và Khải.
- [ ] **Vũ** học trường đại học nào; ở nhờ nhà bác trong khu tập thể (Q-052).
- [ ] **Hội đồng**: tên và cá tính ba người (Claude đặt, chưa duyệt).
- [ ] **SEC-001**: dòng K10 về Thảo sau khi bỏ Thảo.
- [ ] **Mẹ Nhi trong lâu đài**: hướng "mẹ bị giữ" là đề xuất.

### Nhà Thuyên (FAM.T)
- [ ] Em có bị đánh không; Lâm là bạn cùng lớp hay con nhà quen; "con nhà biết thương người" là Vũ hay đứa riêng; vết nứt của mẹ; Vũ có thăm bố mẹ không.

### Sửa trang đã đăng (canon cứng)
- [ ] **ch.1, bible**: Vũ (Q-051, Q-052).
- [ ] **ch.6**: "một tháng ôn không lười" → ôn theo đường ngắn nhất.
- [ ] **ch.3**: cảnh mẹ khen Nam; câu gối nói ở ch.2–3.

- [ ] **AX7 câu gốc** dựng lại không có phương trình (`proposed 11/11`).
- [ ] **BL-004 độc thoại lớp 4** dựa vào phương trình đã bỏ (`needs-decision`).
- [ ] **PAST.T.G1** câu chữ mới (`proposed 11/11`).

## C. Còn mở: Claude làm khi tác giả bảo

- [ ] **Viết lại PAST.T**: rà TB-16 / DV-016, DV-009, PAST.T-006 theo việc bỏ phương trình; (tác giả sẽ viết lại): thêm lá theo bảng `handoffs` của FAM.T; gọn 987 dòng văn bản chuyển nguyên.
- [ ] **FAM.T**: tạo hai lá hiện tại (cuộc gọi bốn phút mười hai giây, áo sơ mi trắng); P1 → AFTER (giỗ ông và lời khoe 50 triệu, chiến tranh lạnh, trị liệu gia đình) chưa có nguồn.
- [ ] **ROM.TN B4c**: chuyển BRIEF, KHO, RR; tách Phong sang ROM.PN, Diệp Anh sang ROM.TD; đánh lại số lá theo ngày; nối `goal`.
- [ ] **Node khung**: THR.*, SOL.SAN, SOL.DT, FAM.N, PAST.DA, PAST.K.
- [ ] **Giao điểm**: đặt mục tiêu riêng cho các giao điểm có `seed`, rồi tạo lá.
- [ ] **canon-check**: không hai giao điểm cùng tập node; `goal` của lá giao điểm phục vụ mục tiêu riêng của giao điểm; node chỉ đọc node khác qua `share`.
- [ ] **Quét từ phức lần hai** cho văn bản chuyển sau 10/11 sáng (PAST.T `story`/`pages`, PAST.N, SOL.HD, FAM.T).
