import { useCallback, useContext, useEffect, useState } from "react";
import type { Video } from "../../models/Video.model.ts";
import getUnverifiedVideos from "../../data-access/videos/getUnverifiedVideos.ts";
import { AuthContext } from "../auth/AuthContext.ts";
import {
  isInfrastructureSpecificError,
  type SpecificError,
} from "../../types/error/error.types.ts";

export type UseUnverifiedVideosListContext = {
  isLoadingVideos: boolean;
  error: SpecificError | null;
  goToNextUnverifiedVideo: () => void;
  goToPreviousUnverifiedVideo: () => void;
  refreshUnverifiedVideos: () => Promise<void>;
  currentVideo?: Video;
  isFirstVideo: boolean;
  isLastVideo: boolean;
  unverifiedVideosCount?: number;
  totalVideosCount: number;
  currentVideoIdx?: number;
};

const useUnverifiedVideosListContext = (): UseUnverifiedVideosListContext => {
  const [unverifiedVideos, setUnverifiedVideos] = useState<Video[]>([]);
  const [currentVideoIdx, setCurrentVideoIdx] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<SpecificError | null>(null);

  const { isAdmin } = useContext(AuthContext);

  const refreshUnverifiedVideos = useCallback(async () => {
    try {
      const videos = await getUnverifiedVideos();
      setError(null);
      setPendingCount(videos.length);
      setUnverifiedVideos((prev) => {
        const existingIds = new Set(prev.map((video) => video.id));
        const addedVideos = videos.filter(
          (video) => !existingIds.has(video.id),
        );
        return [...prev, ...addedVideos];
      });
      setLoading(false);
    } catch (err) {
      if (isInfrastructureSpecificError(err)) {
        setError(err);
      } else {
        console.error("Error loading unverified videos:", err);
      }
      setLoading(false);
    }
  }, []);

  const goToNextUnverifiedVideo = () => {
    if (currentVideoIdx < unverifiedVideos.length - 1) {
      setCurrentVideoIdx((v) => v + 1);
    }
  };

  const goToPreviousUnverifiedVideo = () => {
    if (currentVideoIdx > 0) {
      setCurrentVideoIdx((v) => v - 1);
    }
  };

  useEffect(() => {
    if (isAdmin) refreshUnverifiedVideos();
  }, [refreshUnverifiedVideos, isAdmin]);

  return {
    isLoadingVideos: loading,
    error,
    currentVideo: unverifiedVideos[currentVideoIdx],
    goToNextUnverifiedVideo,
    goToPreviousUnverifiedVideo,
    refreshUnverifiedVideos,
    isFirstVideo: currentVideoIdx === 0,
    isLastVideo: currentVideoIdx === unverifiedVideos.length - 1,
    unverifiedVideosCount: pendingCount,
    totalVideosCount: unverifiedVideos.length,
    currentVideoIdx,
  };
};

export default useUnverifiedVideosListContext;
