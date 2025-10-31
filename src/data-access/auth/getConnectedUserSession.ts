import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config.ts";
import type { ConnectedUser } from "./model/auth.model.ts";
import { api } from "../../helpers/axios/axios.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";

const getConnectedUserSession = async (): Promise<ConnectedUser> => {
  try {
    return (await api.get<ConnectedUser>(ApiConfig.routes.sessionTest)).data;
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response?.status === 401) {
      throw new SpecificError(ApiErrorType.SESSION_EXPIRED);
    }
    if (e instanceof AxiosError && e.status === 404) {
      throw new SpecificError(ApiErrorType.USER_NOT_FOUND);
    }

    throw e;
  }
};

export default getConnectedUserSession;
