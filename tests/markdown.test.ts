import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown, excerpt, stripTranslations, findMarkupProblems, parseNotifications, notificationAppKey } from '../src/lib/markdown.ts';
import { slugify } from '../src/lib/slug.ts';
import { withNumbers, chapterLabel, chapterLinkName, chapterPath, isLegacy } from '../src/lib/chapters-shared.ts';
import { editions } from '../src/config.ts';

test('scene break becomes a traffic light', () => {
  const html = renderMarkdown('Một.\n\n---\n\nHai.');
  assert.match(html, /class="scene-break"/);
  assert.doesNotMatch(html, /<hr/);
});

test('raw HTML is shown as text', () => {
  const html = renderMarkdown('Xin <script>alert(1)</script> chào\n\n<div onclick="x">hi</div>');
  assert.doesNotMatch(html, /<script>/);
  assert.doesNotMatch(html, /<div onclick/);
  assert.match(html, /&lt;script&gt;/);
});

test('chat block: title, names, sent and received', () => {
  const md = [
    'Trước.',
    '',
    ':::chat CLB Tin học – Ban điều hành',
    'Ngọc Anh (K71): anh Thuyên ơi *duyệt* giúp em',
    'Đức (PCN): à Thuyên ơi',
    '> ok trưa a xem',
    'tin không tên',
    ':::',
    '',
    'Sau.',
  ].join('\n');
  const html = renderMarkdown(md);
  assert.match(html, /<figcaption class="chat-title">CLB Tin học – Ban điều hành<\/figcaption>/);
  assert.match(html, /<span class="msg-name">Ngọc Anh \(K71\)<\/span><p class="bubble">anh Thuyên ơi <em>duyệt<\/em> giúp em<\/p>/);
  assert.match(html, /<div class="msg out"><p class="bubble">ok trưa a xem<\/p>/);
  assert.match(html, /<div class="msg in"><p class="bubble">tin không tên<\/p>/);
  assert.match(html, /<p>Sau.<\/p>/);
});

test('chat reply: a ^ line is quoted above the next message', () => {
  const html = renderMarkdown(':::chat\n^ Đức (PCN): à Thuyên ơi, *thầy* bảo\n> ơ ai cho ông nhận hộ tôi thế\n> tin khác\n:::');
  assert.match(html, /<div class="msg out replying"><div class="reply-quote"><span class="reply-head">Đã trả lời <b>Đức \(PCN\)<\/b><\/span><span class="reply-text">à Thuyên ơi, <em>thầy<\/em> bảo<\/span><\/div><p class="bubble">ơ ai cho ông nhận hộ tôi thế<\/p>/);
  // only the line right after the quote is a reply
  assert.match(html, /<div class="msg out cont"><p class="bubble">tin khác<\/p>/);
  assert.equal(html.match(/reply-quote/g)?.length, 1);
});

test('chat reply quote cannot inject HTML', () => {
  const html = renderMarkdown(':::chat\n^ <b>x</b>: <img src=x onerror=1>\n> ok\n:::');
  assert.doesNotMatch(html, /<b>x<\/b>|<img/);
});

test('email block: subject, header rows, body', () => {
  const html = renderMarkdown(':::email\nTừ: Chủ tọa\nĐến: Minh Thư\nChủ đề: Sơ đồ bàn ghế\n\nChào Thư.\n\nCảm ơn em.\n:::\n\nSau.');
  assert.match(html, /<div class="email-subject">Sơ đồ bàn ghế<\/div>/);
  assert.match(html, /<div class="email-row"><dt>Từ<\/dt><dd>Chủ tọa<\/dd><\/div>/);
  assert.match(html, /<div class="email-body"><p>Chào Thư\.<\/p>\s*<p>Cảm ơn em\.<\/p>/);
  assert.match(html, /<p>Sau\.<\/p>/);
});

test('editor block: lines as typed, translations work, no HTML injection', () => {
  const html = renderMarkdown(':::editor a_b.md @20\n# [[en: Problem || Vấn đề]]\n\nKeep *this* _raw_ <b>x</b>\n- item\n:::');
  assert.match(html, /class="code-tab">a_b\.md<\/figcaption>/);
  assert.match(html, /counter-reset: ln 19/);
  assert.match(html, /<div class="code-line is-head"><span class="code-text"># <span class="tr tr-en"/);
  assert.match(html, /Keep \*this\* _raw_ &lt;b&gt;x&lt;\/b&gt;/);
  assert.match(html, /<span class="tok-bullet">-<\/span> item/);
  assert.equal(html.match(/code-line/g)?.length, 4);
});

test('ide block: shell commands get a prompt', () => {
  const html = renderMarkdown(':::ide Terminal\n$ git push\n:::');
  assert.match(html, /code-ide/);
  assert.match(html, /<span class="tok-prompt" aria-hidden="true">\$ <\/span>git push/);
});

test('phone block: lines of a note typed in a phone, with a title and tappable translations', () => {
  const html = renderMarkdown(':::phone Những lần mình đúng\ndòng một\n\n(dòng [[en: two || hai]])\n:::');
  assert.match(html, /<figure class="phone"><div class="phone-bar"[^>]*><span>‹ Ghi chú<\/span>/);
  assert.match(html, /<figcaption class="phone-title">Những lần mình đúng<\/figcaption><p>dòng một<\/p><p class="gap"><\/p><p>\(dòng <span class="tr tr-en"/);
  assert.equal(renderMarkdown(':::phone\nchỉ một dòng\n:::').includes('phone-title'), false);
  assert.equal(excerpt('Mở đầu.\n\n:::phone\nghi chú ẩn\n:::\n\nCuối.'), 'Mở đầu. Cuối.');
});

test('note block: handwritten list and ink variant', () => {
  const html = renderMarkdown(':::note Ghi chú\n- nhiệt kế\n- quýt\n:::\n\n:::note ink\ntiền = thứ mọi người tin\n:::');
  assert.match(html, /<figure class="note"><figcaption class="note-title">Ghi chú<\/figcaption><div class="note-body"><ul>/);
  assert.match(html, /<figure class="note note-ink"><div class="note-body"><p>tiền = thứ mọi người tin<\/p>/);
});

test('sheet block: table with row colours and blank cells', () => {
  const html = renderMarkdown(':::sheet Lịch\n| Giờ | Việc |\n| --- | --- |\n| [x] 09:00 | Đón |\n| [~] 12:00 | (trống) |\n| 22:00 | |\n:::');
  assert.match(html, /<figcaption class="sheet-name">Lịch<\/figcaption>/);
  assert.match(html, /<tr class="is-done"><th scope="row" class="rownum">2<\/th><td>09:00<\/td><td>Đón<\/td><\/tr>/);
  assert.match(html, /<tr class="is-wait">.*<td class="blank"><\/td><\/tr>/);
  assert.match(html, /<tr><th scope="row" class="rownum">4<\/th><td>22:00<\/td><td class="blank"><\/td><\/tr>/);
  assert.doesNotMatch(html, /\[x\]/);
});

test('new blocks are left out of excerpts and checked for a closing line', () => {
  assert.equal(excerpt('Trước.\n\n:::email\nTừ: A\n\nThư dài\n:::\n\nSau.'), 'Trước. Sau.');
  assert.equal(findMarkupProblems(':::sheet X\n| a |\n| --- |\n| b |\n').length, 1);
  assert.equal(findMarkupProblems(':::sheet X\ntext only\n:::\n').length, 1);
  assert.equal(findMarkupProblems(':::note\n- a\n:::\n').length, 0);
});

test('chat names cannot inject HTML', () => {
  const html = renderMarkdown(':::chat <b>x</b>\n<i>A</i>: <img src=x onerror=1>\n:::');
  assert.doesNotMatch(html, /<b>|<i>|<img/);
});

test('inline translation, English and Hà Tĩnh', () => {
  const html = renderMarkdown('Cô nói: "[[en: I want *to* talk || Em muốn kể]]". Mạ: [[ht: Mi đi mô rứa? || Mày đi đâu thế?]]');
  assert.match(html, /<span class="tr tr-en" role="button" tabindex="0" data-show="orig"/);
  assert.match(html, /<span class="tr-orig" lang="en">I want <em>to<\/em> talk<\/span>/);
  assert.match(html, /<span class="tr-trans" lang="vi">Em muốn kể<\/span>/);
  assert.match(html, /class="tr tr-ht"/);
  assert.match(html, /<span class="tr-orig" lang="vi">Mi đi mô rứa\?<\/span>/);
});

test('block translation keeps paragraphs on both sides', () => {
  const md = ':::dich en\nI felt not sad.\n\nBut it was mine.\n||\nEm không buồn.\n\nNhưng nó là của em.\n:::\n\nTiếp.';
  const html = renderMarkdown(md);
  assert.match(html, /<div class="tr-block tr-en" data-show="orig">/);
  assert.match(html, /<div class="tr-orig" lang="en"><p>I felt not sad.<\/p>\n<p>But it was mine.<\/p>/);
  assert.match(html, /<div class="tr-trans" lang="vi"><p>Em không buồn.<\/p>/);
  assert.match(html, /<p>Tiếp.<\/p>/);
});

test('|| in normal prose is left alone', () => {
  const html = renderMarkdown('a || b và [[không phải]] gì');
  assert.match(html, /a \|\| b và \[\[không phải\]\] gì/);
});

test('missing translation is reported, not hidden', () => {
  assert.deepEqual(findMarkupProblems('ok [[en: hello || chào]] ok'), []);
  assert.equal(findMarkupProblems('x [[en: hello]] y').length, 1);
  assert.equal(findMarkupProblems('x [[fr: bonjour || chào]]').length, 1);
  assert.equal(findMarkupProblems(':::dich en\nhello\n:::').length, 1);
  assert.equal(findMarkupProblems(':::chat X\nA: b\n').length, 1);
  assert.deepEqual(findMarkupProblems(':::dich ht\nmi\n||\nmày\n:::'), []);
  assert.match(renderMarkdown('x [[en: hello]] y'), /\[\[en: hello\]\]/);
});

test('excerpt keeps only the original text', () => {
  assert.equal(stripTranslations('A [[en: hi || chào]] B'), 'A hi B');
  const e = excerpt('*Sáu giờ* [[en: hi || chào]].\n\n---\n\n:::chat X\nA: b\n:::\n\nHết.');
  assert.equal(e, 'Sáu giờ hi. Hết.');
  assert.ok(excerpt('chữ '.repeat(100), 40).length <= 41);
});

test('slugify Vietnamese titles', () => {
  assert.equal(slugify('Kem viền nhũ vàng'), 'kem-vien-nhu-vang');
  assert.equal(slugify('Đèn sân không tắt'), 'den-san-khong-tat');
  assert.equal(slugify('  !!! '), 'chuong');
});

test('chapter numbers skip interludes and follow order', () => {
  const rows = [
    { id: 'c', kind: 'chapter', position: 3, title: 'Chương ba' },
    { id: 'i', kind: 'interlude', position: 2, title: 'Hồng phấn' },
    { id: 'a', kind: 'chapter', position: 1, title: 'Đèn vàng' },
  ] as any[];
  const n = withNumbers(rows);
  assert.deepEqual(n.map((x) => [x.id, x.number]), [['a', 1], ['i', null], ['c', 2]]);
  assert.equal(chapterLabel(n[1]), 'Interlude');
  assert.equal(chapterLabel(n[2]), 'Chương 2');
});

test('chapter numbers can start at 0 (v2 opens with Chương 0)', () => {
  const rows = [
    { id: 'a', kind: 'chapter', position: 1, title: 'Mở đầu' },
    { id: 'i', kind: 'interlude', position: 2, title: 'Hồng phấn' },
    { id: 's', kind: 'chapter', position: 3, title: '3107' },
    { id: 'b', kind: 'chapter', position: 4, title: 'Đèn vàng' },
  ] as any[];
  const n = withNumbers(rows, 0);
  assert.deepEqual(n.map((x) => [x.id, x.number]), [['a', 0], ['i', null], ['s', null], ['b', 1]]);
  assert.equal(chapterLabel(n[0]), 'Chương 0');
  assert.equal(chapterLinkName(n[0]), 'Chương 0 · Mở đầu');
});

test('chapter paths: current edition under /doc/, the other under the legacy path', () => {
  const other = editions.current === 'v1' ? 'v2' : 'v1';
  assert.equal(chapterPath({ slug: 'den-vang', edition: editions.current }), '/doc/den-vang');
  assert.equal(chapterPath({ slug: 'den-vang', edition: other }), `${editions.legacy.path}/den-vang`);
  assert.equal(isLegacy({ edition: editions.current }), false);
  assert.equal(isLegacy({ edition: other }), true);
});


test('notifications: lines with and without content, multi-part titles, extra colons', () => {
  const b = parseNotifications(
    '18:00 · Thứ Sáu, 28 tháng 5',
    [
      '09:00  Email · Khối Công nghệ – Nhân sự: Đánh giá 360 độ trước giai đoạn vận hành (hạn 4/6)',
      '11:24  Teams · Thiên Nhãn – R&D · anh Tuấn: Ô 712 thôi để thứ Hai Thuyên vào xem',
      '12:10  Cuộc gọi nhỡ · Mạ',
      '15:32  Ngân hàng: +5.000.000đ. ND: THUONG NONG T5 THIEN NHAN',
    ].join('\n'),
  );
  assert.equal(b.clock, '18:00');
  assert.equal(b.date, 'Thứ Sáu, 28 tháng 5');
  assert.deepEqual(b.items[0], { time: '09:00', app: 'Email', sender: 'Khối Công nghệ – Nhân sự', body: 'Đánh giá 360 độ trước giai đoạn vận hành (hạn 4/6)' });
  // several " · " parts: the first is the app, the rest the sender
  assert.deepEqual(b.items[1], { time: '11:24', app: 'Teams', sender: 'Thiên Nhãn – R&D · anh Tuấn', body: 'Ô 712 thôi để thứ Hai Thuyên vào xem' });
  // no ":" → all title, no content
  assert.deepEqual(b.items[2], { time: '12:10', app: 'Cuộc gọi nhỡ', sender: 'Mạ', body: '' });
  // only the FIRST ":" splits; later ones stay in the content
  assert.deepEqual(b.items[3], { time: '15:32', app: 'Ngân hàng', sender: '', body: '+5.000.000đ. ND: THUONG NONG T5 THIEN NHAN' });
});

test('notifications: header is optional; a ":" inside a translation marker is not the split', () => {
  assert.deepEqual(parseNotifications('', '09:00  Zalo · Mạ: hi').items.length, 1);
  const b = parseNotifications('', '09:00  Zalo · [[en: Mom: call || Mẹ gọi]]');
  assert.equal(b.clock, '');
  assert.equal(b.date, '');
  assert.equal(b.items[0].body, '');
  assert.equal(b.items[0].sender, '[[en: Mom: call || Mẹ gọi]]');
  assert.equal(parseNotifications('Thứ Hai', '').date, 'Thứ Hai');
});

test('notifications: a line without a time continues the previous one', () => {
  const b = parseNotifications('', '09:00  Email · A: một\nhai\n\n10:00  Zalo · B: ba');
  assert.equal(b.items.length, 2);
  assert.equal(b.items[0].body, 'một hai');
});

test('notifications: app icons by name, ignoring case and accents; unknown apps are generic', () => {
  assert.equal(notificationAppKey('Email'), 'mail');
  assert.equal(notificationAppKey('Teams'), 'teams');
  assert.equal(notificationAppKey('Cuộc gọi nhỡ'), 'phone');
  assert.equal(notificationAppKey('NGÂN HÀNG'), 'bank');
  assert.equal(notificationAppKey('Ngân hàng VCB'), 'bank');
  assert.equal(notificationAppKey('Cảnh báo đường ống'), 'system');
  assert.equal(notificationAppKey('Zalo'), 'zalo');
  assert.equal(notificationAppKey('Tiktok'), 'generic');
});

test('notifications block: renders cards in order, escapes, translations work, excerpt skips it', () => {
  const html = renderMarkdown(
    'Trước.\n\n:::notifications 18:00 · Thứ Sáu\n09:00  Email · A <b>: chào [[en: hi || xin chào]] 😀\n12:10  Cuộc gọi nhỡ · Mạ\n:::\n\nSau.',
  );
  assert.match(html, /<figure class="notif"><div class="notif-head"><div class="notif-clock">18:00<\/div><div class="notif-date">Thứ Sáu<\/div><\/div>/);
  assert.ok(html.indexOf('09:00') < html.indexOf('12:10'));
  assert.match(html, /class="nf-icon app-mail"/);
  assert.match(html, /class="nf-icon app-phone"/);
  assert.match(html, /<div class="nf-from">A &lt;b&gt;<\/div>/);
  assert.match(html, /class="nf-body">chào <span class="tr tr-en"/);
  assert.match(html, /😀/);
  assert.equal((html.match(/nf-body/g) ?? []).length, 1); // the call has no content
  assert.equal(excerpt('Mở đầu.\n\n:::notifications\n09:00  Zalo · Mạ: ẩn\n:::\n\nCuối.'), 'Mở đầu. Cuối.');
});

test('notifications: does not disturb the phone block; markup check warns about stray lines', () => {
  const html = renderMarkdown(':::phone Ghi chú\ndòng một\n:::\n\n:::notifications\n09:00  Zalo · Mạ: hi\n:::');
  assert.match(html, /<figure class="phone">/);
  assert.match(html, /<figure class="notif">/);
  assert.deepEqual(findMarkupProblems(':::notifications\n09:00  Zalo · Mạ: hi\n:::'), []);
  const p = findMarkupProblems('A\n\n:::notifications\n09:00  Zalo · Mạ: hi\n9h sáng lỗi\n:::');
  assert.equal(p.length, 1);
  assert.match(p[0], /^Dòng 5:/);
  assert.match(findMarkupProblems(':::notifications\n09:00  Zalo · Mạ: hi')[0], /chưa có dòng ":::"/);
});
