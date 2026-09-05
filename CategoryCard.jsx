import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

export default function CategoryCard({ title, image, to, count }) {
  return (
    <Link to={to} className="group relative block aspect-[4/5] overflow-hidden bg-sand-100">
      <ProductImage
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
        <span className="font-display text-lg text-sand-50">{title}</span>
        {typeof count === 'number' && (
          <span className="text-xs text-sand-100/80">{count} items</span>
        )}
      </div>
    </Link>
  );
}
