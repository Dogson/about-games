import React from "react";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-ghost rounded-lg p-6 shadow-lg shadow-white/10 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
