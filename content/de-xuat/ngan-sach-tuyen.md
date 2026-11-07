# Đèn vàng – Ngân sách theo tuyến

Oct 25, 2026 · @aureliustran. **[đề xuất]** Chưa duyệt. Ý tác giả (25/10, nguyên văn ý): romance và thriller là thứ giữ người đọc ở lại, nên quỹ thời gian cho các mạch chạy ở hiện tại có thể dồn vào hai mạch này; từ ma trận mức có thể kiểm kê số chương, effort, số chữ cho vừa một quỹ cho trước ở từng giai đoạn; ma trận giống nghiệp vụ kế toán: biết độ quan trọng của từng hạng mục để chia ngân sách; chữ và token bây giờ như quỹ của công ty.

Mức mới của tác giả (25/10): RM là MĐ B, GĐ1 SS+, GĐ2 SSS, GÃY SS+; TH là GĐ1 SS+, GĐ2 SSS, GÃY SSS. Đã cập nhật vào `cay-tuyen.md` §1a.

Câu hỏi cho tác giả: Q-034 đến Q-036 (mục 8, đã thêm vào `canon/cau-hoi.md`).

---

## 1. Đánh giá

**Ý tưởng đúng, và dùng được ngay.** Ma trận mức đã là một bảng ưu tiên chi; gắn quỹ vào nó thì planner biết mỗi tuyến được bao nhiêu chữ trước khi viết, và rà soát biết đã chi lệch bao nhiêu sau khi viết. Hiện chưa có chỗ nào làm việc này: độ dài đích trong brief của pipeline được đặt theo cảm giác, từng chương một.

**Mức mới của RM và TH:**
- Đường cong đi lên: MĐ (QK dẫn) → GĐ1 (hai SS+ đồng dẫn) → GĐ2 (hai SSS) → GÃY (TH SSS, RM SS+). Đây là đường leo thang tốt: người đọc vào truyện bằng quá khứ, ở lại vì hai mạch cùng lớn dần, rồi bị lab kéo vào cú gãy.
- GĐ1 không còn node SSS. Định nghĩa SS+ cũ ("chạy ngang node SSS") không còn đúng. Đã sửa: **SS+ là đồng dẫn;** giai đoạn có SSS thì SS+ nhường nhịp cho SSS; giai đoạn không có SSS thì các SS+ ngang nhau và luật va chạm cùng mức áp dụng.
- Về ngân sách, GĐ1 hạ RM từ SSS xuống SS+ không làm mất gì: RM và TH chia đều, mỗi bên 33%. Về quy trình, SS+ chạy nặng như SSS (bảng 4.3 ở `hop-nhat-cay-tuyen.md`). Khác biệt thật chỉ còn ở luật va chạm.

**Năm điểm cần sửa để phép so sánh với kế toán đứng vững:**

1. **Mức không phải chi phí.** Mức đo độ cần thiết, không đo độ dài. Một tình tiết SSS có thể chỉ dài một câu (cú Locket lúc 0 giờ). Nên ngân sách cần hai chiều như kế toán thật: **dự toán từ trên xuống** (quỹ chia theo mức) và **ước tính từ dưới lên** (cộng độ dài của từng tình tiết), rồi đối chiếu hai con số (mục 5).
2. **Giao điểm là chi phí chung.** Một cảnh gala chạm sáu node. Đếm cả cảnh cho mỗi node là đếm trùng. Phân bổ theo **nhịp**: luật va chạm theo nhịp đã cho mỗi nhịp một node chủ, nên nhịp chính là khóa phân bổ, giống phân bổ chi phí theo hoạt động.
3. **Gốc không có dòng ngân sách.** Hiện sinh chạy trong mọi tuyến, như một tiêu chuẩn chất lượng chứ không phải một hạng mục. Nó được kiểm bằng dải hiện sinh, không được chia chữ.
4. **Có hai quỹ, không phải một.** **Quỹ chữ** là thứ người đọc tiêu: thời gian đọc. **Quỹ effort** (token, công sức) là thứ mình tiêu để sản xuất. Hai quỹ chia khác nhau (mục 6): TH.LAB nhận số chữ ngang RM.TN ở GĐ1, nhưng tốn gần gấp rưỡi effort, vì nó chạy quy trình nặng mà gần như chưa có chất liệu.
5. **Quỹ là trần và sàn, không phải chỉ tiêu phải tiêu hết.** Viết cho đủ chữ là định luật Goodhart. Node trục có sàn (không được bỏ đói), node phụ có trần (không được phình); chỗ trống ở giữa là quyền của cảnh.

**Về việc dồn quỹ hiện tại cho RM và TH:** đồng ý. Theo bảng mục 3, hai mạch nhận 60–65% quỹ ở GĐ1, GĐ2 và GÃY. Phần còn lại (QK, SL, GD: 25–35%) là chỗ thở. Lưu ý: SL ở GĐ2 (12%) mang rạn nứt với Vũ và câu "sống hay sống sót", nên không nên cắt dưới mức ấy.

## 2. Mô hình

```
Quỹ giai đoạn (chữ, tác giả đặt hoặc neo từ node trục)
 ├─ Dự phòng 10%              viết lại, rà soát, tình tiết mới phát sinh
 └─ 90% chia cho tuyến cấp 1 theo trọng số mức của tuyến ở giai đoạn ấy
      └─ trong mỗi tuyến, chia cho node theo trọng số mức của node
           ├─ sàn: node mang mức của tuyến nhận ít nhất 50% quỹ của tuyến
           └─ giao điểm: chi theo nhịp, nhịp thuộc node nào thì trừ vào node ấy
```

**Trọng số [đề xuất]:**

| Mức | D | C | B | A | S | SS | SS+ | SSS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Trọng số | 0 | 0,5 | 1 | 2 | 4 | 6 | 8 | 10 |

Mức D có trọng số 0: node D chỉ được tiêu từ dự phòng.

**Vì sao chia hai tầng và có sàn:** đã chạy thử hai cách đơn giản, cả hai đều lệch.
- **Chia phẳng theo node:** tuyến nhiều node thắng. TH có sáu node nên ở GĐ2 nhận 46%, còn RM chỉ 22%, dù tác giả đặt hai tuyến cùng SSS.
- **Chia hai tầng không sàn:** tuyến nhiều node làm loãng node trục của chính nó. TH.LAB (SSS) ở GĐ2 chỉ còn 11,9%, ít hơn nửa RM.TN.
- **Hai tầng có sàn 50%** giữ đúng ý tác giả ở tầng tuyến, và giữ node trục không bị loãng.

## 3. Phân bổ quỹ chữ theo giai đoạn (tỉ lệ)

Tính bằng code từ ma trận ở `cay-tuyen.md` §1a.

**Tuyến cấp 1:**

| Tuyến | MĐ | GĐ1 | GĐ2 | GÃY | HP |
| --- | --- | --- | --- | --- | --- |
| QK | 53% | 8% | 3% | 7% | 18% |
| RM | 5% | 33% | 31% | 27% | 18% |
| TH | 11% | 33% | 31% | 33% | 9% |
| SL | 11% | 8% | 12% | 3% | 18% |
| GD | 11% | 8% | 12% | 20% | 27% |
| Dự phòng | 10% | 10% | 10% | 10% | 10% |

**Node** (% quỹ của giai đoạn):

| Node | MĐ | GĐ1 | GĐ2 | GÃY | HP |
| --- | --- | --- | --- | --- | --- |
| `QK.DA` | — | 2.0 | 0.9 | 0.7 | 1.3 |
| `QK.K` | — | — | 0.4 | 1.3 | 1.3 |
| `QK.N` | 2.5 | 2.0 | 0.9 | 1.3 | 5.1 |
| `QK.T` | 50.4 | 4.1 | 0.9 | 3.3 | 10.3 |
| `RM.LT` | 1.1 | 1.0 | — | — | — |
| `RM.PN` | — | 7.7 | 5.0 | 4.8 | 3.3 |
| `RM.TD` | 2.1 | 7.7 | 1.2 | 2.4 | 1.6 |
| `RM.TN` | 2.1 | 16.4 | 24.8 | 19.4 | 13.1 |
| `TH.DR` | — | 1.4 | 1.9 | 1.1 | 1.3 |
| `TH.LAB` | — | 16.4 | 15.5 | 4.6 | 1.3 |
| `TH.LM` | 1.8 | 5.7 | 3.9 | 4.6 | 2.6 |
| `TH.MD` | — | 5.7 | 5.8 | 11.5 | 1.3 |
| `TH.MO` | 7.1 | 0.7 | — | — | — |
| `TH.T18` | 1.8 | 2.8 | 3.9 | 11.5 | 2.6 |
| `SL.DT` | 7.1 | 1.4 | 2.5 | 0.8 | 6.5 |
| `SL.HD` | — | 2.7 | 2.5 | 1.7 | 1.6 |
| `SL.SAN` | — | 1.4 | 1.2 | — | 3.3 |
| `SL.VU` | 3.5 | 2.7 | 6.2 | 0.8 | 6.5 |
| `GD.N` | 2.1 | 6.5 | 4.1 | 17.1 | 10.8 |
| `GD.T` | 8.5 | 1.6 | 8.3 | 2.9 | 16.2 |

## 4. Cờ đảo ngược

Ba chỗ node mức thấp hơn nhận nhiều quỹ hơn node mức cao hơn trong cùng giai đoạn. Mô hình không tự sửa, vì mỗi chỗ có thể đúng ý tác giả; planner phải hỏi.

| Giai đoạn | Đảo | Vì sao xảy ra | Phương án |
| --- | --- | --- | --- |
| GĐ2 | RM.TN (SSS) 24,8% so với TH.LAB (SSS) 15,5% | RM gần như chỉ có RM.TN; TH chia cho sáu node | Giữ (romance là một node dày, lab là nhiều mặt trận), hoặc nâng sàn của TH lên 70% |
| GĐ2 | GD.T (S) 8,3% so với TH.MD (SS) 5,8% | GD chỉ có hai node | Giữ (giỗ ông là một cảnh nặng), hoặc hạ GD xuống A ở GĐ2 |
| GÃY | GD.N (SS) 17,1% so với TH.MD, TH.T18 (SSS) 11,5% mỗi node | như trên | Thân phận Nhi có thể đúng là cảnh dài nhất ở ngày gãy; nếu không thì hạ GD ở GÃY xuống S |

Luật đề xuất: **cờ đảo ngược là một dòng trong `pham-vi-tuyen.md`**, tác giả chọn giữ hay sửa; không có phép tự cắt.

## 5. Đối chiếu từ dưới lên: neo quỹ bằng node trục

Khi chưa có quỹ, có thể suy ngược từ node trục đã có chất liệu. Ví dụ GĐ1:

- **Ước tính từ dưới lên của RM.TN:** BRIEF §7 có khoảng 15 đơn vị thuộc RM.TN ở GĐ1 (5 buổi học, 5 ngoại khóa, đề boyfriend, ngoài lớp tháng 12 → Tết, Nhi mập mờ tháng 1–3, *Mixue*, đêm say), chưa kể nhịp của nó ở gala và 31/12.
- **Độ dài một đơn vị:** chương v2 mở đầu trung bình 2.700 chữ; chương legacy 5.400 chữ, interlude legacy 3.800 chữ. Lấy 3.000 đến 4.000 chữ mỗi đơn vị thì RM.TN cần 45.000 đến 60.000 chữ.
- **RM.TN nhận 16,4% quỹ GĐ1**, nên quỹ GĐ1 phải vào khoảng **275.000 đến 370.000 chữ**.
- **Mốc so sánh:** legacy viết 208.000 chữ (43 đơn vị) cho quãng truyện 25/10/2026 → 7/6/2027, tức hơn bảy tháng truyện, với một buổi học mỗi tuần. GĐ1 v2 chỉ dài năm tháng truyện nhưng gặp nhau gấp đôi, nên con số trên là hợp lý, có phần nặng.

Nếu tác giả muốn GĐ1 nhỏ hơn, ví dụ 200.000 chữ, thì RM.TN chỉ còn 33.000 chữ cho 15 đơn vị, khoảng 2.200 chữ mỗi đơn vị. Khi ấy phải gộp (hai buổi một chương) hoặc cắt đơn vị. Đây là đúng loại quyết định mà bảng này làm lộ ra trước khi viết, thay vì sau.

## 6. Quỹ effort

Effort của một node = chữ của node × hệ số quy trình × hệ số khoảng trống.

| | Hệ số [đề xuất] | Căn cứ |
| --- | --- | --- |
| Quy trình: SSS, SS+ | 3 | `plot-synthesis` đầy đủ + pipeline + phản biện độc lập |
| Quy trình: SS, S | 2 | đề xuất phương án + pipeline |
| Quy trình: A, B | 1,2 | pipeline, review thường |
| Quy trình: C, D | 1 | viết thẳng |
| Khoảng trống: node chưa có tình tiết có ngày | 1,5 | phải nghiên cứu, dựng từ đầu |

Hệ số là phỏng đoán. Đo thật ở đợt pipeline đầu tiên: log token theo node, rồi chỉnh.

**GĐ1, tám node tốn nhất:**

| Node | Chữ | Effort |
| --- | --- | --- |
| TH.LAB | 16,4% | 32,9% |
| RM.TN | 16,4% | 22,0% |
| TH.MD | 5,7% | 7,6% |
| RM.TD | 7,7% | 6,9% |
| RM.PN | 7,7% | 6,9% |
| GD.N | 6,5% | 5,3% |
| TH.LM | 5,7% | 5,1% |
| TH.T18 | 2,8% | 2,3% |

Một phần ba công sức của GĐ1 sẽ nằm ở lab. Nếu quỹ token có hạn, đây là chỗ đầu tiên cần lên kế hoạch.

## 7. Chu trình: dự toán → chi → quyết toán

| Bước | Ở đâu | Việc |
| --- | --- | --- |
| Đặt quỹ | `ke-hoach/ngan-sach.md` | Tác giả đặt quỹ chữ cho từng giai đoạn, hoặc duyệt con số neo từ node trục (mục 5) |
| Dự toán | `pham-vi-tuyen.md` (lối vào A của cây quyết định) | Thêm cột quỹ chữ và quỹ effort cho mỗi node trong phạm vi; cờ đảo ngược; đối chiếu từ dưới lên |
| Chi | `sap-canh.md` của `writing-synthesis` | Mỗi nhịp ghi node chủ và số chữ đích; brief của writer lấy độ dài đích từ đây |
| Quyết toán | sau khi chương lên trang | Đếm chữ theo cảnh và nhịp (ranh giới lấy từ `sap-canh.md`), cộng theo node |
| Báo cáo chênh lệch | `ra-soat/<khoảng>/` | Node trục chênh trên 20% so với dự toán thì là cờ; bù từ dự phòng; **không chuyển quỹ từ node trục sang node phụ** |

Đơn vị đếm: chữ là các từ tách bằng khoảng trắng (đếm như script đã dùng ở mục 5). Chương legacy không có ranh giới nhịp nên không quyết toán ngược được; chỉ áp cho chương v2.

Phần máy làm được: một script `npm run budget` đọc ma trận mức, quỹ giai đoạn và `sap-canh.md`, in dự toán, cờ đảo ngược, rồi quyết toán khi có chương. Phần tính ở mục 3–6 của file này đã chạy bằng code; viết thành script khi tác giả duyệt.

## 8. Câu hỏi cho tác giả

| Q | Câu hỏi | Khuyến nghị |
| --- | --- | --- |
| Q-034 | Duyệt mô hình: hai quỹ (chữ, effort); chia hai tầng có sàn 50% cho node trục; dự phòng 10%; quỹ là trần và sàn, không phải chỉ tiêu | Duyệt |
| Q-035 | Duyệt thang trọng số D 0 · C 0,5 · B 1 · A 2 · S 4 · SS 6 · SS+ 8 · SSS 10, và ba cờ đảo ngược ở mục 4 | Duyệt thang; trả lời từng cờ |
| Q-036 | Quỹ chữ cho từng giai đoạn: tác giả đặt con số, hay neo từ node trục (GĐ1 khoảng 275.000 đến 370.000 chữ)? Kèm: độ dài đích của một chương v2 | Neo từ node trục cho GĐ1, tác giả duyệt con số |
