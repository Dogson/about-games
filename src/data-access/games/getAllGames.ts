import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import AppConfig from "../../config/app.config.ts";
import type { GetGamesDTO } from "./model/games.model.ts";

const getAllGames = async (params: {
  search?: string;
  limit?: number;
  page?: number;
  onlyValidated?: boolean;
  languages?: string[];
}): Promise<GetGamesDTO> => {
  const newParams: Record<string, string | number> = {
    page: params.page || 1,
    limit: params.limit || AppConfig.maxGamesPerPage,
  };
  if (params.search) {
    newParams.search = params.search;
  }
  if (params.onlyValidated !== undefined) {
    newParams.onlyValidated = params.onlyValidated ? 1 : 0;
  }
  if (params.languages) {
    newParams.languages = params.languages.join(",");
  }
  try {
    return (
      await api.get<GetGamesDTO>(`${ApiConfig.routes.games}`, {
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

export default getAllGames;
