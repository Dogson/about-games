import {
  type ChannelParsingAttribute,
  ChannelParsingAttributes,
  type ChannelParsingOptions,
} from "../../../models/Channel.model.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isStringRegexp } from "../../../helpers/utils/string.ts";
import Input from "../../Inputs/Input/Input.component.tsx";
import MultiInput from "../../Inputs/MultiInput/MultiInput.component.tsx";
import MainButton from "../../Buttons/MainButton/MainButton.component.tsx";

export type ChannelParsingFormProps = {
  initialValues?: Partial<ChannelParsingOptions & { channelId: string }>;
  onSubmit: (values: ChannelParsingOptions) => void;
};

type ChannelParsingErrors = {
  channelId: string | null;
  parsingAttribute: string | null;
  ignoreEpisodesContaining: (string | null)[];
  ignoreSearchIn: (string | null)[];
  endParsingAfter: (string | null)[];
};

const ChannelParsingForm: React.FC<ChannelParsingFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const [channelId, setChannelId] = React.useState(initialValues?.channelId);

  const [parsingAttribute, setParsingAttribute] = React.useState(
    initialValues?.parsingAttribute,
  );
  const [ignoreEpisodesContaining, setIgnoreEpisodesContaining] =
    React.useState(initialValues?.ignoreEpisodesContaining || []);
  const [ignoreSearchIn, setIgnoreSearchIn] = React.useState(
    initialValues?.ignoreSearchIn || [],
  );
  const [endParsingAfter, setEndParsingAfter] = React.useState(
    initialValues?.endParsingAfter || [],
  );

  const [errors, setErrors] = useState<ChannelParsingErrors>({
    channelId: null,
    endParsingAfter: [],
    ignoreEpisodesContaining: [],
    ignoreSearchIn: [],
    parsingAttribute: null,
  });

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

    if (!parsingAttribute) {
      setErrors((prev) => ({
        ...prev,
        parsingAttribute: t("ChannelForm.errors.required"),
      }));
      isFormValid = false;
    } else if (
      !ChannelParsingAttributes.includes(
        parsingAttribute as ChannelParsingAttribute,
      )
    ) {
      setErrors((prev) => ({
        ...prev,
        parsingAttribute: t("ChannelForm.errors.invalidAttribute"),
      }));
      isFormValid = false;
    }

    const endParsingAfterErrors = validateRegexList(endParsingAfter);
    const ignoreEpisodesContainingErrors = validateRegexList(
      ignoreEpisodesContaining,
    );
    const ignoreSearchInErrors = validateRegexList(ignoreSearchIn);

    setErrors((prev) => ({
      ...prev,
      endParsingAfter: endParsingAfterErrors,
      ignoreEpisodesContaining: ignoreEpisodesContainingErrors,
      ignoreSearchIn: ignoreSearchInErrors,
    }));

    if (
      endParsingAfterErrors.some(Boolean) ||
      ignoreEpisodesContainingErrors.some(Boolean) ||
      ignoreSearchInErrors.some(Boolean)
    ) {
      isFormValid = false;
    }

    if (isFormValid) {
      onSubmit({
        parsingAttribute: parsingAttribute as ChannelParsingAttribute,
        endParsingAfter,
        ignoreEpisodesContaining,
        ignoreSearchIn,
      });
    }
  };

  return (
    <form onSubmit={validateForm} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <Input
          label={t("ChannelForm.parsingAttribute")}
          value={channelId || ""}
          onChange={(value) => setChannelId(value)}
          error={errors.channelId}
        />
        <Input
          label={t("ChannelForm.parsingAttribute")}
          value={parsingAttribute || ""}
          onChange={(value) =>
            setParsingAttribute(value as ChannelParsingAttribute)
          }
          error={errors.parsingAttribute}
        />
        <MultiInput
          label={t("ChannelForm.ignoreEpisodesContaining")}
          value={ignoreEpisodesContaining}
          onChange={(values) => setIgnoreEpisodesContaining(values)}
          errors={errors.ignoreEpisodesContaining}
          onAddInput={() =>
            setIgnoreEpisodesContaining((values) => [...values, ""])
          }
          onRemoveInput={(index) =>
            setIgnoreEpisodesContaining((values) =>
              values.filter((_, i) => i !== index),
            )
          }
        />
        <MultiInput
          label={t("ChannelForm.ignoreSearchIn")}
          value={ignoreSearchIn}
          onChange={(values) => setIgnoreSearchIn(values)}
          errors={errors.ignoreSearchIn}
          onAddInput={() => setIgnoreSearchIn((values) => [...values, ""])}
          onRemoveInput={(index) =>
            setIgnoreSearchIn((values) => values.filter((_, i) => i !== index))
          }
        />
        <MultiInput
          label={t("ChannelForm.endParsingAfter")}
          value={endParsingAfter}
          onChange={(values) => setEndParsingAfter(values)}
          errors={errors.endParsingAfter}
          onAddInput={() => setEndParsingAfter((values) => [...values, ""])}
          onRemoveInput={(index) =>
            setEndParsingAfter((values) => values.filter((_, i) => i !== index))
          }
        />
      </div>
      <MainButton className="self-end" onClick={validateForm}>
        {t("GameSearchsave")}
      </MainButton>
    </form>
  );
};

export default ChannelParsingForm;
