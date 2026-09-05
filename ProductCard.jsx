import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { getCatalogueEnquiryUrl } from '../utils/whatsapp';

export default function ProductCard({ product }) {
  const {
    slug,
    name,
    product_code: code,
    price,
    mrp,
    discount_percentage: discount,
    is_available: available,
    sizes,
    main_image: image,
  } = product;

  return (
    <div className="group flex flex-col">
      <Link to={`/product/${slug}`} className="relative block aspect-[3/4] overflow-hidden bg-sand-100">
        <ProductImage
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-sm bg-rust px-2 py-1 text-[11px] font-semibold text-white">
            {discount}% OFF
          </span>
        )}
        {!available && (
          <span className="absolute inset-x-0 bottom-0 bg-ink/85 py-1.5 text-center text-[11px] font-medium tracking-wide text-white">
            Out of stock
          </span>
        )}
      </Link>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <Link to={`/product/${slug}`} className="line-clamp-1 text-sm font-medium text-ink hover:underline">
          {name}
        </Link>
        {code && <p className="text-xs text-ink-soft/60">Code: {code}</p>}

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ink">₹{Number(price).toLocaleString('en-IN')}</span>
          {mrp && Number(mrp) > Number(price) && (
            <span className="text-xs text-ink-soft/50 line-through">₹{Number(mrp).toLocaleString('en-IN')}</span>
          )}
        </div>

        {sizes?.length > 0 && (
          <p className="text-[11px] text-ink-soft/60">Sizes: {sizes.slice(0, 5).join(', ')}</p>
        )}

        <div className="mt-2 flex gap-2">
          <Link
            to={`/product/${slug}`}
            className="flex-1 rounded-sm border border-ink/15 py-2 text-center text-xs font-medium text-ink transition-colors hover:border-ink"
          >
            View Details
          </Link>
          <a
            href={getCatalogueEnquiryUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-sm bg-[#25D366] py-2 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
