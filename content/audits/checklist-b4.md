# Checklist B4: chuyển tuyến sang khung mới

Cập nhật 13/11/2026 (chiều: storage, info). `[x]` đã giải quyết (cách giải quyết, commit); `[ ]` còn mở (ai quyết). Commit ghi 7 ký tự đầu; chưa push.

## A. Đã giải quyết

### Gốc, trục, hiến pháp
- [x] **Cây thước và lăng kính mâu thuẫn.** Mô hình thước và cân (AX3): hai cây thước (bố mẹ: vạch dời, luôn "chưa đủ"; lâu đài: vạch luôn dưới chân, luôn "đủ"); Thuyên và Nhi đều bỏ cây thước áp lên mình, đo bằng cái cân của mình; phép đo khách quan, chủ quan nằm ở vạch đích. Thành tố ghi ở `ART.AX3` (`locked 10/11`).
- [x] **Lực kéo, lực đẩy.** Kéo là phiên bản lý tưởng (B.thuyen-034), đẩy là nỗi sợ từ quá khứ (B.thuyen-029); đẩy chỉ yếu khi bình yên; trong phần đang plan, kéo luôn cao. Ghi ở `SELF.thuyen`, cụm C5 (987548e).
- [x] **Vạch của hai người.** Thuyên: cột mốc dài hạn, vertical scaling, tiêu cực; Nhi: hoàn thành ngắn hạn, horizontal scaling, tích cực (9df3707).
- [x] **Hiến pháp.** ART.0 sáu điều (tác giả sửa) và ART.AX3 bốn điều được duyệt; câu gốc viết lại theo luật từ phức, giữ bản cũ ở mục `moved`.
- [x] **Chín trục và thang** chuyển vào `core/axes/AX1…AX9`, `core/SCALE.exl` (T1, 5b62b65).

### Niềm tin
- [x] **Khuôn hai lớp.** `definition` (dùng được quote) và `monologue` (công cụ thiết kế, giọng thiết kế, không phải giọng nhân vật, lên trang tùy chọn); `seen` chỉ là nhân vật thấy, người đọc vẫn có thể được kể; giai đoạn `ngo-nhan`, `dien-giai`; `ref`; cụm (062460c, 377e126).
- [x] **Gom niềm tin Thuyên thành 7 cụm** (C1 Công nhận … C7 Tình thương); gộp, chuyển B.thuyen-003, 012, 013, 015, 019 (c5c2076, 55d0626).
- [x] **Chỗ trống C1**: lúc đầu để trống có chủ đích với cảnh báo `LAW.check.gap` (8657981); 11/11 tác giả xóa hẳn vì sai định nghĩa: lời hứa đêm say là tình tiết đẩy tuyến ở giao điểm X-011, không phải niềm tin; niềm tin sinh từ nó (nếu có) ghi số mới.
- [x] **B.thuyen-024**: sườn bài văn *Ước mơ của em*; công nhận là bảo hộ chủ kiến, nối thước đo; cấp 2 giành công nhận bằng cái cân của mình; tình thương `seen: khong` (05a73d1, 73275b6, 7352c1e).
- [x] **Từ vựng Thuyên.** "bố mẹ" (bỏ bọ, mạ), "công nhận, thừa nhận" thay "khen", Khánh là "nó" (f503e3f, b0225e5).
- [x] **Niềm tin Nhi**: cụm C1 Lâu đài (gốc B.nhi-006, độc thoại của tác giả), C2; không ghi niềm tin Thuyên vào gói Nhi (7914591, 7f97924).
- [x] **Lâu đài** định nghĩa sáu phần trong `CH.nhi` (c13a526).
- [x] **Gương Thuyên – Nhi** đặt ở mục `mirror` của ROM.TN, phụ thuộc một chiều vào niềm tin (e49737f); thêm gương quá khứ (bcb96db).
- [x] **X-011 (đêm say)**: mục tiêu riêng X-011.G1 (tác giả 11/11): khuếch đại các niềm tin liên quan để biến chất GĐ2 ở lab xảy ra; lời hứa thành lá X-011-001.
- [x] **X-011-001 (lời hứa)** duyệt 11/11, gồm các niềm tin khuếch đại B.thuyen-024, 034, 030; thêm B.thuyen-029 (vạch đã nâng lên: ghế 50 triệu).
- [x] **Mã niềm tin** (tác giả 11/11): `B.<id nhân vật>-<số>`, đếm riêng từng nhân vật; cũ BL-001…035 → `B.thuyen-001…035` (giữ số), BL-040…045 → `B.nhi-001…006`, BL-050 → `B.vu-001`; PAST.N.HD không có dải riêng.
- [x] **B.thuyen-034** (11/11): vạch dời theo mục tiêu của anh; phiên bản lý tưởng là ảo tưởng về mình lúc đạt mục tiêu; ref Markus và Nurius (possible selves), Higgins (self-discrepancy); expression theo mục tiêu từng chặng; behavior từ nghiên cứu chủ nghĩa hoàn hảo.
- [x] **Bỏ "giỏi thì được thương"** (tác giả 11/11, cách a): gỡ khỏi B.thuyen-024 (tầng không thấy, alias), B.thuyen-004, C7, B.thuyen-030, FN.thuyen.phuong-trinh (bộ chuyển đổi còn "thiếu = khuyết chưa sửa"), sơ đồ cỗ máy, CH.thuyen, CH.vu, rules/goi-ten-cam-xuc §8, PAST.T.G1, AX7 (on-page, components).
- [x] **AX7 câu gốc** dựng lại (sự công nhận làm tấm khiên, không gọi tên vòng tay mình thiếu) và **PAST.T.G1** câu chữ mới: duyệt 11/11.
- [x] **B.thuyen-034** (11/11): bắt đầu từ lúc anh nhận ra mình có năng lực; `seen: khong`; độc thoại theo khuôn giả định "Nếu tao …, thì tao …" (không ghi ví dụ); gốc ở PAST.T-008 (lớp 6).
- [x] **B.thuyen-026 viết lại** (11/11): không ngại hỏi, không ngại bị mắng, chỉ cần câu trả lời; tự tìm là ưu tiên (năng lực tự phát); bộ lọc chọn người giữ câu trả lời và định hình trước chuỗi câu hỏi, không hạn chế hỏi. Bản đầu của diễn giải trong PAST.T là lời tác giả ("Họ chửi mình, vì họ không có câu trả lời…"), có thể đổi. Dạng diễn giải áp dụng toàn bộ truyện.
- [x] **Đối chiếu mechanics ↔ beliefs** (11/11, duyệt): B.thuyen-007 viết lại (vạch chuyển theo mục tiêu, bỏ "một vòng tay"; sang C2, con của B.thuyen-034); cái tôi độc đo bằng ánh nhìn người phán xét; nhiên liệu tách lớp 8–10 / từ C6b, uses B.thuyen-029, 034, 024; lăng kính luôn sáng, tếu là chỗ không hệ thống hóa; điểm mù theo B.thuyen-030; cái gối mở độc thoại cảm xúc; thước di động: chủ là FN.thuyen.thieu, FAM.T giữ quan hệ; sửa uses của quan-su, nang-khieu, phong-kin (B.thuyen-032), phuong-trinh, luoi-co-chon-loc, lang-kinh.
- [x] **Cái tôi độc** (11/11): không phải tiền mua tình thương; sự công nhận làm khiên bác bỏ mọi lời phán xét, ở GĐ2 để được thương Nhi trọn vẹn (anh đã biết mình có nó). Nối B.thuyen-024 (amplified), B.thuyen-030, B.thuyen-034, B.thuyen-029, C7, X-011-001; FN.thuyen.cai-toi, sơ đồ cỗ máy.
- [x] **B.thuyen-030** (11/11): nối nghiên cứu chủ nghĩa hoàn hảo: nguồn gốc (tình cảm có điều kiện, Assor và Tal), ref Shafran (dời vạch), other-face *socially prescribed* lộ lại ở đêm say.
- [x] **B.thuyen-029, các chặng** (tác giả 11/11): dạng diễn giải hình thành ở lớp 11; kéo mọi lúc, đẩy lúc cực đoan, nên biểu hiện dàn trải cả truyện, mức luôn cao: lớp 11 thô, trực tiếp → lớp 12 biến động, nhận ra thấu cảm → ĐH–GĐ1 hòa khí → GĐ2–gãy tinh vi, thao túng.
- [x] **Khuếch đại lớn nhất ở X-011-001** (tác giả 11/11): niềm tin có sẵn của C7 Tình thương (có Nhi thì có cái ôm), không sinh niềm tin mới; niềm tin mù, lên trang chỉ bằng cảm xúc và hồi tưởng lúc đau; kỹ thuật: hơi ấm khi ôm, skinship về sau; mở luật cho C7 có độc thoại cảm xúc, không nhận thức.
- [x] **B.thuyen-022, chặng đổ vỡ lớp 11**: sự kiện làm chủ là thất bại HSG quốc gia lớp 11 và quá trình vực dậy (tác giả 11/11); lá chưa định nghĩa, ghi ở gaps của PAST.T.
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

### Trục, niềm tin, value system (13/11)
- [x] **`M-he-gia-tri.md` ghi đè theo niềm tin** (13/11, tác giả): 16 chỗ lệch được ghi đè theo [[CH.thuyen.beliefs]] (động cơ hai lực 034 và 029; điểm mù theo 030; vạch do cái cân đặt; tình thương bằng vật theo 004 và 017; giấu năng lực theo 005, 002, 018; im lặng là lựa chọn theo 022, 008, 014). Mỗi chỗ mang nhãn `ghi đè 13/11`. §8.2 điểm 1 (đổ vỡ: "cái cân lộ ra") chờ tác giả xem lại.
- [x] **PAST hiện tại sẽ bỏ** (13/11, tác giả): PAST được viết lại từ đầu; nội dung PAST hiện có không sửa tiếp, giữ tới khi bản mới thay.
- [x] **Trục → niềm tin → value system** `locked 13/11` (tác giả): trục do tác giả định nghĩa; niềm tin thiết kế từ trục theo cá tính và mục đích dựng nhân vật; value system là thế giới quan hình thành từ niềm tin, dùng khi nhân vật quay ra ngoài; niềm tin dùng để độc thoại, tự soi. Vòng: niềm tin → value → hành động → kết quả → tự soi → niềm tin mới, nâng cấp hoặc đổi. Ranh giới theo vị trí trong vòng, ba phép thử. Ghi ở `docs/framework/model.md`, `schemas/value.md` (mới), `schemas/belief.md`, `schemas/event.md` (bốn trường của vòng), `PAST.G1`. Mã `V.<id>-NNN`. Luật `LAW.check.value-from`, `LAW.check.belief-value`.
- [x] **Gói value của Thuyên** `CH.thuyen.values` (13/11): một hệ, chín tiêu chí (001–007 `agreed`, 008–009 `proposed`); tách phần value khỏi B.thuyen-035, 020, 016 (giữ số); mẹo hai tờ nháp (005) thành `tactics`; B.thuyen-004 vẫn là niềm tin.
- [x] **Method** `locked 13/11` (tác giả): `tactics` của value tạo ra method (hàm, tư duy đối phó, hành động) cho từng case; hàm `FN` có hai kiểu `innate` và `method`, method trỏ về value (`LAW.check.method-from`); một hành động trong vòng được dựng từ nhiều hàm, ghi ở `calls`. Migrate từ gói niềm tin của Thuyên: 004, 005, 011, 025 thành method trọn (giữ số); 006, 008, 009, 022, 026, 031, 032 tách phần cách đối phó. Năm hàm mới (`hai-to-nhap`, `di-vong`, `hoi-chon-loc`, `vo-cam`, `gat-tinh-thuong`, `proposed`); ba value mới 010–012 (`proposed`).
- [x] **Bỏ loại `scale`** `locked 13/11` (tác giả): niềm tin và value system mô tả tiến trình nội tâm tốt hơn một thang số. `SCALE.exl`: mối lo và tiến trình thành trường `age` của niềm tin; dạng câu theo tuổi thành mục `existential` của `CH.thuyen.voice` (alias `SCALE.exl`, `EXL`); ba luật viết thành `rules/hien-sinh.md`; bản cũ ở `_archive/core/`. `SCALE.pride`: không tạo file, đọc từ `cai-toi-doc` và `amplified`. `SCALE.rom`: thành mục `nac-thich` của ROM.TN. Bỏ trường `level` của lá và thuộc tính `exl` (SELF.thuyen ghi chặng theo giai đoạn bằng một dòng).
- [x] **R10 Nội tâm** (tác giả chấp nhận 13/11): bản `chốt 04/11` chỉ có trong Project (`docs/rules/registers.md`), chưa từng vào repo. Đã gộp vào `rules/registers.md` (§0.6, §1, §2.6 với §2.6.1–2.6.3, §3, §4.2, §4.3, §5, §6.2, §7, §8), giữ các sửa 10/11 và 13/11 của repo; kèm các sửa 01/11 cùng bản (quãng 3 đại học của R9, luật chữ tục). Mục thư viện theo khuôn mới: `lib/registers/REG.noi-tam.md` (alias R10). Trỏ R10 ở `goi-ten-cam-xuc.md` (quãng 2, §5, §6) và `01-rules-viet.md` (ngoại lệ R9, R10 của *Tự thoại hiện sinh*); `TEC.interiority.ideal-self` `serves` nay là link.
- [x] **Tách belief và value thành file riêng** (13/11): mỗi niềm tin một file `world/characters/<id>/beliefs/B.<id>-NNN.md` (36 niềm tin: Thuyên 29, Nhi 6, Vũ 1, trừ năm số đã gộp hoặc chuyển), mỗi value một file `values/V.<id>-NNN.md` (12). `CH.<id>.beliefs.md` và `CH.<id>.values.md` giữ làm mục lục (cụm, `members`, system/measure/blind/rank/gaps, các số đã gộp). `cluster`, `axis`, `status`, `from` nằm ở frontmatter. Link `[[CH.x.beliefs#B.x-NNN]]` đổi thành `[[B.x-NNN]]` ở 48 file. Luật mới `LAW.check.entity-file`; `value-from`, `belief-value`, `method-from` đọc theo file. Nhi, Vũ chưa có `axis` (cảnh báo).
- [x] **Law và style** `locked 13/11` (tác giả): law trả lời *được viết gì, không được viết gì* (giữ tên `law`, `rules/` là thư mục; mục luật của node đổi tên `laws`); style trả lời *viết thế nào*, gộp register, pattern, technique thành một kind (`grain`: bundle, shape, move; `force`: bat-buoc, mac-dinh, tuy-chon). Hai bộ mặc định: [[STY.default]] (cứng: từ phức, thoại tự nhiên, cảnh hiện tại không tóm tắt, luật chuyển chung; mềm: R0 [[REG.default]] và sáu technique mặc định) và [[LAW.default]] (cứng: tám luật theo ART.0.1–0.6, 0.8, 0.9; mềm: gọi tên cảm xúc, người kể không biết hơn POV, chửi ba mức). R0 chỉ cho tình huống ít ảnh hưởng; rơi về R0 thì `LAW.check.default-style` báo theo mức của node (C, D ghi chú; A, B cảnh báo; S trở lên lỗi). Style mặc định theo tuyến: PAST R6, ROM R2, THR R4, SOL R1, FAM R1. R1–R9 có file `REG.*` (chép dòng bảng §1). `registers.md` §0.1 và `storylines/README.md` bước 7 sửa theo.

### Storage, info, style hài và thân mật (13/11)
- [x] **Storage** `locked 13/11` (tác giả): `content/storage/`, kind `store`, id `STO.<tên>`, mỗi kho một file, mỗi mục một dòng (`schemas/store.md`). [[STO.ha-tinh]] (§1–§2 của `rules/tu-dien-ha-tinh.md`; §3 đã ở [[LAW.dialect.ha-tinh]], thêm C4 "rứa", viết tắt tin nhắn); [[STO.xung-ho]] (bảng xưng hô và cách người kể gọi, `01-rules-viet.md`); [[STO.khoi-hien-thi]] (bảng `01c` gộp quy ước từng loại); [[STO.ten-rieng]] (tên thật, hư cấu, chữ viết tắt không dùng). Law trỏ bằng trường `data:` (`schemas/law.md`); nguồn cũ còn bảng chuyển. Luật `LAW.check.store`.
- [x] **Info** `locked 13/11` (tác giả): `content/info/<domain>/`, kind `info` (`schemas/info.md`), node và lá, mục inline `### <mục>`. [[INFO.humor]] (`style`: R1, R2, `TEC.humor.*`), lá [[INFO.humor.meme]]: tám meme (six seven, sigma, kid, aura farming, ragebait, gg ez, skill issue, idol), mỗi meme có `fact`, `valid`, `known-by`, `sources`, `seen-in` (HAI-001…015). [[INFO.economics]] node, chưa có lá. Lịch truyện 2024–2025; `valid` chỉ cảnh báo lúc viết, không xóa. Event có trường `info`. Luật `LAW.check.info-valid` (cảnh báo); khối SINH của tình tiết có `register` và gợi ý info (ghi ở ROM.TN-001, ROM.TN-002, X-011-001).
- [x] **Kỹ thuật hài** (13/11): `kho/hai-ky-thuat.md` tách thành [[TEC.humor.lenses]], [[TEC.humor.twist]], [[TEC.humor.reaction]], [[TEC.humor.heighten]], [[TEC.humor.volley]], [[TEC.humor.button]], [[TEC.humor.callback]] và [[PAT.humor.game]], [[PAT.humor.snowball]], [[PAT.humor.beat]] (`proposed`, theo nhãn nghiên cứu 05/11); §3.1 vào `style` của [[SOL.VU]], §3.2 vào `style` của [[ROM.TN]]; file cũ còn bảng chuyển và nguồn.
- [x] **Kỹ thuật thân mật** (13/11): *Cách viết cảnh thân mật*, *Fan service*, *Miêu tả ngoại hình gợi cảm* (`01-rules-viet.md`) và `01d` §3 thành [[TEC.intimacy.scene]], [[TEC.intimacy.fan-service]], [[TEC.intimacy.gaze]]; nối R2 (`uses`), R3 (`uses`), [[LAW.intimacy.limits]] (`technique`). Tính cách khi chạm, khi bị nhìn vào `style` của [[ROM.TN]], [[ROM.TD]]. Sửa "tháng 10/2026" thành 10/2024 (fan service bắt đầu từ mạch hiện tại).

## B. Còn mở: cần tác giả quyết

### Niềm tin

### Gốc
- [ ] **AX9**: đề xuất cũ còn treo.

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

- [ ] **B.thuyen-004 độc thoại lớp 4** dựa vào phương trình đã bỏ (`needs-decision`).

## C. Còn mở: Claude làm khi tác giả bảo

- [ ] **Law và style, việc còn lại** (13/11): tác giả duyệt câu chữ ART.0.7, 0.8, 0.9 (Claude soạn; LAW.harm.pain, LAW.intimacy.limits, LAW.pov.narrator-knowledge, LAW.swearing.levels `proposed` theo); style mặc định của SELF; chuyển ma trận `registers.md` §3 vào mục `style` của từng node (map `style` ở đầu node); tách luật POV Thuyên ở `goi-ten-cam-xuc.md` thành luật `mem` có `supersedes` [[LAW.naming.emotion]]; tách phần còn lại của `registers.md`, `01-rules-viet.md` thành law và style; PAST.N.R2 (register ấm, không R8) là style, chuyển sang mục `style` của PAST.N; `LAW.check.reg-conflict`.
- [ ] **Register còn lại**: ô R10 cho tuyến ngoài QK.T (§2.6.2) chờ duyệt; soát *Sợ*, *Tiếc nuối* theo §2.6.3; hai chỗ `01-rules-viet.md` (*Nguyên tắc chung*, *Nhịp kể*) mà bản 04/11 nói đã trỏ về R10 nhưng repo chưa có câu chữ.
- [ ] **Value system, việc còn lại**: `rank` của Thuyên; duyệt V.thuyen-008…012 và thân năm hàm method mới (`proposed`); xếp kiểu cho thieu, phuong-trinh, cai-toi, nhien-lieu; tách tên lửa, khí thải, răn khỏi lang-kinh; xếp kiểu hàm của Nhi, Vũ; phần khẳng định riêng của B.thuyen-020; điền `design` và `formed` cho từng niềm tin (làm cùng lúc viết lại PAST); gói value cho Nhi, Vũ; view `axis-trace` (trục → niềm tin → value → node tiêu thụ).
- [ ] **Viết lại PAST** (13/11: bỏ PAST hiện tại, viết lại theo mục tiêu "PAST dựng niềm tin để nhân vật dùng ở hiện tại"). Ghi chú cũ cho PAST.T: rà TB-16 / DV-016, DV-009, PAST.T-006 theo việc bỏ phương trình; (tác giả sẽ viết lại): thêm lá theo bảng `handoffs` của FAM.T; gọn 987 dòng văn bản chuyển nguyên.
- [ ] **FAM.T**: tạo hai lá hiện tại (cuộc gọi bốn phút mười hai giây, áo sơ mi trắng); P1 → AFTER (giỗ ông và lời khoe 50 triệu, chiến tranh lạnh, trị liệu gia đình) chưa có nguồn.
- [ ] **ROM.TN B4c**: chuyển BRIEF, KHO, RR; tách Phong sang ROM.PN, Diệp Anh sang ROM.TD; đánh lại số lá theo ngày; nối `goal`.
- [ ] **Node khung**: THR.*, SOL.SAN, SOL.DT, FAM.N, PAST.DA, PAST.K.
- [ ] **Giao điểm**: đặt mục tiêu riêng cho các giao điểm có `seed`, rồi tạo lá.
- [ ] **Storage, info, việc còn lại** (13/11): nguồn ngoài cho meme `kid`, `idol` và mốc phổ biến của `ragebait`; năm chỗ dùng meme trước `valid` ở bản cũ (six seven ở ch.9, ch.20; aura farming ở ch.23) để tác giả quyết khi viết lại v2; lá của [[INFO.economics]] (ứng viên: salary, prices, tech-market); `style` của INFO.economics (R4, R8) là đề xuất; ẩn dụ hài của hội đồng và Thuyên – Hưng chờ `style` của SOL.HD, SOL.SAN; [[LAW.intimacy.limits]] C4 chưa chép vế "tỉnh táo, đồng thuận rõ ràng, không thân mật khi một bên say" của `01-rules-viet.md` *Giới hạn cứng* (cần tác giả duyệt câu chữ, cùng lúc duyệt ART.0.9).
- [ ] **canon-check**: không hai giao điểm cùng tập node; `goal` của lá giao điểm phục vụ mục tiêu riêng của giao điểm; node chỉ đọc node khác qua `share`.
- [ ] **Quét từ phức lần hai** cho văn bản chuyển sau 10/11 sáng (PAST.T `story`/`pages`, PAST.N, SOL.HD, FAM.T).
