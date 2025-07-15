import { useState } from "react";
import ChannelParsingForm, {
  type ChannelParsingFormProps,
} from "../ChannelParsingForm.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type {
  ChannelParsingAttribute,
  ChannelParsingOptions,
} from "../../../../models/Channel.model.ts";

export default {
  title: "Channel/ChannelParsingForm",
  component: ChannelParsingForm,
} as Meta<typeof ChannelParsingForm>;

const Template: StoryFn<ChannelParsingFormProps> = (args) => {
  const [submittedData, setSubmittedData] =
    useState<ChannelParsingOptions | null>(null);

  const handleSubmit = (values: ChannelParsingOptions) => {
    setSubmittedData(values);
  };

  return (
    <div className="max-w-3xl p-4">
      <ChannelParsingForm {...args} onSubmit={handleSubmit} />
      {submittedData && (
        <pre
          className="mt-6 rounded border bg-gray-100 p-4 text-sm
            whitespace-pre-wrap"
        >
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  initialValues: {
    parsingAttribute: "title" as ChannelParsingAttribute,
    ignoreEpisodesContaining: [""],
    ignoreSearchIn: [""],
    endParsingAfter: [""],
  },
};
