import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import Input from "../Input/Input.component.tsx";

export type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  searchText: string;
  isLoading?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "",
  onSearch,
  onClear,
  searchText,
  isLoading = false,
}) => {
  const rightSlot = isLoading ? (
    <ClipLoader size={16} color="var(--color-black)" />
  ) : searchText ? (
    <button
      type="button"
      onClick={onClear}
      className="text-black"
      aria-label="Clear search"
    >
      <FiX size={16} />
    </button>
  ) : null;

  return (
    <Input
      value={searchText}
      onChange={onSearch}
      Icon={<FiSearch />}
      RightSlot={rightSlot}
      placeholder={placeholder || "Search..."}
      className="max-w-md"
    />
  );
};

export default SearchInput;
