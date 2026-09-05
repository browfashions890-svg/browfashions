export function SizeSelector({ sizes = [], value, onChange }) {
  if (!sizes.length) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink-soft/70">Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`min-w-[3rem] rounded-sm border px-3 py-2 text-sm transition-colors ${
              value === size ? 'border-ink bg-ink text-sand-50' : 'border-ink/20 text-ink hover:border-ink'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ColourSelector({ colours = [], value, onChange }) {
  if (!colours.length) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink-soft/70">Colour</p>
      <div className="flex flex-wrap gap-2">
        {colours.map((colour) => (
          <button
            key={colour}
            onClick={() => onChange(colour)}
            className={`rounded-sm border px-3 py-2 text-sm transition-colors ${
              value === colour ? 'border-ink bg-ink text-sand-50' : 'border-ink/20 text-ink hover:border-ink'
            }`}
          >
            {colour}
          </button>
        ))}
      </div>
    </div>
  );
}
