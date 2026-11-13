---
id: REG.default
kind: style
grain: bundle
status: locked
updated: 2026-11-13
force: mac-dinh
aliases: [R0, "Mặc định", "R0 Mặc định"]
applies-to: "*"
effective: "OPEN → POST"
use-when: "node chủ có mức C hoặc D ở giai đoạn của event"
uses: []
forbids: []
sources:
  - "tác giả 13/11 (có văn phong mặc định cho cả truyện, gắn ràng buộc, cảnh báo writer)"
---
# REG.default · R0 Mặc định

Văn phong mặc định của cả truyện `locked 13/11` (tác giả). Một event rơi về R0 khi không tầng nào (event, node × giai đoạn, node, các node cha, gốc tuyến) khai register.

**Ràng buộc:** chỉ dùng cho tình huống ít ảnh hưởng tới cốt truyện. Ảnh hưởng đo bằng mức của node chủ ở giai đoạn của event (`config/levels.md`). `canon:check` cảnh báo writer khi event rơi về R0 (`LAW.check.default-style`): `C`, `D` chỉ liệt kê; `A`, `B`, `pending` là cảnh báo; `S` trở lên là lỗi. Muốn tránh R0 thì đặt style mặc định cho tuyến hoặc node, không gắn tay từng event.

## markers

- Kể thẳng, trung tính: không mềm, không lạnh, không hài có chủ đích; sắc thái luôn đến từ register của tuyến hay node.
- Nhịp vừa, câu đủ; cho thấy là mặc định.
- Ngoại cảnh có vật cụ thể nhưng không dừng lâu.
- Thoại theo giọng nền của nhân vật (`CH.<id>.voice`).
- Các technique bắt buộc của [[STY.default]] vẫn áp đủ.

## dose

Càng ít càng tốt. Mỗi event dùng R0 ở node mức `A` trở lên là một chỗ thiếu cấu hình.

## transitions

Theo [[TEC.transition.common]].

## samples

none
