import React from "react";

export type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  labelAction?: React.ReactNode;
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
  labelAction,
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
        <div className="mb-1 flex items-center justify-between gap-2 px-2">
          <label className="text-turquoise font-title text-sm font-medium">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {labelAction && <div className="shrink-0">{labelAction}</div>}
        </div>
      )}

      <textarea
        spellCheck={false}
        rows={rows}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`bg-ghost focus:ring-turquoise w-full rounded-xl px-4 py-2
          text-sm text-black focus:ring-1 focus:outline-none
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
