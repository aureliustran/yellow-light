---
id: config.levels
kind: config
status: proposed
updated: 2026-11-08
sources: [tuyen/README.md §3]
---
# levels · Thang mức và vai

Mức đo **độ cần thiết** của một tuyến, node hoặc giao điểm đối với truyện **trong một giai đoạn**. Không đo độ hay của chất liệu.

## Thang

`D < C < B < A < S < SS < SS+ < SSS`

| Mức | Nghĩa | Vai |
| --- | --- | --- |
| `SSS` | Xương sống của cả truyện | `lead` |
| `SS+` | Đồng dẫn: một trong các động cơ chính của giai đoạn | `lead` |
| `SS`, `S` | Node chính, có cung riêng trọn vẹn | `main` |
| `A`, `B` | Có cung riêng hoặc hỗ trợ, dựng bối cảnh | `support` |
| `C`, `D` | Gương nhỏ, tùy chọn | `minor` |

Vai `lead` (cũ: DẪN) đổi tên từ TRỤC để khỏi lẫn với trục AX (Q-046). Giá trị đặc biệt: `pending` (chưa định, ví dụ `POST`), `none` (node không có mặt ở giai đoạn đó).

## Ba luật của thang

1. **Va chạm ở giao điểm theo nhịp, không theo cảnh.** Node chủ của giao điểm giữ register của cảnh. Node mức cao hơn chỉ thắng ở những nhịp nó có tình tiết, và ở những nhịp ấy được đổi register. Cùng mức thì node chủ giữ.
2. **Node con không vượt mức của tuyến cha** trong cùng giai đoạn; mức của tuyến cha bằng mức cao nhất của các node con. (→ `LAW.check.level-parent`)
3. **Mức tính theo giai đoạn.** "Đỉnh" của một node là mức cao nhất qua các giai đoạn.

## Mức quyết định độ nặng quy trình (Q-033)

| Mức của node chủ ở giai đoạn của việc | Quy trình | Phản biện độc lập |
| --- | --- | --- |
| `SSS`, `SS+` | tổng hợp cốt truyện đầy đủ (pattern, tìm kiếm, phương án, phản biện) trước khi viết | bắt buộc |
| `SS`, `S` | đề xuất theo khuôn phương án theo mức can thiệp | bắt buộc nếu đổi nhân quả của nhiều chương |
| `A`, `B` | ghi thẳng vào node, đánh dấu `proposed`, báo tác giả | không |
| `C`, `D` | ghi thẳng vào node | không |

Đường tắt cũ: khoảng chương đã có khung chốt thì bỏ bước 1 đến 2.

## Nơi ghi mức

Mức của từng node theo giai đoạn nằm trong mục `weight` của node (`schemas/node.md`). Ma trận mức tổng là view `_views/matrix.md` (sinh). Cho đến B6, ma trận hiện hành vẫn ở `docs/tuyen/README.md` §4 và là nguồn duy nhất.
