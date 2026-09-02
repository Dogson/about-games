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

  const { game, error, retry } = useCurrentGame(currentGameId || -1);

  return (
    <PageLayout>
      {error && !game && (
        <div className="flex w-full flex-1 flex-col items-center px-5">
          <div className="max-w-container w-full">
            <InlineError
              message={t(`${error.apiErrorKey ?? "ApiErrors.unknown"}`)}
              onRetry={retry}
            />
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
