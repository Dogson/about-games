import type { Game } from "../models/Game.model.ts";
import getOneGame from "../data-access/games/getOneGame.ts";
import React, { useEffect } from "react";

export type UseCurrentGame = {
  game?: Game;
  loading: boolean;
};

const useCurrentGame = (gameId: number): UseCurrentGame => {
  const [game, setGame] = React.useState<Game>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchGame = async (gameId: number) => {
    try {
      setLoading(true);
      setGame(await getOneGame(gameId));
    } catch (e) {
      console.error(e);
      // todo manage error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [gameId]);

  return {
    game,
    loading,
  };
};

export default useCurrentGame;
