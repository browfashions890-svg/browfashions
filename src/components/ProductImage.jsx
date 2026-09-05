import { useState } from 'react';

export default function ProductImage({ src, alt, className = '', eager = false }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`flex items-center justify-center bg-sand-100 text-sand-300 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-10 w-10">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 16l5-5 4 4 5-6 4 5" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}
