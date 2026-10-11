#!/usr/bin/env node
// Prints the daily admin digest as Markdown, or nothing if there is nothing to
// report. Run by .github/workflows/digest.yml, which turns the output into a
// GitHub issue (GitHub then emails the repo owner).
//
//   node scripts/digest.mjs            # needs .env or the two Supabase variables
import { adminClient } from './env.mjs';
import { buildDigest } from './digest-lib.mjs';

const sb = adminClient();
const HOUR = 3600_000;
const now = Date.now();
const since24 = new Date(now - 24 * HOUR).toISOString();
const since8d = new Date(now - 8 * 24 * HOUR).toISOString();

const fail = (what, error) => {
  console.error(`Không đọc được ${what}: ${error.message}`);
  process.exit(1);
};
const one = (v) => (Array.isArray(v) ? v[0] : v);
const count = async (table, col, from, to) => {
  let q = sb.from(table).select('*', { count: 'exact', head: true }).gte(col, from);
  if (to) q = q.lt(col, to);
  const { count: n, error } = await q;
  if (error) fail(table, error);
  return n ?? 0;
};

const [views24h, viewsPrev7d, newUsers] = await Promise.all([
  count('view_events', 'created_at', since24),
  count('view_events', 'created_at', since8d, since24),
  count('profiles', 'created_at', since24),
]);

// Reports that still need a decision: the comment is visible (hiding or restoring clears them).
const rep = await sb
  .from('comment_reports')
  .select('reason, comments!inner(body, status, profiles!user_id(display_name), chapters(title))')
  .eq('comments.status', 'visible')
  .order('created_at', { ascending: false })
  .limit(50);
if (rep.error) fail('báo cáo', rep.error);
const reports = (rep.data ?? []).map((r) => ({
  reason: r.reason,
  body: one(r.comments)?.body,
  author: one(one(r.comments)?.profiles)?.display_name,
  chapter: one(one(r.comments)?.chapters)?.title,
}));

const com = await sb
  .from('comments')
  .select('body, profiles!user_id(display_name), chapters(title)')
  .eq('status', 'visible')
  .gte('created_at', since24)
  .order('created_at', { ascending: false })
  .limit(50);
if (com.error) fail('bình luận', com.error);
const newComments = (com.data ?? []).map((c) => ({
  body: c.body,
  author: one(c.profiles)?.display_name,
  chapter: one(c.chapters)?.title,
}));

// Anyone who rated five or more times in a day.
const [cr, sr] = await Promise.all([
  sb.from('ratings').select('user_id, profiles(display_name)').gte('updated_at', since24),
  sb.from('story_ratings').select('user_id, profiles(display_name)').gte('updated_at', since24),
]);
if (cr.error) fail('điểm chương', cr.error);
if (sr.error) fail('điểm truyện', sr.error);
const per = new Map();
for (const r of [...(cr.data ?? []), ...(sr.data ?? [])]) {
  const e = per.get(r.user_id) ?? { name: one(r.profiles)?.display_name, count: 0 };
  e.count++;
  per.set(r.user_id, e);
}
const ratingBursts = [...per.values()].filter((e) => e.count >= 5).sort((a, b) => b.count - a.count);

const date = new Date(now + 7 * HOUR).toISOString().slice(0, 10); // Vietnam date
const siteUrl = (process.env.SITE_URL || 'https://yellow-light.vercel.app').replace(/\/$/, '');
process.stdout.write(buildDigest({ siteUrl, date, views24h, viewsPrev7d, newUsers, reports, newComments, ratingBursts }));
