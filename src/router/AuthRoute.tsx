import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout/PageLayout.component.tsx";
import AxiosErrorHandler from "../components/AxiosErrorHandler/AxiosErrorHandler.component.tsx";
import { AuthContext } from "../contexts/auth/AuthContext.ts";
import { routes } from "./routes.config.ts";

const AuthRoute: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, hasInitializedAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!hasInitializedAuth) return;
    if (!isAuthenticated) {
      navigate(routes.login.goTo());
    }
  }, [hasInitializedAuth, isAuthenticated, navigate]);

  return hasInitializedAuth && isAuthenticated ? (
    <AxiosErrorHandler>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </AxiosErrorHandler>
  ) : null;
};

export default AuthRoute;
