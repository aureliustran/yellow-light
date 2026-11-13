# Đèn vàng – Rules thành phần hiển thị

Oct 8, 2026 · @aureliustran.

Bổ sung cho 01-rules-viet.md. Quy ước khi viết chương mới để trang đọc dựng đúng giao diện. Mỗi loại tài liệu xuất hiện trong truyện có một khối riêng, giống tin nhắn (chat) và bản dịch (tap để đổi).

## Nguyên tắc

Khi trong truyện xuất hiện một tài liệu mà nhân vật nhìn thấy nguyên văn, đừng viết nó thành dòng in nghiêng hay đoạn văn thường. Viết nó thành khối riêng. In nghiêng chỉ dành cho suy nghĩ.

**Chuyển 13/11.** Bảng khối (tài liệu, cú pháp, giao diện) và quy ước từng loại nằm ở kho [[STO.khoi-hien-thi]], mỗi khối một dòng; luật ở [[LAW.display.blocks]].

## Quy trình

1. Viết chương như bình thường, đánh dấu tài liệu bằng khối ở trên nếu đã biết.
2. Nếu chương cũ đã viết bằng dòng in nghiêng: thêm mục vào `scripts/apply-blocks.mjs` rồi chạy `npm run blocks`.
3. `npm run translations`, `npm run chats`, sau đó `npm run import -- --overwrite`.
