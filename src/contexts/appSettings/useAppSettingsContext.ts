import { useCallback, useEffect, useState } from "react";
import {
  LOCAL_STORAGE_DARK_MODE,
  LOCAL_STORAGE_LANGUAGE,
} from "../../config/localStorage.config.ts";
import { useTranslation } from "react-i18next";
import { i18nLanguages } from "../../i18n/i18n.ts";

export type UseAppSettingsContext = {
  language: string;
  changeLanguage: (language: string) => Promise<void>;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const useAppSettings = (): UseAppSettingsContext => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const loadUserLanguage = useCallback(() => {
    setLanguage(
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE) || navigator.language,
    );
  }, [setLanguage]);

  const loadUserDarkMode = useCallback(() => {
    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_DARK_MODE);
    try {
      const parsedValue = JSON.parse(localStorageValue || "false");
      if (typeof parsedValue === "boolean") {
        setDarkMode(parsedValue);
      } else {
        setDarkMode(false);
      }
    } catch (e) {
      console.error(e);
      setDarkMode(false);
    }
  }, [setDarkMode]);

  useEffect(() => {
    loadUserDarkMode();
  }, [loadUserDarkMode]);

  useEffect(() => {
    loadUserLanguage();
  }, [loadUserLanguage]);

  const changeLanguage = async (lng: string) => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE, lng);
    setLanguage(lng);
  };

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem(LOCAL_STORAGE_DARK_MODE, JSON.stringify(newDarkMode));
  }, [darkMode, setDarkMode]);

  useEffect(() => {
    if (language && i18nLanguages.includes(language)) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  return {
    language: language || navigator.language,
    changeLanguage,
    darkMode,
    toggleDarkMode,
  };
};

export default useAppSettings;
