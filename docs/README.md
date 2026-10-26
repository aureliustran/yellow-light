# Đèn vàng – tài liệu

Oct 25, 2026 · @aureliustran. Cửa vào của mọi tài liệu truyện. Mọi session (người hay Claude) đọc file này trước.

## Kho gốc

**Repo này là kho gốc** (chốt 25/10). Project "Đèn Vàng" trên claude.ai chỉ là bản sao chọn lọc cho chat. Khi hai bên lệch nhau, repo thắng. Cách đồng bộ: `kien-truc.md` mục 3.

## Đọc gì khi bắt đầu

| Thứ tự | File | Để biết |
| --- | --- | --- |
| 1 | `README.md` (file này) | Bản đồ, nhãn, thứ tự ưu tiên |
| 2 | `canon/bible.md` | Truyện đang là gì: mọi quyết định hiện hành |
| 3 | `canon/cau-hoi.md` | Câu hỏi đang mở, xung đột chờ tác giả |
| 4 | `quy-trinh.md` | Việc đang làm thuộc loại nào, dùng skill nào |

Chỉ mở module khi việc cần. Không đọc hết `docs/` "cho chắc".

## Bản đồ

| Đường dẫn | Chứa gì | Trạng thái |
| --- | --- | --- |
| `README.md` | Cửa vào | có |
| `kien-truc.md` | Kho, cấu trúc thư mục, tầng nội dung, quy ước mã, danh mục skill | có |
| `quy-trinh.md` | Quy trình tác giả + Claude theo từng loại việc | có |
| `canon/bible.md` | Quyết định hiện hành | **chưa chuyển**: bản tạm ở Project `claude/v2/bible-v2.md` |
| `canon/so-quyet-dinh.md` | Nhật ký chốt `D-` | chưa có |
| `canon/cau-hoi.md` | Câu hỏi `Q-` và xung đột | có |
| `canon/lich.md` | Dòng thời gian 2024–2025 | chưa có (bảng tạm ở bible-v2 mục 2) |
| `nhan-vat/` | Thẻ nhân vật v2 | chưa có |
| `tuyen/` | Module thiết kế theo tuyến | chưa chuyển |
| `rules/` | Luật viết, khối hiển thị, thoại thân mật, register | chưa chuyển (đang ở `docs/01-rules-viet.md`, `01c`) |
| `ke-hoach/` | Khung chương, đầu ra tổng hợp, pipeline | chưa có |
| `ra-soat/` | Sổ rà soát theo khoảng chương | chưa có |
| `de-xuat/` | Đề xuất chưa duyệt | chưa có |
| `kho/` | Nguyên liệu, legacy | chưa chuyển |
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

## Thứ tự ưu tiên khi lệch

1. Chương v2 đã lên trang (`content/v2/`).
2. Chốt có ngày mới hơn.
3. Chốt cũ hơn.
4. Đề xuất.
5. Bản cũ (chỉ là nguyên liệu).
