import { useEffect, type RefObject } from "react";

const useElementInViewport = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: (inView: boolean) => void, // true if in viewport, false if not
  options?: IntersectionObserverInit,
): void => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      options ?? { root: null, threshold: 0 }, // default: viewport, trigger on any visibility
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, callback, options]);
};

export default useElementInViewport;
