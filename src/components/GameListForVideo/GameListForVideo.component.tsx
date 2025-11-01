import type { GamesListItem } from "../../models/Game.model.ts";
import React from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard/GameCard.component.tsx";

export type GameListForVideoProps = {
  games: GamesListItem[];
};

const GameListForVideo: React.FC<GameListForVideoProps> = ({ games }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <span className="font-title text-ghost pb-2 font-bold opacity-75">
        {t("GameListForVideo.gamesItsAbout")}
      </span>
      <div className="flex max-h-68 flex-wrap gap-2 overflow-auto pt-2">
        {games.map((game) => (
          <button
            // onClick={() => handleNavigateToGame(game.id)} todo
            className="gap-1 text-left"
          >
            <GameCard
              title={game.title}
              releaseDate={game.releaseDate}
              imgUrl={game.boxartImg}
              isSmall
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameListForVideo;
