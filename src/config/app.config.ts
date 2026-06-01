const AppConfig = {
  maxGamesPerPage: 40,
  availableLanguages: ["fr", "en"],
  channelForm: {
    defaultValues: {
      language: "fr",
      parsingAttribute: "title" as "title" | "description",
    },
  },
};

export default AppConfig;
