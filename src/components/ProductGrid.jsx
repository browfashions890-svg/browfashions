import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './LoadingSkeleton';
import EmptyState from './EmptyState';

export default function ProductGrid({ products, loading, error }) {
  if (loading) return <ProductGridSkeleton />;

  if (error) {
    return (
      <EmptyState
        title="Couldn't load products"
        description="Something went wrong reaching the store database. Please try again in a moment."
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your filters, or send us a WhatsApp message and we'll help you find what you're looking for."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
