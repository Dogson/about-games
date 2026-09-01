import type { Meta, StoryObj } from "@storybook/react-vite";
import ChannelInfos from "../ChannelInfos.component.tsx";

const meta: Meta<typeof ChannelInfos> = {
  title: "Channel/ChannelInfos",
  component: ChannelInfos,
  tags: ["autodocs"],
  argTypes: {
    avatarUrl: { control: "text" },
    name: { control: "text" },
    gamesCount: { control: "number" },
    videosCount: { control: "number" },
    lastGamesCount: { control: "number" },
    lastGamesFoundCount: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof ChannelInfos>;

export const Default: Story = {
  args: {
    avatarUrl:
      "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
    name: "Awesome Channel",
    gamesCount: 42,
    videosCount: 17,
    lastGamesCount: 20,
    lastGamesFoundCount: 15,
  },
};
