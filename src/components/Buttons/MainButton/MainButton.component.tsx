import React from "react";
import { ClipLoader } from "react-spinners";

export type MainButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type?: "button" | "submit";
  danger?: boolean;
};

const MainButton: React.FC<MainButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  loading = false,
  children,
  type = "button",
  Icon,
  danger = false,
}) => {
  const handleClick = () => {
    if (disabled || loading) return;
    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`font-title bg-maize relative flex items-center justify-center
        gap-3 rounded-md px-10 py-3 leading-none duration-200 ${
          disabled || loading
            ? "pointer-events-none cursor-default opacity-50"
            : `cursor-pointer hover:translate-y-[-4px] hover:shadow-md
              active:translate-y-[-4px] active:shadow-md`
        } ${loading ? "translate-y-[-4px] shadow-md" : ""}
        ${danger ? "bg-salmon text-ghost" : ""} ${className}`}
    >
      {Icon && <Icon className="text-turquoise" />}
      {children}
      {loading && (
        <div className="absolute right-5">
          <ClipLoader color="var(--color-ghost)" size={14} />
        </div>
      )}
    </button>
  );
};

export default MainButton;
