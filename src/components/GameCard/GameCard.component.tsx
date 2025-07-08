import * as React from "react";

export type GameCardProps = {
  title: string;
  imgUrl: string;
  releaseDate: string | null;
  canBeHovered?: boolean;
};

const GameCard: React.FC<GameCardProps> = ({ title, imgUrl, releaseDate }) => {
  return (
    <div
      className={`h-52 w-39 flex-col justify-end rounded-xl bg-black bg-cover bg-center`}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="game-info">
        <h3>{title}</h3>
        {releaseDate && (
          <p>Release Date: {new Date(releaseDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default GameCard;
