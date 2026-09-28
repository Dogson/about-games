import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import { UnverifiedVideosListContext } from "../../contexts/unverifiedVideosList/UnverifiedVideosListContext.ts";
import VideoPageContentModule from "../../components/VideoPageContentModule/VideoPageContentModule.component.tsx";
import InlineError from "../../components/InlineError/InlineError.component.tsx";

const AdminVideoCarouselPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    currentVideo,
    goToNextUnverifiedVideo,
    goToPreviousUnverifiedVideo,
    isFirstVideo,
    isLastVideo,
    isLoadingVideos,
    totalVideosCount,
    currentVideoIdx,
    error,
    refreshUnverifiedVideos,
  } = useContext(UnverifiedVideosListContext);

  return (
    <PageLayout>
      {error && !currentVideo && !isLoadingVideos && (
        <div className="flex w-full flex-1 flex-col items-center px-5 pt-20">
          <div className="max-w-container w-full">
            <InlineError
              message={t(`${error.apiErrorKey ?? "ApiErrors.unknown"}`)}
              onRetry={() => refreshUnverifiedVideos()}
            />
          </div>
        </div>
      )}
      {!isLoadingVideos && currentVideo && (
        <VideoPageContentModule
          currentVideoId={currentVideo.id}
          goToNextVideo={goToNextUnverifiedVideo}
          goToPreviousVideo={goToPreviousUnverifiedVideo}
          isFirstVideo={isFirstVideo}
          isLastVideo={isLastVideo}
          totalVideoCount={totalVideosCount}
          currentVideoRank={
            currentVideoIdx !== undefined ? currentVideoIdx + 1 : undefined
          }
        />
      )}
    </PageLayout>
  );
};
export default AdminVideoCarouselPage;
