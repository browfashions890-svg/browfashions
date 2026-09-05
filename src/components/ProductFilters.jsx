import { useState } from 'react';
import { CATEGORIES, SUBCATEGORIES_BY_CATEGORY, SIZES, COLOURS, PRICE_RANGES, SORT_OPTIONS } from '../config/filters';
import SearchBar from './SearchBar';

function Select({ label, value, onChange, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-ink-soft/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-ink/15 bg-white py-2 px-2.5 text-sm focus:border-ink"
      >
        {children}
      </select>
    </label>
  );
}

export default function ProductFilters({ filters, updateFilter, resetFilters, resultCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const subcategoryOptions = filters.category ? SUBCATEGORIES_BY_CATEGORY[filters.category] || [] : [];

  const activePriceRange = PRICE_RANGES.find(
    (r) => r.min === filters.minPrice && (r.max === filters.maxPrice || (r.max === null && filters.maxPrice === null))
  );

  const body = (
    <div className="flex flex-col gap-5">
      <SearchBar value={filters.search} onChange={(v) => updateFilter('search', v)} />

      <Select label="Category" value={filters.category} onChange={(v) => { updateFilter('category', v); updateFilter('subcategory', ''); }}>
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </Select>

      <Select label="Subcategory" value={filters.subcategory} onChange={(v) => updateFilter('subcategory', v)}>
        <option value="">All subcategories</option>
        {subcategoryOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>

      <Select label="Size" value={filters.size} onChange={(v) => updateFilter('size', v)}>
        <option value="">All sizes</option>
        {SIZES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>

      <Select label="Colour" value={filters.colour} onChange={(v) => updateFilter('colour', v)}>
        <option value="">All colours</option>
        {COLOURS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>

      <Select
        label="Price"
        value={activePriceRange ? PRICE_RANGES.indexOf(activePriceRange) : ''}
        onChange={(idx) => {
          const range = PRICE_RANGES[idx];
          if (!range) {
            updateFilter('minPrice', null);
            updateFilter('maxPrice', null);
          } else {
            updateFilter('minPrice', range.min);
            updateFilter('maxPrice', range.max);
          }
        }}
      >
        <option value="">Any price</option>
        {PRICE_RANGES.map((r, idx) => (
          <option key={r.label} value={idx}>{r.label}</option>
        ))}
      </Select>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={filters.availableOnly}
          onChange={(e) => updateFilter('availableOnly', e.target.checked)}
          className="h-4 w-4 rounded-sm border-ink/30"
        />
        In stock only
      </label>

      <Select label="Sort by" value={filters.sortBy} onChange={(v) => updateFilter('sortBy', v)}>
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </Select>

      <button onClick={resetFilters} className="text-left text-xs font-medium text-rust hover:underline">
        Clear all filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <p className="text-sm text-ink-soft/70">{resultCount} products</p>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-sm border border-ink/15 px-4 py-2 text-sm font-medium"
        >
          Filters
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">{body}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-sand-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg">Filters</h3>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters">✕</button>
            </div>
            {body}
            <button onClick={() => setMobileOpen(false)} className="btn-primary mt-6">
              Show {resultCount} results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
