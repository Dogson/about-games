import React from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import useCurrentGame from "../../hooks/useCurrentGame.hook.ts";
import VideoPageContentModule from "../../components/VideoPageContentModule/VideoPageContentModule.component.tsx";

const VideoPage: React.FC<{ carousel?: true }> = () => {
  const { currentGameId, currentVideoId } = useAppRoutes();

  const { game } = useCurrentGame(currentGameId || -1);

  return (
    <PageLayout>
      {currentVideoId && (
        <VideoPageContentModule currentVideoId={currentVideoId} game={game} />
      )}
    </PageLayout>
  );
};
export default VideoPage;
