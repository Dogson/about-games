import type { ParsingOptions } from "../../../models/Channel.model.ts";

export type CreateChannelDTO = {
  youtubeHandle: string;
  language: string;
  parsingOptions: ParsingOptions;
  gameCandidateAIPrompt: string;
};

export type UpdateChannelDTO = {
  youtubeHandle?: string;
  language?: string;
  parsingOptions?: Partial<ParsingOptions>;
  gameCandidateAIPrompt?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
};
