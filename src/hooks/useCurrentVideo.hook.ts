import type { Video } from "../models/Video.model.ts";
import getOneVideo from "../data-access/videos/getOneVideo.ts";
import React, { useCallback, useEffect } from "react";
import { launchErrorToast } from "../helpers/toasts/toasts.ts";
import { useTranslation } from "react-i18next";
import useAppRoutes from "./useAppRoutes.hook.ts";

export type UseCurrentVideo = {
  video?: Video;
  loading: boolean;
};

const useCurrentVideo = (videoId: number): UseCurrentVideo => {
  const [video, setVideo] = React.useState<Video>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { goToParentRoute } = useAppRoutes();
  const { t } = useTranslation();

  const fetchVideo = useCallback(
    async (videoId: number) => {
      try {
        setLoading(true);
        setVideo(await getOneVideo(videoId));
      } catch (e) {
        launchErrorToast(t("Video.notFound"));
        goToParentRoute();
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [goToParentRoute, t],
  );

  useEffect(() => {
    if (videoId) {
      fetchVideo(videoId);
    }
  }, [fetchVideo, videoId]);

  return {
    video,
    loading,
  };
};

export default useCurrentVideo;
