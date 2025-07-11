import type { Channel } from "./Channel.model.ts";
import type { Game } from "./Game.model.ts";

export type Video = {
  title: string;
  youtubeId: string;
  description: string;
  releaseDate: string;
  validated?: boolean;
  gamesFoundCount: number;
  gamesCount: number;
  ytChannel: Channel;
  games: Game[];
};
