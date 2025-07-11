import React from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { getYearFromDate } from "../../helpers/utils/datetime.utils.ts";
import {
  getFirstReleaseDate,
  mapIgdbGamesToCreateGamesDTO,
} from "../../helpers/games/games.helpers.ts";
import type { IGDBGame } from "../../models/IgdbGame.model.ts";
import type { CreateGameDTO } from "../../data-access/games/dto/games.dto.ts";
import type { Game } from "../../models/Game.model.ts";
import { useTranslation } from "react-i18next";

export type IgdbGamesListProps = {
  games: IGDBGame[];
  onSelectGame: (game: CreateGameDTO) => void;
  gamesSelected: Game[];
};

const IgdbGamesList: React.FC<IgdbGamesListProps> = ({
  games,
  onSelectGame,
  gamesSelected,
}) => {
  const { t } = useTranslation();

  const isSelected = (igdbId: number): boolean =>
    gamesSelected.some((g) => g.igdbId === igdbId);

  return (
    <ul
      className="divide-y divide-gray-100 overflow-hidden rounded-xl border
        border-gray-200 bg-white shadow-lg"
    >
      {games.map((game) => {
        const selected = isSelected(game.id);
        return (
          <li
            key={game.id}
            className={`flex items-center gap-3 px-4 py-3 text-sm transition-all
            ${selected ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            onClick={() => {
              if (!selected) onSelectGame(mapIgdbGamesToCreateGamesDTO(game));
            }}
          >
            {selected ? (
              <FiCheck className="shrink-0 text-lg text-black" />
            ) : (
              <FiPlus className="shrink-0 text-lg text-black" />
            )}
            <span className="flex items-end gap-1 overflow-hidden text-black">
              <span
                title={game.name}
                className="block flex-1 flex-shrink truncate overflow-hidden
                  whitespace-nowrap"
              >
                {game.name}
              </span>
              <span className="mb-[1px] text-xs font-bold italic opacity-70">
                ({getYearFromDate(getFirstReleaseDate(game)) || t("Game.tba")})
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default IgdbGamesList;
