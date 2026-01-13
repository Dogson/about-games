export const ChannelParsingAttributes = ["title", "description"] as const;
export type ChannelParsingAttribute = (typeof ChannelParsingAttributes)[number];

export type ChannelParsingOptions = {
  parsingAttribute: ChannelParsingAttribute;
  ignoreEpisodesContaining: string[];
  ignoreSearchIn: string[];
  endParsingAfter: string[];
  ignoreEpisodesMissing: string[];
};

export const ChannelLanguages = ["en", "fr"] as const;
export type ChannelLanguage = (typeof ChannelLanguages)[number];

export type Channel = {
  id: number;
  name: string;
  youtubeHandle: string;
  accuracy: number;
  youtubeId: string;
  description: string;
  thumbnailUrl: string;
  language: ChannelLanguage;
  parsingOptions: ChannelParsingOptions;
  videosCount: number;
  lastParsingError: {
    date: string;
    message: string;
  } | null;
  totalGamesCount: number;
  totalGamesFoundCount: number;
  gamesCount: number;
};
