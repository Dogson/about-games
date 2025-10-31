import { createContext } from "react";
import type { UseAppSettingsContext } from "./useAppSettingsContext.ts";

export type AppContextType = UseAppSettingsContext;

export const AppSettingsContext = createContext<AppContextType>({
  language: "fr",
  changeLanguage: () => Promise.resolve(),
  darkMode: false,
  toggleDarkMode: () => {},
});
