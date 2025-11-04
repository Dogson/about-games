import { AxiosError } from "axios";
import { api } from "../../helpers/axios/axios.ts";
import ApiConfig from "../../config/api.config.ts";
import type { AuthInfos } from "./model/auth.model.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";

type LoginParams = {
  username: string;
  password: string;
};

const authLogin = async (params: LoginParams): Promise<AuthInfos> => {
  try {
    const response = await api.post<AuthInfos>(ApiConfig.routes.login, {
      username: params.username,
      password: params.password,
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 401) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
      if (e.response?.status === 400 || e.response?.status === 422) {
        throw new SpecificError(ApiErrorType.BAD_CREDENTIALS);
      }
    }
    throw e;
  }
};

export default authLogin;
