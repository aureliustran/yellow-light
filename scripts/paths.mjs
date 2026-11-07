// Where story files live. One place, so moving a folder means changing one line.
// Imported by scripts/*.mjs and crosspost/*.mjs. Paths are relative to the repo
// root (npm scripts run there); `ROOT` is the absolute repo root.
//
//   content/posts/vercel/     the edition on the main site (v2, the current one)
//   content/posts/legacy/     the first edition (v1), read under /legacy
//   content/posts/<domain>/   one folder per cross-posting site: converted
//                             chapters (*.txt), convert.md (the site's rules)
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));

export const CONTENT = 'content';
export const POSTS = `${CONTENT}/posts`;

// Edition id (src/config.ts → editions) → folder of chapter files.
export const EDITION_DIRS = { v2: `${POSTS}/vercel`, v1: `${POSTS}/legacy` };

// Cross-posting site key (crosspost/sites/<key>/, CLI argument, `site` column in
// Supabase) → folder name under content/posts/. The key never changes; the
// folder is the site's domain.
export const SITE_DOMAINS = { rookies: 'rookies.vn', truyennhaong: 'truyennhaong.vn' };
export const siteDir = (site) => `${POSTS}/${SITE_DOMAINS[site] ?? site}`;

// Other files the scripts read.
export const TRANSLATION_LIST = `${CONTENT}/ban-dich-de-xuat.md`;
