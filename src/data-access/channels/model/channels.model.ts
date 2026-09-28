import type { ParsingOptions } from "../../../models/Channel.model.ts";

export type CreateChannelDTO = {
  youtubeHandle: string;
  language: string;
  parsingOptions: ParsingOptions;
  additionalGameCandidateAIPrompt: string;
};

export type UpdateChannelDTO = {
  youtubeHandle?: string;
  language?: string;
  parsingOptions?: Partial<ParsingOptions>;
  additionalGameCandidateAIPrompt?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
};
