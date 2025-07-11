import React, { useState, useRef, useEffect, useCallback } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

type CarouselProps = {
  items: string[];
  type: "videos" | "images";
};

const Carousel = React.memo(({ items, type }: CarouselProps) => {
  const [index, setIndex] = useState(0); // Current media index
  const [loading, setLoading] = useState(true); // Shimmer placeholder
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(false); // For autoplay control

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect when carousel enters viewport
  useInfiniteScroll(containerRef, () => setIsVisible(true));

  // Handle autoplay + loop or next logic on video end
  const handleVideoEnded = useCallback(() => {
    if (items.length === 1) {
      videoRef.current?.play(); // Loop if only one
    } else {
      setIndex((prev) => (prev + 1) % items.length); // Go to next video
    }
  }, [items.length]);

  // When index changes, delay rendering for shimmer (better UX)
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    return () => {
      videoRef.current?.pause();
    };
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden will-change-transform"
    >
      <div className="aspect-video">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl" />
        ) : type === "videos" ? (
          <video
            ref={videoRef}
            src={items[index]}
            autoPlay // ← ensures autoplay on mount
            muted // ← required for autoplay on most browsers
            playsInline
            controls
            preload="metadata"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover rounded-xl transition-opacity duration-500"
          />
        ) : (
          <img
            src={items[index]}
            srcSet={`${items[index]}?w=480 480w, ${items[index]}?w=768 768w, ${items[index]}?w=1024 1024w`}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={`Media ${index + 1}`}
            loading="lazy"
            className="w-full h-full object-cover rounded-xl transition-opacity duration-500"
          />
        )}
      </div>

      {/* Navigation Buttons + Indicator */}
      {items.length > 1 && !loading && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black px-3 py-1 rounded-full shadow"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black px-3 py-1 rounded-full shadow"
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full shadow">
            {index + 1} / {items.length}
          </div>
        </>
      )}
    </div>
  );
});

export default Carousel;
