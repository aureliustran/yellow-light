# Đèn vàng – Kiến trúc tài liệu và sinh nội dung

Oct 25, 2026 · @aureliustran. Sửa Oct 26, 2026. **[chốt 25/10]** repo là kho gốc. **[chốt 26/10]** cây tuyến là kiến trúc chính của tầng T1 và là cây quyết định ở cửa vào T2 (Q-030, Q-031 phương án M1: node là canon). Phần còn lại là thiết kế đang áp dụng; chỗ nào chưa triển khai có ghi rõ.

## 1. Nguyên tắc

1. **Một nguồn sự thật cho mỗi loại thông tin.** Mọi nơi khác là bản sao hoặc tham chiếu.
2. **Quyết định là đơn vị nhỏ nhất, có mã.** Mỗi chốt có mã `D-xxx` và ngày. Module trích mã, không chép lại nguyên văn.
3. **Tác giả chốt, Claude ghi sổ.** Claude chỉ tạo đề xuất. Chốt chỉ xảy ra khi tác giả nói; ngay trong lượt ấy, Claude ghi sổ, sửa bible và mọi chỗ bị ảnh hưởng.
4. **Trang đã viết là canon cứng.** Rà soát đọc trang và đẩy canon mới ngược về sổ, về node.
5. **Nạp ít mà đúng.** Session mới đọc `README.md`, `tuyen/goc.md`, `tuyen/README.md`, `canon/cau-hoi.md`, rồi chỉ các node trong phạm vi việc.
6. **Tình tiết có đúng một node chủ.** Tình tiết sống ở node; bible giữ lịch và bảng trạng thái, không giữ tình tiết (bible mỏng).

Vì sao có các nguyên tắc này: trước 25/10, canon nằm ở hai kho (repo và Project), chốt mới nằm trong module mà không quay về bible, câu hỏi mở không có sổ riêng, skill trỏ vào file legacy. Kết quả là một câu hỏi có ba câu trả lời (Q-002: Phong tỏ tình có ba phiên bản ở ba file).

## 2. Cấu trúc thư mục

```
docs/
├── README.md                 cửa vào: bản đồ, nhãn, thứ tự ưu tiên
├── kien-truc.md              file này
├── quy-trinh.md              quy trình tác giả + Claude
├── canon/
│   ├── bible.md              mỏng: trỏ tới gốc, lịch, bảng node và trạng thái, tóm một dòng mỗi tình tiết đã chốt
│   ├── so-quyet-dinh.md      nhật ký chốt, chỉ thêm, không sửa nội dung cũ
│   ├── cau-hoi.md            Q-xxx: mở / đã trả lời / xung đột
│   └── lich.md               dòng thời gian 2024–2025
├── nhan-vat/                 một thẻ mỗi người: ai là ai. Không kể sự kiện, không giữ số chương
│   ├── thuyen.md  nhi.md  diep-anh.md  phong.md  vu.md
│   └── hoi-dong.md  khai-morpheus.md  lab.md  hoi-san.md
├── tuyen/                    cây tuyến: nguồn sự thật cho tình tiết
│   ├── README.md             cây, ma trận mức theo giai đoạn, bảng mã, cây quyết định, dải hiện sinh (sinh tự động)
│   ├── goc.md                gốc: một câu, trục H1–H8, thang Nấc-HS, cung hiện sinh, cơ chế biến chất, luật
│   ├── qua-khu/              README.md (luật QK, bảng NT), thuyen.md nhi.md diep-anh.md khai.md
│   ├── romance/              thuyen-nhi/ (tinh-tiet.md, brief.md, kho-nhi-thich-thuyen.md, rui-ro.md), thuyen-diep-anh.md phong-nhi.md linh-tung.md vu-an-nhien.md
│   ├── thriller/             mo-man.md lab.md model.md lien-minh.md tang-18.md drone.md
│   ├── slice-of-life/        vu.md hoi-san.md hoi-dong-nhi.md doi-thuong.md
│   ├── gia-dinh/             thuyen.md nhi.md
│   └── giao-diem/            x-01-summit.md … x-18-diem-gay.md
├── rules/                    01-rules-viet.md, 01c-rules-thanh-phan.md, 01d-rules-thoai-than-mat.md, registers.md
├── ke-hoach/
│   ├── khung-chuong-gd1.md   bảng chương: chỉ xếp mã tình tiết và giao điểm, không chép nội dung
│   ├── tong-hop/<khoảng>/    pham-vi-tuyen.md (đầu ra cây quyết định), đầu ra plot-synthesis, writing-synthesis
│   └── pipeline/<đợt>/       plan, brief, review, log của den-vang-writing-pipeline
├── ra-soat/<khoảng>/         sổ của den-vang-audit
├── de-xuat/                  đề xuất chưa duyệt
└── kho/                      nguyên liệu, legacy
content/
├── v2/                       chương v2
└── import/                   chương legacy
```

`tuyen/su-kien/` cũ bỏ, thay bằng `tuyen/giao-diem/`.

**Ánh xạ từ file hiện có (chưa chuyển):**

| Hiện tại | Chuyển về |
| --- | --- |
| `docs/00-quyet-dinh-v2.md` | `canon/so-quyet-dinh.md` (đánh mã D-) |
| `docs/01-mach-truyen-v2.md` + `docs/canon/bible-v2.md` | `canon/bible.md` (mỏng); tình tiết tách về node theo bảng dưới |
| bible-v2 §2 (lịch) | `canon/lich.md` |
| bible-v2 §3, M-he-gia-tri §1–2, §8, M-dien-bien-cam-xuc §3, §5 | `tuyen/goc.md` (đã dựng 26/10) |
| bible-v2 §4 (nhân vật) | `nhan-vat/` (lõi, giọng, cử chỉ) và node chủ (sự kiện) |
| bible-v2 §8 (dòng thời gian) | tách thành tình tiết của từng node; bible giữ bảng lịch |
| bible-v2 §9 (Phần 2–4) | ô "hậu sân bay" của TH.DR, GD.N, QK.K trong `tuyen/README.md` |
| `docs/02-hoi-dong-nhi.md` | `tuyen/slice-of-life/hoi-dong-nhi.md` (sự kiện); `nhan-vat/hoi-dong.md` (thẻ) |
| `docs/03-kho-nhi-thich-thuyen.md` | `tuyen/romance/thuyen-nhi/kho-nhi-thich-thuyen.md` |
| `docs/04-rui-ro-tuyen-thuyen-nhi.md` | `tuyen/romance/thuyen-nhi/rui-ro.md` |
| `docs/05-gala-va-quan-su-bi-mat.md` | `tuyen/giao-diem/x-09-tat-nien-gala.md`, `x-06-quan-su-bi-mat.md` |
| `docs/brief-tinh-cam-thuyen-nhi.md` | `tuyen/romance/thuyen-nhi/brief.md` |
| `docs/de-xuat/q-001-thuyen-biet-than-phan-nhi.md` | `tuyen/giao-diem/x-13` khi duyệt xong |
| `docs/danh-sach-chuong-mo-dau.md`, M-he-gia-tri §3, §7, M-cai-nhau-bo-me, M-moi-tinh-vy, `mau-*`, ch.2–6 v2 | `tuyen/qua-khu/thuyen.md` + bảng NT |
| Bảy loại nhiên liệu, nhờn thuốc | `tuyen/goc.md` mục 5; phần thriller (domino) về `tuyen/thriller/` |
| Skill `den-vang-van-phong`, `01-rules-viet.md` mục register | `rules/registers.md` |
| `docs/Kho bối cảnh và hoàn cảnh romance cho Đèn vàng v2.md` | `kho/boi-canh-romance.md` |
| `docs/01-rules-viet.md`, `01c-rules-thanh-phan.md`, `01d-rules-thoai-than-mat.md` | `rules/` |
| `docs/danh-sach-chuong-mo-dau.md` | `ke-hoach/khung-chuong-mo-dau.md` |
| `docs/02-mach-truyen.md`, `11-dan-y-phan-1.md`, `M-*.md`, `plan-giai-doan-2-hop-nhat.md`, `brief-kieu-ngao-tang-dan.md`, `brief-giai-doan-2.md`, `handoff.md`, `lich-su-hoi-thoai.md`, … | `kho/legacy/` + dòng `[nguyên liệu: nguồn]` ở node |
| Project `claude/ban-nhap/*` (bản cũ) | đã có ở `content/v2/`; đã bỏ khỏi Project 29/10 |
| Project `claude/ban-nhap/thu-v4/*`, `thu-v5/*` | `ke-hoach/ban-nhap/thu-v4/`, `thu-v5/` (Project vẫn giữ bản làm việc) |
| Project `claude/sua-doi/M-he-gia-tri-nhi.md`, `M-he-gia-tri-diep-anh.md`, `M-tam-doc.md`, `00-muc-luc.md`; `claude/the-nhan-vat-nhi.md` | `docs/M-he-gia-tri-nhi.md`, `docs/M-he-gia-tri-diep-anh.md`, `docs/M-tam-doc.md`, `docs/sua-doi-muc-luc.md`, `docs/the-nhan-vat-nhi.md` (các M- khác đã có ở `docs/M-*.md`) |
| Project `claude/*` còn lại (plan, brief, ghi chú, rà soát ch.8–38, thiết kế ch.2–6, bản nháp cũ), `den-vang/00-loi-noi-dau.md`, `00b-loi-tac-gia.md` | `kho/legacy/project/` giữ nguyên đường dẫn Project |

## 3. Repo và Project

| | Repo (gốc) | Project (bản sao) |
| --- | --- | --- |
| Ai ghi | Claude qua máy tác giả hoặc session cloud có repo; tác giả | Chỉ bước đồng bộ, và `claude/inbox/` |
| Chứa | Tất cả | `docs/README.md`, `docs/kien-truc.md`, `docs/quy-trinh.md`, `docs/canon/*`, `docs/nhan-vat/*`, `docs/tuyen/*`, module của giai đoạn đang viết, `content/v2/*` |
| Đường dẫn | `docs/...`, `content/v2/...` | giữ nguyên đường dẫn repo |
| Lịch sử | git | không |

**Đồng bộ một chiều, repo → Project:** cuối mỗi session có thay đổi, Claude ghi lại lên Project đúng những file đã đổi, cùng đường dẫn.

**Ngoại lệ ngày 26/10:** phiên kiến trúc không link được máy tác giả nên ghi thẳng lên Project; tác giả sync về repo, không đè lên thay đổi chưa commit. Cả ba phiên (kiến trúc, TH, RM) cùng ghi `canon/cau-hoi.md`: đọc lại ngay trước khi ghi, chỉ thêm dòng.

**Inbox cho session chỉ có chat:** session không link máy và không có repo thì không ghi canon. Nó ghi `claude/inbox/<yyyy-mm-dd>-<chủ-đề>.md` trên Project (chốt tác giả vừa nói, nguyên văn, kèm ngày). Session có repo kế tiếp gộp inbox vào repo, rồi xóa file inbox.

**Dọn Project (làm 29/10):** Project chạm 98% dung lượng (1,97 / 2 MB). Mọi file chỉ có trên Project đã chép về repo (bảng mục 2), rồi gỡ khỏi Project: `den-vang/` legacy (chương cũ có ở `content/import/`), `claude/v2/*` (bản repo ở `docs/`), `claude/ban-nhap/` cũ, plan, brief, ghi chú, rà soát cũ. Project giữ: `docs/README.md`, `kien-truc.md`, `quy-trinh.md`, `docs/canon/*`, `docs/tuyen/*`, `docs/rules/*`, `docs/de-xuat/*`, luật và canon v2 còn nằm phẳng (`docs/01-rules-viet.md`, `01c`, `01d`, `00`–`05`, `brief-tinh-cam-thuyen-nhi.md`), `content/v2/*`, bản nháp đang làm `claude/ban-nhap/thu-v4/`, `thu-v5/`, và `claude/inbox/`. Session chỉ có chat cần file legacy thì xin tác giả mở repo, không đưa lại lên Project.

## 4. Tầng nội dung

```
          ┌─────────────── tác giả chốt ───────────────┐
          ▼                                            │
┌──────────────────┐  đọc   ┌──────────────────┐  đề xuất
│ T0 CANON         │ ─────▶ │ T1 THIẾT KẾ      │ ─────┘
│ bible · sổ D ·   │        │ cây tuyến: gốc,  │
│ sổ Q · thẻ · lịch│ ◀──┐   │ node, giao điểm  │
│ · dòng [chốt]    │    │   └────────┬─────────┘
│   trong node     │    │            ▼
└──────────────────┘    │   ┌──────────────────┐
                        │   │ T2 KẾ HOẠCH      │
              canon cứng│   │ chọn tuyến, cốt  │
              từ trang  │   │ truyện, sắp cảnh,│
                        │   │ brief viết       │
                        │   └────────┬─────────┘
                ┌───────┴──────┐     ▼
                │ T4 RÀ SOÁT   │ ┌──────────────────┐
                │ ghi ngược    │◀│ T3 VĂN BẢN       │
                │ vào node     │ │ nháp → chương    │
                └──────────────┘ └──────────────────┘
```

| Tầng | Thư mục | Ai quyết | Claude làm | Skill |
| --- | --- | --- | --- | --- |
| T0 Canon | `canon/`, `nhan-vat/`, dòng `[chốt]` trong `tuyen/` | Tác giả | Ghi sổ, hợp nhất, phát hiện xung đột | `den-vang-canon`, `den-vang-characters` |
| T1 Thiết kế | `tuyen/` (dòng `[đề xuất]`, khoảng trống), `de-xuat/`, `kho/` | Tác giả chọn phương án | Phương án theo mức can thiệp, kho chất liệu, dựng node | `den-vang-characters`, `den-vang-registers` |
| T2 Kế hoạch | `ke-hoach/` | Tác giả duyệt cốt truyện | Chọn tuyến (cây quyết định), pattern, phương án, sắp cảnh, style sheet, brief | `den-vang-plot-synthesis`, `den-vang-writing-synthesis` |
| T3 Văn bản | `content/v2/`, `ke-hoach/pipeline/` | Tác giả duyệt chương | Writer song song, reviewer độc lập | `den-vang-writing-pipeline` |
| T4 Rà soát | `ra-soat/` | n/a | Đọc trang, lập sổ, ghi ngược vào node, đề xuất D- từ canon cứng | `den-vang-audit` |

**Luật luồng:** tầng dưới không tạo chốt. Writer gặp chỗ thiếu canon thì đánh dấu `[[CẦN CHỐT: …]]`; planner gom thành Q- mới. Trong `tuyen/`, luật tầng đi theo **nhãn**, không theo thư mục: dòng `[chốt dd/mm]` là T0, dòng `[đề xuất]` là T1; dòng không nhãn là lỗi (`canon:check` bắt). Chỉ tác giả tạo `[chốt]`.

## 5. Quy ước mã

**Dòng quyết định** (trong `bible.md`, `so-quyet-dinh.md` và node):

```
- [chốt D-031 24/10] Phong tỏ tình với Nhi trước màn nhảy mở màn ở gala. (thay D-019)
```

**Dòng trong sổ quyết định:** mỗi D- một mục, không sửa nội dung cũ; khi bị thay, thêm dòng `→ thay bởi D-0xx (dd/mm)` ngay dưới.

```
### D-019 · 20/10 · Phong tỏ tình ở tiệc Nhi đạt aim, rút lại
→ thay bởi D-031 (24/10)
```

**Trích trong module:** `Phong tỏ tình ở gala (D-031).` Khi D-031 bị thay, tìm `D-031` trong `docs/` ra mọi chỗ cần sửa.

**Mã của cây tuyến** (chốt 26/10, Q-026):

| Loại | Khuôn | Ví dụ |
| --- | --- | --- |
| Node | `<tuyến>.<node>` | `RM.TN`, `TH.LAB` |
| Tình tiết | `<tiền tố node>-<số>` | `TN-014` |
| Niềm tin | `NT-<số>` | `NT-05` |
| Giao điểm | `X-<số>` | `X-09` |
| Trục hiện sinh | `H<số>` | `H3` |
| Thang nấc | `Nấc-HS`, `Nấc-TT`, `Nấc-RM` | `Nấc-HS 7` |

**Dòng tình tiết khi đã chốt:** `[TN-014 · chốt D-0xx 24/10]`. Đổi tình tiết thì đổi ở node chủ; giao điểm chỉ trích mã nên không phải sửa.

**Câu hỏi** (trong `cau-hoi.md`): `Q-xxx`, trạng thái `mở` / `xung đột` / `đã trả lời → D-xxx`. Câu đã trả lời giữ lại, chuyển xuống mục "Đã đóng".

**Đánh mã lần đầu (chưa làm):** khi chuyển file, các chốt hiện có được đánh D-001 trở đi theo thứ tự ngày. Trước đó ghi `[chốt dd/mm]`.

## 6. Danh mục skill

Tên skill viết bằng tiếng Anh (chốt 25/10). Tiền tố `den-vang-` là tên truyện, giữ nguyên.

| Skill | Tên cũ | Việc | Tầng | Trạng thái |
| --- | --- | --- | --- | --- |
| `den-vang-canon` | n/a | Khởi động session; ghi chốt; hợp nhất nguồn lệch; kiểm chốt không mã, mã bị thay còn bị trích, Q- đã có đáp án, **luật cây** (mỗi tình tiết một chủ; mỗi NT được tiêu thụ hoặc `[chờ tiêu thụ]`; mã X, NT, H được trích đều tồn tại; tình tiết node mức S trở lên có H và Nấc); đồng bộ repo → Project; gộp inbox | T0 | **chưa có**, ưu tiên 1 |
| `den-vang-characters` | `den-vang-nhan-vat` | Cấu trúc thẻ (thêm `Gốc`, `NT`, `Node chủ`, `Cần → H`), cách tổng hợp thẻ, thẻ → beat. Đọc thẻ từ `docs/nhan-vat/`, không giữ bản chụp | T0–T1 | cần sửa, ưu tiên 1: skill cũ chứa bản chụp thẻ 16/10 theo canon legacy |
| `den-vang-registers` | `den-vang-van-phong` | Bản đồ register và luật chuyển; thêm register rom-com, khuôn cãi E2/E3, hiệp phụ, ngoại khóa; đọc `rules/registers.md` | T1–T3 | cần sửa, ưu tiên 2 |
| `den-vang-plot-synthesis` | `den-vang-tong-hop-cot-truyen` | **Bước chọn tuyến** (lối vào A) trước Bước 0; yêu cầu → pattern → khoảng trống → phương án → phản biện → `cot-truyen.md`; mỗi điểm tác giả duyệt thành một D- | T2 | cần sửa, ưu tiên 2 |
| `den-vang-writing-synthesis` | `den-vang-tong-hop-cach-viet` | Beat → pattern viết → mẫu kỹ thuật → sắp cảnh → style sheet → brief | T2 | cần sửa đường dẫn, ưu tiên 3 |
| `den-vang-writing-pipeline` | `den-vang-pipeline` | Bước 0 kéo theo `pham-vi-tuyen.md`; planner, writer song song, reviewer độc lập; chương vào `content/v2/` trên nhánh | T3 | cần sửa, ưu tiên 2 |
| `den-vang-audit` | `den-vang-ra-soat` | Đọc song song một khoảng chương, sáu sổ, đánh giá độc lập, **ghi ngược vào node** (sổ canon vào node chủ, quỹ đạo nhân vật vào dải hiện sinh, manh mối vào giao điểm), danh sách sửa, D- đề xuất | T4 | cần sửa phạm vi, ưu tiên 3 |
| `crosspost-site` | n/a | Phát triển đăng chéo (trong repo `.claude/skills/`) | ngoài truyện | giữ |

**Đổi tên skill:** skill tài khoản không đổi tên tại chỗ được. Mỗi skill mới được đề xuất qua thẻ lưu skill; tác giả lưu bản mới rồi xóa bản tên cũ, để không có hai skill cùng việc.

**Kiểm máy (chưa làm):** script `npm run canon:check` trong repo làm phần máy của `den-vang-canon`: quét `[chốt` không có mã, mã bị thay mà còn bị trích, đường dẫn trỏ tới file không còn, thứ trong tuần của mọi ngày trong `canon/lich.md`, **các luật cây ở hàng `den-vang-canon`**, **sinh lại dải hiện sinh và báo chỗ nấc lùi**. Script `npm run budget` chờ Q-034 đến Q-036.

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
| 2b | Chọn cây tuyến làm kiến trúc chính; dựng `tuyen/goc.md`, `tuyen/README.md`, `tuyen/qua-khu/README.md`; sửa ba file nền | xong (26/10, trên Project) |
| 3 | Tác giả trả lời xung đột Q-001 đến Q-004 | Q-001 định hướng xong; Q-002 đến Q-004 chờ |
| 4 | Chuyển file theo bảng ánh xạ; đánh mã D-; dựng `bible.md` (mỏng), `lich.md`, `nhan-vat/` | chờ |
| 4b | Dựng node: QK, SL, GD (kiến trúc); RM (session RM); TH (session TH); giao điểm theo node chủ | chờ |
| 5 | Viết `den-vang-canon`; sửa `den-vang-characters`; tách thẻ nhân vật v2 | chờ |
| 6 | Dọn Project, đẩy bản sao chọn lọc | chờ |
| 7 | Sửa các skill còn lại khi dùng đến lần đầu | chờ |
