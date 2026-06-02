import React from "react";

export type ChannelNameAndThumbnailProps = {
  name: string;
  thumbnailUrl: string;
};

const ChannelNameAndThumbnail: React.FC<ChannelNameAndThumbnailProps> = ({
  name,
  thumbnailUrl,
}) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={thumbnailUrl}
        alt={name}
        className="h-8 w-8 rounded-full shadow-sm"
      />
      <span className="font-italic text-left text-sm font-bold text-shadow-md">
        {name}
      </span>
    </div>
  );
};

export default ChannelNameAndThumbnail;
