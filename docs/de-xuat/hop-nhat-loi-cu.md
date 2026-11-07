# Đèn vàng – Hợp nhất lõi cũ vào cây tuyến

Oct 26, 2026 · @aureliustran. **[chốt 26/10]** Tác giả chốt theo khuyến nghị (Q-037 đến Q-046); đáp án nằm ở `canon/cau-hoi.md`, mục "Đã đóng". Câu gốc của H1, H3 vẫn là `[đề xuất]` (mục 4). Đã áp vào `tuyen/goc.md`, `tuyen/README.md`, `tuyen/qua-khu/README.md`, `kien-truc.md`, `quy-trinh.md`, `README.md`. Phần chưa làm ghi ở mục 6.

Yêu cầu của tác giả (26/10): đọc lõi của skill và tài liệu cũ (canon, bible, thẻ nhân vật), tìm chỗ cây tuyến còn lệch với lõi cũ, đề xuất hợp nhất lõi cũ vào cây.

Viết bởi session kiến trúc. Không đụng `docs/tuyen/thriller/`, `docs/tuyen/romance/`, `docs/de-xuat/th-*.md`, `docs/de-xuat/rm-*.md`. Phần thuộc TH hoặc RM chỉ được nêu để chuyển cho phiên ấy.

Đã đọc: `docs/kien-truc.md`, `quy-trinh.md`, `README.md`, `de-xuat/cay-tuyen.md`, `hop-nhat-cay-tuyen.md`, `ngan-sach-tuyen.md`, `rm-handoff.md`, `canon/cau-hoi.md`, `claude/v2/bible-v2.md`, sáu skill `den-vang-*`, thẻ Nhi, `M-he-gia-tri`, `M-dien-bien-cam-xuc`, `plan-giai-doan-2-hop-nhat.md`, `brief-kieu-ngao-tang-dan.md`, `th-tai-cau-truc-lab.md`, `th-nguyen-lieu-tu-canon.md`.

**Chưa đọc:** `de-xuat/q-001-…`, `den-vang/characters.yaml`, `02-mach-truyen.md` legacy, `01-rules-viet.md`, `01c`, `01d`, các chương. Chỗ nào phụ thuộc vào đó thì ghi rõ ở dưới.

---

## 1. Kết luận

Lõi cũ nhập vào cây được, không cần dựng thêm tầng. Ba việc chính:
1. **Tách sự kiện ra khỏi thẻ nhân vật.** Thẻ giữ ai là ai. Sự kiện về node chủ.
2. **Gom bốn thang "nấc" về ba tên.** Hiện bốn thang cùng gọi là "nấc".
3. **Cho trục H một khuôn có câu của tác giả.** Hiện H là nhãn do Claude đặt (mục 4).

Còn lại là bổ sung cột, bổ sung ô, và đóng các chỗ lệch nhỏ (mục 2).

## 2. Chỗ cây còn lệch với lõi cũ, và cách nhập

| # | Chỗ lệch | Nhập như sau | Q | Đã áp |
| --- | --- | --- | --- | --- |
| 1 | **Bốn thang cùng tên "nấc":** hiện sinh 9 nấc; kiêu ngạo của Thuyên 0 đến 7 gắn ch.25 đến 51; cảm xúc của Nhi 0 đến 7; chín nấc "Nhi thích Thuyên" ở KHO. Trường `Nấc` của tình tiết không biết chọn thang nào | Đổi tên: **Nấc-HS** (hiện sinh, thuộc gốc), **Nấc-TT** (kiêu ngạo Thuyên), **Nấc-RM** (chín nấc KHO). Hai thang của Nhi (0 đến 7 và chín nấc KHO) có thể là một; cần đọc lại cả hai rồi gộp hoặc giữ | Q-039 | `goc.md` §3; gộp thang Nhi chưa làm |
| 2 | **Thẻ nhân vật chứa sự kiện** (mốc theo chương, cảnh đã xảy ra) | Thẻ về `nhan-vat/<tên>.md`, bỏ số chương, thêm ba trường đầu thẻ: `Gốc: H…`, `NT: …`, `Node chủ: …`. Sự kiện chuyển thành tình tiết ở node chủ | Q-041 | `kien-truc.md` §6; thẻ chưa chuyển |
| 3 | **"Người đọc biết gì"** và mốc cử chỉ nằm trong thẻ | Thành sổ "ai biết gì" của giao điểm (đã có ở X-13) và cột trong bảng tình tiết | Q-041 | `tuyen/README.md` §7 |
| 4 | **Trục H gần như toàn của Thuyên.** Cái "Cần" của Nhi, Diệp Anh, Khải không có trục (H7 là trục duy nhất phía Nhi) | Ánh xạ "Cần" vào H có sẵn bằng trường `Cần → H` trong thẻ; thêm trục chỉ khi có "Cần" không vào H nào | Q-040 | `goc.md` §2, `kien-truc.md` §6 |
| 5 | **Bảng tình tiết thiếu cột** nhiên liệu, giá, register. Cơ chế nhờn thuốc, bảy loại nhiên liệu cho kiêu ngạo (`brief-van-phong-dau-tri` §8, chốt 11/10) chưa có chỗ ở trong cây | Cơ chế biến chất vào `goc.md`. Bảng tình tiết thêm ba cột **tùy chọn**: `Nhiên liệu`, `Giá`, `Register`. Nhiên liệu và Giá bắt buộc với node mức S trở lên | Q-042 | `goc.md` §5, `tuyen/README.md` §7 |
| 6 | **Register chia theo chương** (skill `van-phong`, rules cũ) trong khi cây cho node TH.LAB mức SS+ và luật va chạm theo nhịp | Register về `rules/registers.md`. Node ghi register mặc định ở đầu file. Giao điểm ghi register từng nhịp. Cột `Register` chỉ điền khi lệch mặc định | Q-042 | khuôn file; `registers.md` chưa viết (cần đọc `rules/` trước) |
| 7 | **`cay-tuyen` §8 bỏ sót bible §2, §4, §9** | §2 (lịch) về `canon/lich.md`; §4 (nhân vật) tách vào `nhan-vat/` và node; §9 (Phần 2 đến 4) là nguồn của ô hậu sân bay | Q-043 | `kien-truc.md` §2 |
| 8 | **Cây dừng ở sân bay**, nhưng TH.DR, GD.N, QK.K có nội dung sau sân bay (luận văn Phần Lan, startup Phần 3, Khải nhảy vào Phần 4, hội đồng thật của gia đình) | Ô **hậu sân bay** trong ma trận mức cho ba node ấy, mức `[chờ]` cho tới khi "Phần" được định nghĩa. Không thêm cột giai đoạn mới | Q-043 | `tuyen/README.md` §3, §4 |
| 9 | **Sáu sổ của `ra-soat`** (canon, quỹ đạo nhân vật, mạch, manh mối, motif, văn phong) trùng việc với node | `audit` ghi ngược vào node: sổ canon vào node chủ, quỹ đạo nhân vật vào dải hiện sinh, manh mối vào giao điểm. Sổ văn phong giữ ở `ra-soat/` | | `kien-truc.md` §6, `quy-trinh.md` 4.6 |
| 10 | **Morpheus.** `plan-giai-doan-2-hop-nhat.md` giấu Morpheus đến sau ngày gãy (hành lang 20/4). Chốt 24/10 (GALA, Q-106 đã đóng) cho anh gặp ở tất niên rồi bay sang Mỹ, Thuyên ngưỡng mộ | Phần giấu Morpheus của plan GĐ2 là `[thay bởi chốt 24/10]`. Chưa đánh dấu trong file legacy nào | Q-044 | ghi ở `cau-hoi.md` |
| 11 | **Bible-v2 chưa theo các quyết định của session TH:** bỏ "phe rắn", bỏ "đấu trí nhẹ", "thích nghi" thành "thao túng". `cay-tuyen` (TH.LAB, bảng GĐ1) vẫn còn hai cụm ấy | **Chuyển cho session TH**, không sửa ở đây. Khi tác giả duyệt, session kiến trúc sửa `cay-tuyen` và bible | | chưa |
| 12 | **Nhãn ngày chưa dời.** Cây ghi "15/7" (Khải lật) và "16/7". Luật +2 ngày giữ thứ: 15/7/2027 (T5) thành **17/7/2025 (T5)**; 16/7/2027 (T6) thành **18/7/2025 (T6)**. 15/7/2025 là T3, 16/7/2025 là T4, nên nhãn cũ sai thứ. Kiểm bằng code. Bible §2 đã ghi "T5 17/7/2025" ở bảng lịch nhưng §8.4 còn "15/7" | 15/7 thành T5 17/7/2025, áp khi Q-004 (ngày gãy) chốt. Mọi mốc trong tuần ấy đi theo cùng một lựa chọn | Q-045 | `cau-hoi.md`; nhãn chưa sửa |

## 3. Ánh xạ file lõi cũ vào cây

Bổ sung cho `cay-tuyen` §8 (không thay). Bảng đầy đủ nằm ở `kien-truc.md` §2.

| Lõi cũ | Về đâu | Ghi chú |
| --- | --- | --- |
| Thẻ nhân vật (`the-nhan-vat-nhi.md`, `M-he-gia-tri-nhi.md`, `M-he-gia-tri-diep-anh.md`, thẻ Thuyên) | `nhan-vat/<tên>.md` + node chủ | Theo mục 2, dòng 2 và 3 |
| `M-he-gia-tri` §1 đến 2, §8; `M-dien-bien-cam-xuc` §3, §5 | `goc.md` | Đã dựng |
| Bảy loại nhiên liệu, cơ chế nhờn thuốc (`brief-van-phong-dau-tri` §8) | `goc.md` mục cơ chế biến chất | Phần thuộc thriller (domino, *Quân trắng*, *Quân đen*) để session TH |
| `brief-kieu-ngao-tang-dan.md`, `plan-giai-doan-2-hop-nhat.md` | `kho/legacy/` + dòng `[nguyên liệu: nguồn]` ở node | Không phải canon; mọi dòng cần tác giả xác nhận còn dùng |
| Skill `den-vang-van-phong`, `01-rules-viet.md`, `01c`, `01d` | `rules/registers.md`, `rules/` | **Chưa đọc rules**; cần đọc trước khi chuyển |
| Bible-v2 §2, §4, §9 | Theo mục 2, dòng 7 | §9 là Phần 2 đến 4 |
| Sáu skill `den-vang-*` | Theo `kien-truc.md` §6 và `hop-nhat-cay-tuyen` §5 | Đề xuất qua thẻ lưu skill khi sửa lần đầu |

## 4. Khuôn trục H có câu của tác giả

Đã vào `tuyen/goc.md` §2. Bản đầy đủ của từng trục (H1, H2, H3 và nguồn có sẵn của H4 đến H8) ở đó. Tóm tắt trạng thái:

| Trục | Câu gốc | Trạng thái |
| --- | --- | --- |
| H1 | *Người dừng lại để hiểu thì chậm một nhịp. Người chạy qua thì hiểu muộn một đời.* | `[đề xuất]`, Claude dựng; chờ câu thô của tác giả |
| H2 | *Sống tốt một cuộc đời mình ghét không biến nó thành cuộc đời mình muốn.* Trên trang (Vũ): *Việc đó giúp mày sống cuộc đời mày muốn, hay chỉ giúp mày sống tốt cuộc đời mày ghét?* | **[chốt 26/10]**, chữ "sống tốt" theo tác giả |
| H3 | *Đủ không phải là một con số. Đủ là câu trả lời cho câu hỏi: ai đang cầm thước.* | `[đề xuất]`, Claude dựng; chờ câu thô của tác giả |
| H4, H5, H8 | Có câu sẵn trong nguồn (ch.7, ch.29, bible §3; dòng 25/10 22:27 cho H4, H5) | `[đề xuất]`, chưa trau |
| H6, H7 | Chưa có câu của tác giả | `[đề xuất]` |

**Nguồn ngoài truyện đã tra (dùng nguyên văn được, nguồn công cộng):**

| Trục | Câu | Nguồn |
| --- | --- | --- |
| H1 | *Cuộc đời chỉ hiểu được khi nhìn lại, nhưng phải sống tiến lên.* (*Livet skal forstaas baglaens, men leves forlaens.*) | Kierkegaard, nhật ký JJ:167, 1843. Câu rút gọn quen thuộc |
| H2 | "the unexamined life is not worth living" | Plato, *Apology* 38a, bản dịch Jowett |
| H2 | "The mass of men lead lives of quiet desperation. What is called resignation is confirmed desperation." | Thoreau, *Walden*, "Economy" |
| H3 | "Nothing satisfies him to whom what is enough is little." | Epicurus, Vatican Sayings LXVIII |
| H8 | "Thầy thuốc, hãy tự chữa mình" | Luca 4:23 (chưa tra văn bản) |

Tác giả hiện đại còn bản quyền (Searle, Harari, Polanyi, Fricker, Weil) chỉ dùng ý và tên khái niệm.

**Luật dùng (chốt 26/10):** câu gốc là câu của tác giả; nguồn ngoài chỉ vào "Họ ý"; trên trang nhân vật quen câu từ chỗ khác, không trích thẳng; ghi nguồn. H5, H6 gần Searle và Polanyi nên câu của tác giả phải đủ riêng; H3 dễ sáo, cần câu cụ thể hơn "không bao giờ đủ".

## 5. Quy trình khi cây là lõi

Đã vào `quy-trinh.md` §4.0 và `tuyen/README.md` §5, §6. Giữ nguyên `hop-nhat-cay-tuyen` §4 (lối vào A, lối vào B, bảng độ nặng). Bổ sung từ lần đối chiếu này:
1. **Bước đọc ban đầu:** `README.md`, `tuyen/goc.md`, `tuyen/README.md`, `canon/cau-hoi.md`, kiểm git.
2. **Lối vào A, bước 4 (gốc):** planner lấy thêm **câu gốc của trục nặng** trong giai đoạn làm thước.
3. **Audit** ghi ngược vào node.
4. **Vai TRỤC đổi tên thành DẪN** (Q-046): chữ "trục" có ba nghĩa (trục H, trục thời gian, vai trong lối vào A).

## 6. Chưa làm

- **Chưa chuyển** thẻ nhân vật, bible mỏng, `lich.md`, `so-quyet-dinh.md` (đánh mã D-), `rules/registers.md`. Cần repo; Project chỉ có bản sao.
- **Chưa dựng** node QK, SL, GD, giao điểm; RM thuộc session RM, TH thuộc session TH (theo `rm-handoff.md` mục 6; bước 4 của lộ trình cây đã chuyển sang session RM).
- **Chưa sửa** skill (qua thẻ lưu skill), `canon:check`, `npm run budget`.
- **Chưa đọc** `rules/`, `q-001-…`, `characters.yaml`; bible §9 mới chỉ gán chỗ ở, chưa đối chiếu hết nội dung.
- **Chuyển cho session RM:** thang Nấc-RM và việc gộp hai thang của Nhi; ba cột Nhiên liệu, Giá, Register ở RM.TN; Q-045.
- **Chuyển cho session TH:** dòng 11 của mục 2; phần thriller của `brief-van-phong-dau-tri`; mức TH.DR hậu sân bay.
- **Ngân sách (Q-034 đến Q-036)** vẫn mở, kèm bốn sửa treo từ 21:25.
- **Q-047** (MĐ có gồm quá khứ lớp 10 đến đại học không) mở.
