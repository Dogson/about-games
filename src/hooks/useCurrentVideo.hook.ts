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
  removeGame: (gameId: number) => Promise<void>;
  validateVideo: (onSuccess?: () => void) => Promise<void>;
  ignoreVideo: (onSuccess?: () => void) => Promise<void>;
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
    fetchVideo(videoId);
  }, [fetchVideo, videoId]);

  const addGame = async (game: CreateGameDTO) => {
    if (!video) return;
    try {
      await updateOneVideo(video.id, { games: [...video.games, game] });
      setVideo(await getOneVideo(video.id));
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        console.error(e);
      }
    }
  };

  const removeGame = async (gameId: number) => {
    if (!video) return;
    try {
      await updateOneVideo(video.id, {
        games: video.games.filter((g) => g.id !== gameId),
      });
      setVideo(await getOneVideo(video.id));
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        console.error(e);
      }
    }
  };

  const validateVideo = async (onSuccess?: () => void) => {
    if (!video) return;
    try {
      await updateOneVideo(video.id, {
        validated: true,
      });
      setVideo(await getOneVideo(video.id));
      onSuccess?.();
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        console.error(e);
      }
    }
  };

  const ignoreVideo = async (onSuccess?: () => void) => {
    if (!video) return;
    try {
      await updateOneVideo(video.id, {
        ignored: true,
        validated: true,
        games: [],
      });
      setVideo(await getOneVideo(video.id));
      onSuccess?.();
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
    removeGame,
    validateVideo,
    ignoreVideo,
  };
};

export default useCurrentVideo;
