import { useRef, useCallback } from "react";

/**
 * useThrottle
 * Returns a throttled version of the callback that only fires once every `delay` ms.
 */
export const useThrottle = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastCall = useRef<number>(0);

  return useCallback(
    ((...args: unknown[]) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    }) as T,
    [callback, delay]
  );
};
