import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AxiosErrorHandler from "../components/AxiosErrorHandler/AxiosErrorHandler.component.tsx";
import { AuthContext } from "../contexts/auth/AuthContext.ts";
import { routes } from "./routes.config.ts";

const AuthRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, hasInitializedAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!hasInitializedAuth) return;
    if (!isAuthenticated) {
      // Store current URL to redirect after login
      const redirectTo = encodeURIComponent(
        location.pathname + location.search + location.hash,
      );
      navigate(`${routes.login.goTo()}?redirect=${redirectTo}`);
    }
  }, [hasInitializedAuth, isAuthenticated, navigate, location]);

  return hasInitializedAuth && isAuthenticated ? (
    <AxiosErrorHandler>
      <Outlet />
    </AxiosErrorHandler>
  ) : null;
};

export default AuthRoute;
