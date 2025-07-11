
const VariantSkeleton = () => (
  <div className="rounded-xl border border-gray-200 p-4 shadow bg-white animate-pulse">
    <div className="aspect-video bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-1/3 mb-1"></div>
    <div className="h-3 bg-gray-300 rounded w-1/4 mb-1"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2 mb-3"></div>
    <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-8 bg-green-300 rounded w-full"></div>
  </div>
);

export default VariantSkeleton;