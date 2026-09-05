import { useState } from 'react';
import ProductImage from './ProductImage';

export default function ProductGallery({ mainImage, additionalImages = [], alt }) {
  const images = [mainImage, ...(additionalImages || [])].filter(Boolean);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <ProductImage src={null} alt={alt} className="aspect-[3/4] w-full" />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] w-full overflow-hidden bg-sand-100">
        <ProductImage src={images[active]} alt={alt} eager className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={img + idx}
              onClick={() => setActive(idx)}
              className={`h-16 w-16 shrink-0 overflow-hidden border ${
                active === idx ? 'border-ink' : 'border-transparent'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <ProductImage src={img} alt={`${alt} thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
