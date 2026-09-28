import React, { useContext, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import GamePageHeader from "../../components/GamePageHeader/GamePageHeader.component.tsx";
import VideosGrid from "../../components/VideosGrid/VideosGrid.component.tsx";
import useCurrentGame from "../../hooks/useCurrentGame.hook.ts";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Card from "../../components/Card/Card.component.tsx";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton.component.tsx";
import VideoLanguagesModal from "../../components/Modals/VideosLanguagesModal/VideoLanguagesModal.component.tsx";
import { ChannelsSettingsContext } from "../../contexts/channelsSettings/ChannelsSettingsContext.ts";
import InlineError from "../../components/InlineError/InlineError.component.tsx";
import { Separator } from "../../components/Separator/Separator.component.tsx";
import Skeleton from "../../components/Skeleton/Skeleton.component.tsx";
import IconButton from "../../components/Buttons/IconButton/IconButton.component.tsx";
import { LuArrowLeft } from "react-icons/lu";

const GamePage: React.FC = () => {
  const { currentGameId, goToVideo, goToParentRoute, goBack } = useAppRoutes();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { languages, changeLanguages } = useContext(ChannelsSettingsContext);
  const { t } = useTranslation();

  if (!currentGameId) {
    goToParentRoute();
  }

  const handleChangeVideoLanguages = (newLanguages: string[]) => {
    changeLanguages(newLanguages);
    setShowLanguageModal(false);
  };

  const { game, loading, error, retry } = useCurrentGame(currentGameId || -1);

  return (
    <PageLayout>
      {error && !game && (
        <div className="flex w-full flex-1 flex-col items-center justify-center px-5">
          <div className="max-w-container w-full">
            <InlineError
              message={t(`${error.apiErrorKey ?? "ApiErrors.unknown"}`)}
              onRetry={retry}
            />
          </div>
        </div>
      )}
      {loading && !error && (
        <div className="flex w-full flex-1 flex-col items-center gap-3">
          <div
            className="relative flex w-full flex-col items-center self-stretch
              px-5 pt-20 md:pt-48"
          >
            <div className="absolute top-0 right-0 left-0 h-60 w-full md:h-72">
              <Skeleton light className="h-full w-full" />
            </div>
            <IconButton
              noCircle
              Icon={LuArrowLeft}
              isSmall
              onClick={goBack}
              iconClassName="text-white"
              className="absolute top-13 left-4"
            />
            <div
              className="max-w-container flex w-full flex-col gap-1
                md:flex-row md:gap-5"
            >
              <Skeleton className="h-52 w-39 shrink-0 rounded-xl" />
              <div className="relative flex flex-1 flex-col gap-2 md:mt-27">
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-9 w-52 rounded-lg md:w-72" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-28 rounded-lg" />
                  <Skeleton className="h-3 w-44 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="max-w-container my-3 w-full">
              <Separator direction="horizontal" bulletSize="sm" />
            </div>
          </div>
          <div className="flex w-full flex-col items-center px-5">
            <div className="max-w-container w-full">
              <div
                className="grid w-full flex-1
                  [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]
                  items-start justify-items-center gap-6"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="flex w-full max-w-[400px] flex-col gap-2"
                  >
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <div className="flex flex-col gap-1 px-1">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                      <Skeleton className="h-3 w-24 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {game && (
        <Helmet>
          <title>{`${game.title} - about games`}</title>
        </Helmet>
      )}
      {game && (
        <div className="flex w-full flex-1 flex-col items-center gap-3">
          <GamePageHeader
            title={game.title}
            releaseDate={game.releaseDate}
            boxartImg={game.boxartImg}
            coverImg={game.coverImg}
            companies={game.companies}
            onBackClick={goBack}
          />
          <div className="flex w-full flex-col items-center px-5">
            <div className="max-w-container">
              <VideosGrid
                videos={game.videos.map((video) => ({
                  id: video.id,
                  channelName: video.ytChannel.name,
                  channelAvatarUrl: video.ytChannel.thumbnailUrl,
                  channelLanguage: video.ytChannel.language,
                  videoTitle: video.title,
                  videoThumbnailUrl: video.thumbnailUrl,
                  publicationDate: video.releaseDate,
                }))}
                onClickVideo={(video) => {
                  goToVideo({
                    id: video.id,
                    title: video.videoTitle,
                    game: { title: game.title, id: game.id },
                  });
                }}
              />
              {game.videos && game.videos.length === 0 && (
                <Card className="flex gap-1">
                  <span className="font-title text-lg">
                    {t("Game.noVideosTitle")}
                  </span>
                  <span
                    className="flex flex-col items-start gap-1 text-sm
                      md:flex-row md:items-center"
                  >
                    {t("Game.noVideosDescription")}
                    <SecondaryButton onClick={() => setShowLanguageModal(true)}>
                      {t("Homepage.customizeLanguages")}
                    </SecondaryButton>
                  </span>

                  {showLanguageModal && languages && (
                    <VideoLanguagesModal
                      languages={languages}
                      onChangeLanguages={handleChangeVideoLanguages}
                      onClose={() => setShowLanguageModal(false)}
                    />
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GamePage;
