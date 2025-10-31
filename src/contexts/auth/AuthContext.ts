import { createContext } from "react";
import type { UseAuthContext } from "./useAuthContext.ts";

export type AuthContextType = UseAuthContext;

export const AuthContext = createContext<AuthContextType>({
  hasInitializedAuth: false,
  authUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
