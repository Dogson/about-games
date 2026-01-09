import { useCallback, useContext, useEffect, useState } from "react";
import type { Video } from "../../models/Video.model.ts";
import getUnverifiedVideos from "../../data-access/videos/getUnverifiedVideos.ts";
import { AuthContext } from "../auth/AuthContext.ts";

export type UseUnverifiedVideosListContext = {
  isLoadingVideos: boolean;
  goToNextUnverifiedVideo: () => void;
  goToPreviousUnverifiedVideo: () => void;
  currentVideo?: Video;
  isFirstVideo: boolean;
  isLastVideo: boolean;
  unverifiedVideosCount?: number;
};

const useUnverifiedVideosListContext = (): UseUnverifiedVideosListContext => {
  const [unverifiedVideos, setUnverifiedVideos] = useState<Video[]>([]);
  const [currentVideoIdx, setCurrentVideoIdx] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { isAdmin } = useContext(AuthContext);

  const fetchUnverifiedVideos = useCallback(async () => {
    setLoading(true);
    setUnverifiedVideos(await getUnverifiedVideos());
    setLoading(false);
  }, []);

  const goToNextUnverifiedVideo = () => {
    console.log(unverifiedVideos);
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
    if (isAdmin) fetchUnverifiedVideos();
  }, [fetchUnverifiedVideos, isAdmin]);

  return {
    isLoadingVideos: loading,
    currentVideo: unverifiedVideos[currentVideoIdx],
    goToNextUnverifiedVideo,
    goToPreviousUnverifiedVideo,
    isFirstVideo: currentVideoIdx === 0,
    isLastVideo: currentVideoIdx === unverifiedVideos.length - 1,
    unverifiedVideosCount: unverifiedVideos.length,
  };
};

export default useUnverifiedVideosListContext;
