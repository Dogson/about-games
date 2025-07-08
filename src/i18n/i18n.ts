import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "../i18n/content/en.json";
import fr from "../i18n/content/fr.json";

const i18nResources = {
  "en-GB": {
    translation: en,
  },
  "fr-FR": {
    translation: fr,
  },
};

export const i18nLanguages = Object.keys(i18nResources);

const initI18n = () => {
  i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      resources: i18nResources,
      fallbackLng: "en",
      debug: true,
    });
};

export default initI18n;
