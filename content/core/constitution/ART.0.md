---
id: ART.0
kind: constitution
status: locked
updated: 2026-11-13
axis: none
aliases: [hiến pháp chương 0, chương nền]
sources:
  [
    01-rules-viet.md (Nguyên tắc chung,
    chốt 15/10; Xưng hô; Giọng địa phương; Địa danh và tổ chức),
    01c-rules-thanh-phan.md,
    canon/bible-v2.md §4.2 (chốt 23/10),
    _archive/tuyen/qua-khu/nhi.md §1 (chốt 31/10),
  ]
---

# ART.0 · Chương 0: Nền

Căn cứ cho các luật không sinh từ một trục: hình thức, khối hiển thị, xưng hô, giọng địa phương, ranh dưới 18 tuổi, cấu trúc. **Bản nháp của Claude** từ các chốt nền đã có; tác giả duyệt từng điều.

### ART.0.1 · Hình thức

- **statement:** Giấu hay nói đều phải có mục đích; trước mỗi chỗ giấu hoặc nói, trả lời được _giấu để làm gì_ hoặc _nói để làm gì_.
- **source:** `01-rules-viet.md` Nguyên tắc chung (`locked 15/10`)
- **forbids:** gọi tên cảm xúc hay giải thích động cơ ở phần cần giấu; giấu theo thói quen
- **applies-to:** mọi tình tiết
- **status:** `locked 10/11`

### ART.0.2 · Khối hiển thị

- **statement:** Tài liệu nhân vật nhìn thấy nguyên văn đi bằng khối riêng của nó; in nghiêng chỉ dành cho suy nghĩ.
- **source:** `01c-rules-thanh-phan.md` Nguyên tắc
- **forbids:** viết tin nhắn, email, văn bản thành dòng in nghiêng hay đoạn văn thường
- **applies-to:** `channel = chat` và mọi tài liệu trong chương
- **status:** `locked 10/11`

### ART.0.3 · Xưng hô

- **statement:** Xưng hô theo quan hệ, và người kể gọi nhân vật theo cách nhân vật POV gọi trong đầu, đổi khi người ấy đổi.
- **source:** `01-rules-viet.md` Xưng hô (người kể gọi nhân vật `locked 15/10`)
- **forbids:** người kể đổi cách gọi mà POV chưa đổi
- **applies-to:** mọi tình tiết
- **status:** `locked 10/11`

### ART.0.4 · Giọng địa phương

- **statement:** Giọng Hà Tĩnh của bố mẹ Thuyên giữ nguyên trên trang, kèm phụ đề; Thuyên ở Hà Nội nói giọng chuẩn và chỉ lỡ bật giọng quê khi về nhà hoặc mất kiểm soát.
- **source:** `01-rules-viet.md` Giọng địa phương; khối `[[ht: … || …]]` (`01c`)
- **forbids:** chuẩn hóa giọng của bố mẹ; Thuyên nói giọng quê ở Hà Nội khi không có lý do
- **applies-to:** `FAM.T`, `PAST.T`, cảnh có bố mẹ Thuyên
- **status:** `locked 10/11`

### ART.0.5 · Dưới 18 tuổi

- **statement:** tuổi tính theo ngày sinh và ngày của cảnh (`config/calendar.md`).
- **source:** bible §4.2 (`locked 23/10`); `nhi.md` §1 (`locked 31/10`: ảnh tự làm mẫu ở quá khứ được tả dáng, vóc trong đúng ranh này)
- **forbids:** none
- **applies-to:** mọi tình tiết có người tham gia dưới 18 tuổi ở `date` của tình tiết
- **status:** `locked 10/11`

### ART.0.6 · Tên thật, tên hư cấu

- **statement:** Nơi được tả trung tính hay tích cực dùng tên thật và phải đúng; tổ chức làm điều xấu hay gây tranh cãi dùng tên hư cấu; không dùng tên người thật.
- **source:** `01-rules-viet.md` Địa danh và tổ chức
- **forbids:** tên thật cho tổ chức làm điều xấu; tên người thật; chi tiết sai về nơi có thật
- **applies-to:** mọi tình tiết
- **status:** `locked 10/11`

### ART.0.7 · Người kể và nhân vật POV

- **statement:** Người kể không biết nhiều hơn nhân vật POV; trớ trêu đến từ thứ người đọc đã biết ở chỗ khác (chương trước, POV khác, khung hiện tại).
- **source:** `rules/registers.md` §2.6 luật 9 (R10, `locked 04/11`), nâng lên cho mọi register (tác giả chốt 13/11 thiết kế luật mặc định)
- **forbids:** "anh chưa biết rằng…"; người kể bình hoặc sửa nhân vật POV
- **applies-to:** mọi tình tiết có POV
- **status:** `proposed 13/11` (câu chữ do Claude soạn, chờ tác giả)

### ART.0.8 · Lời thô và cảnh đau

- **statement:** Lời thô, chửi và cảnh đau phục vụ nhân vật; người kể không lấy nỗi đau, thân thể hay nhóm bản thể của ai làm trò cười.
- **source:** `rules/registers.md` §4.1 luật 8; `rules/chui-bay-thiet-ke.md` §1, §3 (chốt hướng 01/11)
- **forbids:** biến cảnh đau thành trò đùa; body shaming từ phía người kể; nhắm vào giới tính, dân tộc, bệnh tật, khuyết tật
- **applies-to:** mọi tình tiết
- **status:** `proposed 13/11` (câu chữ do Claude soạn, chờ tác giả)

### ART.0.9 · Cảnh thân mật

- **statement:** Cảnh thân mật được viết gợi, nhưng chỉ giữa người trưởng thành, đồng thuận rõ ràng, tỉnh táo, và cắt cảnh ở ngưỡng quan hệ.
- **source:** `01-rules-viet.md` Cảnh nóng và fan service, *Giới hạn cứng*; bible §4.2 (`locked 23/10`)
- **forbids:** mô tả hành vi quan hệ tình dục; quấy rối viết thành fan service; cảnh thân mật khi một bên say
- **applies-to:** mọi tình tiết có cảnh thân mật
- **status:** `proposed 13/11` (câu chữ do Claude soạn, chờ tác giả)

