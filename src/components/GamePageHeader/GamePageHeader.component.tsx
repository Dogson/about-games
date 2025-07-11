import React from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard/GameCard.component.tsx";
import { getYearFromDate } from "../../helpers/utils/datetime.ts";
import AppConfig from "../../config/app.config.ts";
import { Separator } from "../Separator/Separator.component.tsx";

export type GamePageHeaderProps = {
  title: string;
  releaseDate: string | null;
  coverImg: string | null;
  boxartImg: string | null;
  companies: string[];
};

const GamePageHeader: React.FC<GamePageHeaderProps> = ({
  title,
  releaseDate,
  coverImg,
  boxartImg,
  companies,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col items-center px-10 py-40">
      <div
        style={coverImg ? { backgroundImage: `url(${coverImg})` } : {}}
        className="absolute top-0 right-0 left-0 h-64 w-full bg-cover bg-center"
      />
      <div className={`max-w-[${AppConfig.contentMaxWidth}] flex w-full gap-5`}>
        <GameCard
          title={title}
          releaseDate={releaseDate}
          imgUrl={boxartImg}
          canBeHovered={false}
        />
        <div className="mt-27 flex flex-col">
          <span className="text-ghost text-xs opacity-50">
            {t("GamePageHeader.about")}
          </span>
          <span className="font-title mt-1 text-3xl font-bold">{title}</span>
          <span className="text-corn text-xs italic opacity-60">
            {releaseDate ? getYearFromDate(releaseDate) : t("Game.tba")}{" "}
            {companies.length > 0 ? ` - ${companies.join(", ")}` : ""}
          </span>
        </div>
      </div>
      <div className={`my-3 w-full max-w-[${AppConfig.contentMaxWidth}]`}>
        <Separator direction="horizontal" bulletSize="sm" />
      </div>
    </div>
  );
};

export default GamePageHeader;
