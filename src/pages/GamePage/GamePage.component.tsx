import React from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import GamePageHeader from "../../components/GamePageHeader/GamePageHeader.component.tsx";
import VideosGrid from "../../components/VideosGrid/VideosGrid.component.tsx";
import useCurrentGame from "../../hooks/useCurrentGame.hook.ts";

const GamePage: React.FC = () => {
  const { currentGameId, goToVideo } = useAppRoutes();

  if (!currentGameId) {
    // todo navigate back
  }

  const { game } = useCurrentGame(currentGameId || -1);

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
          <div className="flex w-full flex-col items-center px-10">
            <div className="max-w-container">
              <VideosGrid
                videos={game.videos.map((video) => ({
                  id: video.id,
                  channelName: video.ytChannel.name,
                  channelAvatarUrl: video.ytChannel.thumbnailUrl,
                  videoTitle: video.title,
                  videoThumbnailUrl: video.thumbnailUrl,
                  publicationDate: video.releaseDate,
                }))}
                onClickVideo={(video) => {
                  console.log(video);
                  goToVideo({
                    id: video.id,
                    title: video.videoTitle,
                    game: { title: game.title, id: game.id },
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GamePage;
