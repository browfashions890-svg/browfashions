export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="skeleton h-3.5 w-3/4" />
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-8 w-full" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-1/4" />
        <div className="skeleton h-8 w-3/4" />
        <div className="skeleton h-6 w-1/3" />
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    </div>
  );
}
