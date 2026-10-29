# Đèn vàng – Plan nâng cấp tin nhắn và ragebait

Oct 10, 2026 · @aureliustran.

Bổ sung cho `claude/plan-sua-thoai-ca-truyen.md` (§4 tin nhắn). Chỉ đạo 10/10:
- Người Việt nhắn tin kéo chữ, thêm icon cuối câu.
- Mỗi người có bộ emoji riêng.
- Tăng ragebait của Thuyên cả trong thoại lẫn tin nhắn.
- Nền tảng chính là Messenger, Zalo, Instagram.


## 0. Chốt 10/10 (sau duyệt)

- Bảng nền tảng §3: duyệt.
- **Thuyên nũng Diệp Anh dùng 😭🥺.** Bộ 💔🥀☠️ chỉ để chọc (ví dụ "son🥀🥀🥀").
- **Thứ tự: viết lại tin nhắn trước, site sau.** Chưa gắn nhãn nền tảng vào tiêu đề khối, để làm cùng phần site.
- **Diệp Anh nhắn tin (thay §4 cũ):**
  - Có biểu cảm. Không chấm câu: mỗi câu một tin, viết hoa đầu dòng, đứng thẳng như một dòng biên bản.
  - Bộ emoji: 🙂 (lịch sự mà nguy hiểm), 😌, 🙄, 👀, 🤭, 🫠, 📝, 📌, 🤍; `=))` là mốc cô cười thật (lần đầu ở ch.22). Ngoài ra "Hừm" đứng riêng một tin.
  - **Dấu chấm thành bức tường:** cô chỉ đặt dấu chấm khi đóng cửa, như lúc ốm (ch.27: "8h.", "Chị ổn.", "Ừ."), lúc về quê Tết (ch.25: "Ừ."), "*Về cẩn thận.*" (33b), và sau ván cược (ch.36+, dấu chấm quay lại dần).
  - Những tin nặng (tín hiệu) giữ trơn, không icon: "Người ta sẽ nghĩ gì nếu chị đến?", "Ở đấy không ai biết chị", "Chị chụp lúc em chưa biết chị đang nhìn".
  - Mốc ch.29 đổi thành: câu đầu tiên cô chẻ đôi giữa chừng, tin sau không viết hoa ("Chị muốn" / "có người mang đến").
- Khải: giữ dấu chấm, câu đủ (đối lập Diệp Anh).
- Thoại nói của Diệp Anh: thêm biểu cảm ở một đợt riêng (đợt E), sau tin nhắn.
- **Luật emoji (chốt 10/10, xem `den-vang/01d` §5):** emoji có thể là tin riêng; giảm kết thúc câu bằng emoji; giảm tần suất; khi có emoji thì đặt cuối, chèn giữa, hoặc tách tin; "?", "??" cũng là một tin. Bản viết lại đợt C đang dùng emoji dày hơn luật này, cần một lượt tỉa (đợt C2), chưa làm.

## 1. Hiện trạng

- Khoảng 230 khối `:::chat` trong 38 file. Nhiều dòng nhất là Chủ tọa (160), Vũ Béo (120), Học sinh / Học sinh hồng (30), Anh Tuấn (14), Phanh Gấp (14).
- **Cả truyện chỉ có khoảng 45 emoji,** phần lớn là 🔥 ❤ 🏀 🎀. Không có `=))`, `:))`, `:v`, gần như không ai kéo chữ.
- Không khối nào ghi nền tảng. Chỉ một vài khối có tên nhóm (*Pickup tối T7 🏀*, *Thiên Nhãn – Cả nhà ❤️*).
- Hệ quả: tin nhắn đọc như thoại được gõ lại, sạch quá. Chưa thấy ai đang cầm điện thoại.

## 2. Nguyên tắc chung: cách người Việt nhắn tin

| Kỹ thuật | Ví dụ | Ghi chú |
| --- | --- | --- |
| Kéo chữ | "thôiii", "okkk", "anhhh", "điii mà", "hảaa" | Kéo ở chữ cuối câu. Càng dài càng nũng hoặc càng trêu |
| Icon cuối câu | "đi ăn k 😋", "m chết r 🖕" | Icon thay cho giọng nói, nên đặt cuối câu |
| Emoticon chữ | `=))`, `:))`, `:v`, `:3`, `^^`, `:)` | Số ngoặc là thước đo: `=))` cười, `=)))))))` cười lăn. `:)` một ngoặc là đáng sợ |
| Lặp emoji | 😡😡😡, 😭😭😭 | Lặp ba là đùa; một cái là thật |
| Teencode vừa phải | k, r, đc, ntn, nma, z, j, ib, nt | Không lạm dụng (không "j z tr"), người đọc phải đọc được |
| Nhiều tin ngắn liên tiếp | 4–6 dòng một người | Cách người ta "nói" bằng tin nhắn |
| React thay trả lời | (😆 dưới tin) | Một cách trả lời không cần chữ |
| Seen, thu hồi, đang nhập | "~ Đã xem", "~ Vũ Béo đã thu hồi một tin nhắn", "~ Nhi đang nhập…" | Công cụ kể chuyện mạnh nhất của tin nhắn |
| Sticker, voice, ảnh | `[sticker mèo khóc]`, `[tin nhắn thoại 0:14]`, `[ảnh]` | Mẹ Thuyên sống bằng voice |
| Tin nhắn trống nghĩa | "?", ".", "…" | "?" là thách, "." là xong chuyện |

**Tách tin (chốt 10/10).** Một câu nói được chẻ ra nhiều tin, vì người ta gõ theo nhịp nghĩ, không theo nhịp câu:
- **Tiếng bật đứng riêng một tin:** "Ơ", "Hả", "Ủa", "Ê", "Này", "Thầy", "Anh". Bật trước, nội dung sau. Tiếng bật một mình là tin gọi người kia ngẩng lên.
- **Chẻ theo ý:** "Ơ" / "M ngáo à cu" / "Đèo mẹ 5h chưa về". Mỗi tin là một nhịp cảm xúc: ngạc nhiên, chửi, lý do.
- **Gọi tên rồi mới hỏi:** "Thầy" / "Mai còn học k". Tin gọi tên đứng một mình tạo một khoảng chờ, người nhận biết sắp có chuyện.
- **Ai chẻ nhiều, ai chẻ ít:**
  - Vũ chẻ nhiều nhất, 3–6 tin một ý.
  - Nhi chẻ theo cảm xúc. Khi ngượng thì chẻ rồi bỏ lửng: "Anh" / … / "À k có gì".
  - Thuyên chẻ ít, không bao giờ gửi tiếng bật riêng. Nếu chẻ thì là để trêu: "ok" / "kid" / "😏".
  - Diệp Anh gần như không chẻ, một tin là một câu đủ. Lần đầu cô chẻ là một mốc.
  - Khải không bao giờ chẻ.
- **Viết hoa đầu tin** theo bàn phím điện thoại (Vũ, Nhi, đa số người khác). Thuyên tắt tự viết hoa, gõ thường toàn bộ: một dấu vân tay.
- **Kho của Vũ thêm:** "đèo mẹ", "cu", "ngáo", "đéo".

**Luật chống rối:**
- Tối đa khoảng 1 emoji mỗi 2 tin ở người ít dùng. Người dày (Vũ, Nhi) không giới hạn, nhưng mỗi khối phải có ít nhất một tin không emoji, để emoji còn nghĩa.
- Cảnh nặng (rạn nứt, chia tay, trầm cảm): emoji rút gần hết. **Sự vắng emoji là tín hiệu.**
- Thoại nói không dùng emoji hay emoticon. Chỉ tin nhắn mới có.

## 3. Nền tảng

| Nền tảng | Ai, quan hệ nào | Vì sao |
| --- | --- | --- |
| **Messenger** | Thuyên – Vũ, nhóm *Pickup tối T7 🏀*, CLB Tin học, Thuyên – Nhi (từ sau buổi học đầu), Thuyên – Diệp Anh (sau MUN) | Kênh bạn bè, sinh viên |
| **Zalo** | Bố mẹ Thuyên, họ hàng, nhóm lab *Thiên Nhãn – Cả nhà ❤️*, sếp Tuấn, chị Hạnh, Khải (việc), Thảo (việc); trong nhà Nhi: bố, Khải, chị Trang | Kênh công sở và gia đình ở Việt Nam |
| **Instagram DM** | Nhi nhắn Thuyên lần đầu (thấy anh trên page trường, "anh phanh gấp / trả thiệp cho em"); reply story (Nhi, Diệp Anh, Vũ thả 🤮 vào story cringe); Đăng (quá khứ Nhi) | Kênh người lạ, kênh story |
| **Locket** | Ảnh thô, không phải chat | Giữ như hiện tại |

Đổi kênh là một mốc quan hệ. Nhi chuyển từ Instagram sang Messenger, Diệp Anh nhắn Zalo khi đã làm cho tập đoàn. Người kể không cần nói, chỉ đổi skin.

## 4. Hồ sơ nhắn tin từng nhân vật

### Thuyên: react bằng emoji, không react bằng chữ

Cùng logic với thoại (10/10): chữ của anh được kiểm soát, không có "ơ", "hả". Phản xạ, trêu ngươi, khiêu khích đều đẩy hết sang emoji. Chữ thì lạnh, icon thì láo.

- **Gõ:** viết thường, không dấu chấm câu, viết tắt. Với Diệp Anh viết "e", "c".
- **Bộ emoji:** 🖕 🥶 😱 😏 ☠️ 💔 🥀 `:v` 😈 😡😡😡. Toàn trêu ngươi, gần như không dùng emoji thật lòng.
- **Kéo chữ:** chỉ khi chọc ("kiddd", "ezzz", "ggg") hoặc nũng Diệp Anh ("chị béee", "đi màaa").

| Với ai | Cách nhắn |
| --- | --- |
| **Vũ** | Ragebait tối đa: "gg ez 🖕", "skill issue ☠️", "6 7 😈", react 😏 thay cho trả lời, gửi lại ảnh Vũ nhắm mắt kèm 🥀 |
| **Nhi** | Chọc: "kiddd 😏", "học sinh cãi thầy à 😈", "ok kid 🥶", ghép đôi Nhi với ai đó kèm 😱. Hỏi lại bằng một chữ "?" cho cô cay |
| **Diệp Anh** | Đùa ngang tốc độ, ít emoji trêu. Nũng thì bi kịch hóa: "chị k rep e 3 phút r 💔🥀", "e chết rồi ☠️ chị nhớ đến đám" |
| **Đàn em** (Ngọc Anh, Hưng) | Đủ ý, tử tế, tối đa một `:v` |
| **Lab (Zalo)** | "Dạ em nhận ạ", "Em gửi anh bản sửa ạ". Không emoji. Với sếp: "Dạ anh 🙏" (mặt nạ). Đặt cạnh tin với Vũ cùng chương để thấy hai người |
| **Bố mẹ (Zalo)** | "Dạ", "con ăn r", không emoji |

**Theo arc:**
- **Giai đoạn 2 (ch.30+):** emoji trêu ngươi với Vũ thưa dần. Dấu chấm bắt đầu xuất hiện ("ok."). Giọng Zalo công sở lấn sang Messenger.
- **Rạn nứt:** tin cuối gửi Vũ không có icon.
- **Trầm cảm:** đã xem không trả lời, hoặc chỉ ".".
- **Làm lành:** cái 🖕 đầu tiên gửi Vũ là lời xin lỗi thật nhất.

### Vũ: chửi bằng icon

- **Gõ:** tắt nhiều, chửi tắt (đm, vcl, vl, cc). Năm sáu tin liên tiếp, CAPS khi gào, "?????", chụp màn hình, voice, ảnh đồ ăn.
- **Bộ emoji:** 🖕 😡 😅 🤡 👎.
  - 🤡 dán cho Thuyên khi cringe (story, aura farming).
  - 👎 cho story nghệ thuật.
  - 😅 khi chính Vũ ngại hoặc né (khoe ghen tị, nhắc chuyện tiền).
- **Cười:** `=)))))` dài.
- **Khi nghiêm túc:** không emoji, câu đủ chữ, có dấu. Ví dụ: "Tao hỏi thật đấy." Đổi giọng gõ là đủ để người đọc biết.

### Nhi: mọi thể loại

- **Gõ:** emoji dày nhất truyện, đủ loại: 🎀 🩷 🥹 😭 ✨ 😤 🙄 🫶 🐱 💅 🥺 🤧 😶. Kéo chữ ("anhhh", "thôiii", "hứ"), "!!!!", "??", CAPS khi tức. Sticker mèo. Một tin dài rồi một tin "à thôi". Thu hồi tin.
- **Hai trạng thái như thoại:**
  - Chắc thì bùng nổ emoji.
  - Ngượng hoặc nói về Thuyên thì "đang nhập…" rồi tắt, gửi đúng một icon thay câu (🙂 hoặc 😶), hoặc thu hồi.
- **Theo arc:**
  - Trước Thảo (27b, 27c): tin nhắn câu đủ, có dấu, không emoji, như thư. Cô mất giọng cả khi gõ.
  - Phần 2: emoji rút dần (cứng lại).

### Diệp Anh: thang emoji theo độ thân

- **Gõ:** viết hoa đầu câu, dấu chấm đủ, "Noted.".
- **Thang:**
  1. Không emoji (ch.12–15).
  2. `:)` một ngoặc: nguy hiểm, Thuyên đọc ra là đang bị chấm điểm.
  3. `=))` lần đầu: mốc, cô cười thật.
  4. Một 🤍 (old money, không bao giờ ❤️): sau ch.22.
  5. Gõ thiếu dấu chấm cuối câu.
- **Sau ván cược (ch.36+):** quay về bậc 1–2, dấu chấm trở lại. Người đọc thấy, Thuyên thì không.
- **Reply story Instagram:** chỉ "Đẹp." hoặc 🔥.

### Những người còn lại

| Người | Nền tảng | Cách nhắn |
| --- | --- | --- |
| **Khải** | Zalo | Câu đủ, ngắn, "Ok em.", 👍 (emoji của sếp). Không bao giờ `=))`. Với Nhi: "Ăn gì chưa em." / "Anh về muộn." |
| **Anh Tuấn** | Zalo | 👍 🙏 😂 đặt sai chỗ, 🔥🔥🔥 trong nhóm "Cả nhà ❤️", sticker hoa hồng, "ok e". Tin khuya "e ngủ chưa 😊" viết như thứ khó chịu, không bao giờ thành fan service |
| **Chị Hạnh** | Zalo | `^^`, "hihi", "e ơiii", 🥰, 🤫 ("chị kể e nghe cái này 🤫"), voice message |
| **Hà My** | Zalo | `=)))`, 😭😭, "trời ơi", chụp màn hình |
| **Trâm** | Zalo | Ít; gõ rồi thu hồi |
| **Anh Bảo** | Zalo | "ok", ".", không emoji, dán log |
| **Thảo** | Zalo | Câu đủ, có dấu, "Mình làm xong rồi." Không emoji. Một lần duy nhất 🙂 về sau là một mốc |
| **Ly** | Zalo | "dạ ạ", "e cảm ơn ạ 🥺" |
| **Mẹ Thuyên** | Zalo | Voice là chính. Chữ thì không dấu ("con an com chua"), sticker hoa của Zalo, ❤️ to |
| **Bố Thuyên** | Zalo | "Ừ.", 👍 (mới học). Không quá năm chữ |
| **Ngọc Anh, Hưng, Linh** | Messenger | Gen Z: "anh ơii", 😭😭, 🥹, "real", "slay" (Linh) |
| **Đức** | Messenger | Tôi – ông, gọn, `:))` |
| **Đăng** (quá khứ Nhi) | Instagram | "e ngủ chưa", 😏, giả chill, rồi "a xấu hổ lắm" |

## 5. Ragebait của Thuyên: thoại và tin nhắn

Rule cũ: thân thì rage bait, người lạ chỉ được mỉa. Nâng cấp cho dày và sắc hơn, nhưng vẫn giữ giới hạn đối tượng.

**Kho thoại nói** (không "ơ", "hả": anh khiêu khích bằng câu bình thản):
- Hạ bằng lời khen: "Ném đẹp đấy. Cho lớp bảy." / "Em tiến bộ rồi. Giờ nói chuyện như mười lăm tuổi."
- Thuật ngữ mạng: "Skill issue." / "Cope đi." / "Gg ez." / "Kid." / "Six seven." / vuốt hàm "sigma".
- Giả vờ không nghe: ăn tiếp, đổi chủ đề, "Mày vừa nói gì? Tao đang bận thắng."
- Bình tĩnh quá mức đúng lúc người kia đang cay: "Bình tĩnh. Tức là thua hai lần."
- Ghép đôi: ghép Nhi với ai đó, ghép Vũ với cô tổ dân phố thu tiền rác.
- Trả lời câu hỏi bằng một câu hỏi lạc đề.

**Kho tin nhắn:** "?", react 😏, sticker thay trả lời, gửi lại ảnh xấu của người ta kèm 🥀, "gg 🖕", "skill issue ☠️", "kiddd 😈", "😡😡😡" khi giả vờ giận.

**Đối tượng:** Vũ (nặng nhất), Nhi (chọc đến cay, có lúc đến khóc, F2), Hưng và đám năm nhất, Diệp Anh (nhẹ, chuyển thành nũng). Không bao giờ dùng với lab, sếp, người lớn, Thảo, Ly.

**Theo arc:**
- **Ch.1–30:** dày, vui. Đây là Thuyên lúc thoải mái.
- **Giai đoạn biến chất:** ragebait với người thân thưa dần, chuyển sang mỉa độc với người ngoài. Đỉnh là "Ông là siscon à?" với Khải (canon): ragebait đặt sai người, thành tự hại.
- **Sụp đổ, trầm cảm:** không còn.
- **Phần Lan:** câu đùa đầu tiên là "đang tính trộm xe đạp", ragebait quay lại.

## 6. Hỗ trợ trên site (đề xuất, cần anh duyệt)

Cú pháp hiện tại đã có tiêu đề khối (`:::chat Tên nhóm`), trả lời (`^`) và dòng ghi chú (`~`). Đề xuất thêm:

1. **Skin theo nền tảng:** `:::chat messenger · Pickup tối T7 🏀`, `:::chat zalo · Thiên Nhãn – Cả nhà ❤️`, `:::chat insta`. Từ khóa đầu đổi màu bong bóng (Messenger xanh tím, Zalo xanh dương, Instagram gradient) và hiện nhãn nhỏ. Không có từ khóa thì giữ như cũ.
2. **React dưới tin:** cuối dòng viết `{😆}` hoặc `{😆 3}` → huy hiệu nhỏ ở góc bong bóng.
3. **Tin chỉ có emoji** (1–3 emoji): tự phóng to, như Messenger.
4. **Dòng hệ thống:** dùng sẵn `~` cho "Đã xem", "đã thu hồi một tin nhắn", "đang nhập…", style nhạt hơn.
5. **Reply story:** `^ [story] mô tả ảnh` → khung trích có nhãn "Đã trả lời tin của bạn".

Phần code nằm ở `src/lib/markdown.ts` (chatExtension) và `global.css`, kèm test trong `tests/`.

## 7. Ví dụ trước và sau

**Vũ (mẫu của anh):**

```
:::chat messenger
Vũ Béo: Ơ
Vũ Béo: M ngáo à cu
Vũ Béo: Đèo mẹ 5h chưa về
:::
```

**Nhi (mẫu của anh):**

```
:::chat messenger
Học sinh hồng: Thầy
Học sinh hồng: Mai còn học k
> còn. kid quên à 😏
:::
```


**Ch.12, Vũ hỏi chuyện derby:**

```
:::chat messenger
Vũ Béo: Ơ
Vũ Béo: DERBY??????
Vũ Béo: Hôm nay có việc gì to à cu 😅
> đi làm chuyên gia 😏
Vũ Béo: Chuyên gia cc 🤡
> chuyên gia đứng một chỗ nói 15p rồi bị hỏi
Vũ Béo: Thế khác đéo gì thi vấn đáp
> khác. thi vấn đáp k có bữa trưa 😈
Vũ Béo: Đm 🖕
Vũ Béo: Nhớ chụp ảnh đồ ăn
:::
```

**Ch.1, nhóm pickup:**

```
:::chat messenger · Pickup tối T7 🏀
Vũ Béo: Ê
Vũ Béo: Tối nay ra k m
Vũ Béo: Mấy đứa năm nhất đòi gặp "idol" kìa vcl =)))))
Vũ Béo: M mà k ra t bảo m bận đi Mỹ 🤡
> idol cc. ok vua hợi 🖕 tối tính
:::
```

**Nhi lúc ngượng:**

```
:::chat messenger
Học sinh hồng: Anh
Học sinh hồng: Anh ơiii
Học sinh hồng: Hôm nay anh ném đẹp lắm á 🥹✨
~ Học sinh hồng đã thu hồi một tin nhắn
Học sinh hồng: 🙂
> ?
Học sinh hồng: K có gì!!! 😤
Học sinh hồng: Thứ 5 nhớ đến đúng giờ đấy nhá 🎀
:::
```

**Diệp Anh, bậc 2 lên bậc 3:**

```
:::chat messenger
> chị ơi e vừa thấy story chị, trà gạo rang mà chị chụp như rượu vang 🥶
Chủ tọa: :)
> e xin lỗi 💔🥀
Chủ tọa: =))
Chủ tọa: Em được miễn tội một lần.
:::
```

## 8. Kế hoạch triển khai

1. **Đợt A, site:** skin nền tảng, react, emoji phóng to, dòng hệ thống, reply story. Có test. Anh duyệt thì em làm.
2. **Đợt B, gắn nền tảng:** đặt nhãn cho khoảng 230 khối chat theo bảng §3. Kiểm tra canon kênh liên lạc (Nhi nhắn lần đầu qua Instagram ở ch.11).
3. **Đợt C, viết lại tin nhắn theo nhân vật:**
   - Vũ (120 dòng): ch.1, 9, 11, 12, 20, 23, 30.
   - Nhi (Học sinh, Học sinh hồng, interlude).
   - Diệp Anh (160 dòng Chủ tọa, chỉ thêm lớp emoji theo thang, không viết lại câu đã tinh chỉnh).
   - Lab Zalo, bố mẹ, quá khứ Nhi (24b, 26b).
4. **Đợt D, ragebait thoại nói của Thuyên:** quét ch.1–30, các cảnh với Vũ, Nhi, Hưng. Thêm 1–3 câu mỗi cảnh theo kho §5, không phá nhịp cũ.
5. **Kiểm tra:**
   - Mỗi khối: che tên đi vẫn đoán được ai gõ.
   - Cảnh nặng: emoji rút.
   - Đếm emoji theo chương để thấy đường arc (Vũ – Thuyên dày rồi tắt ở rạn nứt; Diệp Anh lên thang rồi tụt).

## 9. Cần anh chốt

1. Bảng nền tảng §3, đặc biệt: Nhi nhắn lần đầu qua Instagram, lab và gia đình dùng Zalo.
2. Có làm phần site (§6) không, hay chỉ ghi nền tảng bằng chữ trong tiêu đề khối?
3. Thuyên với Diệp Anh có dùng bộ emoji trêu ngươi (💔🥀☠️) khi nũng như ví dụ không?
4. Thứ tự: site trước rồi viết lại, hay viết lại trước (dùng cú pháp mới, site làm sau)?
