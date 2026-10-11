import assert from 'node:assert/strict';
import { test } from 'node:test';
import { anonTag, avatarParts, avatarSvg, defaultAvatar } from '../src/lib/avatar.ts';

test('avatar: the same number always gives the same picture', () => {
  assert.equal(avatarSvg(1042), avatarSvg(1042));
  assert.equal(defaultAvatar(7), defaultAvatar(7));
});

test('avatar: 24 consecutive numbers give 24 different pictures', () => {
  const all = new Set(Array.from({ length: 24 }, (_, i) => avatarSvg(1000 + i)));
  assert.equal(all.size, 24);
});

test('avatar: exactly one lamp is lit, and it cycles red, yellow, green', () => {
  for (let n = 1000; n < 1006; n++) {
    const svg = avatarSvg(n);
    assert.equal((svg.match(/fill-opacity/g) ?? []).length, 2, 'two lamps are dimmed');
    assert.equal(avatarParts(n).lit, n % 3);
  }
});

test('avatar: bad numbers fall back safely and the data URI has no raw quotes or hashes', () => {
  for (const n of [NaN, Infinity, -5, 0, 1.9]) assert.ok(avatarSvg(n).startsWith('<svg'));
  const uri = defaultAvatar(1001);
  assert.ok(uri.startsWith('data:image/svg+xml;utf8,%3Csvg'));
  assert.ok(!/[#"<>]/.test(uri.slice('data:image/svg+xml;utf8,'.length)));
});

test('avatar: tag shows the number, or nothing when unknown', () => {
  assert.equal(anonTag(1042), '#1042');
  assert.equal(anonTag(0), '');
});
