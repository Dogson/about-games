import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";

export type GenerateGamesResponse = {
  success: boolean;
  message: string;
  updated: number;
};

const generateGames = async (
  channelId: number,
): Promise<GenerateGamesResponse> => {
  try {
    return (
      await api.post<GenerateGamesResponse>(
        `${ApiConfig.routes.channels}/${channelId}/generateGames`,
      )
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

export default generateGames;
