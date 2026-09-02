import { type FC } from "react";
import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainButton from "../Buttons/MainButton/MainButton.component.tsx";

const ErrorComponent: FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  if (error) {
    console.error(error);
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center
        gap-6 p-5 text-center"
    >
      <h1 className="font-title text-2xl">{t("errorHasOccured")}</h1>
      <MainButton onClick={() => window.location.reload()}>
        {t("common.retry")}
      </MainButton>
    </div>
  );
};

export default ErrorComponent;
