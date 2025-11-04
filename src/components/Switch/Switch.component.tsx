import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  danger?: boolean; // optional: for red/salmon variant
};

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className,
  danger = false,
}) => {
  const handleToggle = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <div
      className={classNames(
        "flex min-w-0 grow-0 items-center gap-3 select-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {label && (
        <span className="text-ghost font-medium tracking-tight">{label}</span>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className={classNames(
          `relative flex h-7 w-12 items-center rounded-full transition-colors
          duration-300`,
          checked
            ? danger
              ? "bg-salmon shadow-[0_0_10px_#f49097aa]"
              : "bg-turquoise shadow-[0_0_10px_#55d6c2aa]"
            : "bg-maize-dark shadow-inner",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          className={classNames(
            "bg-ghost absolute h-5 w-5 rounded-full shadow-md",
            checked ? "left-[calc(100%-1.6rem)]" : "left-1",
          )}
        />
      </button>
    </div>
  );
};

export default Switch;
