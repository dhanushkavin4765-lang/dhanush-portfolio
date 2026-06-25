import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when an element enters the viewport.
 * @param {Object} options - IntersectionObserver configurations.
 * @returns {[Object, boolean]} - Ref to attach, and isVisible boolean.
 */
export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Set visible and disconnect if we only want to animate once
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce) {
          observer.unobserve(currentElement);
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(currentElement);

    return () => {
      if (currentElement && !options.triggerOnce) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.triggerOnce, options.threshold, options.rootMargin]);

  return [elementRef, isVisible];
}
