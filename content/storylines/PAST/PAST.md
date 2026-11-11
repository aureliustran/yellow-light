---
id: PAST
kind: node
parent: "[[TREE]]"
status: agreed
updated: 2026-11-10
participants: []
axes: [AX2, AX3, AX4, AX7, AX9]
weight: {OPEN: SSS, P1: A, P2: B, BREAK: A, AFTER: S}
aliases: [QK, tuyến quá khứ]
sources: [_archive/tuyen/qua-khu/README.md (chuyển T3, 10/11), _archive/tuyen/goc.md]
---
# PAST · Tuyến quá khứ

Gốc của các node quá khứ. QK phát triển nhân vật qua hồi tưởng. QK không chạy song song với hiện tại; nó là **nhà sản xuất** cho các tuyến hiện tại. Mỗi neo quá khứ xuất ra một **niềm tin** (`BL-`, gói `CH.*.beliefs`): một quan niệm, phản xạ, cách tính, hoặc câu hỏi ở một nấc của thang. Các tình tiết hiện tại tiêu thụ niềm tin ấy.

**Mục:** `goals` · `anchor` · `weight` · `rules` · `beliefs` · `children` · `dropped` · `gaps`.

## goals

### PAST.G1

- **statement:** Quá khứ sinh ra những niềm tin mà hiện tại tiêu thụ; mỗi neo phải có chỗ được tiêu thụ ở hiện tại.
- **serves:** AX3, AX7, AX9 (trục nặng của phần mở đầu, `goc.md` §4)
- **status:** `agreed`

## weight

| OPEN | P1 | P2 | BREAK | AFTER | POST |
| --- | --- | --- | --- | --- | --- |
| SSS | A | B | A | S |  |

Từ ma trận `_archive/tuyen/README.md` §4. Dấu `†`: mức tác giả đặt (25/10); ô không có `†`: Claude gán, chốt 26/10 (Q-028). Cột POST (hậu sân bay) `pending` tới khi "Phần" được định nghĩa (Q-043). Bảng được kiểm bằng `LAW.check.level-parent` (node con không vượt mức cha).

## anchor `locked 26/10`

Một neo quá khứ (một lá tình tiết của node con) có năm trường:

| Trường | Ví dụ (ch.3 *Ruột phích*) |
| --- | --- |
| Sự kiện | Cái phích vỡ, lớp 4 |
| Niềm tin xuất ra | B.thuyen-003 *Nói ra mới bị.* Đúng mà vẫn bị phạt |
| Nấc-HS, trục | nấc 2 đến 3 · H3, H4 |
| Cầu bằng vật | ruột phích |
| Móc hiện tại | ch.3 hiện tại: nhóm đổ lỗi, anh lặng lẽ sửa phần của người khác |

Trong khuôn lá ([[SCH.event]]): sự kiện → `event`; niềm tin xuất ra → `beliefs`; nấc, trục → `level`, `axis`; cầu bằng vật và móc hiện tại → ghi chú trong thân lá.

## rules `locked 26/10, 30/10`

Bốn luật kể quá khứ, áp cho mọi node con.

### PAST.R1
Không có neo nào không xuất niềm tin.

### PAST.R2
Không có niềm tin nào không được tiêu thụ ở hiện tại. Chưa có chỗ tiêu thụ thì đánh dấu `[chờ tiêu thụ]` để planner tìm chỗ, hoặc cắt.

### PAST.R3
Tình tiết hiện tại dựa vào động cơ của Thuyên (vì sao anh lùi, vì sao anh không nhận) phải trích được ít nhất một niềm tin. Không trích được là dấu hiệu động cơ chưa có gốc.

### PAST.R4
Mảnh hồi tưởng được chèn khi hiện tại chạm niềm tin của nó, đúng khuôn ch.2 đến 6 (hiện tại mở → quá khứ → hiện tại đóng). Từ ch.7 trở đi, khuôn này áp cho các mảnh quá khứ lớp 10 đến đại học. `[27/10]` Riêng quãng cấp 3 của Thuyên kể bằng interlude Thuyên sau summit (tên là một cảm xúc, đứng ngoài dòng thời gian, mở bằng một câu anh viết dở), chèn theo đúng luật này và kể xong trước GĐ2 (`thuyen.md` §0).

   **`locked 30/10` Chuỗi hồi tưởng.** Đơn vị được chèn là **chuỗi hồi tưởng**, không phải từng mảnh lẻ. Một chuỗi là các mảnh (interlude) liền nhau của cùng một quãng, kể theo thứ tự thời gian quá khứ. Cả chuỗi được chèn vào khi hiện tại chạm niềm tin gốc của chuỗi; bên trong chuỗi, các mảnh nối nhau mà không cần tác nhân riêng, và không xen chương hiện tại vào giữa. Mỗi mảnh vẫn mở bằng một câu anh viết dở và có một khung hiện tại ngắn ở đầu, cuối (đêm này, đêm sau anh mở file viết tiếp). Áp dụng: quãng 1 và quãng 2 của Thuyên là **một chuỗi mười ba interlude** (cấp 2 → hết cấp 3: *Sợ*, *Tiếc nuối*, *Nhục nhã*, *Hả hê*, *Trống rỗng*, *Hoan hỉ*, *Hiếu thắng*, *Kiêu hãnh*, *Tủi hổ*, *Hụt hẫng*, *Biết ơn*, *Hy vọng*, *Phẫn uất*), chèn ngay sau đêm sân sau summit, tác nhân là đêm kiểm kê *kẻ cực mạnh mà người ta nể, quý, không còn sợ* → *Vậy còn thằng bé ấy?* (B.thuyen-024, B.thuyen-029, H9). Quãng 1 trả lời *thằng bé ấy là ai*, quãng 2 trả lời *làm sao nó thành kẻ mạnh*. Tác nhân cũ của tám interlude quãng 2 thành nhịp vang trong GĐ1, không còn là điểm chèn.

   **`locked 30/10` Luật khung.** Khung hiện tại của chuỗi chỉ chứa nhịp của QK và SL. Không đưa tình tiết của các mạch đang ở mức cao hơn trong giai đoạn kế (ROM.TN, THR.LAB lên SS+ ở GĐ1): móc của các mạch ấy chỉ được để treo, không được đẩy tới. Chuỗi đứng ngoài dòng thời gian: mỗi mảnh ghi *Đêm thứ N*, không ghi ngày lịch, không đếm ngược theo mốc của mạch khác. Chuỗi dài thì giữa chuỗi có một khung dày (QK/SL) để người đọc không mất cảm giác hiện tại.

## beliefs

Bảng niềm tin sơ bộ cũ (NT-01 … NT-25, `proposed`) đã chuyển thành gói hai lớp ở [[CH.thuyen.beliefs]] (cụm C1–C7; một số NT đã gộp hoặc chuyển thành hàm, xem gói) và [[CH.nhi.beliefs]]. Cột "tiêu thụ ở hiện tại" của bảng cũ nằm ở trường `consumed` của từng niềm tin. Không giữ bảng ở đây để khỏi lệch.

## children

| Node | Phạm vi | Độ dày | Đỉnh |
| --- | --- | --- | --- |
| [[PAST.T]] Thuyên | mầm non đến đại học; ba quãng (`thuyen.md`) | đầy đủ | SSS |
| [[PAST.N]] Nhi | gia đình (bố, mẹ, Khải), khéo và đanh đá, cửa hàng và KOC, hai lượt mai mối, hội đồng trước 10/2024 ([[PAST.N.HD]]); Thảo và người yêu cũ bỏ `locked 31/10` | mỏng: chỉ những mảnh sinh NT dùng ở hiện tại (POV Nhi, interlude) | A |
| [[PAST.DA]] Diệp Anh | nhà giàu thật, ngã năm 14 tuổi, Astrea mua lại; ghế do người khác xếp | mỏng | B |
| [[PAST.K]] Khải | động cơ người anh, dùng em gái làm màn khói | rất mỏng, chỉ phục vụ sau sân bay (Phần 4) | B |

QK chỉ dày cho Thuyên; Nhi, Diệp Anh, Khải chỉ những mảnh sinh NT dùng ở hiện tại (chốt 26/10, Q-025). `[27/10]` Bỏ Vy; cô bạn mập mờ lớp 11 (chưa đặt tên) thay vị trí, thuộc `PAST.T`, giao RM qua B.thuyen-014.

Node con của node con: [[PAST.N.HD]] (hội đồng trong quá khứ của Nhi, dưới [[PAST.N]]).

## dropped `locked 27/10`

Mối tình Vy và cú tát; sợi "tay" chuyển mốc đầu sang lần chụp roi lớp 7. Cô bạn mập mờ lớp 11 (chưa đặt tên) thay vị trí, thuộc [[PAST.T]] ([[PAST.T-017]]).

## gaps

Việc kế tiếp của bảng cũ (`_archive/tuyen/qua-khu/README.md` §6):

1. ~~Dựng `qua-khu/thuyen.md`~~ `[27/10]` đã dựng; chờ duyệt các dòng `proposed` và các câu treo ở `thuyen-hai-cai-toi.md` §13.
2. `[27–28/10]` B.thuyen-024, B.thuyen-025: chờ tác giả cập nhật; quyết cảnh mẹ khen Nam ở ch.3 và câu gối nói ở ch.2–3 (sửa chương đã lên trang).
3. Sửa canon cũ vì "không giải" và vì bỏ Vy (`thuyen-hai-cai-toi.md` §10, §16): ch.1, `characters.yaml`, chương cấp 3 đã đăng, bible, phác thảo cấp 3, rules mục *Cách kể*.
4. ~~Dựng `nhi.md`~~ đã dựng và chuyển ([[PAST.N]]); `diep-anh.md`, `khai.md` chưa dựng.
- PAST.DA, PAST.K: chưa có bảng neo; dựng ở độ mỏng khi tới lượt.
