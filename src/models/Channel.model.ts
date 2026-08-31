import type { Video } from "./Video.model.ts";

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
  ignoreEpisodesContaining: string[];
  ignoreEpisodesMissing: string[];
  gameCandidateAIPrompt?: string;
  videosCount: number;
  videos: Video[];
  lastParsingError: {
    date: string;
    message: string;
  } | null;
  totalGamesCount: number;
  totalGamesFoundCount: number;
  gamesCount: number;
};
