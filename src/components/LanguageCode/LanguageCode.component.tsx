import React from "react";
import { useTranslation } from "react-i18next";

type LanguageCodeComponentProps = {
  language: string;
  withLabel?: boolean;
};

const LanguageCode: React.FC<LanguageCodeComponentProps> = ({
  language,
  withLabel = false,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-1">
      <div
        className="text-ghost rounded-md bg-black px-2 py-1 text-sm font-bold"
      >
        {language.toUpperCase()}
      </div>
      {withLabel && <span>{t(`common.languagesItems.${language}`)}</span>}
    </div>
  );
};

export default LanguageCode;
