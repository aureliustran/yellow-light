---
id: CFG.ids
aliases: [config.ids]
kind: config
status: proposed
updated: 2026-11-10
sources: [kien-truc-framework.md §3, _archive/tuyen/README.md, _archive/tuyen/goc.md, _archive/tuyen/qua-khu/README.md]
---
# ids · Sổ mã, cũ → mới

Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; file này chỉ khai bảng.

**Tên file = mã, duy nhất trong cả vault.** Wikilink `[[mã]]` dùng ở mọi nơi.

## 0. Ngữ pháp

Chuyển sang spec: [`docs/framework/ids.md`](../../docs/framework/ids.md) (ngữ pháp, sổ loại, hoa thường, id nội tuyến, bất biến). File này chỉ giữ dữ liệu đổi mã cũ → mới.

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
| Nhóm, quần chúng | (mới) | bỏ 11/11: nhóm là node (`SOL.HD`), quần chúng là dòng `members` của node | `GRP.hoi-dong-nhi` → `SOL.HD` |
| Bối cảnh | `BC.` | `SET.` | `SET.phong-kin` |
| Vật | `VAT-` | `OBJ-NNN` | `OBJ-012` |
| Bí mật | `BM-` | `SEC-NNN` | `SEC-003` |
| Tuyến cấp 1 | `QK` · `RM` · `TH` · `SL` · `GD` | `PAST` · `ROM` · `THR` · `SOL` · `FAM`; thêm `SELF` | `ROM.TN` |
| Tình tiết | `TN-014` (mã ngắn theo node) | `<node>-<số>` | `ROM.TN-014` |
| Giao điểm | `X-nn` | `X.<key>` (khóa = id node, xếp thứ tự, nối `+`) | `X.PAST.T+ROM.TN` |
| Lần giao | `X-nn` | `X.<key>-NNN` | `X.PAST.T+ROM.PN+ROM.TN-002` (cũ `X-006`) |
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
| `QK.DA` | `PAST.DA` | `RM.PN` | `ROM.PN` | `TH.MD` | `THR.MODEL` |
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
| `AX1` | H1 | Đèn vàng | locked 10/11 |
| `AX2` | H2 | Sống hay sống sót | locked 26/10 |
| `AX3` | H3 | Cây thước | locked 28/10 |
| `AX4` | H4 | Đọc người, mù với mình | locked 10/11 |
| `AX5` | H5 | Định giá | locked 10/11 |
| `AX6` | H6 | Thị trường là thứ người có quyền tạo ra | locked 10/11 |
| `AX7` | H7 | Được đồng ý mà không được nghe; được khen mà không được ôm | locked 28/10 (nửa Thuyên; nửa Nhi chờ session ROM) |
| `AX8` | H8 | Điều trị bắt đầu từ chính mình | locked 10/11 |
| `AX9` | H9 | Kẻ mạnh | locked 28/10 |

## 5. Quy tắc đổi bằng script (B7)

Chạy theo thứ tự; mỗi quy tắc dùng ranh từ (`\b`), không đụng bên trong URL hay code block.

| # | Mẫu | Thay | Lưu ý |
| --- | --- | --- | --- |
| 1 | `\bH([1-9])\b` | `AX$1` | Chỉ khi cạnh là chữ "trục", "H" đứng riêng, hoặc trong cột `axis`; **loại trừ** `H` đứng trong ví dụ giờ/hex. Kiểm tay lần đầu trên `_archive/tuyen/goc.md` |
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
