---
id: STY.default
kind: preset
of: style
status: locked
updated: 2026-11-13
aliases: [style mặc định]
register: "[[REG.default]]"
pattern: none
required:
  - "[[TEC.lexicon.compound]]"
  - "[[TEC.dialogue.natural]]"
  - "[[TEC.pace.present]]"
  - "[[TEC.transition.common]]"
defaults:
  - "[[TEC.show.default]]"
  - "[[TEC.setting.concrete]]"
  - "[[TEC.interiority.purposeful-drift]]"
  - "[[TEC.prose.human]]"
  - "[[TEC.pace.flashback]]"
  - "[[TEC.expertise.layman]]"
sources:
  - "tác giả 13/11 (gộp register, technique, pattern thành style; style mặc định; fallback theo tuyến và node)"
---
# STY.default · Style mặc định

Tầng trên cùng của style `locked 13/11` (tác giả). Style của tuyến và node **kế thừa** bộ này và chỉ ghi đè phần mềm; event kế thừa style của node chủ.

| Phần | Gồm | Ghi đè |
| --- | --- | --- |
| **cứng** (`required`) | technique `force: bat-buoc` | không; chỉ nới bằng `except` kèm lý do |
| **mềm** | register R0, pattern (none), technique `force: mac-dinh` (`defaults`) | tuyến, node, event khai cái khác là thay; register cấm một technique mặc định bằng `forbids` |

Đặc tả: [[docs/framework/library|library]].
