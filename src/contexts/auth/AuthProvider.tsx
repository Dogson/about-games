import React, { type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import useAuthContext from "./useAuthContext.ts";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    authInfos,
    isAuthenticated,
    logout,
    login,
    hasInitializedAuth,
    isAdmin,
  } = useAuthContext();

  return (
    <AuthContext.Provider
      value={{
        authInfos,
        isAuthenticated,
        logout,
        login,
        hasInitializedAuth,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
