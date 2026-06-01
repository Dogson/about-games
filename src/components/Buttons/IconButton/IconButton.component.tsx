import React from "react";

export type IconButtonProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  className?: string;
  noCircle?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
  hoverText?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  onClick,
  isSmall,
  noCircle = false,
  className = "",
  disabled,
  hoverText,
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
        ${noCircle ? "bg-transparent" : "bg-maize"} ${className}`}
      type="button"
      aria-label="icon button"
    >
      <Icon className="text-turquoise h-full w-full" />
    </button>
  );
};

export default IconButton;
