import type { GamesListItem } from "../../models/Game.model.ts";
import React from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard/GameCard.component.tsx";

export type GameListForVideoProps = {
  isAdminRoute: boolean;
  games: GamesListItem[];
  onGameClick: (game: GamesListItem) => void;
  onDeleteGame?: (game: GamesListItem) => void;
  onMarkGameAsIgnored: (game: GamesListItem) => void;
};

const GameListForVideo: React.FC<GameListForVideoProps> = ({
  isAdminRoute,
  games,
  onGameClick,
  onDeleteGame,
  onMarkGameAsIgnored,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <span className="font-title text-ghost px-2 pb-1 font-bold opacity-75">
        {t("GameListForVideo.gamesItsAbout")}
      </span>
      <div className="grid grid-cols-3 gap-3 px-2 pt-2">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            releaseDate={game.releaseDate}
            imgUrl={game.boxartImg}
            isSmall
            onClick={() => onGameClick(game)}
            onDelete={onDeleteGame && (() => onDeleteGame(game))}
            onMarkAsIgnored={
              isAdminRoute && onMarkGameAsIgnored
                ? () => onMarkGameAsIgnored(game)
                : undefined
            }
            ignored={isAdminRoute && game.ignoreDuringSearch}
          />
        ))}
      </div>
    </div>
  );
};

export default GameListForVideo;
