import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildDigest, isSpike, snippet } from '../scripts/digest-lib.mjs';

test('digest: nothing to report gives an empty string', () => {
  assert.equal(buildDigest({ views24h: 12, viewsPrev7d: 70, newUsers: 1 }), '');
});

test('digest: user text cannot mention people, break markdown or inject links', () => {
  const evil = 'hi @octocat `x` [a](http://e.com)\n# heading\n<script>';
  const s = snippet(evil);
  assert.ok(s.startsWith('`') && s.endsWith('`'));
  assert.ok(!s.slice(1, -1).includes('`'));
  assert.ok(!s.includes('\n'));
  const md = buildDigest({
    date: '2026-10-12',
    reports: [{ author: '@octocat **bold**', chapter: 'Ch\n# 1', body: evil, reason: 'spam' }],
  });
  assert.ok(md.includes('1 báo cáo chưa xử lý'));
  assert.ok(!/(^|[^`])@octocat/.test(md.replace(/`[^`]*`/g, '')), 'no bare @mention outside code');
  assert.ok(!md.split('\n').some((l) => l.startsWith('# heading')));
});

test('digest: report list is capped and counted', () => {
  const reports = Array.from({ length: 13 }, (_, i) => ({ author: 'A' + i, chapter: 'C', body: 'b' + i }));
  const md = buildDigest({ reports });
  assert.ok(md.includes('13 báo cáo'));
  assert.ok(md.includes('và 3 báo cáo khác'));
});

test('digest: spike needs 50+ views and 3x the daily average', () => {
  assert.equal(isSpike(49, 0), false);
  assert.equal(isSpike(50, 0), true);
  assert.equal(isSpike(120, 700), false); // 100/day average
  assert.equal(isSpike(300, 700), true);
  assert.ok(buildDigest({ views24h: 300, viewsPrev7d: 700 }).includes('tăng đột biến'));
});

test('digest: rating bursts and new comments are reported with admin links', () => {
  const md = buildDigest({
    siteUrl: 'https://yellow-light.vercel.app',
    ratingBursts: [{ name: 'Lạ', count: 7 }],
    newComments: [{ author: 'B', chapter: 'Đèn vàng', body: 'Hay quá' }],
  });
  assert.ok(md.includes('chấm 7 lần'));
  assert.ok(md.includes('1 bình luận mới'));
  assert.ok(md.includes('https://yellow-light.vercel.app/admin/comments'));
});
