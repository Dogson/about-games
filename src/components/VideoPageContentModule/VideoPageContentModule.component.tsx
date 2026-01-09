import type React from "react";
import { formatDateLocalized } from "../../helpers/utils/datetime.utils";
import GameBackButton from "../Buttons/GameBackButton/GameBackButton.component";
import MainButton from "../Buttons/MainButton/MainButton.component";
import GameListForVideo from "../GameListForVideo/GameListForVideo.component";
import IgdbGameSearch from "../IgdbGamesSearch/IgdbGamesSearch.component";
import { Separator } from "../Separator/Separator.component";
import VideoDescription from "../VideoDescription/VideoDescription.component";
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo.component";
import type { Game, GamesListItem } from "../../models/Game.model";
import { useState } from "react";
import useAppRoutes from "../../hooks/useAppRoutes.hook";
import { useTranslation } from "react-i18next";
import useCurrentVideo from "../../hooks/useCurrentVideo.hook";
import useIgdbSearch from "../../hooks/useIgdbSearch.hook";
import IconButton from "../Buttons/IconButton/IconButton.component";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

type VideoPageContentProps = {
  game?: Game;
  currentVideoId: number;
  goToPreviousVideo?: () => void;
  goToNextVideo?: () => void;
  isFirstVideo?: boolean;
  isLastVideo?: boolean;
};

const VideoPageContentModule: React.FC<VideoPageContentProps> = ({
  game,
  currentVideoId,
  goToNextVideo,
  goToPreviousVideo,
  isFirstVideo,
  isLastVideo,
}) => {
  const { i18n, t } = useTranslation();
  const { goToGame, isAdminRoute } = useAppRoutes();
  const { video, addGame, removeGame, validateVideo } =
    useCurrentVideo(currentVideoId);
  const {
    searchValue,
    onChangeSearchValue,
    igdbGames,
    isSearching,
    noGamesFound,
  } = useIgdbSearch();

  const [seekTo, setSeekTo] = useState<number>(0);

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
    <>
      {video && (
        <div className="relative px-30 pt-20">
          {game && (
            <div className="absolute top-18 left-5 self-start">
              <GameBackButton
                onClick={() =>
                  goToGame && goToGame({ title: game.title, id: game.id })
                }
                gameCoverImgUrl={game.boxartImg}
              />
            </div>
          )}
          <div
            className="max-w-container relative flex w-full flex-1 flex-col
              items-center gap-4"
          >
            <div className="flex w-full items-center justify-evenly">
              {goToPreviousVideo && (
                <IconButton
                  Icon={FiChevronLeft}
                  onClick={goToPreviousVideo}
                  disabled={isFirstVideo}
                />
              )}
              <YoutubeVideo
                youtubeId={video.youtubeId}
                seekTo={seekTo}
                title={video.title}
                smallContainer={isAdminRoute}
              />
              {goToNextVideo && (
                <IconButton
                  Icon={FiChevronRight}
                  onClick={goToNextVideo}
                  disabled={isLastVideo}
                />
              )}
            </div>
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
                    searching={isSearching}
                    noGamesFound={noGamesFound}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPageContentModule;
