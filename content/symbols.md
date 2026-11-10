# symbols (SINH)

Sinh bởi `npm run canon:check`. Không sửa tay. Mã → file → một câu. Mã viết trong backtick để file này không tạo cạnh trong đồ thị.

Có phần đầu (frontmatter): 127 file. Chưa chuyển sang khuôn mới (legacy): 151 file.

| Mã | Loại | Trạng thái | File | Tóm tắt |
| --- | --- | --- | --- | --- |
| `ART.0` | `constitution` | `locked` | `core/constitution/ART.0.md` | Căn cứ cho các luật không sinh từ một trục: hình thức, khối hiển thị, xưng hô, giọng địa phương, ranh dưới 18 tuổi, cấu trúc. **Bản nháp … |
| `ART.AX3` | `constitution` | `locked` | `core/constitution/ART.AX3.md` | Các điều lấy căn cứ ở **thành tố**, không ở câu gốc. Câu gốc là lời kể, chỉ kể được thước của người khác; nó nằm ở `samples`. Luật giai đ… |
| `CFG.calendar` | `config` | `proposed` | `config/calendar.md` | Một nguồn duy nhất cho ngày tháng. Luật `LAW.check.weekday` kiểm mọi ngày trong tài liệu theo file này. |
| `CFG.ids` | `config` | `proposed` | `config/ids.md` | Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; … |
| `CFG.levels` | `config` | `proposed` | `config/levels.md` | Mức đo **độ cần thiết** của một tuyến, node hoặc giao điểm đối với truyện **trong một giai đoạn**. Không đo độ hay của chất liệu. |
| `CFG.phases` | `config` | `proposed` | `config/phases.md` | Chiều thời gian của star schema. Mọi giá trị động (weight, relation, state, voice, hiệu lực luật) được ghi **theo giai đoạn**. Thứ tự cố … |
| `CFG.statuses` | `config` | `proposed` | `config/statuses.md` | Mỗi dòng, mỗi file mang một trạng thái. Trạng thái là mức ổn định: tầng nào dựa vào tầng nào thì không được ổn định hơn nó. |
| `CH.nhi` | `character` | `agreed` | `world/characters/nhi/CH.nhi.md` | Nữ chính. Tiểu thư nổi loạn trong một gia đình siêu giàu luôn sắp đặt chỗ ngồi cho cô; trạng thái mặc định là "ranh con" (khéo léo cộng đ… |
| `CH.nhi.beliefs` | `character` | `locked` | `world/characters/nhi/CH.nhi.beliefs.md` | Khuôn hai lớp (`schemas/belief.md`): lớp định nghĩa (bắt buộc) và tự thoại (tùy chọn, là công cụ thiết kế, chép lên trang là tùy chọn). M… |
| `CH.nhi.mechanics` | `character` | `agreed` | `world/characters/nhi/mechanics/CH.nhi.mechanics.md` | Chữ ký mọi hàm, mỗi hàm một dòng. Thân từng hàm ở `FN.nhi.<tên>.md` trong thư mục này. |
| `CH.nhi.voice` | `character` | `agreed` | `world/characters/nhi/CH.nhi.voice.md` | Tầng thấp nhất của chuỗi giọng. Giọng với từng người (Thuyên, Phong, hội đồng, Khải) là của node quan hệ. Kỹ thuật chi tiết sẽ thành `TEC… |
| `CH.thuyen` | `character` | `agreed` | `world/characters/thuyen/CH.thuyen.md` | Nam chính, POV chính. Một chàng trai giỏi đọc người, mù với chính mình, chạy bằng một cỗ máy hiện sinh mà nhiên liệu là sự công nhận. |
| `CH.thuyen.beliefs` | `character` | `agreed` | `world/characters/thuyen/CH.thuyen.beliefs.md` | **Luật của gói** `locked 10/11`: tình thương, nhu cầu được ôm và nỗi cô độc luôn `seen: khong` suốt Phần 1; chúng chỉ có lớp định nghĩa, … |
| `CH.thuyen.mechanics` | `character` | `agreed` | `world/characters/thuyen/mechanics/CH.thuyen.mechanics.md` | Sơ đồ và chữ ký mọi hàm, mỗi hàm một dòng. Thân từng hàm ở `FN.thuyen.<tên>.md` trong thư mục này. |
| `CH.thuyen.voice` | `character` | `locked` | `world/characters/thuyen/CH.thuyen.voice.md` | Tầng thấp nhất của chuỗi giọng: tình tiết > node × giai đoạn > `SELF.thuyen` × giai đoạn > **giọng nền (file này)**. Giọng với từng người… |
| `CH.vu` | `character` | `agreed` | `world/characters/vu/CH.vu.md` | Người bạn thân của Thuyên, "hội đồng một người" của anh. Yêu thương bằng hành động, nói năng thẳng thắn, không ghen tị; biết mọi biến cố … |
| `CH.vu.beliefs` | `character` | `agreed` | `world/characters/vu/CH.vu.beliefs.md` | Khuôn hai lớp (`schemas/belief.md`). Dải của Vũ bắt đầu từ `BL-050`. **Giọng tự thoại của Vũ:** xưng "tao", thẳng thắn, không lý thuyết; … |
| `CH.vu.mechanics` | `character` | `agreed` | `world/characters/vu/mechanics/CH.vu.mechanics.md` | CH.vu.mechanics · Cơ chế của Vũ |
| `CH.vu.voice` | `character` | `agreed` | `world/characters/vu/CH.vu.voice.md` | **Mục:** `dialogue` · `narration` · `lexicon` · `forbidden`. |
| `FN.nhi.cam` | `function` | `proposed` | `world/characters/nhi/mechanics/FN.nhi.cam.md` | Thấu cảm là giác quan chủ đạo. Cô cảm nhận được điều người khác che giấu, gọi tên được cảm xúc, nhưng lý giải sai nguyên nhân. |
| `FN.nhi.cong-cu` | `function` | `locked` | `world/characters/nhi/mechanics/FN.nhi.cong-cu.md` | Lựa chọn công cụ theo hoàn cảnh. **Khéo léo cộng đanh đá thành ranh con**: khéo léo đơn thuần thì ra người ngoan ngoãn, đanh đá đơn thuần… |
| `FN.nhi.phan-khang` | `function` | `proposed` | `world/characters/nhi/mechanics/FN.nhi.phan-khang.md` | Phản kháng là cơ chế mặc định của cô với Thuyên: bị chê bai thì tranh cãi, được khen ngợi thì gạt đi, bị trêu chọc thì đấm. |
| `FN.nhi.thich` | `function` | `proposed` | `world/characters/nhi/mechanics/FN.nhi.thich.md` | Cô rung động theo ba gu, và thẩm định bằng một cây thước tự khai năm mười sáu tuổi. Cây thước sai lệch; gu thật thì không sai, cô chỉ hìn… |
| `FN.thuyen.adhd` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.adhd.md` | Tầng dưới cùng: hệ thần kinh chạy bằng hứng thú, dạng kết hợp. Không thay hai cái tôi, không thay đòn roi; mọi thứ khác đắp lên nó. |
| `FN.thuyen.cai-goi` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.cai-goi.md` | Bộ phận bị khóa: cái gối, người duy nhất ở lại với con người thật nhất của anh. Cần được ôm, được nghe khóc, được ghi nhận cái cố. |
| `FN.thuyen.cai-toi` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.cai-toi.md` | Hai cái tôi trên cùng một động cơ áp suất chênh lệch: cái tôi lành (cái cân, cố vì mình) và cái tôi độc (tiền mua tình thương, thuốc giảm… |
| `FN.thuyen.lang-kinh` | `function` | `locked` | `world/characters/thuyen/mechanics/FN.thuyen.lang-kinh.md` | Lăng kính: thu nạp thông tin và phân tích khách quan, kể cả về chính anh, trong vùng do một mục tiêu khoanh lại (việc này có phù hợp với … |
| `FN.thuyen.luoi-co-chon-loc` | `function` | `locked` | `world/characters/thuyen/mechanics/FN.thuyen.luoi-co-chon-loc.md` | Cùng một phép tính chi phí – lợi ích, khác đầu vào: thành quả nhỏ thì lười, thành quả lớn thì cày. |
| `FN.thuyen.nang-khieu` | `function` | `proposed` | `world/characters/thuyen/mechanics/FN.thuyen.nang-khieu.md` | Năng khiếu: nhìn ra cấu trúc giấu dưới bề mặt, học bằng liên kết. Lăng kính ở dạng sạch. |
| `FN.thuyen.nhien-lieu` | `function` | `proposed` | `world/characters/thuyen/mechanics/FN.thuyen.nhien-lieu.md` | Nhiên liệu là sự công nhận; cái tôi độc là thuốc giảm đau. Liều đầu ngấm sâu, liều lặp nhạt, phải tăng liều. |
| `FN.thuyen.phong-kin` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.phong-kin.md` | Cái tôi độc ở đại học và GĐ1: sống trong phòng kín. Giọng trong đầu, bộ dịch ở miệng, kênh luật chơi ở tay. |
| `FN.thuyen.phuong-trinh` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.phuong-trinh.md` | Bộ chuyển đổi: giỏi = được thương, thiếu = chưa đủ giỏi. Trên nó dựng hệ giá trị tự sửa bốn tầng. |
| `FN.thuyen.quan-su` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.quan-su.md` | Quân sư giỏi cho người khác, mù cho chính mình. |
| `FN.thuyen.teu` | `function` | `proposed` | `world/characters/thuyen/mechanics/FN.thuyen.teu.md` | Van xả: tếu. Xả áp cạnh người thân mà không mở khóa. Ba số: Ngạo, Trào, Song. |
| `FN.thuyen.thieu` | `function` | `agreed` | `world/characters/thuyen/mechanics/FN.thuyen.thieu.md` | Đầu vào của cỗ máy: cái thiếu bị chối hai lần, trong nhà không ai thấy, ngoài nhà bảo là sướng. |
| `FN.vu.lat` | `function` | `proposed` | `world/characters/vu/mechanics/FN.vu.lat.md` | Vũ không tính toán; Vũ nói thẳng. Thuyên đưa ra một cái cớ hợp lý, Vũ lật ngược nó bằng một câu duy nhất. |
| `FN.vu.thuong-bang-hanh-dong` | `function` | `locked` | `world/characters/vu/mechanics/FN.vu.thuong-bang-hanh-dong.md` | in Vũ thích một cô gái, hoặc thương một người bạn |
| `GRP.hoi-dong-nhi` | `group` | `agreed` | `world/groups/GRP.hoi-dong-nhi.md` | Ba người bạn thân của Nhi, nhóm chat *HĐQT 🎀*. Phản đối Thuyên vì gia thế không xứng; càng phá càng bất lực, càng có cảm tình. |
| `GUIDE.invariants` | `guide` | `draft` | `guidelines/invariants.md` | Rules that always hold. Machine-checked ones name their check (`docs/framework/tooling.md`); the rest are checked by you before saying "d… |
| `GUIDE.main` | `guide` | `draft` | `GUIDELINES.md` | Read this first in every session. It says how to work on the story. For what the system *is* (entities, ids, inheritance, tooling), look … |
| `GUIDE.old-workflow` | `guide` | `superseded` | `quy-trinh.md` | Oct 25, 2026 · @aureliustran. Cách tác giả và Claude làm việc với nhau, theo từng loại việc. Kiến trúc nền: `kien-truc.md`. |
| `GUIDE.placement` | `guide` | `draft` | `guidelines/placement.md` | Ask the questions in order; the first "yes" decides. Ids: `docs/framework/ids.md`. Fields: the kind's schema. |
| `GUIDE.reading` | `guide` | `draft` | `guidelines/reading.md` | Tokens are the budget. Every task starts from one entry and follows links; nothing is loaded "to be safe". |
| `GUIDE.roles-and-status` | `guide` | `draft` | `guidelines/roles-and-status.md` | **When to ask.** Anything that touches canon: ask first (at most four questions at once, each with a recommendation). Anything inside an … |
| `GUIDE.task.add-event` | `guide` | `draft` | `guidelines/tasks/add-event.md` | What happens; the node it belongs to; the goal it serves. |
| `GUIDE.task.add-law-or-technique` | `guide` | `draft` | `guidelines/tasks/add-law-or-technique.md` | Must hold (pass/fail) → **law**. A voice bundle → **register**. A method → **technique**. The shape of a beat or scene → **pattern**. A m… |
| `GUIDE.task.audit` | `guide` | `draft` | `guidelines/tasks/audit.md` | **Trigger:** "rà soát ch.N–M", or before a new phase. |
| `GUIDE.task.crosspost-convert` | `guide` | `draft` | `guidelines/tasks/crosspost-convert.md` | **Trigger:** "chuyển chương 1–5 cho rookies", "convert chapter 12 for rookies", "làm bản đăng chéo". |
| `GUIDE.task.plan-chapter` | `guide` | `draft` | `guidelines/tasks/plan-chapter.md` | **Trigger:** "lên plan ch.N", step 1–2 of "viết ch.N–M". |
| `GUIDE.task.propose-options` | `guide` | `draft` | `guidelines/tasks/propose-options.md` | **Trigger:** "nghĩ cách xử lý …", "có những hướng nào cho …", "dựng kho cho …", "thiết kế sự kiện …". |
| `GUIDE.task.record-decision` | `guide` | `draft` | `guidelines/tasks/record-decision.md` | **Trigger:** "chốt …", "ok cái này", "chọn phương án 2", an answer to a `Q-`. |
| `GUIDE.task.revise-chapter` | `guide` | `draft` | `guidelines/tasks/revise-chapter.md` | **Trigger:** "sửa đoạn …", "chương N đọc chưa ổn". |
| `GUIDE.task.sync-blueprint` | `guide` | `draft` | `guidelines/tasks/sync-blueprint.md` | **Trigger:** after writing; after the author edits a chapter; `LAW.check.bp-drift` or `bp-anchor` reports. |
| `GUIDE.task.write-scene` | `guide` | `draft` | `guidelines/tasks/write-scene.md` | The blueprint scene(s) assigned to you; its write-kit. |
| `PAST` | `node` | `agreed` | `storylines/past/PAST.md` | Gốc của các node quá khứ: mỗi node là một bảng neo sinh niềm tin mà hiện tại tiêu thụ. Luật kể quá khứ (bốn luật QK): `tuyen/qua-khu/READ… |
| `PAST.T` | `node` | `agreed` | `storylines/past/PAST.T.md` | Bảng neo: những gì đã xảy ra với Thuyên từ mầm non tới hết thực tập, mỗi neo sinh một hoặc vài niềm tin ([[CH.thuyen.beliefs]]) mà hiện t… |
| `PAST.T-001` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-001.md` | Đếm bánh chưng; đếm đúng mà không ai tin. |
| `PAST.T-002` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-002.md` | Tủ kính: tờ của chị họ đẩy tờ *tiên tiến* của anh vào trong. "Có tờ mới thì ra." |
| `PAST.T-003` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-003.md` | Cuốn sách vũ trụ, tinh vân trong xe rác; đêm ấy cắn gối khóc. Sau cơn khóc ôm gối, tưởng tượng cái gối an ủi mình (phần gối: proposed). |
| `PAST.T-004` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-004.md` | Cái phích vỡ; roi, nằm sấp. Ôm gối dưới ngực, cái gối "nói" (phần gối: proposed). |
| `PAST.T-005` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-005.md` | Mẹ gỡ xương cá. |
| `PAST.T-006` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-006.md` | Mẹ khen Nam. Đêm ấy anh hỏi gối "nếu con giỏi như anh Nam thì…", gối không trả lời (DV-016 bậc 1). |
| `PAST.T-007` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-007.md` | Tờ nháp, lớp 6: hai tờ, một tờ cho người chấm, một tờ của mình. |
| `PAST.T-008` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-008.md` | Khai sinh cái tôi lành: cô Toán cầm bài ngắn nhất lớp lên, "Cả lớp xem bạn Thuyên giải." Tai nóng, tay run, đêm ấy nhớ từng chữ. Cùng năm… |
| `PAST.T-009` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-009.md` | Bài chín điểm, cãi đến cùng, bẻ roi, lớp 7. Đêm ấy: sổ hai cột, ghét thằng bé cột điện. |
| `PAST.T-010` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-010.md` | Giấy khen, 47 lượt thích, lớp 8; giải huyện học ít vẫn có (vị trí: proposed); bác Hùng bình luận "con bác năm ngoái giải tỉnh rồi đó"; vỏ… |
| `PAST.T-011` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-011.md` | Bài văn *Ước mơ của em*, 6,5; họp phụ huynh, "cục đất". |
| `PAST.T-012` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-012.md` | Phiếu khảo sát tâm lý: trả lời thật thì không ai gọi. |
| `PAST.T-013` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-013.md` | Phiếu thi chuyên ("Có rứa mới bằng con nhà người ta"), đỗ chuyên Toán thứ tư, mẹ gọi sang nhà bác Hùng, Casio dây rộng. |
| `PAST.T-014` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-014.md` | Sân trọ: gà (ném vào chậu cây), anh Long, Kyrie, đổi tay qua người anh Long; tếu sinh (Ngạo + Trào vô hại). |
| `PAST.T-015` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-015.md` | Ám ảnh luyện tập: 5 giờ, chạy, hít đất, hít xà; vở giáo án; cày sâu không cày rộng; học kỹ thuật nặng bằng ghép kỹ thuật nhỏ. |
| `PAST.T-016` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-016.md` | Giải Nhất tỉnh môn Tin; đứng đầu kỳ chọn đội tuyển Tin; cày lén; giữ giáo án riêng. |
| `PAST.T-017` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-017.md` | Bố mẹ gạt "Tin thì được cái chi"; *Không bao giờ đủ*; cô bạn mập mờ thấy anh buồn, anh dập bằng "Tao số một tỉnh" (Ngạo lần đầu mất vỏ); … |
| `PAST.T-018` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-018.md` | Thi học sinh giỏi quốc gia môn Tin: khinh bài dễ, dồn giờ cho bài khó. 13/3/2021, giữa tiết Hóa: không giải. Đáy: phẳng, tếu tắt. Ôm gối … |
| `PAST.T-019` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-019.md` | Hiếu không an ủi: "Ông chỉ tôi bài ni."; "Chơi không? Thiếu một."; trận anh ghi nhiều điểm nhất mà đội thua, không ai bỏ đi. |
| `PAST.T-020` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-020.md` | Anh Long: "Giữ bóng giỏi rồi. Giờ học chuyền."; xem lại video trận thua; chọn du học; cố vì mình; bắt đầu ôn IELTS. |
| `PAST.T-021` | `event` | `proposed` | `storylines/past/PAST.T/PAST.T-021.md` | Không thi lại quốc gia; chia giáo án Tin, dòng đầu *bài dễ cũng tối ưu*; giải bóng năm sau: chuyền, đội thắng; thi IELTS 8.0; thư nhận từ… |
| `PAST.T-022` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-022.md` | Hà Nội tự do mà yên tĩnh; sách vũ trụ đắt nhất vẫn bọc nilon. |
| `PAST.T-023` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-023.md` | "Chơi không? Thiếu một." Vũ, sân khu tập thể. |
| `PAST.T-024` | `event` | `page` | `storylines/past/PAST.T/PAST.T-024.md` | Hackathon ba mươi sáu tiếng: đọc ba người trong mười phút, chia việc; đội giải Nhì; về sau vào CLB Tin học, đầu năm hai thành phó ban. |
| `PAST.T-025` | `event` | `page` | `storylines/past/PAST.T/PAST.T-025.md` | Đề tài nghiên cứu: nhận cả phần của Đức và Lan, tay bận thì cái đau ngủ; thầy Bình hỏi *Tại sao là em?* chưa trả lời được; đề tài lên cấp… |
| `PAST.T-026` | `event` | `agreed` | `storylines/past/PAST.T/PAST.T-026.md` | Thư mục *sau-nay*, *Congratulations.*, đọc một lần rồi không mở. |
| `PAST.T-027` | `event` | `page` | `storylines/past/PAST.T/PAST.T-027.md` | Sáu tháng thực tập ở tòa nhà kính; hết thực tập tháng 9, "không biết dậy sớm để làm gì"; mail summit đến thì nhẹ. |
| `SCH.article` | `schema` | `proposed` | `schemas/article.md` | A constitution article: an invariant split from an axis; phase laws take their basis from it. See [rules-engine](../../docs/framework/rul… |
| `SCH.belief` | `schema` | `agreed` | `schemas/belief.md` | A belief (old `NT-`): what a character holds about self, others or the world, produced by personality meeting a wound, consumed by presen… |
| `SCH.blueprint` | `schema` | `proposed` | `schemas/blueprint.md` | The plan of one chapter: how events combine into it. See [blueprints](../../docs/framework/blueprints.md). |
| `SCH.character` | `schema` | `proposed` | `schemas/character.md` | A **static** entity (dimension table). Values over time live in nodes (`storylines/`), not here. |
| `SCH.config` | `schema` | `proposed` | `schemas/config.md` | A constant of the story (calendar, phases, levels, statuses, old→new id map). **Location:** `content/config/<name>.md`. **Id:** `CFG.<nam… |
| `SCH.constitution` | `schema` | `proposed` | `schemas/constitution.md` | One chapter of the constitution: the articles split from one axis (`ART.AX<n>.md`) or the foundations (`ART.0.md`). **Location:** `core/c… |
| `SCH.edition` | `schema` | `proposed` | `schemas/edition.md` | One edition of the story (`v1` Legacy, `v2` the main site). **Location:** `plans/ED.<edition>.md`. **Id:** `ED.v2`. |
| `SCH.event` | `schema` | `proposed` | `schemas/event.md` | The **leaf** of a storyline tree: the unit that decides content (what must be written, when, for which goal, under which laws, how). See … |
| `SCH.function` | `schema` | `proposed` | `schemas/function.md` | A **mechanism** of one character, written like a function with a signature. An agent reads `in` and `when` to know when to call it, witho… |
| `SCH.goal` | `schema` | `proposed` | `schemas/goal.md` | A goal of a node, decomposed down the tree. See [storylines](../../docs/framework/storylines.md#node). |
| `SCH.group` | `schema` | `proposed` | `schemas/group.md` | A group of people and its crowd characters. |
| `SCH.guide` | `schema` | `proposed` | `schemas/guide.md` | A guideline for agents: how to work. **Location:** `content/GUIDELINES.md` (entry) and `content/guidelines/**`. **Id:** `GUIDE.<name>`; t… |
| `SCH.intersection` | `schema` | `proposed` | `schemas/intersection.md` | An **occasion** several nodes write into: a hyperedge, not a node. It sits outside the node tree and has its own tree (spans contain occa… |
| `SCH.law` | `schema` | `proposed` | `schemas/law.md` | A law is an **entity of its own**, not a block of text. One law applies to some targets; a target is under several laws. Semantics (hiera… |
| `SCH.node` | `schema` | `proposed` | `schemas/node.md` | A **dynamic** entity: a thread with people and events in time, serving at least one axis. Storylines (`ROM`, `PAST`, …) and `SELF.<id>` a… |
| `SCH.object` | `schema` | `proposed` | `schemas/object.md` | A meaningful object (recurring, symbolic, or evidence). **Location:** `world/objects/OBJ-NNN.md`, or inline in a setting when minor. **Id… |
| `SCH.pattern` | `schema` | `proposed` | `schemas/pattern.md` | The shape of a beat or a scene (e.g. anchor in five steps, twist in five steps, inference beat, emotion chain of eight links). See [libra… |
| `SCH.plan` | `schema` | `proposed` | `schemas/plan.md` | A plan for a range of chapters: which nodes are in scope and what is due. It groups blueprints; each chapter's detail is its blueprint (s… |
| `SCH.post` | `schema` | `proposed` | `schemas/chapter.md` | A chapter as published, in `content/posts/<edition-dir>/`. The chapter file is never renamed or given metadata (the import parser and the… |
| `SCH.proposal` | `schema` | `proposed` | `schemas/proposal.md` | An unapproved proposal (old `de-xuat/`). **Location:** `proposals/PROP-NNN.md`; once merged, `proposals/_merged/`. **Id:** `PROP-NNN`; ol… |
| `SCH.register` | `schema` | `proposed` | `schemas/register.md` | A register (văn phong): a voice bundle for narration or dialogue. See [library](../../docs/framework/library.md). |
| `SCH.schema` | `schema` | `proposed` | `schemas/schema.md` | A model of one entity kind. **Location:** `content/schemas/<kind>.md`. **Id:** `SCH.<kind>`. |
| `SCH.secret` | `schema` | `proposed` | `schemas/secret.md` | A secret, tracked as an entity to know **who knows what, when**. **Location:** `world/secrets/SEC-NNN.md`. **Id:** `SEC-NNN`. |
| `SCH.setting` | `schema` | `proposed` | `schemas/setting.md` | A place, a recurring space. **Location:** `world/settings/SET.<name>.md`. **Id:** `SET.<name>`. Header: `parent` (larger setting, if any). |
| `SCH.spec` | `schema` | `proposed` | `schemas/spec.md` | A specification page of the framework or the app. **Location:** `docs/**`. **Id:** `SPEC.<name>`. |
| `SCH.technique` | `schema` | `proposed` | `schemas/technique.md` | A sentence- or paragraph-level method that achieves a law or a register. See [library](../../docs/framework/library.md). |
| `SEC-001` | `secret` | `agreed` | `world/secrets/SEC-001.md` | Nhi là con gái Chủ tịch tập đoàn Astrea và em gái Khải, Tổng giám đốc ([[CH.nhi]]). |
| `SEC-002` | `secret` | `locked` | `world/secrets/SEC-002.md` | Sau khi lượt 1 thất bại (2021), bố mẹ Nhi ngầm tạo điều kiện cho Phong, người có cảm tình với Nhi và có phụ huynh là đối tác của Astrea, … |
| `SELF` | `node` | `agreed` | `storylines/self/SELF.md` | Gốc của các node `SELF.<id>`: mỗi nhân vật có hiện sinh một node, làm chủ thuộc tính nội tâm của người ấy theo giai đoạn. |
| `SELF.thuyen` | `node` | `agreed` | `storylines/self/SELF.thuyen.md` | Làm chủ các thuộc tính nội tâm của [[CH.thuyen]] theo giai đoạn: `exl`, `cai-toi-doc`, `lang-kinh`, `cai-goi`, `luc-keo`, `luc-day`, và g… |
| `SPEC.adr-001` | `spec` | `agreed` | `docs/framework/adr/ADR-001-story-framework.md` | Before the framework (state of early November 2026): |
| `SPEC.blueprints` | `spec` | `draft` | `docs/framework/blueprints.md` | Fields: `content/schemas/blueprint.md`, `edition.md`, `chapter.md`. |
| `SPEC.editions` | `spec` | `locked` | `docs/plan-legacy.md` | Oct 20, 2026. Development plan. **Rollout steps 1 and 2 are built** (Oct 21, see "Status"). |
| `SPEC.framework` | `spec` | `draft` | `docs/framework/README.md` | Entry point of the **spec**: what the system is. For *how to work in it*, read [`content/GUIDELINES.md`](../../content/GUIDELINES.md) first. |
| `SPEC.ids` | `spec` | `draft` | `docs/framework/ids.md` | Every entity that can be pointed at has an id, including inline entities (goals, scenes, clauses, beats, steps). Old → new code mapping (… |
| `SPEC.index` | `spec` | `draft` | `docs/README.md` | Specs only: how the framework and the app are built. Story material is in [`content/`](../content/GUIDELINES.md). |
| `SPEC.layout` | `spec` | `draft` | `docs/framework/layout.md` | content/ |
| `SPEC.library` | `spec` | `draft` | `docs/framework/library.md` | `lib/` mirrors `rules/`: same aspects, same selector syntax (`applies-to`, `effective`, `except`), so one engine answers "what applies he… |
| `SPEC.model` | `spec` | `draft` | `docs/framework/model.md` | How entities fit together. Fields of each kind are defined in its schema under `content/schemas/`; this file never repeats them. |
| `SPEC.old-architecture` | `spec` | `superseded` | `kien-truc.md` | Oct 25, 2026 · @aureliustran. **[chốt 25/10]** repo là kho gốc. Phần còn lại là thiết kế đang áp dụng; chỗ nào chưa triển khai có ghi rõ. |
| `SPEC.rules-engine` | `spec` | `draft` | `docs/framework/rules-engine.md` | How rules are derived, scoped and combined. Fields: `content/schemas/article.md`, `content/schemas/law.md`. |
| `SPEC.storylines` | `spec` | `draft` | `docs/framework/storylines.md` | Fields: `content/schemas/node.md`, `goal.md`, `event.md`, `intersection.md`. |
| `SPEC.tooling` | `spec` | `draft` | `docs/framework/tooling.md` | `npm run canon:check` (`scripts/canon-check.mjs`, no dependencies) is the rule runner. It reads every entity under `content/` and every p… |
| `TEC.interiority.ideal-self` | `technique` | `proposed` | `lib/interiority/TEC.interiority.ideal-self.md` | Đưa lực kéo ([[CH.thuyen.beliefs#BL-034]]) lên trang qua lời người kể. Phục vụ register R10 (khối nội tâm, `rules/registers.md` §2.6); `s… |
