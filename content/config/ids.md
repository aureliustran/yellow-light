---
id: config.ids
kind: config
status: proposed
updated: 2026-11-10
sources: [kien-truc-framework.md §3, tuyen/README.md, tuyen/goc.md, tuyen/qua-khu/README.md]
---
# ids · Sổ mã, cũ → mới

Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; file này chỉ khai bảng.

**Tên file = mã, duy nhất trong cả vault.** Wikilink `[[mã]]` dùng ở mọi nơi.

## 0. Ngữ pháp `proposed 10/11`

Mọi thực thể có thể bị trỏ tới đều có id, kể cả thực thể nội tuyến (mục tiêu, cảnh, điều khoản, nhịp, bước).

| Dạng | Khi nào | Ví dụ |
| --- | --- | --- |
| `KIND.ten` | thực thể có tên | `CH.thuyen`, `REG.so-cai` |
| `KIND-NNN` | sổ đánh số toàn cục | `BL-024`, `SEC-003`, `X-009`, `D-031` |
| `cha.local` | con sống trong cha | `ROM.TN.G2`, `BP.v2.05.S2`, `PAST.N.HD` |
| `cha-NNN` | con có thứ tự | `ROM.TN-014` |

**Đoạn.** id là các đoạn nối bằng `.`; `.` nghĩa là "nằm trong", `-NNN` nghĩa là "phần tử thứ n". Mỗi đoạn là **mã** (`[A-Z][A-Z0-9]*`) hoặc **tên** (`[a-z0-9][a-z0-9-]*`), không trộn hoa thường trong một đoạn. Đoạn đầu là mã loại. Các đoạn sau là mã hay tên ở **bất kỳ cấp nào**: `ROM.TN`, `PAST.N.HD`, `FN.thuyen.phong-kin` đều hợp lệ; không ép chỉ cấp cao nhất viết hoa.

**Hoa thường.** id so khớp chính xác: `ROM.TN` khác `rom.tn`. Nhưng Windows, macOS và Obsidian không phân biệt hoa thường ở tên file, nên hai id **không được chỉ khác nhau ở hoa thường** (`LAW.check.unique-id` so cả dạng hạ chữ).

**Hai cách tồn tại.** Thực thể file: tên file = id, frontmatter có `id:`. Thực thể nội tuyến: sống trong file cha, block id Obsidian là phần đuôi (`^G2`); sổ mã ghi id đầy đủ (`ROM.TN.G2`); link `[[ROM.TN#^G2]]`. Con được thăng thành file thì giữ nguyên id.

**Bất biến.** id không đổi. Muốn đổi: tạo id mới, id cũ vào `aliases` (`LAW.check.id-immutable`).

**Số.** Phần `-NNN` luôn ba chữ số. Mã cũ ít chữ số hơn (`BL-24`, `X-09`, `DV-7`) giữ làm alias.

```
SEG = [A-Z][A-Z0-9]* | [a-z0-9][a-z0-9-]*
ID  = [A-Z][A-Z0-9]* (\.SEG)* (-[0-9]{3})? (\.SEG)*        (LAW.check.id-grammar)
```

Giá trị liệt kê không phải thực thể, không có id: giai đoạn (`P1`), mức (`SS+`), trạng thái (`locked`), kênh (`narration`).

### Sổ loại

| Tầng | Loại | id | Dạng |
| --- | --- | --- | --- |
| Nền | trục · điều hiến pháp · thang | `AX3` · `ART.AX3.1`, `ART.0.4` · `SCALE.exl`, `SCALE.pride`, `SCALE.rom` | file · nội tuyến · file |
| Luật | luật · điều khoản · decree của node | `LAW.naming.pov-thuyen` · `LAW.naming.pov-thuyen.C2` · `ROM.TN.R2` | file · nội tuyến · nội tuyến |
| Thư viện | register · kỹ thuật · khuôn · nhịp của khuôn | `REG.so-cai` · `TEC.humor.escalation` · `PAT.anchor-5-step` · `PAT.anchor-5-step.B3` | file · file · file · nội tuyến |
| Thế giới | nhân vật · nhóm · bối cảnh · vật · bí mật · niềm tin · hàm · bộ chịu đựng | `CH.thuyen` · `GRP.hoi-dong-nhi` · `SET.phong-kin` · `OBJ-012` · `SEC-003` · `BL-024` · `FN.thuyen.phong-kin` · `DV-007` | file |
| Tuyến | tuyến · node · node con · SELF · mục tiêu · tình tiết · giao điểm · nhịp dịp | `ROM` · `ROM.TN` · `PAST.N.HD` · `SELF.thuyen` · `ROM.TN.G2` · `ROM.TN-014` · `X-009` · `X-009.B3` | file, trừ mục tiêu và nhịp (nội tuyến) |
| Kế hoạch | edition · bản vẽ chương · cảnh | `ED.v2` · `BP.v2.05` · `BP.v2.05.S2` | file · file · nội tuyến |
| Đầu ra | chương đã đăng · site · bản chuyển | `POST.v2.05` · `SITE.rookies` · `XP.rookies.012` | chương giữ tên file cũ; id ghi trong sổ ánh xạ |
| Ngang | quyết định · câu hỏi · đề xuất · rà soát · mẫu · tư liệu | `D-031` · `Q-045` · `PROP-012` · `AUD-003` · `SMP-007` · `AST.<ten>` | file hoặc nội tuyến |
| Meta | cấu hình · schema · đặc tả app | `CFG.ids` · `SCH.event` · `SPEC.editions` | file |

## 1. Tiền tố

| Loại | Cũ | Mới | Ví dụ mới |
| --- | --- | --- | --- |
| Trục hiện sinh | `H1`–`H9` | `AX1`–`AX9` | `AX3` |
| Thang hiện sinh | `Nấc-HS` | `SCALE.exl` (alias `EXL`) | `EXL 8` |
| Thang kiêu ngạo của Thuyên | `Nấc-TT` | `SCALE.pride` `proposed` | `SCALE.pride 3` |
| Thang "Nhi thích Thuyên" | `Nấc-RM` | `SCALE.rom` `proposed` | `SCALE.rom 5` |
| Niềm tin | `NT-nn` | `BL-NNN` | `BL-024` |
| Bộ chịu đựng | `TB-n` | `DV-NNN` | `DV-007` |
| Register | `R1`–`R9` | `REG.<ten>` (R1–R9 làm alias) | `REG.so-cai` |
| Nhân vật | `NV.` | `CH.` | `CH.thuyen` |
| Nhóm, quần chúng | (mới) | `GRP.` `proposed` | `GRP.hoi-dong-nhi` |
| Bối cảnh | `BC.` | `SET.` | `SET.phong-kin` |
| Vật | `VAT-` | `OBJ-NNN` | `OBJ-012` |
| Bí mật | `BM-` | `SEC-NNN` | `SEC-003` |
| Tuyến cấp 1 | `QK` · `RM` · `TH` · `SL` · `GD` | `PAST` · `ROM` · `THR` · `SOL` · `FAM`; thêm `SELF` | `ROM.TN` |
| Tình tiết | `TN-014` (mã ngắn theo node) | `<node>-<số>` | `ROM.TN-014` |
| Giao điểm | `X-nn` | `X-NNN` | `X-009` |
| Quyết định | `D-nnn` | giữ | `D-031` |
| Câu hỏi | `Q-nnn` | giữ | `Q-045` |
| Điều hiến pháp (mới) | — | `ART.<trục>.<số>` · `ART.0.<số>` | `ART.AX3.1` |
| Luật (mới) | — | `LAW.<khía cạnh>.<phạm vi>` | `LAW.naming.pov-thuyen` |
| Hàm (mới) | — | `FN.<nhân vật>.<tên>` | `FN.thuyen.phong-kin` |

## 2. Giai đoạn

| Cũ | Mới |
| --- | --- |
| MĐ | `OPEN` |
| GĐ1 | `P1` |
| GĐ2 | `P2` |
| GÃY | `BREAK` |
| HP | `AFTER` |
| hậu sân bay | `POST` |

## 3. Node (đổi tiền tố tuyến, giữ đuôi)

| Cũ | Mới | Cũ | Mới | Cũ | Mới |
| --- | --- | --- | --- | --- | --- |
| `QK.T` | `PAST.T` | `RM.TN` | `ROM.TN` | `TH.MO` | `THR.MO` |
| `QK.N` | `PAST.N` | `RM.TD` | `ROM.TD` | `TH.LAB` | `THR.LAB` |
| `QK.DA` | `PAST.DA` | `RM.PN` | `ROM.PN` | `TH.MD` | `THR.MD` |
| `QK.K` | `PAST.K` | `RM.LT` | `ROM.LT` | `TH.LM` | `THR.LM` |
| `SL.VU` | `SOL.VU` | `RM.VA` | `ROM.VA` | `TH.T18` | `THR.T18` |
| `SL.SAN` | `SOL.SAN` | `GD.T` | `FAM.T` | `TH.DR` | `THR.DR` |
| `SL.HD` | `SOL.HD` | `GD.N` | `FAM.N` | | |
| `SL.DT` | `SOL.DT` | | | | |

Node mới: `SELF.<id>` cho thuộc tính nội tâm (ví dụ `SELF.thuyen`), một node cho mỗi nhân vật có hiện sinh.

Mã con của `QK.N` như `PAST.N.HD` giữ đuôi.

## 4. Trục AX (cũ H)

| Mới | Cũ | Tên trục | Trạng thái nguồn (`goc.md` §2) |
| --- | --- | --- | --- |
| `AX1` | H1 | Đèn vàng | proposed |
| `AX2` | H2 | Sống hay sống sót | locked 26/10 |
| `AX3` | H3 | Cây thước | locked 28/10 |
| `AX4` | H4 | Đọc người, mù với mình | proposed |
| `AX5` | H5 | Định giá | proposed |
| `AX6` | H6 | Thị trường là thứ người có quyền tạo ra | proposed |
| `AX7` | H7 | Được đồng ý mà không được nghe; được khen mà không được ôm | locked 28/10 (nửa Thuyên; nửa Nhi chờ session ROM) |
| `AX8` | H8 | Điều trị bắt đầu từ chính mình | proposed |
| `AX9` | H9 | Kẻ mạnh | locked 28/10 |

## 5. Quy tắc đổi bằng script (B7)

Chạy theo thứ tự; mỗi quy tắc dùng ranh từ (`\b`), không đụng bên trong URL hay code block.

| # | Mẫu | Thay | Lưu ý |
| --- | --- | --- | --- |
| 1 | `\bH([1-9])\b` | `AX$1` | Chỉ khi cạnh là chữ "trục", "H" đứng riêng, hoặc trong cột `axis`; **loại trừ** `H` đứng trong ví dụ giờ/hex. Kiểm tay lần đầu trên `tuyen/goc.md` |
| 2 | `\bNT-(\d{2})\b` | `BL-$1` | Cả `NT-07` trong ngoặc, bảng, wikilink |
| 3 | `\bTB-(\d+)\b` | `DV-$1` | |
| 4 | `\b(QK)\.([A-Z]+)` | `PAST.$2` | Theo bảng §3 |
| 5 | `\b(RM)\.([A-Z]+)` | `ROM.$2` | |
| 6 | `\b(TH)\.([A-Z0-9]+)` | `THR.$2` | |
| 7 | `\b(SL)\.([A-Z]+)` | `SOL.$2` | |
| 8 | `\b(GD)\.([A-Z]+)` | `FAM.$2` | |
| 9 | `\bGĐ1\b` · `\bGĐ2\b` · `\bGÃY\b` · `\bMĐ\b` · `\bHP\b` | `P1` · `P2` · `BREAK` · `OPEN` · `AFTER` | Chỉ ngoài văn xuôi trích nguyên văn chương |
| 10 | `Nấc-HS` · `Nấc-TT` · `Nấc-RM` | `EXL` · `SCALE.pride` · `SCALE.rom` | |
| 11 | `\[chốt (\d\d/\d\d)\]` | `` `locked $1` `` | Chỉ trong tài liệu thiết kế; **không đụng** `content/` |
| 12 | `\b(BL|SEC|OBJ|DV|X)-(\d{1,2})\b` | đệm thành ba chữ số | Mã cũ vào `aliases` |
| 13 | `\bfn\.` · `\bART-` · `\bSTEP\.` | `FN.` · `ART.` · `SCALE.` | |
| 14 | `\bR([1-9])\b` | `REG.<ten>` theo bảng register | Chỉ khi cạnh chữ "register" hoặc trong cột `register`/`voice` |

Mã cũ không bị xóa: mỗi file đích thêm vào `aliases` mọi mã cũ của nó (ví dụ `CH.thuyen` có alias `NV.thuyen`, `thuyen`).

## 6. Không đổi

`D-nnn`, `Q-nnn` (cập nhật 10/11: `R1`–`R9` thành alias của `REG.*`; `X-nn` đệm thành `X-NNN`), thang `D…SSS`, tên định danh riêng của truyện (`thuyen`, `phong-kin`, `cai-goi`, `thuoc-giam-dau`).

## 7. Va chạm cần kiểm trước khi chạy script

- Chữ `H` + số trong văn bản khác (ví dụ "H1" trong tên file `H1.md`), chữ `HP` trong từ khác.
- `TH` + `.` trong số thập phân/viết tắt thông thường; script chỉ khớp khi theo sau là mã node đã khai ở §3.
- `SCALE.pride`/`SCALE.rom` là tên đề xuất của Claude; nếu tác giả muốn tên khác, sửa ở đây và script theo.
