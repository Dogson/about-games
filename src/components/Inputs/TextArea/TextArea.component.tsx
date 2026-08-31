import React from "react";

export type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string | null;
  required?: boolean;
  rows?: number;
  onFocus?: () => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  label,
  error,
  required = false,
  rows = 5,
  onFocus,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

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

      <textarea
        spellCheck={false}
        rows={rows}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-ghost px-4 py-2 text-sm text-black
          focus:ring-turquoise focus:ring-1 focus:outline-none
          ${error ? "border border-red-500" : ""}`}
        onFocus={onFocus}
      />

      {error && (
        <p className="mt-1 pl-5 text-sm font-bold text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextArea;
