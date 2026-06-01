import React from "react";
import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import { FiCheck } from "react-icons/fi";

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
}) => {
  const toggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      onClick={toggle}
      className={`flex cursor-pointer items-center gap-3 px-2 py-1
        ${disabled ? "cursor-not-allowed opacity-50" : ""} `}
    >
      <HeadlessCheckbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="border-turquoise flex h-5 w-5 items-center justify-center
          rounded border bg-transparent transition-all
          data-[disabled]:cursor-not-allowed"
      >
        <FiCheck
          className={`text-turquoise h-3.5 w-3.5 transition-transform
            ${checked ? "scale-100" : "scale-0"} `}
        />
      </HeadlessCheckbox>

      <span className="text-sm text-white select-none">{label}</span>
    </div>
  );
};

export default Checkbox;
