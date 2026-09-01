import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";

export type GenerateVideosResponse = {
  success: boolean;
  message: string;
};

const generateVideos = async (): Promise<GenerateVideosResponse> => {
  try {
    return (
      await api.post<GenerateVideosResponse>(
        `${ApiConfig.routes.channels}/generate`,
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

export default generateVideos;
