import type { GamesListItem } from "../../models/Game.model.ts";
import React from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard/GameCard.component.tsx";

export type GameListForVideoProps = {
  games: GamesListItem[];
  onGameClick: (game: GamesListItem) => void;
};

const GameListForVideo: React.FC<GameListForVideoProps> = ({
  games,
  onGameClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <span className="font-title text-ghost px-2 pb-1 font-bold opacity-75">
        {t("GameListForVideo.gamesItsAbout")}
      </span>
      <div className="flex max-h-68 flex-wrap gap-2 overflow-auto px-2 pt-2">
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
              onClick={() => onGameClick(game)}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameListForVideo;
