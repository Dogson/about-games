import React from "react";

export type IconButtonProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  className?: string;
  noCircle?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
  hoverText?: string;
  iconClassName?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  onClick,
  isSmall,
  noCircle = false,
  className = "",
  disabled,
  hoverText,
  iconClassName = "text-turquoise",
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      title={hoverText}
      className={`flex items-center justify-center rounded-full p-1
        transition-all duration-200 hover:scale-110
        ${isSmall ? "h-6 w-6" : "h-8 w-8"}
        ${disabled ? "pointer-events-none opacity-50" : ""}
        ${noCircle
          ? "bg-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          : "bg-maize drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"} ${className}`}
      type="button"
      aria-label="icon button"
    >
      <Icon className={`${iconClassName} h-full w-full`} />
    </button>
  );
};

export default IconButton;
