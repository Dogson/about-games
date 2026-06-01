import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { Game } from "../../models/Game.model.ts";

const getOneGame = async (
  gameId: number,
  params?: {
    languages?: string[];
    onlyValidatedVideos?: boolean;
  },
): Promise<Game> => {
  const newParams: Record<string, string | number> = {};

  if (params?.onlyValidatedVideos !== undefined) {
    newParams.onlyValidatedVideos = params.onlyValidatedVideos ? 1 : 0;
  }
  if (params?.languages) {
    newParams.languages = params.languages.join(",");
  }
  try {
    return (
      await api.get<Game>(`${ApiConfig.routes.games}/${gameId}`, {
        params: newParams,
      })
    ).data;
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
