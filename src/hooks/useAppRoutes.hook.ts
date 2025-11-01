import type { GamesListItem } from "../models/Game.model.ts";
import { routes } from "../router/routes.config.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameIdFromSlug } from "../helpers/games/games.helpers.ts";

type UseAppRoutes = {
  goToGame: (game: GamesListItem) => void;
  currentGameId: number | null;
};

const useAppRoutes = (): UseAppRoutes => {
  const navigate = useNavigate();
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const { gameIdTitle } = useParams<{ gameIdTitle: string }>();

  const goToGame = (game: GamesListItem) => {
    navigate(
      routes.game.goTo({
        id: game.id,
        title: game.title,
      }),
    );
  };

  useEffect(() => {
    if (gameIdTitle) {
      setCurrentGameId(getGameIdFromSlug(gameIdTitle));
    }
  }, [gameIdTitle]);

  return {
    goToGame,
    currentGameId,
  };
};

export default useAppRoutes;
