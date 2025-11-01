import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { Game } from "../../models/Game.model.ts";

const getOneGame = async (gameId: number): Promise<Game> => {
  try {
    return (await api.get<Game>(`${ApiConfig.routes.games}/${gameId}`)).data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
    }
    throw e;
  }
};

export default getOneGame;
