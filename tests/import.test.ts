import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseChapter } from '../scripts/parse-chapter.mjs';

test('chapter file: number dropped, byline and date moved out', () => {
  const r = parseChapter('# Chương 1: Đèn vàng\n\nOct 4, 2026 · @aureliustran.\n\n*Thứ Bảy, 3/10/2026*\n\nSáu giờ năm mươi.\n\n---\n\nTháng mười.\n')!;
  assert.equal(r.kind, 'chapter');
  assert.equal(r.title, 'Đèn vàng');
  assert.equal(r.slug, 'den-vang');
  assert.equal(r.story_date, 'Thứ Bảy, 3/10/2026');
  assert.equal(r.body, 'Sáu giờ năm mươi.\n\n---\n\nTháng mười.\n');
});

test('interlude file keeps its phone-note line', () => {
  const r = parseChapter('# Hồng phấn\n\nOct 7, 2026 · @aureliustran.\n\n*Thứ Bảy, 3/10/2026*\n\n*Ghi chú – Việc cuối tuần: rửa con mèo hồng.*\n\nChiếc Vespa hồng.\n')!;
  assert.equal(r.kind, 'interlude');
  assert.equal(r.title, 'Hồng phấn');
  assert.equal(r.story_date, 'Thứ Bảy, 3/10/2026');
  assert.ok(r.body.startsWith('*Ghi chú – Việc cuối tuần'));
});

test('italic lines later in the text are not taken as the date', () => {
  const r = parseChapter('# Chương 2: Bao giấy vụn\n\nĐoạn một.\n\nĐoạn hai.\n\nĐoạn ba.\n\n*Thứ Hai, 5/10/2026*\n')!;
  assert.equal(r.story_date, null);
  assert.match(r.body, /\*Thứ Hai, 5\/10\/2026\*/);
});

test('file without a heading is skipped', () => {
  assert.equal(parseChapter('Không có tiêu đề.\n'), null);
});

test('special chapter: the number is its name', () => {
  const r = parseChapter('# Chương 3107\n\nOct 10, 2026 · @aureliustran.\n\n*Thứ Bảy, 10/4/2027*\n\nTrong thang máy.\n')!;
  assert.equal(r.kind, 'chapter');
  assert.equal(r.title, '3107');
  assert.equal(r.slug, '3107');
  assert.equal(r.story_date, 'Thứ Bảy, 10/4/2027');
});
