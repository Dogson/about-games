import React from "react";

export type SecondaryButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`text-corn hover:border-b-corn hover:text-corn/90 text-xs
        underline underline-offset-2 transition duration-200 focus:outline-none
        ${disabled ? "cursor-default opacity-50" : "cursor-pointer"}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
