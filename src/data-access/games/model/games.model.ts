import type { GamesListItem } from "../../../models/Game.model.ts";

export type CreateGameDTO = {
  igdbId: number;
  title: string;
  releaseDate: string | null;
  ignoreDuringSearch?: boolean;
  companies: string[];
  coverImg: string | null;
  boxartImg: string | null;
};

export type GetGamesDTO = {
  data: GamesListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
