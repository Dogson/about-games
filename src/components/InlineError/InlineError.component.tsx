import React from "react";
import { useTranslation } from "react-i18next";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton.component.tsx";

export type InlineErrorProps = {
  message: string;
  onRetry?: () => void;
};

const InlineError: React.FC<InlineErrorProps> = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className="border-error bg-error/15 flex w-full flex-col items-center
        gap-4 rounded-lg border px-6 py-8 text-center"
    >
      <span className="font-title text-lg">{message}</span>
      {onRetry && (
        <SecondaryButton onClick={onRetry}>{t("common.retry")}</SecondaryButton>
      )}
    </div>
  );
};

export default InlineError;
