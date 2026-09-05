import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductGallery from '../components/ProductGallery';
import { SizeSelector, ColourSelector } from '../components/VariantSelector';
import { ProductDetailsSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { fetchProductBySlug } from '../services/productsService';
import { getProductEnquiryUrl, isWhatsAppConfigured } from '../utils/whatsapp';
import { useStickyWhatsApp } from '../context/StickyWhatsAppContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const [state, setState] = useState({ product: null, loading: true, error: null });
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');

  useEffect(() => {
    let active = true;
    setState({ product: null, loading: true, error: null });
    fetchProductBySlug(slug).then(({ data, error }) => {
      if (!active) return;
      setState({ product: data, loading: false, error });
      setSize(data?.sizes?.[0] || '');
      setColour(data?.colours?.[0] || '');
    });
    return () => {
      active = false;
    };
  }, [slug]);

  // Hooks must run unconditionally (before any early returns below), so the
  // sticky mobile CTA is wired up here using whatever product data we have.
  const enquiryUrlForSticky = state.product ? getProductEnquiryUrl(state.product, { size, colour }) : null;
  useStickyWhatsApp(enquiryUrlForSticky, 'Enquire on WhatsApp');

  if (state.loading) {
    return (
      <div className="container-page py-10">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Couldn't load this product"
          description="There was a problem reaching the store database. Please try again shortly."
        />
      </div>
    );
  }

  if (!state.product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          action={
            <Link to="/shop" className="btn-primary">
              Back to Shop
            </Link>
          }
        />
      </div>
    );
  }

  const p = state.product;
  const enquiryUrl = enquiryUrlForSticky;
  const colourImage = colour && p.colour_images ? p.colour_images[colour] : null;
  const effectiveMainImage = colourImage || p.main_image;

  return (
    <div className="container-page py-10 sm:pb-10">
      <SEO
        title={p.name}
        url={`/product/${p.slug}`}
        description={p.description?.slice(0, 155)}
        image={p.main_image}
        type="product"
      />

      <nav className="mb-6 text-xs text-ink-soft/60">
        <Link to="/shop" className="hover:underline">Shop</Link> / {p.category} / {p.name}
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery
          key={colour || 'default'}
          mainImage={effectiveMainImage}
          additionalImages={p.additional_images}
          alt={p.name}
        />

        <div>
          <h1 className="font-display text-3xl text-ink">{p.name}</h1>
          {p.product_code && <p className="mt-1 text-sm text-ink-soft/60">Product Code: {p.product_code}</p>}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-ink">₹{Number(p.price).toLocaleString('en-IN')}</span>
            {p.mrp && Number(p.mrp) > Number(p.price) && (
              <>
                <span className="text-base text-ink-soft/50 line-through">₹{Number(p.mrp).toLocaleString('en-IN')}</span>
                {p.discount_percentage > 0 && (
                  <span className="rounded-sm bg-rust px-2 py-0.5 text-xs font-semibold text-white">
                    {p.discount_percentage}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          <p className={`mt-3 text-sm font-medium ${p.is_available ? 'text-green-700' : 'text-ink-soft/50'}`}>
            {p.is_available ? 'In stock' : 'Currently out of stock'}
          </p>

          {p.description && <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-soft/80">{p.description}</p>}

          <div className="mt-6 flex flex-col gap-5">
            <SizeSelector sizes={p.sizes} value={size} onChange={setSize} />
            <ColourSelector colours={p.colours} value={colour} onChange={setColour} />
          </div>

          <dl className="mt-6 space-y-1 text-sm text-ink-soft/70">
            {p.fabric && (
              <div className="flex gap-2">
                <dt className="font-medium text-ink">Fabric:</dt>
                <dd>{p.fabric}</dd>
              </div>
            )}
            {p.care_instructions && (
              <div className="flex gap-2">
                <dt className="font-medium text-ink">Care:</dt>
                <dd>{p.care_instructions}</dd>
              </div>
            )}
          </dl>

          <a
            href={enquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-8 hidden w-full sm:inline-flex"
          >
            🟢 Enquire on WhatsApp
          </a>
          {!isWhatsAppConfigured() && (
            <p className="mt-2 text-xs text-rust">
              WhatsApp number not configured yet — add VITE_WHATSAPP_NUMBER to your .env file.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
