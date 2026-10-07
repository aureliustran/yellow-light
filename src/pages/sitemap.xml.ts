import type { APIRoute } from 'astro';
import { isConfigured } from '../lib/supabase';
import { getPublishedChapters } from '../lib/chapters';

export const GET: APIRoute = async ({ site, url }) => {
  const base = site ?? new URL(url.origin);
  const urls = [new URL('/', base).toString()];
  if (isConfigured) {
    try {
      const list = await getPublishedChapters();
      for (const c of list) urls.push(new URL(`/doc/${c.slug}`, base).toString());
    } catch {
      /* still return the home page */
    }
  }
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600' },
  });
};
