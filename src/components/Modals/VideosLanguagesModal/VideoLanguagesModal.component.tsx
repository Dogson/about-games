import { useState } from "react";
import Modal from "../Modal/Modal.component";
import { useTranslation } from "react-i18next";
import CheckboxGroup from "../../Inputs/CheckboxGroup/CheckboxGroup.component";
import AppConfig from "../../../config/app.config";
import LanguageCode from "../../LanguageCode/LanguageCode.component";

type VideoLanguagesModalProps = {
  onClose: () => void;
  onChangeLanguages: (languages: string[]) => void;
  languages: string[];
};

const VideoLanguagesModal: React.FC<VideoLanguagesModalProps> = ({
  languages,
  onChangeLanguages,
  onClose,
}) => {
  const [newLanguages, setNewLanguages] = useState(languages);
  const { t } = useTranslation();
  return (
    <Modal
      title={t("VideoLanguagesModal.title")}
      confirmText={t("common.save")}
      onConfirm={() => onChangeLanguages(newLanguages)}
      onClose={onClose}
      confirmDisabled={newLanguages.length === 0}
    >
      <CheckboxGroup
        options={AppConfig.availableLanguages.map((lng) => ({
          value: lng,
          label: <LanguageCode language={lng} withLabel />,
        }))}
        label={t("VideoLanguagesModal.description")}
        value={newLanguages}
        onChange={setNewLanguages}
      />
    </Modal>
  );
};

export default VideoLanguagesModal;
