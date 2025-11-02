import React from "react";
import { LuArrowLeft } from "react-icons/lu";

type GameBackButtonProps = {
  gameCoverImgUrl: string | null;
  onClick: () => void;
};

const GameBackButton: React.FC<GameBackButtonProps> = ({
  gameCoverImgUrl,
  onClick,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2"
    >
      <LuArrowLeft className="text-white" />
      <div
        className={`h-12 w-9 shrink-0 rounded-lg bg-black bg-cover bg-center
          shadow-md duration-100 ${
            hovered
              ? "outline-turquoise translate-y-[-2px] shadow-lg outline-2"
              : "shadow outline-transparent"
          }`}
        style={
          gameCoverImgUrl ? { backgroundImage: `url(${gameCoverImgUrl})` } : {}
        }
      />
    </button>
  );
};

export default GameBackButton;
