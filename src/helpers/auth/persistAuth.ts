import { LOCAL_STORAGE_AUTH } from "../../config/localStorage.config.ts";

export const persistAuth = {
  isAuthenticated: () => !!localStorage.getItem(LOCAL_STORAGE_AUTH),
  save: (authToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH, authToken);
  },
  get: (): string | undefined => {
    const auth = localStorage.getItem(LOCAL_STORAGE_AUTH);
    if (!auth) return undefined;
    return auth;
  },
  remove: () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH);
  },
};
