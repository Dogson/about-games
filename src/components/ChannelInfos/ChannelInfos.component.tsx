import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card.component.tsx";

export type ChannelInfosProps = {
  avatarUrl: string;
  name: string;
  gamesCount: number;
  videosCount: number;
  lastGamesCount: number;
  lastGamesFoundCount: number;
};

const ChannelInfos: React.FC<ChannelInfosProps> = ({
  avatarUrl,
  name,
  gamesCount,
  videosCount,
  lastGamesCount,
  lastGamesFoundCount,
}) => {
  const { t } = useTranslation();
  const accuracy = Math.round((lastGamesFoundCount / lastGamesCount) * 100);

  return (
    <div className="flex items-stretch justify-evenly gap-12">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <img src={avatarUrl} alt={name} className="h-20 w-20 rounded-full" />
        <span className="font-title text-ghost text-center text-xl">
          {name}
        </span>
      </div>
      <Card>
        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-mauve text-sm">{t("GameSearchgames")}</span>
            <span className="font-title text-mauve text-2xl font-bold">
              {gamesCount}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-mauve text-sm">{t("GameSearchvideos")}</span>
            <span className="font-title text-mauve text-2xl font-bold">
              {videosCount}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-title text-mauve text-sm">
              {t("Admin.accuracy")}
            </span>
            <div className="flex flex-col items-center">
              <span
                className={`font-title text-2xl font-bold
                  ${accuracy >= 75 ? "text-green-300" : accuracy >= 50 ? "text-orange-400" : "text-red-400"}`}
              >
                {accuracy}
              </span>
              <span className="font-title text-mauve text-xs font-bold">
                {`(${lastGamesFoundCount}/${lastGamesCount})`}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChannelInfos;
