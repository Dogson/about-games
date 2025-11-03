import type { Video } from "./Video.model.ts";

export type GamesListItem = {
  id: number;
  igdbId: number;
  title: string;
  releaseDate: string | null;
  coverImg: string | null;
  boxartImg: string | null;
  companies: string[];
};

export type GameOptions = {
  ignoreDuringSearch: boolean;
};

export type Game = GamesListItem &
  GameOptions & {
    videos: Video[];
  };
