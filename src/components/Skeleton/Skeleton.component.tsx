import React from "react";

export type SkeletonProps = {
  className?: string;
  light?: boolean;
};

const Skeleton: React.FC<SkeletonProps> = ({ className = "", light = false }) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse ${light ? "bg-ghost/80" : "bg-black"} ${className}`}
      style={{ animationDuration: "4s" }}
    />
  );
};

export default Skeleton;
