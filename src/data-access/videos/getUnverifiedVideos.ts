import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config";
import { api } from "../../helpers/axios/axios";
import type { Video } from "../../models/Video.model";
import { ApiErrorType, SpecificError } from "../../types/error/error.types";

const getUnverifiedVideos = async (): Promise<Video[]> => {
  try {
    return (
      await api.get<Video[]>(`${ApiConfig.routes.videos}`, {
        params: { validated: false },
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

export default getUnverifiedVideos;
