import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sampleProducts } from '../data/sampleProducts';

const PAGE_SIZE = 12;

/**
 * All product reads go through this service. When Supabase isn't
 * configured yet (no .env values), it transparently falls back to the
 * bundled demo data so the site is never blank during setup. Once you add
 * real Supabase credentials, every function below automatically starts
 * querying the live database instead — no other code needs to change.
 */

function applyClientFilters(list, filters = {}) {
  let result = [...list];
  const { search, category, subcategory, size, colour, minPrice, maxPrice, availableOnly } = filters;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.product_code.toLowerCase().includes(q)
    );
  }
  if (category) result = result.filter((p) => p.category === category);
  if (subcategory) result = result.filter((p) => p.subcategory === subcategory);
  if (size) result = result.filter((p) => (p.sizes || []).includes(size));
  if (colour) result = result.filter((p) => (p.colours || []).includes(colour));
  if (minPrice != null) result = result.filter((p) => Number(p.price) >= Number(minPrice));
  if (maxPrice != null) result = result.filter((p) => Number(p.price) <= Number(maxPrice));
  if (availableOnly) result = result.filter((p) => p.is_available);

  return result;
}

function applySort(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popular':
      // Demo fallback has no real popularity metric; featured items first.
      return sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

/**
 * Fetch a filtered, sorted, paginated list of products.
 * Returns { data, count, error }.
 */
export async function fetchProducts({
  page = 1,
  pageSize = PAGE_SIZE,
  search = '',
  category = '',
  subcategory = '',
  size = '',
  colour = '',
  minPrice = null,
  maxPrice = null,
  availableOnly = false,
  sortBy = 'newest',
} = {}) {
  if (!isSupabaseConfigured()) {
    const filtered = applySort(
      applyClientFilters(sampleProducts, {
        search,
        category,
        subcategory,
        size,
        colour,
        minPrice,
        maxPrice,
        availableOnly,
      }),
      sortBy
    );
    const start = (page - 1) * pageSize;
    return { data: filtered.slice(start, start + pageSize), count: filtered.length, error: null };
  }

  try {
    let query = supabase.from('products').select('*', { count: 'exact' });

    if (search) query = query.or(`name.ilike.%${search}%,product_code.ilike.%${search}%`);
    if (category) query = query.eq('category', category);
    if (subcategory) query = query.eq('subcategory', subcategory);
    if (size) query = query.contains('sizes', [size]);
    if (colour) query = query.contains('colours', [colour]);
    if (minPrice != null) query = query.gte('price', minPrice);
    if (maxPrice != null) query = query.lte('price', maxPrice);
    if (availableOnly) query = query.eq('is_available', true);

    if (sortBy === 'price_asc') query = query.order('price', { ascending: true });
    else if (sortBy === 'price_desc') query = query.order('price', { ascending: false });
    else if (sortBy === 'popular') query = query.order('is_featured', { ascending: false });
    else query = query.order('created_at', { ascending: false });

    const start = (page - 1) * pageSize;
    query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], count: count || 0, error: null };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[productsService.fetchProducts]', error);
    return { data: [], count: 0, error };
  }
}

export async function fetchFeaturedProducts(limit = 8) {
  if (!isSupabaseConfigured()) {
    const featured = sampleProducts.filter((p) => p.is_featured).slice(0, limit);
    return { data: featured, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_available', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return { data: data || [], error: null };
  } catch (error) {
    console.error('[productsService.fetchFeaturedProducts]', error);
    return { data: [], error };
  }
}

export async function fetchNewArrivals(limit = 8) {
  if (!isSupabaseConfigured()) {
    const arrivals = sampleProducts.filter((p) => p.is_new_arrival).slice(0, limit);
    return { data: arrivals, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new_arrival', true)
      .eq('is_available', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return { data: data || [], error: null };
  } catch (error) {
    console.error('[productsService.fetchNewArrivals]', error);
    return { data: [], error };
  }
}

export async function fetchProductBySlug(slug) {
  if (!isSupabaseConfigured()) {
    const found = sampleProducts.find((p) => p.slug === slug) || null;
    return { data: found, error: null };
  }
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
    if (error) throw error;
    return { data: data || null, error: null };
  } catch (error) {
    console.error('[productsService.fetchProductBySlug]', error);
    return { data: null, error };
  }
}

export async function fetchCategorySummary() {
  // Used for the homepage category cards — counts per category.
  if (!isSupabaseConfigured()) {
    const counts = sampleProducts.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    return { data: counts, error: null };
  }
  try {
    const { data, error } = await supabase.from('products').select('category').eq('is_available', true);
    if (error) throw error;
    const counts = (data || []).reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    return { data: counts, error: null };
  } catch (error) {
    console.error('[productsService.fetchCategorySummary]', error);
    return { data: {}, error };
  }
}

export { PAGE_SIZE };
