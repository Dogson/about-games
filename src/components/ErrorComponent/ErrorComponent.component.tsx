import { type FC, useEffect } from "react";
import { useNavigate, useRouteError, type To } from "react-router-dom";
import { useTranslation } from "react-i18next";

export class GracefulErrorRedirectingTo extends Error {
  constructor(public readonly path: To | number) {
    super(
      `Redirecting gracefully to ${path} instead of show a fatal to the user`,
    );
  }
}

const ErrorComponent: FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error instanceof GracefulErrorRedirectingTo && navigate) {
      navigate(error.path as number);
    }
  }, [error, navigate]);

  return error && !(error instanceof Error) ? (
    <div>
      <h1>{t("errorHasOccured")}</h1>
    </div>
  ) : null;
};

export default ErrorComponent;
