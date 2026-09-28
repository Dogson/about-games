import { useEffect, useRef, useState, type RefObject } from "react";

export type UseElementWidth = {
  ref: RefObject<HTMLDivElement | null>;
  width: number;
};

const useElementWidth = (): UseElementWidth => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
};

export default useElementWidth;
