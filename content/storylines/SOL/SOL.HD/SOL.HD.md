---
id: SOL.HD
kind: node
parent: "[[SOL]]"
status: proposed
updated: 2026-11-10
participants: ["[[CH.nhi]]"]
axes: [AX5, AX7]
weight: {P1: A, P2: A, BREAK: B, AFTER: B}
aliases: [SL.HD, Hội đồng quản trị của Nhi, GRP.hoi-dong-nhi, hội đồng Nhi, HĐQT, HĐQT 🎀, hội đồng quản trị]
sources:
  - "_archive/tuyen/README.md §4 (chuyển 10/11)"
  - "[[de-xuat/cay-tuyen|de-xuat/cay-tuyen.md]]"
  - "nhóm GRP.hoi-dong-nhi (đã gộp vào 11/11, file đã xoá; nguồn của nó: 02-hoi-dong-nhi.md §0, §2–4, canon/bible-v2.md §4.6, _archive/tuyen/qua-khu/nhi.md §4, §5.2)"
---
# SOL.HD · Hội đồng quản trị của Nhi

Ba người bạn thân của Nhi, nhóm chat *HĐQT 🎀*. Phản đối Thuyên vì gia thế không xứng; càng phá càng bất lực, càng có cảm tình. Ba ghế, biên bản, nghị quyết, "bàn cào móng"; đời thường phía Nhi, giao `ROM.TN` gần như mọi lần xuất hiện.

Node này giữ cả định nghĩa của hội đồng (trước là nhóm `GRP.hoi-dong-nhi` ở `world/groups/`, bỏ 11/11). Quá khứ của hội đồng ([[PAST.N.HD]]) đọc định nghĩa qua giao điểm [[X-020]].

**Mục:** `identity` · `members` · `weight` · `laws` · `moved` · `gaps`.

## identity

- **Nhóm chat:** *HĐQT 🎀*. Nhi là **Chủ tịch**, và là chủ tịch duy nhất trên đời không bao giờ làm theo nghị quyết của hội đồng mình `proposed`.
- **Phòng họp:** một tiệm bánh ở Tây Hồ, bàn trong góc, luôn đặt trước; biên bản do Minh Châu ghi, đánh số nghị quyết `proposed`.
- **Họ là ai:** bạn cùng lớp cấp 3 ở hệ thống trường quốc tế, và từ RMIT. Minh Châu, Bảo Ngọc vào nhóm từ lớp 10 (2020), sau khi qua radar thật – giả của Nhi; nhóm chat ra đời từ đó `locked 31/10`. Gốc của radar là [[B.nhi-003]] (người ta cười, khen vì cái họ), không còn là vụ người bạn thân năm lớp 9 `locked 31/10`.
- **Họ lo thật**, chỉ là đo bằng cây thước sai: mỗi người một cái thước học từ nhà `locked 31/10`.

## members

| Tên | Vai | Nhà, học | Thước đo | Giọng | Vì sao cảm tình với Thuyên |
| --- | --- | --- | --- | --- | --- |
| **Minh Châu** | Giám đốc Chiến lược | bố là lãnh đạo khối ở một ngân hàng; RMIT, Tài chính | gia thế là **tài sản bảo đảm**; Thuyên là "một khoản vay không có tài sản bảo đảm" | "Ghi vào biên bản." / "Nghị quyết số bốn, hủy." / "theo dữ liệu thì…" | trong buổi "phỏng vấn", Thuyên chỉ ra một lỗ trong kế hoạch của cô; biên bản sửa: "tài sản bảo đảm vô hình" |
| **Bảo Ngọc** | Giám đốc Truyền thông và Tình báo | nhà phất lên từ bất động sản vài năm gần đây (tiền mới); đồ có logo to | khắt khe về gia thế nhất hội, vì chính cô chưa chắc chỗ đứng của mình | "No cap." / "Cái này red flag to đùng luôn á."; tiếng Anh chen, emoji dày | mắt ảnh của anh; người đầu tiên xin anh chụp hộ một tấm |
| **An Nhiên** | Trưởng ban Kiểm soát | mẹ là luật sư; học Luật, trường khác (bạn từ cấp 3) | "Môn đăng hộ đối là để giảm chi phí xung đột"; Thuyên là một rủi ro chưa được định giá | "Phản đối." / "Đề nghị làm rõ."; nói như văn bản pháp quy | người đầu tiên thấy cử chỉ dịu dàng anh không thừa nhận (ô hồng nghiêng, vai anh ướt); sổ riêng: "Chưa đủ căn cứ." |

Tên và cá tính `proposed` (tác giả giao Claude đặt, 19/10; đang dùng ở brief và gala). Thước đo theo nghề nhà `locked 31/10`. Thành viên nào dùng ở từ hai node trở lên, hoặc có hàm riêng, thì tách thành gói `CH.<id>`.

## weight

| OPEN | P1 | P2 | BREAK | AFTER | POST |
| --- | --- | --- | --- | --- | --- |
|  | A | A | B | B |  |

Từ ma trận `_archive/tuyen/README.md` §4. Dấu `†`: mức tác giả đặt (25/10); ô không có `†`: Claude gán, chốt 26/10 (Q-028). Cột POST (hậu sân bay) `pending` tới khi "Phần" được định nghĩa (Q-043). Bảng được kiểm bằng `LAW.check.level-parent` (node con không vượt mức cha).

## laws

### SOL.HD.R1
Ba người, không có thành viên nam `locked 19/10`.

### SOL.HD.R2
Không ác ý; sự phản đối được diễn đạt như lời lo lắng cho bạn ("Bọn tao chỉ muốn mày không khổ") `proposed`.

### SOL.HD.R3
Không approve Thuyên vì gia thế không xứng; đối đầu vô tội vạ; càng phá càng bất lực, càng có cảm tình `locked 19/10`.

### SOL.HD.R4
Mỗi người có cảm tình theo một lý do riêng, khớp với cái thước của mình; cả hội cùng chuyển, không có phiếu lệch `proposed`.

### SOL.HD.R5
Không bao giờ nói chức danh bố Nhi trước mặt Thuyên (K11, [[SEC-001]]) `proposed`.

### SOL.HD.R6
Không đưa nhân vật LGBTQ+ và nét kỳ thị đồng tính của Thuyên vào truyện `locked 19/10`.

## moved

| Nội dung | Đích |
| --- | --- |
| hội đồng ở lượt 1 mai mối (chấm Misha 10/10, đóng dấu "kén"; vai từng người) | `PAST.N.HD` |
| hội đồng gặp Thuyên theo giai đoạn; đòn mẫu; "bàn cào móng"; sau 16/7 quay lại chống ("Đã bảo mà. Misha thì không bao giờ thế.") | `SOL.HD`, `ROM.TN` |
| mọi dòng "năm xưa" về người yêu cũ (Đăng) ở `02-hoi-dong-nhi.md` §1–4 | **bỏ** `locked 31/10`; thay theo `nhi.md` §5.2 |
| gương "lớp 7–8 Nhi dùng gia thế hạ Thảo" | **bỏ** cùng Thảo `locked 31/10` |

## gaps

- `arc`, `goals`, `relation`, `state`, `voice`, tình tiết: chờ chuyển (`02-hoi-dong-nhi.md` §5, brief, gala).
