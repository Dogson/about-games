export const ChannelParsingAttributes = ["title", "description"] as const;
export type ChannelParsingAttribute = (typeof ChannelParsingAttributes)[number];

export type ChannelParsingOptions = {
  parsingAttribute: ChannelParsingAttribute;
  ignoreEpisodesContaining: string[];
  ignoreSearchIn: string[];
  endParsingAfter: string[];
};

export type Channel = {
  id: number;
  name: string;
  youtubeHandle: string;
  youtubeId: string;
  description: string;
  thumbnailUrl: string;
  language: string;
  parsingOptions: ChannelParsingOptions;
  videosCount: number;
  lastParsingError: {
    date: string;
    message: string;
  } | null;
  lastGamesFoundCount: number;
  lastGamesCount: number;
  gamesCount: number;
};
