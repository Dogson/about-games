import type { GamesListItem } from "../../../models/Game.model.ts";
import SearchInput from "../../Inputs/SearchInput/SearchInput.component.tsx";
import HeaderSearchBoxGame from "../HeaderSearchBoxGame/HeaderSearchBoxGame.component.tsx";
import React from "react";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside.hook.ts";
import { motion, AnimatePresence } from "framer-motion";

type HeaderSearchBoxProps = {
  games: GamesListItem[];
  searchText: string;
  onChangeSearchText: (text: string) => void;
  onClickGame: (game: GamesListItem) => void;
  loading: boolean;
};

const HeaderSearchBox: React.FC<HeaderSearchBoxProps> = ({
  games,
  searchText,
  onChangeSearchText,
  onClickGame,
  loading,
}) => {
  const { t } = useTranslation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [displayList, setDisplayList] = React.useState(false);

  useClickOutside<HTMLDivElement>(containerRef, () => setDisplayList(false));

  return (
    <div className="relative w-[400px] max-w-xs" ref={containerRef}>
      <SearchInput
        searchText={searchText}
        onSearch={onChangeSearchText}
        onClear={() => onChangeSearchText("")}
        placeholder={t("GameSearch.searchPlaceholder")}
        size="sm"
        onFocus={() => setDisplayList(true)}
      />

      <AnimatePresence>
        {searchText && displayList && !(loading && searchText) && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="outline-corn absolute top-12 flex w-full flex-col gap-2
              overflow-auto rounded-xl bg-black p-4 shadow-lg outline-2"
          >
            {!loading && games.length === 0 && (
              <span className="text-corn text-center text-xs font-thin italic">
                {t("GameSearch.noResults")}
              </span>
            )}
            {games.map((game) => (
              <HeaderSearchBoxGame
                key={game.id}
                imgUrl={game.boxartImg ?? null}
                title={game.title}
                releaseDate={game.releaseDate ?? null}
                onClick={() => onClickGame(game)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderSearchBox;
