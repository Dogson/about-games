import React from "react";
import Checkbox from "../Checkbox/Checkbox.component";

export type CheckboxOption = {
  label: React.ReactNode;
  value: string;
};

export type CheckboxGroupProps = {
  label?: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const handleToggle = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className="text-turquoise font-title block px-2 text-sm font-medium"
        >
          {label}
        </label>
      )}

      <div className="flex flex-col">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(checked) => handleToggle(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
