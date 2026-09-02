import { createContext } from "react";
import type { UseGamesListContext } from "./useGamesListContext.ts";

export type GamesListContextType = UseGamesListContext;

export const GamesListContext = createContext<GamesListContextType>({
  reloadGames: async () => {},
  games: [],
  isLoadingGames: false,
  searchFilter: "",
  onChangeSearchFilter: () => {},
  nextPage: async () => {},
  totalGames: 0,
  totalPages: 0,
  hasMore: false,
  loadError: null,
});
