// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Your public address, used for sitemap and share previews.
  // Change it once you have a domain (or set SITE_URL on Vercel).
  site: process.env.SITE_URL || 'https://den-vang.vercel.app',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',
});
