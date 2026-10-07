import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const base = site ?? new URL(url.origin);
  const body = `User-agent: *\nDisallow: /admin\nDisallow: /auth/\n\nSitemap: ${new URL('/sitemap.xml', base)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
