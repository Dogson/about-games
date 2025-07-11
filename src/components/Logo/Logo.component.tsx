import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

export type LogoProps = {
  inline?: boolean;
};

const Logo: React.FC<LogoProps> = ({ inline = true }) => {
  return inline ? (
    <div className="relative w-80">
      <div
        className="border-turquoise focus-within:ring-turquoise flex
          items-center gap-2 rounded-full border bg-white px-3 py-1 shadow-sm
          focus-within:ring-2"
      >
        <FiSearch className="text-turquoise text-lg" />
        <input
          type="text"
          placeholder="Search games"
          className="w-full bg-transparent text-sm text-black
            placeholder-gray-500 focus:outline-none"
          spellCheck={false} // remove red underline
        />
      </div>

      <div className="mt-2 rounded-xl border border-gray-200 bg-white shadow-lg">
        <ul className="divide-y divide-gray-100">
          {[1, 2, 3].map((_, i) => (
            <li
              key={i}
              className="flex cursor-pointer items-center gap-3 px-4 py-3
                text-sm text-gray-800 hover:bg-gray-100"
            >
              <FiPlus className="text-gray-500" />
              <span>Assassin's Creed (2009)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

export default Logo;
