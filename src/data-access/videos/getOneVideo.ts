import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { Video } from "../../models/Video.model.ts";

const getOneGame = async (videoId: number): Promise<Video> => {
  try {
    return (await api.get<Video>(`${ApiConfig.routes.videos}/${videoId}`)).data;
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
