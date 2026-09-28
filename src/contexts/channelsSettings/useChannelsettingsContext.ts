import { useCallback, useEffect, useState } from "react";
import { LOCAL_STORAGE_CHANNEL_LANGUAGES } from "../../config/localStorage.config.ts";

export type UseChannelsSettingsContext = {
  languages?: string[];
  changeLanguages: (languages: string[]) => Promise<void>;
};

const useChannelsSettings = (): UseChannelsSettingsContext => {
  const [languages, setLanguages] = useState<string[]>();

  const loadLanguages = useCallback(() => {
    const localStorageValue = localStorage.getItem(
      LOCAL_STORAGE_CHANNEL_LANGUAGES,
    );
    if (localStorageValue) {
      const parsedValue = JSON.parse(localStorageValue) as string[];
      setLanguages(parsedValue);
    } else {
      const userLanguage = navigator.language;
      if (userLanguage === "fr-FR") {
        setLanguages(["fr", "en"]);
      } else {
        setLanguages(["en"]);
      }
    }
  }, []);

  const changeLanguages = async (lng: string[]) => {
    if (lng.length === 0) return;
    localStorage.setItem(LOCAL_STORAGE_CHANNEL_LANGUAGES, JSON.stringify(lng));
    setLanguages(lng);
  };

  useEffect(() => {
    loadLanguages();
  }, [loadLanguages]);

  return {
    changeLanguages,
    languages,
  };
};

export default useChannelsSettings;
