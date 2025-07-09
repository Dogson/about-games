import React, { type HTMLAttributes } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import type { Game } from "../../models/Game.model.ts";
import GameCard from "../GameCard/GameCard.component.tsx";

const GridComponents = {
  List: React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ style, children, ...props }, ref) => (
      <div
        ref={ref}
        {...props}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
          padding: "1rem",
          ...style,
        }}
      >
        {children}
      </div>
    ),
  ),
  Item: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
      {...props}
      style={{
        display: "flex",
        flex: "none",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  ),
};

export type GameGridProps = {
  games: Game[];
  onGameClick: (game: Game) => void;
};

const GameGrid: React.FC<GameGridProps> = ({ games, onGameClick }) => {
  return (
    <VirtuosoGrid
      data={games}
      totalCount={games.length}
      components={GridComponents}
      itemContent={(_, game) => (
        <button onClick={() => onGameClick(game)} className="text-left">
          <GameCard
            title={game.title}
            imgUrl={game.boxartImg}
            releaseDate={game.releaseDate}
          />
        </button>
      )}
    />
  );
};

export default GameGrid;
