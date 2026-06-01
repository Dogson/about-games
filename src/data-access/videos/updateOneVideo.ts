import { AxiosError } from "axios";
import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { CreateGameDTO } from "../games/model/games.model.ts";

const updateOneVideo = async (
  id: number,
  params: Partial<{
    games: CreateGameDTO[];
    validated: boolean;
    ignored: boolean;
  }>,
): Promise<void> => {
  try {
    return (await api.patch<void>(`${ApiConfig.routes.videos}/${id}`, params))
      .data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
    }
    throw new Error("An error occured");
  }
};

export default updateOneVideo;
