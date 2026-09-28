import React from "react";

export type ChannelInfosProps = {
  avatarUrl: string;
  name: string;
  gamesCount: number;
  videosCount: number;
  lastGamesCount: number;
  lastGamesFoundCount: number;
};

const ChannelInfos: React.FC<ChannelInfosProps> = ({ avatarUrl, name }) => {
  return (
    <div
      className="flex flex-col items-stretch justify-evenly gap-12 md:flex-row"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <img src={avatarUrl} alt={name} className="h-20 w-20 rounded-full" />
        <span className="font-title text-ghost text-center text-xl">
          {name}
        </span>
      </div>
    </div>
  );
};

export default ChannelInfos;
