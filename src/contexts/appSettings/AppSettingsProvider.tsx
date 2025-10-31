import React, { type ReactNode } from "react";
import { AppSettingsContext } from "./AppSettingsContext.ts";
import useAppSettings from "./useAppSettingsContext.ts";

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { changeLanguage, darkMode, toggleDarkMode, language } =
    useAppSettings();

  return (
    <AppSettingsContext.Provider
      value={{
        language,
        changeLanguage,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
