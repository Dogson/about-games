import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config";
import { api } from "../../helpers/axios/axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types";
import type { LogEvent } from "./logging.model";

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
