// Run with: npm run gen:sitemap
// Generates public/sitemap.xml with static pages plus every available
// product's URL, pulled live from Supabase. Falls back to static pages
// only if Supabase isn't configured yet.
import 'dotenv/config';
import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.your-domain.example';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const staticPages = ['/', '/shop', '/about', '/contact', '/privacy-policy', '/terms', '/returns-exchange'];

async function getProductSlugs() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[sitemap] Supabase env vars not set — generating sitemap with static pages only.');
    return [];
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from('products').select('slug').eq('is_available', true);
  if (error) {
    console.warn('[sitemap] Could not fetch products:', error.message);
    return [];
  }
  return (data || []).map((p) => `/product/${p.slug}`);
}

function buildXml(urls) {
  const entries = urls
    .map(
      (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const productUrls = await getProductSlugs();
const xml = buildXml([...staticPages, ...productUrls]);
fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`[sitemap] Wrote public/sitemap.xml with ${staticPages.length + productUrls.length} URLs.`);
