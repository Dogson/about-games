import type { Video } from "../models/Video.model.ts";
import getOneVideo from "../data-access/videos/getOneVideo.ts";
import React, { useCallback, useEffect } from "react";
import { launchErrorToast } from "../helpers/toasts/toasts.ts";
import { useTranslation } from "react-i18next";
import useAppRoutes from "./useAppRoutes.hook.ts";
import type { CreateGameDTO } from "../data-access/games/model/games.model.ts";
import updateOneVideo from "../data-access/videos/updateOneVideo.ts";
import { SpecificError } from "../types/error/error.types.ts";

export type UseCurrentVideo = {
  video?: Video;
  loading: boolean;
  addGame: (game: CreateGameDTO) => Promise<void>;
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
    // t render two times on app mount :'(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goToParentRoute],
  );

  useEffect(() => {
    if (videoId) {
      fetchVideo(videoId);
    }
  }, [fetchVideo, videoId]);

  const addGame = async (game: CreateGameDTO) => {
    if (!video) return;
    try {
      await updateOneVideo(videoId, { games: [...video.games, game] });
      setVideo(await getOneVideo(videoId));
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        console.error(e);
      }
    }
  };

  return {
    video,
    loading,
    addGame,
  };
};

export default useCurrentVideo;
