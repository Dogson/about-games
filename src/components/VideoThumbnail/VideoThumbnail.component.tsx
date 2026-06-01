import React, { useState } from "react";
import { formatDateLocalized } from "../../helpers/utils/datetime.utils.ts";
import { useTranslation } from "react-i18next";
import ChannelNameAndThumbnail from "../ChannelNameAndThumbnail/ChannelNameAndThumbnail.component.tsx";

export type VideoThumbnailProps = {
  channelName: string;
  channelAvatarUrl: string;
  channelLanguage: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  publicationDate: string;
  onClick: () => void;
};

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  channelName,
  channelAvatarUrl,
  channelLanguage,
  videoTitle,
  videoThumbnailUrl,
  publicationDate,
  onClick,
}) => {
  const { i18n } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group flex w-full max-w-[400px] flex-col gap-2 transition-all
        hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-lg
          outline-2 ${hovered ? "outline-turquoise" : "outline-transparent"}`}
      >
        <img
          src={videoThumbnailUrl}
          alt={videoTitle}
          className="h-full w-full object-cover transition-all duration-300
            group-hover:shadow-lg"
        />
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 h-10
            bg-gradient-to-b from-black/80 via-black/60 to-transparent"
        />
        <div className="absolute top-2 right-2 left-2">
          <ChannelNameAndThumbnail
            thumbnailUrl={channelAvatarUrl}
            name={channelName}
          />
        </div>
        <div
          className="bg-opacity-50 text-ghost absolute right-2 bottom-2
            rounded-md bg-black px-2 py-1 text-sm font-bold opacity-80"
        >
          {channelLanguage.toUpperCase()}
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1 text-left">
        <span className="font-title text-lg font-thin">{videoTitle}</span>
        <span className="text-xs italic opacity-70">
          {formatDateLocalized(publicationDate, i18n.language)}
        </span>
      </div>
    </button>
  );
};

export default VideoThumbnail;
