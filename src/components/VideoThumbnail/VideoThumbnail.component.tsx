import React from "react";
import { formatDateLocalized } from "../../helpers/utils/date.ts";
import { useTranslation } from "react-i18next";

export type VideoThumbnailProps = {
  channelName: string;
  channelAvatarUrl: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  publicationDate: string;
};

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  channelName,
  channelAvatarUrl,
  videoTitle,
  videoThumbnailUrl,
  publicationDate,
}) => {
  const { i18n } = useTranslation();
  return (
    <div
      className="group hover: relative flex w-90 cursor-pointer flex-col gap-2
        transition-all hover:translate-y-[-8px]"
    >
      <img
        src={videoThumbnailUrl}
        alt={videoTitle}
        className="group-hover:outline-turquoise w-full overflow-hidden
          rounded-lg outline-1 outline-transparent transition-all duration-100
          group-hover:shadow-lg group-hover:duration-300"
      />
      <div
        className="absolute h-20 w-full rounded-lg bg-gradient-to-b
          from-black/80 via-black/70 via-40% to-black/0"
      />
      <div className="absolute top-2 right-2 left-2 flex items-center gap-3">
        <img
          src={channelAvatarUrl}
          alt={channelName}
          className="h-8 w-8 rounded-full"
        />
        <span className="italic">{channelName}</span>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <span className="font-title text-lg font-thin">{videoTitle}</span>
        <span className="text-xs italic opacity-70">
          {formatDateLocalized(publicationDate, i18n.language)}
        </span>
      </div>
    </div>
  );
};

export default VideoThumbnail;
