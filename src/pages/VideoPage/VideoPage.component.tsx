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
import useIgdbSearch from "../../hooks/useIgdbSearch.hook.ts";
import IgdbGameSearch from "../../components/IgdbGamesSearch/IgdbGamesSearch.component.tsx";
import type { GamesListItem } from "../../models/Game.model.ts";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";

const VideoPage: React.FC = () => {
  const { currentGameId, currentVideoId, goToGame, isAdminRoute } =
    useAppRoutes();

  const [seekTo, setSeekTo] = React.useState<number>(0);

  const { game } = useCurrentGame(currentGameId || -1);
  const { video, addGame, removeGame, validateVideo } = useCurrentVideo(
    currentVideoId || -1,
  );

  const { i18n, t } = useTranslation();

  const { searchValue, onChangeSearchValue, igdbGames } = useIgdbSearch();

  const handleClickGame = (game: GamesListItem) => {
    goToGame({
      id: game.id,
      title: game.title,
    });
  };

  const handleDeleteGame = (game: GamesListItem) => {
    removeGame(game.id);
  };

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
              smallContainer={isAdminRoute}
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
              <div className="mt-2 flex shrink-0 flex-col gap-3">
                <GameListForVideo
                  games={video.games}
                  onGameClick={handleClickGame}
                  onDeleteGame={isAdminRoute ? handleDeleteGame : undefined}
                />
                {isAdminRoute && !video.validated && (
                  <MainButton onClick={() => validateVideo()}>
                    {t("GameListForVideo.iChecked")}
                  </MainButton>
                )}
              </div>
              {isAdminRoute && (
                <div className="mt-2 flex w-[300px] shrink-0 flex-col gap-1">
                  <span
                    className="font-title text-ghost px-2 pb-1 font-bold
                      opacity-75"
                  >
                    {t("GameListForVideo.searchForGames")}
                  </span>
                  <IgdbGameSearch
                    games={igdbGames}
                    gamesSelected={video.games}
                    onSelectGame={addGame}
                    searchValue={searchValue}
                    onChangeSearchValue={onChangeSearchValue}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
export default VideoPage;
