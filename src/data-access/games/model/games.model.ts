import type { Game } from "../../../models/Game.model.ts";

export type CreateGameDTO = {
  igdbId: number;
  title: string;
  releaseDate: Date | null;
  ignoreDuringSearch?: boolean;
  companies: string[];
  coverImg: string | null;
  boxartImg: string | null;
};

export type GetGamesDTO = {
  data: Game[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
