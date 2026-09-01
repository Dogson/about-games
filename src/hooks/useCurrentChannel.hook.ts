import React, { useCallback, useEffect } from "react";
import {
  launchErrorToast,
  launchSuccessToast,
} from "../helpers/toasts/toasts.ts";
import { useTranslation } from "react-i18next";
import useAppRoutes from "./useAppRoutes.hook.ts";
import { SpecificError } from "../types/error/error.types.ts";
import type { Channel } from "../models/Channel.model.ts";
import getOneChannel from "../data-access/channels/getOneChannel.ts";
import deleteOneChannel from "../data-access/channels/deleteOneChannel.ts";
import updateOneChannel from "../data-access/channels/updateOneChannel.ts";
import type { UpdateChannelDTO } from "../data-access/channels/model/channels.model.ts";

export type UseCurrentChannel = {
  channel?: Channel;
  loading: boolean;
  fetchChannel: () => Promise<void>;
  deleteChannel: () => Promise<void>;
  updateChannel: (channel: UpdateChannelDTO) => Promise<void>;
};

const useCurrentChannel = (channelId: number): UseCurrentChannel => {
  const [channel, setChannel] = React.useState<Channel | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { goToParentRoute } = useAppRoutes();
  const { t } = useTranslation();

  const fetchChannel = useCallback(
    async () => {
      try {
        setLoading(true);
        setChannel(await getOneChannel(channelId));
      } catch (e) {
        launchErrorToast(t("Channel.notFound"));
        goToParentRoute();
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    // t render two times on app mount :'(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goToParentRoute],
  );

  useEffect(() => {
    fetchChannel();
  }, [fetchChannel]);

  const deleteChannel = useCallback(async () => {
    if (!channel) return;
    try {
      await deleteOneChannel(channel.id);
      launchSuccessToast(t("Admin.deleteChannelSuccess"));
      goToParentRoute();
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        launchErrorToast(t("ApiErrors.unknown"));
        console.error(e);
      }
    }
  }, [channel, goToParentRoute, t]);

  const updateChannel = useCallback(
    async (channelUpdateDto: UpdateChannelDTO) => {
      if (!channel) return;
      try {
        setLoading(true);
        await updateOneChannel(channelId, channelUpdateDto);
        launchSuccessToast(t("Admin.editChannelSuccess"));
        setChannel(await getOneChannel(channelId));
      } catch (e) {
        if (e instanceof SpecificError) {
          launchErrorToast(t(`${e.apiErrorKey}`));
        } else {
          launchErrorToast(t("ApiErrors.unknown"));
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    },
    [channel, channelId, t],
  );

  return {
    channel,
    loading,
    fetchChannel,
    deleteChannel,
    updateChannel,
  };
};

export default useCurrentChannel;
