import React from "react";
import { useTranslation } from "react-i18next";
import CountryFlag from "../CountryFlag/CountryFlag.component";
import { getCountryCodeForLanguage } from "../../helpers/utils/countryAndLanguages";

type LanguageFlagComponentProps = {
  language: string;
  withLabel?: boolean;
};

const LanguageFlag: React.FC<LanguageFlagComponentProps> = ({
  language,
  withLabel = false,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full items-center gap-1">
      <CountryFlag countryCode={getCountryCodeForLanguage(language)} />
      {withLabel && (
        <span>{t(`common.languagesItems.${language.split("-")[0]}`)}</span>
      )}
    </div>
  );
};

export default LanguageFlag;
