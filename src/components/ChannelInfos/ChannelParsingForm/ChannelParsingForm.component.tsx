import {
  ChannelLanguages,
  type ChannelLanguage,
  type ChannelParsingAttribute,
  ChannelParsingAttributes,
} from "../../../models/Channel.model.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isStringRegexp } from "../../../helpers/utils/string.ts";
import Input from "../../Inputs/Input/Input.component.tsx";
import MultiInput from "../../Inputs/MultiInput/MultiInput.component.tsx";
import MainButton from "../../Buttons/MainButton/MainButton.component.tsx";
import type { CreateChannelDTO } from "../../../data-access/channels/model/channels.model.ts";

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
  parsingAttribute: string | null;
  ignoreEpisodesContaining: (string | null)[];
  ignoreSearchIn: (string | null)[];
  endParsingAfter: (string | null)[];
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
    parsingAttribute: null,
    ignoreEpisodesContaining: [],
    ignoreSearchIn: [],
    endParsingAfter: [],
    ignoreEpisodesMissing: [],
  });

  const getParsingOptions = () => {
    return {
      parsingAttribute:
        (value?.parsingOptions?.parsingAttribute as
          | ChannelParsingAttribute
          | undefined) || ("title" as ChannelParsingAttribute),
      ignoreEpisodesContaining:
        value?.parsingOptions?.ignoreEpisodesContaining || [],
      ignoreSearchIn: value?.parsingOptions?.ignoreSearchIn || [],
      endParsingAfter: value?.parsingOptions?.endParsingAfter || [],
      ignoreEpisodesMissing: value?.parsingOptions?.ignoreEpisodesMissing || [],
    };
  };

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

    if (!value?.parsingOptions?.parsingAttribute) {
      setErrors((prev) => ({
        ...prev,
        parsingAttribute: t("ChannelForm.errors.required"),
      }));
      isFormValid = false;
    } else if (
      !ChannelParsingAttributes.includes(
        value?.parsingOptions?.parsingAttribute as ChannelParsingAttribute,
      )
    ) {
      setErrors((prev) => ({
        ...prev,
        parsingAttribute: t("ChannelForm.errors.invalidAttribute"),
      }));
      isFormValid = false;
    }

    setErrors((prev) => ({
      ...prev,
      endParsingAfter: validateRegexList(
        value?.parsingOptions?.endParsingAfter || [],
      ),
      ignoreEpisodesContaining: validateRegexList(
        value?.parsingOptions?.ignoreEpisodesContaining || [],
      ),
      ignoreSearchIn: validateRegexList(
        value?.parsingOptions?.ignoreSearchIn || [],
      ),
      ignoreEpisodesMissing: validateRegexList(
        value?.parsingOptions?.ignoreEpisodesMissing || [],
      ),
    }));

    if (
      validateRegexList(value?.parsingOptions?.endParsingAfter || []).some(
        Boolean,
      ) ||
      validateRegexList(
        value?.parsingOptions?.ignoreEpisodesContaining || [],
      ).some(Boolean) ||
      validateRegexList(value?.parsingOptions?.ignoreSearchIn || []).some(
        Boolean,
      ) ||
      validateRegexList(
        value?.parsingOptions?.ignoreEpisodesMissing || [],
      ).some(Boolean)
    ) {
      isFormValid = false;
    }

    onChange?.({
      ...value,
      parsingOptions: {
        parsingAttribute: value?.parsingOptions
          ?.parsingAttribute as ChannelParsingAttribute,
        endParsingAfter: value?.parsingOptions?.endParsingAfter || [],
        ignoreEpisodesContaining:
          value?.parsingOptions?.ignoreEpisodesContaining || [],
        ignoreSearchIn: value?.parsingOptions?.ignoreSearchIn || [],
        ignoreEpisodesMissing:
          value?.parsingOptions?.ignoreEpisodesMissing || [],
      },
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <Input
          label={t("ChannelForm.youtubeHandle")}
          value={value?.youtubeHandle || ""}
          onChange={(newValue) =>
            onChange?.({ ...value, youtubeHandle: newValue })
          }
          error={errors.youtubeHandle}
        />
        <Input
          label={t("ChannelForm.language")}
          value={value?.language || ""}
          onChange={(newValue) =>
            onChange?.({ ...value, language: newValue as "en" | "fr" })
          }
          error={errors.language}
          placeholder="fr, en"
        />

        <Input
          label={t("ChannelForm.parsingAttribute")}
          value={value?.parsingOptions?.parsingAttribute || ""}
          onChange={(newValue) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                parsingAttribute: newValue as ChannelParsingAttribute,
              },
            })
          }
          placeholder="title, description"
          error={errors.parsingAttribute}
        />
        <MultiInput
          label={t("ChannelForm.ignoreEpisodesContaining")}
          placeholder="/Exemple/i"
          value={value?.parsingOptions?.ignoreEpisodesContaining || []}
          onChange={(values) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreEpisodesContaining: values,
              },
            })
          }
          errors={errors.ignoreEpisodesContaining}
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreEpisodesContaining: [
                  ...(value?.parsingOptions?.ignoreEpisodesContaining || []),
                  "",
                ],
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreEpisodesContaining: (
                  value?.parsingOptions?.ignoreEpisodesContaining || []
                ).filter((_: string, i: number) => i !== index),
              },
            })
          }
        />
        <MultiInput
          label={t("ChannelForm.ignoreSearchIn")}
          value={value?.parsingOptions?.ignoreSearchIn || []}
          onChange={(values) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreSearchIn: values,
              },
            })
          }
          errors={errors.ignoreSearchIn}
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreSearchIn: [
                  ...(value?.parsingOptions?.ignoreSearchIn || []),
                  "",
                ],
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreSearchIn: (
                  value?.parsingOptions?.ignoreSearchIn || []
                ).filter((_: string, i: number) => i !== index),
              },
            })
          }
        />
        <MultiInput
          label={t("ChannelForm.endParsingAfter")}
          value={value?.parsingOptions?.endParsingAfter || []}
          onChange={(values) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                endParsingAfter: values,
              },
            })
          }
          errors={errors.endParsingAfter}
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                endParsingAfter: [
                  ...(value?.parsingOptions?.endParsingAfter || []),
                  "",
                ],
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                endParsingAfter: (
                  value?.parsingOptions?.endParsingAfter || []
                ).filter((_: string, i: number) => i !== index),
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
                ...getParsingOptions(),
                ignoreEpisodesMissing: values,
              },
            })
          }
          errors={errors.ignoreEpisodesMissing}
          onAddInput={() =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreEpisodesMissing: [
                  ...(value?.parsingOptions?.ignoreEpisodesMissing || []),
                  "",
                ],
              },
            })
          }
          onRemoveInput={(index) =>
            onChange?.({
              ...value,
              parsingOptions: {
                ...getParsingOptions(),
                ignoreEpisodesMissing: (
                  value?.parsingOptions?.ignoreEpisodesMissing || []
                ).filter((_: string, i: number) => i !== index),
              },
            })
          }
        />
      </div>
      <div className="flex flex-row-reverse justify-between">
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
