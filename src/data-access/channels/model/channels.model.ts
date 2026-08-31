export type CreateChannelDTO = {
  youtubeHandle: string;
  language: string;
  ignoreEpisodesContaining: string[];
  ignoreEpisodesMissing: string[];
  gameCandidateAIPrompt: string;
};

export type UpdateChannelDTO = {
  youtubeHandle?: string;
  language?: string;
  ignoreEpisodesContaining?: string[];
  ignoreEpisodesMissing?: string[];
  gameCandidateAIPrompt?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
};
