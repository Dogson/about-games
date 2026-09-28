import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config.ts";
import { api } from "../../helpers/axios/axios.ts";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";
import type { LogEvent } from "./logging.model.ts";

const getLastLogs = async (): Promise<LogEvent[]> => {
  try {
    return (await api.get<LogEvent[]>(`${ApiConfig.routes.logs.last}`, {}))
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

export default getLastLogs;
