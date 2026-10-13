# Converting a chapter for rookies.vn

Instructions for Claude. The author asks in chat ("chuyển chương 1–5 cho rookies"),
Claude follows this file. Code checks the result afterwards (`crosspost check`),
so a conversion that changes the story is rejected, not posted.

## Workflow

1. `npm run crosspost -- pull rookies --range 1-5` (or `--all`, `--only slug,slug`).
   This writes each chapter that needs converting to
   `crosspost/work/rookies/<file>.source.md`, plus `manifest.json`.
   Only chapters that are live on Vercel and inside the teaser limit are pulled.
2. For each source file, write the converted text to
   `crosspost/out/rookies/<same file name>.txt`, following the rules below.
   Read the whole source file first; never write from memory or from a summary.
3. `npm run crosspost -- check rookies` and fix every problem it reports.
   Repeat until it prints OK for every chapter.
4. `npm run crosspost -- check rookies --save` stores the versions in Supabase.
   The author then picks chapters in /admin/crosspost and presses Đồng bộ.

## What the site can show

rookies.vn has a rich-text editor. It keeps paragraphs, line breaks, *italic* and
**bold**. It deletes every emoji when saving. Links are shown as plain text.
There is no way to show chat bubbles, emails or other "documents", and no
tap-to-translate.

## Output format

- Plain text. One blank line between paragraphs. A single line break inside a
  paragraph is kept as a line break (use it for lists of messages, lines of a note).
- `*italic*` and `**bold**` are allowed. Nothing else: no headings, no links, no HTML,
  no tables, no `>` quotes.
- A scene break (`---` in the source) becomes a line with only `* * *`.
- Do NOT write the chapter title, the date line, or any footer/links. Code adds them.

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

### Handwritten note: `:::note [ink] Title`
`*[Ghi chú viết tay – Title]*` (`*[Ghi bên lề sách – Title]*` for `ink`), then the
lines. A list item becomes a line starting with `– `.

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
table in the same change.

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

Emoticons the author typed himself (`:))`, `=)))))`, `:v`, `<3`) are text, not
emoji: keep them exactly.

## Before saving, check yourself

- Did every paragraph of the source end up in the output, in order?
- Are all names, times, file names and numbers unchanged?
- Is there any emoji, `:::`, `[[`, link or heading left? There must not be.
