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

const AdminChannelPage: React.FC = () => {
  const { currentChannelId, goToParentRoute } = useAppRoutes();
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!currentChannelId) {
    goToParentRoute();
  }

  const { channel, loading, deleteChannel, updateChannel } = useCurrentChannel(
    currentChannelId || -1,
  );

  const [channelParsingForm, setChannelParsingForm] = useState<
    Partial<CreateChannelDTO> | undefined
  >();

  const handleChannelParsingFormChange = (
    channelParsingForm: Partial<CreateChannelDTO>,
  ) => {
    setChannelParsingForm(channelParsingForm);
  };

  const handleChannelParsingFormSubmit = () => {
    updateChannel({
      parsingOptions: channelParsingForm?.parsingOptions,
      youtubeHandle: channelParsingForm?.youtubeHandle,
      language: channelParsingForm?.language as ChannelLanguage,
    });
  };

  useEffect(() => {
    if (channel) {
      setChannelParsingForm({
        parsingOptions: channel.parsingOptions,
        youtubeHandle: channel.youtubeHandle,
        language: channel.language,
      });
    }
  }, [channel]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteChannel();
    setShowDeleteModal(false);
  };

  return (
    <PageLayout>
      <div
        className="mt-15 flex w-full flex-1 flex-col items-center gap-10 p-5
          md:mt-0 md:w-auto md:justify-center"
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
      </div>
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
