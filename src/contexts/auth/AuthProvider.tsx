import React, { type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import useAuthContext from "./useAuthContext.ts";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { authUser, isAuthenticated, logout, login } = useAuthContext();

  return (
    <AuthContext.Provider value={{ authUser, isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
