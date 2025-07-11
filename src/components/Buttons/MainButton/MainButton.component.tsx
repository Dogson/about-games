import React from "react";
import { ClipLoader } from "react-spinners";

export type MainButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  loading: boolean;
  children: React.ReactNode;
};

const MainButton: React.FC<MainButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  loading = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`font-title bg-maize flex cursor-pointer items-center gap-3
        rounded-md px-6 py-2 leading-none duration-50 duration-200 ${
          disabled || loading
            ? "cursor-default opacity-50"
            : `hover:translate-y-[-4px] hover:shadow-md
              active:translate-y-[-4px] active:shadow-md`
        } ${loading ? "translate-y-[-4px] shadow-md" : ""} ${className}`}
    >
      {children}
      {loading && <ClipLoader color="var(--color-ghost)" size={14} />}
    </button>
  );
};

export default MainButton;
