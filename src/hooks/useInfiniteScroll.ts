import { useEffect } from "react";
import { useThrottle } from "./useThrottle"; // adjust path as needed

/**
 * useInfiniteScroll
 * Calls `callback` when `ref` element enters viewport, throttled to avoid excessive firing.
 */
export const useInfiniteScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void,
  delay = 300 // throttle delay in ms
) => {
  const throttledCallback = useThrottle(callback, delay);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            throttledCallback();
          });
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      }
    );

    const el = ref.current;
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [ref, throttledCallback]);
};
