# Converting a chapter for truyennhaong.vn (Truyện nhà Ong, TNO)

Instructions for Claude. The author asks in chat ("chuyển chương 1–5 cho nhà Ong"),
Claude follows this file. Code checks the result afterwards (`crosspost check`),
so a conversion that changes the story is rejected, not posted.

> TNO reviews every chapter by hand (BTV, 1–7 working days) and rejects anything
> that looks AI-abused, without explanation. The story text is the author's; the
> conversion only changes markup. Never "polish" prose to look more human or more
> correct: that is exactly what the editors flag, and it breaks the sync with Vercel.

## Workflow

1. `npm run crosspost -- pull truyennhaong --range 1-5` (or `--all`, `--only slug,slug`).
   This writes each chapter that needs converting to
   `crosspost/work/truyennhaong/<file>.source.md`, plus `manifest.json`.
   Only chapters that are live on Vercel and inside the teaser limit are pulled.
2. For each source file, write the converted text to
   `crosspost/out/truyennhaong/<same file name>.txt`, following the rules below.
   Read the whole source file first; never write from memory or from a summary.
3. `npm run crosspost -- check truyennhaong` and fix every problem it reports.
   Repeat until it prints OK for every chapter.
4. `npm run crosspost -- check truyennhaong --save` stores the versions in Supabase.
   The author then picks chapters in /admin/crosspost and presses Đồng bộ.

## Links, footer and TNO's own save check

- **No links, no URLs, no site names to go to** until TNO's editors have approved
  links by hand. `config.json` has `"linksAllowed": false`, so code adds no footer
  at all, the worker refuses to send a link, and `check` rejects one. The author
  turns it on only after the BTV says yes in "Trao đổi với BTV".
- TNO runs a lint when "Lưu" is pressed and **refuses to save** above 10 errors
  per 1000 words. It counts `—` (em dash), a space before `, . ! ?`, and a
  lowercase letter after `. ! ?`. `crosspost check truyennhaong` runs the same count
  and prints it. Never change the story to pass it: report the chapter, the
  author fixes the source on Vercel. (Đèn Vàng is at most ~4/1000 today.)
- TNO also highlights "sensitive" words (its list includes `ca ca`, `tự tử`,
  `phụ thân`, political names). They do not block saving; leave them as written.

## What the site can show

To verify on a draft before the first real post, and update this section:
whether the TNO chapter editor keeps *italic* / **bold**, single line breaks
inside a paragraph, and emoji. Until verified, convert as if it keeps italic,
bold and line breaks but deletes emoji (same as rookies), so the result is safe
either way.

Known from TNO's own guide:
- Every line break starts a new **trường đoạn** (segment) with its own like and
  comment icons, unless the author groups segments by hand in the editor. Many
  one-line paragraphs make the page noisy, so keep a block (chat, list, note) as
  one paragraph with single line breaks, never one blank-line paragraph per line.
- 18+ or gory content must carry a warning for readers. The chapter warning is
  set in the editor by the author, not written into the converted text.

## Output format

- Plain text. One blank line between paragraphs. A single line break inside a
  paragraph is kept as a line break (use it for lists of messages, lines of a note).
- `*italic*` and `**bold**` are allowed. Nothing else: no headings, no links, no HTML,
  no tables, no `>` quotes.
- A scene break (`---` in the source) becomes a line with only `* * *`.
- Do NOT write the chapter title, the date line, or any footer/links. Code adds them
  (on TNO: the date line only, no footer while links are not allowed).

## TNO presentation rules (Quy tắc trình bày)

Source: https://truyennhaong.vn/vanphong/quy-tac-trinh-bay. The BTV asked the
author to "thống nhất cách trình bày thoại" (use one dialogue style throughout).
Đèn Vàng already writes all dialogue in straight double quotes, which is TNO's
rule I.2, so the job is to keep it uniform and not introduce a second style.

What the conversion does (markup only, allowed):

1. **Dialogue stays in quotes, one style only.** `"…"` as written. Never turn a
   line into dash dialogue (`- Con đi học có vui không?`), and never start any
   other line with `- ` or `– `: on TNO a line that starts with a dash reads as
   dash-style dialogue, i.e. a second dialogue style.
   - List items (glossary lines, to-do lists, notes, `:::note` items) start with
     `• ` instead of `– `/`- `. Example from Chapter 2:
     `• *Mi mua cái ni à? / Tiền mô?*: Mày mua cái này à? / Tiền đâu?`
   - Curly quotes (“ ”) if any appear become straight `"`; single quotes stay.
2. **Inner thoughts / murmured speech** (rule II): TNO accepts quotes or italic.
   Keep the source's form exactly: italic stays italic, quoted stays quoted. Do
   not convert one into the other.
3. **Chat, notifications, emails, documents** (rule II, "tiếng loa thông báo":
   brackets/quotes allowed as long as readers understand). The bracketed italic
   labels below (`*[Tin nhắn – …]*`, `*[Email]*`…) are that note to the reader.
   Inside a chat, `Name: text` is a transcript, not a script-style dialogue:
   keep it under its label.
4. **Annotation dashes** (rule III, `Anh trai tôi - người … - là…`) are the
   author's punctuation: keep exactly as written (` – ` or ` - `).

What the conversion must NOT fix (the hard rule wins: words and punctuation
stay exactly as in the source). If a chapter breaks one of these, list it in
the report to the author with file and line; the author fixes it in the Vercel
source, then the chapter is pulled and converted again, so both sites stay the
same text:

- **No space before closing punctuation** (`. , ! ? ; :`). Not a violation: a chat
  message that is only `?` or `???` (`Vũ Béo: ?`).
- **A space after `…`** before the next word. Not a violation: `…` opening a line
  of speech (`"…À."`), stuttering (`*t…t…t…*`).
- **No 4+ dots or `……` as ellipsis.** Not a violation: blank fill-in lines in a
  document (`Đại diện Bên A: ……………………` in a contract).
- **Avoid a whole sentence of shouting in capitals**; describe the shout in the
  narration instead. Not a violation: signs, banners, labels, acronyms (`VIP`,
  `BÀN LÀ`, `TẤT NIÊN 2026 – THIÊN NHÃN: VƯƠN TẦM`).
  Known case: Chapter 30, `"VẶN GA ĐI THẰNG NGU."` (author's call; report, never
  lowercase it in the conversion).

## The one rule that matters most

Change only the markup. Every word of the story stays exactly as written:
spelling, slang, swearing, punctuation, line order, paragraph order. Do not
fix typos, do not translate, do not summarise, do not add explanations. If
something cannot be shown, describe its *form* in a short bracketed label
(see below), never its content.

## Blocks

### Text messages: `:::chat [Group name]`

```
:::chat CLB Tin học – Ban điều hành
Ngọc Anh (K71): Anh Thuyên ơii
> ok trưa a xem
^ Ngọc Anh (K71): Nhưng phần demo em vẫn sợ sợ 🥲
~ Nghĩ một chút, anh gõ thêm:
:::
```
becomes one paragraph, one message per line:
```
*[Tin nhắn – CLB Tin học – Ban điều hành]*
Ngọc Anh (K71): Anh Thuyên ơii
› Trả lời Ngọc Anh (K71): Nhưng phần demo em vẫn sợ sợ :')
Thuyên: ok trưa a xem
*Nghĩ một chút, anh gõ thêm:*
```
- No group name → `*[Tin nhắn]*`.
- `Name: text` stays exactly `Name: text`.
- `> text` is a message sent by the point-of-view character: write `<their name>: text`.
  Work out the name from the surrounding prose (e.g. "Thuyên gõ:"). If it is not clear, write `Tôi: text`.
- `^ Name: text` is the message being replied to: `› Trả lời Name: text`, on the line
  before the reply.
- `~ text` is a small note between messages: put it on its own line in *italic*.
- A message line with no name stays as it is.

### Email: `:::email`
```
*[Email]*
Từ: …
Đến: …
Chủ đề: **…**

Body paragraphs as written.
```
Keep every header line in the source order. `---` inside an email is just the
divider between headers and body: drop it.

### Text editor / IDE: `:::editor file.md`, `:::ide file.py`
`*[file.md]*` (the file name as written), then every line exactly as typed, one
per line, in one paragraph. Keep `$ ` at the start of shell commands. Keep code
exactly as typed, even when it contains `*` or `_` (the editor may then show a
pair of `*` as italic; that is acceptable).
A Markdown heading line inside the file (`# Problem`) is kept as typed but wrapped
in bold (`**# Problem**`), because the checker rejects lines starting with `# `.

### Handwritten note: `:::note [ink] Title`
`*[Ghi chú viết tay – Title]*` (`*[Ghi bên lề sách – Title]*` for `ink`), then the
lines. A list item becomes a line starting with `• ` (never `– `, see TNO rule 1).

### Phone note: `:::phone [Title]`
`*[Ghi chú điện thoại – Title]*` (or `*[Ghi chú điện thoại]*`), then every line of the
block as a line. Keep blank lines between groups of lines as paragraph breaks.

### Lock-screen notifications: `:::notifications 18:00 · Thứ Sáu, 28 tháng 5`
`*[Màn hình khóa – 18:00 · Thứ Sáu, 28 tháng 5]*`, then one line per notification,
written as `09:00 · Email · Khối Công nghệ: Đánh giá 360 độ (hạn 4/6)`
(time, ` · `, then the line as typed).

### Spreadsheet: `:::sheet File name`
`*[Bảng tính – File name]*`, then the header row and each data row as one line,
cells joined with ` | `. Row states: `[x]` → `(xong)` at the start, `[~]` → `(đang chờ)`.
An empty cell or `(trống)` → `(trống)`.

### Translated passage: `:::dich en` / `:::dich ht`
The original paragraphs as written, then the translation paragraphs in italic,
the first one starting with `*Dịch:` (`*Dịch tiếng Hà Tĩnh:` for `ht`).

## Inline translations

`[[en: original || bản dịch]]` and `[[ht: original || bản dịch]]` become
`original (bản dịch)`. Keep the original exactly; the translation goes in
round brackets right after it. If the phrase is already inside round brackets,
use ` – ` instead: `(original – bản dịch)`.

## Emoji

The site deletes emoji, so replace each one with its text in this table, keeping
the space before it. The same emoji always gets the same text. If an emoji is
not in the table, pick a short natural replacement, use it, and add it to the
table in the same change, here and in `../rookies/convert.md` (same emoji, same text on every site).

| Emoji | Write |
|---|---|
| 🥲 | :') |
| 😂 🤣 | =)) |
| 😆 😁 😄 | :D |
| 🙂 😊 | :) |
| 😉 | ;) |
| 😏 | (nhếch mép) |
| 😈 | (cười gian) |
| 😱 | (hoảng) |
| 😭 😢 | :(( |
| 😡 😠 | (cáu) |
| 🤡 | (hề) |
| 🖕 | (giơ ngón giữa) |
| 👎 | (chê) |
| 👍 | (like) |
| ❤️ ♥️ | <3 |
| 🙏 | (vái) |
| 🏀 | (bóng rổ) |
| 🔥 | (lửa) |
| 🎉 | (tung hoa) |
| 👀 | (liếc) |
| 🙄 | (đảo mắt) |
| 😅 | (cười trừ) |
| 🥺 | (năn nỉ) |
| 😌 | (mãn nguyện) |
| 🥶 | (lạnh run) |
| 🎀 | (nơ hồng) |
| 😤 | (hừ) |
| 📝 | (ghi chép) |
| 🫠 | (tan chảy) |
| 🤍 🩷 | <3 |
| 💔 | </3 |
| 🥹 | (rưng rưng) |
| 🤭 | (che miệng cười) |
| 🥰 | (cười tít) |
| 😘 | (hôn gió) |
| 🤫 | (suỵt) |
| 🫡 | (chào) |
| 👋 | (vẫy tay) |
| 👊 | (đấm) |
| 💅 | (sơn móng) |
| ☠️ | (chết) |
| 🥀 | (hoa héo) |
| 🌹 | (hoa hồng) |
| 🌸 | (hoa) |
| 📌 | (ghim) |
| 📸 | (chụp ảnh) |
| ✍️ | (ghi) |
| 🔍 | (tìm) |
| 📘 | (sách) |
| ☂️ | (ô) |
| 🌧️ | (mưa) |
| 🐟 | (con cá) |
| 🍵 | (trà) |
| 🚀 | (tên lửa) |
| 🌌 | (trời đêm) |
| 🌅 | (hoàng hôn) |
| 🎆 | (pháo hoa) |
| ✨ | (lấp lánh) |

A run of the same emoji (`😭😭😭`) gets its text once.

Emoticons the author typed himself (`:))`, `=)))))`, `:v`, `<3`) are text, not
emoji: keep them exactly.

## Before saving, check yourself

- Did every paragraph of the source end up in the output, in order?
- Are all names, times, file names and numbers unchanged?
- Is there any emoji, `:::`, `[[`, link or heading left? There must not be.
- Does any line start with `- ` or `– `? It must not (TNO rule 1).
- Did you list every TNO punctuation issue for the author instead of fixing it?
