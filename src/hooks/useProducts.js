import { useCallback, useEffect, useState } from 'react';
import { fetchProducts, PAGE_SIZE } from '../services/productsService';
import { useDebounce } from './useDebounce';

const DEFAULT_FILTERS = {
  search: '',
  category: '',
  subcategory: '',
  size: '',
  colour: '',
  minPrice: null,
  maxPrice: null,
  availableOnly: false,
  sortBy: 'newest',
};

export function useProducts(initialFilters = {}) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 350);

  const updateFilter = useCallback((key, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchProducts({ ...filters, search: debouncedSearch, page, pageSize: PAGE_SIZE })
      .then(({ data, count: total, error: err }) => {
        if (!active) return;
        if (err) setError(err);
        setProducts(data);
        setCount(total);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    filters.category,
    filters.subcategory,
    filters.size,
    filters.colour,
    filters.minPrice,
    filters.maxPrice,
    filters.availableOnly,
    filters.sortBy,
    page,
  ]);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return {
    products,
    count,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    page,
    setPage,
    totalPages,
  };
}
