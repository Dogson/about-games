import React from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard/GameCard.component.tsx";
import { getYearFromDate } from "../../helpers/utils/datetime.utils.ts";
import { Separator } from "../Separator/Separator.component.tsx";
import IconButton from "../Buttons/IconButton/IconButton.component.tsx";
import { LuArrowLeft } from "react-icons/lu";

export type GamePageHeaderProps = {
  title: string;
  releaseDate: string | null;
  coverImg: string | null;
  boxartImg: string | null;
  companies: string[];
  onBackClick: () => void;
};

const GamePageHeader: React.FC<GamePageHeaderProps> = ({
  title,
  releaseDate,
  coverImg,
  boxartImg,
  companies,
  onBackClick,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="relative flex flex-col items-center self-stretch px-5 pt-20
        md:pt-48"
    >
      <div
        style={coverImg ? { backgroundImage: `url(${coverImg})` } : {}}
        className="absolute top-0 right-0 left-0 h-60 w-full bg-cover bg-center
          md:h-72"
      />
      <IconButton
        noCircle
        Icon={LuArrowLeft}
        isSmall
        onClick={onBackClick}
        iconClassName="text-white"
        className="absolute top-13 left-4"
      />
      <div
        className={
          "max-w-container flex w-full flex-col gap-1 md:flex-row md:gap-5"
        }
      >
        <GameCard
          title={title}
          releaseDate={releaseDate}
          imgUrl={boxartImg}
          canBeHovered={false}
        />
        <div className="relative flex flex-1 flex-col md:mt-27">
          <span className="text-ghost text-xs opacity-50">
            {t("GamePageHeader.about")}
          </span>
          <span className="font-title mt-1 text-3xl font-bold">{title}</span>
          <span className="text-corn flex flex-col opacity-60">
            <span className="text-sm font-bold">
              {releaseDate ? getYearFromDate(releaseDate) : t("Game.tba")}
            </span>
            <span className="text-xs italic">
              {companies.length > 0 ? `${companies.join(", ")}` : ""}
            </span>
          </span>
        </div>
      </div>
      <div className={"max-w-container my-3 w-full"}>
        <Separator direction="horizontal" bulletSize="sm" />
      </div>
    </div>
  );
};

export default GamePageHeader;
