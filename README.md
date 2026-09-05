# Aavaran — Clothing Store Catalogue (WhatsApp Enquiry Model)

A mobile-first fashion catalogue site. Customers browse products and enquire
directly on WhatsApp — there is **no cart, checkout, or payment gateway** by
design.

Built with React + Vite + Tailwind CSS + Supabase, ready to deploy on Netlify.

> **Demo content notice:** this project ships with 25 placeholder products
> (`src/data/sampleProducts.js` / `supabase/seed.sql`), a placeholder store
> name "Aavaran", and Unsplash stock photos so you can see the site working
> immediately. Replace all of it with your real details before going live —
> see "How to add your own products" below.

---

## 1. Project structure

```
src/
  components/     Reusable UI: ProductCard, ProductGrid, ProductFilters,
                   ProductGallery, WhatsAppButton, Header, Footer,
                   CategoryCard, SearchBar, LoadingSkeleton, AdminProductForm...
  pages/           Home, Catalogue, ProductDetails, About, Contact,
                   legal/ (Privacy, Terms, Returns), admin/ (Login, Dashboard, Form)
  layouts/         MainLayout (public site), AdminLayout (protected admin)
  hooks/           useProducts, useAuth, useDebounce
  services/        productsService.js, adminService.js — all Supabase reads/writes
  lib/             supabase.js — Supabase client
  utils/           whatsapp.js — WhatsApp link builder
  config/          store.js (all store details), filters.js (filter options)
  context/         StickyWhatsAppContext.jsx — page-aware mobile CTA
  data/            sampleProducts.js — demo data fallback
supabase/
  schema.sql       Table, indexes, Row Level Security policies
  seed.sql         Demo product data (generated from sampleProducts.js)
scripts/
  generate-sitemap.js   Regenerates public/sitemap.xml from live Supabase data
  generate-seed.mjs     Regenerates supabase/seed.sql from sampleProducts.js
netlify.toml       Build + SPA routing config for Netlify
.env.example        All required environment variables
```

---

## 2. Local setup

```bash
npm install
cp .env.example .env     # then fill in the values (see below)
npm run dev
```

The site works even before you fill in `.env` — it falls back to the bundled
demo data — but WhatsApp buttons need `VITE_WHATSAPP_NUMBER` to work, and
nothing you edit in the (not-yet-connected) admin panel will be saved.

---

## 3. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
   - Never copy the **service_role** key into this project — it must never
     appear in frontend code.
3. Go to **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates the `products` table,
   indexes, and Row Level Security policies (public read of available
   products only; writes require an authenticated admin session).
4. (Optional) To load the 25 demo products, run `supabase/seed.sql` the same
   way. Skip this step if you'd rather start empty and add your own
   products right away.
5. Add your values to `.env`.

### Creating your admin login
Go to **Authentication → Users → Add user** in Supabase and create an email +
password for yourself. That's the login for `/admin` on your site — there is
no separate admin flag; any Supabase Auth user can manage products, so only
create accounts for people you trust.

### Storage bucket for product images
1. Go to **Storage → New bucket**, name it `product-images`, and make it
   **public** (so product photos can be displayed on the site).
2. No further folder setup needed — the admin panel automatically uploads
   images under `products/{product_code}/...` when you use the image upload
   field.
3. If you'd rather upload images manually, keep the same structure:
   ```
   product-images/
     products/
       CS102/
         main.jpg
         1.jpg
   ```
   Then paste the public URL of each file into the product's Main Image /
   Additional Images fields in the admin panel.

---

## 4. WhatsApp configuration

Set **one** environment variable — `VITE_WHATSAPP_NUMBER` — with your
country code and number, digits only (no `+`, spaces or hyphens):

```
VITE_WHATSAPP_NUMBER=919876543210
```

Every WhatsApp button on the site (`src/utils/whatsapp.js`) reads from this
single value. To change your WhatsApp number later, update it in Netlify's
environment variables (or your local `.env`) and redeploy — you never need
to touch component code.

---

## 5. Store details, logo, colours and fonts

**Store name, tagline, phone, address, socials, hours:**
edit `src/config/store.js` — this is the single file that feeds the header,
footer, WhatsApp messages and SEO tags.

**Logo:** replace `public/logo.svg` with your own logo file (SVG or PNG),
and update `logoUrl` in `src/config/store.js` if you rename it.

**Colours and fonts:** edit `tailwind.config.js` under `theme.extend.colors`
(the `ink`, `sand`, `rust`, `gold` palette) and `theme.extend.fontFamily`.
If you change fonts, also update the Google Fonts `<link>` in `index.html`.

**Categories and filter options:** edit `src/config/filters.js` to add or
remove categories, subcategories, sizes and colours shown in the catalogue
filters.

**Homepage headline/buttons:** edit the `HERO_CONTENT` object at the top of
`src/pages/Home.jsx`.

---

## 6. How to add products

**Option A — Admin panel (recommended):**
1. Go to `/admin/login` on your deployed site and sign in.
2. Click **Add Product**, fill in the details, upload images, and save.
3. Toggle Available / Featured / New Arrival directly from the product list.

**Option B — SQL:** duplicate a row in `supabase/seed.sql` (or write a new
`insert into public.products (...) values (...)` statement) and run it in
the Supabase SQL Editor.

Required fields: `product_code` (unique), `name`, `slug` (unique, used in
the product URL), `category` (`men` / `women` / `kids`), `price`.

---

## 7. Netlify deployment

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build settings (already in `netlify.toml`, Netlify should detect them):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Under **Site settings → Environment variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
5. Deploy. `netlify.toml` already includes the redirect rule so deep links
   like `/product/premium-cotton-shirt-cs102` work correctly instead of
   404ing on refresh.

### Custom domain
In Netlify: **Site settings → Domain management → Add a custom domain**,
then follow Netlify's instructions to point your domain's DNS (usually an
A record or CNAME) at Netlify. Once it's live, update `siteUrl` in
`src/config/store.js` and `SITE_URL` usage in `scripts/generate-sitemap.js`
/ `public/robots.txt` to your real domain.

### Sitemap
`public/sitemap.xml` ships with the static pages only. Once Supabase is
connected, regenerate it with real product URLs:
```bash
npm run gen:sitemap
```
Re-run this whenever you add a meaningful number of new products, then
redeploy (or add it as a Netlify build-time step if you want it always current).

---

## 8. What's intentionally NOT included

Per the brief, this is a catalogue, not a store: no shopping cart, no
checkout, no payment gateway, no customer accounts. Every "buy" moment ends
in a pre-filled WhatsApp message to your store instead.

---

## 9. Troubleshooting

- **Site shows demo products instead of mine** → check `.env` has correct
  `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` and that you ran
  `schema.sql`.
- **WhatsApp button does nothing / opens blank chat** → `VITE_WHATSAPP_NUMBER`
  is missing or empty; check Netlify env vars and redeploy.
- **Admin login fails** → confirm the user exists under Supabase
  **Authentication → Users**, and that `schema.sql` policies were applied.
- **Images not showing** → check the `product-images` bucket is public, and
  that the URL saved on the product is the full public URL from Supabase
  Storage.
