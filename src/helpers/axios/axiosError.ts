import { AxiosError } from "axios";
import { ApiErrorType, SpecificError } from "../../types/error/error.types.ts";

const mapNoResponseError = (error: AxiosError): SpecificError => {
  const isTimeout =
    error.code === "ECONNABORTED" ||
    error.code === "ETIMEDOUT" ||
    error.code === "ERR_CANCELED";
  return new SpecificError(
    isTimeout ? ApiErrorType.TIMEOUT : ApiErrorType.NETWORK,
  );
};

export const mapAxiosErrorToSpecificError = (error: unknown): unknown => {
  if (!(error instanceof AxiosError)) {
    return error;
  }

  if (error.response) {
    if (error.response.status >= 500) {
      return new SpecificError(ApiErrorType.SERVER_ERROR);
    }
    return error;
  }

  return mapNoResponseError(error);
};
