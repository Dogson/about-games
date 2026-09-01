import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config.ts";
import { api } from "../../helpers/axios/axios.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { Channel } from "../../models/Channel.model.ts";
import type { CreateChannelDTO } from "./model/channels.model.ts";

const createOneChannel = async (params: CreateChannelDTO): Promise<Channel> => {
  try {
    return (await api.post<Channel>(ApiConfig.routes.channels, params)).data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
    }
    throw e;
  }
};

export default createOneChannel;
