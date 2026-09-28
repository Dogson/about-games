import type { Game } from "../models/Game.model.ts";
import getOneGame from "../data-access/games/getOneGame.ts";
import React, { useCallback, useContext, useEffect } from "react";
import { launchErrorToast } from "../helpers/toasts/toasts.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes.config.ts";
import { useTranslation } from "react-i18next";
import { ChannelsSettingsContext } from "../contexts/channelsSettings/ChannelsSettingsContext.ts";
import {
  isInfrastructureSpecificError,
  type SpecificError,
} from "../types/error/error.types.ts";

export type UseCurrentGame = {
  game?: Game;
  loading: boolean;
  error?: SpecificError;
  retry: () => Promise<void>;
};

const useCurrentGame = (gameId: number | null): UseCurrentGame => {
  const [game, setGame] = React.useState<Game>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<SpecificError>();
  const { languages } = useContext(ChannelsSettingsContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchGame = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true);
        setError(undefined);
        setGame(
          await getOneGame(gameId, { onlyValidatedVideos: true, languages }),
        );
      } catch (e) {
        if (isInfrastructureSpecificError(e)) {
          setError(e);
        } else {
          console.error(e);
          launchErrorToast(t("Game.notFound"));
          navigate(routes.home.goTo());
        }
      } finally {
        setLoading(false);
      }
    },
    // t render two times on app mount :'(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, languages],
  );

  useEffect(() => {
    if (gameId && languages) {
      fetchGame(gameId);
    }
  }, [fetchGame, gameId, languages]);

  const retry = useCallback(async () => {
    if (gameId) {
      await fetchGame(gameId);
    }
  }, [fetchGame, gameId]);

  return {
    game,
    loading,
    error,
    retry,
  };
};

export default useCurrentGame;
