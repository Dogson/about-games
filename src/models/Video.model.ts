import type { Channel } from "./Channel.model.ts";
import type { GamesListItem } from "./Game.model.ts";

export type Video = {
  id: number;
  title: string;
  youtubeId: string;
  description: string;
  releaseDate: string;
  validated?: boolean;
  gamesFoundCount: number;
  gamesCount: number;
  thumbnailUrl: string;
  ytChannel: Channel;
  games: GamesListItem[];
};
