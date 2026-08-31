import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import getAllChannels from "../../data-access/channels/getAllChannels.ts";
import type { Channel } from "../../models/Channel.model.ts";
import ChannelsTable from "../../components/ChannelsTable/ChannelsTable.component.tsx";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config.ts";
import { useTranslation } from "react-i18next";
import { LuCirclePlus } from "react-icons/lu";
import { UnverifiedVideosListContext } from "../../contexts/unverifiedVideosList/UnverifiedVideosListContext.ts";
import Card from "../../components/Card/Card.component.tsx";

const AdminHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [channels, setChannels] = useState<Channel[]>([]);
  const { unverifiedVideosCount, refreshUnverifiedVideos } = useContext(
    UnverifiedVideosListContext,
  );

  useEffect(() => {
    getAllChannels().then((channels) => {
      setChannels(channels);
    });
  }, []);

  useEffect(() => {
    refreshUnverifiedVideos();
  }, [refreshUnverifiedVideos]);

  return (
    <PageLayout>
      <div
        className="flex h-full w-full flex-1 flex-col justify-center gap-10 px-5
          py-20 md:px-30 md:py-30"
      >
        <Card>
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
        </Card>

        <span className="font-title self-start text-3xl">Channels</span>
        <div className="flex w-full flex-1 flex-col gap-4">
          <ChannelsTable channels={channels} />
          <MainButton
            onClick={() => navigate(routes.admin.channelCreate.goTo())}
            className="bg- w-90 self-end"
            Icon={LuCirclePlus}
          >
            {t("Admin.createChannel")}
          </MainButton>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminHomePage;
