import type { Video } from "../models/Video.model.ts";
import getOneVideo from "../data-access/videos/getOneVideo.ts";
import React, { useEffect } from "react";

export type UseCurrentVideo = {
  video?: Video;
  loading: boolean;
};

const useCurrentVideo = (videoId: number): UseCurrentVideo => {
  const [video, setVideo] = React.useState<Video>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchVideo = async (videoId: number) => {
    try {
      setLoading(true);
      setVideo(await getOneVideo(videoId));
    } catch (e) {
      console.error(e);
      // todo manage error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideo(videoId);
    }
  }, [videoId]);

  return {
    video,
    loading,
  };
};

export default useCurrentVideo;
