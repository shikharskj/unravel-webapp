const HotelDetailsSkeleton = () => {
  return (
    <section className="bg-gradient-to-r from-[#000328] to-[#00458e] text-white rounded-2xl shadow-xl p-8 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
      {/* Left Content Skeleton */}
      <div className="space-y-4">
        <div className="h-10 w-3/4 bg-white/30 rounded-md"></div>
        <div className="h-4 w-1/3 bg-white/20 rounded-md"></div>
        <div className="h-4 w-1/2 bg-white/20 rounded-md"></div>
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full bg-white/10 rounded-md"></div>
          <div className="h-4 w-[90%] bg-white/10 rounded-md"></div>
          <div className="h-4 w-[80%] bg-white/10 rounded-md"></div>
          <div className="h-4 w-[70%] bg-white/10 rounded-md"></div>
        </div>
        <div className="flex gap-3 flex-wrap mt-4">
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="h-6 w-24 bg-white/20 rounded-md"></div>
            ))}
        </div>
      </div>

      {/* Right Content Skeleton (Tabs + Carousel) */}
      <div className="space-y-3">
        <div className="flex gap-4">
          <div className="h-8 w-20 bg-white/30 rounded-md"></div>
          <div className="h-8 w-20 bg-white/10 rounded-md"></div>
        </div>
        <div className="aspect-video bg-white/10 rounded-xl"></div>
      </div>
    </section>
  );
};

export default HotelDetailsSkeleton;
