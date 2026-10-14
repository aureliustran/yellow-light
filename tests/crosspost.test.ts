import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRows,
  crossState,
  finalText,
  groups,
  parseRange,
  remoteTitle,
  selectByRange,
  teaserSet,
  textToHtml,
  forewordNote,
  isForeword,
  plainForCompare,
  type CrossChapter,
  type PostRow,
  type SiteConfig,
  type SiteRow,
} from '../crosspost/core/crosspost.ts';
import { checkConversion } from '../crosspost/core/checks.ts';

const past = '2026-10-01T00:00:00Z';
let pos = 0;
const ch = (slug: string, number: number | null, kind: 'chapter' | 'interlude' = 'chapter', extra: Partial<CrossChapter> = {}): CrossChapter => ({
  id: slug,
  slug,
  kind,
  title: slug,
  story_date: null,
  status: 'published',
  publish_at: past,
  position: ++pos,
  number,
  body: `Thân ${slug}.`,
  ...extra,
});

const story = [
  ch('c1', 1),
  ch('c2', 2),
  ch('i2', null, 'interlude'),
  ch('c3', 3),
  ch('s3107', null, 'chapter', { title: '3107' }),
  ch('c4', 4),
  ch('draft5', 5, 'chapter', { status: 'draft' }),
];
const live = story.filter((c) => c.status === 'published');

const cfg: SiteConfig = {
  site: 'rookies',
  name: 'Rookies.vn',
  vercelUrl: 'https://yellow-light.vercel.app/',
  footer: { next: '[Đọc tiếp {next}]({nextUrl})', last: '[Chương mới]({nextUrl})', home: '[Trọn bộ]({home})' },
};
const site: SiteRow = { site: 'rookies', name: 'Rookies.vn', teaser_limit: 2, default_mode: 'publish', enabled: true };

test('interludes and special chapters ride with the chapter before them', () => {
  assert.deepEqual(
    groups(live).map((g) => [g.number, g.items.map((c) => c.slug)]),
    [[1, ['c1']], [2, ['c2', 'i2']], [3, ['c3', 's3107']], [4, ['c4']]],
  );
});

test('teaser: first N numbered chapters plus what rides along', () => {
  assert.deepEqual([...teaserSet(live, 2)], ['c1', 'c2', 'i2']);
  assert.equal(teaserSet(live, null).size, live.length);
  assert.equal(teaserSet(live, 0).size, 0);
});

test('ranges', () => {
  assert.deepEqual(selectByRange(live, '2-3').map((c) => c.slug), ['c2', 'i2', 'c3', 's3107']);
  assert.deepEqual(selectByRange(live, '3-', false).map((c) => c.slug), ['c3', 'c4']);
  assert.deepEqual(selectByRange(live, '1,4').map((c) => c.slug), ['c1', 'c4']);
  assert.ok(parseRange('-2')(1) && !parseRange('-2')(3));
  assert.throws(() => parseRange('5-2'));
  assert.throws(() => parseRange('abc'));
});

test('titles on the other site', () => {
  assert.equal(remoteTitle({ kind: 'chapter', title: 'Đèn vàng', number: 1 }), 'Chương 1: Đèn vàng');
  assert.equal(remoteTitle({ kind: 'chapter', title: '3107', number: null }), 'Chương 3107');
  assert.equal(remoteTitle({ kind: 'interlude', title: 'Hồng phấn', number: null }), 'Interlude: Hồng phấn');
});

test('footer links become <a> in HTML and plain text when comparing', () => {
  const t = '[Trọn bộ](https://yellow-light.vercel.app/)';
  assert.equal(textToHtml(t), '<p><a href="https://yellow-light.vercel.app/">Trọn bộ</a></p>');
  assert.equal(plainForCompare(t), 'Trọn bộ');
});

test('footer links to the next live chapter, even past the teaser', () => {
  const text = finalText(cfg, { ...live[1], story_date: 'Thứ Hai, 5/10/2026' }, 'Đoạn một.\n\nĐoạn hai.', live[2]);
  assert.match(text, /^\*Thứ Hai, 5\/10\/2026\*\n\nĐoạn một\.\n\nĐoạn hai\.\n\n\* \* \*\n\n/);
  assert.match(text, /\[Đọc tiếp Interlude i2\]\(https:\/\/yellow-light\.vercel\.app\/doc\/i2\)\n/);
  assert.match(text, /\[Trọn bộ\]\(https:\/\/yellow-light\.vercel\.app\/\)\n$/);
  assert.match(finalText(cfg, live[5], 'x', null), /\[Chương mới\]\(https:\/\/yellow-light\.vercel\.app\//);
});

test('editor HTML: paragraphs, line breaks, italic, bold, scene break, escaping', () => {
  assert.equal(
    textToHtml('*[Tin nhắn]*\nVũ: Ê <3\n\n* * *\n\n**Đậm** & 3*4'),
    '<p><em>[Tin nhắn]</em><br>Vũ: Ê &lt;3</p>\n<p style="text-align: center;">* * *</p>\n<p><strong>Đậm</strong> &amp; 3*4</p>',
  );
});

const post = (over: Partial<PostRow> = {}): PostRow => ({
  site: 'rookies', chapter_id: 'c1', source_hash: 'S', converted_body: 'x', converted_at: past, check_report: null,
  remote_id: null, remote_url: null, posted_hash: null, posted_mode: null, posted_at: null, pending_since: null, last_error: null, ...over,
});

test('states', () => {
  const base = { eligible: true, source: 'S', wanted: 'W', job: null };
  assert.equal(crossState({ ...base, post: null }), 'unconverted');
  assert.equal(crossState({ ...base, post: post({ source_hash: 'OLD' }) }), 'outdated');
  assert.equal(crossState({ ...base, post: post() }), 'ready');
  assert.equal(crossState({ ...base, post: post({ remote_id: '1', posted_hash: 'W', posted_at: past }) }), 'posted');
  assert.equal(crossState({ ...base, post: post({ remote_id: '1', posted_hash: 'OLD', posted_at: past }) }), 'update');
  assert.equal(crossState({ ...base, eligible: false, post: null }), 'outside');
  const job = { id: 1, site: 'rookies', chapter_id: 'c1', mode: 'publish' as const, result: null, error: 'x', created_at: '2026-10-02T00:00:00Z', started_at: null, finished_at: null };
  assert.equal(crossState({ ...base, post: post(), job: { ...job, status: 'queued' } }), 'queued');
  assert.equal(crossState({ ...base, post: post(), job: { ...job, status: 'failed' } }), 'failed');
});

test('rows: a new next chapter changes the footer, so a posted chapter needs an update', async () => {
  const two = [ch('a1', 1), ch('a2', 2)];
  const rows1 = await buildRows([two[0]], site, cfg, [], []);
  const p = post({ chapter_id: 'a1', source_hash: rows1[0].sourceHash, converted_body: 'Thân a1.' });
  const before = await buildRows([two[0]], site, cfg, [p], []);
  const posted = { ...p, remote_id: '9', posted_hash: before[0].wantedHash, posted_at: past };
  assert.equal((await buildRows([two[0]], site, cfg, [posted], []))[0].state, 'posted');
  assert.equal((await buildRows(two, site, cfg, [posted], []))[0].state, 'update');
});

// ───────────── Conversion checks ─────────────

const SOURCE = `Sáu giờ năm mươi. Sân bóng rổ khu tập thể vẫn còn ướt sương.

"Ơ, hôm nay không đi làm à cháu?" Anh [[en: summit || hội nghị]] gì gì đó 😱

---

:::chat CLB Tin học – Ban điều hành
Ngọc Anh (K71): Anh Thuyên ơii
^ Ngọc Anh (K71): Nhưng phần demo em vẫn sợ sợ 🥲
> ok trưa a xem
~ Nghĩ một chút, anh gõ thêm:
:::

Rồi khuất sau xe bánh mì đầu phố.
`;

const GOOD = `Sáu giờ năm mươi. Sân bóng rổ khu tập thể vẫn còn ướt sương.

“Ơ, hôm nay không đi làm à cháu?” Anh summit (hội nghị) gì gì đó (hoảng)

* * *

*[Tin nhắn – CLB Tin học – Ban điều hành]*
Ngọc Anh (K71): Anh Thuyên ơii
› Trả lời Ngọc Anh (K71): Nhưng phần demo em vẫn sợ sợ :')
Thuyên: ok trưa a xem
*Nghĩ một chút, anh gõ thêm:*

Rồi khuất sau xe bánh mì đầu phố.
`;

test('a faithful conversion passes', () => {
  const r = checkConversion(SOURCE, GOOD);
  assert.deepEqual(r.problems, []);
  assert.ok(r.ok);
});

test('a changed word in the prose is caught', () => {
  const r = checkConversion(SOURCE, GOOD.replace('ướt sương', 'đẫm sương'));
  assert.equal(r.ok, false);
  assert.equal(r.missingProse.length, 1);
});

test('a dropped chat message is caught', () => {
  const r = checkConversion(SOURCE, GOOD.replace('Thuyên: ok trưa a xem\n', ''));
  assert.equal(r.ok, false);
  assert.ok(r.missingBlock.some((x) => x.includes('ok trưa a xem')));
});

test('reordered paragraphs are caught', () => {
  const parts = GOOD.split('\n\n');
  const swapped = [parts[1], parts[0], ...parts.slice(2)].join('\n\n');
  assert.equal(checkConversion(SOURCE, swapped).ok, false);
});

test('leftover markup, emoji and links are caught', () => {
  const r = checkConversion(SOURCE, GOOD + '\n:::chat\n🥲\nhttps://yellow-light.vercel.app\n:::\n');
  assert.ok(r.problems.some((p) => p.includes(':::')));
  assert.ok(r.problems.some((p) => p.includes('emoji')));
  assert.ok(r.problems.some((p) => p.includes('link')));
});

// ───────────── Sign-in details sent to the worker ─────────────
import { makeKeyPair, seal, unseal } from '../crosspost/core/seal.ts';

test('sign-in details: only the worker key opens them, tampering is refused', async () => {
  const worker = await makeKeyPair();
  const payload = { username: 'tác giả', password: 'mật khẩu 🔑', remember: true, sentAt: new Date().toISOString() };
  const sealed = await seal(worker.publicJwk, payload);
  assert.ok(!JSON.stringify(sealed).includes('mật khẩu'));
  assert.deepEqual(await unseal(worker.privateJwk, sealed), payload);
  const stranger = await makeKeyPair();
  await assert.rejects(unseal(stranger.privateJwk, sealed));
  const flipped = sealed.data.slice(0, -2) + (sealed.data.slice(-2) === 'AA' ? 'BB' : 'AA');
  await assert.rejects(unseal(worker.privateJwk, { ...sealed, data: flipped }));
});

test('foreword: only a note, never blocks', () => {
  const withFw = { ...cfg, foreword: { title: 'Lời nói đầu' } };
  assert.match(forewordNote(withFw, [], false)!, /Chưa thấy "Lời nói đầu"/);
  assert.match(forewordNote(withFw, [{ id: '1', title: 'Chương 1: X' }, { id: '2', title: 'lời  nói đầu' }], false)!, /không đứng đầu/);
  assert.match(forewordNote(withFw, [{ id: '2', title: 'Lời nói đầu' }], false)!, /bỏ qua nó/);
  assert.equal(forewordNote(withFw, [], true), null); // chapters already synced
  assert.equal(forewordNote(cfg, [], false), null); // site without a foreword
  assert.equal(isForeword(withFw, ' Lời nói  đầu '), true);
});
