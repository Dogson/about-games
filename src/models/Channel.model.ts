import type { Video } from "./Video.model.ts";

export const ChannelLanguages = ["en", "fr"] as const;
export type ChannelLanguage = (typeof ChannelLanguages)[number];

export type ParsingOptions = {
  ignoreEpisodesContaining: string[];
  ignoreEpisodesMissing: string[];
  playlistsIds?: string[];
};

export type Channel = {
  id: number;
  name: string;
  youtubeHandle: string;
  accuracy: number;
  youtubeId: string;
  description: string;
  thumbnailUrl: string;
  language: ChannelLanguage;
  parsingOptions: ParsingOptions;
  additionalGameCandidateAIPrompt?: string;
  videosCount: number;
  createdAt: string;
  videos: Video[];
  totalGamesCount: number;
  totalGamesFoundCount: number;
  gamesCount: number;
};
