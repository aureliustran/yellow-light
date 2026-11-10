---
id: TREE
kind: node
parent: none
status: locked
updated: 2026-11-10
participants: []
axes: [AX1, AX2, AX3, AX4, AX5, AX6, AX7, AX8, AX9]
aliases: [cây tuyến, gốc của cây tuyến, tuyen]
sources: [_archive/tuyen/README.md §2, §8; _archive/tuyen/goc.md §1, §4, §5, §6, §7 (chuyển 10/11)]
---
# TREE · Cây tuyến

Node gốc của mọi tuyến. Toàn bộ chức năng của thư mục cũ `_archive/tuyen/` ở đây (10/11); riêng định nghĩa trục và thang ở `core/` vì tầng tĩnh cũng trỏ tới chúng. Gốc không có tình tiết và không có mức; nó có mặt ở mọi giai đoạn và được triển khai trong các tuyến.

**Gốc giữ trục, không giữ cơ chế vận hành** `locked 28/10`. Cách một trục chạy trong truyện nằm ở node hoặc nhân vật mang nó, và nơi ấy trỏ về trục. Ngoại lệ: cơ chế nhờn thuốc (dưới đây), vì nhiều node dùng chung.

## children

| Node gốc | Tuyến (mã cũ) | File |
| --- | --- | --- |
| [[SELF]] | nội tâm | `storylines/SELF/` |
| [[PAST]] | Quá khứ (QK) | `storylines/PAST/` |
| [[ROM]] | Romance (RM) | `storylines/ROM/` |
| [[THR]] | Thriller (TH) | `storylines/THR/` |
| [[SOL]] | Slice of life (SL) | `storylines/SOL/` |
| [[FAM]] | Gia đình (GD) | `storylines/FAM/` |

Giao điểm: `storylines/intersections/`. Mỗi giao điểm là một thư mục `X.<key>/`, định nghĩa bằng khóa ngoại tới hai node trở lên (`nodes`; khóa = id node xếp thứ tự, nối `+`); các lần giao là file `X.<key>-NNN.md` trong thư mục, đánh số tăng dần theo thứ tự xuất hiện; cùng một tập node gặp lại thì thêm lần giao, không thêm giao điểm. 18 lần giao cũ `X-001` … `X-018` đã chuyển (mã cũ là alias). Mức của tuyến và node theo giai đoạn: frontmatter `weight` và mục `weight` của từng node (thang và vai: `config/levels.md`; giai đoạn: `config/phases.md`). Mỗi node một cha; quan hệ nhiều chiều đi qua giao điểm (Q-027).

**Bố cục thư mục** `proposed 10/11`: mỗi node là một thư mục mang tên id, chứa file định nghĩa `<id>.md` (`ROM/ROM.TN/ROM.TN.md`); node con là thư mục con nằm trong thư mục của node cha. Tình tiết là cấp thực thể cuối cùng: luôn là file, nằm trong thư mục của node sở hữu (`PAST/PAST.T/PAST.T-001.md`), không bao giờ là thư mục. Node có thể sinh node con và chứa node con, không giới hạn số tầng, cho tới tình tiết là thực thể đáy. Giao điểm cũng là thư mục (`intersections/X.<key>/`), lần giao là file lá của nó. Id node con không được trùng tên file định nghĩa của cha khi bỏ qua chữ hoa thường (Windows không phân biệt): vì vậy `THR.MD` đổi thành `THR.MODEL` (10/11, mã cũ giữ làm alias).

## axes

Định nghĩa ở `core/axes/` (tầng tĩnh); bảng này để người đọc cây tuyến không phải đi tìm.

| Mã | Trục |
| --- | --- |
| [[AX1]] | Đèn vàng |
| [[AX2]] | Sống hay sống sót |
| [[AX3]] | Cây thước |
| [[AX4]] | Đọc người, mù với mình |
| [[AX5]] | Định giá |
| [[AX6]] | Thị trường là thứ người có quyền tạo ra |
| [[AX7]] | Được đồng ý mà không được nghe; được khen mà không được ôm |
| [[AX8]] | Điều trị bắt đầu từ chính mình |
| [[AX9]] | Kẻ mạnh |

Thang mặc định của trường `level`: [[SCALE.exl]].

## Một câu

Chép từ bible §3:

> Một chàng trai sống bằng khả năng đọc người lập phe để sống sót trong một lab độc hại. Anh lùi lại nhìn cô gái mình thích đi về phía người khác, đợi đến ngày thấy mình "đủ" mới dám bước lên, và đúng ngày ấy mất tất cả, rồi đổ lỗi cho chính cô.

## Cung hiện sinh theo giai đoạn

Gốc nói mỗi giai đoạn đứng ở nấc nào ([[SCALE.exl]]), trục nào nặng nhất. Node mang nó là gợi ý, không phải chủ.

| Giai đoạn | Nấc | Trục nặng | Node đang mang (gợi ý) |
| --- | --- | --- | --- |
| OPEN (MĐ) | 1 đến 7 qua hồi tưởng; mở bằng nấc 9 (*Nước lạnh*) | AX3, AX7, AX4 | `PAST.T` sinh từng nấc; `SOL.DT` (ba dòng tiểu sử "không dòng nào sai", Casio dây rộng); `FAM.T` (cuộc gọi, áo sơ mi trắng) |
| P1 (GĐ1) | 7: cô đơn giữa đám đông, hài hước khô | AX1, AX4, AX7 | `ROM.TN` (lùi, quân sư; phương trình đẩy Nhi ra); `THR.LAB` (phòng thủ, sửa lỗi người khác); `SOL.VU` ("Mày đang lùi đấy à?") |
| P2 (GĐ2) | 8: câu hỏi bị thay bằng danh sách; vắng mặt | AX3, AX5, AX2, AX9 | `THR.LAB` (thủ đoạn chủ động; áp chế, kẻ bị đo thành kẻ cầm thước); `ROM.TN` (bảng tính tỏ tình); `SOL.DT` (thôi quy ra bún riêu, câu đùa thưa dần); `SOL.VU` (rạn nứt, "sống hay sống sót"); `FAM.T` (khoe 50 triệu ở giỗ ông). Câu tác giả 25/10 22:27 (AX5, AX4) ở nấc 8 |
| BREAK (GÃY) | 9: đáy, cả bốn mối lo dồn lại | AX5, AX3, AX4, AX9 | `THR` (blacklist là cả thị trường định giá lại anh; bảng giá người); `ROM.TN` (định nghĩa Nhi là nguồn tin); `FAM.N` (thân phận). Ứng viên 26/10 14:42: bốn người đứng dậy nhờ phần tốt của Thuyên ở GĐ1, phần tốt sống sót, người làm ra nó thì không |
| AFTER (HP) | sau đáy; AX8 mở, vẫn không trả lời thay anh | AX8, AX2, AX7, AX9 | `FAM.T` (trị liệu gia đình); `SOL.DT` (chẩn đoán); `SOL.VU` (cột rổ sáng sớm); `SOL.SAN` (NUC) |

## Cơ chế dùng chung: nhờn thuốc `locked 11/10`

Nguồn: `brief-kieu-ngao-tang-dan.md` §1–3, `brief-van-phong-dau-tri.md` §8. Phần thuộc thriller (domino, *Quân trắng*, *Quân đen*) ở node `THR`. Gốc của thuốc (sức mạnh làm bớt đau) ở [[AX9]]; vận hành ở nhân vật: `FN.thuyen.nhien-lieu`, cụm C5 của niềm tin Thuyên (lực kéo và lực đẩy).

Kiêu ngạo của Thuyên vận hành như một thứ gây nghiện:
- **Liều đầu thì ngấm sâu.** Sự công nhận đầu tiên làm anh dừng tay một giây, và cái giây ấy ở lại cả buổi chiều.
- **Liều lặp lại thì nhạt dần.** Cùng một lời công nhận, lần sau anh thấy nhạt, thậm chí phiền.
- **Phải tăng liều.** Nguồn cao hơn: sếp, hội đồng, người lạ, rồi chính bố mẹ phải thua lý lẽ của anh.
- **Nguồn cũ bị coi thường.** Những ai từng làm anh ấm (Vũ, đàn em ở sân, anh Tuấn, cả Nhi) dần thành "nhỏ".

Công thức mỗi nấc: **nhiên liệu → phản ứng của anh → nấc mới → cái giá chỉ người đọc thấy.** Kiểu kiêu ngạo của kẻ mạnh âm thầm (tĩnh, kiệm lời, nhìn xuống hoặc nhìn ra, không bao giờ nhìn lên). Người kể không gọi tên cơ chế; chỉ đặt cạnh nhau. Hai trường tùy chọn của tình tiết lấy từ đây: `fuel` (nhiên liệu) và `cost` (giá), bắt buộc với node mức S trở lên `locked 26/10`.

## Luật triển khai gốc `locked 26/10`

1. **Hai trường của tình tiết:** `axis` (trục nó chạm) và `level` (nấc ở thời điểm ấy). Bắt buộc với tình tiết của node mức S trở lên ở giai đoạn đó; tùy chọn với node thấp hơn.
2. **Dải hiện sinh** là bảng được sinh ra, không viết tay: lọc mọi tình tiết theo giai đoạn, xếp theo ngày, lấy `axis` và `level` (`_views/matrix.md`).
3. **Luật liền mạch:** trong một giai đoạn, nấc không lùi khi đọc theo ngày, trừ chỗ có chủ đích (vang của nấc cũ, ghi rõ). Mỗi giai đoạn có ít nhất một tình tiết mang nấc của giai đoạn ấy ở node có mức cao nhất của giai đoạn.
4. **Tình tiết hiện sinh không có cảnh riêng** (*Nước lạnh*, chẩn đoán) vẫn có một node chủ: `SOL.DT` (Q-029).

## Luật sinh tuyến `locked 26/10, 28/10`

1. Một node phải phục vụ ít nhất một trục. Node không phục vụ trục nào thì cắt, hoặc hạ xuống thành chất liệu (`kho/`).
2. **Chủ đề là trục, không phải tuyến.** "Tiền và giai cấp" là AX5; các tuyến chạy qua nó.
3. **Giai đoạn là trục thời gian, không phải node.** Một node chạy xuyên giai đoạn được. "Phần" chưa có định nghĩa nên chưa dùng làm trục.
4. **Cơ chế ở node và nhân vật, trục ở gốc.** Một node hoặc nhân vật được giữ cơ chế vận hành của nó, miễn là cơ chế ấy trỏ về trục nó phục vụ; trục không trỏ ngược tới cơ chế.

## Cây quyết định `locked 26/10` (chuyển từ `_archive/tuyen/README.md` §5)

### Lối vào A: lập plan cho một khoảng chương (từ trên xuống)

1. **Giai đoạn nào?** Khoảng vắt qua hai giai đoạn thì chạy cho từng nửa.
2. **Xếp vai** theo mức của giai đoạn (`config/levels.md`): `lead` (SSS, SS+) bắt buộc có tình tiết trong khoảng; `main` (SS, S) vào nếu có tình tiết đến hạn hoặc có giao điểm trong khoảng; `support` (A, B) chỉ vào qua giao điểm hoặc làm chỗ thở; `minor` (C, D) chỉ khi thừa chỗ và không đẩy tình tiết của node `lead`.
3. **Giao điểm** có ngày trong khoảng kéo thêm node tham gia; luật va chạm (`config/levels.md`, luật 1) chọn ai giữ nhịp.
4. **Gốc:** nấc và trục nặng của giai đoạn (mục *Cung hiện sinh*); lấy câu gốc của trục nặng làm thước; ít nhất một tình tiết của node `lead` mang nấc ấy; nấc không lùi theo ngày.
5. **Quá khứ:** niềm tin mà các tình tiết dự kiến tiêu thụ; niềm tin chưa được tiêu thụ là ứng viên; mảnh hồi tưởng chèn khi hiện tại chạm niềm tin.
6. **Khoảng trống** (`gaps`) của node `lead` và `main` rơi vào khoảng thành pattern cho bước tổng hợp cốt truyện.
7. **Register** `locked 28/10`: truyện không có văn phong mặc định chung; mỗi nhịp lấy register từ ô (node giữ nhịp × giai đoạn), tức mục `voice` của node (ma trận cũ: `rules/registers.md` §3). Ở giao điểm, node giữ nhịp quyết register của nhịp ấy; đổi register theo luật chuyển (`registers.md` §4). R8, R9 ngoài ô cần tác giả duyệt; kiểm liều theo giai đoạn (`registers.md` §5).

**Đầu ra:** phạm vi tuyến của khoảng: node, mức và vai, tình tiết đến hạn, giao điểm, khoảng trống, niềm tin, register; và mục **không đụng** (node ngoài phạm vi). Cách viết blueprint: `guidelines/tasks/plan-chapter.md`.

### Lối vào B: một yêu cầu, một ý mới, một thay đổi (từ dưới lên)

1. **Node chủ là ai?** Không có thì: phục vụ trục nào? Có thì đề xuất node mới (`de-xuat/`); không thì hạ thành chất liệu (`kho/`).
2. **Giai đoạn và mức** của node chủ quyết định độ nặng quy trình (`config/levels.md`, *Mức quyết định độ nặng quy trình*).
3. **Lan truyền:** giao điểm chứa tình tiết → node khác mức ≥ S phải kiểm; niềm tin mà tình tiết tiêu thụ còn khớp không; dải hiện sinh có lùi nấc không; sổ "ai biết gì" có rò không; register của nhịp còn trong ô cho phép không.
4. **Đầu ra:** danh sách node bị ảnh hưởng; `Q-` mới cho mọi chỗ chưa có đáp án.

## gaps

- Bảng tổng mức node × giai đoạn sinh tự động (`_views/matrix.md`): chưa có.
- Nội dung các khung node và giao điểm: chặng T3 → T5 và các bước sau.
