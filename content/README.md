# Đèn vàng – tài liệu

Oct 25, 2026 · @aureliustran. Cửa vào của mọi tài liệu truyện. Mọi session (người hay Claude) đọc file này trước.

## Kho gốc

**Repo này là kho gốc** (chốt 25/10). Project "Đèn Vàng" trên claude.ai chỉ là bản sao chọn lọc cho chat. Khi hai bên lệch nhau, repo thắng. Cách đồng bộ: `kien-truc.md` mục 3.

## Đọc gì khi bắt đầu

Từ 10/11, cửa vào là [`GUIDELINES.md`](GUIDELINES.md) (cách làm việc, tiếng Anh) và [`docs/framework/README.md`](../docs/framework/README.md) (đặc tả). File này chỉ còn là **bản đồ tài liệu cũ** trong lúc chuyển sang khuôn mới; nhãn và thứ tự ưu tiên ở `config/statuses.md`.

## Bản đồ

| Đường dẫn | Chứa gì | Trạng thái |
| --- | --- | --- |
| `README.md` | Cửa vào | có |
| `kien-truc.md` | (superseded 10/11 → `docs/framework/`) | thay |
| `quy-trinh.md` | (superseded 10/11 → `GUIDELINES.md`) | thay |
| `canon/bible.md` | Quyết định hiện hành | **chưa chuyển**: bản tạm ở Project `claude/v2/bible-v2.md` |
| `canon/so-quyet-dinh.md` | Nhật ký chốt `D-` | chưa có |
| `canon/cau-hoi.md` | Câu hỏi `Q-` và xung đột | có |
| `canon/lich.md` | Dòng thời gian 2024–2025 | chưa có (bảng tạm ở bible-v2 mục 2) |
| `nhan-vat/` | Thẻ nhân vật v2 | chưa có |
| `tuyen/` | Module thiết kế theo tuyến | chưa chuyển |
| `rules/` | Luật viết, khối hiển thị, thoại thân mật, register | chưa chuyển (đang ở `content/01-rules-viet.md`, `01c`) |
| `ke-hoach/` | Khung chương, đầu ra tổng hợp, pipeline | chưa có |
| `ra-soat/` | Sổ rà soát theo khoảng chương | chưa có |
| `de-xuat/` | Đề xuất chưa duyệt | chưa có |
| `kho/` | Nguyên liệu, legacy | chưa chuyển |
| `posts/vercel/` | Chương v2 (web chính) | có |
| `posts/legacy/` | Chương legacy | có |

Các file còn nằm phẳng trong `content/` là trạng thái trước khi chuyển. Bảng ánh xạ: `kien-truc.md` mục 2.

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

1. Chương v2 đã lên trang (`content/posts/vercel/`).
2. Chốt có ngày mới hơn.
3. Chốt cũ hơn.
4. Đề xuất.
5. Bản cũ (chỉ là nguyên liệu).
