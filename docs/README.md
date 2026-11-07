# docs/ – đặc tả app

Chỉ chứa tài liệu về **ứng dụng** (website đọc truyện, admin, đăng chéo, hạ tầng), không chứa nội dung truyện.
Mọi thứ về truyện (canon, nhân vật, tuyến, luật viết, chương) nằm trong [`content/`](../content/README.md).

| File | Nội dung |
| --- | --- |
| `plan-legacy.md` | Các bản của truyện (v1 Legacy, v2), cách hiển thị, bình luận toàn truyện, bàn giao đăng chéo |

## Đường dẫn của file truyện

Khai báo ở một chỗ: `scripts/paths.mjs`. Script và `crosspost/` đều lấy từ đó.

| Thư mục | Là gì |
| --- | --- |
| `content/posts/vercel/` | Bản chính trên web (edition v2). `npm run import` đọc ở đây |
| `content/posts/legacy/` | Edition v1, đọc ở `/legacy` |
| `content/posts/<domain>/` | Mỗi site đăng chéo: bản chuyển `*.txt` và `convert.md` (luật chuyển của site) |
| `crosspost/` | Chỉ còn code: CLI, worker, adapter (`sites/<khóa>/`), `work/` tạm |

Khóa site (`rookies`, `truyennhaong`) là tham số CLI và cột `site` trong Supabase; tên thư mục là tên miền (`rookies.vn`, `truyennhaong.vn`).
