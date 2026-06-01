export const getCountryCodeForLanguage = (language: string): string => {
  const lng = language.split("-")[0].toUpperCase();
  if (lng === "EN") return "GB";
  if (lng === "ZH") return "CN";
  return lng;
};

export const getI18nLanguageForTranscriptLanguage = (
  language: string,
): string => {
  switch (language) {
    case "de":
      return "de-DE";
    case "es":
      return "es-ES";
    case "fr":
      return "fr-FR";
    case "it":
      return "it-IT";
    case "pt":
      return "pt-PT";
    case "zh":
      return "zh-CN";
    case "nl":
      return "nl-NL";
    default:
      return "en-GB";
  }
};
