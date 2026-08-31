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
import { useContext, useState } from "react";
import useAppRoutes from "../../hooks/useAppRoutes.hook";
import { useTranslation } from "react-i18next";
import useCurrentVideo from "../../hooks/useCurrentVideo.hook";
import useIgdbSearch from "../../hooks/useIgdbSearch.hook";
import IconButton from "../Buttons/IconButton/IconButton.component";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { getYoutubeChannelUrlFromHandle } from "../../helpers/utils/youtube.utils";
import Modal from "../Modals/Modal/Modal.component";
import LanguageCode from "../LanguageCode/LanguageCode.component";
import { Helmet } from "react-helmet";
import SmartLink from "../SmartLink/SmartLink.component";
import { routes } from "../../router/routes.config";

type VideoPageContentProps = {
  game?: Game;
  currentVideoId: number;
  currentVideoRank?: number;
  totalVideoCount?: number;
  goToPreviousVideo?: () => void;
  goToNextVideo?: () => void;
  isFirstVideo?: boolean;
  isLastVideo?: boolean;
};

const VideoPageContentModule: React.FC<VideoPageContentProps> = ({
  game,
  currentVideoRank,
  totalVideoCount,
  currentVideoId,
  goToNextVideo,
  goToPreviousVideo,
  isFirstVideo,
  isLastVideo,
}) => {
  const { isAdmin } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const { goToGame, goBackToGame, isAdminRoute, goToAdminChildRoute } =
    useAppRoutes();
  const {
    video,
    addGame,
    removeGame,
    validateVideo,
    ignoreVideo,
    markGameAsIgnored,
  } = useCurrentVideo(currentVideoId);
  const {
    searchValue,
    onChangeSearchValue,
    igdbGames,
    isSearching,
    noGamesFound,
  } = useIgdbSearch();

  const [seekTo, setSeekTo] = useState<number>(0);
  const [showIgnoreVideoModal, setShowIgnoreVideoModal] = useState(false);

  const handleClickGame = (game: GamesListItem) => {
    goToGame({
      id: game.id,
      title: game.title,
    });
  };

  const handleDeleteGame = (game: GamesListItem) => {
    removeGame(game.id);
  };

  const handleMarkGameAsIgnored = (game: GamesListItem) => {
    markGameAsIgnored(game);
  };

  const handleValidateVideo = () => {
    validateVideo(() => {
      if (goToNextVideo && !isLastVideo) {
        goToNextVideo();
      }
    });
  };

  const handleIgnoreVideo = () => {
    setShowIgnoreVideoModal(false);
    ignoreVideo(() => {
      if (goToNextVideo && !isLastVideo) {
        goToNextVideo();
      }
    });
  };

  return (
    <>
      {showIgnoreVideoModal && (
        <Modal
          title={t("Video.ignoreModal.title")}
          onClose={() => setShowIgnoreVideoModal(false)}
          onConfirm={handleIgnoreVideo}
          onDeny={() => setShowIgnoreVideoModal(false)}
          confirmText={t("Video.ignoreModal.confirm")}
          denyText={t("Video.ignoreModal.cancel")}
          dangerousAction={true}
          disableCloseByClickOutside={false}
        >
          {t("Video.ignoreModal.body")}
        </Modal>
      )}
      {video && (
        <>
          <Helmet>
            <title>{`${video.title} - about games`}</title>
          </Helmet>
          <div
            className={
              "relative flex flex-col gap-5 px-5 pt-15 md:px-30 md:pt-20"
            }
          >
            {game && (
              <div className="self-start md:absolute md:top-18 md:left-5">
                <GameBackButton
                  onClick={() =>
                    goBackToGame &&
                    goBackToGame({ title: game.title, id: game.id })
                  }
                  gameCoverImgUrl={game.boxartImg}
                />
              </div>
            )}
            <div
              className="max-w-container relative flex w-full min-w-0 flex-1
                flex-col items-center gap-4"
            >
              <div className="flex w-full flex-col items-center gap-5">
                <YoutubeVideo
                  youtubeId={video.youtubeId}
                  seekTo={seekTo}
                  title={video.title}
                  smallContainer={isAdminRoute}
                />
                {goToPreviousVideo && goToNextVideo && (
                  <div className="flex items-center gap-5">
                    <IconButton
                      Icon={FiChevronLeft}
                      onClick={goToPreviousVideo}
                      disabled={isFirstVideo}
                    />
                    <div className="flex gap-1">
                      <span className="font-title text-xl font-bold">
                        {currentVideoRank}
                      </span>
                      <span className="pt-2">/ {totalVideoCount}</span>
                    </div>
                    <IconButton
                      Icon={FiChevronRight}
                      onClick={goToNextVideo}
                      disabled={isLastVideo}
                    />
                  </div>
                )}
              </div>
              <Separator direction="horizontal" bulletSize="sm" />
              <div
                className="flex w-full flex-col items-start gap-4 md:flex-row"
              >
                <div className="flex flex-col items-start gap-2">
                  <div
                    className="flex w-full flex-row items-center
                      justify-between"
                  >
                    <SmartLink
                      to={
                        isAdminRoute
                          ? routes.admin.channel.goTo({
                              id: video.ytChannel.id,
                              title: video.ytChannel.name,
                            })
                          : getYoutubeChannelUrlFromHandle(
                              video.ytChannel.youtubeHandle,
                            )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ghost flex gap-2"
                    >
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
                          {formatDateLocalized(
                            video.releaseDate,
                            i18n.language,
                          )}
                        </span>
                      </div>
                    </SmartLink>
                    <LanguageCode language={video.ytChannel.language} />
                  </div>
                  <VideoDescription
                    description={video.description}
                    onTimestampClick={setSeekTo}
                  />
                </div>
                <div className="relative mt-2 flex shrink-0 flex-col gap-3">
                  {isAdmin && !isAdminRoute && (
                    <div className="absolute top-[-5px] right-0 z-10 self-start">
                      <IconButton
                        noCircle
                        Icon={LuSettings}
                         onClick={() =>
                            goToAdminChildRoute({
                              videoId: video.id,
                              videoTitle: video.title,
                            })
                          }
                        isSmall
                      />
                    </div>
                  )}
                  <GameListForVideo
                    games={video.games}
                    onGameClick={handleClickGame}
                    onDeleteGame={isAdminRoute ? handleDeleteGame : undefined}
                    isAdminRoute={isAdminRoute}
                    onMarkGameAsIgnored={
                      isAdminRoute ? handleMarkGameAsIgnored : undefined
                    }
                  />
                  {isAdminRoute && !video.validated && (
                    <MainButton onClick={handleValidateVideo}>
                      {t("GameListForVideo.iChecked")}
                    </MainButton>
                  )}
                  {isAdminRoute && !video.ignored && (
                    <MainButton
                      onClick={() => setShowIgnoreVideoModal(true)}
                      danger
                    >
                      {t("GameListForVideo.ignoreVideo")}
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
        </>
      )}
    </>
  );
};

export default VideoPageContentModule;
