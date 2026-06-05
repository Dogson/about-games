import React from "react";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-turquoise flex flex-col rounded-lg p-6 text-black shadow-lg
        shadow-white/10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
