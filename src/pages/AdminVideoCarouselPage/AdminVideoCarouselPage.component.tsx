import React, { useContext } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import { UnverifiedVideosListContext } from "../../contexts/unverifiedVideosList/UnverifiedVideosListContext.ts";
import VideoPageContentModule from "../../components/VideoPageContentModule/VideoPageContentModule.component.tsx";

const AdminVideoCarouselPage: React.FC = () => {
  const {
    currentVideo,
    goToNextUnverifiedVideo,
    goToPreviousUnverifiedVideo,
    isFirstVideo,
    isLastVideo,
    isLoadingVideos,
    totalVideosCount,
    currentVideoIdx,
  } = useContext(UnverifiedVideosListContext);

  console.log(currentVideoIdx);

  return (
    <PageLayout>
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
