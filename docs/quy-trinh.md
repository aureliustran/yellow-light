# Đèn vàng – Quy trình tác giả + Claude

Oct 25, 2026 · @aureliustran. Sửa Oct 26, 2026 theo chốt cây tuyến (Q-030 đến Q-033). Cách tác giả và Claude làm việc với nhau, theo từng loại việc. Kiến trúc nền: `kien-truc.md`. Cây tuyến: `tuyen/README.md`.

## 1. Phân vai

| | Tác giả | Claude |
| --- | --- | --- |
| Quyết định canon (tên, sự kiện, quan hệ, số liệu, ai biết gì lúc nào) | Có | Không. Chỉ đề xuất |
| Ghi sổ, giữ các file khớp nhau | n/a | Có, trong cùng lượt tác giả chốt |
| Câu chữ, nhịp, thứ tự cảnh trong khung đã chốt | Duyệt thành phẩm | Tự quyết, ghi lý do vào log |
| Merge PR, `git push` lên `main` | Có | Không |

**Ngưỡng hỏi:** việc chạm canon thì Claude hỏi trước (tối đa bốn câu một lần, kèm khuyến nghị). Việc trong khung đã chốt thì Claude làm rồi báo.

## 2. Vòng đời một quyết định

```
câu hỏi (Q-) ──▶ đề xuất (de-xuat/ hoặc node) ──▶ tác giả chốt ──▶ D- trong sổ
                                                                   ├─▶ sửa node chủ (một chỗ) và bible mỏng
                                                                   ├─▶ sửa module trích chốt cũ
                                                                   ├─▶ đóng Q- liên quan
                                                                   └─▶ (về sau) "thay bởi D-"
```

Một chốt chỉ được coi là xong khi cả năm việc ở nhánh phải đã làm.

## 3. Bắt đầu và kết thúc session

**Bắt đầu** (`den-vang-canon`, chế độ khởi động):
1. Đọc `docs/README.md`, `docs/tuyen/goc.md`, `docs/tuyen/README.md`, `docs/canon/cau-hoi.md`. (Bible mỏng: đọc khi cần lịch hoặc bảng trạng thái.)
2. Repo: kiểm `git status`, nhánh hiện tại, khoảng cách với `origin/main`.
3. Có `claude/inbox/` trên Project thì gộp vào repo trước.
4. Xếp yêu cầu của tác giả vào một loại ở mục 4. Việc chạm tình tiết đi qua 4.0 trước.

**Kết thúc** (khi có thay đổi):
1. Commit vào nhánh `claude/<chủ-đề>` (hoặc báo tác giả tự commit, xem `kien-truc.md` mục 7).
2. Đồng bộ các file đã đổi lên Project, cùng đường dẫn.
3. Báo tác giả: đã đổi gì (mã D-, Q- đã đóng), PR nào chờ merge, câu hỏi còn lại.

## 4. Quy trình theo loại việc

### 4.0 Chọn tuyến (cây quyết định)

Chạy trước mọi việc chạm tình tiết: lập plan, viết, đề xuất ý mới, sửa canon. Chi tiết từng bước: `tuyen/README.md` mục 5.

**Lối vào A: lập plan cho một khoảng chương (từ trên xuống).**
1. Chọn giai đoạn (MĐ, GĐ1, GĐ2, GÃY, HP).
2. Đọc ma trận mức của giai đoạn, xếp node vào vai: DẪN (SSS, SS+), CHÍNH (SS, S), NỀN (A, B), PHỤ (C, D).
3. Giao điểm có ngày trong khoảng kéo thêm node; va chạm tính **theo nhịp, không theo cảnh**.
4. Gốc: nấc và trục nặng của giai đoạn; câu gốc của trục làm thước.
5. Quá khứ: NT cần tiêu thụ; mảnh hồi tưởng chèn khi hiện tại chạm NT.
6. Khoảng trống của node DẪN và CHÍNH thành pattern cho `den-vang-plot-synthesis`.

**Đầu ra:** `ke-hoach/tong-hop/<khoảng>/pham-vi-tuyen.md`, kèm mục **Không đụng**. Mọi bước sau chỉ đọc node có trong file ấy; writer và reviewer không kéo node ngoài danh sách vào nếu chưa hỏi.

**Lối vào B: một yêu cầu, ý mới hoặc thay đổi (từ dưới lên).**
1. Tìm node chủ. Không có: phục vụ trục H nào? Có thì đề xuất node mới (`de-xuat/`); không thì hạ thành chất liệu (`kho/`).
2. Xem mức của node chủ ở giai đoạn của việc để chọn độ nặng quy trình (bảng 4.3).
3. Lan truyền: giao điểm chứa tình tiết, NT, dải hiện sinh (nấc có lùi không), sổ "ai biết gì".
4. Đầu ra: danh sách node bị ảnh hưởng; Q- mới cho mọi chỗ chưa có đáp án.

**Ví dụ lối vào B:** đổi chỗ Phong tỏ tình (RM.PN, mức S ở GĐ1) phải kéo theo X-09 gala, X-17 tiệc aim và RM.TN. Thiếu bước này là lỗi của Q-002.

### 4.1 Chốt
**Tác giả nói:** "chốt …", "ok cái này", "chọn phương án 2", trả lời một Q-.
**Skill:** `den-vang-canon`.
**Claude làm:**
1. Ghi chốt nguyên văn ý tác giả vào `so-quyet-dinh.md` với mã D- mới và ngày.
2. **Sửa node chủ của tình tiết (một chỗ)**; sửa `bible.md` nếu chốt đổi lịch hoặc bảng trạng thái. Chốt thay chốt cũ thì ghi "thay bởi" ở chốt cũ.
3. Tìm mọi module trích chốt cũ hoặc nói ngược; sửa, hoặc đánh dấu `[thay bởi D-xxx]` nếu là đề xuất lịch sử. Giao điểm chỉ trích mã nên thường không phải sửa.
4. Đóng Q- liên quan; chốt mở ra câu hỏi mới thì thêm Q-.
5. Báo một dòng cho mỗi chốt: mã D-, file đã sửa.

**Đầu ra:** `canon/*`, node chủ, các module bị ảnh hưởng.

### 4.2 Nghĩ phương án
**Tác giả nói:** "nghĩ cách xử lý …", "có những hướng nào cho …".
**Skill:** `den-vang-characters`, `den-vang-registers`; thêm `den-vang-plot-synthesis` nếu đổi nhân quả của nhiều chương. Đi qua 4.0 lối vào B trước.
**Claude làm:** ghi `de-xuat/<chủ-đề>.md` theo khuôn đã dùng tốt ở `rui-ro`:
- vấn đề;
- các phương án xếp theo mức can thiệp (nhẹ, vừa, mạnh, rất mạnh), mỗi phương án có được và mất;
- phương án nào đụng chốt nào, node nào;
- phương án nào không đi cùng nhau;
- khuyến nghị;
- câu hỏi cho tác giả, thêm vào `cau-hoi.md`.

**Không làm:** sửa canon.

### 4.3 Thiết kế node, giao điểm, kho chất liệu
**Tác giả nói:** "dựng kho cho …", "thiết kế sự kiện …".
**Skill:** `den-vang-characters`, `den-vang-registers`.
**Claude làm:** ghi vào node hoặc giao điểm trong `tuyen/<tuyến>/…`, theo khuôn `tuyen/README.md` mục 7. Tình tiết mới là dòng `[đề xuất]`. Chốt tác giả đưa trong lúc thiết kế đi theo 4.1 ngay, không để nằm lại trong node dưới dạng đề xuất.

**Độ nặng theo mức của node chủ ở giai đoạn của việc:**

| Mức | Quy trình | Phản biện độc lập |
| --- | --- | --- |
| SSS, SS+ | `plot-synthesis` đầy đủ (pattern, tìm kiếm, phương án, phản biện) trước khi viết | Bắt buộc |
| SS, S | `de-xuat/` theo khuôn phương án theo mức can thiệp | Bắt buộc nếu đổi nhân quả của nhiều chương |
| A, B | Ghi thẳng vào node, đánh dấu `[đề xuất]`, báo tác giả | Không |
| C, D | Ghi thẳng vào node | Không |

### 4.4 Viết một khoảng chương
**Tác giả nói:** "viết ch.N–M".
**Skill, theo thứ tự:**

| Bước | Skill | Đầu ra | Tác giả duyệt |
| --- | --- | --- | --- |
| 0 | `den-vang-canon` + 4.0 lối vào A | Danh sách Q- chặn khoảng này; `pham-vi-tuyen.md` | Trả lời Q- chặn |
| 1 | `den-vang-plot-synthesis` | `ke-hoach/tong-hop/<khoảng>/cot-truyen.md` | Có; mỗi điểm duyệt thành D- |
| 2 | `den-vang-writing-synthesis` | `sap-canh.md`, `style-sheet.md`, `brief-*.md` | Không bắt buộc |
| 3 | `den-vang-writing-pipeline` | Bản nháp, review độc lập, chương vào `content/v2/` | Duyệt chương |
| 4 | `den-vang-canon` | D- đề xuất từ những gì mới lên trang; điền cột "Chương" của node | Có |

**Đường tắt:** khoảng chương đã có khung chốt trong `ke-hoach/` thì bỏ bước 1–2, vào thẳng bước 3. Một chương lẻ hoặc sửa nhỏ thì viết trực tiếp, không cần pipeline. Bảng chương chỉ xếp mã tình tiết và giao điểm, không chép nội dung.

### 4.5 Sửa chương đã viết
**Tác giả nói:** "sửa đoạn …", "chương N đọc chưa ổn".
**Skill:** sửa câu chữ thì làm trực tiếp, theo `rules/` và `den-vang-registers`; sửa lớn xuyên nhiều chương thì dùng `den-vang-writing-pipeline`. Sửa làm đổi canon thì đi qua 4.1 trước.
**Đầu ra:** chương trong `content/v2/` trên nhánh.

### 4.6 Rà soát
**Tác giả nói:** "rà soát ch.N–M", hoặc trước một giai đoạn mới.
**Skill:** `den-vang-audit`, rồi `den-vang-canon`.
**Đầu ra:** `ra-soat/<khoảng>/` (sáu sổ, đánh giá, danh sách sửa), **ghi ngược vào node** (sổ canon vào node chủ, quỹ đạo nhân vật vào dải hiện sinh, manh mối vào giao điểm), D- đề xuất, Q- mới cho mâu thuẫn.

### 4.7 Đăng truyện
**Site:** chương trong `content/v2/` lên site khi merge vào `main`.
**Đăng chéo:** theo `CLAUDE.md` của repo và `crosspost/sites/<site>/convert.md`; phát triển adapter dùng `crosspost-site`.

### 4.8 Chat không có repo
**Khi nào:** session trên claude.ai không link máy, hoặc chat nhanh trên điện thoại.
**Claude làm:**
- Đọc bản sao trên Project để trả lời.
- Tác giả chốt điều gì thì ghi nguyên văn vào `claude/inbox/<yyyy-mm-dd>-<chủ-đề>.md` trên Project, không sửa bản sao canon.
- Báo tác giả rằng chốt sẽ vào repo ở session có repo kế tiếp.

## 5. Kiểm trước khi báo xong

| Việc | Kiểm |
| --- | --- |
| Chốt | Năm việc ở mục 2 đã làm; tìm mã chốt cũ trong `docs/` không còn chỗ trích sai |
| Phương án | Mỗi phương án ghi rõ đụng chốt nào, node nào; có khuyến nghị |
| Tình tiết | Có đúng một node chủ; có H và Nấc nếu node mức S trở lên; mọi dòng có nhãn |
| Chương | Review độc lập đã chạy; không còn `[[CẦN CHỐT]]` chưa thành Q-; header và khối hiển thị đúng `rules/01c` |
| Rà soát | Mọi mâu thuẫn thành Q- hoặc việc trong danh sách sửa; đã ghi ngược vào node |
| Mọi việc | Thứ trong tuần của ngày mới đã kiểm bằng code; Project đã đồng bộ |
