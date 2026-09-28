import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config.ts";
import { api } from "../../helpers/axios/axios.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { Channel } from "../../models/Channel.model.ts";

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
