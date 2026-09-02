import React, { useContext, useEffect } from "react";
import { AxiosError } from "axios";
import { launchErrorToast } from "../../helpers/toasts/toasts.ts";
import i18n from "i18next";
import { api } from "../../helpers/axios/axios.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext.ts";
import {
  ApiErrorType,
  ErrorMessageI18nKeys,
} from "../../types/error/error.types.ts";
import { routes } from "../../router/routes.config.ts";

const AxiosErrorHandler: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!(error instanceof AxiosError) || !error.response) {
          return Promise.reject(error);
        }

        if (error.response.status === 401) {
          launchErrorToast(
            i18n.t(`${ErrorMessageI18nKeys[ApiErrorType.SESSION_EXPIRED]}`),
          );
          logout();
        }
        if (error.response.status === 403 && error.config?.method === "get") {
          launchErrorToast(
            i18n.t(`${ErrorMessageI18nKeys[ApiErrorType.FORBIDDEN]}`),
          );
          navigate(routes.home.goTo());
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return children;
};

export default AxiosErrorHandler;
