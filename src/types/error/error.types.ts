export enum ApiErrorType {
  FORBIDDEN = "FORBIDDEN",
  BAD_CREDENTIALS = "BAD_CREDENTIALS",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
}

export const ErrorMessageI18nKeys: Record<ApiErrorType, string> = {
  [ApiErrorType.FORBIDDEN]: "ApiErrors.forbidden",
  [ApiErrorType.BAD_CREDENTIALS]: "LoginPage.errors.badCredentials",
  [ApiErrorType.SESSION_EXPIRED]: "ApiErrors.sessionExpired",
  [ApiErrorType.USER_NOT_FOUND]: "ApiErrors.userNotFound",
};

export class SpecificError extends Error {
  public apiErrorType?: ApiErrorType;
  public apiErrorKey?: string;
  public specificValue?: string;
  multipleErrors?: {
    apiErrorType: ApiErrorType;
    apiErrorKey: string;
    specificValue?: string;
  }[];

  constructor(
    params:
      | ApiErrorType
      | {
          apiErrorType?: ApiErrorType;
          specificValue?: string;
          multipleErrors?: {
            apiErrorType: ApiErrorType;
            specificValue?: string;
          }[];
        },
  ) {
    if (typeof params === "string") {
      super(params);
      this.apiErrorKey = ErrorMessageI18nKeys[params];
    } else {
      super(params.apiErrorType);
      this.apiErrorType = params.apiErrorType;
      this.apiErrorKey = params.apiErrorType
        ? ErrorMessageI18nKeys[params.apiErrorType]
        : undefined;
      this.specificValue = params.specificValue;
      this.multipleErrors = params.multipleErrors?.map((error) => ({
        ...error,
        apiErrorKey: ErrorMessageI18nKeys[error.apiErrorType],
      }));
    }

    // Maintains proper stack trace for where the error was thrown (only in V8 engines, like Node.js or Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SpecificError);
    }
  }
}
