import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import useCurrentChannel from "../../hooks/useCurrentChannel.hook.ts";
import ChannelInfos from "../../components/ChannelInfos/ChannelInfos.component.tsx";
import type { CreateChannelDTO } from "../../data-access/channels/model/channels.model.ts";
import type { ChannelLanguage } from "../../models/Channel.model.ts";
import ChannelParsingForm from "../../components/ChannelInfos/ChannelParsingForm/ChannelParsingForm.component.tsx";
import { Separator } from "../../components/Separator/Separator.component.tsx";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/Modals/Modal/Modal.component.tsx";
import ChannelVideosTable from "../../components/ChannelVideosTable/ChannelVideosTable.component.tsx";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";
import updateOneVideo from "../../data-access/videos/updateOneVideo.ts";
import generateGames from "../../data-access/channels/generateGames.ts";
import {
  launchErrorToast,
  launchSuccessToast,
  launchWarningToast,
} from "../../helpers/toasts/toasts.ts";
import { SpecificError } from "../../types/error/error.types.ts";
import { normalizeAdditionalGameCandidateAIPrompt } from "../../helpers/utils/string.utils.ts";
import InlineError from "../../components/InlineError/InlineError.component.tsx";

const AdminChannelPage: React.FC = () => {
  const { currentChannelId, goToParentRoute } = useAppRoutes();
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [unignoring, setUnignoring] = useState(false);

  if (!currentChannelId) {
    goToParentRoute();
  }

  const {
    channel,
    loading,
    error,
    fetchChannel,
    deleteChannel,
    updateChannel,
  } = useCurrentChannel(currentChannelId || -1);

  const [channelParsingForm, setChannelParsingForm] = useState<
    Partial<CreateChannelDTO> | undefined
  >();

  const handleChannelParsingFormChange = (
    channelParsingForm: Partial<CreateChannelDTO>,
  ) => {
    setChannelParsingForm(channelParsingForm);
  };

  const handleChannelParsingFormSubmit = () => {
    const additionalGameCandidateAIPrompt =
      normalizeAdditionalGameCandidateAIPrompt(
        channelParsingForm?.additionalGameCandidateAIPrompt,
      );
    const parsingOptions = channelParsingForm?.parsingOptions;

    updateChannel({
      ...(additionalGameCandidateAIPrompt !== undefined && {
        additionalGameCandidateAIPrompt,
      }),
      ...(parsingOptions && {
        parsingOptions: {
          ignoreEpisodesContaining: parsingOptions.ignoreEpisodesContaining,
          ignoreEpisodesMissing: parsingOptions.ignoreEpisodesMissing,
          playlistsIds: parsingOptions.playlistsIds,
        },
      }),
      youtubeHandle: channelParsingForm?.youtubeHandle,
      language: channelParsingForm?.language as ChannelLanguage,
    });
  };

  useEffect(() => {
    if (channel) {
      setChannelParsingForm({
        parsingOptions: {
          ignoreEpisodesContaining:
            channel.parsingOptions.ignoreEpisodesContaining,
          ignoreEpisodesMissing: channel.parsingOptions.ignoreEpisodesMissing,
          playlistsIds: channel.parsingOptions.playlistsIds ?? [],
        },
        additionalGameCandidateAIPrompt:
          channel.additionalGameCandidateAIPrompt ?? "",
        youtubeHandle: channel.youtubeHandle,
        language: channel.language,
      });
    }
  }, [channel]);

  const ignoredVideosCount =
    channel?.videos?.filter((v) => v.ignored).length ?? 0;

  const handleUnignoreAll = async () => {
    if (!channel?.videos) return;
    const ignoredVideos = channel.videos.filter((v) => v.ignored);
    try {
      setUnignoring(true);
      await Promise.all(
        ignoredVideos.map((v) =>
          updateOneVideo(v.id, {
            ignored: false,
            hasSearchedGames: false,
            validated: false,
          }),
        ),
      );
      const result = await generateGames(channel.id);
      if (result.updated > 0) {
        launchSuccessToast(
          t("Admin.unignoreSuccess", { count: result.updated }),
        );
      } else {
        launchWarningToast(t("Admin.unignoreNoChanges"));
      }
      fetchChannel();
    } catch (e) {
      if (e instanceof SpecificError) {
        launchErrorToast(t(`${e.apiErrorKey}`));
      } else {
        launchErrorToast(t("ApiErrors.unknown"));
      }
    } finally {
      setUnignoring(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteChannel();
    setShowDeleteModal(false);
  };

  return (
    <PageLayout>
      {error && !channel ? (
        <div
          className="mt-15 flex w-full flex-1 flex-col items-center p-5
            md:mt-20"
        >
          <div className="max-w-container w-full">
            <InlineError
              message={t(`${error.apiErrorKey ?? "ApiErrors.unknown"}`)}
              onRetry={() => fetchChannel()}
            />
          </div>
        </div>
      ) : (
        <div
          className="mt-15 flex w-full flex-1 flex-col items-center gap-10 p-5
            md:mt-20 md:w-auto md:justify-center"
        >
          <ChannelInfos
            avatarUrl={channel?.thumbnailUrl || ""}
            name={channel?.name || ""}
            gamesCount={channel?.gamesCount || 0}
            videosCount={channel?.videosCount || 0}
            lastGamesCount={0} // TODO: add last games count
            lastGamesFoundCount={0} // TODO: add last games found count
          />
          <Separator bulletSize="md" direction="horizontal" />
          <ChannelParsingForm
            value={channelParsingForm}
            onChange={handleChannelParsingFormChange}
            onSubmit={handleChannelParsingFormSubmit}
            loading={loading}
            onDelete={handleDeleteClick}
          />
          <Separator bulletSize="md" direction="horizontal" />
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-title text-ghost text-xl">Videos</h2>
              <MainButton
                onClick={handleUnignoreAll}
                disabled={ignoredVideosCount === 0 || unignoring}
                loading={unignoring}
              >
                {t("Admin.unignoreAllVideos")} ({ignoredVideosCount})
              </MainButton>
            </div>
            <ChannelVideosTable videos={channel?.videos || []} />
          </div>
        </div>
      )}
      <AnimatePresence>
        {showDeleteModal && (
          <Modal
            title={t("ChannelForm.deleteChannel.title")}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            onDeny={() => setShowDeleteModal(false)}
            confirmText={t("ChannelForm.deleteChannel.confirm")}
            denyText={t("ChannelForm.deleteChannel.cancel")}
            dangerousAction={true}
            disableCloseByClickOutside={false}
          >
            {t("ChannelForm.deleteChannel.message")}
          </Modal>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default AdminChannelPage;
