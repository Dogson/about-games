import {
  ChannelLanguages,
  type ChannelLanguage,
} from "../../../models/Channel.model.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isStringRegexp } from "../../../helpers/utils/string.utils.ts";
import Input from "../../Inputs/Input/Input.component.tsx";
import MultiInput from "../../Inputs/MultiInput/MultiInput.component.tsx";
import TextArea from "../../Inputs/TextArea/TextArea.component.tsx";
import MainButton from "../../Buttons/MainButton/MainButton.component.tsx";
import type { CreateChannelDTO } from "../../../data-access/channels/model/channels.model.ts";
import SelectInput from "../../Inputs/SelectInput/SelectInput.component.tsx";
import AppConfig from "../../../config/app.config.ts";
import LanguageCode from "../../LanguageCode/LanguageCode.component.tsx";

export type ChannelParsingFormProps = {
  value?: Partial<CreateChannelDTO>;
  onChange: (channel: Partial<CreateChannelDTO>) => void;
  onSubmit: () => void;
  loading: boolean;
  onDelete?: () => void;
};

type ChannelParsingErrors = {
  youtubeHandle: string | null;
  language: string | null;
  ignoreEpisodesContaining: (string | null)[];
  ignoreEpisodesMissing: (string | null)[];
};

const ChannelParsingForm: React.FC<ChannelParsingFormProps> = ({
  value,
  onChange,
  onSubmit,
  loading,
  onDelete,
}) => {
  const { t } = useTranslation();

  const [errors, setErrors] = useState<ChannelParsingErrors>({
    youtubeHandle: null,
    language: null,
    ignoreEpisodesContaining: [],
    ignoreEpisodesMissing: [],
  });

  const gameCandidateAIPromptValue =
    value?.gameCandidateAIPrompt?.trim() ||
    AppConfig.channelForm.gameCandidateAIPromptDefault;

  const validateRegexList = (values: string[]): (string | null)[] => {
    return values.map((value) => {
      if (!value) {
        return t("ChannelForm.errors.required");
      } else if (!isStringRegexp(value)) {
        return t("ChannelForm.errors.invalidRegexp");
      }
      return null;
    });
  };

  const validateForm = () => {
    let isFormValid = true;

    if (!value?.youtubeHandle) {
      setErrors((prev) => ({
        ...prev,
        youtubeHandle: t("ChannelForm.errors.required"),
      }));
      isFormValid = false;
    }

    if (!value?.language) {
      setErrors((prev) => ({
        ...prev,
        language: t("ChannelForm.errors.required"),
      }));
      isFormValid = false;
    } else if (
      !Object.values(ChannelLanguages).includes(
        value?.language as ChannelLanguage,
      )
    ) {
      setErrors((prev) => ({
        ...prev,
        language: t("ChannelForm.errors.invalidLanguage"),
      }));
      isFormValid = false;
    }

    const ignoreEpisodesContainingErrors = validateRegexList(
      value?.parsingOptions?.ignoreEpisodesContaining || [],
    );
    const ignoreEpisodesMissingErrors = validateRegexList(
      value?.parsingOptions?.ignoreEpisodesMissing || [],
    );

    setErrors((prev) => ({
      ...prev,
      ignoreEpisodesContaining: ignoreEpisodesContainingErrors,
      ignoreEpisodesMissing: ignoreEpisodesMissingErrors,
    }));

    if (
      ignoreEpisodesContainingErrors.some(Boolean) ||
      ignoreEpisodesMissingErrors.some(Boolean)
    ) {
      isFormValid = false;
    }

    onChange?.({
      ...value,
      parsingOptions: {
        ignoreEpisodesContaining:
          value?.parsingOptions?.ignoreEpisodesContaining || [],
        ignoreEpisodesMissing:
          value?.parsingOptions?.ignoreEpisodesMissing || [],
        playlistsIds: (value?.parsingOptions?.playlistsIds || []).filter(
          Boolean,
        ),
      },
      gameCandidateAIPrompt: value?.gameCandidateAIPrompt ?? "",
    });

    if (isFormValid) {
      onSubmit?.();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
        <Input
          label={t("ChannelForm.youtubeHandle")}
          value={value?.youtubeHandle || ""}
          onChange={(newValue) =>
            onChange?.({ ...value, youtubeHandle: newValue })
          }
          error={errors.youtubeHandle}
          required
        />
        <SelectInput
          label={t("ChannelForm.language")}
          value={value?.language || ""}
          onChange={(newValue) =>
            onChange?.({ ...value, language: newValue as "en" | "fr" })
          }
          options={AppConfig.availableLanguages.map((lng) => ({
            value: lng,
            label: <LanguageCode language={lng} withLabel />,
          }))}
          error={errors.language}
          required
        />

        <MultiInput
          label={t("ChannelForm.ignoreEpisodesContaining")}
          placeholder="/Exemple/i"
          value={value?.parsingOptions?.ignoreEpisodesContaining || []}
          onChange={(values) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining: values,
                ignoreEpisodesMissing:
                  value?.parsingOptions?.ignoreEpisodesMissing || [],
                playlistsIds: value?.parsingOptions?.playlistsIds,
              },
            })
          }
          errors={errors.ignoreEpisodesContaining}
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining: [
                  ...(value?.parsingOptions?.ignoreEpisodesContaining || []),
                  "",
                ],
                ignoreEpisodesMissing:
                  value?.parsingOptions?.ignoreEpisodesMissing || [],
                playlistsIds: value?.parsingOptions?.playlistsIds,
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining: (
                  value?.parsingOptions?.ignoreEpisodesContaining || []
                ).filter((_: string, i: number) => i !== index),
                ignoreEpisodesMissing:
                  value?.parsingOptions?.ignoreEpisodesMissing || [],
                playlistsIds: value?.parsingOptions?.playlistsIds,
              },
            })
          }
        />
        <MultiInput
          label={t("ChannelForm.ignoreEpisodesMissing")}
          value={value?.parsingOptions?.ignoreEpisodesMissing || []}
          onChange={(values) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining:
                  value?.parsingOptions?.ignoreEpisodesContaining || [],
                ignoreEpisodesMissing: values,
                playlistsIds: value?.parsingOptions?.playlistsIds,
              },
            })
          }
          errors={errors.ignoreEpisodesMissing}
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining:
                  value?.parsingOptions?.ignoreEpisodesContaining || [],
                ignoreEpisodesMissing: [
                  ...(value?.parsingOptions?.ignoreEpisodesMissing || []),
                  "",
                ],
                playlistsIds: value?.parsingOptions?.playlistsIds,
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining:
                  value?.parsingOptions?.ignoreEpisodesContaining || [],
                ignoreEpisodesMissing: (
                  value?.parsingOptions?.ignoreEpisodesMissing || []
                ).filter((_: string, i: number) => i !== index),
                playlistsIds: value?.parsingOptions?.playlistsIds,
              },
            })
          }
        />
        <MultiInput
          label={t("ChannelForm.playlistsIds")}
          placeholder="PL…"
          value={value?.parsingOptions?.playlistsIds || []}
          onChange={(values) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining:
                  value?.parsingOptions?.ignoreEpisodesContaining || [],
                ignoreEpisodesMissing:
                  value?.parsingOptions?.ignoreEpisodesMissing || [],
                playlistsIds: values,
              },
            })
          }
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining:
                  value?.parsingOptions?.ignoreEpisodesContaining || [],
                ignoreEpisodesMissing:
                  value?.parsingOptions?.ignoreEpisodesMissing || [],
                playlistsIds: [
                  ...(value?.parsingOptions?.playlistsIds || []),
                  "",
                ],
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ignoreEpisodesContaining:
                  value?.parsingOptions?.ignoreEpisodesContaining || [],
                ignoreEpisodesMissing:
                  value?.parsingOptions?.ignoreEpisodesMissing || [],
                playlistsIds: (value?.parsingOptions?.playlistsIds || []).filter(
                  (_: string, i: number) => i !== index,
                ),
              },
            })
          }
        />
      </div>

      <TextArea
        label={t("ChannelForm.gameCandidateAIPrompt")}
        value={gameCandidateAIPromptValue}
        rows={10}
        onChange={(newValue) =>
          onChange?.({ ...value, gameCandidateAIPrompt: newValue })
        }
      />

      <div className="mt-5 flex flex-row-reverse justify-between">
        <MainButton type="submit" className="self-end" loading={loading}>
          {t("common.save")}
        </MainButton>
        {onDelete && (
          <MainButton
            danger
            type="button"
            className="self-end"
            onClick={onDelete}
          >
            {t("common.delete")}
          </MainButton>
        )}
      </div>
    </form>
  );
};

export default ChannelParsingForm;
