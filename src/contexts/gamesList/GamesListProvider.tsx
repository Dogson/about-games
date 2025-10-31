import React, { type ReactNode } from "react";
import { GamesListContext } from "./GamesListContext.ts";
import useGameListContext from "./useGamesListContext.ts";

export const GamesListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    games,
    isLoadingGames,
    reloadGames,
    searchFilter,
    onChangeSearchFilter,
    nextPage,
    totalPages,
    totalGames,
  } = useGameListContext();

  return (
    <GamesListContext.Provider
      value={{
        games,
        isLoadingGames,
        reloadGames,
        searchFilter,
        onChangeSearchFilter,
        nextPage,
        totalPages,
        totalGames,
      }}
    >
      {children}
    </GamesListContext.Provider>
  );
};
