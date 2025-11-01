import React, { useEffect } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import type { Game } from "../../models/Game.model.ts";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import getOneGame from "../../data-access/games/getOneGame.ts";
import GamePageHeader from "../../components/GamePageHeader/GamePageHeader.component.tsx";
import VideosGrid from "../../components/VideosGrid/VideosGrid.component.tsx";

const GamePage: React.FC = () => {
  const [game, setGame] = React.useState<Game>();
  const { currentGameId } = useAppRoutes();

  const fetchGame = async (gameId: number) => {
    try {
      setGame(await getOneGame(gameId));
    } catch (e) {
      console.error(e);
      // todo manage error
    }
  };

  useEffect(() => {
    if (currentGameId) {
      fetchGame(currentGameId);
    }
  }, [currentGameId]);

  return (
    <PageLayout>
      {game && (
        <div className="flex w-full flex-1 flex-col items-center gap-3">
          <GamePageHeader
            title={game.title}
            releaseDate={game.releaseDate}
            boxartImg={game.boxartImg}
            coverImg={game.coverImg}
            companies={game.companies}
          />
          <VideosGrid
            videos={game.videos.map((video) => ({
              id: video.id,
              channelName: video.ytChannel.name,
              channelAvatarUrl: video.ytChannel.thumbnailUrl,
              videoTitle: video.title,
              videoThumbnailUrl: video.thumbnailUrl,
              publicationDate: video.releaseDate,
            }))}
            onClickVideo={() => {}}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default GamePage;
