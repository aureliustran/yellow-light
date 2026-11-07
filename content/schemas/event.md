---
id: schema.event
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §8.2]
---
# schema · event

Tình tiết là đơn vị nhỏ nhất của chuyện xảy ra: **dòng nối** (như `order_product`) giữa nhân vật, hàm, bí mật và thời điểm. **Vị trí:** một hàng trong bảng `events` của đúng **một node chủ**. **Mã:** `<node>-<số>`, ví dụ `ROM.TN-014`.

## Cột

| Cột | Ý | Bắt buộc |
| --- | --- | --- |
| `id` | `<node>-<số>` | có |
| `date` | ngày, đúng `config/calendar.md` | có (hoặc `span` cho quãng) |
| `event` | chuyện xảy ra, một-hai câu | có |
| `status` | `config/statuses.md` | có |
| `axis` | trục `AX` (cũ: H) | khi nằm trong dải hiện sinh |
| `level` | nấc, ghi tên thang: `EXL 5`, `STEP.pride 3`. Mặc định `EXL` | khi có |
| `beliefs` | `BL-` mà tình tiết tiêu thụ hoặc sinh ra | khi có |
| `chapter` | chương lên trang (`[[chapter]]`) | khi có |
| `fuel` | nhiên liệu (7 loại, `core/shared-mechanics`) | bắt buộc với node từ mức `S` |
| `cost` | giá phải trả | bắt buộc với node từ mức `S` |
| `register` | chỉ điền khi lệch register mặc định của node | tùy chọn |
| `calls` | hàm được gọi: `[[fn.thuyen.phong-kin]](K1+K2+K4)`, `[[fn.nhi.thich]](nấc 3)` | khi có |
| `x` · `beat` | dịp và thứ tự trong dịp: `[[X-09]]` · `3` | khi thuộc một dịp |
| `changes` | thuộc tính, quan hệ, bí mật đổi giá trị: `cai-toi-doc: ngu→thuc-co-dieu-kien`, `SEC-03: +[[CH.thuyen]]` | khi có |
| `causes` | tình tiết ở node khác mà nó gây ra (nhân quả xuyên node; **không** dùng giao điểm cho việc này) | khi có |

## Dạng một hàng

```
| ROM.TN-0xx | 2024-12-08 | Đề boyfriend: anh lùi | locked | AX1 | EXL 5 | BL-06 | [[ch-xx]] | … | … | | [[fn.thuyen.lui]] | [[X-05]] | 2 | thuyen→nhi: +kid | [[ROM.PN-0yy]] |
```

(Hàng minh họa, mã `0xx` không phải tình tiết thật.)

## Luật

1. Đúng một node chủ. Tình tiết ở node khác chỉ được **trích mã**.
2. Trong ô bảng, wikilink **không dùng bí danh** `[[a|b]]` (dấu `|` vỡ bảng). (`LAW.check.table-pipe`)
3. Dòng `locked` có ngày và `status`; dòng không trạng thái là lỗi.
4. Bảng quá rộng: chia thành hai bảng cùng `id` (cột lõi / cột phụ); `id` là khóa nối.
