import * as React from "react";
import { Separator } from "../Separator/Separator.component.tsx";
import { getYearFromDate } from "../../helpers/utils/date.ts";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";

export type GameCardProps = {
  title: string;
  imgUrl: string;
  releaseDate: string | null;
  canBeHovered?: boolean;
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  imgUrl,
  releaseDate,
  canBeHovered = true,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`slide-in flex h-52 w-39 flex-col justify-end overflow-hidden
        rounded-xl bg-cover bg-center pt-5 outline-1 outline-transparent
        duration-100 ${canBeHovered ? "cursor-pointer" : ""} ${
          hovered || !canBeHovered
            ? `outline-turquoise translate-y-[-8px] shadow-lg transition-shadow
              transition-transform duration-300`
            : ""
        }`}
      style={{ backgroundImage: `url(${imgUrl})` }}
      onMouseEnter={() => setHovered(canBeHovered)}
      onMouseLeave={() => setHovered(false)}
    >
      <Transition
        show={hovered}
        as={React.Fragment}
        enter="transition ease-out duration-200 delay-100"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-50"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
      >
        <div
          className="bg-gradient-to-t from-black/100 via-black/90 via-70%
            to-black/0 px-4 pb-3"
        >
          <Separator bulletSize="sm" direction="horizontal" />
          <div className="flex flex-col gap-1">
            <div className="text-corn text-xxs font-thin italic opacity-55">
              {releaseDate ? getYearFromDate(releaseDate) : t("Game.tba")}
            </div>
            <div className="text-md font-title">{title}</div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default GameCard;
