# Đèn vàng – Bàn giao cho session mới

Oct 9, 2026 · @aureliustran. Viết bởi session 66fc65cb để session sau tiếp tục mà không mất ngữ cảnh.

## 0. Đọc theo thứ tự này

1. File này.
2. `claude/brief-giai-doan-2.md`: brief giai đoạn 2 (chương 25–42): timeline, bảng domino, lịch từng chương. Các câu hỏi ở mục 9 phần lớn đã chốt (xem mục 5 file này).
3. `den-vang/01-rules-viet.md`: rules viết, gồm cảnh thân mật và các giới hạn cứng.
4. `den-vang/01c-rules-thanh-phan.md`: cú pháp hiển thị của site.
5. `den-vang/02-mach-truyen.md`: bible, rất dài; đọc theo mục khi cần.
6. `den-vang/11-dan-y-phan-1.md`: dàn ý Phần 1, có ghi chú liên tục và bảng manh mối.
7. Giọng mẫu mới nhất: `den-vang/33-chuong-30-phi-thuyen.md` (POV Thuyên), `den-vang/33b-vay-co-thuyen.md` (POV Diệp Anh), `den-vang/31b-muc-tim.md` (POV Nhi).
8. `claude/lich-su-hoi-thoai.md`: toàn bộ tin nhắn của Aurelius và câu trả lời của Claude, chỉ đọc khi cần tra một quyết định cũ.

## 1. Dự án

Aurelius (Trần Phạm Tuân) đồng sáng tác tiểu thuyết tiếng Việt *Đèn vàng*: học đường, romance, drama, về sau là đấu tranh quyền lực. Nam chính Thuyên (sinh viên năm ba Khoa học Máy tính, Đại học Công nghệ, part-time R&D ở lab Thiên Nhãn tầng 17 của tập đoàn nhà Nhi). Nữ chính Nhi (RMIT, quản trị kinh doanh, học IELTS với Thuyên). Nữ phụ Diệp Anh (Học viện Ngoại giao, người yêu Thuyên từ giao thừa 2027). Anh trai Nhi: Khải (tầng 18, phản diện ngầm Phần 1). Bạn thân: Vũ Béo.

Aurelius nói chuyện bằng tiếng Việt, xưng "t", gọi Claude là "m". Trả lời bằng tiếng Việt, ngắn, thẳng.

## 2. Nơi lưu file và quy trình đồng bộ

- **Nguồn sự thật là Project "Đèn Vàng"** (docs `den-vang/…` cho truyện, `claude/…` cho ghi chú của Claude). Container của mỗi session là tạm thời. Session mới phải `project_read` các file cần sửa về thư mục làm việc (ví dụ `/home/claude/den-vang/`), sửa xong thì `project_write` với `local_path` về đúng path cũ.
- **Site của Aurelius:** `D:\PROJECTS\den-vang-site\den-vang-site\content\import` trên máy anh, truy cập qua các tool `mcp__remote-devices__*`; trong `device_bash` nó là `$HOME/mnt/import`. Chỉ đẩy **file chương và interlude** lên site, không đẩy bible, dàn ý hay rules.
  - Quy trình: copy file vào `/mnt/user-data/outputs/`, rồi gọi `device_commit_files` với `stagedPath`.
  - File đã có trên máy: lấy `mtimeMs` bằng `device_list_dir` rồi truyền `expectedMtimeMs`.
  - File mới: không cần guard.
  - **Cẩn thận:** một số file trên máy đã được Aurelius chạy script (`npm run blocks`, v.v.) nên có thể khác bản trong Project. Đừng ghi đè mù; nếu `mtime` lệch thì stage về so trước.
- **Gửi file cho Aurelius:** dùng `SendUserFile`.
- **Mỗi lần viết hoặc sửa chương:** cập nhật entry trong dàn ý (tên file, "(đã viết: …)", tóm tắt các nhịp, các chỗ cài), và cập nhật bible nếu có canon mới.

## 3. Rules cốt lõi (chi tiết trong 01-rules-viet.md)

- Show, don't tell. Thuyên đọc người giỏi; suy luận của anh là giả thuyết ("có khi nào…"). Thuyên tinh ý nên không bao giờ cụt lủn hay lạnh lùng với người thân.
- **Cảnh thân mật:** gợi dục được, kể cả ánh nhìn lên ngực, eo, hông, đùi, qua mắt POV, từng mảnh, đặt vào phản ứng, không dùng từ thô. **Không mô tả hành vi quan hệ**: cắt ở ngưỡng, mở lại ở sau. Chỉ giữa người trưởng thành, tỉnh táo, đồng thuận có lời. **Không có bất kỳ yếu tố gợi dục nào với nhân vật dưới 18 tuổi**, kể cả trong hồi tưởng. Quấy rối không bao giờ là fan service.
- **Xưng hô:**
  - Diệp Anh – Thuyên: chị – em; cô gọi anh là "bé", "bé ơi". Cô đổi sang anh – em đúng một lần, ở lời hứa chương 30.
  - Nhi – Thuyên: anh – em; anh gọi cô là "kid", "học sinh".
  - Thảo – Thuyên: tớ – cậu.
  - Thảo – Nhi hiện tại: Thảo xưng tôi – cô, Nhi xưng mình – bạn.
  - Ở lab, Thuyên là người nhỏ tuổi nhất.
- Giọng Hà Tĩnh (bố mẹ Thuyên) và tiếng Anh viết bằng `[[ht: gốc || dịch]]` và `[[en: gốc || dịch]]`. Không dùng chú thích cuối trang.
- Viết chương mới **thẳng bằng cú pháp site**: `:::chat` (dòng của người giữ POV là `> câu`, người khác là `Tên: câu`), `:::note`, `:::note ink`, `:::sheet`, `:::editor`, `:::ide`, `:::email`.
- **Đầu file:** `# Chương N: Tên` (interlude thì `# Tên`), dòng `Oct 9, 2026 · @aureliustran.`, rồi dòng ngày in nghiêng.
- **Đặt tên interlude** (mới chốt 9/10):
  - Nhi: một màu có sắc độ (không dùng trắng, xám, đen).
  - Diệp Anh: một món trang phục (*Măng tô*, *Váy cổ thuyền*, *Áo cử nhân*, *Áo dài*).
  - Khải: sắc độ trắng – đen (*Màu xám*: phát hiện; *Đen*: hành động).
  - Chương của Thuyên: tên đồ vật hoặc âm thanh.
- **Tên file:** chương `NN-chuong-XX-ten.md`, với NN = số chương + 2 (chương 1–8) và + 3 từ chương 9 (vì `11-` là dàn ý). Interlude ghép số file của chương đứng trước nó kèm chữ cái (`33b-…`). Chương 25 chưa viết sẽ là `28-chuong-25-hai-phien-ban.md`, đứng sau `27c-nau-ca-phe.md`. Đổi tên file trên site thì phải sửa cả khóa trong `scripts/apply-blocks.mjs` và `apply-chats.mjs`.

## 4. Trạng thái truyện

**Đã viết:** chương 1–30, và các interlude:
- Nhi: 05b, 06b, 09b, 10b, 17b, 20b, 21b, 21c, 24b, 26b, 27b, 27c, 31b.
- Diệp Anh: 33b *Váy cổ thuyền*.

**Chưa viết:**
- Chương 31–42, interlude Nhi *Xanh bạc hà* (đổi tên từ Trắng sứ) và *Xanh lục bảo* (Melbourne, Tết 2027, đặt sau chương 26).
- Interlude Diệp Anh 1 *Măng tô* (dàn ý đặt sau chương 22).
- Phần Đổ vỡ 43–47, *Màu xám* và *Đen* (Khải), *Tím than* (Nhi, đổi từ Đen), *Áo cử nhân*.

**Mốc gần nhất:** chương 30 kết ngày Chủ nhật 11/4/2027. Ngay trước đó là:
- Thuyên nhận Air Blade xanh midnight ("phi thuyền").
- Bị hội "phố" đuổi.
- Lương về, đưa Diệp Anh đi omakase.
- Thú nhận hai phiên bản ở lab; Diệp Anh hứa "Kể cả anh làm kẻ xấu, em vẫn ở bên anh".
- Đêm đầu của hai người.

Chi tiết canon cần giữ: brief mục 6 và "Ghi chú liên tục" trong dàn ý.

## 5. Đã chốt ngày 9/10 và việc tiếp theo

**Đã chốt** (chi tiết trong bible, dàn ý, `claude/brief-giai-doan-2.md`, `claude/brief-nhi-truong-quoc-te.md`):
- **Timeline giai đoạn 2:**
  - Kéo dài đến cuối tháng 7/2027, khóa vào lễ tốt nghiệp Học viện Ngoại giao (Thứ Bảy 24/7).
  - 30/4 Thuyên không về quê: nói dối mẹ, đi Ninh Bình với Diệp Anh.
  - Chương 40–41 là đám giỗ ông nội: 22 tháng Năm âm lịch, Thứ Bảy 26/6/2027 (tiên thường tối 25/6).
  - Lịch từng chương nằm ở dàn ý, mục Lab giai đoạn 2.
- **Domino biến chất ba pha:** thích nghi → thao túng → thủ đoạn chủ động. Năm cái phanh lần lượt bị tháo; điểm chuyển sang chủ động là chương 35. Rule cũ "chỉ thao túng vì bị ép" đã sửa.
- **Nhi:**
  - Học hệ thống trường quốc tế của tập đoàn.
  - Ban đầu không muốn du học vì chữ "gửi sang" (London 2016) và món nợ với anh trai; cố tình chỉ thi IELTS đến 6.5.
  - Các chuyến đi: London 2016, Singapore 7/2022, Melbourne Tết 2027 (interlude *Xanh lục bảo*, chưa viết).
  - Danh sách mai mối, nên tự chọn đi Phần Lan. Khải không du học (canon *Màu be*).
- **Kính:** Nhi đeo kính tròn to, Thuyên đeo kính nửa gọng (chương 28, *Mực tím*). Thang "thua khi nhìn nhau" giữa Thuyên và Diệp Anh (chương 12, 26, 30); chương 36: cô nhìn đi trước.
- **Hai interlude Khải:** *Màu xám* (phát hiện, sau chương 44) và *Đen* (hành động, đêm 22/7, trước chương 46). *Đen* kết bằng cảnh Khải bóc tôm cho Nhi: "Kệ họ." Interlude Nhi *Đen* đổi tên thành *Tím than*.
- **Chương 44:** "Ông là siscon à?" / "Về cẩn thận, Thuyên."
- **Chương 46, Đêm say:**
  - Lý do không đủ TẦM: anh mất việc, cô nhận việc mới.
  - Lý do không đủ TÂM: anh chưa bao giờ hỏi; quê cô ở đâu, cái khung ảnh úp.
  - "Em không yêu chị. Em yêu việc đọc được chị." Lần cuối cô xưng anh – em.

**Việc tiếp theo:**
1. Chương 25 (Hai phiên bản) đã viết ngày 9/10: `28-chuong-25-hai-phien-ban.md`. Giai đoạn 2 viết tiếp từ chương 31.
2. Viết chương 31–42 theo lịch và bảng domino; interlude *Xanh bạc hà*, *Xanh lục bảo*.
3. Còn mở:
   - Tên kẻ ghen (đề xuất Hà My, đang dùng trong bảng domino).
   - Fan service thay thế cho chương 35 và 36 (đề xuất trong brief giai đoạn 2, mục 7).
   - Khải là anh ruột hay anh cùng cha khác mẹ.
   - Quê Diệp Anh (Hải Phòng hay Phú Thọ; giờ là điểm buộc tội ở chương 46, nên Thuyên không được biết).
4. Site: commit `87c78e0` chưa push. Aurelius tự chạy `npm run import -- --overwrite --reorder` rồi `git push` trên máy, vì môi trường của Claude không kết nối được tới Supabase và GitHub.

## 6. Lưu ý kỹ thuật

- Script cũ `renum.py` (đánh lại số chương) có ngưỡng cứng `>=26`, từng gây lỗi đánh số; nếu phải đánh lại số thì viết lại, đừng tái dùng.
- Script chuyển đoạn chat in nghiêng sang `:::chat` (dùng cho chương cũ):

```python
import re,sys
names=('Chủ tọa','Anh Tuấn','Chị Hạnh','Ngọc Anh','Vũ Béo','Học sinh','Khang','Phúc','Mai')
def is_chat(p):
    m=re.fullmatch(r'\*([^*]+)\*',p.strip())
    if not m: return None
    s=m.group(1)
    for n in names:
        if s.startswith(n+': '): return s
    if re.match(r'[a-zđ]',s) and not s.startswith(('nhiệt kế','paracetamol','oresol','khăn','quýt','gạo','kế hoạch','tách','mkdir','as_the_crow','người nghĩ ra','tiền =')): return '> '+s
    return None
for f,out in zip(sys.argv[1::2],sys.argv[2::2]):
    paras=open(f).read().split('\n\n'); res=[]; buf=[]
    for p in paras:
        c=is_chat(p)
        if c: buf.append(c); continue
        if buf: res.append(':::chat\n'+'\n'.join(buf)+'\n:::'); buf=[]
        res.append(p)
    if buf: res.append(':::chat\n'+'\n'.join(buf)+'\n:::')
    open(out,'w').write('\n\n'.join(res))
```

- Kiểm tra liên tục trước khi viết: grep chi tiết trong các chương cũ (ví dụ: chương 22 gối đùi ở phòng trọ Thuyên, không phải nhà ai khác; sẹo lông mày do cùi chỏ năm lớp 11; dầu gội của Nhi là đào rồi bưởi; Diệp Anh thuê phòng 502, tầng 5, ngõ Nguyễn Chí Thanh, giường đơn, kệ sách thấp ở đầu giường).
