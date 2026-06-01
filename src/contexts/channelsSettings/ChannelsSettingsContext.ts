import { createContext } from "react";
import type { UseChannelsSettingsContext } from "./useChannelsettingsContext.ts";

export type AppContextType = UseChannelsSettingsContext;

export const ChannelsSettingsContext = createContext<AppContextType>({
  languages: [],
  changeLanguages: () => Promise.resolve(),
});
