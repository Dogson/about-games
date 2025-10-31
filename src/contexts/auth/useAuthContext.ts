import { useCallback, useEffect, useMemo, useState } from "react";
import { persistAuth } from "../../helpers/auth/persistAuth.ts";
import { launchErrorToast } from "../../helpers/toasts/toasts.ts";
import { useTranslation } from "react-i18next";
import type { AuthUser } from "../../data-access/auth/model/auth.model.ts";
import { SpecificError } from "../../types/error/error.types.ts";

export type UseAuthContext = {
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  hasInitializedAuth: boolean;
  login: (authToken: string) => void;
  logout: () => void;
};

export const useAuthContext = (): UseAuthContext => {
  const { t } = useTranslation();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [hasInitializedAuth, setHasInitializedAuth] = useState(false);

  const logout = useCallback(() => {
    setAuthUser(null);
    persistAuth.remove();
  }, [setAuthUser]);

  const login = useCallback(
    async (authToken: string) => {
      try {
        persistAuth.save(authToken);
        setAuthUser({ token: authToken });
      } catch (e) {
        if (e instanceof SpecificError) {
          launchErrorToast(t(`${e.apiErrorKey}`));
        }
        logout();
      }
    },
    [logout, setAuthUser, t],
  );

  const isAuthenticated = useMemo(() => !!authUser, [authUser]);

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

  useEffect(() => {
    loginUserFromLocalOrSessionStorage();
  }, [loginUserFromLocalOrSessionStorage]);

  return {
    authUser,
    isAuthenticated,
    hasInitializedAuth,
    login,
    logout,
  };
};

export default useAuthContext;
