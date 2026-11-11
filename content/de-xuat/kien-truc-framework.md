# Đèn vàng – Framework: docs và content như một codebase

Nov 6, 2026 · @aureliustran. **Bản 3** (06/11), cập nhật 10/11: phần đặc tả (§0–§12, §15) đã chuyển sang spec tiếng Anh ở `docs/framework/`; file này là **đề xuất chuyển đổi**: kế hoạch gộp (§13), thứ tự làm (§14), câu hỏi còn mở (§16).

**Trạng thái trong file này** (theo bộ từ vựng §3): `locked` tác giả đã quyết · `agreed` tác giả đồng ý hướng, chi tiết là đề xuất · `proposed` Claude đề xuất · `assumed` theo khuyến nghị của Claude, tác giả chưa trả lời riêng.

---

## 0–12. Đặc tả: đã chuyển sang spec

Bản đầy đủ của các mục dưới đây (tới commit `b71685c`) nằm trong lịch sử git. Nguồn hiện hành là spec tiếng Anh:

| Mục cũ | Nay ở |
| --- | --- |
| §0 Tóm tắt · §2 Ánh xạ khái niệm | [`docs/framework/README.md`](../../docs/framework/README.md) |
| §1 Vì sao cần | [`docs/framework/adr/ADR-001-story-framework.md`](../../docs/framework/adr/ADR-001-story-framework.md) |
| §3 Bộ từ vựng, tiền tố mã | [`docs/framework/ids.md`](../../docs/framework/ids.md), [`model.md`](../../docs/framework/model.md); bảng mã cũ → mới: `content/config/ids.md` |
| §4 Cây thư mục | [`docs/framework/layout.md`](../../docs/framework/layout.md) |
| §5 Gói nhân vật | [`model.md`](../../docs/framework/model.md), `content/schemas/character.md`, `function.md` |
| §6 Hiến pháp · §7 Luật | [`rules-engine.md`](../../docs/framework/rules-engine.md), `content/schemas/article.md`, `law.md` |
| §7b Thư viện | [`library.md`](../../docs/framework/library.md), `content/schemas/register.md`, `technique.md`, `pattern.md` |
| §8.1–8.3 Node, tình tiết, giao điểm | [`storylines.md`](../../docs/framework/storylines.md), `content/schemas/node.md`, `goal.md`, `event.md`, `intersection.md` |
| §8.4 Bản vẽ chương | [`blueprints.md`](../../docs/framework/blueprints.md), `content/schemas/blueprint.md`, `edition.md`, `chapter.md` |
| §9 Obsidian · §10 Trang đồ thị · §11 View · §12 `canon:check` | [`tooling.md`](../../docs/framework/tooling.md), [`layout.md`](../../docs/framework/layout.md#obsidian-vault) |

File này giờ chỉ giữ phần **chuyển đổi**: kế hoạch gộp (§13), thứ tự làm (§14), câu hỏi còn mở (§16).

## 13. Kế hoạch gộp và phân bổ lại

Đổi chỗ, cắt theo khuôn, đổi mã sang bộ mới; nội dung đổi đi qua chốt như thường. Mỗi khối một nhánh, một PR.

### 13.1 Gói Thuyên

**Nguồn:** `M-he-gia-tri.md`, `_archive/tuyen/qua-khu/thuyen-co-may.md`, `thuyen-hai-cai-toi.md`, `thuyen-da-nhan-cach.md`, `thuyen-lang-kinh.md`, Project `thuyen-adhd.md`, Project `thuyen-cai-toi-doc-co-che.md`, mốc trong `qua-khu/thuyen.md`, phần Thuyên trong `01-rules-viet.md`.

**Tĩnh** (`world/characters/thuyen/`), cắt theo bộ phận của sơ đồ cỗ máy (`thuyen-co-may.md` §2):

| Đích | Lấy từ |
| --- | --- |
| `CH.thuyen.md` · identity | mốc, sinh, 1m83, ADHD dạng kết hợp (`thuyen.md`; `thuyen-adhd.md` chốt 01/11) |
| · purpose | bible-v2 §3 |
| · rules | bible-v2 §4.1 (chốt), `M-he-gia-tri` §5 |
| · attributes | cai-toi-doc, EXL, … |
| `CH.thuyen.mechanics.md` | sơ đồ, vòng tự nuôi (`co-may` §2) |
| `fn.thuyen.thieu` | cái thiếu, thước di động (`co-may` §3) |
| `fn.thuyen.phuong-trinh` | giỏi = được thương; hệ giá trị bốn tầng, tiên đề, điểm mù (`M-he-gia-tri` §1–2, §4) |
| `fn.thuyen.lang-kinh` | cơ chế; tên lửa, khí thải, răn (`lang-kinh` §1, §3; `M-he-gia-tri` §3a) |
| `fn.thuyen.cai-toi` | lành, độc, cái cân (`hai-cai-toi` §2) |
| `fn.thuyen.phong-kin` | ba lớp, bốn cò, cổng ra, giọng, giáo lý kẻ mạnh (`cai-toi-doc-co-che` §4.1–4.4, §4.6, §6) |
| `fn.thuyen.teu` | Ngạo, Trào, Song, van xả (`da-nhan-cach` §3–5, §8) |
| `fn.thuyen.nhien-lieu` | công nhận, thuốc giảm đau, nhờn (`hai-cai-toi` §7) |
| `fn.thuyen.cai-goi` | bộ phận bị khóa, ba khóa (`co-may` §2; `thuyen.md` §6.3) |
| `fn.thuyen.adhd` | hệ thần kinh chạy bằng hứng thú, dạng kết hợp theo tuổi, luật viết (`thuyen-adhd` §4, §5, §5b) |
| `fn.thuyen.nang-khieu` | nhìn ra lõi, học bằng liên kết (`hai-cai-toi` §15) |
| `fn.thuyen.luoi-co-chon-loc` | `M-he-gia-tri` §3b; `01-rules-viet` |
| `fn.thuyen.quan-su` | giỏi việc người, mù việc mình (BL-15; `sl/vu.md` §2) |
| `CH.thuyen.beliefs.md` | BL-01 … BL-31 và BL mới (`qua-khu/README` §4; `thuyen.md` §4, §6; `hai-cai-toi` §11; `da-nhan-cach` §7) |
| `CH.thuyen.voice.md` | giọng nền, tự thoại hiện sinh, lời kể biểu cảm (`01-rules-viet`); DV- vào `render` của hàm |

**Động:**

| Đích | Lấy từ |
| --- | --- |
| `storylines/SELF/SELF.thuyen/SELF.thuyen.md` | `co-may` §4; `cai-toi-doc-co-che` §4.5 (năm bước hỏng ở P2); `lang-kinh` §4; `M-he-gia-tri` §8 |
| `storylines/PAST/PAST.T/PAST.T.md` | bảng neo `thuyen.md` §0–3, §5; `M-he-gia-tri` §3; `hai-cai-toi` §3–6, §8–9, §14; `da-nhan-cach` §6; `lang-kinh` §2; `co-may` §6; `thuyen-adhd` §1, §6 |
| `storylines/FAM/FAM.T/FAM.T.md` | `M-cai-nhau-bo-me.md`; `M-he-gia-tri` §7; `thuyen.md` §6.9 |
| mục `voice` của ROM.TN, SOL.VU, THR.LAB | giọng theo người, theo nơi |

**Ra khỏi canon:** tư liệu, hình mẫu → `assets/research/thuyen/`; việc treo → `canon/questions.md`, `proposals/`; kỹ thuật cảnh thể thao → `lib/style/`; kho chửi → `rules/swearing/`; plan tái hiện → `plans/`.

### 13.2 Gói Nhi

| Đích | Lấy từ |
| --- | --- |
| `CH.nhi.md` | `qua-khu/nhi.md` §0, §1.1–1.2, §1.5–1.6, §1.9; bible-v2 §4.2 |
| `fn.nhi.thich` | ba gu, chín nấc, luật cảm xúc (`03-kho` §0–1) |
| `fn.nhi.phan-khang` | `brief-tinh-cam` §3 |
| `CH.nhi.beliefs.md` | `qua-khu/nhi.md` §3 |
| `PAST.N.md` | bảng neo §2, PAST.N.HD §4, mai mối §1.7 |
| `world/secrets/` | kênh K17, thân phận (Q-001) |
| `plans/` | plan interlude Nhi §8 |

### 13.3 Nhân vật khác

| Nhân vật | Tĩnh | Động |
| --- | --- | --- |
| Vũ | `sl/vu.md` §1 → `CH.vu.md` | §3 → `SOL.VU.md` |
| Diệp Anh, Phong, Khải, Morpheus | bible-v2 §4.3–4.4, §4.7; `00` §2; `01-mach-truyen-v2` §2 | ROM.TD, ROM.PN, THR.* |
| Hội đồng Nhi | `02-hoi-dong-nhi` §0, §2–4 → `SOL.HD` (`world/groups/` bỏ 11/11) | §5 → `SOL.HD.md`; §1 → `PAST.N.md` |
| Lab, hội sân | bible-v2 §4.8 → node `members` (`world/groups/` bỏ 11/11) | THR.LAB, SOL.SAN |
| Bối cảnh | bible-v2 §5, §7 → `world/settings/` | |

### 13.4 Node và giao điểm

| Đích | Lấy từ |
| --- | --- |
| `ROM.TN.md` | `brief-tinh-cam-thuyen-nhi` (tình tiết → ROM.TN-…; §5d → voice; §5e → relation); `03-kho` §2 (A–H, E2, E3 → khuôn của node); `thuyen-nhi.md` §1–2, §4–5 |
| `claude/drafts/rom-tn/` | cảnh mẫu `thuyen-nhi.md` §3, §3b |
| `X-09.md`, `X-06.md` | Project `05-gala-va-quan-su-bi-mat.md` |
| `X-13.md`, `lib/patterns/`, `world/secrets/` | `de-xuat/q-001-…` |
| `intersections/*` còn lại | `_archive/tuyen/README.md` §8; X-12 → cột `causes` |
| `proposals/_merged/` | Project `04-rui-ro-tuyen-thuyen-nhi.md` |

### 13.5 Nền

| Đích | Lấy từ |
| --- | --- |
| `config/levels.md`, `phases.md` | `_archive/tuyen/README.md` §3 |
| `config/calendar.md` | bible-v2 §2; bảng lớp ↔ năm học |
| `config/statuses.md`, `ids.md` | `README.md` (nhãn); `kien-truc.md` §5; §3 file này |
| `schemas/` | `_archive/tuyen/README.md` §7; `qua-khu/README.md` §2; §5–§8 file này |
| `core/axes.md`, `exl.md`, `shared-mechanics.md` | `_archive/tuyen/goc.md`; `M-dien-bien-cam-xuc.md` phần thang |
| `core/constitution/` | **mới**: Claude dựng nháp từ câu gốc AX (`goc.md` §2) và các chốt nền |
| `storylines/README.md`, `past/README.md` | `_archive/tuyen/README.md` §1–2, §5–6; `qua-khu/README.md` §1–3 |
| `rules/<aspect>/` | tách `01-rules-viet.md` theo khía cạnh; `01c` → `display/`; Project `01d` → `intimacy/`; `goi-ten-cam-xuc.md` → `naming/`; Project `chui-bay-thiet-ke.md` → `swearing/`; Project `tu-dien-ha-tinh.md` → `dialect/`; `registers.md` §5 → `dose/` |
| `lib/style/registers.md` | `rules/registers.md` (§3 → `voice` của node; §2.4 → hàm Thuyên; §6 → `assets/samples/`) |
| `lib/humor/`, `lib/senses.md`, `lib/self-inference.md` | `kho/hai-ky-thuat.md`; `M-cam-xuc-giac-quan.md`; `M-tu-suy-dien.md` |

### 13.6 Canon, đề xuất, kho

| Đích | Lấy từ |
| --- | --- |
| `canon/decisions.md` | `00-quyet-dinh-v2.md` (đánh D-) |
| tách rồi `bible.md` sinh lại | Project `canon/bible-v2.md`, `01-mach-truyen-v2.md` |
| `canon/questions.md` | `canon/cau-hoi.md` |
| `proposals/_merged/` | `cay-tuyen`, `hop-nhat-cay-tuyen`, `handoff-kien-truc-cay-tuyen`, Project `hop-nhat-loi-cu` |
| `plans/` | `danh-sach-chuong-mo-dau.md`; lịch P1 `brief-tinh-cam` §7 |
| `assets/` | `kho/hai.md`; kho bối cảnh romance; `mau-*.md` → `samples/`; legacy: `02-mach-truyen`, `11-dan-y-phan-1`, `plan-legacy`, `handoff`, `lich-su-hoi-thoai`, `brief-giai-doan-2`, `brief-nhi-truong-quoc-te`, `chuc-nang-ban-le`, `tinh-tiet-moi-ban-le`, `phac-thao-cap-3`, `ban-dich-de-xuat`, `M-moi-tinh-vy` |
| sinh vào `content/` | `ghi-chu-nhan-vat-theo-chuong.md` |

## 14. Thứ tự làm

| Bước | Việc | Chờ |
| --- | --- | --- |
| B0 | Kéo 11 file chỉ có ở Project về repo; tác giả commit working tree; mở `docs/` làm vault Obsidian (nay: vault ở gốc repo, xem B2.5) | Q-KT3 |
| B1 | `config/` (gồm `ids.md` mã cũ → mới), `schemas/` (mọi khuôn, gồm `article`, `law`) | |
| B2 | `canon:check` bản 1: sổ mã, trích treo, luật `check/` cơ bản, `symbols.md`, `graph.json`; trang đồ thị | |
| B2.5 | Dời tài liệu truyện `docs/` → `content/`; chương → `content/posts/{vercel,legacy,<domain>}`; `scripts/paths.mjs`; vault ở gốc repo; `docs/` chỉ còn đặc tả app | `agreed 08/11` |
| B3 | **Mẫu, điểm dừng duyệt:** gói Thuyên (§13.1), `SELF.thuyen`; hiến pháp chương AX3 và chương 0 bản nháp; thêm schema `register`, `technique`, `pattern`, `blueprint`, sửa `event` (lá có kế thừa) và `law` (`technique → TEC`); áp ngữ pháp id (`config/ids.md` §0) cho file mới | |
| B4 | Gói Nhi, Vũ; ROM.TN; X-09; tách luật `naming/`, `swearing/` | |
| B5 | Hiến pháp đủ chín chương; sinh luật P1 làm mẫu | duyệt từng điều |
| B6 | Thành tố còn lại; node còn lại (`thriller/` khi session TH đồng ý) | |
| B7 | `rules/`, `lib/` còn lại; canon, đề xuất, kho; đổi mã cũ sang mới bằng script; bật mọi view | |
| B8 | Skill đọc theo khuôn mới (`den-vang-nhan-vat`, pipeline, tổng hợp cốt truyện, văn phong) | qua thẻ lưu skill |

Chuyển file trong Obsidian để link tự sửa; phần nào làm bằng shell thì chạy script đổi đường dẫn theo bảng §13.

## 15. Ảnh hưởng tới chốt cũ

Đã chuyển sang [`ADR-001`](../../docs/framework/adr/ADR-001-story-framework.md#consequences-on-earlier-decisions).

## 16. Câu hỏi còn mở

`assumed` nghĩa là file này đã viết theo khuyến nghị; tác giả chỉ cần trả lời nếu muốn khác.

| Q | Câu hỏi | Khuyến nghị | Trạng thái |
| --- | --- | --- | --- |
| Q-KT3 | Kéo 11 file Project về repo, giữ repo là gốc | Có | chờ, chặn B0 |
| Q-KT2 | `bible.md` sinh tự động | Có | assumed |
| Q-F1, Q-F7 | Tên file là mã duy nhất, bằng tiếng Anh theo §3; khóa mục ASCII | Có | assumed |
| Q-F2 | Thuộc tính nội tâm ở `SELF.<id>` | Có | assumed |
| Q-F3 | Nhân quả xuyên node là cột `causes` | Có | assumed |
| Q-F4 | Thực thể bí mật `SEC-` | Có | assumed |
| Q-F5, Q-F6 | Thứ tự nhịp ở tình tiết; người giữ nhịp, register, mức của dịp do script tính | Có | assumed |
| Q-F8 | View ghi thành file thật ở `_views/` | Có | assumed |
| Q-F9, Q-F10 | Luật là thực thể có phạm vi; `canon:check` là bộ chạy | Có | agreed 06/11 |
| Q-F11 | Hiến pháp chia theo AX, thêm chương 0 | Có | assumed |
| Q-F12 | Điều hiến pháp do Claude dựng nháp, tác giả duyệt từng điều | Có | assumed |
| Q-F13 | Luật giai đoạn tự hết hiệu lực khi sang giai đoạn sau | Có | assumed |
| Q-F14, Q-F15 | Đổi mã cũ bằng script; tên định danh riêng giữ ASCII tiếng Việt | Có | agreed 06/11 |
