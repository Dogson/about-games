import React from "react";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  Icon?: React.ReactNode;
  RightSlot?: React.ReactNode;
  className?: string;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  Icon,
  RightSlot,
  className = "",
  placeholder = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative flex w-full items-center ${className}`}>
      {Icon && <div className="absolute left-3 text-black">{Icon}</div>}

      <input
        type="text"
        spellCheck={false}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-full py-2 pr-10 pl-${Icon ? "10" : "4"}
          bg-ghost focus:ring-turquoise text-sm text-black focus:ring-1
          focus:outline-none`}
      />

      {RightSlot && (
        <div className="absolute right-3 flex items-center">{RightSlot}</div>
      )}
    </div>
  );
};

export default Input;
