import React, { useState } from "react";
import { getYearFromDate } from "../../../helpers/utils/datetime.utils.ts";
import { useTranslation } from "react-i18next";

type HeaderSearchBoxGameProps = {
  imgUrl: string | null;
  title: string;
  releaseDate: string | null;
  onClick: () => void;
};

const HeaderSearchBoxGame: React.FC<HeaderSearchBoxGameProps> = ({
  title,
  imgUrl,
  releaseDate,
  onClick,
}) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="flex max-h-16 items-center gap-2"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`h-16 w-12 shrink-0 rounded-lg bg-black bg-cover bg-center
          duration-100 ${
            hovered
              ? "outline-turquoise translate-y-[-2px] shadow-lg outline-2"
              : "shadow outline-transparent"
          }`}
        style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : {}}
      />
      <div className="flex grow-0 flex-col items-start gap-1 text-left">
        <span className="font-title line-clamp-3 text-xs font-bold">
          {title}
        </span>
        <span className="text-corn text-xxs italic opacity-55">
          {releaseDate ? getYearFromDate(releaseDate) : t("Game.tba")}
        </span>
      </div>
    </button>
  );
};

export default HeaderSearchBoxGame;
