# Đèn vàng – Quy trình tác giả + Claude

Oct 25, 2026 · @aureliustran. Cách tác giả và Claude làm việc với nhau, theo từng loại việc. Kiến trúc nền: `kien-truc.md`.

## 1. Phân vai

| | Tác giả | Claude |
| --- | --- | --- |
| Quyết định canon (tên, sự kiện, quan hệ, số liệu, ai biết gì lúc nào) | Có | Không. Chỉ đề xuất |
| Ghi sổ, giữ các file khớp nhau | — | Có, trong cùng lượt tác giả chốt |
| Câu chữ, nhịp, thứ tự cảnh trong khung đã chốt | Duyệt thành phẩm | Tự quyết, ghi lý do vào log |
| Merge PR, `git push` lên `main` | Có | Không |

**Ngưỡng hỏi:** việc chạm canon thì Claude hỏi trước (tối đa bốn câu một lần, kèm khuyến nghị). Việc trong khung đã chốt thì Claude làm rồi báo.

## 2. Vòng đời một quyết định

```
câu hỏi (Q-) ──▶ đề xuất (de-xuat/ hoặc module) ──▶ tác giả chốt ──▶ D- trong sổ
                                                                   ├─▶ sửa bible.md
                                                                   ├─▶ sửa module trích chốt cũ
                                                                   ├─▶ đóng Q- liên quan
                                                                   └─▶ (về sau) "thay bởi D-"
```

Một chốt chỉ được coi là xong khi cả năm việc ở nhánh phải đã làm.

## 3. Bắt đầu và kết thúc session

**Bắt đầu** (`den-vang-canon`, chế độ khởi động):
1. Đọc `docs/README.md`, `docs/canon/bible.md`, `docs/canon/cau-hoi.md`.
2. Repo: kiểm `git status`, nhánh hiện tại, khoảng cách với `origin/main`.
3. Có `claude/inbox/` trên Project thì gộp vào repo trước.
4. Xếp yêu cầu của tác giả vào một loại ở mục 4.

**Kết thúc** (khi có thay đổi):
1. Commit vào nhánh `claude/<chủ-đề>` (hoặc báo tác giả tự commit, xem `kien-truc.md` mục 7).
2. Đồng bộ các file đã đổi lên Project, cùng đường dẫn.
3. Báo tác giả: đã đổi gì (mã D-, Q- đã đóng), PR nào chờ merge, câu hỏi còn lại.

## 4. Quy trình theo loại việc

### 4.1 Chốt
**Tác giả nói:** "chốt …", "ok cái này", "chọn phương án 2", trả lời một Q-.
**Skill:** `den-vang-canon`.
**Claude làm:**
1. Ghi chốt nguyên văn ý tác giả vào `so-quyet-dinh.md` với mã D- mới và ngày.
2. Sửa `bible.md`. Chốt thay chốt cũ thì ghi "thay bởi" ở chốt cũ.
3. Tìm mọi module trích chốt cũ hoặc nói ngược; sửa, hoặc đánh dấu `[thay bởi D-xxx]` nếu là đề xuất lịch sử.
4. Đóng Q- liên quan; chốt mở ra câu hỏi mới thì thêm Q-.
5. Báo một dòng cho mỗi chốt: mã D-, file đã sửa.

**Đầu ra:** `canon/*`, các module bị ảnh hưởng.

### 4.2 Nghĩ phương án
**Tác giả nói:** "nghĩ cách xử lý …", "có những hướng nào cho …".
**Skill:** `den-vang-characters`, `den-vang-registers`; thêm `den-vang-plot-synthesis` nếu đổi nhân quả của nhiều chương.
**Claude làm:** ghi `de-xuat/<chủ-đề>.md` theo khuôn đã dùng tốt ở `rui-ro`:
- vấn đề;
- các phương án xếp theo mức can thiệp (nhẹ, vừa, mạnh, rất mạnh), mỗi phương án có được và mất;
- phương án nào đụng chốt nào;
- phương án nào không đi cùng nhau;
- khuyến nghị;
- câu hỏi cho tác giả, thêm vào `cau-hoi.md`.

**Không làm:** sửa canon.

### 4.3 Thiết kế module, kho chất liệu
**Tác giả nói:** "dựng kho cho …", "thiết kế sự kiện …".
**Skill:** `den-vang-characters`, `den-vang-registers`.
**Claude làm:** ghi `tuyen/<tuyến>/<chủ-đề>.md`. Chốt tác giả đưa trong lúc thiết kế đi theo 4.1 ngay, không để nằm lại trong module.

### 4.4 Viết một khoảng chương
**Tác giả nói:** "viết ch.N–M".
**Skill, theo thứ tự:**

| Bước | Skill | Đầu ra | Tác giả duyệt |
| --- | --- | --- | --- |
| 0 | `den-vang-canon` | Danh sách Q- chặn khoảng này | Trả lời Q- chặn |
| 1 | `den-vang-plot-synthesis` | `ke-hoach/tong-hop/<khoảng>/cot-truyen.md` | Có; mỗi điểm duyệt thành D- |
| 2 | `den-vang-writing-synthesis` | `sap-canh.md`, `style-sheet.md`, `brief-*.md` | Không bắt buộc |
| 3 | `den-vang-writing-pipeline` | Bản nháp, review độc lập, chương vào `content/v2/` | Duyệt chương |
| 4 | `den-vang-canon` | D- đề xuất từ những gì mới lên trang | Có |

**Đường tắt:** khoảng chương đã có khung chốt trong `ke-hoach/` thì bỏ bước 1–2, vào thẳng bước 3. Một chương lẻ hoặc sửa nhỏ thì viết trực tiếp, không cần pipeline.

### 4.5 Sửa chương đã viết
**Tác giả nói:** "sửa đoạn …", "chương N đọc chưa ổn".
**Skill:** sửa câu chữ thì làm trực tiếp, theo `rules/` và `den-vang-registers`; sửa lớn xuyên nhiều chương thì dùng `den-vang-writing-pipeline`. Sửa làm đổi canon thì đi qua 4.1 trước.
**Đầu ra:** chương trong `content/v2/` trên nhánh.

### 4.6 Rà soát
**Tác giả nói:** "rà soát ch.N–M", hoặc trước một giai đoạn mới.
**Skill:** `den-vang-audit`, rồi `den-vang-canon`.
**Đầu ra:** `ra-soat/<khoảng>/` (sáu sổ, đánh giá, danh sách sửa), D- đề xuất, Q- mới cho mâu thuẫn.

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
| Phương án | Mỗi phương án ghi rõ đụng chốt nào; có khuyến nghị |
| Chương | Review độc lập đã chạy; không còn `[[CẦN CHỐT]]` chưa thành Q-; header và khối hiển thị đúng `rules/01c` |
| Rà soát | Mọi mâu thuẫn thành Q- hoặc việc trong danh sách sửa |
| Mọi việc | Thứ trong tuần của ngày mới đã kiểm bằng code; Project đã đồng bộ |
