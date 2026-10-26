# Đèn vàng – Cây tuyến: nguồn sự thật cho tình tiết

Oct 25, 2026 · @aureliustran. **[đề xuất]** Chưa duyệt. Ý tác giả (25/10, nguyên văn ý): chia việc dựng tình tiết thành các tuyến, làm nguồn sự thật cho tình tiết; gốc là truyện và các quan niệm hiện sinh của truyện, thứ sinh ra các tuyến; tuyến cấp 1 đã có romance (rất chính: Thuyên – Nhi) và thriller (thực tập, summit, lab…); các tuyến tự do tạo giao điểm (ví dụ romance giao thriller ở Thuyên – Diệp Anh); thêm tuyến **Quá khứ** làm tuyến cấp 1, là tuyến phát triển nhân vật qua hồi tưởng, dùng để tạo ra quan niệm hiện sinh, thế giới quan, tư duy của nhân vật trong mạch hiện tại.

**Tác giả, 25/10 (sau bản đầu):** hiện sinh nằm hẳn trong gốc, không phải một tuyến; mọi tuyến đều chứa nó và nó xuất hiện được ở mọi tuyến; cách triển khai khác các tuyến vì nó là gốc, triển khai nằm trong các tuyến. Mức do tác giả đặt: TH.LAB GĐ1 SS+, GĐ2 SSS, GÃY S; RM.TN GĐ1 SSS, GĐ2 SS+, GÃY SS+. **Sửa lần hai (25/10, 21:16):** RM là MĐ B, GĐ1 SS+, GĐ2 SSS, GÃY SS+; TH là GĐ1 SS+, GĐ2 SSS, GÃY SSS. Ngân sách theo ma trận này: `ngan-sach-tuyen.md`.

Câu hỏi cho tác giả: Q-022 đến Q-029 (mục 10, đã thêm vào `canon/cau-hoi.md`).

---

## 0. Vấn đề

- Bible hiện xếp theo **nhân vật** (mục 4) và **dòng thời gian** (mục 8). Một tình tiết như "Phong tỏ tình trước màn nhảy" nằm cùng lúc ở bible 4.4, bible 8.2, GALA, BRIEF, và từng có ba phiên bản (Q-002).
- Chỉ Thuyên – Nhi có module riêng (BRIEF, KHO, RR). Lab, Vũ, hội sân, gia đình chỉ có vài dòng rải trong bible, nên không có chỗ nào cho biết tuyến ấy đang thiếu gì.
- Quá khứ (ch.2–6, M-he-gia-tri, M-cai-nhau-bo-me, M-moi-tinh-vy) đã viết dày nhưng **không nối tường minh** vào hiện tại: không có chỗ nào ghi "cảnh này ở lab chạy được vì niềm tin X sinh ra ở ch.4".
- `kien-truc.md` đã có thư mục `tuyen/` nhưng phẳng (thuyen-nhi, lab, diep-anh, su-kien), chưa có gốc, chưa có luật giao.

## 1. Mô hình

```
                                 GỐC
     truyện · hiện sinh: trục H1–H8, thang 9 nấc, cung hiện sinh theo giai đoạn
          (không phải tuyến; mọi tuyến mang nó qua trường H và Nấc của tình tiết)
                                  │
      ┌────────────┬──────────────┼──────────────┬────────────┐
      QK           RM             TH             SL           GD
   Quá khứ      Romance        Thriller      Slice of     Gia đình
   (sinh NT)                                   life
      │            │              │              │            │
   node con     node con       node con       node con     node con
      └────────────┴── giao điểm X- (sự kiện hoặc một quãng) ─┴┘
```

**Ba loại thực thể:**

| Thực thể | Là gì | Mã | Ở đâu |
| --- | --- | --- | --- |
| **Node tuyến** | Một mạch có người, có sự kiện trên trục thời gian, phục vụ ít nhất một trục của gốc | `RM.TN`, `TH.LAB`… | `tuyen/<cấp 1>/<node>.md` |
| **Tình tiết** | Đơn vị nhỏ nhất của chuyện xảy ra. Mỗi tình tiết có **đúng một node chủ** | `TN-014`, `QKT-03`… | trong file của node chủ |
| **Giao điểm** | Chỗ hai node trở lên chạm nhau: một sự kiện (gala) hoặc một quãng (quân sư bí mật). Giữ thứ tự, bối cảnh, luật va chạm, ai biết gì; **không giữ tình tiết**, chỉ trích mã | `X-08` | `tuyen/giao-diem/` |

Thêm một loại riêng của tuyến Quá khứ: **niềm tin** `NT-xx` (mục 3).

**Phân biệt với các sổ đã có:**
- **Quyết định** (`D-`) vẫn ở `canon/so-quyet-dinh.md`. Tình tiết đã chốt trích mã D- của nó.
- **Thẻ nhân vật** (`nhan-vat/`) giữ **ai là ai**: lõi, giọng, cử chỉ, nấc trạng thái. Tuyến giữ **chuyện gì xảy ra**. Thẻ không kể sự kiện; tuyến không mô tả tính cách.
- **Câu hỏi** (`Q-`) vẫn ở `canon/cau-hoi.md`.

## 1a. Thang mức D → SSS

Thứ tự: D < C < B < A < S < SS < SS+ < SSS. Gốc không có mức: nó có mặt ở mọi giai đoạn, qua mọi tuyến.

**Mức đo độ cần thiết của một tuyến, node hoặc giao điểm đối với truyện, trong một giai đoạn.** Mức không đo độ hay của chất liệu.

| Mức | Nghĩa | Phép thử khi cắt bỏ | Hệ quả khi làm việc |
| --- | --- | --- | --- |
| **SSS** | Xương sống của cả truyện | Bỏ đi thì không còn truyện này | Mọi khoảng chương phải chạm tới; review độc lập bắt buộc; mỗi tình tiết phải có NT và trục H |
| **SS+** | Đồng dẫn: một trong các động cơ chính của giai đoạn. Giai đoạn có SSS thì SS+ là động cơ thứ hai và nhường nhịp cho SSS; giai đoạn không có SSS (GĐ1) thì các SS+ ngang nhau | Bỏ đi thì giai đoạn ấy vẫn đứng nhưng đổi thể loại | Như SSS về review và NT |
| **SS** | Xương sống của một tuyến cấp 1, gây ra trực tiếp điểm gãy | Bỏ đi thì điểm gãy sập hoặc mất lý do | Có cung đầy đủ theo ngày; khoảng trống phải thành Q- |
| **S** | Node chính, có cung riêng trọn vẹn, góp vào điểm gãy hoặc hậu quả | Bỏ đi thì điểm gãy vẫn đứng nhưng nghèo hẳn | Có cung đầy đủ; được giành nhịp ở giao điểm |
| **A** | Có cung riêng, chạy qua nhiều giai đoạn | Bỏ đi thì truyện mỏng ở một mảng, nhân quả vẫn liền | Có cung khung; tình tiết bổ sung dần |
| **B** | Hỗ trợ: dựng bối cảnh, làm gương, đặt motif | Bỏ đi thì mất màu, không mất chuyện | Chỉ cần danh sách tình tiết; không cần cung riêng |
| **C** | Gương nhỏ, vài cảnh | Bỏ đi thì gần như không ai thấy thiếu | Tối đa vài tình tiết, gắn vào giao điểm có sẵn |
| **D** | Tùy chọn | Bỏ đi thì không mất gì | Chỉ viết khi thừa chỗ; không được tạo giao điểm riêng |

**Giai đoạn** (theo bible §8 và các chốt 19–20/10; "Phần" chưa có định nghĩa nên không dùng làm trục):

| Mã | Giai đoạn | Mốc (lịch 2024–2025) | Lõi | Nguồn |
| --- | --- | --- | --- | --- |
| MĐ | **Mở đầu** | ch.0 *Nước lạnh* (đáy, kể trước) · hiện tại tuần trước summit (T7 5/10/2024 theo luật dời mốc; danh sách mở đầu còn ghi 3/10/2026) · summit khoảng T7 12/10 → vào lab T2 28/10 | Quá khứ mầm non → đại học (ch.2–6 đã có, ch.7 trở đi chưa xây); summit; nhận lab, Nhi thuê dạy IELTS, MUN | bible §8.1, `danh-sach-chuong-mo-dau.md` |
| GĐ1 | **Phòng thủ** | 28/10/2024 → khảo sát cuối 3/2025 | [chốt] xác định Thuyên có làm chủ được model không; đấu trí nhẹ, phe rõ; chuỗi Phong, 31/12, tất niên, *Mixue*, đêm say. Thuyên tin Nhi không thích mình, nên lùi | bible §8.2, 00 |
| GĐ2 | **Tấn công** | 4/2025 → trước ngày gãy | [chốt] kim bài miễn tử, không trượt gì; tự mãn; xác nhận Nhi thích mình nhưng chờ ghế 50 triệu | bible §8.3, BRIEF §9–10 |
| GÃY | **Điểm gãy** | 15/7 (Khải lật) → tối ngày gãy (16/7 là T4, 18/7 là T6: Q-004) | [chốt] ngày nhận ghế là ngày định tỏ tình; Nhi bị cáo buộc | bible §8.4 |
| HP | **Hậu quả và hồi phục** | sau ngày gãy → sân bay | Đuổi việc, blacklist, làm lành với Vũ, chẩn đoán, NUC, trị liệu gia đình, lớp essay, sân bay | bible §8.5 |

Ch.0 *Nước lạnh* nằm trong MĐ theo thứ tự đọc nhưng thuộc HP theo lịch; mức của nó tính cho MĐ. Sau sân bay là ngoài phạm vi cho tới khi "Phần" được định nghĩa.

**Ba luật của thang:**
1. **Va chạm ở giao điểm, theo nhịp, không theo cảnh** (sửa 25/10 sau chạy thử ở `hop-nhat-cay-tuyen.md` §4.4): node chủ của giao điểm giữ register của cảnh; node mức cao hơn (ở giai đoạn của giao điểm) chỉ thắng ở những nhịp nó có tình tiết, và ở những nhịp ấy được đổi register. Cùng mức thì node chủ giữ.
2. **Node con không vượt mức của tuyến cha trong cùng giai đoạn;** mức của tuyến cha bằng mức cao nhất của các node con. Bảng dưới đã kiểm bằng code.
3. **Mức tính theo giai đoạn.** Cột "Đỉnh" ở mục 4 là mức cao nhất của node qua năm giai đoạn. `—` là node không có mặt. Ô có dấu `†` là mức tác giả đặt.

**Mức là độ cần thiết, không phải độ phức tạp.** TH.LAB ở GĐ1 là SS+ không trái chốt 19/10 "đấu trí nhẹ, cách đối phó không phức tạp": lab nặng về vị trí trong giai đoạn, còn từng ván vẫn ngắn và đơn giản.

**Tuyến cấp 1 theo giai đoạn:**

| Tuyến | MĐ | GĐ1 | GĐ2 | GÃY | HP | Lý do |
| --- | --- | --- | --- | --- | --- | --- |
| QK Quá khứ | **SSS** | A | B | A | S | Mở đầu gần như toàn là quá khứ. Sau đó QK chỉ còn được gọi lại khi hiện tại chạm NT; trả lại ở đáy (cây thước lộ ra) và trị liệu |
| RM Romance | B † | **SS+** † | **SSS** † | **SS+** † | S | Một trong hai mạch giữ người đọc ở lại (tác giả). GĐ1 đồng dẫn với lab; GĐ2 cùng lab ở đỉnh; ngày gãy nhường nhịp cho lab ở buổi review và cú lật, giữ tối ngày gãy |
| TH Thriller | A | **SS+** † | **SSS** † | **SSS** † | A | Mạch thứ hai giữ người đọc ở lại (tác giả). Đồng dẫn từ GĐ1, ở đỉnh GĐ2 (ván tấn công, biến chất), dẫn ngày gãy (review, lật bài) |
| SL Slice of life | A | A | S | B | S | Giữ màu và nhịp thở; nặng lên ở rạn nứt với Vũ (GĐ2) và lúc làm lành (HP). MĐ là A vì *Nước lạnh* và phần hiện tại của ch.1–6 thuộc SL.DT |
| GD Gia đình | A | A | S | **SS** | **SS** | Mở đầu có cuộc gọi, áo sơ mi trắng; giỗ ông ở GĐ2; thân phận Nhi ở điểm gãy; trị liệu gia đình ở hồi phục |

**Node theo giai đoạn:**

| Node | MĐ | GĐ1 | GĐ2 | GÃY | HP |
| --- | --- | --- | --- | --- | --- |
| `QK.T` | **SSS** | A | B | A | S |
| `QK.N` | C | B | B | B | A |
| `QK.DA` | — | B | B | C | C |
| `QK.K` | — | — | C | B | C |
| `RM.TN` | B | **SS+** † | **SSS** † | **SS+** † | S |
| `RM.TD` | B | S | C | B | C |
| `RM.PN` | — | S | A | A | B |
| `RM.LT` | C | C | D | — | D |
| `RM.VA` | — | D | D | — | D |
| `TH.MO` | A | C | — | — | — |
| `TH.LAB` | — | **SS+** † | **SSS** † | S † | B |
| `TH.MD` | — | S | **SS** | **SSS** | B |
| `TH.LM` | C | S | S | S | A |
| `TH.T18` | C | A | S | **SSS** | A |
| `TH.DR` | — | B | A | B | B |
| `SL.VU` | B | A | S | C | S |
| `SL.SAN` | — | B | B | — | A |
| `SL.HD` | — | A | A | B | B |
| `SL.DT` | A | B | A | C | S |
| `GD.T` | A | C | S | B | **SS** |
| `GD.N` | C | A | A | **SS** | S |

**Đọc nhanh, theo giai đoạn:**
- **MĐ:** QK.T (SSS) dẫn. Romance chỉ ở mức B: Nhi mới xuất hiện qua interlude.
- **GĐ1:** không có SSS. RM.TN và TH.LAB (SS+) đồng dẫn, ngang nhau; ở giao điểm, node chủ giữ nhịp.
- **GĐ2:** RM.TN và TH.LAB cùng ở đỉnh (SSS). Khớp BRIEF §9: sự tự tin làm anh dám tiến về phía Nhi cũng là sự tự mãn làm anh mù trước Khải. Đường cong MĐ → GĐ1 → GĐ2 → GÃY đi lên: quá khứ dẫn, hai mạch đồng dẫn, hai mạch ở đỉnh, lab kéo vào cú gãy.
- **GÃY:** TH.MD và TH.T18 (SSS) giữ nhịp ở buổi review và cú lật; RM.TN (SS+) mang tối ngày gãy; GD.N (SS) mang thân phận Nhi. TH.LAB lùi về S: phe ở lab chỉ còn là khán giả của cú lật.
- **HP:** GD.T (SS) dẫn (trị liệu gia đình); SL.VU, SL.DT, RM.TN ở mức S.

**Độ lệch giữa mức và độ dày hiện có** (đánh giá của Claude):
- RM.TN và QK.T đã dày: lịch theo ngày, kho khuôn, ch.2–6 đã lên trang.
- **TH.LAB lệch nặng nhất:** SS+ ở GĐ1, SSS ở GĐ2, nhưng gần như không có tình tiết nào có ngày; chỉ có dàn người và bảng phe.
- TH.MD và TH.T18 (SSS ở GÃY) cũng chỉ có chốt khung.
- GD.N (SS ở GÃY) dựa gần hết vào Q-001, đang ở dạng đề xuất.
- HP có GD.T ở mức SS mà gần như chỉ có danh sách sự kiện của bản cũ.
- Gốc: các tình tiết hiện có chưa gắn trường H và Nấc, nên chưa dựng được dải hiện sinh (mục 2).

Thứ tự dựng nên theo độ lệch, không theo mức: TH.LAB, TH.MD, TH.T18 trước; RM.TN chỉ cần chuyển và đánh mã.

## 2. Gốc (`tuyen/goc.md`)

Gốc không có tình tiết. Nó giữ thứ mọi tuyến được sinh ra để phục vụ:

1. **Một câu** (bible mục 3).
2. **Trục hiện sinh** `H-`, gom từ bible mục 3, M-he-gia-tri, M-dien-bien-cam-xuc §3:

| Mã | Trục | Nguồn |
| --- | --- | --- |
| H1 | **Đèn vàng:** dừng để đọc trước kết quả (Thuyên) hay vượt khi người khác do dự (Nhi); ở v2 là cách anh yêu | bible §3 |
| H2 | **Sống hay sống sót** | câu của Vũ |
| H3 | **Cây thước:** "không bao giờ đủ", nhãn *kẻ thất bại* do bố mẹ đặt mà anh tưởng là khách quan; "đủ là bao nhiêu" | M-he-gia-tri §1–2 |
| H4 | **Đọc người, mù với mình:** lăng kính thấy khuyết của mọi thứ; cảm xúc không kêu thành tiếng rơi vào điểm mù | M-he-gia-tri §2 |
| H5 | **Định giá:** tiền, danh tiếng, con người đều là lời hứa nhiều người cùng tin; mỏ neo; ai có quyền đặt giá | M-he-gia-tri §8, ch.28–29 cũ |
| H6 | **Thị trường là thứ người có quyền tạo ra:** cờ và bài, bàn cờ hay lá bài, ai là người chơi | bible §5–6 |
| H7 | **Được đồng ý mà không được nghe** (phía Nhi): yêu có điều kiện, chỗ ngồi do người khác xếp | 01 §2.4, HĐ |
| H8 | **Điều trị bắt đầu từ chính mình;** tình yêu giúp duy trì, không chữa | bible §3 |

3. **Thang hiện sinh 9 nấc** và ba luật của thang (xoắn ốc, cầu bằng vật, không trả lời): chép nguyên từ M-dien-bien-cam-xuc §3.
4. **Cung hiện sinh theo giai đoạn** [đề xuất]: gốc nói mỗi giai đoạn đứng ở nấc nào, trục nào nặng nhất; tuyến nào mang nó là gợi ý, không phải chủ.

| Giai đoạn | Nấc | Trục nặng | Tuyến đang mang (gợi ý) |
| --- | --- | --- | --- |
| MĐ | 1 → 7 qua hồi tưởng; mở bằng nấc 9 (*Nước lạnh*) | H3, H4 | QK.T sinh từng nấc; SL.DT (ba dòng tiểu sử "không dòng nào sai", Casio dây rộng); GD.T (cuộc gọi, áo sơ mi trắng) |
| GĐ1 | 7: cô đơn giữa đám đông, hài hước khô | H1, H4 | RM.TN (lùi, quân sư); TH.LAB (phòng thủ, sửa lỗi người khác); SL.VU ("Mày đang lùi đấy à?") |
| GĐ2 | 8: câu hỏi bị thay bằng danh sách; vắng mặt | H3, H5, H2 | TH.LAB (thủ đoạn chủ động); RM.TN (bảng tính tỏ tình); SL.DT (thôi quy ra bún riêu, câu đùa thưa dần); SL.VU (rạn nứt, "sống hay sống sót"); GD.T (khoe 50 triệu ở giỗ ông) |
| GÃY | 9: đáy, cả bốn mối lo dồn lại | H5, H3, H4 | TH (blacklist là cả thị trường định giá lại anh; bảng giá người, M-he-gia-tri §8); RM.TN (định nghĩa Nhi là nguồn tin); GD.N (thân phận) |
| HP | sau đáy; H8 mở, vẫn không trả lời thay anh | H8, H2 | GD.T (trị liệu gia đình); SL.DT (chẩn đoán, Q-029); SL.VU (cột rổ sáng sớm); SL.SAN (NUC) |

5. **Gốc được triển khai trong các tuyến, không có node riêng:**
   - Mỗi tình tiết có hai trường của gốc: **H** (trục nó chạm) và **Nấc** (nấc của thang ở thời điểm ấy). Bắt buộc với tình tiết của node mức S trở lên ở giai đoạn đó; tùy chọn với node thấp hơn.
   - **Dải hiện sinh** là một bảng được sinh ra, không được viết tay: lọc mọi tình tiết theo giai đoạn, xếp theo ngày, chỉ lấy cột H và Nấc. `tuyen/README.md` giữ bảng này; `canon:check` sinh lại nó. Đây là cách kiểm cung biến chất có liền mạch không mà không tạo thêm nguồn thứ hai.
   - **Luật liền mạch:** trong một giai đoạn, nấc không lùi khi đọc theo ngày, trừ chỗ có chủ đích (vang của nấc cũ, ghi rõ). Mỗi giai đoạn phải có ít nhất một tình tiết mang nấc của giai đoạn ấy ở node mức cao nhất của giai đoạn.
   - Tình tiết hiện sinh không có cảnh riêng (*Nước lạnh*, chẩn đoán) vẫn phải có một node chủ; đề xuất SL.DT (Q-029).
6. **Luật sinh tuyến:**
   - Một node phải phục vụ ít nhất một trục H. Node không phục vụ trục nào thì cắt hoặc hạ xuống thành chất liệu.
   - **Chủ đề là trục, không phải tuyến.** "Tiền và giai cấp" không thành tuyến; nó là H5, và các tuyến chạy qua nó (bún riêu ở SL, gia thế ở hội đồng, ghế 50 triệu ở TH).
   - **Giai đoạn là trục thời gian, không phải node.** Một node chạy xuyên giai đoạn được (TH.DR drone sinh ở GĐ1, đi tiếp sau sân bay). "Phần" chưa có định nghĩa nên chưa dùng.

## 3. Tuyến Quá khứ (QK): xưởng sinh niềm tin

**Vai trò:** phát triển nhân vật qua hồi tưởng. QK không chạy song song với hiện tại; nó là **nhà sản xuất** cho các tuyến hiện tại. Mỗi neo quá khứ xuất ra một **niềm tin** (`NT-`): một quan niệm, phản xạ, cách tính, hoặc câu hỏi ở một nấc của thang. Các tình tiết hiện tại **tiêu thụ** niềm tin ấy.

**Một neo QK có năm trường:**

| Trường | Ví dụ (ch.3 *Ruột phích*) |
| --- | --- |
| Sự kiện | Cái phích vỡ, lớp 4 |
| Niềm tin xuất ra | NT-03 *Nói ra mới bị.* Đúng mà vẫn bị phạt |
| Nấc thang, trục | nấc 2 → 3 · H3, H4 |
| Cầu bằng vật | ruột phích |
| Móc hiện tại | ch.3 hiện tại: nhóm đổ lỗi, anh lặng lẽ sửa phần của người khác |

**Bốn luật của QK:**
1. Không có neo nào không xuất niềm tin.
2. Không có niềm tin nào không được tiêu thụ ở hiện tại. Chưa có chỗ tiêu thụ thì đánh dấu `[chờ tiêu thụ]` để planner tìm chỗ, hoặc cắt.
3. Tình tiết hiện tại dựa vào động cơ của Thuyên (vì sao anh lùi, vì sao anh không nhận) phải trích được ít nhất một NT. Không trích được là dấu hiệu động cơ chưa có gốc.
4. **Mảnh hồi tưởng được chèn khi hiện tại chạm niềm tin của nó**, đúng khuôn ch.2–6 (hiện tại mở → quá khứ → hiện tại đóng). Từ ch.7 trở đi, khuôn này áp cho các mảnh quá khứ lớp 10 → đại học.

**Bảng niềm tin sơ bộ [đề xuất]** (từ ch.2–6 đã lên trang và M-he-gia-tri; cột tiêu thụ là đề xuất của Claude):

| NT | Niềm tin | Sinh ở | Tiêu thụ ở hiện tại |
| --- | --- | --- | --- |
| NT-01 | Ý mình không được nói là đúng | ch.2 đếm bánh chưng | RM.TN: dịu dàng không thừa nhận; khuôn E2 (chối bằng cách chứng minh cô sai) |
| NT-02 | Thứ mình yêu bị coi là vô ích | ch.2 tinh vân trong xe rác | RM.TN × QK: ngoại khóa 3 "tinh vân" ở arcade vũ trụ; TH.DR: drone không có thị trường, anh vẫn đề xuất |
| NT-03 | Nói ra mới bị; đúng mà vẫn bị phạt | ch.3 phích vỡ | TH.LAB: sửa lỗi người khác, không tranh công; ghen không gọi tên |
| NT-04 | Thương bằng vật (mẹ gỡ xương cá), tự lừa "chắc tiện tay" | ch.3 | RM.TN: dịu dàng là hành động, kèm một câu che (kho BRIEF §5d) |
| NT-05 | Hai tờ nháp: một tờ cho người chấm, một tờ của mình | ch.4 tờ nháp | TH: lõi chỉ Thuyên hiểu; RM.TN giai đoạn 2: Nhi là người đầu tiên được xem "tờ thứ hai" (phiên bản gần sự thật nhất), và chính tờ ấy lên bàn ngày gãy |
| NT-06 | Cãi thì tốn, lách thì không | ch.4 bẻ roi | H1: lùi thay vì tranh (thấy Phong là lùi); TH: cách đối phó nhẹ ở giai đoạn 1 |
| NT-07 | Làm tốt mà không vui; "không có gì đến" | ch.5 tủ kính | TH.MD: "đủ là bao nhiêu"; RM.TN: chờ ghế 50 triệu mới tỏ tình |
| NT-08 | Trả lời thật thì không ai gọi; từ đó trả lời theo barem | ch.6 phiếu khảo sát | TH: khảo sát tháng 3; SL.DT: chẩn đoán ở hồi phục |
| NT-09 | Để người ta tin đó là ý của họ | ch.6 phiếu thi chuyên | RM.PN: quân sư cho Phong; TH: thao túng giai đoạn 2 |
| NT-10 | Lăng kính: thấy khuyết của mọi thứ, kể cả mình | xuyên ch.2–6 | mọi node; H4 |

Lớp 10 → đại học chưa xây lại (danh sách mở đầu, "ch.7 trở đi"). Chất liệu đã có: mối tình Vy và cú tát anh chặn (sợi "tay"), ba lần cãi bố mẹ, chiến tranh lạnh, sân bóng với Vũ, làm quân sư cho Tùng từ cấp 3.

**Node con của QK:**

| Node | Phạm vi | Độ dày đề xuất | Đỉnh |
| --- | --- | --- | --- |
| `QK.T` Thuyên | mầm non → đại học | đầy đủ (đã có ch.2–6) | **SSS** |
| `QK.N` Nhi | Thảo; người yêu cũ lớp 10–11 (công tử phá sản); năm 2019 khiến cả hội cười; "được đồng ý mà không được nghe" | mỏng: chỉ những mảnh sinh NT dùng ở hiện tại (POV Nhi, interlude) | **A** |
| `QK.DA` Diệp Anh | nhà giàu thật, ngã năm 14 tuổi, Astrea mua lại; ghế do người khác xếp | mỏng | **B** |
| `QK.K` Khải | động cơ người anh, dùng em gái làm màn khói | rất mỏng, chỉ phục vụ sau sân bay (bản cũ: Phần 4) | **B** |

## 4. Các tuyến cấp 1 khác và node con

Cột "Đỉnh" là mức cao nhất qua các giai đoạn; mức từng giai đoạn ở mục 1a. Node mới do Claude đề xuất ghi *mới*.

### RM – Romance

| Node | Nội dung | Trục | Đỉnh |
| --- | --- | --- | --- |
| `RM.TN` Thuyên – Nhi | buổi học, ngoại khóa, chín nấc, khuôn E2/E3, đêm say, điểm gãy, lời tỏ tình để dành | H1, H3, H7 | **SSS** |
| `RM.TD` Thuyên – Diệp Anh | fan service tháng 11–12, 31/12, dừng thân mật, đổi phe. **Nửa romance**; nửa liên minh ở `TH.LM` | H5, H6 | **S** |
| `RM.PN` Phong → Nhi | một chiều: thích, quân sư dạy, gala tỏ tình, nói với Nhi, câu hỏi ở tiệc aim, người ở lại | H1 (gương: Phong hỏi, Thuyên đọc) | **S** |
| `RM.LT` Linh – Tùng *mới* | Thuyên làm quân sư cho Tùng từ cấp 3: **gương nhỏ của quân sư cho Phong**, cho người đọc thấy thói quen này có trước. Giao QK.T | H1 | **C** |
| `RM.VA` Vũ – An Nhiên | tuyến phụ hài, giao SL.HD | H2 | **D** |

Thuyên – Vy thuộc `QK.T` (chủ), giao RM.

### TH – Thriller / đấu trí

| Node | Nội dung | Trục | Đỉnh |
| --- | --- | --- | --- |
| `TH.MO` Mở màn | summit (Chủ tịch bảo Khải "để ý nó"), nhận lab, MUN, "dự thính" | H6 | **A** |
| `TH.LAB` Phe ở lab | lão Tuấn, phe "rắn", hội kỹ sư, Thảo; ván phòng thủ GĐ1, ván tấn công và thủ đoạn chủ động GĐ2; blacklist và bảng giá người ở đáy | H4, H5 | **SSS** |
| `TH.MD` Model và hàng đợi | có pipeline không có model; quyền xếp hàng đợi; kim bài miễn tử; khảo sát → production → ghế 50 triệu | H3, H6 | **SSS** |
| `TH.LM` Liên minh Diệp Anh | pilot giao nhận chặng cuối, ghế hứa cho cô, ván cược của Khải | H5 | **S** |
| `TH.T18` Tầng 18 | Khải truy dấu vết, Morpheus (*khách*, bay sang Mỹ), lật bài 15/7 | H6 | **SSS** |
| `TH.DR` Drone *tách riêng* | sinh từ đồ ăn đặt cho Nhi (chốt 23/10), cắm cờ, bị gạt đúng, luận văn Phần Lan, startup Phần 3, Khải nhảy vào Phần 4 | H2, H6 | **A** |

### SL – Slice of life

| Node | Nội dung | Trục | Đỉnh |
| --- | --- | --- | --- |
| `SL.VU` Vũ và khu tập thể | cột rổ, "Thích thì nói mẹ nó đi", "Mày đang lùi đấy à?", rạn nứt, sáng sớm làm lành | H2 | **S** |
| `SL.SAN` Hội sân thuê | pickup, Linh "mana", anh Long, Hưng, Quân; chia tiền sân → bao cả sân (biến chất) | H5 | **A** |
| `SL.HD` HĐQT 🎀 của Nhi | ba ghế, biên bản, nghị quyết, "bàn cào móng", bài học sai về tiền. **Đời thường phía Nhi**, giao RM.TN gần như mọi lần xuất hiện | H5, H7 | **A** |
| `SL.DT` Đời sống Thuyên *mới* | phòng trọ, bún riêu (đơn vị tiền), Casio, Crocs, ảnh aesthetic, Locket; phần hiện tại của ch.1–6; *Nước lạnh*; câu đùa thưa dần, thôi quy ra bún riêu; chẩn đoán (Q-029). Chủ của các tình tiết hiện sinh không có cảnh riêng | H3, H4, H5 | **S** |

### GD – Gia đình (*mới, cấp 1*)

Lý do tách khỏi QK: QK là quá khứ; GD là gia đình **ở trục hiện tại** (2024–2025 trở đi), có tình tiết riêng và giao TH rất nặng.

| Node | Nội dung | Trục | Đỉnh |
| --- | --- | --- | --- |
| `GD.T` Nhà Thuyên | cuộc gọi bốn phút mười hai giây, áo sơ mi trắng, giỗ ông và lời khoe 50 triệu, chiến tranh lạnh, trị liệu gia đình | H3, H8 | **SS** |
| `GD.N` Nhà Nhi | Chủ tịch, danh sách mai mối, prom date do hai nhà xếp, Khải là anh, Melbourne dịp Tết, Nhi muốn thật và rời đi để trốn danh sách, hội đồng thật của gia đình sau sân bay (bản cũ: Phần 4) | H6, H7 | **SS** |

## 5. Giao điểm

**Luật:**
1. Mỗi node có **một cha**. Quan hệ nhiều chiều (Thuyên – Diệp Anh vừa tình cảm vừa liên minh) thể hiện bằng **hai node + một giao điểm quãng**, không bằng node hai cha. Lý do: mỗi tình tiết luôn có một chủ rõ ràng.
2. Giao điểm được tạo tự do, giữa bất kỳ tầng nào.
3. File giao điểm giữ: node tham gia, ngày, bối cảnh, **thứ tự** các tình tiết (trích mã), luật va chạm (tuyến nào thắng nhịp, register nào), **ai biết gì trước và sau**.
4. Giao điểm sự kiện (một ngày, một đêm) và giao điểm quãng (kéo nhiều tháng) cùng một khuôn.

**Danh sách ban đầu [đề xuất]:**

| X | Giao điểm | Giai đoạn | Loại | Node | Nguồn hiện có | Mức |
| --- | --- | --- | --- | --- | --- | --- |
| X-01 | Summit 12/10/2024 | MĐ | sự kiện | TH.MO · RM.TD · GD.N | bible §8.1 | **A** |
| X-02 | Buổi 1 *Đường thẳng* 27/10 | GĐ1 | sự kiện | RM.TN · QK.T (NT-01, NT-04) | BRIEF §7 | **A** |
| X-03 | Ngoại khóa 2, gặp Vũ 24/11 | GĐ1 | sự kiện | RM.TN · SL.VU | BRIEF | **B** |
| X-04 | Buổi 3, tên Thảo 28/11 | GĐ1 | sự kiện | RM.TN · TH.LAB · QK.N | BRIEF | **B** |
| X-05 | Đề boyfriend 8/12 | GĐ1 | sự kiện | RM.TN · RM.PN · QK.T (NT-06) | BRIEF, chốt | **S** |
| X-06 | Quân sư bí mật (12/12 → đêm say) | GĐ1 | **quãng** | RM.PN · RM.TN · QK.T (NT-09) | GALA §3–4 | **SS** |
| X-07 | Pickup 28/12 | GĐ1 | sự kiện | RM.TN · SL.SAN · RM.PN · GD.N | BRIEF | **B** |
| X-08 | 31/12 OT tầng 17 | GĐ1 | sự kiện | RM.TD · RM.TN (Locket) · TH.LM | chốt 20/10 | **S** |
| X-09 | Tất niên và gala 16–18/1/2025 | GĐ1 | sự kiện | TH.T18 · TH.MD · RM.TN · RM.PN · RM.TD · GD.N | GALA | **SS** |
| X-10 | *Mixue* | GĐ1 | sự kiện | RM.TN · RM.PN | chốt | **SS** |
| X-11 | Đêm say | GĐ1 | sự kiện | RM.TN · SL.HD · RM.PN | BRIEF | **SS** |
| X-12 | Drone sinh từ đồ ăn cho Nhi | GĐ1 | sự kiện | RM.TN · TH.DR | chốt 23/10 | **A** |
| X-13 | Thân phận Nhi (Q-001) | GĐ1 → GÃY | **quãng** | RM.TN · GD.N · TH.T18 | `de-xuat/q-001` | **SS** |
| X-14 | Liên minh Thuyên – Diệp Anh | GĐ1 → GÃY | **quãng** | RM.TD · TH.LM | bible §4.3 | **S** |
| X-15 | Rạn nứt với Vũ | GĐ2 | sự kiện | SL.VU · RM.TN · SL.DT | bible §4.5 | **S** |
| X-16 | Tiệc R&D, giỗ ông | GĐ2 | sự kiện | TH.MD · GD.T · SL.DT | bible §8.3 | **A** |
| X-17 | Tiệc Nhi đạt aim | GĐ2 | sự kiện | RM.PN · RM.TN · SL.HD | GALA §6 | **B** |
| X-18 | Điểm gãy | GÃY | sự kiện | mọi tuyến cấp 1 | bible §8.4 | **SSS** |

X-13 cho thấy một loại giao điểm đặc biệt: **giao điểm thông tin**, chạy bằng "ai biết gì lúc nào" (sổ 16 kênh của `de-xuat/q-001`). Đề xuất giữ khuôn ấy cho mọi giao điểm quãng.

## 6. Khuôn file

**File node** (`tuyen/romance/thuyen-nhi/tinh-tiet.md`):

```
# RM.TN · Thuyên – Nhi

Cha: RM · Trục: H1, H3, H7 · Mức: MĐ B · GĐ1 SSS · GĐ2 SS+ · GÃY SS+ · HP S
Thẻ: nhan-vat/thuyen.md, nhan-vat/nhi.md
Module: kho-nhi-thich-thuyen.md, rui-ro.md, brief.md

## Cung của node
Một đoạn: node này bắt đầu ở đâu, kết thúc ở đâu, đổi gì trong nhân vật.

## Tình tiết
| Mã | Ngày | Tình tiết | Trạng thái | H | Nấc | NT | X | Chương |
| TN-001 | CN 27/10/2024 | Buổi 1: kid lần đầu, cú đấm đầu, sticker 18 MONTH WARRANTY | đề xuất | H4 | 7 | NT-01 | X-02 | — |
| TN-014 | T7 18/1/2025 | Nhảy với Nhi dưới spotlight thật, đón ánh mắt cô một giây trước khi đèn tắt | chốt 24/10 | H1 | 7 | NT-06 | X-09 | — |

## Khoảng trống
Những gì node cần mà chưa có tình tiết (ví dụ: lý do Thuyên thích Nhi, RR §R3).
```

**File giao điểm** (`tuyen/giao-diem/x-09-tat-nien-gala.md`): node tham gia; ngày, nơi; thứ tự tình tiết theo mã; luật va chạm; sổ ai biết gì trước và sau; câu hỏi mở.

**Dòng tình tiết khi đã chốt:** `[TN-014 · chốt D-0xx 24/10]`. Đổi tình tiết thì đổi ở node chủ; giao điểm chỉ trích mã nên không phải sửa.

## 7. Thư mục

Thay mục `tuyen/` trong `kien-truc.md` §2:

```
docs/tuyen/
├── README.md              cây, bảng mức theo giai đoạn, bảng mã, dải hiện sinh (sinh tự động)
├── goc.md                 gốc: một câu, trục H1–H8, thang 9 nấc, cung hiện sinh theo giai đoạn, luật triển khai, luật sinh tuyến
├── qua-khu/
│   ├── README.md          luật QK, bảng NT
│   ├── thuyen.md  nhi.md  diep-anh.md  khai.md
├── romance/
│   ├── thuyen-nhi/        tinh-tiet.md, brief.md, kho-nhi-thich-thuyen.md, rui-ro.md
│   ├── thuyen-diep-anh.md  phong-nhi.md  linh-tung.md  vu-an-nhien.md
├── thriller/
│   ├── mo-man.md  lab.md  model.md  lien-minh.md  tang-18.md  drone.md
├── slice-of-life/
│   ├── vu.md  hoi-san.md  hoi-dong-nhi.md  doi-thuong.md
├── gia-dinh/
│   ├── thuyen.md  nhi.md
└── giao-diem/
    ├── x-01-summit.md … x-18-diem-gay.md
```

`tuyen/su-kien/` cũ bỏ, thay bằng `giao-diem/`.

## 8. Ánh xạ từ file hiện có

| Hiện tại | Về node |
| --- | --- |
| bible §1, §3; M-he-gia-tri §1–2; M-dien-bien-cam-xuc §3, §5 | `goc.md` |
| `danh-sach-chuong-mo-dau.md`, M-he-gia-tri §3, §7; M-cai-nhau-bo-me; M-moi-tinh-vy; `mau-*`; ch.2–6 v2 | `qua-khu/thuyen.md` + bảng NT |
| Project `the-nhan-vat-nhi.md`, `M-he-gia-tri-nhi.md` | `qua-khu/nhi.md` (phần sự kiện), `nhan-vat/nhi.md` (phần lõi) |
| Project `M-he-gia-tri-diep-anh.md` | `qua-khu/diep-anh.md`, `nhan-vat/diep-anh.md` |
| `brief-tinh-cam-thuyen-nhi.md`, `03-kho`, RR | `romance/thuyen-nhi/`; tình tiết của Phong tách sang `phong-nhi.md`, của Diệp Anh sang `thuyen-diep-anh.md` |
| GALA | `giao-diem/x-09`, `x-06` (quân sư bí mật) |
| `02-hoi-dong-nhi.md` | `slice-of-life/hoi-dong-nhi.md` |
| bible §5, §6; `brief-van-phong-dau-tri.md` | `thriller/` |
| bible §7 | `slice-of-life/vu.md`, `hoi-san.md` |
| M-he-gia-tri §8 | `goc.md` (cung hiện sinh, GÃY); tình tiết bảng giá người về `thriller/lab.md` |
| `de-xuat/q-001-…` | `giao-diem/x-13` khi duyệt xong |
| bible §8 (dòng thời gian) | tách thành tình tiết của từng node; bible giữ bảng lịch (mục 9) |

## 9. Bible sau khi có cây

Nguyên tắc 1 của `kien-truc.md` là một nguồn cho mỗi loại thông tin. Có cây thì bible không thể vẫn giữ tình tiết. Hai phương án:

| | A. Bible mỏng **[khuyến nghị]** | B. Bible đầy đủ, node là chi tiết |
| --- | --- | --- |
| Bible giữ | trỏ tới gốc, lịch (`lich.md`), bảng node và trạng thái, tóm một dòng mỗi tình tiết đã chốt (tự sinh từ node) | như hiện tại |
| Tình tiết sống ở | node | cả bible và node |
| Được | một nguồn; đổi một chỗ | session mới đọc một file là đủ |
| Mất | session mới phải đọc gốc + README cây + node liên quan | lặp lại đúng lỗi Q-002 |

Với A, bộ đọc khi bắt đầu session thành: `README.md`, `tuyen/goc.md`, `tuyen/README.md`, `canon/cau-hoi.md`, rồi các node việc cần.

## 10. Câu hỏi cho tác giả

| Q | Câu hỏi | Khuyến nghị |
| --- | --- | --- |
| Q-022 | Duyệt năm tuyến cấp 1: QK, RM, TH, SL, **GD** (GD do Claude thêm; HS đã chuyển vào gốc theo ý tác giả 25/10) | Duyệt. GD giao TH nặng (danh sách mai mối, Khải) |
| Q-023 | Vai của bible: A (mỏng) hay B (đầy đủ) | A |
| Q-024 | HĐQT 🎀 đặt ở SL hay dưới RM.TN | SL: phía Nhi đang không có đời thường riêng |
| Q-025 | QK chỉ dày cho Thuyên, hay dày cho mọi nhân vật chính | Thuyên dày; Nhi, Diệp Anh, Khải chỉ những mảnh sinh NT dùng ở hiện tại |
| Q-026 | Duyệt khuôn mã: node `RM.TN`, tình tiết `TN-014`, niềm tin `NT-05`, giao điểm `X-09`, trục `H3` | Duyệt |
| Q-027 | Luật "mỗi node một cha, quan hệ đa chiều đi qua giao điểm" (Thuyên – Diệp Anh thành RM.TD + TH.LM + X-14) | Duyệt. Thay thế là cho node hai cha, mất tính một chủ |
| Q-028 | Duyệt thang mức D → SSS (có SS+) theo năm giai đoạn, ba luật của thang, định nghĩa SS+, và các ô Claude gán (ô không có `†`). Kèm: MĐ có gồm quá khứ lớp 10 → đại học không? | Duyệt thang; sửa từng ô nếu lệch |
| Q-029 | Tình tiết hiện sinh không có cảnh riêng (*Nước lạnh*, chẩn đoán) thuộc node nào? | SL.DT (đời sống Thuyên); thay thế: chẩn đoán về GD.T vì nó dẫn vào trị liệu gia đình |

## 11. Lộ trình

Gộp vào bước 4 của lộ trình `kien-truc.md` §8 (chuyển file), vì đằng nào cũng phải chuyển.

| # | Việc | Phụ thuộc |
| --- | --- | --- |
| 1 | Tác giả trả lời Q-022 đến Q-029 | — |
| 2 | Dựng `tuyen/README.md` và `goc.md` (kèm bảng cung hiện sinh theo giai đoạn) | 1 |
| 3 | QK.T: bảng NT từ ch.2–6 đã lên trang (trang là canon cứng) | 2 |
| 4 | RM.TN: chuyển BRIEF, KHO, RR; đánh mã TN-; tách tình tiết Phong, Diệp Anh sang node của họ | 2 |
| 5 | Giao điểm dày nhất trước: X-06, X-08, X-09, X-10, X-11 | 4 |
| 6 | Bộ khung TH, SL, GD (TH.LAB, TH.MD, TH.T18 trước, theo độ lệch ở mục 1a): chuyển các dòng đang có trong bible, đánh mã, gắn H và Nấc, ghi khoảng trống | 2 |
| 7 | Sửa `kien-truc.md` (§2, §4, §5), `quy-trinh.md` §4.3; bible theo phương án đã chọn | 1 |
| 8 | Skill: `den-vang-plot-synthesis` đọc node theo giao điểm của khoảng chương; `den-vang-canon` kiểm luật cây | 7 |
| 9 | `npm run canon:check` thêm: mỗi tình tiết có một chủ; mỗi NT được tiêu thụ hoặc `[chờ tiêu thụ]`; mỗi mã X, NT, H được trích đều tồn tại; tình tiết của node mức S trở lên có H và Nấc; sinh lại dải hiện sinh và báo chỗ nấc lùi | 7 |

Bước 4 và 6 sẽ lộ ra khoảng trống thật của từng tuyến (ví dụ TH.LAB giai đoạn 1 gần như chưa có tình tiết nào có ngày). Danh sách ấy là đầu vào cho lượt dựng tình tiết tiếp theo.
