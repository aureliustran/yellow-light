---
id: schema.law
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §7]
---
# schema · law

Luật là **thực thể riêng**, không phải một khối. Một luật áp cho một vài thành tố; một thành tố chịu một vài luật. **Vị trí:** `rules/<aspect>/LAW.<aspect>.<scope>.md` (và `rules/check/` cho luật cấu trúc). **Mã:** `LAW.<khía cạnh>.<phạm vi>`.

## Khuôn

```
id          LAW.naming.pov-thuyen
aspect      naming (gọi tên cảm xúc trong lời kể)
basis       [[ART-AX7.1]] hoặc [[ART-0.2]]
effective   OPEN → AFTER
applies-to  pov = CH.thuyen · channel = narration
except      PAST.T × span-1 → [[LAW.naming.past-t-span1]] · phần cần giấu → [[LAW.conceal]]
supersedes  [[LAW.naming.legacy]]
content     (điều khoản, tiếng Việt)
technique   → [[lib/style/…]]
check       human | machine
severity    error | warn | info
```

## Trường

| Trường | Ý |
| --- | --- |
| `aspect` | **Một** khía cạnh |
| `basis` | Điều hiến pháp làm căn cứ (bắt buộc) |
| `effective` | Giai đoạn hiệu lực: một giai đoạn hoặc `P1 → P2`. Luật giai đoạn hết hiệu lực khi sang giai đoạn sau, trừ khi ghi kéo dài |
| `applies-to` | Bộ chọn |
| `except` | Ngoại lệ: bộ chọn → luật cụ thể hơn |
| `supersedes` | Luật bị thay (thay thế lời "file này thay dòng … của …") |
| `content` | Điều khoản |
| `technique` | Trỏ `lib/`; luật **không chứa** kỹ thuật |
| `check` | `machine` thì `canon:check` chạy được |
| `severity` | mức báo |

## Bộ chọn (`applies-to`, `except`)

Theo `kind`, `id`, tuyến, giai đoạn, `pov`, `channel` (`dialogue`, `narration`, `chat`), `register`, người có mặt, thuộc tính. Ví dụ `LAW.under-18`: áp mọi tình tiết có người dưới 18 tuổi, tính từ `identity` trong `world/` và `config/calendar`.

## Ranh giới

1. Một luật, một khía cạnh.
2. Cùng khía cạnh, phạm vi chồng nhau thì phải có `except`, `supersedes`, hoặc luật cụ thể hơn. Chồng mà không có là lỗi (`LAW.check.overlap`).
3. Luật không chứa kỹ thuật; trỏ sang `lib/`.
4. Luật không chứa sự thật của truyện; đọc thuộc tính ở `world/`.
5. Mọi luật có `basis` (`LAW.check.basis`).

## Thứ bậc

`ART` (hiến pháp) → `LAW` (luật giai đoạn) → decree (mục `rules` của node/giao điểm) → override (tình tiết, kèm lý do). Tầng dưới không trái tầng trên.

Phần nối luật ↔ thành tố nằm **trong file luật** (luật làm chủ phạm vi của mình). Mỗi thành tố thấy luật của mình qua `_views/rules-for/<id>.md` và backlinks.
