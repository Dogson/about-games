import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import getAllChannels from "../../data-access/channels/getAllChannels.ts";
import type { Channel } from "../../models/Channel.model.ts";
import ChannelsTable from "../../components/ChannelsTable/ChannelsTable.component.tsx";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config.ts";
import { useTranslation } from "react-i18next";
import { LuCirclePlus } from "react-icons/lu";

const AdminChannelsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    getAllChannels().then((channels) => {
      setChannels(channels);
    });
  }, []);

  return (
    <PageLayout>
      <div
        className="flex h-full w-full flex-1 flex-col justify-center gap-10
          p-30"
      >
        <span className="font-title self-start text-3xl">Channels</span>
        <div className="flex w-full flex-1 flex-col gap-4">
          <ChannelsTable channels={channels} />
          <MainButton
            onClick={() => navigate(routes.admin.channelCreate.goTo())}
            className="w-90 self-end"
            Icon={LuCirclePlus}
          >
            {t("Admin.createChannel")}
          </MainButton>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminChannelsListPage;
