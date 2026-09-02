import React, { useState } from "react";
import HeaderModule from "../../components/Header/HeaderModule/Header.module.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import { LuArrowLeft, LuBug } from "react-icons/lu";
import IconButton from "../../components/Buttons/IconButton/IconButton.component.tsx";
import LoggingConsole from "../../components/LoggingConsole/LoggingConsole.component.tsx";
import { useTranslation } from "react-i18next";
import useLogsEventSource from "../../hooks/useLogsEventSource.hook.ts";
import Modal from "../../components/Modals/Modal/Modal.component.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config.ts";

const PageLayout: React.FC<{
  noHeader?: boolean;
  noSearchInHeader?: boolean;
  children: React.ReactNode;
}> = ({ noHeader = false, noSearchInHeader, children }) => {
  const { isAdminRoute } = useAppRoutes();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogsModal, setShowLogsModal] = useState(false);
  const { logs } = useLogsEventSource();
  const { t } = useTranslation();

  const isAdminSubRoute =
    isAdminRoute && location.pathname !== routes.admin.path;

  return (
    <div className="relative">
      {isAdminSubRoute && (
        <IconButton
          noCircle
          isSmall
          Icon={LuArrowLeft}
          onClick={() => navigate(routes.admin.goTo())}
          hoverText={t("Admin.backToAdmin")}
          className="absolute top-13 left-4"
        />
      )}

      {isAdminRoute && (
        <IconButton
          Icon={LuBug}
          onClick={() => setShowLogsModal(true)}
          className="fixed right-5 bottom-5 z-10 p-1.5 shadow-md"
        />
      )}

      {!noHeader && <HeaderModule noSearch={noSearchInHeader} />}
      <div
        className="box-border flex min-h-screen flex-col items-center gap-2
          pb-10"
      >
        {children}
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
    </div>
  );
};

export default PageLayout;
