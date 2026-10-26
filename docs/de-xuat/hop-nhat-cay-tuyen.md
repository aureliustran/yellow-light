# Đèn vàng – Cây tuyến làm cây quyết định, hợp nhất với kiến trúc hiện hành

Oct 25, 2026 · @aureliustran. **[đề xuất]** Chưa duyệt. Yêu cầu của tác giả (25/10): dùng cây tuyến (`de-xuat/cay-tuyen.md`) làm cây quyết định để AI biết tập trung vào tuyến nào khi lập plan; đọc lại kiến trúc và quy trình cũ; chọn cây tuyến làm kiến trúc chính nếu nó khớp với cái đã có, nếu không thì đề xuất các phương án hợp nhất.

Đã đọc: `kien-truc.md`, `quy-trinh.md`, `README.md`, `canon/cau-hoi.md`, Project `claude/v2/de-xuat-kien-truc.md` (đã thay), skill `den-vang-tong-hop-cot-truyen`, `den-vang-pipeline`.

Câu hỏi cho tác giả: Q-030 đến Q-033 (mục 6, đã thêm vào `canon/cau-hoi.md`).

---

## 1. Kết luận

**Chọn cây tuyến làm kiến trúc chính cho tầng T1 (thiết kế) và cho cửa vào tầng T2 (kế hoạch).** Giữ nguyên T0, T3, T4 và gần hết quy ước của `kien-truc.md`. Cây tuyến khớp phần lớn với cái đã có. Ba chỗ không khớp cần chọn cách hợp nhất (mục 3).

## 2. Đối chiếu

| Điểm của kiến trúc hiện hành | Cây tuyến | Khớp? |
| --- | --- | --- |
| Nguyên tắc 1: một nguồn sự thật cho mỗi loại thông tin | Thêm một loại thông tin (tình tiết) và cho nó một nguồn (node chủ) | Khớp |
| Nguyên tắc 2: quyết định có mã `D-` | Giữ `D-`; tình tiết đã chốt trích `D-` | Khớp |
| Nguyên tắc 3: tác giả chốt, Claude ghi sổ | Giữ; mức có dấu `†` là của tác giả, còn lại là đề xuất | Khớp |
| Nguyên tắc 4: trang đã viết là canon cứng | Cột "Chương" trong node; rà soát ghi ngược vào node | Khớp |
| Nguyên tắc 5: nạp ít mà đúng (README, bible, câu hỏi) | Thêm `tuyen/goc.md`, `tuyen/README.md`; bù lại, mỗi việc chỉ nạp node trong phạm vi | Khớp, đổi bộ đọc |
| §2 thư mục `tuyen/` (thuyen-nhi, lab, diep-anh, su-kien), phẳng | Cây năm tuyến cấp 1; `su-kien/` thành `giao-diem/` | Khớp, thay cấu trúc bên trong |
| §4 T0 canon gồm bible, sổ D, sổ Q, thẻ, lịch | Node chứa tình tiết đã chốt | **Không khớp (X1)** |
| §4 T1 thiết kế: "tầng dưới không tạo chốt" | Node trộn tình tiết chốt và đề xuất trong một file | **Không khớp (X1)** |
| §2 `ke-hoach/khung-chuong-gd1.md` là bảng chương | Node có cột "Chương"; giao điểm có thứ tự | **Chồng (X2)** |
| §6 skill `plot-synthesis`: yêu cầu → pattern → khoảng trống | Không có bước nào chọn tuyến; pattern chỉ mọc từ yêu cầu tác giả | **Thiếu (X3)**: đây là chỗ cây quyết định cắm vào |
| Skill `pipeline` bước 0 kéo một danh sách file cố định (đường dẫn legacy) | Kéo theo phạm vi tuyến | Thiếu (X3) |
| `quy-trinh.md` §4: chọn quy trình theo loại việc | Có thể chọn độ nặng quy trình theo mức node | Bổ sung được (mục 4.3) |

## 3. Ba chỗ không khớp và phương án hợp nhất

### X1. Tình tiết đã chốt nằm ở tầng nào

| | M1. Node là canon **[khuyến nghị]** | M2. Bible giữ chốt | M3. Tách file trong node |
| --- | --- | --- | --- |
| Cách làm | `tuyen/` có hai tầng: dòng `[chốt D-xxx]` là T0, dòng `[đề xuất]` là T1, cùng một file, phân bằng nhãn | Node chỉ giữ đề xuất và trích mã; tình tiết chốt chép lên bible kèm mã `TN-` | Mỗi node hai file: `chot.md` (T0) và `de-xuat.md` (T1) |
| Bible | mỏng (phương án A ở `cay-tuyen` §9) | đầy đủ | mỏng |
| Đúng ý "tuyến là nguồn sự thật cho tình tiết" | Có | Không: nguồn vẫn là bible | Có |
| Giữ luật tầng của `kien-truc` §4 | Nới: luật chuyển từ "theo thư mục" sang "theo nhãn" | Giữ nguyên | Giữ nguyên |
| Rủi ro | Đề xuất bị đọc nhầm thành canon; chặn bằng `canon:check` (dòng không nhãn = lỗi) | Lặp đúng lỗi Q-002: một tình tiết hai chỗ | Gấp đôi số file; hay quên chuyển dòng từ file này sang file kia khi chốt |
| Sửa `kien-truc` | §4: T0 thêm "dòng chốt trong `tuyen/`"; luật luồng đổi thành "không tạo chốt ngoài lượt tác giả chốt" | ít | §2 thêm khuôn hai file |

Gộp Q-023 (bible mỏng hay đầy đủ) vào câu này: chọn M1 hoặc M3 thì bible mỏng; chọn M2 thì bible đầy đủ.

### X2. Bảng chương và node

- **Đề xuất:** `ke-hoach/khung-chuong-<giai đoạn>.md` vẫn là đầu ra T2 do tác giả duyệt, nhưng **chỉ xếp mã**: mỗi chương là một danh sách mã tình tiết và giao điểm, kèm register chính. Không chép nội dung tình tiết.
- Khi chương lên trang, cột "Chương" trong node được điền. Bảng chương và node trỏ vào nhau bằng mã, nên không có hai nguồn.

### X3. Cây quyết định cắm vào đâu

Thành **bước chọn tuyến**, chạy trước Bước 0 của `den-vang-plot-synthesis` và trước Bước 0 của `den-vang-writing-pipeline` khi không có bản tổng hợp. Đầu ra là một file phạm vi (mục 4.1), và mọi bước sau chỉ đọc node có trong file ấy.

## 4. Cây quyết định

### 4.1 Lối vào A: lập plan cho một khoảng chương (từ trên xuống)

```
khoảng chương / khoảng ngày
  └─ 1. Giai đoạn nào? (MĐ, GĐ1, GĐ2, GÃY, HP; khoảng vắt qua hai giai đoạn thì chạy cho từng nửa)
       └─ 2. Đọc ma trận mức của giai đoạn → xếp mỗi node vào một vai
            ├─ TRỤC  (SSS, SS+)  bắt buộc có tình tiết trong khoảng; plan dựng từ đây; register theo đây
            ├─ CHÍNH (SS, S)     vào nếu có tình tiết đến hạn theo ngày hoặc có giao điểm trong khoảng
            ├─ NỀN   (A, B)      chỉ vào qua giao điểm, hoặc làm chỗ thở; không mở pattern riêng
            ├─ PHỤ   (C, D)      chỉ khi thừa chỗ; không được đẩy tình tiết của node trục
            └─ —                 ngoài phạm vi: không đọc
       └─ 3. Giao điểm có ngày trong khoảng → kéo thêm node tham gia; luật va chạm chọn ai giữ nhịp từng cảnh
       └─ 4. Gốc → nấc và trục nặng của giai đoạn; ít nhất một tình tiết của node trục mang nấc ấy; nấc không lùi theo ngày
       └─ 5. Quá khứ → NT mà các tình tiết dự kiến tiêu thụ; NT [chờ tiêu thụ] là ứng viên; mảnh hồi tưởng chèn khi hiện tại chạm NT
       └─ 6. Khoảng trống → mục "Khoảng trống" của node TRỤC, CHÍNH rơi vào khoảng thành pattern cho plot-synthesis Bước 1
```

**Đầu ra:** `ke-hoach/tong-hop/<khoảng>/pham-vi-tuyen.md`

| Cột | Nội dung |
| --- | --- |
| Node | mã node |
| Mức · Vai | mức của giai đoạn, vai (trục, chính, nền, phụ) |
| Tình tiết đến hạn | mã tình tiết có ngày trong khoảng |
| Giao điểm | mã X trong khoảng |
| Khoảng trống | dòng trích từ node |
| NT | niềm tin cần tiêu thụ |

Thêm một mục **Không đụng**: danh sách node ngoài phạm vi. Mục này giúp AI tập trung: writer và reviewer không được kéo node ngoài danh sách vào nếu chưa hỏi.

### 4.2 Lối vào B: một yêu cầu, một ý mới, một thay đổi (từ dưới lên)

```
yêu cầu / ý mới / chốt mới
  └─ 1. Node chủ là ai?
       ├─ có → sang 2
       └─ không → luật sinh tuyến: phục vụ trục H nào?
            ├─ có → đề xuất node mới (ghi vào de-xuat/), chọn cha
            └─ không → hạ thành chất liệu (kho/)
  └─ 2. Tình tiết rơi vào giai đoạn nào, node mang mức gì ở đó → chọn độ nặng quy trình (4.3)
  └─ 3. Lan truyền
       ├─ giao điểm chứa tình tiết → node khác trong giao điểm mức ≥ S → phải kiểm
       ├─ NT mà tình tiết tiêu thụ → QK có còn khớp không
       ├─ dải hiện sinh → nấc có lùi không
       └─ sổ "ai biết gì" của giao điểm quãng → có rò không
  └─ 4. Đầu ra: danh sách node bị ảnh hưởng, Q- mới cho mọi chỗ chưa có đáp án
```

Lối vào B chính là thứ thiếu ở vụ Q-002: đổi chỗ Phong tỏ tình (RM.PN, mức S ở GĐ1) lẽ ra phải kéo theo X-09 gala, X-17 tiệc aim và RM.TN, thay vì để ba phiên bản nằm ở ba file.

### 4.3 Mức quyết định độ nặng quy trình

Bổ sung cho `quy-trinh.md` §4:

| Mức của node chủ ở giai đoạn của việc | Quy trình | Phản biện độc lập |
| --- | --- | --- |
| SSS, SS+ | `plot-synthesis` đầy đủ (pattern, tìm kiếm, phương án, phản biện) trước khi viết | Bắt buộc |
| SS, S | `de-xuat/` theo khuôn 4.2 (phương án theo mức can thiệp) | Bắt buộc nếu đổi nhân quả của nhiều chương |
| A, B | Ghi thẳng vào node, đánh dấu `[đề xuất]`, báo tác giả | Không |
| C, D | Ghi thẳng vào node | Không |

Đường tắt cũ của §4.4 vẫn đứng: khoảng chương đã có khung chốt thì bỏ bước 1–2.

### 4.4 Ví dụ chạy thử: GĐ1, CN 8/12 → T3 31/12/2024

1. **Giai đoạn:** GĐ1.
2. **Vai:**
   - TRỤC: RM.TN, TH.LAB (cùng SS+, đồng dẫn).
   - CHÍNH: RM.TD, RM.PN, TH.MD, TH.LM (S).
   - NỀN: QK.T, TH.T18, SL.VU, SL.HD, GD.N (A); QK.N, QK.DA, TH.DR, SL.SAN, SL.DT (B).
   - PHỤ: RM.LT, TH.MO, GD.T (C); RM.VA (D).
   - Ngoài: QK.K.
3. **Giao điểm:** X-05 đề boyfriend, X-06 quân sư bí mật (mở 12/12), X-07 pickup, X-08 31/12.
   - **Chạy thử bắt được một lỗi của luật va chạm.** Ở X-08, RM.TD (S) gặp RM.TN (SS+). Đọc theo luật hiện tại (node mức cao hơn giữ nhịp và register của cảnh), RM.TN sẽ giữ cả đêm 31/12, trong khi đêm ấy là của Diệp Anh; RM.TN chỉ có đúng một nhịp: Locket của Nhi lúc 0 giờ, và cái cười của anh.
   - **Đề xuất sửa luật (vào Q-032):** va chạm tính **theo nhịp, không theo cảnh**. Node chủ của giao điểm giữ register của cảnh. Node mức cao hơn chỉ thắng ở những nhịp nó có tình tiết, và ở những nhịp ấy nó được đổi register. Ở X-08: register của RM.TD suốt đêm; cú Locket là nhịp của RM.TN, đổi register đúng một lần.
4. **Gốc:** nấc 7, H1 (lùi), H4 (đọc người, mù với mình).
5. **Quá khứ:** NT-06 (cãi thì tốn, lách thì không) ở X-05; NT-09 (để người ta tin đó là ý của họ) ở X-06.
6. **Khoảng trống:** TH.LAB là trục nhưng trong khoảng này không có tình tiết nào có ngày. Đó là pattern số một cho plot-synthesis: lab phải có ván phòng thủ trong tháng 12, chạy song song với chuỗi lùi của RM.TN.

Ví dụ này cũng cho thấy cây quyết định làm lộ ra cái mà cách cũ (pattern chỉ mọc từ yêu cầu) bỏ sót: tác giả chưa yêu cầu gì về lab tháng 12, nhưng mức SS+ buộc nó phải có mặt.

## 5. Thay đổi cần làm nếu duyệt

| File | Thay đổi |
| --- | --- |
| `kien-truc.md` §2 | Thay cây `tuyen/` bằng cây ở `cay-tuyen` §7; thêm `ke-hoach/tong-hop/<khoảng>/pham-vi-tuyen.md` |
| `kien-truc.md` §4 | Theo phương án X1 đã chọn; T1 ghi rõ cây tuyến là kiến trúc của tầng |
| `kien-truc.md` §5 | Thêm mã `TN-…`, `X-`, `NT-`, `H`; luật nhãn |
| `kien-truc.md` §6 | `plot-synthesis` thêm bước chọn tuyến; `writing-pipeline` bước 0 kéo theo phạm vi; `canon` kiểm luật cây; `audit` ghi ngược vào node |
| `quy-trinh.md` §3 | Bộ đọc khi bắt đầu session thêm `tuyen/goc.md`, `tuyen/README.md` |
| `quy-trinh.md` §4 | Thêm §4.0 "Chọn tuyến" (lối vào A, B); bảng 4.3 cho độ nặng quy trình |
| `README.md` | Bản đồ thêm `tuyen/`; bộ đọc mới |
| Skill | Đề xuất qua thẻ lưu skill khi sửa lần đầu, đúng luật đổi tên ở `kien-truc` §6 |

## 6. Câu hỏi cho tác giả

| Q | Câu hỏi | Khuyến nghị |
| --- | --- | --- |
| Q-030 | Chọn cây tuyến làm kiến trúc chính của T1 và làm cây quyết định ở cửa vào T2? | Có |
| Q-031 | Tình tiết đã chốt nằm ở đâu: M1 node là canon, M2 bible giữ chốt, M3 tách file trong node? (gộp Q-023) | M1 |
| Q-032 | Duyệt bốn vai theo mức (trục SSS/SS+, chính SS/S, nền A/B, phụ C/D), luật mục "Không đụng", và luật va chạm sửa lại "theo nhịp, không theo cảnh" (mục 4.4) | Duyệt |
| Q-033 | Mức của node chủ quyết định độ nặng quy trình (bảng 4.3)? | Duyệt |
