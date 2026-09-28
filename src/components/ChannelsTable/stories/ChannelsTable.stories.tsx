// src/components/ChannelsTable/ChannelsTable.stories.tsx
import type { Meta, StoryFn } from "@storybook/react-vite";
import ChannelsTable, {
  type ChannelsTableProps,
} from "../ChannelsTable.component.tsx";
import type { Channel } from "../../../models/Channel.model.ts";

const meta: Meta<typeof ChannelsTable> = {
  title: "Channel/ChannelsTable",
  component: ChannelsTable,
};

export default meta;

const mockChannels: Channel[] = [
  {
    id: 1,
    youtubeHandle: "",
    youtubeId: "UC1234567890",
    description: "A popular gaming channel.",
    language: "fr",
    name: "GamerChannel",
    thumbnailUrl:
      "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
    videosCount: 42,
    parsingOptions: {
      ignoreEpisodesContaining: [],
      ignoreEpisodesMissing: [],
    },
    additionalGameCandidateAIPrompt: "",
    videos: [],
    createdAt: "2023-09-15T09:30:00.000Z",
    totalGamesFoundCount: 35,
    totalGamesCount: 50,
    accuracy: 0.7,
    gamesCount: 42,
  },
  {
    id: 2,
    youtubeHandle: "funstreamer",
    youtubeId: "UC0987654321",
    description: "Fun and entertaining streams.",
    language: "en",
    name: "FunStream",
    thumbnailUrl:
      "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
    videosCount: 18,
    parsingOptions: {
      ignoreEpisodesContaining: [],
      ignoreEpisodesMissing: [],
    },
    additionalGameCandidateAIPrompt: "",
    videos: [],
    createdAt: "2023-10-12T14:05:00.000Z",
    totalGamesFoundCount: 12,
    totalGamesCount: 18,
    accuracy: 0.67,
    gamesCount: 18,
  },
  {
    id: 3,
    youtubeHandle: "techwizard",
    youtubeId: "UC1122334455",
    description: "Tech reviews and tutorials.",
    language: "en",
    name: "TechWizard",
    thumbnailUrl:
      "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
    videosCount: 55,
    parsingOptions: {
      ignoreEpisodesContaining: [],
      ignoreEpisodesMissing: [],
    },
    additionalGameCandidateAIPrompt: "",
    videos: [],
    createdAt: "2023-11-03T08:00:00.000Z",
    totalGamesFoundCount: 50,
    totalGamesCount: 55,
    accuracy: 0.91,
    gamesCount: 55,
  },
  {
    id: 4,
    youtubeHandle: "dailygamer",
    youtubeId: "UC6677889900",
    description: "Daily gaming highlights.",
    language: "fr",
    name: "DailyGamer",
    thumbnailUrl:
      "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
    videosCount: 5,
    parsingOptions: {
      ignoreEpisodesContaining: [],
      ignoreEpisodesMissing: [],
    },
    additionalGameCandidateAIPrompt: "",
    videos: [],
    createdAt: "2024-01-21T18:45:00.000Z",
    totalGamesFoundCount: 3,
    totalGamesCount: 5,
    accuracy: 0.6,
    gamesCount: 5,
  },
  {
    id: 5,
    youtubeHandle: "vlogmaster",
    youtubeId: "UC5544332211",
    description: "Vlogging and lifestyle.",
    language: "en",
    name: "VlogMaster",
    thumbnailUrl:
      "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
    videosCount: 100,
    parsingOptions: {
      ignoreEpisodesContaining: [],
      ignoreEpisodesMissing: [],
    },
    additionalGameCandidateAIPrompt: "",
    videos: [],
    createdAt: "2024-02-10T11:20:00.000Z",
    totalGamesFoundCount: 95,
    totalGamesCount: 100,
    accuracy: 0.95,
    gamesCount: 100,
  },
];

const Template: StoryFn<ChannelsTableProps> = (args) => (
  <ChannelsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  channels: mockChannels,
};
