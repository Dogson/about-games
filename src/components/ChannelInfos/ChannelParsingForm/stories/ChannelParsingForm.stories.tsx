import { useState } from "react";
import ChannelParsingForm, {
  type ChannelParsingFormProps,
} from "../ChannelParsingForm.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type { CreateChannelDTO } from "../../../../data-access/channels/model/channels.model.ts";

export default {
  title: "Channel/ChannelParsingForm",
  component: ChannelParsingForm,
} as Meta<typeof ChannelParsingForm>;

const Template: StoryFn<ChannelParsingFormProps> = (args) => {
  const [value, setValue] = useState<Partial<CreateChannelDTO>>(
    args.value || {},
  );

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);

    // reset after a short delay so you see the effect in Storybook
    setTimeout(() => setSubmitted(false), 1500);
  };

  return (
    <div className="max-w-3xl p-4">
      <ChannelParsingForm
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        loading={args.loading ?? false}
      />

      {submitted && (
        <div className="mt-4 rounded bg-green-100 p-3 text-sm text-green-800">
          Form submitted ✔
        </div>
      )}

      <pre
        className="mt-6 rounded border bg-gray-100 p-4 text-sm
          whitespace-pre-wrap"
      >
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  loading: false,
  value: {
    youtubeHandle: "",
    language: "en",
    ignoreEpisodesContaining: [],
    ignoreEpisodesMissing: [],
    gameCandidateAIPrompt: "",
  },
};
