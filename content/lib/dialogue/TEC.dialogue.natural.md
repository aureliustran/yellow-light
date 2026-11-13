---
id: TEC.dialogue.natural
kind: style
grain: move
status: locked
updated: 2026-11-13
aspect: dialogue
force: bat-buoc
applies-to: "*"
effective: "OPEN → POST"
check: human
sources:
  - "[[01-rules-viet|01-rules-viet.md, Lời thoại]]"
---
# TEC.dialogue.natural · Thoại tự nhiên

Lời thoại viết như người nói thật. Thuộc [[STY.default]], luôn bật ở mọi register, kể cả R0; chỉ nới bằng `except` kèm lý do.

## steps

1. Tự nhiên, có thể lan man, ngắt quãng; có âm đệm (ừm, à, ơ, haha, ơ hay…).
2. Thoại nói viết đầy đủ, không viết tắt ("mày", "tao", "không"); chữ tục theo `LAW.swearing.levels` (trên site viết đủ, trong `:::chat` viết tắt; chốt 01/11, thay luật viết tắt cũ).
3. Viết tắt (t, m, k…) chỉ dùng trong tin nhắn; tin nhắn viết như chat thật, mỗi tin một dòng.
4. Âm đệm, chỗ ngắt và âm thanh trên trang: `01d-rules-thoai-than-mat.md` §1, §2.

## dials

none

## fails

none

## samples

none
