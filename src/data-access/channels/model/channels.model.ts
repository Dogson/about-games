import type { ChannelParsingOptions } from "../../../models/Channel.model";

export type CreateChannelDTO = {
  youtubeHandle: string;
  language: string;
  parsingOptions: ChannelParsingOptions;
};

export type UpdateChannelDTO = {
  youtubeHandle?: string;
  language?: string;
  parsingOptions?: ChannelParsingOptions;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
};
