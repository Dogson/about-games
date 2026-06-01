import React from "react";
import Select, {
  components,
  type SingleValue,
  type DropdownIndicatorProps,
  type GroupBase,
} from "react-select";
import { FiChevronDown } from "react-icons/fi";

export type SelectOption = {
  label: React.ReactNode;
  value: string;
};

export type SelectInputProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  Icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string | null;
  required?: boolean;
  size?: "sm" | "md";
};

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, false, GroupBase<SelectOption>>,
) => (
  <components.DropdownIndicator {...props}>
    <FiChevronDown size={16} />
  </components.DropdownIndicator>
);

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  Icon,
  className = "",
  placeholder = "",
  label,
  error,
  required = false,
  size = "md",
}) => {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

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

      <div className="relative">
        {Icon && (
          <div
            className="absolute top-1/2 left-3 z-10 -translate-y-1/2 text-black"
          >
            {Icon}
          </div>
        )}

        <Select<SelectOption, false>
          options={options}
          value={selectedOption}
          isDisabled={disabled}
          isSearchable={false}
          placeholder={placeholder}
          unstyled
          components={{
            DropdownIndicator,
            IndicatorSeparator: null,
          }}
          onChange={(option: SingleValue<SelectOption>) =>
            onChange(option?.value ?? "")
          }
          classNames={{
            control: ({ isFocused }) =>
              [
                "w-full rounded-full bg-ghost text-sm text-black",
                "outline-none",
                size === "sm" ? "min-h-[32px]" : "min-h-[40px]",
                Icon ? "pl-10" : "pl-4",
                error
                  ? "border border-red-500"
                  : isFocused
                    ? "ring-1 ring-turquoise"
                    : "",
              ].join(" "),

            valueContainer: () => "p-0",

            input: () => "m-0 p-0 text-sm text-black",

            singleValue: () => "text-sm text-black",

            placeholder: () => "text-sm text-black opacity-70",

            dropdownIndicator: () => "px-3 text-black",

            menu: () =>
              "mt-1 overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200 z-50",

            menuList: () => "py-1",

            option: ({ isFocused, isSelected }) =>
              [
                "cursor-pointer px-4 py-2 text-sm text-black",
                isFocused ? "bg-gray-100" : "",
                isSelected ? "font-medium" : "",
              ].join(" "),
          }}
        />
      </div>

      {error && (
        <p className="mt-1 pl-5 text-sm font-bold text-red-500">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;
