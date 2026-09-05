/**
 * ============================================================
 * CENTRAL STORE CONFIGURATION
 * ============================================================
 * Change your store name, contact details, socials and opening
 * hours here — nowhere else in the codebase. Everything in the
 * app (header, footer, WhatsApp messages, SEO tags) reads from
 * this single file.
 *
 * DEMO CONTENT: the values below are placeholders for "Aavaran",
 * a sample fashion brand. Replace them with your real details
 * before going live.
 *
 * The WhatsApp number and Supabase keys come from environment
 * variables (.env) — never hard-code secrets or numbers here.
 * See .env.example for the full list of variables.
 * ============================================================
 */

export const storeConfig = {
  // --- Identity -------------------------------------------------
  name: 'Karthik Brow Fashion',
  tagline: 'Quality Fashion. Great Styles. Made for You.',
  logoUrl: '/logo.svg', // replace with your uploaded logo path or Supabase Storage URL

  // --- Contact ----------------------------------------------------
  // WhatsApp number is read from env so you never have to hunt
  // through the codebase to change it. Format: country code + number,
  // digits only, e.g. 919876543210
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  phone: '+91 98765 43210', // DEMO — replace with your store's public phone number
  email: 'hello@aavaran.example', // DEMO

  // --- Location -----------------------------------------------------
  address: {
    line1: 'Peelamedu',
    line2: 'Coimbatore, Tamil Nadu 641004',
    line3: 'India',
  },
  googleMapsUrl: 'https://maps.google.com/?q=Aavaran+Fashion+Store', // DEMO — replace with your real Maps link

  // --- Social -----------------------------------------------------
  instagramUrl: 'https://instagram.com/aavaran.store', // DEMO
  facebookUrl: 'https://facebook.com/aavaran.store', // DEMO

  // --- Hours --------------------------------------------------------
  openingHours: [
    { day: 'Monday – Saturday', hours: '10:00 AM – 8:30 PM' },
    { day: 'Sunday', hours: '10:00 AM – 8:30 PM' },
  ],

  // --- Legal pages (edit copy inside src/pages/legal/*.jsx) -------
  legal: {
    privacyPolicyUrl: '/privacy-policy',
    termsUrl: '/terms',
    returnsPolicyUrl: '/returns-exchange',
  },

  // --- SEO defaults ---------------------------------------------
  seo: {
    defaultTitle: 'Brow Fashions — Discover Your Style',
    defaultDescription:
      'Browse the latest men Browse the latest men's fashion. Enquire instantly on WhatsApp.— no account or checkout needed.',
    siteUrl: 'https://www.your-domain.example', // replace with your live Netlify/custom domain
  },
};

export default storeConfig;
