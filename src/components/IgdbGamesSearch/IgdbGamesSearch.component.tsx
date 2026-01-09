import React from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { getYearFromDate } from "../../helpers/utils/datetime.utils.ts";
import {
  getFirstReleaseDate,
  mapIgdbGamesToCreateGamesDTO,
} from "../../helpers/games/games.helpers.ts";
import type { IGDBGame } from "../../models/IgdbGame.model.ts";
import type { CreateGameDTO } from "../../data-access/games/model/games.model.ts";
import type { GamesListItem } from "../../models/Game.model.ts";
import { useTranslation } from "react-i18next";
import SearchInput from "../Inputs/SearchInput/SearchInput.component.tsx";

export type IgdbGameSearchProps = {
  searchValue: string;
  onChangeSearchValue: (search: string) => void;
  games: IGDBGame[];
  onSelectGame: (game: CreateGameDTO) => void;
  gamesSelected: GamesListItem[];
};

const IgdbGameSearch: React.FC<IgdbGameSearchProps> = ({
  searchValue,
  onChangeSearchValue,
  games,
  onSelectGame,
  gamesSelected,
}) => {
  const { t } = useTranslation();

  const isSelected = (igdbId: number): boolean =>
    gamesSelected.some((g) => g.igdbId === igdbId);

  return (
    <div className="flex flex-col gap-1">
      <SearchInput
        onClear={() => onChangeSearchValue("")}
        onSearch={onChangeSearchValue}
        searchText={searchValue}
        size="sm"
      />
      {games.length > 0 && (
        <ul
          className="divide-y divide-gray-100 overflow-hidden rounded-xl border
            border-gray-200 bg-white shadow-lg"
        >
          {games.map((game) => {
            const selected = isSelected(game.id);
            return (
              <li
                key={game.id}
                className={`flex items-center gap-3 px-4 py-3 text-sm
                transition-all
                ${selected ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                onClick={() => {
                  if (!selected)
                    onSelectGame(mapIgdbGamesToCreateGamesDTO(game));
                }}
              >
                {selected ? (
                  <FiCheck className="shrink-0 text-lg text-black" />
                ) : (
                  <FiPlus className="shrink-0 text-lg text-black" />
                )}
                <span
                  className="flex items-end gap-1 overflow-hidden text-black"
                >
                  <span
                    title={game.name}
                    className="block flex-1 flex-shrink truncate overflow-hidden
                      whitespace-nowrap"
                  >
                    {game.name}
                  </span>
                  <span className="mb-[1px] text-xs font-bold italic opacity-70">
                    (
                    {getYearFromDate(getFirstReleaseDate(game)) ||
                      t("Game.tba")}
                    )
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IgdbGameSearch;
