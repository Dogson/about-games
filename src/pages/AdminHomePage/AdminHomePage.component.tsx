import React, { useContext } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component";
import Logo from "../../components/Logo/Logo.component";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config";
import MainButton from "../../components/Buttons/MainButton/MainButton.component";
import { Separator } from "../../components/Separator/Separator.component";
import { UnverifiedVideosListContext } from "../../contexts/unverifiedVideosList/UnverifiedVideosListContext";

const AdminHomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { unverifiedVideosCount } = useContext(UnverifiedVideosListContext);

  return (
    <PageLayout noHeader>
      <div className="flex w-full flex-1 flex-col items-center justify-evenly">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <span className="font-title text-lg">
            {t("Admin.gameMasterMode")}
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2
            md:flex-row"
        >
          <MainButton
            onClick={() => navigate(routes.admin.channels.goTo())}
            className="w-90"
          >
            {t("Admin.manageChannels")}
          </MainButton>
          <div className="hidden h-full md:block">
            <Separator direction="vertical" bulletSize="sm" />
          </div>
          <div className="block w-full md:hidden">
            <Separator direction="horizontal" bulletSize="sm" />
          </div>
          <div className="flex flex-col items-center gap-3 md:gap-8">
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
    </PageLayout>
  );
};

export default AdminHomePage;
