import VideoThumbnail from "../VideoThumbnail/VideoThumbnail.component.tsx";
import React from "react";

type VideoGridItem = {
  id: number;
  channelName: string;
  channelAvatarUrl: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  publicationDate: string;
};

type VideosGridProps = {
  videos: VideoGridItem[];
  onClickVideo: (video: VideoGridItem) => void;
};

export const VideosGrid: React.FC<VideosGridProps> = ({
  videos,
  onClickVideo,
}) => {
  return (
    <div
      className="grid w-full flex-1
        [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] items-start
        justify-items-center gap-6"
    >
      {videos.map((video) => (
        <VideoThumbnail
          videoTitle={video.videoTitle}
          channelName={video.channelName}
          channelAvatarUrl={video.channelAvatarUrl}
          videoThumbnailUrl={video.videoThumbnailUrl}
          publicationDate={video.publicationDate}
          key={video.id}
          onClick={() => onClickVideo(video)}
        />
      ))}
    </div>
  );
};

export default VideosGrid;
