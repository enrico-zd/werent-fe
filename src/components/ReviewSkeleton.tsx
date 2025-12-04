export default function ReviewsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-2.5 max-w-2xl lg:max-w-full mx-auto lg:ml-6">
          {/* back button skeleton */}
          <div className="h-9 w-9 rounded hover:bg-gray-100 flex items-center justify-center">
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* title */}
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />

          {/* spacer */}
          <div className="w-10" />
        </div>
      </div>

      {/* Rating Overview */}
      <div className="border-b border-gray-200 p-4 max-w-2xl lg:max-w-full mx-auto lg:mx-6">
        <div className="flex items-start gap-6 mb-6">
          {/* big rating number */}
          <div className="h-12 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-col gap-2">
            {/* stars */}
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            {/* text "Based on X reviews" */}
            <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Fit Scale title */}
        <div className="h-5 w-24 bg-gray-200 rounded mb-4 animate-pulse" />

        {/* Fit Scale bars */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              {/* label */}
              <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
              {/* bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gray-300 h-full w-1/2 animate-pulse" />
              </div>
              {/* percentage */}
              <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Review List skeleton */}
      <div className="space-y-8 mt-6 lg:mx-6 max-w-2xl lg:max-w-full mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-b-2 border-gray-200 pb-4 pt-1 animate-pulse mx-4"
          >
            {/* Top row: name + date */}
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

            {/* stars */}
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />

            {/* comment lines */}
            <div className="space-y-2 mb-3">
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 rounded" />
              <div className="h-3 w-2/3 bg-gray-200 rounded" />
            </div>

            {/* optional bottom meta (size, fit) */}
            <div className="flex gap-4">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
