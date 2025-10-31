import { AxiosError } from "axios";

type ApiError = AxiosError & {
  apiErrors?: {
    status: number;
    intlKey: string;
    description?: string;
  };
};

type ApiResponseError = Record<number, { intlKey: string }>;

export const errorWithMessageIfStatusMatch = (
  error: unknown,
  specificsError?: ApiResponseError,
): Error => {
  if (!(error instanceof Error)) {
    console.warn("Error should be an instance of Error", error);
    throw new Error("Unknown error");
  }

  if (error instanceof AxiosError) {
    const status = getErrorStatus(error);
    if (status && specificsError?.[status]) {
      const customAxiosError = error as ApiError;
      customAxiosError.apiErrors = {
        status,
        ...specificsError[status],
      };
      return customAxiosError;
    }
  }

  return error;
};

export const getApiError = (
  error: unknown,
): ApiError["apiErrors"] | undefined => {
  if (
    error instanceof AxiosError &&
    (error as ApiError).apiErrors !== undefined
  ) {
    const customAxiosError = error as ApiError;
    if (
      customAxiosError.apiErrors?.status &&
      customAxiosError.apiErrors?.status >= 300
    ) {
      return customAxiosError.apiErrors;
    }
  }

  return undefined;
};

export const getErrorStatus = (error: AxiosError): number | null =>
  error.response?.status ?? null;

export const commonApiErrorsByStatus: ApiResponseError = {
  500: {
    intlKey: "error.internalServerError",
  },
  400: {
    intlKey: "error.badRequest",
  },
  403: {
    intlKey: "error.forbidden",
  },
  404: {
    intlKey: "error.notFound",
  },
};
