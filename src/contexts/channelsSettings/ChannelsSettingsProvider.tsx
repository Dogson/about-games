import React, { type ReactNode } from "react";
import { ChannelsSettingsContext } from "./ChannelsSettingsContext.ts";
import useChannelsSettings from "./useChannelsettingsContext.ts";

export const ChannelsSettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { changeLanguages, languages } = useChannelsSettings();

  return (
    <ChannelsSettingsContext.Provider
      value={{
        languages,
        changeLanguages,
      }}
    >
      {children}
    </ChannelsSettingsContext.Provider>
  );
};
