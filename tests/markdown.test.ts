import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown, excerpt, stripTranslations, findMarkupProblems } from '../src/lib/markdown.ts';
import { slugify } from '../src/lib/slug.ts';
import { withNumbers, chapterLabel } from '../src/lib/chapters-shared.ts';

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
    { id: 'c', kind: 'chapter', position: 3 },
    { id: 'i', kind: 'interlude', position: 2 },
    { id: 'a', kind: 'chapter', position: 1 },
  ] as any[];
  const n = withNumbers(rows);
  assert.deepEqual(n.map((x) => [x.id, x.number]), [['a', 1], ['i', null], ['c', 2]]);
  assert.equal(chapterLabel(n[1]), 'Interlude');
  assert.equal(chapterLabel(n[2]), 'Chương 2');
});
