---
id: schema.function
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §5]
---
# schema · function

Hàm là **cơ chế** của một nhân vật, viết như hàm có chữ ký. Agent đọc `in`, `when` để biết khi nào gọi; không phải đọc cả cỗ máy. **Vị trí:** `world/characters/<id>/mechanics/fn.<id>.<ten>.md`. **Mã:** `fn.<id>.<ten>`.

## Khuôn

```
fn        fn.thuyen.phong-kin
in        trigger ∈ {K1 sân vô hại, K2 kẻ xứng tầm có dấu khinh, K3 cần lực, K4 cái đau trồi lên}, license?
when      attribute cai-toi-doc ≠ ngu
body      giọng (khối R9, gọi thằng bé là "mày") → bộ dịch → kênh luật chơi → nghi thức tắt
out       câu nói đã dịch + hành động quá đà trong luật
effects   hệ quả viết bằng R8; người bên cạnh bất an mà không rõ vì sao
uses      [[BL-14]], [[BL-29]], [[R8]], [[R9]], [[LAW.swearing.density]]
render    DV-…; luật viết của hàm
```

## Trường

| Trường | Ý | Bắt buộc |
| --- | --- | --- |
| `fn` | mã | có |
| `in` | tham số, điều kiện gọi (kèm tập giá trị) | có |
| `when` | điều kiện thuộc tính để hàm hoạt động (đọc từ `attributes` của nhân vật) | có |
| `body` | các bước, một dòng một bước | có |
| `out` | thứ hàm sinh ra trên trang | có |
| `effects` | hệ quả; thay đổi thuộc tính | có |
| `uses` | import: niềm tin, register, luật, hàm khác | có |
| `render` | cách lên trang: `DV-`, luật viết, trỏ `lib/` | có (ghi `none` nếu không) |

Property đầu file: `id`, `kind: function`, `status`, `updated`, `parent: [[CH.<id>.mechanics]]`.

## Luật

1. **Một hàm một file**; chữ ký của mọi hàm cũng có một dòng ở `CH.<id>.mechanics.md`.
2. Hàm **không có ngày**. Ai gọi nó, ở thời điểm nào là việc của tình tiết (cột `calls`).
3. Hàm không chứa kỹ thuật viết chung (→ `lib/`) và không chứa luật chung (→ `rules/`); chỉ `uses` chúng.
4. `uses` là import: mọi mã trong `uses` phải tồn tại (`LAW.check.resolve`).
