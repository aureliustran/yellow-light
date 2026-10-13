// Loading and saving cross-post data in Supabase, for the CLI and the worker.
// Uses the service role key from .env (see scripts/env.mjs): run on your own
// computer only.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { adminClient } from '../../scripts/env.mjs';
import { withNumbers } from '../../src/lib/chapters-shared.ts';
import { buildRows } from './crosspost.ts';

export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const CROSS = fileURLToPath(new URL('../', import.meta.url));

export function siteConfig(site) {
  const path = new URL(`../sites/${site}/config.json`, import.meta.url);
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    throw new Error(`Không có trang "${site}" (thiếu crosspost/sites/${site}/config.json)`);
  }
}

let client = null;
export function db() {
  return (client ??= adminClient());
}

const must = ({ data, error }, what) => {
  if (error) throw new Error(`${what}: ${error.message}`);
  return data;
};

export async function loadChapters() {
  const rows = must(
    await db().from('chapters').select('id, slug, kind, title, story_date, status, publish_at, position, body').order('position'),
    'Không đọc được chương',
  );
  return withNumbers(rows);
}

export async function loadSite(site) {
  const row = must(await db().from('crosspost_sites').select('*').eq('site', site).maybeSingle(), 'Không đọc được crosspost_sites');
  if (!row) throw new Error(`Chưa có dòng "${site}" trong crosspost_sites. Đã chạy supabase/migrations/0005_crosspost.sql chưa?`);
  return row;
}

export async function loadPosts(site) {
  return must(await db().from('crosspost_posts').select('*').eq('site', site), 'Không đọc được crosspost_posts');
}

export async function loadJobs(site) {
  return must(
    await db().from('crosspost_jobs').select('*').eq('site', site).order('id', { ascending: false }).limit(1000),
    'Không đọc được crosspost_jobs',
  );
}

export async function loadRows(site) {
  const [chapters, siteRow, posts, jobs] = await Promise.all([loadChapters(), loadSite(site), loadPosts(site), loadJobs(site)]);
  const cfg = siteConfig(site);
  return { cfg, siteRow, chapters, rows: await buildRows(chapters, siteRow, cfg, posts, jobs) };
}

export { must };
