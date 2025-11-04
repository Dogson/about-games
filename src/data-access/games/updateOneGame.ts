import { AxiosError } from "axios";
import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import type { Game } from "../../models/Game.model.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";

const updateOneGame = async (
  id: number,
  params: Partial<Game>,
): Promise<void> => {
  try {
    return (await api.patch<void>(`${ApiConfig.routes.games}/${id}`, params))
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

export default updateOneGame;
