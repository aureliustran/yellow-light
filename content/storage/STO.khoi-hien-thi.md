---
id: STO.khoi-hien-thi
kind: store
status: locked
updated: 2026-11-13
columns: [tai-lieu, khoi, giao-dien, quy-uoc]
key: khoi
aliases: [bảng khối hiển thị]
sources:
  - "[[01c-rules-thanh-phan|01c-rules-thanh-phan.md (8/10)]]; chuyển 13/11"
---
# STO.khoi-hien-thi · Khối hiển thị

Kho cú pháp khối để trang đọc dựng đúng giao diện. Mỗi khối một dòng; luật ở [[LAW.display.blocks]] (tài liệu nguyên văn đi bằng khối, in nghiêng chỉ cho suy nghĩ). Quy trình áp khối cho chương cũ (`scripts/apply-blocks.mjs`, `npm run blocks`, `translations`, `chats`, `import`) vẫn ở `01c-rules-thanh-phan.md` *Quy trình*.

## entries

| tai-lieu | khoi | giao-dien | quy-uoc |
| --- | --- | --- | --- |
| Tin nhắn | `:::chat` (dòng `^ Tên: câu` để trả lời một tin) | Bong bóng chat | Emoji, tách tin: `01d-rules-thoai-than-mat.md` §5 |
| Email có nội dung đầy đủ | `:::email` | Hộp thư: chủ đề, Từ/Đến/Cc, thân thư | Các dòng đầu `Từ:`, `Đến:`, `Cc:`, `Chủ đề:`, hết phần đầu bằng một dòng trống; thân thư viết như văn bản thường. Email chỉ nhắc tới hay trích một câu thì không cần khối |
| Soạn thảo văn bản (Notepad, Docs, file .md) | `:::editor Tên_file.md` | Cửa sổ editor, số dòng, font mono | Mỗi dòng của file là một dòng trong khối; thêm ` @20` sau tên file nếu đoạn bắt đầu ở dòng 20 |
| IDE, terminal, code | `:::ide Tên_file.py` hoặc `:::ide Terminal` | Cửa sổ tối, số dòng, `$` cho lệnh | Dòng lệnh bắt đầu bằng `$ `; lệnh dài viết đủ như nhân vật gõ, không tóm tắt |
| Bảng tính | `:::sheet Tên_file` + bảng Markdown | Bảng có cột A B C, số hàng | Bảng là bảng: danh sách việc, đồ cần mua, biên bản dùng `:::note`. `[x]` xanh (xong), `[~]` vàng (chờ), `[!]` đỏ (có vấn đề); ô trống `(trống)`; cột số căn phải `---:` |
| Ghi chú viết tay, danh sách, biên bản giấy | `:::note Tiêu đề` | Giấy kẻ dòng, chữ viết tay | Mỗi dòng danh sách là một gạch đầu dòng; tiêu đề bỏ trống thì giấy không có tiêu đề |
| Ghi chú lề (bên lề giáo trình) | `:::note ink Tiêu đề` | Giấy kẻ dòng, mực tím | Như `:::note` |
| Tiếng Anh | `[[en: gốc \|\| dịch]]` | Gạch chân, chạm để đổi | Dùng được bên trong mọi khối; không dùng chú thích cuối trang |
| Giọng Hà Tĩnh | `[[ht: gốc \|\| dịch]]` | Gạch chân, chạm để đổi | Chữ lấy theo [[STO.ha-tinh]]; dùng được bên trong mọi khối |
