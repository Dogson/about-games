import React from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component";
import Logo from "../../components/Logo/Logo.component";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config";
import MainButton from "../../components/Buttons/MainButton/MainButton.component";
import { Separator } from "../../components/Separator/Separator.component";

const AdminHomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageLayout noHeader>
      <div className="flex w-full flex-1 flex-col items-center justify-evenly">
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
          <MainButton
            onClick={() => navigate(routes.admin.videos.goTo())}
            className="w-90"
          >
            {t("Admin.reviewVideos")}
          </MainButton>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminHomePage;
