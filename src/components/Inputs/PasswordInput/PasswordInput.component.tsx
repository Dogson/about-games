import React from "react";
import Input from "../Input/Input.component.tsx";
import { LuLock } from "react-icons/lu";

export type PasswordInputProps = {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  onFocus?: () => void;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = "",
  onChange,
  value,
  onFocus,
}) => {
  return (
    <Input
      type="password"
      value={value}
      onChange={onChange}
      Icon={<LuLock />}
      placeholder={placeholder}
      className="max-w-md"
      onFocus={onFocus}
    />
  );
};

export default PasswordInput;
