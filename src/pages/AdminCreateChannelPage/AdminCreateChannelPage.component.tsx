import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import ChannelParsingForm from "../../components/ChannelInfos/ChannelParsingForm/ChannelParsingForm.component.tsx";
import createOneChannel from "../../data-access/channels/createOneChannel.ts";
import {
  launchErrorToast,
  launchSuccessToast,
} from "../../helpers/toasts/toasts.ts";
import { SpecificError } from "../../types/error/error.types.ts";
import type { CreateChannelDTO } from "../../data-access/channels/model/channels.model.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config.ts";
import AppConfig from "../../config/app.config.ts";
import { normalizeGameCandidateAIPrompt } from "../../helpers/utils/string.utils.ts";

const AdminCreateChannelPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [channel, setChannel] = useState<Partial<CreateChannelDTO>>({
    language: AppConfig.channelForm.defaultValues.language,
    ignoreEpisodesContaining: [],
    ignoreEpisodesMissing: [],
    gameCandidateAIPrompt: AppConfig.channelForm.defaultValues
      .gameCandidateAIPrompt,
  });
  const [loading, setLoading] = useState(false);

  const createChannel = async () => {
    if (
      !channel ||
      !channel.youtubeHandle ||
      !channel.language ||
      !channel.ignoreEpisodesContaining ||
      !channel.ignoreEpisodesMissing
    )
      return;
    try {
      setLoading(true);
      const createdChannel = await createOneChannel({
        ...channel,
        gameCandidateAIPrompt:
          normalizeGameCandidateAIPrompt(channel.gameCandidateAIPrompt) ?? "",
      } as CreateChannelDTO);
      navigate(
        routes.admin.channel.goTo({
          id: createdChannel.id,
          title: createdChannel.name,
        }),
      );
      launchSuccessToast(t("Admin.createChannelSuccess"));
    } catch (error: unknown) {
      if (error instanceof SpecificError) {
        launchErrorToast(t(`${error.apiErrorKey}`));
      } else {
        launchErrorToast(t("ApiErrors.unknown"));
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div
        className="flex h-full w-full flex-1 flex-col justify-center gap-10 px-5
          py-20 md:px-30 md:py-30"
      >
        <h1 className="text-2xl font-bold">{t("Admin.createChannel")}</h1>
        <ChannelParsingForm
          value={channel}
          onChange={setChannel}
          onSubmit={createChannel}
          loading={loading}
        />
      </div>
    </PageLayout>
  );
};

export default AdminCreateChannelPage;
