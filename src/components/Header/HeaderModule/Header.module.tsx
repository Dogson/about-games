import React from "react";
import { motion } from "framer-motion";
import Logo from "../../Logo/Logo.component.tsx";
import useSearchBox from "../../../hooks/useSearchBox.hook.ts";
import HeaderSearchBox from "../HeaderSearchBox/HeaderSearchBox.component.tsx";
import useAppRoutes from "../../../hooks/useAppRoutes.hook.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../router/routes.config.ts";
import type { GamesListItem } from "../../../models/Game.model.ts";

const HeaderModule: React.FC<{ noSearch?: boolean }> = ({
  noSearch = false,
}) => {
  const { games, searchText, onChangeSearchText, loading } = useSearchBox();
  const { goToGame } = useAppRoutes();
  const navigate = useNavigate();

  const handleClickGame = (game: GamesListItem) => {
    onChangeSearchText("");
    goToGame(game);
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 flex items-center
        justify-between bg-gradient-to-t from-black/0 via-black/80 via-10%
        to-black/100 px-5 py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={() => navigate(routes.home.goTo())}>
        <Logo inline />
      </button>
      {!noSearch && (
        <HeaderSearchBox
          onClickGame={handleClickGame}
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
          games={games}
          loading={loading}
        />
      )}
    </motion.header>
  );
};

export default HeaderModule;
