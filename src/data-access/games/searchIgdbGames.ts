import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { IGDBGame } from "../../models/IgdbGame.model.ts";

const searchIgdbGames = async (params: {
  search?: string;
}): Promise<IGDBGame[]> => {
  try {
    return (
      await api.get<IGDBGame[]>(`${ApiConfig.routes.igdbSearch}`, {
        params,
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

export default searchIgdbGames;
