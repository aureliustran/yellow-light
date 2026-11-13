---
id: LAW.default
kind: preset
of: laws
status: locked
updated: 2026-11-13
aliases: [luật mặc định]
hard:
  - "[[LAW.disclosure.purpose]]"
  - "[[LAW.display.blocks]]"
  - "[[LAW.address.relation]]"
  - "[[LAW.dialect.ha-tinh]]"
  - "[[LAW.under-18.base]]"
  - "[[LAW.places.real-fiction]]"
  - "[[LAW.harm.pain]]"
  - "[[LAW.intimacy.limits]]"
soft:
  - "[[LAW.naming.emotion]]"
  - "[[LAW.pov.narrator-knowledge]]"
  - "[[LAW.swearing.levels]]"
sources:
  - "tác giả 13/11 (luật: được viết gì, không được viết gì; bộ luật mặc định; giữ tên law)"
---
# LAW.default · Luật mặc định

Bộ luật áp cho **mọi** tình tiết `locked 13/11` (tác giả). Luật trả lời *được viết gì, không được viết gì*; *viết thế nào* là style ([[STY.default]]).

| Phần | Luật | Ghi đè |
| --- | --- | --- |
| **cứng** (`hard`) | luật làm cụ thể một điều hiến pháp không ai bỏ được | không; luật của tuyến, node chỉ cộng thêm |
| **mềm** (`soft`) | luật mặc định an toàn | node hoặc luật hẹp hơn thay bằng `supersedes`, kèm lý do |

Luật cộng dồn: luật mặc định, luật của gốc tuyến, của các node cha, của node chủ (mục `laws`), rồi `override` trên tình tiết kèm lý do. Khác style, rơi về luật mặc định không có cảnh báo: luật mặc định đúng ở mọi chỗ. Đặc tả: [[docs/framework/rules-engine|rules-engine]].

Luật `proposed` trong bộ: những luật có điều hiến pháp đang `proposed` (ART.0.7, 0.8, 0.9), chờ tác giả duyệt câu chữ của điều.
