import type { Game, GameOptions } from "../models/Game.model.ts";
import getOneGame from "../data-access/games/getOneGame.ts";
import React, { useCallback, useEffect } from "react";
import { launchErrorToast } from "../helpers/toasts/toasts.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes.config.ts";
import { useTranslation } from "react-i18next";
import updateOneGame from "../data-access/games/updateOneGame.ts";
import { SpecificError } from "../types/error/error.types.ts";

export type UseCurrentGame = {
  game?: Game;
  loading: boolean;
  changeGameOptions: (options: Partial<GameOptions>) => void;
};

const useCurrentGame = (gameId: number): UseCurrentGame => {
  const [game, setGame] = React.useState<Game>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchGame = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true);
        setGame(await getOneGame(gameId));
      } catch (e) {
        console.error(e);
        launchErrorToast(t("Game.notFound"));
        navigate(routes.home.goTo());
      } finally {
        setLoading(false);
      }
    },
    [navigate, t],
  );

  const changeGameOptions = async (options: Partial<GameOptions>) => {
    if (!options || !game) return;
    const currGame = { ...game };
    try {
      setGame({ ...game, ...options });
      await updateOneGame(gameId, options);
    } catch (e) {
      setGame(currGame);
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        launchErrorToast(t("ApiErrors.unknown"));
      }
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [fetchGame, gameId]);

  return {
    game,
    loading,
    changeGameOptions,
  };
};

export default useCurrentGame;
