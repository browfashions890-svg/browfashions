export default function SearchBar({ value, onChange, placeholder = 'Search products or product code…' }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full rounded-sm border border-ink/15 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-ink-soft/40 focus:border-ink"
      />
    </div>
  );
}
