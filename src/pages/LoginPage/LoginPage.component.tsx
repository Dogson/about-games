import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext.ts";
import { routes } from "../../router/routes.config.ts";
import Logo from "../../components/Logo/Logo.component.tsx";
import { useTranslation } from "react-i18next";
import Input from "../../components/Inputs/Input/Input.component.tsx";
import { LuUser } from "react-icons/lu";
import PasswordInput from "../../components/Inputs/PasswordInput/PasswordInput.component.tsx";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";
import authLogin from "../../data-access/auth/authLogin.ts";
import { SpecificError } from "../../types/error/error.types.ts";
import { launchErrorToast } from "../../helpers/toasts/toasts.ts";

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentialsError, setCredentialsError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isLoading) return;

    setCredentialsError("");
    setIsLoading(true);
    try {
      const authUser = await authLogin({ username, password });
      await login(authUser);
    } catch (e) {
      if (e instanceof SpecificError) {
        setCredentialsError(t(`${e.apiErrorKey}`));
      } else {
        launchErrorToast(t("LoginPage.errors.apiLoginError"));
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect");
      navigate(redirect ? decodeURIComponent(redirect) : routes.home.goTo(), {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, searchParams]);

  return (
    <PageLayout noHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-20">
        <Logo />
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <span className="font-title text-turquoise mb-6 text-center">
            {t("LoginPage.areYouGameMaster")}
          </span>
          <div className="flex w-[300px] flex-col gap-2">
            <Input
              Icon={<LuUser />}
              placeholder={t("LoginPage.username")}
              onChange={setUsername}
              value={username}
            />
            <PasswordInput
              placeholder={t("LoginPage.password")}
              onChange={setPassword}
              value={password}
            />
            <span className="text-error h-4 text-xs font-bold">
              {credentialsError}
            </span>
          </div>
          <MainButton
            loading={isLoading}
            type="submit"
            disabled={username === "" || password === ""}
          >
            {t("LoginPage.login")}
          </MainButton>
        </form>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
