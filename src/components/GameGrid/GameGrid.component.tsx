import React, { useEffect } from "react";
import type { GamesListItem } from "../../models/Game.model.ts";
import GameCard from "../GameCard/GameCard.component.tsx";

export type GameGridProps = {
  games: GamesListItem[];
  onGameClick: (game: GamesListItem) => void;
  onScrollEnd: () => void;
};

const GameGrid: React.FC<GameGridProps> = ({
  games,
  onGameClick,
  onScrollEnd,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight - (scrollTop + windowHeight) < 100) {
        onScrollEnd();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollEnd]);

  return (
    <div
      className="max-w-container grid w-full auto-rows-fr
        grid-cols-[repeat(auto-fit,160px)] justify-center gap-x-5 gap-y-5 p-4"
    >
      {games.map((game) => (
        <button
          key={game.id}
          onClick={() => onGameClick(game)}
          className="flex flex-col text-left"
        >
          <GameCard
            isFlat={false}
            title={game.title}
            imgUrl={game.boxartImg}
            releaseDate={game.releaseDate}
          />
        </button>
      ))}
    </div>
  );
};

export default GameGrid;
