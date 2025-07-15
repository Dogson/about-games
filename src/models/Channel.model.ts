export type Channel = {
  id: number;
  name: string;
  youtubeHandle: string;
  youtubeId: string;
  description: string;
  thumbnailUrl: string;
  language: string;
  parsingOptions: {
    parsingAttribute: string;
    ignoreEpisodesContaining: string[];
    ignoreSearchIn: string[];
    endParsingAfter: string[];
  };
  videosCount: number;
  lastParsingError: {
    date: string;
    message: string;
  } | null;
  lastGamesFoundCount: number;
  lastGamesCount: number;
  gamesCount: number;
};
