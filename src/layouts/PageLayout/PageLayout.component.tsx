import React, { useState } from "react";
import HeaderModule from "../../components/Header/HeaderModule/Header.module.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import { LuBug } from "react-icons/lu";
import IconButton from "../../components/Buttons/IconButton/IconButton.component.tsx";
import LoggingConsole from "../../components/LoggingConsole/LoggingConsole.component.tsx";
import { useTranslation } from "react-i18next";
import useLogsEventSource from "../../hooks/useLogsEventSource.hook.ts";
import Modal from "../../components/Modals/Modal/Modal.component.tsx";

const PageLayout: React.FC<{
  noHeader?: boolean;
  noSearchInHeader?: boolean;
  children: React.ReactNode;
}> = ({ noHeader = false, noSearchInHeader, children }) => {
  const { isAdminRoute } = useAppRoutes();
  const [showLogsModal, setShowLogsModal] = useState(false);
  const { logs } = useLogsEventSource();
  const { t } = useTranslation();

  return (
    <div>
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
