import React from "react";
import { ClipLoader } from "react-spinners";

export type SecondaryButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  loading = false,
  children,
  Icon,
}) => {
  const handleClick = () => {
    if (disabled || loading) return;
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`text-corn hover:border-b-corn hover:text-corn/90 font-regular
        relative flex items-center gap-3 text-sm underline underline-offset-2
        transition duration-200 focus:outline-none
        ${disabled || loading ? "cursor-default opacity-50" : "cursor-pointer"}
        ${className}`}
    >
      {Icon && <Icon className="text-corn" />}
      {children}
      {loading && (
        <div className="absolute right-[-18px]">
          <ClipLoader color="var(--color-corn)" size={12} />
        </div>
      )}
    </button>
  );
};

export default SecondaryButton;
