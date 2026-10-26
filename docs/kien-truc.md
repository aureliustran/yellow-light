# Đèn vàng – Kiến trúc tài liệu và sinh nội dung

Oct 25, 2026 · @aureliustran. **[chốt 25/10]** repo là kho gốc. Phần còn lại là thiết kế đang áp dụng; chỗ nào chưa triển khai có ghi rõ.

## 1. Nguyên tắc

1. **Một nguồn sự thật cho mỗi loại thông tin.** Mọi nơi khác là bản sao hoặc tham chiếu.
2. **Quyết định là đơn vị nhỏ nhất, có mã.** Mỗi chốt có mã `D-xxx` và ngày. Module trích mã, không chép lại nguyên văn.
3. **Tác giả chốt, Claude ghi sổ.** Claude chỉ tạo đề xuất. Chốt chỉ xảy ra khi tác giả nói; ngay trong lượt ấy, Claude ghi sổ, sửa bible và mọi chỗ bị ảnh hưởng.
4. **Trang đã viết là canon cứng.** Rà soát đọc trang và đẩy canon mới ngược về sổ.
5. **Nạp ít mà đúng.** Session mới chỉ cần `README.md`, `canon/bible.md`, `canon/cau-hoi.md`.

Vì sao có các nguyên tắc này: trước 25/10, canon nằm ở hai kho (repo và Project), chốt mới nằm trong module mà không quay về bible, câu hỏi mở không có sổ riêng, skill trỏ vào file legacy. Kết quả là một câu hỏi có ba câu trả lời.

## 2. Cấu trúc thư mục

```
docs/
├── README.md                 cửa vào: bản đồ, nhãn, thứ tự ưu tiên
├── kien-truc.md              file này
├── quy-trinh.md              quy trình tác giả + Claude
├── canon/
│   ├── bible.md              quyết định hiện hành, mỗi dòng có mã D- và ngày
│   ├── so-quyet-dinh.md      nhật ký chốt, chỉ thêm, không sửa nội dung cũ
│   ├── cau-hoi.md            Q-xxx: mở / đã trả lời / xung đột
│   └── lich.md               dòng thời gian 2024–2025
├── nhan-vat/                 một thẻ mỗi người
│   ├── thuyen.md  nhi.md  diep-anh.md  phong.md  vu.md
│   └── hoi-dong.md  khai-morpheus.md  lab.md  hoi-san.md
├── tuyen/                    module thiết kế theo tuyến
│   ├── thuyen-nhi/           brief.md, kho-nhi-thich-thuyen.md, rui-ro.md
│   ├── lab/
│   ├── diep-anh/
│   └── su-kien/              tat-nien-gala.md, …
├── rules/                    01-rules-viet.md, 01c-rules-thanh-phan.md, 01d-rules-thoai-than-mat.md
├── ke-hoach/
│   ├── khung-chuong-gd1.md   bảng chương của giai đoạn
│   ├── tong-hop/<khoảng>/    đầu ra den-vang-plot-synthesis, den-vang-writing-synthesis
│   └── pipeline/<đợt>/       plan, brief, review, log của den-vang-writing-pipeline
├── ra-soat/<khoảng>/         sổ của den-vang-audit
├── de-xuat/                  đề xuất chưa duyệt
└── kho/                      nguyên liệu, legacy
content/
├── v2/                       chương v2
└── import/                   chương legacy
```

**Ánh xạ từ file hiện có (chưa chuyển):**

| Hiện tại | Chuyển về |
| --- | --- |
| `docs/00-quyet-dinh-v2.md` | `canon/so-quyet-dinh.md` (đánh mã D-) |
| `docs/01-mach-truyen-v2.md` + Project `claude/v2/bible-v2.md` | `canon/bible.md` |
| `docs/02-hoi-dong-nhi.md` | `nhan-vat/hoi-dong.md` |
| `docs/03-kho-nhi-thich-thuyen.md` | `tuyen/thuyen-nhi/kho-nhi-thich-thuyen.md` |
| Project `claude/v2/04-rui-ro-tuyen-thuyen-nhi.md` | `tuyen/thuyen-nhi/rui-ro.md` |
| Project `claude/v2/05-gala-va-quan-su-bi-mat.md` | `tuyen/su-kien/tat-nien-gala.md` |
| `docs/brief-tinh-cam-thuyen-nhi.md` | `tuyen/thuyen-nhi/brief.md` |
| `docs/Kho bối cảnh và hoàn cảnh romance cho Đèn vàng v2.md` | `kho/boi-canh-romance.md` |
| `docs/01-rules-viet.md`, `01c-rules-thanh-phan.md`; Project `den-vang/01d-rules-thoai-than-mat.md` | `rules/` |
| `docs/danh-sach-chuong-mo-dau.md` | `ke-hoach/khung-chuong-mo-dau.md` |
| `docs/02-mach-truyen.md`, `11-dan-y-phan-1.md`, `M-*.md`, `brief-giai-doan-2.md`, `handoff.md`, `lich-su-hoi-thoai.md`, … | `kho/legacy/` |
| Project `claude/ban-nhap/*` | đã có ở `content/v2/`; bỏ khỏi Project |

## 3. Repo và Project

| | Repo (gốc) | Project (bản sao) |
| --- | --- | --- |
| Ai ghi | Claude qua máy tác giả hoặc session cloud có repo; tác giả | Chỉ bước đồng bộ, và `claude/inbox/` |
| Chứa | Tất cả | `docs/README.md`, `docs/kien-truc.md`, `docs/quy-trinh.md`, `docs/canon/*`, `docs/nhan-vat/*`, module của giai đoạn đang viết, `content/v2/*` |
| Đường dẫn | `docs/...`, `content/v2/...` | giữ nguyên đường dẫn repo (`docs/canon/bible.md` ở repo là `docs/canon/bible.md` ở Project) |
| Lịch sử | git | không |

**Đồng bộ một chiều, repo → Project:** cuối mỗi session có thay đổi, Claude ghi lại lên Project đúng những file đã đổi, cùng đường dẫn.

**Inbox cho session chỉ có chat:** session không link máy và không có repo thì không ghi canon. Nó ghi `claude/inbox/<yyyy-mm-dd>-<chủ-đề>.md` trên Project (chốt tác giả vừa nói, nguyên văn, kèm ngày). Session có repo kế tiếp gộp inbox vào repo, rồi xóa file inbox.

**Dọn Project (chưa làm):** Project đang 82% dung lượng (1,64 / 2 MB), phần lớn là legacy đã có trong repo. Sau khi chuyển xong, gỡ `den-vang/` legacy, `claude/ban-nhap/`, các plan và rà soát cũ khỏi Project.

## 4. Tầng nội dung

```
          ┌─────────────── tác giả chốt ───────────────┐
          ▼                                            │
┌──────────────────┐  đọc   ┌──────────────────┐  đề xuất
│ T0 CANON         │ ─────▶ │ T1 THIẾT KẾ      │ ─────┘
│ bible · sổ D ·   │        │ module, kho,     │
│ sổ Q · thẻ · lịch│ ◀──┐   │ rủi ro, phương án│
└──────────────────┘    │   └────────┬─────────┘
                        │            ▼
              canon cứng│   ┌──────────────────┐
              từ trang  │   │ T2 KẾ HOẠCH      │
                        │   │ cốt truyện, sắp  │
                        │   │ cảnh, brief viết │
                        │   └────────┬─────────┘
                ┌───────┴──────┐     ▼
                │ T4 RÀ SOÁT   │ ┌──────────────────┐
                │ sổ canon,    │◀│ T3 VĂN BẢN       │
                │ mạch, motif  │ │ nháp → chương    │
                └──────────────┘ └──────────────────┘
```

| Tầng | Thư mục | Ai quyết | Claude làm | Skill |
| --- | --- | --- | --- | --- |
| T0 Canon | `canon/`, `nhan-vat/` | Tác giả | Ghi sổ, hợp nhất, phát hiện xung đột | `den-vang-canon`, `den-vang-characters` |
| T1 Thiết kế | `tuyen/`, `de-xuat/`, `kho/` | Tác giả chọn phương án | Phương án theo mức can thiệp, kho chất liệu | `den-vang-characters`, `den-vang-registers` |
| T2 Kế hoạch | `ke-hoach/` | Tác giả duyệt cốt truyện | Pattern, phương án, sắp cảnh, style sheet, brief | `den-vang-plot-synthesis`, `den-vang-writing-synthesis` |
| T3 Văn bản | `content/v2/`, `ke-hoach/pipeline/` | Tác giả duyệt chương | Writer song song, reviewer độc lập | `den-vang-writing-pipeline` |
| T4 Rà soát | `ra-soat/` | — | Đọc trang, lập sổ, đề xuất D- từ canon cứng | `den-vang-audit` |

**Luật luồng:** tầng dưới không tạo chốt. Writer gặp chỗ thiếu canon thì đánh dấu `[[CẦN CHỐT: …]]`; planner gom thành Q- mới.

## 5. Quy ước mã

**Dòng quyết định** (trong `bible.md` và `so-quyet-dinh.md`):

```
- [chốt D-031 24/10] Phong tỏ tình với Nhi trước màn nhảy mở màn ở gala. (thay D-019)
```

**Dòng trong sổ quyết định:** mỗi D- một mục, không sửa nội dung cũ; khi bị thay, thêm dòng `→ thay bởi D-0xx (dd/mm)` ngay dưới.

```
### D-019 · 20/10 · Phong tỏ tình ở tiệc Nhi đạt aim, rút lại
→ thay bởi D-031 (24/10)
```

**Trích trong module:** `Phong tỏ tình ở gala (D-031).` Khi D-031 bị thay, tìm `D-031` trong `docs/` ra mọi chỗ cần sửa.

**Câu hỏi** (trong `cau-hoi.md`): `Q-xxx`, trạng thái `mở` / `xung đột` / `đã trả lời → D-xxx`. Câu đã trả lời giữ lại, chuyển xuống mục "Đã đóng".

**Đánh mã lần đầu (chưa làm):** khi chuyển file, các chốt hiện có được đánh D-001 trở đi theo thứ tự ngày.

## 6. Danh mục skill

Tên skill viết bằng tiếng Anh (chốt 25/10). Tiền tố `den-vang-` là tên truyện, giữ nguyên.

| Skill | Tên cũ | Việc | Tầng | Trạng thái |
| --- | --- | --- | --- | --- |
| `den-vang-canon` | — | Khởi động session; ghi chốt; hợp nhất nguồn lệch; kiểm chốt không mã, mã bị thay còn bị trích, Q- đã có đáp án; đồng bộ repo → Project; gộp inbox | T0 | **chưa có**, ưu tiên 1 |
| `den-vang-characters` | `den-vang-nhan-vat` | Cấu trúc thẻ, cách tổng hợp thẻ, thẻ → beat. Đọc thẻ từ `docs/nhan-vat/`, không giữ bản chụp | T0–T1 | cần sửa, ưu tiên 1: skill cũ chứa bản chụp thẻ 16/10 theo canon legacy |
| `den-vang-registers` | `den-vang-van-phong` | Bản đồ register và luật chuyển; thêm register rom-com, khuôn cãi E2/E3, hiệp phụ, ngoại khóa | T1–T3 | cần sửa, ưu tiên 2 |
| `den-vang-plot-synthesis` | `den-vang-tong-hop-cot-truyen` | Yêu cầu → pattern → khoảng trống → phương án → phản biện → `cot-truyen.md`; mỗi điểm tác giả duyệt thành một D- | T2 | cần sửa đường dẫn, ưu tiên 2 |
| `den-vang-writing-synthesis` | `den-vang-tong-hop-cach-viet` | Beat → pattern viết → mẫu kỹ thuật → sắp cảnh → style sheet → brief | T2 | cần sửa đường dẫn, ưu tiên 3 |
| `den-vang-writing-pipeline` | `den-vang-pipeline` | Planner, writer song song, reviewer độc lập; chương vào `content/v2/` trên nhánh | T3 | cần sửa, ưu tiên 2 |
| `den-vang-audit` | `den-vang-ra-soat` | Đọc song song một khoảng chương, sáu sổ, đánh giá độc lập, danh sách sửa, D- đề xuất | T4 | cần sửa phạm vi, ưu tiên 3 |
| `crosspost-site` | — | Phát triển đăng chéo (trong repo `.claude/skills/`) | ngoài truyện | giữ |

**Đổi tên skill:** skill tài khoản không đổi tên tại chỗ được. Mỗi skill mới được đề xuất qua thẻ lưu skill; tác giả lưu bản mới rồi xóa bản tên cũ, để không có hai skill cùng việc.

**Kiểm máy (chưa làm):** script `npm run canon:check` trong repo làm phần máy của `den-vang-canon`: quét `[chốt` không có mã, mã bị thay mà còn bị trích, đường dẫn trỏ tới file không còn, thứ trong tuần của mọi ngày trong `canon/lich.md`.

## 7. Git

- Nhánh làm việc: `claude/<chủ-đề>`. Một nhánh một chủ đề (chuyển cấu trúc, chốt một loạt, viết một đợt chương).
- **Merge PR là cách tác giả chốt cả gói.** Chốt lẻ trong chat vẫn được ghi ngay vào nhánh đang mở.
- Session cloud: clone, làm, push nhánh, mở PR.
- Qua máy tác giả: shell trên máy không xóa được file khi chưa được cấp quyền xóa, nên git để lại file khóa. Khi cần commit từ máy, Claude xin quyền xóa cho thư mục repo trước. Không có quyền thì Claude chỉ ghi file, tác giả tự commit.
- Trước khi làm, kiểm `git status` và khoảng cách với `origin/main`; không ghi đè thay đổi chưa commit của tác giả.

## 8. Lộ trình triển khai

| # | Việc | Trạng thái |
| --- | --- | --- |
| 1 | Chọn kho gốc | xong (repo, 25/10) |
| 2 | Ghi kiến trúc, quy trình, sổ câu hỏi | xong (25/10) |
| 3 | Tác giả trả lời xung đột Q-001 đến Q-004 | chờ |
| 4 | Chuyển file theo bảng ánh xạ; đánh mã D-; dựng `bible.md`, `lich.md` | chờ |
| 5 | Viết `den-vang-canon`; sửa `den-vang-characters`; tách thẻ nhân vật v2 | chờ |
| 6 | Dọn Project, đẩy bản sao chọn lọc | chờ |
| 7 | Sửa các skill còn lại khi dùng đến lần đầu | chờ |
