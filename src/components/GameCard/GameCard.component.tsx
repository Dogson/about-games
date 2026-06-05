import * as React from "react";
import { Separator } from "../Separator/Separator.component.tsx";
import { getYearFromDate } from "../../helpers/utils/datetime.utils.ts";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";
import IconButton from "../Buttons/IconButton/IconButton.component.tsx";
import { FiTrash2 } from "react-icons/fi";
import { HiBan } from "react-icons/hi";

export type GameCardProps = {
  title: string;
  imgUrl?: string | null;
  releaseDate: string | null;
  canBeHovered?: boolean;
  isSmall?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  isFlat?: boolean;
  onMarkAsIgnored?: () => void;
  ignored?: boolean;
  alwaysShowTitle?: boolean;
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  imgUrl,
  releaseDate,
  canBeHovered = true,
  isSmall = false,
  isFlat = true,
  onClick,
  onDelete,
  onMarkAsIgnored,
  ignored = false,
  alwaysShowTitle = false,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`slide-in relative flex flex-shrink-0 flex-col justify-end
        rounded-xl bg-black bg-cover bg-center pt-5 shadow outline-2
        outline-transparent duration-100 ${isFlat ? "shadow-0" : "shadow-md"}
        ${isSmall ? "h-32 w-24" : "h-52 w-39"}
        ${canBeHovered ? "cursor-pointer" : ""} ${
          hovered || !canBeHovered
            ? `outline-turquoise transition-all
              ${isSmall ? "translate-y-[-4px] shadow-md" : "translate-y-[-8px] shadow-lg"}
              duration-300`
            : ""
        } ${!onDelete ? "overflow-hidden" : ""}`}
      style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : {}}
      onMouseEnter={() => setHovered(canBeHovered)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {onDelete && (
        <IconButton
          Icon={FiTrash2}
          onClick={onDelete}
          isSmall={isSmall}
          className="absolute top-[-10px] right-[-10px]"
        />
      )}
      {onMarkAsIgnored && !ignored && (
        <IconButton
          Icon={HiBan}
          onClick={onMarkAsIgnored}
          isSmall={isSmall}
          className="bg-salmon absolute top-[-10px] left-1/2 -translate-x-1/2"
          hoverText={t("Game.ignoreDuringSearch")}
        />
      )}
      {ignored && (
        <HiBan
          className="text-ghost absolute top-[5px] left-[5px] rounded-full
            bg-black opacity-80 drop-shadow-xl"
        />
      )}
      <Transition
        show={hovered || alwaysShowTitle}
        as={React.Fragment}
        enter="transition ease-out duration-200 delay-100"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-50"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
      >
        <div
          className={`bg-gradient-to-t from-black/100 via-black/70 via-70%
            to-black/0 ${isSmall ? "px-2 pt-5 pb-2" : "px-4 pt-10 pb-3"}`}
        >
          <Separator bulletSize="sm" direction="horizontal" />
          <div className="flex flex-col gap-1">
            <div className="text-corn text-xxs italic opacity-55">
              {releaseDate ? getYearFromDate(releaseDate) : t("Game.tba")}
            </div>
            <div
              className={`font-title line-clamp-5 font-bold break-normal
                break-words ${isSmall ? "text-xs" : "text-sm"}`}
            >
              {title}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default GameCard;
