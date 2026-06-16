import type { Game } from "../models/Game.model.ts";
import getOneGame from "../data-access/games/getOneGame.ts";
import React, { useCallback, useContext, useEffect } from "react";
import { launchErrorToast } from "../helpers/toasts/toasts.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes.config.ts";
import { useTranslation } from "react-i18next";
import updateOneGame from "../data-access/games/updateOneGame.ts";
import { SpecificError } from "../types/error/error.types.ts";
import { ChannelsSettingsContext } from "../contexts/channelsSettings/ChannelsSettingsContext.ts";

export type UseCurrentGame = {
  game?: Game;
  loading: boolean;
  changeGameOptions: (options: Partial<Game>) => void;
};

const useCurrentGame = (gameId: number | null): UseCurrentGame => {
  const [game, setGame] = React.useState<Game>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { languages } = useContext(ChannelsSettingsContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchGame = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true);
        setGame(
          await getOneGame(gameId, { onlyValidatedVideos: true, languages }),
        );
      } catch (e) {
        console.error(e);
        launchErrorToast(t("Game.notFound"));
        navigate(routes.home.goTo());
      } finally {
        setLoading(false);
      }
    },
    // t render two times on app mount :'(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, languages],
  );

  const changeGameOptions = async (options: Partial<Game>) => {
    if (!options || !game || !gameId) return;
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
    if (gameId && languages) {
      fetchGame(gameId);
    }
  }, [fetchGame, gameId, languages]);

  return {
    game,
    loading,
    changeGameOptions,
  };
};

export default useCurrentGame;
