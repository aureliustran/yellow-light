# Đèn vàng – Rules thành phần hiển thị

Oct 8, 2026 · @aureliustran.

Bổ sung cho 01-rules-viet.md. Quy ước khi viết chương mới để trang đọc dựng đúng giao diện. Mỗi loại tài liệu xuất hiện trong truyện có một khối riêng, giống tin nhắn (chat) và bản dịch (tap để đổi).

## Nguyên tắc

Khi trong truyện xuất hiện một tài liệu mà nhân vật nhìn thấy nguyên văn, đừng viết nó thành dòng in nghiêng hay đoạn văn thường. Viết nó thành khối riêng. In nghiêng chỉ dành cho suy nghĩ.

| Tài liệu | Khối | Giao diện |
| --- | --- | --- |
| Tin nhắn | `:::chat` (dòng `^ Tên: câu` để trả lời một tin) | Bong bóng chat |
| Email có nội dung đầy đủ | `:::email` | Hộp thư: chủ đề, Từ/Đến/Cc, thân thư |
| Soạn thảo văn bản (Notepad, Docs, file .md) | `:::editor Tên_file.md` | Cửa sổ editor, số dòng, font mono |
| IDE, terminal, code | `:::ide Tên_file.py` hoặc `:::ide Terminal` | Cửa sổ tối, số dòng, `$` cho lệnh |
| Bảng tính | `:::sheet Tên_file` + bảng Markdown | Bảng có cột A B C, số hàng |
| Ghi chú viết tay, danh sách, biên bản giấy | `:::note Tiêu đề` | Giấy kẻ dòng, chữ viết tay |
| Ghi chú lề (viết bên lề giáo trình) | `:::note ink Tiêu đề` | Giấy kẻ dòng, mực tím |
| Tiếng Anh, giọng Hà Tĩnh | `[[en: gốc \|\| dịch]]`, `[[ht: gốc \|\| dịch]]` | Gạch chân, chạm để đổi |

## Quy ước từng loại

- **Bảng tính:** bảng là bảng. Danh sách việc cần làm, đồ cần mua, biên bản không phải bảng tính: dùng `:::note`. Đầu dòng `[x]` tô xanh (xong), `[~]` tô vàng (chờ), `[!]` tô đỏ (có vấn đề). Ô trống viết `(trống)`. Cột số căn phải bằng `---:`.
- **Ghi chú tay:** mỗi dòng danh sách là một gạch đầu dòng. Tiêu đề bỏ trống thì giấy không có tiêu đề.
- **Email:** các dòng đầu dạng `Từ:`, `Đến:`, `Cc:`, `Chủ đề:`, hết phần đầu bằng một dòng trống. Thân thư viết như văn bản thường. Email chỉ nhắc tới hay trích một câu thì không cần khối.
- **Editor:** mỗi dòng của file là một dòng trong khối. Tên file thêm ` @20` nếu đoạn này bắt đầu ở dòng 20 của file. Dòng tiếng Anh vẫn dùng được `[[en: … || …]]`.
- **IDE và terminal:** dòng lệnh bắt đầu bằng `$ `. Lệnh dài viết đủ như nhân vật gõ (`git commit -m "…"`), không tóm tắt.
- **Bản dịch trong khối:** `[[en: || ]]` và `[[ht: || ]]` dùng bình thường bên trong chat, email, editor, ghi chú. Không dùng chú thích cuối trang cho tiếng Anh hay Hà Tĩnh nữa.

## Quy trình

1. Viết chương như bình thường, đánh dấu tài liệu bằng khối ở trên nếu đã biết.
2. Nếu chương cũ đã viết bằng dòng in nghiêng: thêm mục vào `scripts/apply-blocks.mjs` rồi chạy `npm run blocks`.
3. `npm run translations`, `npm run chats`, sau đó `npm run import -- --overwrite`.
