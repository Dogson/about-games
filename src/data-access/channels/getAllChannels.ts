import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config";
import { api } from "../../helpers/axios/axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types";
import type { Channel } from "../../models/Channel.model";

const getAllChannels = async (): Promise<Channel[]> => {
  try {
    return (await api.get<Channel[]>(`${ApiConfig.routes.channels}`, {})).data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
    }
    throw e;
  }
};

export default getAllChannels;
