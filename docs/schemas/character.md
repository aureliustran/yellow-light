---
id: schema.character
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §5]
---
# schema · character

Nhân vật là thực thể **tĩnh** (bảng chiều). Giá trị theo thời điểm nằm ở node (`storylines/`), không ở đây.

**Vị trí:** `world/characters/<id>/` (gói nhiều file). **Mã:** `CH.<id>`. **Nhân vật quần chúng** là một hàng trong `world/groups/<nhóm>.md`, không có gói.

## Gói

```
world/characters/<id>/
├── CH.<id>.md                 file chính
├── CH.<id>.beliefs.md         BL-: schemas/belief.md
├── CH.<id>.voice.md           giọng nền
└── mechanics/
    ├── CH.<id>.mechanics.md   chữ ký mọi hàm, mỗi hàm một dòng
    └── fn.<id>.<ten>.md       một hàm một file (schemas/function.md)
```

View sinh: `_views/CH.<id>.view.md` (mặt cắt theo giai đoạn).

## File chính `CH.<id>.md`

Property bắt buộc: `id`, `kind: character`, `status`, `updated`, `aliases`, `exports`.

Mục (mục trống ghi `none`, không bỏ):

| Mục | Nội dung |
| --- | --- |
| `identity` | Là ai, ở đâu, lúc nào: sinh, quê, nghề, ngoại hình, thân thể. **Trực tiếp định nghĩa nhân vật.** |
| `purpose` | Vì sao nhân vật có trong truyện; phục vụ trục AX nào (`Cần → AX`) |
| `rules` | Quy tắc của nhân vật: điều nhân vật không bao giờ làm, ranh cứng. Chỉ trỏ luật ở `rules/` khi nó áp cho nhiều người |
| `attributes` | Thuộc tính động, mỗi thuộc tính một tập giá trị. Ví dụ `cai-toi-doc ∈ {ngu, thuc-co-dieu-kien, phong-kin-hong, chiem-cho}`. Chỉ khai **tên và tập giá trị**; giá trị theo giai đoạn do node làm chủ |
| `exports` | Mã mà file khác được import: hàm, niềm tin, thuộc tính |

## Khuôn phần đầu (20 dòng)

Mọi file trong gói mở bằng: property · một câu tóm tắt · mục lục khóa. Agent đọc 20 dòng đầu là biết có đọc tiếp hay không.

## Luật

1. Định danh nằm ở file chính; không lặp ở file khác trong gói.
2. Mỗi thuộc tính động có **đúng một node chủ** (`LAW.check.owner`); node chủ ghi ở property `owner` của thuộc tính.
3. Hai nhân vật bất kỳ có **cùng** tên file, cùng thứ tự mục. Đó là mục đích của khuôn.
4. Không chứa sự kiện theo ngày. Sự kiện về node chủ.
