---
id: config.statuses
kind: config
status: proposed
updated: 2026-11-08
sources: [README.md "Nhãn", kien-truc.md §5, kien-truc-framework.md §3]
---
# statuses · Trạng thái

Mỗi dòng, mỗi file mang một trạng thái. Trạng thái là mức ổn định: tầng nào dựa vào tầng nào thì không được ổn định hơn nó.

## Giá trị

| Code | Cũ (nhãn trong tài liệu hiện có) | Nghĩa | Độ ổn định |
| --- | --- | --- | --- |
| `page` | (đã đăng) | Đã lên trang trong `content/posts/vercel/` | 6 |
| `locked` | `[chốt dd/mm]`, `[chốt D-xxx dd/mm]` | Tác giả đã quyết | 5 |
| `delegated` | `[chốt · ủy quyền]` | Tác giả giao cho phiên khác chốt trong phạm vi nhất định | 5 |
| `agreed` | `[thống nhất]` | Tác giả đồng ý hướng; chi tiết là đề xuất | 4 |
| `proposed` | `[đề xuất]` | Claude đề xuất, chưa duyệt. Không viết như canon | 3 |
| `draft` | (bản nháp) | Bản nháp chưa đưa vào duyệt | 2 |
| `raw` | `[nguyên liệu: <nguồn>]` | Lấy từ bản cũ, cần xác nhận còn dùng | 1 |
| `superseded` | `[thay bởi D-xxx]` | Đã bị thay; giữ để lần ngược. Trường `by` bắt buộc | 0 |
| `conflict` | `[XUNG ĐỘT Q-xxx]` | Hai nguồn nói khác nhau, chờ tác giả | n/a |
| `needs-decision` | `[[CẦN CHỐT: …]]` | Writer gặp chỗ thiếu canon, đánh dấu trong bản nháp | n/a |

Thêm `assumed` chỉ dùng **trong tài liệu đề xuất** (`proposals/`, `de-xuat/`): đã viết theo khuyến nghị của Claude, tác giả chưa trả lời riêng. Không dùng cho canon.

## Luật trạng thái

1. Dòng không có trạng thái là lỗi. (→ `LAW.check.status`)
2. Một dòng `locked` mà `basis`/`uses` trỏ vào dòng `proposed` hoặc thấp hơn là **cảnh báo** (độ ổn định tầng trên cao hơn tầng nó dựa vào).
3. `superseded` luôn kèm `by` trỏ đến quyết định thay thế; không sửa nội dung cũ.
4. `conflict` và `needs-decision` chặn việc viết lên trang ở phần bị ảnh hưởng.

## Thứ tự ưu tiên khi lệch

1. Chương đã lên trang (`page`).
2. Chốt có ngày mới hơn.
3. Chốt cũ hơn.
4. Đề xuất.
5. Nguyên liệu bản cũ.

## Dạng ghi

- Trong bảng: cột `status`.
- Trong văn xuôi: hậu tố `` `locked 06/11` `` (code + ngày dd/mm).
- Quyết định có sổ: `D-031` (xem `config/ids.md`), sổ `canon/decisions.md`; khi bị thay, thêm dòng `superseded by D-0xx (dd/mm)` ngay dưới, không sửa nội dung cũ.
