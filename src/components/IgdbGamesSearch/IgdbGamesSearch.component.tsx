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
  searching: boolean;
  noGamesFound: boolean;
};

const IgdbGameSearch: React.FC<IgdbGameSearchProps> = ({
  searchValue,
  onChangeSearchValue,
  games,
  onSelectGame,
  gamesSelected,
  searching,
  noGamesFound,
}) => {
  const { t } = useTranslation();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const isSelected = (igdbId: number): boolean =>
    gamesSelected.some((g) => g.igdbId === igdbId);

  const shouldShow = isOpen && (noGamesFound || games.length > 0);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <SearchInput
        onClear={() => {
          onChangeSearchValue("");
          setIsOpen(false);
        }}
        onSearch={(value) => {
          onChangeSearchValue(value);
          setIsOpen(true);
        }}
        searchText={searchValue}
        size="sm"
        isLoading={searching}
      />

      {shouldShow && (
        <ul
          className="absolute bottom-full mb-2 max-h-80 min-h-0 w-full divide-y
            divide-gray-100 overflow-y-auto rounded-xl border border-gray-200
            bg-white shadow-lg md:top-full md:bottom-auto md:mt-2"
        >
          {noGamesFound ? (
            <div className="px-4 py-3 text-sm text-gray-500 italic">
              {t("IgdbGameSearch.noResults")}
            </div>
          ) : (
            games.map((game) => {
              const selected = isSelected(game.id);

              return (
                <li
                  key={game.id}
                  className={`flex items-center gap-3 px-4 py-3 text-sm
                    transition-all ${
                      selected
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  onClick={() => {
                    if (!selected) {
                      onSelectGame(mapIgdbGamesToCreateGamesDTO(game));
                    }
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
                      className="block flex-1 truncate whitespace-nowrap"
                    >
                      {game.name}
                    </span>

                    <span
                      className="mb-[1px] text-xs font-bold italic opacity-70"
                    >
                      (
                      {getYearFromDate(getFirstReleaseDate(game)) ||
                        t("Game.tba")}
                      )
                    </span>
                  </span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default IgdbGameSearch;
