# Đèn vàng – tài liệu

Oct 25, 2026 · @aureliustran. Sửa Oct 26, 2026. Sửa Oct 29, 2026 (chuyển phần còn lại từ Project về repo). Cửa vào của mọi tài liệu truyện. Mọi session (người hay Claude) đọc file này trước.

## Kho gốc

**Repo này là kho gốc** (chốt 25/10). Project "Đèn Vàng" trên claude.ai chỉ là bản sao chọn lọc cho chat. Khi hai bên lệch nhau, repo thắng. Cách đồng bộ: `kien-truc.md` mục 3.

## Đọc gì khi bắt đầu

| Thứ tự | File | Để biết |
| --- | --- | --- |
| 1 | `README.md` (file này) | Bản đồ, nhãn, thứ tự ưu tiên |
| 2 | `tuyen/goc.md` | Gốc: trục hiện sinh, thang nấc, cung hiện sinh theo giai đoạn |
| 3 | `tuyen/README.md` | Cây tuyến, ma trận mức, cây quyết định, trạng thái dựng |
| 4 | `canon/cau-hoi.md` | Câu hỏi đang mở, xung đột chờ tác giả |
| 5 | `quy-trinh.md` | Việc đang làm thuộc loại nào, dùng skill nào |

Chỉ mở node và module trong phạm vi việc (`quy-trinh.md` mục 4.0). Không đọc hết `docs/` "cho chắc". Bible mỏng (`canon/bible.md`) mở khi cần lịch hoặc bảng trạng thái.

## Bản đồ

| Đường dẫn | Chứa gì | Trạng thái |
| --- | --- | --- |
| `README.md` | Cửa vào | có |
| `kien-truc.md` | Kho, cấu trúc thư mục, tầng nội dung, quy ước mã, danh mục skill | có |
| `quy-trinh.md` | Quy trình tác giả + Claude theo từng loại việc, gồm cây quyết định | có |
| `tuyen/goc.md` | Gốc | có (26/10) |
| `tuyen/README.md` | Cây tuyến, ma trận mức, giao điểm ban đầu | có (26/10) |
| `tuyen/qua-khu/README.md` | Luật QK, bảng niềm tin | có (26/10) |
| `tuyen/qua-khu/thuyen*.md` | Node QK.T: `thuyen.md`, `thuyen-hai-cai-toi.md`, `thuyen-da-nhan-cach.md`, `thuyen-co-may.md` | có (26–27/10) |
| `tuyen/romance/` | RM.TN, RM.TD, RM.PN, RM.LT, RM.VA | chưa dựng (session RM) |
| `tuyen/thriller/` | TH.MO, TH.LAB, TH.MD, TH.LM, TH.T18, TH.DR | chưa dựng (session TH) |
| `tuyen/slice-of-life/`, `tuyen/gia-dinh/` | SL.*, GD.* | chưa dựng |
| `tuyen/giao-diem/` | Giao điểm X-01 đến X-18 | chưa dựng; danh sách ở `tuyen/README.md` mục 8 |
| `canon/bible.md` | Mỏng: trỏ tới gốc, lịch, bảng node, tóm một dòng mỗi tình tiết đã chốt | **chưa làm mỏng**: bản tạm đầy đủ ở `canon/bible-v2.md` |
| `canon/so-quyet-dinh.md` | Nhật ký chốt `D-` | chưa có |
| `canon/cau-hoi.md` | Câu hỏi `Q-` và xung đột | có |
| `canon/lich.md` | Dòng thời gian 2024–2025 | chưa có (bảng tạm ở bible-v2 mục 2) |
| `nhan-vat/` | Thẻ nhân vật v2 (ai là ai, không kể sự kiện) | chưa có |
| `rules/` | Luật viết, khối hiển thị, thoại thân mật, register | có `registers.md` (27/10), `goi-ten-cam-xuc.md` (28/10); luật chung còn ở `docs/01-rules-viet.md`, `01c`, `01d` |
| `ke-hoach/` | Khung chương, `pham-vi-tuyen.md`, đầu ra tổng hợp, pipeline | có `ban-nhap/` (bản nháp thử v4, v5 chưa đăng) |
| `ra-soat/` | Sổ rà soát theo khoảng chương | chưa có |
| `de-xuat/` | Đề xuất chưa duyệt | có |
| `kho/` | Nguyên liệu, legacy | có `kho/legacy/project/` (ghi chú cũ chỉ từng có trên Project, chuyển 29/10) |
| `../content/v2/` | Chương v2 | có |
| `../content/import/` | Chương legacy | có |

Các file còn nằm phẳng trong `docs/` là trạng thái trước khi chuyển. Bảng ánh xạ: `kien-truc.md` mục 2.

## Nhãn

| Nhãn | Nghĩa |
| --- | --- |
| `[chốt D-xxx dd/mm]` | Tác giả đã duyệt. Mã `D-` có sau khi chuyển; trước đó ghi `[chốt dd/mm]` |
| `[đề xuất]` | Chưa duyệt. Không viết như canon |
| `[nguyên liệu: <nguồn>]` | Lấy từ bản cũ, cần xác nhận còn dùng |
| `[thay bởi D-xxx]` | Quyết định đã bị thay; giữ để lần ngược |
| `[XUNG ĐỘT Q-xxx]` | Hai nguồn nói khác nhau, chờ tác giả |
| `[[CẦN CHỐT: …]]` | Writer gặp chỗ thiếu canon, đánh dấu ngay trong bản nháp |
| `[chờ tiêu thụ]` | Niềm tin (NT) chưa có tình tiết hiện tại dùng |
| `[chờ]` | Ô chưa có mức (ví dụ "hậu sân bay") |

Dòng trong `tuyen/` không có nhãn `[chốt]` hay `[đề xuất]` là lỗi.

## Thứ tự ưu tiên khi lệch

1. Chương v2 đã lên trang (`content/v2/`).
2. Chốt có ngày mới hơn.
3. Chốt cũ hơn.
4. Đề xuất.
5. Bản cũ (chỉ là nguyên liệu).

Trong cùng bậc: node thắng bible; `tuyen/README.md` thắng `de-xuat/cay-tuyen.md`.
