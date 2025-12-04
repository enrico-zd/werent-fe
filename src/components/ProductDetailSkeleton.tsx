export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Image section */}
      <div className="relative bg-gray-100">
        <div className="h-96 bg-gray-200 animate-pulse" />
      </div>

      {/* Content */}
      <div className="max-w-4xl lg:max-w-full mx-auto lg:mx-6 px-6 py-6 lg:px-0">
        {/* Title, price, rating, description */}
        <div className="mb-4 space-y-3">
          {/* Title */}
          <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />
          {/* Price */}
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />

          {/* Rating + total reviews */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* AVAILABLE SIZE */}
        <div className="flex flex-col mb-4">
          <div className="h-4 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 w-10 border border-gray-200 rounded flex items-center justify-center"
              >
                <div className="h-3 w-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-gray-200 my-3" />

        {/* Reviews section */}
        <div className="mb-8">
          {/* Header reviews + view more */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Average rating row */}
          <div className="mb-6">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Size distribution skeleton */}
          <div className="space-y-3 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                {/* label (small / true / large) */}
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />

                {/* bar */}
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gray-300 h-full w-1/2 animate-pulse" />
                </div>

                {/* percentage */}
                <div className="w-10 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-8" />
        </div>
      </div>
    </div>
  );
}
