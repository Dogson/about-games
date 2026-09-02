import React, { useEffect, useRef } from "react";
import type { GamesListItem } from "../../models/Game.model.ts";
import GameCard from "../GameCard/GameCard.component.tsx";
import Skeleton from "../Skeleton/Skeleton.component.tsx";
import useElementWidth from "../../hooks/useElementWidth.hook.ts";

const COLUMN_WIDTH = 160;
const COLUMN_GAP = 20;

export type GameGridProps = {
  games: GamesListItem[];
  onGameClick: (game: GamesListItem) => void;
  onScrollEnd: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
};

const GameGrid: React.FC<GameGridProps> = ({
  games,
  onGameClick,
  onScrollEnd,
  isLoading = false,
  hasMore = false,
}) => {
  const { ref: gridRef, width: gridWidth } = useElementWidth();
  const firstSkeletonRef = useRef<HTMLDivElement | null>(null);

  const columns = Math.max(
    1,
    Math.floor((gridWidth + COLUMN_GAP) / (COLUMN_WIDTH + COLUMN_GAP)),
  );

  const showInitialSkeleton = isLoading && games.length === 0;

  const remainder = games.length % columns;
  const skeletonCount =
    hasMore && games.length > 0
      ? remainder === 0
        ? columns
        : columns - remainder
      : 0;

  useEffect(() => {
    const element = firstSkeletonRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onScrollEnd();
        }
      },
      { root: null, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [onScrollEnd, games, hasMore]);

  const baseGridClassName =
    "max-w-container grid w-full grid-cols-[repeat(auto-fit,160px)] justify-center gap-x-5 gap-y-5 p-4";
  const gridClassName = `${baseGridClassName} auto-rows-fr`;
  const initialSkeletonClassName =
    `${baseGridClassName} auto-rows-[13rem] overflow-hidden h-[calc(3*13rem_+_2*1.25rem_+_2rem)]`;

  const renderSkeletonCard = (
    key: string,
    ref?: React.Ref<HTMLDivElement>,
  ) => (
    <div key={key} ref={ref} className="h-52 w-39">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );

  return (
    <div
      ref={gridRef}
      className={showInitialSkeleton ? initialSkeletonClassName : gridClassName}
    >
      {showInitialSkeleton ? (
        Array.from({ length: 18 }, (_, index) =>
          renderSkeletonCard(`initial-${index}`),
        )
      ) : (
        <>
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
          {skeletonCount > 0 &&
            Array.from({ length: skeletonCount }, (_, index) =>
              renderSkeletonCard(
                `more-${index}`,
                index === 0 ? firstSkeletonRef : undefined,
              ),
            )}
        </>
      )}
    </div>
  );
};

export default GameGrid;
