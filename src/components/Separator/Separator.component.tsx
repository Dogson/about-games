import React, { useEffect, useRef, useState } from "react";

type BulletSize = "sm" | "md" | "lg";
type Direction = "horizontal" | "vertical";

export interface SeparatorProps {
  bulletSize: BulletSize;
  direction: Direction;
}

const bulletSizesPx = {
  sm: 2,
  md: 3,
  lg: 4,
};

const paddingClasses = {
  sm: {
    horizontal: "py-2",
    vertical: "px-2",
  },
  md: {
    horizontal: "py-4",
    vertical: "px-4",
  },
  lg: {
    horizontal: "py-6",
    vertical: "px-6",
  },
};

const spacings = {
  sm: 8,
  md: 10,
  lg: 12,
};

export const Separator: React.FC<SeparatorProps> = ({
  bulletSize,
  direction,
}) => {
  const size = bulletSizesPx[bulletSize];
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const calculateCount = () => {
      const length =
        direction === "horizontal" ? element.clientWidth : element.clientHeight;
      const dotsThatFit = Math.floor(length / spacings[bulletSize]);
      setCount(dotsThatFit > 0 ? dotsThatFit : 1); // fallback to 1 dot
    };

    calculateCount();

    const resizeObserver = new ResizeObserver(() => {
      calculateCount();
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [direction, bulletSize]);

  const paddingClass =
    direction === "horizontal"
      ? paddingClasses[bulletSize].horizontal
      : paddingClasses[bulletSize].vertical;

  const containerClass =
    direction === "horizontal"
      ? `flex flex-row w-full items-center justify-between flex-nowrap ${paddingClass}`
      : `flex flex-col self-stretch justify-between flex-nowrap ${paddingClass}`;

  const dotStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: "#40e0d0",
    flexShrink: 0,
    opacity: "70%",
  };

  const dots = Array.from({ length: count }, (_, i) => (
    <span key={i} style={dotStyle} />
  ));

  return (
    <div ref={containerRef} className={containerClass} aria-hidden="true">
      {dots}
    </div>
  );
};
