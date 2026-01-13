import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { Channel } from "../../models/Channel.model.ts";

const getOneChannel = async (channelId: number): Promise<Channel> => {
  try {
    return (await api.get<Channel>(`${ApiConfig.routes.channels}/${channelId}`))
      .data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
    }
    throw e;
  }
};

export default getOneChannel;
