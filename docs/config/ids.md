---
id: config.ids
kind: config
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §3, tuyen/README.md, tuyen/goc.md, tuyen/qua-khu/README.md]
---
# ids · Sổ mã, cũ → mới

Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; file này chỉ khai bảng.

**Tên file = mã, duy nhất trong cả vault.** Wikilink `[[mã]]` dùng ở mọi nơi.

## 1. Tiền tố

| Loại | Cũ | Mới | Ví dụ mới |
| --- | --- | --- | --- |
| Trục hiện sinh | `H1`–`H9` | `AX1`–`AX9` | `AX3` |
| Thang hiện sinh | `Nấc-HS` | `EXL` | `EXL 8` |
| Thang kiêu ngạo của Thuyên | `Nấc-TT` | `STEP.pride` `proposed` | `STEP.pride 3` |
| Thang "Nhi thích Thuyên" | `Nấc-RM` | `STEP.rom` `proposed` | `STEP.rom 5` |
| Niềm tin | `NT-nn` | `BL-nn` | `BL-24` |
| Bộ chịu đựng | `TB-n` | `DV-n` | `DV-7` |
| Register | `R1`–`R9` | giữ | `R8` |
| Nhân vật | `NV.` | `CH.` | `CH.thuyen` |
| Nhóm, quần chúng | (mới) | `GRP.` `proposed` | `GRP.hoi-dong-nhi` |
| Bối cảnh | `BC.` | `SET.` | `SET.phong-kin` |
| Vật | `VAT-` | `OBJ-` | `OBJ-12` |
| Bí mật | `BM-` | `SEC-` | `SEC-03` |
| Tuyến cấp 1 | `QK` · `RM` · `TH` · `SL` · `GD` | `PAST` · `ROM` · `THR` · `SOL` · `FAM`; thêm `SELF` | `ROM.TN` |
| Tình tiết | `TN-014` (mã ngắn theo node) | `<node>-<số>` | `ROM.TN-014` |
| Giao điểm | `X-nn` | giữ | `X-09` |
| Quyết định | `D-nnn` | giữ | `D-031` |
| Câu hỏi | `Q-nnn` | giữ | `Q-045` |
| Điều hiến pháp (mới) | — | `ART-<trục>.<số>` · `ART-0.<số>` | `ART-AX3.1` |
| Luật (mới) | — | `LAW.<khía cạnh>.<phạm vi>` | `LAW.naming.pov-thuyen` |
| Hàm (mới) | — | `fn.<nhân vật>.<tên>` | `fn.thuyen.phong-kin` |

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
| 10 | `Nấc-HS` · `Nấc-TT` · `Nấc-RM` | `EXL` · `STEP.pride` · `STEP.rom` | |
| 11 | `\[chốt (\d\d/\d\d)\]` | `` `locked $1` `` | Chỉ trong tài liệu thiết kế; **không đụng** `content/` |

Mã cũ không bị xóa: mỗi file đích thêm vào `aliases` mọi mã cũ của nó (ví dụ `CH.thuyen` có alias `NV.thuyen`, `thuyen`).

## 6. Không đổi

`R1`–`R9`, `X-nn`, `D-nnn`, `Q-nnn`, thang `D…SSS`, tên định danh riêng của truyện (`thuyen`, `phong-kin`, `cai-goi`, `thuoc-giam-dau`).

## 7. Va chạm cần kiểm trước khi chạy script

- Chữ `H` + số trong văn bản khác (ví dụ "H1" trong tên file `H1.md`), chữ `HP` trong từ khác.
- `TH` + `.` trong số thập phân/viết tắt thông thường; script chỉ khớp khi theo sau là mã node đã khai ở §3.
- `STEP.pride`/`STEP.rom` là tên đề xuất của Claude; nếu tác giả muốn tên khác, sửa ở đây và script theo.
