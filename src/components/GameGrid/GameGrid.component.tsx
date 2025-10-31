import React, { useEffect } from "react";
import type { Game } from "../../models/Game.model.ts";
import GameCard from "../GameCard/GameCard.component.tsx";

export type GameGridProps = {
  games: Game[];
  onGameClick: (game: Game) => void;
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
      className="grid w-full auto-rows-fr
        grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 p-4"
    >
      {games.map((game) => (
        <button
          key={game.id}
          onClick={() => onGameClick(game)}
          className="flex flex-col text-left"
        >
          <GameCard
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
