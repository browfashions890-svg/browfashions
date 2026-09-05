import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';
import { fetchFeaturedProducts, fetchNewArrivals, fetchCategorySummary } from '../services/productsService';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

// Editable homepage text — change headline, subheading and button labels here.
const HERO_CONTENT = {
  eyebrow: 'New Season',
  headline: 'Discover Your Style',
  subheading: 'Quality Fashion. Great Styles. Made for You.',
  primaryCta: { label: 'View Collection', to: '/shop' },
  secondaryCta: { label: 'WhatsApp Us', href: getGeneralEnquiryUrl() },
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=70',
};

const TRUST_POINTS = [
  { title: 'Quality Products', description: 'Every piece is checked for fabric, fit and finish before it reaches you.' },
  { title: 'Latest Collections', description: 'New styles added regularly across men\u2019s, women\u2019s and kids\u2019 wear.' },
  { title: 'Affordable Prices', description: 'Honest pricing on every product, with clear discounts where they apply.' },
  { title: 'Friendly Service', description: 'Real answers on WhatsApp — sizing help, availability, styling advice.' },
];

const CATEGORY_CARDS = [
  { title: 'Men', to: '/shop?category=men', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=60', key: 'men' },
 { title: 'New Arrivals', to: '/shop?sort=newest', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=60' },
];

export default function Home() {
  const [featured, setFeatured] = useState({ data: [], loading: true, error: null });
  const [arrivals, setArrivals] = useState({ data: [], loading: true, error: null });
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    fetchFeaturedProducts(8).then(({ data, error }) => setFeatured({ data, loading: false, error }));
    fetchNewArrivals(8).then(({ data, error }) => setArrivals({ data, loading: false, error }));
    fetchCategorySummary().then(({ data }) => setCategoryCounts(data));
  }, []);

  return (
    <>
      <SEO url="/" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="container-page grid min-h-[70vh] items-center gap-10 py-16 sm:py-24 md:grid-cols-2">
          <div className="relative z-10 text-sand-50">
            <p className="text-xs font-medium uppercase tracking-wideish text-gold-light">{HERO_CONTENT.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">{HERO_CONTENT.headline}</h1>
            <p className="mt-5 max-w-md text-sand-200/80">{HERO_CONTENT.subheading}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={HERO_CONTENT.primaryCta.to} className="btn bg-sand-50 text-ink hover:bg-sand-100">
                {HERO_CONTENT.primaryCta.label}
              </Link>
              <a
                href={HERO_CONTENT.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                {HERO_CONTENT.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-[560px]">
            <img
              src={HERO_CONTENT.image}
              alt="Fashion collection"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16">
        <h2 className="section-heading">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {CATEGORY_CARDS.map((c) => (
            <CategoryCard key={c.title} title={c.title} image={c.image} to={c.to} count={c.key ? categoryCounts[c.key] : undefined} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-8">
        <div className="flex items-end justify-between">
          <h2 className="section-heading">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium text-rust hover:underline">View all</Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featured.data} loading={featured.loading} error={featured.error} />
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-page py-8">
        <div className="flex items-end justify-between">
          <h2 className="section-heading">New Arrivals</h2>
          <Link to="/shop?sort=newest" className="text-sm font-medium text-rust hover:underline">View all</Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={arrivals.data} loading={arrivals.loading} error={arrivals.error} />
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-sand-100 py-16">
        <div className="container-page">
          <h2 className="section-heading text-center">Why Choose Us</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="text-center">
                <h3 className="font-display text-lg text-ink">{point.title}</h3>
                <p className="mt-2 text-sm text-ink-soft/70">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-rust py-16 text-center text-sand-50">
        <div className="container-page">
          <h2 className="font-display text-3xl sm:text-4xl">Looking for something specific?</h2>
          <p className="mx-auto mt-3 max-w-md text-sand-100/85">
            Send us a WhatsApp message and we&apos;ll help you find it.
          </p>
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex btn bg-sand-50 text-rust hover:bg-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
