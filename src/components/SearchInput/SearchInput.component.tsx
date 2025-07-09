import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex w-full max-w-md items-center">
      <FiSearch className="absolute left-3 text-black" />

      <input
        spellCheck={false}
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder || "Search..."}
        className="bg-ghost focus:ring-turquoise w-full rounded-full py-2 pr-10
          pl-10 text-sm text-black focus:ring-1 focus:outline-none"
      />

      {isLoading ? (
        <div className="absolute right-3 mt-1">
          <ClipLoader size={16} color="#666" />
        </div>
      ) : (
        searchText && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-black"
            aria-label="Clear search"
          >
            <FiX size={16} />
          </button>
        )
      )}
    </div>
  );
};

export default SearchInput;
