import React, { useCallback, useContext, useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import getAllChannels from "../../data-access/channels/getAllChannels.ts";
import type { Channel } from "../../models/Channel.model.ts";
import ChannelsTable from "../../components/ChannelsTable/ChannelsTable.component.tsx";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton.component.tsx";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config.ts";
import { useTranslation } from "react-i18next";
import { LuCirclePlus, LuRefreshCw } from "react-icons/lu";
import { UnverifiedVideosListContext } from "../../contexts/unverifiedVideosList/UnverifiedVideosListContext.ts";
import Card from "../../components/Card/Card.component.tsx";
import generateVideos from "../../data-access/channels/generateVideos.ts";
import {
  launchErrorToast,
  launchSuccessToast,
} from "../../helpers/toasts/toasts.ts";
import {
  isInfrastructureSpecificError,
  SpecificError,
} from "../../types/error/error.types.ts";
import InlineError from "../../components/InlineError/InlineError.component.tsx";

const AdminHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelsError, setChannelsError] = useState<SpecificError | null>(
    null,
  );
  const [generatingVideos, setGeneratingVideos] = useState(false);
  const { unverifiedVideosCount, refreshUnverifiedVideos } = useContext(
    UnverifiedVideosListContext,
  );

  const loadChannels = useCallback(async () => {
    try {
      setChannelsError(null);
      setChannels(await getAllChannels());
    } catch (e) {
      if (isInfrastructureSpecificError(e)) {
        setChannelsError(e);
      } else {
        console.error("Error loading channels:", e);
      }
    }
  }, []);

  useEffect(() => {
    loadChannels();
  }, [loadChannels]);

  useEffect(() => {
    refreshUnverifiedVideos();
  }, [refreshUnverifiedVideos]);

  const handleGenerateVideos = async () => {
    try {
      setGeneratingVideos(true);
      const result = await generateVideos();
      launchSuccessToast(result.message);
      refreshUnverifiedVideos();
      setChannels(await getAllChannels());
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        launchErrorToast(t("ApiErrors.unknown"));
      }
    } finally {
      setGeneratingVideos(false);
    }
  };

  return (
    <PageLayout>
      <div
        className="flex h-full w-full flex-1 flex-col justify-center gap-10 px-5
          py-20 md:px-30 md:py-30"
      >
        {unverifiedVideosCount !== undefined && unverifiedVideosCount > 0 && (
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
        )}

        <div className="flex w-full items-center justify-between">
          <span className="font-title text-3xl">Channels</span>
          <SecondaryButton
            onClick={handleGenerateVideos}
            loading={generatingVideos}
            Icon={LuRefreshCw}
          >
            {t("Admin.fetchNewVideos")}
          </SecondaryButton>
        </div>
        <div className="flex w-full flex-1 flex-col gap-4">
          {channelsError && channels.length === 0 ? (
            <InlineError
              message={t(`${channelsError.apiErrorKey ?? "ApiErrors.unknown"}`)}
              onRetry={() => loadChannels()}
            />
          ) : (
            <ChannelsTable channels={channels} />
          )}
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
