import type { Game } from "../models/Game.model.ts";
import { routes } from "../router/routes.config.ts";
import { useNavigate } from "react-router-dom";

type UseAppRoutes = {
  goToGame: (game: Game) => void;
};

const useAppRoutes = (): UseAppRoutes => {
  const navigate = useNavigate();

  const goToGame = (game: Game) => {
    console.log(
      routes.game.goTo({
        id: game.id,
        title: game.title,
      }),
    );
    navigate(
      routes.game.goTo({
        id: game.id,
        title: game.title,
      }),
    );
  };

  return {
    goToGame,
  };
};

export default useAppRoutes;
