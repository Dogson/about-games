import React from "react";
import classNames from "classnames";

type CountryFlagProps = {
  countryCode: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

// Pre-load all flag SVGs at build time using Vite's import.meta.glob
const flagModules = import.meta.glob<{ default: string }>(
  "../../assets/flags/*.svg",
  { eager: true },
);

// Create a map of country codes to flag URLs
const flagMap = new Map<string, string>();
Object.keys(flagModules).forEach((path) => {
  const countryCode = path.split("/").pop()?.replace(".svg", "").toLowerCase();
  if (countryCode) {
    flagMap.set(countryCode, flagModules[path].default);
  }
});

const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  className,
  style: inlineStyle,
  title,
}) => {
  // Convert country code to lowercase for file matching
  const normalizedCode = countryCode.toLowerCase();

  // Get the flag URL from the pre-loaded map, fallback to default flag
  const flagUrl = flagMap.get(normalizedCode) || flagMap.get("xx") || "";

  return (
    <img
      src={flagUrl}
      alt={`${countryCode} flag`}
      className={classNames(
        "inline-block w-5 rounded-xs object-cover align-middle",
        className,
      )}
      style={inlineStyle}
      title={title || `${countryCode} flag`}
    />
  );
};

export default CountryFlag;
