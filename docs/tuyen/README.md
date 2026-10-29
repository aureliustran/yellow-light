# Đèn vàng – Cây tuyến

Oct 26, 2026 · @aureliustran. Sửa Oct 28, 2026 (lối vào A thêm bước 7: chọn register). **[chốt 26/10]** cây tuyến là kiến trúc chính của tầng T1 và là cây quyết định ở cửa vào T2 (Q-030, Q-031 phương án M1). Khi lệch với `de-xuat/cay-tuyen.md`, file này thắng; `cay-tuyen.md` giữ lý do thiết kế.

Mức có dấu `†` là mức tác giả đặt (25/10). Ô không có `†` là Claude gán, chốt 26/10 theo khuyến nghị Q-028; sửa từng ô nếu lệch.

## 1. Đọc gì khi bắt đầu

`docs/README.md` → `tuyen/goc.md` → file này → `canon/cau-hoi.md` → node của việc cần. Không đọc node ngoài phạm vi (lối vào A, mục 5). Khi lập plan hoặc viết: thêm `rules/registers.md`.

## 2. Mô hình

```
                         GỐC (tuyen/goc.md)
       trục H1 đến H9 · thang Nấc-HS · cung hiện sinh · cơ chế biến chất
                              │
      ┌──────────┬────────────┼────────────┬──────────┐
      QK         RM           TH           SL         GD
   Quá khứ    Romance     Thriller    Slice of life  Gia đình
      │          │            │            │           │
   node con   node con     node con     node con    node con
      └──────────┴── giao điểm X- (sự kiện hoặc một quãng) ──┘
```

| Thực thể | Là gì | Mã | Ở đâu |
| --- | --- | --- | --- |
| Node tuyến | Một mạch có người, có sự kiện trên trục thời gian, phục vụ ít nhất một trục H | `RM.TN` | `tuyen/<tuyến>/…` |
| Tình tiết | Đơn vị nhỏ nhất của chuyện xảy ra. Đúng một node chủ | `TN-014` | file của node chủ |
| Giao điểm | Chỗ hai node trở lên chạm nhau. Giữ thứ tự, bối cảnh, luật va chạm, ai biết gì. Không giữ tình tiết, chỉ trích mã | `X-08` | `tuyen/giao-diem/` |
| Niềm tin | Sản phẩm của neo quá khứ, được tình tiết hiện tại tiêu thụ | `NT-05` | `tuyen/qua-khu/README.md` |
| Trục hiện sinh | Chủ đề của gốc. Không có tình tiết, không có mức | `H3` | `tuyen/goc.md` |
| Register | Văn phong của một nhịp. Chọn theo node × giai đoạn × nhịp | `R1`–`R9` | `rules/registers.md` |

Mỗi node một cha. Quan hệ nhiều chiều đi qua giao điểm (Q-027).

**Phân biệt với các sổ khác:** quyết định `D-` ở `canon/so-quyet-dinh.md`; thẻ nhân vật (ai là ai) ở `nhan-vat/`; câu hỏi `Q-` ở `canon/cau-hoi.md`. Tình tiết đã chốt nằm trong node, trích mã D- (M1).

**Nhãn trong node (M1):** dòng `[chốt dd/mm]` là canon (T0); dòng `[đề xuất]` là T1. Dòng không nhãn là lỗi; `canon:check` bắt.

## 3. Thang mức và giai đoạn

Thứ tự: D < C < B < A < S < SS < SS+ < SSS. Mức đo độ cần thiết của một tuyến, node hoặc giao điểm đối với truyện, trong một giai đoạn. Không đo độ hay của chất liệu.

| Mức | Nghĩa | Vai (lối vào A) |
| --- | --- | --- |
| SSS | Xương sống của cả truyện | DẪN |
| SS+ | Đồng dẫn: một trong các động cơ chính của giai đoạn | DẪN |
| SS, S | Node chính, có cung riêng trọn vẹn | CHÍNH |
| A, B | Có cung riêng hoặc hỗ trợ, dựng bối cảnh | NỀN |
| C, D | Gương nhỏ, tùy chọn | PHỤ |

Vai DẪN đổi tên từ TRỤC để khỏi lẫn với trục H (Q-046).

| Mã | Giai đoạn | Mốc (lịch 2024–2025) | Lõi |
| --- | --- | --- | --- |
| MĐ | Mở đầu | ch.0 *Nước lạnh* (đáy, kể trước) · hiện tại tuần trước summit · summit khoảng T7 12/10/2024 → vào lab T2 28/10 | Quá khứ mầm non đến đại học; summit; nhận lab, Nhi thuê dạy IELTS, MUN |
| GĐ1 | Phòng thủ | 28/10/2024 → khảo sát cuối 3/2025 | Thuyên có làm chủ được model không; chuỗi Phong, 31/12, tất niên, *Mixue*, đêm say |
| GĐ2 | Tấn công | 4/2025 → trước ngày gãy | Kim bài miễn tử; tự mãn; xác nhận Nhi thích mình nhưng chờ ghế 50 triệu |
| GÃY | Điểm gãy | từ đêm Khải lật → tối ngày gãy. **Ngày chờ Q-004** (T6 18/7/2025 theo luật, hay nhãn "16/7") | Ngày nhận ghế là ngày định tỏ tình; Nhi bị cáo buộc |
| HP | Hậu quả và hồi phục | sau ngày gãy → sân bay | Đuổi việc, blacklist, làm lành với Vũ, chẩn đoán, NUC, trị liệu gia đình, lớp essay, sân bay |

Ch.0 *Nước lạnh* nằm trong MĐ theo thứ tự đọc nhưng thuộc HP theo lịch; mức tính cho MĐ.

**Sau sân bay** (bible §9, Phần 2 đến 4) chưa có cột. Ba node có nội dung ở đó (TH.DR, GD.N, QK.K) có ô **hậu sân bay** với mức `[chờ]` cho tới khi "Phần" được định nghĩa (Q-043).

**Ba luật của thang:**
1. **Va chạm ở giao điểm theo nhịp, không theo cảnh.** Node chủ của giao điểm giữ register của cảnh. Node mức cao hơn chỉ thắng ở những nhịp nó có tình tiết, và ở những nhịp ấy được đổi register. Cùng mức thì node chủ giữ.
2. **Node con không vượt mức của tuyến cha** trong cùng giai đoạn; mức của tuyến cha bằng mức cao nhất của các node con.
3. **Mức tính theo giai đoạn.** Cột "Đỉnh" là mức cao nhất qua các giai đoạn.

## 4. Ma trận mức

**Tuyến cấp 1:**

| Tuyến | MĐ | GĐ1 | GĐ2 | GÃY | HP |
| --- | --- | --- | --- | --- | --- |
| QK Quá khứ | **SSS** | A | B | A | S |
| RM Romance | B † | **SS+** † | **SSS** † | **SS+** † | S |
| TH Thriller | A | **SS+** † | **SSS** † | **SSS** † | A |
| SL Slice of life | A | A | S | B | S |
| GD Gia đình | A | A | S | **SS** | **SS** |

**Node:**

| Node | MĐ | GĐ1 | GĐ2 | GÃY | HP | Hậu sân bay |
| --- | --- | --- | --- | --- | --- | --- |
| `QK.T` | **SSS** | A | B | A | S | |
| `QK.N` | C | B | B | B | A | |
| `QK.DA` | | B | B | C | C | |
| `QK.K` | | | C | B | C | `[chờ]` |
| `RM.TN` | B | **SS+** † | **SSS** † | **SS+** † | S | |
| `RM.TD` | B | S | C | B | C | |
| `RM.PN` | | S | A | A | B | |
| `RM.LT` | C | C | D | | D | |
| `RM.VA` | | D | D | | D | |
| `TH.MO` | A | C | | | | |
| `TH.LAB` | | **SS+** † | **SSS** † | S † | B | |
| `TH.MD` | | S | **SS** | **SSS** | B | |
| `TH.LM` | C | S | S | S | A | |
| `TH.T18` | C | A | S | **SSS** | A | |
| `TH.DR` | | B | A | B | B | `[chờ]` |
| `SL.VU` | B | A | S | C | S | |
| `SL.SAN` | | B | B | | A | |
| `SL.HD` | | A | A | B | B | |
| `SL.DT` | A | B | A | C | S | |
| `GD.T` | A | C | S | B | **SS** | |
| `GD.N` | C | A | A | **SS** | S | `[chờ]` |

Ô trống là node không có mặt. Mức node TH do session TH đề xuất đổi; session kiến trúc cập nhật khi tác giả duyệt. Bảng được kiểm bằng code: mức tuyến cha bằng mức cao nhất của các node con ở mọi ô.

Ma trận **register** theo node × giai đoạn (cùng hàng, cùng cột với bảng trên) nằm ở `rules/registers.md` §3.

## 5. Cây quyết định

### Lối vào A: lập plan cho một khoảng chương (từ trên xuống)

1. **Giai đoạn nào?** Khoảng vắt qua hai giai đoạn thì chạy cho từng nửa.
2. **Xếp vai** theo ma trận mức của giai đoạn: DẪN (SSS, SS+) bắt buộc có tình tiết trong khoảng; CHÍNH (SS, S) vào nếu có tình tiết đến hạn hoặc có giao điểm trong khoảng; NỀN (A, B) chỉ vào qua giao điểm hoặc làm chỗ thở; PHỤ (C, D) chỉ khi thừa chỗ và không đẩy tình tiết của node DẪN.
3. **Giao điểm** có ngày trong khoảng kéo thêm node tham gia; luật va chạm chọn ai giữ nhịp.
4. **Gốc:** nấc và trục nặng của giai đoạn; lấy **câu gốc của trục nặng** làm thước; ít nhất một tình tiết của node DẪN mang nấc ấy; nấc không lùi theo ngày.
5. **Quá khứ:** NT mà các tình tiết dự kiến tiêu thụ; NT `[chờ tiêu thụ]` là ứng viên; mảnh hồi tưởng chèn khi hiện tại chạm NT.
6. **Khoảng trống** của node DẪN và CHÍNH rơi vào khoảng thành pattern cho `den-vang-plot-synthesis` Bước 1.
7. **Register** (chốt 28/10). Truyện không có văn phong mặc định chung; mỗi nhịp lấy register từ ô (node giữ nhịp × giai đoạn) ở `rules/registers.md` §3.
   - Ở giao điểm, node giữ nhịp (luật thang 1) quyết register của nhịp ấy; đổi register giữa hai nhịp theo luật chuyển (`registers.md` §4).
   - Register ngoài ô thì ghi ở cột `Register` của tình tiết. **R8 Sổ cái, R9 Đắng ngoài ô cần tác giả duyệt.**
   - Kiểm liều theo giai đoạn (`registers.md` §5): ví dụ quãng 1 tối đa ba mảnh R8 và một khối R9 mỗi chương; cảnh R8 ở TH.LAB GĐ2 không có nốt ấm.

**Đầu ra:** `ke-hoach/tong-hop/<khoảng>/pham-vi-tuyen.md` với các cột: Node, Mức · Vai, Tình tiết đến hạn, Giao điểm, Khoảng trống, NT, **Register**; và mục **Không đụng** (node ngoài phạm vi; writer và reviewer không kéo vào nếu chưa hỏi).

### Lối vào B: một yêu cầu, một ý mới, một thay đổi (từ dưới lên)

1. **Node chủ là ai?** Không có thì: phục vụ trục H nào? Có thì đề xuất node mới (ghi vào `de-xuat/`); không thì hạ thành chất liệu (`kho/`).
2. **Giai đoạn và mức** của node chủ quyết định độ nặng quy trình (mục 6).
3. **Lan truyền:** giao điểm chứa tình tiết → node khác mức ≥ S phải kiểm; NT mà tình tiết tiêu thụ còn khớp không; dải hiện sinh có lùi nấc không; sổ "ai biết gì" của giao điểm quãng có rò không; register của nhịp có còn nằm trong ô cho phép không.
4. **Đầu ra:** danh sách node bị ảnh hưởng; Q- mới cho mọi chỗ chưa có đáp án.

## 6. Mức quyết định độ nặng quy trình (Q-033)

| Mức của node chủ ở giai đoạn của việc | Quy trình | Phản biện độc lập |
| --- | --- | --- |
| SSS, SS+ | `plot-synthesis` đầy đủ (pattern, tìm kiếm, phương án, phản biện) trước khi viết | Bắt buộc |
| SS, S | `de-xuat/` theo khuôn phương án theo mức can thiệp | Bắt buộc nếu đổi nhân quả của nhiều chương |
| A, B | Ghi thẳng vào node, đánh dấu `[đề xuất]`, báo tác giả | Không |
| C, D | Ghi thẳng vào node | Không |

Đường tắt cũ: khoảng chương đã có khung chốt thì bỏ bước 1 đến 2.

## 7. Khuôn file

**File node:**

```
# RM.TN · Thuyên – Nhi

Cha: RM · Trục: H1, H3, H7 · Mức: MĐ B · GĐ1 SS+ · GĐ2 SSS · GÃY SS+ · HP S
Thẻ: nhan-vat/thuyen.md, nhan-vat/nhi.md
Register mặc định: chép hàng của node ở rules/registers.md §3

## Cung của node
Một đoạn: bắt đầu ở đâu, kết thúc ở đâu, đổi gì trong nhân vật.

## Tình tiết
| Mã | Ngày | Tình tiết | Trạng thái | H | Nấc | NT | X | Chương | Nhiên liệu | Giá | Register |

## Khoảng trống
```

Ba cột cuối (`Nhiên liệu`, `Giá`, `Register`) tùy chọn; `Nhiên liệu` và `Giá` bắt buộc với node mức S trở lên; `Register` chỉ điền khi lệch mặc định của node (Q-042). Dòng đã chốt: `[TN-014 · chốt 26/10]` (mã D- khi có sổ).

**File giao điểm** (`tuyen/giao-diem/x-09-tat-nien-gala.md`): node tham gia; ngày, nơi; thứ tự tình tiết theo mã; luật va chạm và register từng nhịp; sổ ai biết gì trước và sau; câu hỏi mở.

**Khuôn mã:** node `RM.TN`, tình tiết `TN-014`, niềm tin `NT-05`, giao điểm `X-09`, trục `H3` (Q-026), register `R8`.

## 8. Giao điểm ban đầu

| X | Giao điểm | Giai đoạn | Loại | Node | Mức |
| --- | --- | --- | --- | --- | --- |
| X-01 | Summit 12/10/2024 | MĐ | sự kiện | TH.MO · RM.TD · GD.N | A |
| X-02 | Buổi 1 *Đường thẳng* 27/10 | GĐ1 | sự kiện | RM.TN · QK.T (NT-01, NT-04) | A |
| X-03 | Ngoại khóa 2, gặp Vũ 24/11 | GĐ1 | sự kiện | RM.TN · SL.VU | B |
| X-04 | Buổi 3, tên Thảo 28/11 | GĐ1 | sự kiện | RM.TN · TH.LAB · QK.N | B |
| X-05 | Đề boyfriend 8/12 | GĐ1 | sự kiện | RM.TN · RM.PN · QK.T (NT-06) | S |
| X-06 | Quân sư bí mật (12/12 → đêm say) | GĐ1 | quãng | RM.PN · RM.TN · QK.T (NT-09) | SS |
| X-07 | Pickup 28/12 | GĐ1 | sự kiện | RM.TN · SL.SAN · RM.PN · GD.N | B |
| X-08 | 31/12 OT tầng 17 | GĐ1 | sự kiện | RM.TD · RM.TN · TH.LM | S |
| X-09 | Tất niên và gala 16 đến 18/1/2025 | GĐ1 | sự kiện | TH.T18 · TH.MD · RM.TN · RM.PN · RM.TD · GD.N | SS |
| X-10 | *Mixue* | GĐ1 | sự kiện | RM.TN · RM.PN | SS |
| X-11 | Đêm say (bản lề GĐ1 → GĐ2, theo `th-handoff-x11-dem-say.md`) | GĐ1 → GĐ2 | sự kiện | RM.TN · SL.HD · RM.PN · TH.LAB | SS |
| X-12 | Drone sinh từ đồ ăn cho Nhi | GĐ1 | sự kiện | RM.TN · TH.DR | A |
| X-13 | Thân phận Nhi (Q-001) | GĐ1 → GÃY | quãng, giao điểm thông tin | RM.TN · GD.N · TH.T18 | SS |
| X-14 | Liên minh Thuyên – Diệp Anh | GĐ1 → GÃY | quãng | RM.TD · TH.LM | S |
| X-15 | Rạn nứt với Vũ | GĐ2 | sự kiện | SL.VU · RM.TN · SL.DT | S |
| X-16 | Tiệc R&D, giỗ ông | GĐ2 | sự kiện | TH.MD · GD.T · SL.DT | A |
| X-17 | Tiệc Nhi đạt aim | GĐ2 | sự kiện | RM.PN · RM.TN · SL.HD | B |
| X-18 | Điểm gãy | GÃY | sự kiện | mọi tuyến cấp 1 | SSS |

Giao điểm quãng dùng cùng khuôn với giao điểm thông tin (sổ "ai biết gì lúc nào", như X-13).

## 9. Trạng thái dựng

| Phần | File | Trạng thái | Ai ghi |
| --- | --- | --- | --- |
| Gốc | `tuyen/goc.md` | dựng 26/10 | kiến trúc |
| Quá khứ, luật và bảng NT | `tuyen/qua-khu/README.md` | dựng 26/10 | kiến trúc |
| QK.T | `tuyen/qua-khu/thuyen.md` (+ `thuyen-hai-cai-toi.md`, `thuyen-da-nhan-cach.md`) | dựng 27/10 | session QK |
| QK.N, QK.DA, QK.K | `tuyen/qua-khu/*.md` | chưa dựng | kiến trúc |
| RM.* và giao điểm có RM | `tuyen/romance/`, `tuyen/giao-diem/` | chưa dựng | session RM |
| TH.* | `tuyen/thriller/` | chưa dựng | session TH |
| SL.*, GD.* | `tuyen/slice-of-life/`, `tuyen/gia-dinh/` | chưa dựng | kiến trúc |
| Register | `rules/registers.md` | dựng 28/10 | session QK |

## 10. Dải hiện sinh (sinh tự động)

Chưa có tình tiết nào gắn H và Nấc. Khi có, `canon:check` sinh bảng ở đây: lọc tình tiết theo giai đoạn, xếp theo ngày, lấy cột H và Nấc; báo chỗ nấc lùi.

## 11. Còn chờ

- **Q-004** ngày gãy (16/7 hay T6 18/7/2025) và mốc kéo theo, gồm 15/7 → T5 17/7 theo luật (Q-045, áp khi Q-004 chốt).
- **Q-034 đến Q-036** ngân sách, cùng bốn sửa treo từ 21:25 (`de-xuat/ngan-sach-tuyen.md`).
- Hai cụm "phe rắn", "đấu trí nhẹ" trong bảng TH: chờ session TH.
- Ô register "chờ" của QK.N, QK.DA, QK.K, GD.N (`registers.md` §8).
