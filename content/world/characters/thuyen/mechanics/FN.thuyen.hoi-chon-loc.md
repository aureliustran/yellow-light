---
id: FN.thuyen.hoi-chon-loc
kind: function
status: proposed
updated: 2026-11-13
parent: "[[CH.thuyen.mechanics]]"
type: method
from:
  - "[[V.thuyen-012]]"
aliases: [fn.thuyen.hoi-chon-loc, hỏi có chọn lọc, tự tìm trước]
sources:
  - "tác giả 13/11 (tactics của value tạo ra method; migrate từ gói niềm tin)"
  - "[[world/characters/thuyen/CH.thuyen.beliefs]]"
---
# FN.thuyen.hoi-chon-loc

Cần biết thì tự tìm trước; phần còn lại thì chọn người và soạn trước chuỗi câu hỏi.

```
in        anh cần biết một thứ
when      luôn
body      tự tìm hiểu trước ([[FN.thuyen.nang-khieu]]) → với phần không tự tìm được: bộ lọc chọn người giữ câu trả lời
          → định hình trước chuỗi câu hỏi → hỏi, không ngại bị mắng
out       câu trả lời anh cần
effects   none
uses      B.thuyen-026, B.thuyen-001; [[FN.thuyen.nang-khieu]]
render    none
```

## notes

- Migrate 13/11 từ phần cách đối phó của B.thuyen-026 (`locked 11/11`, tác giả). Bộ lọc không hạn chế việc hỏi.
