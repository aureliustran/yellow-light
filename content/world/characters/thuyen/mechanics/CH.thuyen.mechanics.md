---
id: CH.thuyen.mechanics
kind: character
status: agreed
updated: 2026-11-10
aliases: [co-may-thuyen, cỗ máy hiện sinh]
exports: []
parent: "[[CH.thuyen]]"
sources: [tuyen/qua-khu/thuyen-co-may.md §2 (locked 28/10), de-xuat/kien-truc-framework.md §13.1]
---
# CH.thuyen.mechanics · Cỗ máy hiện sinh của Thuyên

Sơ đồ và chữ ký mọi hàm, mỗi hàm một dòng. Thân từng hàm ở `FN.thuyen.<tên>.md` (B3b; id ghi dạng code cho tới khi file có).

## Sơ đồ `locked 28/10`

```
 ĐẦU VÀO            BỘ CHUYỂN ĐỔI            ĐỘNG CƠ
 thiếu: không ai ──► phương trình  ──► áp suất chênh lệch (0 → công nhận thật)
 nói "con đã cố"     giỏi = được thương     ├─ cái tôi lành: cái cân, cố vì mình
 + "nhà mi sướng"    thiếu = chưa đủ giỏi   └─ cái tôi độc: tiền mua tình thương
                            │   ĐỘNG CƠ ĐẨY: ghét thằng bé cột điện → không bao giờ yếu nữa
                            ▼               NHIÊN LIỆU: công nhận → thuốc giảm đau → nhờn
 BỘ PHẬN BỊ KHÓA: cái gối (khóa 1 phủ nhận · khóa 2 cảm biến · khóa 3 sợ lòng tốt)
 VAN XẢ: tếu · TÊN LỬA → KHÍ THẢI → RĂN · ĐIỂM GÃY: định giá bằng 0 · SỬA: cái tôi lành dẫn, để người khác ôm
```

Bản đầy đủ: `tuyen/qua-khu/thuyen-co-may.md` §2 (nguồn cho tới khi B3b chuyển xong).

**Vòng tự nuôi:** thiếu → phương trình → giỏi lên → được khen mà không được ôm → nhu cầu còn → cần được ôm thành bằng chứng mình chưa đủ giỏi → phủ nhận → giấu con người thật → phần bị giấu không ai thương được → thiếu sâu thêm.

**Ranh giới hai cái tôi** nằm ở quan hệ với cái gối: cái tôi lành ôm gối mà không cần cãi; cái tôi độc phải cãi.

## Chữ ký

| Hàm | Một dòng | Nguồn |
| --- | --- | --- |
| `FN.thuyen.thieu` | cái thiếu bị chối hai lần; thước di động | `co-may` §3 |
| `FN.thuyen.phuong-trinh` | giỏi = được thương; hệ giá trị bốn tầng, tiên đề, điểm mù | `M-he-gia-tri` §1–2, §4 |
| `FN.thuyen.lang-kinh` | lăng kính sáng đều, đổi hướng quay; tên lửa, khí thải, răn | `thuyen-lang-kinh` §1, §3; `M-he-gia-tri` §3a |
| `FN.thuyen.cai-toi` | cái tôi lành, cái tôi độc, cái cân | `thuyen-hai-cai-toi` §2 |
| `FN.thuyen.phong-kin` | phòng kín: ba lớp, bốn cò K1–K4, cổng ra, giọng, giáo lý kẻ mạnh | `thuyen-cai-toi-doc-co-che` §4.1–4.4, §4.6, §6 |
| `FN.thuyen.teu` | van xả: Ngạo, Trào, Song | `thuyen-da-nhan-cach` §3–5, §8 |
| `FN.thuyen.nhien-lieu` | công nhận là thuốc giảm đau; nhờn; tăng liều | `thuyen-hai-cai-toi` §7 |
| `FN.thuyen.cai-goi` | bộ phận bị khóa, ba khóa | `co-may` §2; `thuyen.md` §6.3 |
| `FN.thuyen.adhd` | hệ thần kinh chạy bằng hứng thú; dạng kết hợp theo tuổi; luật viết | `thuyen-adhd` §4, §5, §5b |
| `FN.thuyen.nang-khieu` | nhìn ra lõi, học bằng liên kết | `thuyen-hai-cai-toi` §15 |
| `FN.thuyen.luoi-co-chon-loc` | lười có chọn lọc, chăm có mục đích | `M-he-gia-tri` §3b; `01-rules-viet` |
| `FN.thuyen.quan-su` | giỏi việc người, mù việc mình | BL-015 (NT-15); `tuyen/sl/vu.md` §2 |

Thiết bị trên trang (TB-1 … TB-16, nay `DV-001` … `DV-016`) vào mục `render` của hàm dùng nó (B3b).

## Theo nấc

Cỗ máy chạy khác nhau theo nấc `SCALE.exl` (1–9, HP). Giá trị theo giai đoạn là của `SELF.thuyen` (B3c); bảng nguồn: `thuyen-co-may.md` §4 `locked 28/10`.
