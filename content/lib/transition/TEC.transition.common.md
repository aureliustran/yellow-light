---
id: TEC.transition.common
kind: style
grain: move
status: locked
updated: 2026-11-13
aspect: transition
force: bat-buoc
applies-to: "*"
effective: "OPEN → POST"
check: human
sources:
  - "[[rules/registers|rules/registers.md §4.1]]"
---
# TEC.transition.common · Luật chuyển chung

Cách chuyển giữa các register và giữa các cảnh, áp cho mọi register. Cặp chuyển riêng: `rules/registers.md` §4.2. Thuộc [[STY.default]], luôn bật ở mọi register, kể cả R0; chỉ nới bằng `except` kèm lý do.

## steps

1. Đổi nhịp câu trước, đổi nội dung sau.
2. Cầu nối bằng vật.
3. Nốt lạnh cuối cảnh ngọt, nốt ấm cuối cảnh lạnh; ngoại lệ: cảnh R8 ở THR.LAB P2 và BREAK không có nốt ấm.
4. Không quá hai register trong một cảnh; cần thứ ba thì ngắt `---`.
5. Chuyển giữa cảnh dùng `---` cộng mốc giờ.
6. R3 bắt đầu đúng lúc hết tính toán.
7. Giấu manh mối R4 bên trong R1 hoặc R2.

## dials

none

## fails

none

## samples

none
