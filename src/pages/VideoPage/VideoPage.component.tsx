import React from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import useCurrentGame from "../../hooks/useCurrentGame.hook.ts";
import GameBackButton from "../../components/Buttons/GameBackButton/GameBackButton.component.tsx";
import YoutubeVideo from "../../components/YoutubeVideo/YoutubeVideo.component.tsx";
import useCurrentVideo from "../../hooks/useCurrentVideo.hook.ts";
import VideoDescription from "../../components/VideoDescription/VideoDescription.component.tsx";
import { Separator } from "../../components/Separator/Separator.component.tsx";
import { useTranslation } from "react-i18next";
import GameListForVideo from "../../components/GameListForVideo/GameListForVideo.component.tsx";
import { formatDateLocalized } from "../../helpers/utils/datetime.utils.ts";

const VideoPage: React.FC = () => {
  const { currentGameId, currentVideoId, goToGame } = useAppRoutes();

  if (!currentGameId || !currentVideoId) {
    // todo navigate back
  }

  console.log(currentGameId);

  const [seekTo, setSeekTo] = React.useState<number>(0);

  const { game } = useCurrentGame(currentGameId || -1);
  const { video } = useCurrentVideo(currentVideoId || -1);

  const { i18n } = useTranslation();

  return (
    <PageLayout>
      {video && game && (
        <div className="relative px-30 pt-20">
          <div className="absolute top-18 left-5 self-start">
            <GameBackButton
              onClick={() => goToGame({ title: game.title, id: game.id })}
              gameCoverImgUrl={game.boxartImg}
            />
          </div>
          <div
            className="max-w-container relative flex w-full flex-1 flex-col
              items-center gap-4"
          >
            <YoutubeVideo
              youtubeId={video.youtubeId}
              seekTo={seekTo}
              title={video.title}
            />
            <Separator direction="horizontal" bulletSize="sm" />
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-start gap-2">
                <div className="flex gap-2">
                  <img
                    src={video.ytChannel.thumbnailUrl}
                    alt={video.ytChannel.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold">
                      {video.ytChannel.name}
                    </span>
                    <span className="text-xs italic">
                      {formatDateLocalized(video.releaseDate, i18n.language)}
                    </span>
                  </div>
                </div>
                <VideoDescription
                  description={video.description}
                  onTimestampClick={setSeekTo}
                />
              </div>
              <div className="mt-2 shrink-0">
                <GameListForVideo
                  games={video.games}
                  onGameClick={(game) =>
                    goToGame({
                      id: game.id,
                      title: game.title,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
export default VideoPage;
