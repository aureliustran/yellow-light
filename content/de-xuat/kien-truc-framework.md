# Đèn vàng – Framework: docs và content như một codebase

Nov 6, 2026 · @aureliustran. **Bản 3** (06/11, 12:41), thay bản 2 (05/11, 22:29). Thêm: Obsidian (§9), luật là thực thể (§7), hiến pháp sinh luật theo giai đoạn (§6), mọi quy ước bằng tiếng Anh (§3), trang đồ thị (§10). Chưa sửa, chưa chuyển file nào. Kế hoạch gộp ở §13–§14; câu hỏi còn mở ở §16.

**Trạng thái trong file này** (theo bộ từ vựng §3): `locked` tác giả đã quyết · `agreed` tác giả đồng ý hướng, chi tiết là đề xuất · `proposed` Claude đề xuất · `assumed` theo khuyến nghị của Claude, tác giả chưa trả lời riêng.

---

## 0. Tóm tắt

1. **`world/` tĩnh, `storylines/` động** `agreed 05/11`. Thế giới giữ định nghĩa; storyline giữ giá trị tại một thời điểm. Star schema: bảng chiều và bảng sự kiện; giai đoạn là chiều thời gian.
2. **Phụ thuộc một chiều:** động trỏ vào tĩnh. Chiều ngược lại là view do script sinh.
3. **Một khuôn cho mỗi loại thành tố**: gói nhân vật, hàm, node, tình tiết, giao điểm, điều hiến pháp, luật. Agent tính được file và mục cần đọc.
4. **Hiến pháp chia từ trục AX (H cũ); luật sinh theo giai đoạn từ hiến pháp** `agreed 06/11`. Luật là thực thể riêng, nối nhiều – nhiều với thành tố bằng bộ chọn, có ranh giới rõ.
5. **Giao điểm là một dịp**, siêu cạnh nối nhiều node qua tình tiết; chỉ lưu phần đầu.
6. **Mọi quy ước bằng tiếng Anh; nội dung truyện tiếng Việt** `locked 06/11`. Mã cũ đổi một lần bằng script `agreed 06/11`; tên định danh mang nghĩa riêng của truyện giữ ASCII tiếng Việt `agreed 06/11`.
7. **Obsidian là lớp link và xem**; `canon:check` là bộ chạy luật và sinh view; trang đồ thị riêng cho toàn mạng `agreed 06/11`.

## 1. Vì sao cần

- Hai cây chồng nhau (tầng T0–T4 và cây tuyến); nhân vật, hệ giá trị, luật không có chỗ nên rơi vào node gần nhất (sáu file tâm lý Thuyên ở `tuyen/qua-khu/`, thẻ Vũ ở `tuyen/sl/vu.md`).
- Một file trộn định nghĩa, cơ chế, diễn biến theo lớp, cách lên trang, tư liệu, việc treo; cùng một cỗ máy tả từ sáu góc.
- Trích bằng `file §số`; tham chiếu ngược viết tay.
- Luật là một khối: `01-rules-viet.md` 64 KB; luật thay luật bằng lời ("file này thay dòng … của …").
- 11 file chỉ có ở Project.

## 2. Ánh xạ khái niệm

| Codebase / database | Đèn vàng | Ở đâu |
| --- | --- | --- |
| Entrypoint | cửa vào, thứ tự nạp | `content/README.md` |
| Config, hằng số | lịch, giai đoạn, thang mức, trạng thái, sổ mã | `config/` |
| Schema, interface | khuôn của mọi loại thành tố | `schemas/` |
| Domain core | trục AX, thang EXL | `core/` |
| Hiến pháp (spec, ADR nền) | điều bất biến chia từ AX | `core/constitution/` |
| Policy, lint rule có phạm vi | luật: một khía cạnh, một phạm vi | `rules/` |
| Thư viện | kỹ thuật: register, hài, khuôn tình huống | `lib/` |
| Bảng chiều, class | nhân vật, nhóm, bối cảnh, vật, bí mật | `world/` |
| Bảng sự kiện | node | `storylines/` |
| Dòng nối (`order_product`) | tình tiết | trong file node |
| `order`, mediator, siêu cạnh | giao điểm | `storylines/intersections/` |
| View | mặt cắt nhân vật, ma trận, bible, bộ luật giai đoạn, bảng nhịp | sinh |
| ctags | `symbols.md` | sinh |
| Bản phát hành | chương đã đăng | `content/posts/vercel/` |
| CHANGELOG, issue | D-, Q- | `canon/` |
| Nhánh, PR | đề xuất | `proposals/` |
| Test | rà soát | `audits/` |
| Vendor | tư liệu, mẫu, legacy | `assets/` |
| Bộ chạy CI | `canon:check` | `scripts/` |

## 3. Bộ từ vựng `locked 06/11 · chi tiết proposed`

**Ranh giới:** tên thư mục, tên file, khóa mục, tên property, tên trường của khuôn, giá trị liệt kê, tiền tố mã là tiếng Anh. Văn bản chương, phát biểu niềm tin, nội dung luật, câu gốc, điều hiến pháp, mô tả nhân vật là tiếng Việt. Tên định danh mang nghĩa riêng của truyện (`thuyen`, `phong-kin`, `cai-goi`) giữ ASCII tiếng Việt, như tên biến nghiệp vụ.

**Trường đầu file:** `id`, `kind`, `parent`, `status`, `updated`, `uses`, `exports`, `participants`, `aliases`

**Trạng thái:** `page` (trang) · `locked` (chốt) · `delegated` (chốt · ủy quyền) · `agreed` (thống nhất) · `proposed` (đề xuất) · `draft` (bản nháp) · `raw` (nguyên liệu) · `superseded` (thay bởi) · `conflict` (xung đột) · `needs-decision` (cần chốt)

**Giai đoạn:** `OPEN` (MĐ) · `P1` (GĐ1) · `P2` (GĐ2) · `BREAK` (GÃY) · `AFTER` (HP) · `POST` (hậu sân bay)

**Vai theo mức:** `lead` (DẪN) · `main` (CHÍNH) · `support` (NỀN) · `minor` (PHỤ). Thang D → SSS giữ.

**Tiền tố mã:**

| Cũ | Mới | Ví dụ |
| --- | --- | --- |
| H1–H9 | `AX1`–`AX9` | AX3 |
| Nấc-HS | `EXL` | EXL 8 |
| NT- | `BL-` | BL-24 |
| TB- | `DV-` | DV-7 |
| R1–R9 | giữ | R8 |
| NV. · BC. · VAT- · BM- | `CH.` · `SET.` · `OBJ-` · `SEC-` | CH.thuyen |
| QK · RM · TH · SL · GD | `PAST` · `ROM` · `THR` · `SOL` · `FAM`; thêm `SELF` | ROM.TN, PAST.T, SELF.thuyen |
| tình tiết TN-014 | `<node>-<số>` | ROM.TN-014 |
| X-, D-, Q- | giữ | X-09 |
| (mới) điều hiến pháp | `ART-<trục>.<số>` | ART-AX3.1, ART-0.4 |
| (mới) luật | `LAW.<khía cạnh>.<phạm vi>` | LAW.naming.pov-thuyen |
| (mới) hàm | `fn.<nhân vật>.<tên>` | fn.thuyen.phong-kin |

Bảng mã cũ → mới đầy đủ ở `config/ids.md`, dùng cho script đổi mã và làm `aliases` trong Obsidian.

## 4. Cây thư mục

```
content/                              (tài liệu truyện; vault Obsidian ở gốc repo)
├── README.md                         entrypoint
├── symbols.md                        SINH
├── config/                           TẦNG 0
│   ├── calendar.md · phases.md · levels.md · statuses.md · ids.md
├── schemas/                          TẦNG 0
│   ├── character.md · group.md · setting.md · object.md · secret.md
│   ├── function.md · belief.md · node.md · event.md · intersection.md
│   ├── article.md · law.md
│   └── proposal.md · plan.md · chapter.md
├── core/                             TẦNG 1
│   ├── axes.md · exl.md · shared-mechanics.md
│   └── constitution/                 ART-0.md (nền) · ART-AX1.md … ART-AX9.md
├── rules/                            TẦNG 1.5 · trích core
│   ├── <aspect>/LAW.*.md             naming/ · swearing/ · address/ · dialect/ · under-18/ · display/ · dose/ · …
│   └── check/LAW.*.md                luật cấu trúc
├── lib/                              TẦNG 1.5 · trích core, rules
│   ├── style/ · humor/ · patterns/ · senses.md · self-inference.md
├── world/                            TẦNG 2 · TĨNH
│   ├── characters/<id>/              §5
│   ├── groups/ · settings/ · objects/ · secrets/
├── storylines/                       TẦNG 3 · ĐỘNG
│   ├── README.md                     cây quyết định
│   ├── self/ · past/ · romance/ · thriller/ · slice-of-life/ · family/
│   └── intersections/
├── plans/                            TẦNG 4
├── canon/                            NGANG · decisions.md · questions.md · bible.md (SINH)
├── proposals/ · audits/ · assets/    NGANG
├── posts/                            BẢN ĐĂNG · chương theo nơi đăng
│   ├── vercel/                       bản chính trên web (edition v2); scripts/paths.mjs trỏ vào đây
│   ├── legacy/                       edition v1, đọc ở /legacy
│   └── <domain>/                     mỗi site đăng chéo: *.txt · convert.md (sau này thêm _index.md SINH)
└── _archive/                         bản bỏ, ngoài đồ thị
└── _views/                           SINH: mọi view (§11)
```

**Tên file là mã, duy nhất trong cả vault** `assumed`: `CH.thuyen.md`, `fn.thuyen.phong-kin.md`, `ROM.TN.md`, `X-09.md`, `LAW.naming.pov-thuyen.md`. Wikilink `[[fn.thuyen.phong-kin]]` dùng được ở mọi nơi, grep ra ngay.

## 5. Gói nhân vật (tĩnh) `agreed 05/11`

```
world/characters/<id>/
├── CH.<id>.md                 identity · purpose · rules · attributes · exports
├── CH.<id>.beliefs.md         BL-: phát biểu, mặt kia, trục
├── CH.<id>.voice.md           giọng nền: dialogue · narration (khi là POV) · lexicon · forbidden
├── mechanics/
│   ├── CH.<id>.mechanics.md   chữ ký mọi hàm, mỗi hàm một dòng
│   └── fn.<id>.<ten>.md       một hàm một file
└── (view ở _views/CH.<id>.view.md)
```

- Định danh nằm ở file chính của gói `locked 05/11`.
- Mục trống ghi `none`, không bỏ.
- Mỗi file mở bằng phần đầu khoảng 20 dòng: property, một câu tóm tắt, mục lục khóa.
- Nhân vật quần chúng là một hàng trong `world/groups/<nhóm>.md`.

**Khuôn hàm** (định nghĩa, không có ngày):

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

**Thuộc tính:** file chính khai thuộc tính động cùng tập giá trị (`cai-toi-doc ∈ {ngu, thuc-co-dieu-kien, phong-kin-hong, chiem-cho}`). Giá trị theo giai đoạn do node làm chủ ghi.

## 6. Hiến pháp và thứ bậc luật `agreed 06/11`

```
AX1 … AX9  (core/axes)
   │  chia thành
CONSTITUTION  core/constitution/    điều bất biến; mỗi trục một chương; thêm chương 0 (nền)
   │  sinh theo giai đoạn, dựa trên EXL và weight của giai đoạn
LAW (phase)   rules/                 điều ấy hiện ra thế nào ở OPEN, P1, P2, BREAK, AFTER
   │  cụ thể hóa
DECREE        mục rules của node, giao điểm
   │
OVERRIDE      tình tiết, kèm lý do
```

Tầng dưới chỉ cụ thể hóa, không trái tầng trên. Làm trái một điều thì phải sửa chính điều ấy (D-, mức cao nhất).

**Khuôn điều** (`schemas/article.md`): `id`, `statement` (một câu), `source` (đoạn nào của câu gốc), `forbids`, `applies-to`, `status`.

Minh họa (Claude dựng từ câu gốc AX3, chưa duyệt):
- `ART-AX3.1`: Mọi phép đo trong truyện đều có người cầm thước. Truyện không bao giờ đưa ra một cây thước khách quan.
- `ART-AX3.2`: Kẻ từng bị đo, về sau cầm thước đo người khác. Truyện không tha cho việc ấy chỉ vì nó có lý do.

**Chương 0 (nền)** `assumed`: căn cứ cho các luật không sinh từ trục (hình thức, khối hiển thị, xưng hô, giọng địa phương, ranh 18, cấu trúc).

**Điều do Claude dựng nháp từ câu gốc, tác giả duyệt từng điều** `assumed`, theo luật dùng câu gốc ở `goc.md` §2.

**Sinh luật:** lấy một điều × nấc EXL của trục ở giai đoạn × node `lead` của giai đoạn → Claude dựng `proposed` → tác giả duyệt → `locked`. Luật "nấc không lùi" thành luật máy giữa các luật giai đoạn kế nhau.

## 7. Luật là thực thể `agreed 06/11`

```
id          LAW.naming.pov-thuyen
aspect      naming (gọi tên cảm xúc trong lời kể)
basis       [[ART-AX7.…]] hoặc [[ART-0.…]]
effective   OPEN → AFTER   (luật giai đoạn: một giai đoạn; hết hiệu lực khi sang giai đoạn sau, trừ khi ghi kéo dài)
applies-to  pov = CH.thuyen · channel = narration
except      PAST.T × span-1 → [[LAW.naming.past-t-span1]] · phần cần giấu → [[LAW.conceal]]
supersedes  [[LAW.naming.legacy]] (01-rules-viet, chốt 18/10)
content     ba điều kiện được gọi tên; hai giới hạn; liều
technique   → [[lib/style/…]]
check       human
severity    error
```

**Bộ chọn** (`applies-to`, `except`): theo `kind`, `id`, tuyến, giai đoạn, `pov`, `channel` (`dialogue`, `narration`, `chat`), `register`, người có mặt, thuộc tính. Ví dụ `LAW.under-18`: áp cho mọi tình tiết có người dưới 18 tuổi, tính từ `identity` trong `world/` và `config/calendar`.

**Ranh giới:**
1. Một luật, một khía cạnh.
2. Cùng khía cạnh, phạm vi chồng nhau thì phải có `except`, `supersedes`, hoặc luật cụ thể hơn. Chồng mà không có là lỗi.
3. Luật không chứa kỹ thuật; trỏ sang `lib/`.
4. Luật không chứa sự thật của truyện; đọc thuộc tính ở `world/`.
5. Mọi luật có `basis`.

**Phần nối** nằm trong file luật (luật làm chủ phạm vi của mình). Mỗi thành tố thấy luật của mình qua view "rules for me" và backlinks.

## 8. Node, tình tiết, giao điểm (động)

### 8.1 Node `agreed 05/11`

```
storylines/<tuyến>/<NODE>.md
  participants   [[CH.thuyen]], [[CH.nhi]], [[SET.…]]
  weight         mức theo giai đoạn (node làm chủ)
  relation       theo giai đoạn × chiều: là gì của nhau, ai biết gì, nấc
  state          thuộc tính node làm chủ, theo người × giai đoạn
  voice          theo người × giai đoạn: register lời kể, giọng thoại → lib, rules
  rules          decree: luật riêng của node (khuôn §7, phạm vi trong node)
  events         tình tiết
  transitions    giá trị nào đổi ở tình tiết nào
```

**Một chủ cho mỗi thuộc tính.** Thuộc tính quan hệ: node của quan hệ. Thuộc tính nội tâm: node bản thân `storylines/self/SELF.<id>.md` `assumed`.

**Giọng theo tầng:** tình tiết > node × giai đoạn > SELF × giai đoạn > giọng nền.

### 8.2 Tình tiết

Giữ các cột hiện có; tên cột: `id`, `date`, `event`, `status`, `axis`, `level`, `beliefs`, `chapter`, `fuel`, `cost`, `register`. Thêm:

| Cột | Ý |
| --- | --- |
| `calls` | hàm được gọi: `[[fn.thuyen.phong-kin]](K1+K2+K4)`, `[[fn.nhi.thich]](nấc 3)` |
| `x` · `beat` | dịp và thứ tự: `[[X-09]]` · 3 |
| `changes` | thuộc tính, quan hệ, bí mật đổi giá trị |
| `causes` | tình tiết ở node khác mà nó gây ra |

Trong ô bảng, wikilink không dùng bí danh `[[a\|b]]` để khỏi vỡ bảng.

### 8.3 Giao điểm `agreed 05/11`

Dịp nhiều node cùng ghi vào; không nằm trong cây node; có cây riêng (quãng chứa sự kiện). Nhân quả xuyên node là cột `causes`, không phải giao điểm `assumed`.

**Lưu:** `id`, `kind` ∈ {`event`, `span`, `info`}, `parent`, `time`, `place`, `override`, `open`.
**Sinh:** node tham gia; bảng nhịp (sắp theo `beat`); người giữ nhịp (node có tình tiết trong nhịp và mức cao nhất; bằng mức thì node chủ); POV; register; mức của dịp; sổ ai biết gì trước và sau (từ `changes` về `SEC-`); kết quả.

## 9. Obsidian `agreed 06/11`

| Framework cần | Obsidian |
| --- | --- |
| Import | wikilink `[[id]]`, `[[id#key]]` |
| Siêu dữ liệu, quan hệ có kiểu | property chứa link (`participants`, `uses`, `basis`, `parent`) |
| Được dùng ở | backlinks |
| Đổi tên, chuyển file | tự sửa link khi làm **trong Obsidian** |
| Xem cây cha – con, cây căn cứ | plugin Breadcrumbs đọc `parent`, `basis` |
| Xem quanh một node | local graph, nhóm màu theo thư mục tầng, lọc bỏ `assets/`, `proposals/` |

**Giới hạn:** Dataview chỉ hiện kết quả trong Obsidian; agent đọc file thô không thấy. Vì vậy mọi view vẫn ghi thành file thật ở `_views/` `assumed`. Obsidian không kiểm luật; việc ấy của `canon:check`. Link không có kiểu; kiểu nằm ở tên property. MCP Obsidian chạy trên máy tác giả, chỉ có ở phiên nối máy.

**Cấu hình:** vault ở **gốc repo** (để đồ thị thấy cả `content/posts/*` và `crosspost/`); loại khỏi vault: `node_modules`, `.git`, `dist`, `.astro`, `.vercel`, `src`, `supabase`, `crosspost/work`, `crosspost/logs`, `content/_archive`. Commit phần dùng chung của `.obsidian/` (plugin, luật link); bỏ qua workspace cá nhân.

## 10. Trang đồ thị `agreed 06/11`

Sau B2, `canon:check` ghi `_views/graph.json` (mọi nút, mọi cạnh có kiểu, weight theo giai đoạn, hiệu lực của luật). Một trang tương tác đọc file ấy:
- nút tô màu theo tầng, to nhỏ theo `weight`;
- cạnh tô màu và nét theo kiểu (`participants`, `calls`, `causes`, `basis`, `x`);
- thanh trượt giai đoạn OPEN → AFTER: node sáng lên, giao điểm kích hoạt, luật hết hiệu lực;
- bấm một nút để thấy hàng xóm và mở file.

## 11. View sinh tự động

| View | Từ |
| --- | --- |
| `symbols.md` | mọi mã → file#key → một câu |
| `_views/CH.<id>.view.md` | mặt cắt nhân vật theo giai đoạn, gom từ mọi node |
| `_views/characters.md` | mọi nhân vật × mục |
| `_views/matrix.md` | mức · vai · register theo node × giai đoạn |
| `_views/X-<n>.view.md` | bảng nhịp, sổ thông tin của dịp |
| `_views/laws-<phase>.md` | bộ luật đang có hiệu lực của giai đoạn, xếp theo điều |
| `_views/rules-for/<id>.md` | luật áp cho một thành tố |
| `canon/bible.md` | mọi dòng `locked`, xếp theo cây |
| `_views/graph.json` | §10 |

## 12. `canon:check`: bộ chạy luật `agreed 06/11`

Không giữ luật riêng. Nó đọc mọi luật `check: machine`, khớp bộ chọn với thành tố, chạy trên đúng phạm vi, báo theo luật, rồi sinh view. Chạy được một phần (`--law`, `--target`, `--phase`).

| Luật cấu trúc (`rules/check/`) | Áp cho | Không áp cho |
| --- | --- | --- |
| `LAW.check.unique-id` | mọi file | |
| `LAW.check.resolve` (trích treo) | mọi file | `assets/` |
| `LAW.check.layer` | `world/`, `storylines/`, `rules/`, `core/` | `proposals/`, `assets/` |
| `LAW.check.schema.<kind>` | thành tố đúng `kind` | |
| `LAW.check.owner` (một chủ mỗi thuộc tính) | `storylines/` | |
| `LAW.check.x-consistency` | tình tiết, giao điểm | |
| `LAW.check.secret-leak` | tình tiết | |
| `LAW.check.basis` (luật phải có căn cứ) | `rules/` | |
| `LAW.check.overlap` (luật chồng không có ưu tiên) | `rules/`, decree | |
| `LAW.check.exl-monotonic` | luật giai đoạn, SELF | |
| `LAW.check.weekday` | mọi ngày | |
| `LAW.check.status` (dòng phải có trạng thái; `locked` dựa `proposed`) | `world/`, `storylines/` | `draft`, `assets/` |

---

## 13. Kế hoạch gộp và phân bổ lại

Đổi chỗ, cắt theo khuôn, đổi mã sang bộ mới; nội dung đổi đi qua chốt như thường. Mỗi khối một nhánh, một PR.

### 13.1 Gói Thuyên

**Nguồn:** `M-he-gia-tri.md`, `tuyen/qua-khu/thuyen-co-may.md`, `thuyen-hai-cai-toi.md`, `thuyen-da-nhan-cach.md`, `thuyen-lang-kinh.md`, Project `thuyen-adhd.md`, Project `thuyen-cai-toi-doc-co-che.md`, mốc trong `qua-khu/thuyen.md`, phần Thuyên trong `01-rules-viet.md`.

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
| `storylines/self/SELF.thuyen.md` | `co-may` §4; `cai-toi-doc-co-che` §4.5 (năm bước hỏng ở P2); `lang-kinh` §4; `M-he-gia-tri` §8 |
| `storylines/past/PAST.T.md` | bảng neo `thuyen.md` §0–3, §5; `M-he-gia-tri` §3; `hai-cai-toi` §3–6, §8–9, §14; `da-nhan-cach` §6; `lang-kinh` §2; `co-may` §6; `thuyen-adhd` §1, §6 |
| `storylines/family/FAM.T.md` | `M-cai-nhau-bo-me.md`; `M-he-gia-tri` §7; `thuyen.md` §6.9 |
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
| Hội đồng Nhi | `02-hoi-dong-nhi` §0, §2–4 → `world/groups/` | §5 → `SOL.HD.md`; §1 → `PAST.N.md` |
| Lab, hội sân | bible-v2 §4.8 → `world/groups/` | THR.LAB, SOL.SAN |
| Bối cảnh | bible-v2 §5, §7 → `world/settings/` | |

### 13.4 Node và giao điểm

| Đích | Lấy từ |
| --- | --- |
| `ROM.TN.md` | `brief-tinh-cam-thuyen-nhi` (tình tiết → ROM.TN-…; §5d → voice; §5e → relation); `03-kho` §2 (A–H, E2, E3 → khuôn của node); `thuyen-nhi.md` §1–2, §4–5 |
| `claude/drafts/rom-tn/` | cảnh mẫu `thuyen-nhi.md` §3, §3b |
| `X-09.md`, `X-06.md` | Project `05-gala-va-quan-su-bi-mat.md` |
| `X-13.md`, `lib/patterns/`, `world/secrets/` | `de-xuat/q-001-…` |
| `intersections/*` còn lại | `tuyen/README.md` §8; X-12 → cột `causes` |
| `proposals/_merged/` | Project `04-rui-ro-tuyen-thuyen-nhi.md` |

### 13.5 Nền

| Đích | Lấy từ |
| --- | --- |
| `config/levels.md`, `phases.md` | `tuyen/README.md` §3 |
| `config/calendar.md` | bible-v2 §2; bảng lớp ↔ năm học |
| `config/statuses.md`, `ids.md` | `README.md` (nhãn); `kien-truc.md` §5; §3 file này |
| `schemas/` | `tuyen/README.md` §7; `qua-khu/README.md` §2; §5–§8 file này |
| `core/axes.md`, `exl.md`, `shared-mechanics.md` | `tuyen/goc.md`; `M-dien-bien-cam-xuc.md` phần thang |
| `core/constitution/` | **mới**: Claude dựng nháp từ câu gốc AX (`goc.md` §2) và các chốt nền |
| `storylines/README.md`, `past/README.md` | `tuyen/README.md` §1–2, §5–6; `qua-khu/README.md` §1–3 |
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
| B3 | **Mẫu, điểm dừng duyệt:** gói Thuyên (§13.1), `SELF.thuyen`; hiến pháp chương AX3 và chương 0 bản nháp | |
| B4 | Gói Nhi, Vũ; ROM.TN; X-09; tách luật `naming/`, `swearing/` | |
| B5 | Hiến pháp đủ chín chương; sinh luật P1 làm mẫu | duyệt từng điều |
| B6 | Thành tố còn lại; node còn lại (`thriller/` khi session TH đồng ý) | |
| B7 | `rules/`, `lib/` còn lại; canon, đề xuất, kho; đổi mã cũ sang mới bằng script; bật mọi view | |
| B8 | Skill đọc theo khuôn mới (`den-vang-nhan-vat`, pipeline, tổng hợp cốt truyện, văn phong) | qua thẻ lưu skill |

Chuyển file trong Obsidian để link tự sửa; phần nào làm bằng shell thì chạy script đổi đường dẫn theo bảng §13.

## 15. Ảnh hưởng tới chốt cũ

| Chốt, luật | Đổi gì |
| --- | --- |
| `goc.md` [chốt 28/10]: cơ chế nằm ở node mang nó | Định nghĩa ở gói nhân vật; giá trị theo thời điểm ở node |
| `goc.md`: gốc giữ trục, không có luật | Gốc sinh thêm hiến pháp; luật lấy căn cứ từ hiến pháp |
| `kien-truc.md` §1.5: session đọc README, bible, cau-hoi | README, `symbols.md`, `questions.md`; bible là view |
| M1 (Q-031) | Giữ, mở rộng: mọi giá trị động ở node làm chủ |
| Q-027 | Giữ; giao điểm có cây riêng |
| `registers.md` §3 | Ô vào `voice` của node; ma trận là view |
| `goi-ten-cam-xuc.md` "thay" một dòng của `01-rules-viet.md` | Thành trường `supersedes` |
| Mọi mã H, NT, TB, QK, RM, TH, SL, GD, MĐ, GĐ, GÃY, HP | Đổi theo §3 bằng script; mã cũ thành `aliases` |

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
