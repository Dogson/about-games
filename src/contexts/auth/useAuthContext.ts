import { useCallback, useEffect, useMemo, useState } from "react";
import { persistAuth } from "../../helpers/auth/persistAuth.ts";
import { launchErrorToast } from "../../helpers/toasts/toasts.ts";
import { useTranslation } from "react-i18next";
import type { AuthInfos } from "../../data-access/auth/model/auth.model.ts";
import { SpecificError } from "../../types/error/error.types.ts";

export type UseAuthContext = {
  authInfos: AuthInfos | null;
  isAuthenticated: boolean;
  hasInitializedAuth: boolean;
  login: (authUser: AuthInfos) => void;
  logout: () => void;
  isAdmin: boolean | null;
};

export const useAuthContext = (): UseAuthContext => {
  const { t } = useTranslation();
  const [authInfos, setAuthInfos] = useState<AuthInfos | null>(null);
  const [hasInitializedAuth, setHasInitializedAuth] = useState(false);

  const logout = useCallback(() => {
    setAuthInfos(null);
    persistAuth.remove();
  }, [setAuthInfos]);

  const login = useCallback(
    async (authInfos: AuthInfos) => {
      try {
        persistAuth.save(authInfos);
        setAuthInfos(authInfos);
      } catch (e) {
        if (e instanceof SpecificError) {
          launchErrorToast(t(`${e.apiErrorKey}`));
        }
        logout();
      }
    },
    [logout, setAuthInfos, t],
  );

  const isAuthenticated = useMemo(() => !!authInfos, [authInfos]);

  const loginUserFromLocalOrSessionStorage = useCallback(async () => {
    try {
      const storageAuth = persistAuth.get();
      if (storageAuth) {
        await login(storageAuth);
      } else {
        logout();
      }
    } catch (e) {
      console.error(e);
      logout();
    }
    setHasInitializedAuth(true);
  }, [login, logout]);

  const isAdmin = useMemo(() => {
    return authInfos && authInfos.user.admin;
  }, [authInfos]);

  useEffect(() => {
    loginUserFromLocalOrSessionStorage();
  }, [loginUserFromLocalOrSessionStorage]);

  return {
    authInfos: authInfos,
    isAuthenticated,
    hasInitializedAuth,
    login,
    logout,
    isAdmin,
  };
};

export default useAuthContext;
