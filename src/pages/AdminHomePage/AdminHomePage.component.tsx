import React, { useContext, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component";
import Logo from "../../components/Logo/Logo.component";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config";
import MainButton from "../../components/Buttons/MainButton/MainButton.component";
import { Separator } from "../../components/Separator/Separator.component";
import { UnverifiedVideosListContext } from "../../contexts/unverifiedVideosList/UnverifiedVideosListContext";
import useLogsEventSource from "../../hooks/useLogsEventSource.hook";
import Modal from "../../components/Modal/Modal.component";
import LoggingConsole from "../../components/LoggingConsole/LoggingConsole.component";
import IconButton from "../../components/Buttons/IconButton/IconButton.component";
import { LuBug } from "react-icons/lu";

const AdminHomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { unverifiedVideosCount } = useContext(UnverifiedVideosListContext);
  const { logs } = useLogsEventSource();
  const [showLogsModal, setShowLogsModal] = useState(false);

  console.log(logs);

  return (
    <PageLayout noHeader>
      <div className="flex w-full flex-1 flex-col items-center justify-evenly">
        <IconButton
          Icon={LuBug}
          onClick={() => setShowLogsModal(true)}
          className="absolute top-5 right-5 p-1.5"
        />
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <span className="font-title text-lg">
            {t("Admin.gameMasterMode")}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <MainButton
            onClick={() => navigate(routes.admin.channels.goTo())}
            className="w-90"
          >
            {t("Admin.manageChannels")}
          </MainButton>
          <Separator direction="vertical" bulletSize="sm" />
          <div className="flex flex-col items-center gap-8">
            <span className="font-title text-xl">
              {t("Admin.reviewVideosLabel", { count: unverifiedVideosCount })}
            </span>
            <MainButton
              onClick={() => navigate(routes.admin.videos.goTo())}
              className="w-90"
            >
              {t("Admin.reviewVideos")}
            </MainButton>
          </div>
        </div>
      </div>
      {showLogsModal && (
        <Modal
          onClose={() => setShowLogsModal(false)}
          onConfirm={() => setShowLogsModal(false)}
          title={t("Admin.logs")}
          confirmText={t("common.close")}
          className={{
            Modal: "!max-w-[1000px]",
          }}
        >
          <LoggingConsole logs={logs} />
        </Modal>
      )}
    </PageLayout>
  );
};

export default AdminHomePage;
