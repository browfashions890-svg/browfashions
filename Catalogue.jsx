import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, count, loading, error, filters, updateFilter, resetFilters, page, setPage, totalPages } =
    useProducts({
      category: searchParams.get('category') || '',
      sortBy: searchParams.get('sort') || 'newest',
    });

  // Keep the URL query string in sync so links like /shop?category=men work
  // as shareable, bookmarkable links (and match what Header/Home link to).
  useEffect(() => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.sortBy && filters.sortBy !== 'newest') params.sort = filters.sortBy;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.sortBy]);

  return (
    <div className="container-page py-10">
      <SEO title="Shop" url="/shop" description="Browse the full clothing catalogue and enquire instantly on WhatsApp." />

      <h1 className="section-heading">Shop the Collection</h1>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilters filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} resultCount={count} />

        <div className="flex-1">
          <p className="mb-4 hidden text-sm text-ink-soft/70 lg:block">{count} products</p>
          <ProductGrid products={products} loading={loading} error={error} />

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-sm border border-ink/15 px-3 py-2 text-sm disabled:opacity-30"
              >
                Previous
              </button>
              <span className="text-sm text-ink-soft/70">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-sm border border-ink/15 px-3 py-2 text-sm disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
