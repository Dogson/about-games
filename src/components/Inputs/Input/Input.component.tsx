import React from "react";
import { ClipLoader } from "react-spinners";
import { FiX } from "react-icons/fi";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  Icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string | null;
  required?: boolean;
  loading?: boolean;
  clearable?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  Icon,
  className = "",
  placeholder = "",
  label,
  error,
  required = false,
  loading = false,
  clearable = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const showClearButton = clearable && value.length > 0 && !loading;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          className="text-turquoise font-title mb-1 block px-2 text-sm
            font-medium"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && <div className="absolute left-3 text-black">{Icon}</div>}

        <input
          type="text"
          spellCheck={false}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full rounded-full py-2 pr-10 ${Icon ? "pl-10" : "pl-4"}
            bg-ghost focus:ring-turquoise text-sm text-black focus:ring-1
            focus:outline-none ${error ? "border border-red-500" : ""}`}
        />

        {(loading || showClearButton) && (
          <div className="absolute right-3 flex items-center">
            {loading ? (
              <ClipLoader size={16} color="var(--color-black)" />
            ) : (
              <button
                onClick={() => onChange("")}
                className="text-black"
                aria-label="Clear input"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 pl-5 text-sm font-bold text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
