import { LOCAL_STORAGE_AUTH } from "../../config/localStorage.config.ts";
import type { AuthInfos } from "../../data-access/auth/model/auth.model.ts";

export const persistAuth = {
  isAuthenticated: () => !!localStorage.getItem(LOCAL_STORAGE_AUTH),
  save: (auth: AuthInfos) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(auth));
  },
  get: (): AuthInfos | undefined => {
    const auth = localStorage.getItem(LOCAL_STORAGE_AUTH);
    if (!auth) return undefined;
    return JSON.parse(auth);
  },
  remove: () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH);
  },
};
