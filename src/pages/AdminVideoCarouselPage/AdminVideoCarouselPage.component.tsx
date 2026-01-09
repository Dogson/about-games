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
    noUnverifiedVideos,
  } = useContext(UnverifiedVideosListContext);

  console.log(currentVideo);

  return (
    <PageLayout>
      {!isLoadingVideos && !noUnverifiedVideos && currentVideo && (
        <VideoPageContentModule
          currentVideoId={currentVideo.id}
          goToNextVideo={goToNextUnverifiedVideo}
          goToPreviousVideo={goToPreviousUnverifiedVideo}
          isFirstVideo={isFirstVideo}
          isLastVideo={isLastVideo}
        />
      )}
    </PageLayout>
  );
};

export default AdminVideoCarouselPage;
