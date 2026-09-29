import React from "react";
import { FiSearch } from "react-icons/fi";
import Input from "../Input/Input.component.tsx";

export type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  searchText: string;
  isLoading?: boolean;
  size?: "sm" | "md";
  onFocus?: () => void;
  autoFocus?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "",
  onSearch,
  onClear,
  searchText,
  size = "md",
  onFocus,
  autoFocus,
  isLoading,
}) => {
  return (
    <Input
      value={searchText}
      onChange={onSearch}
      Icon={<FiSearch />}
      placeholder={placeholder}
      className="max-w-md"
      clearable={!!onClear}
      size={size}
      onFocus={onFocus}
      autoFocus={autoFocus}
      loading={isLoading}
    />
  );
};

export default SearchInput;
