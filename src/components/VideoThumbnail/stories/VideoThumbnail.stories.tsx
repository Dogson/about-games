import VideoThumbnail, {
  type VideoThumbnailProps,
} from "../VideoThumbnail.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Components/VideoThumbnail",
  component: VideoThumbnail,
  argTypes: {
    channelName: { control: "text" },
    channelAvatarUrl: { control: "text" },
    videoTitle: { control: "text" },
    videoThumbnailUrl: { control: "text" },
    publicationDate: { control: "text" },
  },
} as Meta<typeof VideoThumbnail>;

const Template: StoryFn<VideoThumbnailProps> = (args) => (
  <VideoThumbnail {...args} />
);

export const Default = Template.bind({});
Default.args = {
  channelName: "Jacob Geller",
  channelAvatarUrl:
    "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
  videoTitle: "Clair Obscur is an Endless Canvas of Grief",
  videoThumbnailUrl:
    "https://i.ytimg.com/vi/9NKzr9_rZaY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBl0y76jGviWAjmcov0wvkxU-4XfA",
  publicationDate: "2025-06-08",
};

export const ShortTitle = Template.bind({});
ShortTitle.args = {
  ...Default.args,
  videoTitle: "Quick Tips",
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  ...Default.args,
  videoTitle:
    "This is an example of a really long video title to test layout responsiveness and truncation behavior",
};

export const LongChannelName = Template.bind({});
LongChannelName.args = {
  ...Default.args,
  channelName:
    "This is an example of a really long channel name to test layout responsiveness",
};

export const BrightThumbnail = Template.bind({});
BrightThumbnail.args = {
  ...Default.args,
  videoThumbnailUrl:
    "https://i.ytimg.com/vi/pjQf0FIs4VM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD2751vzhfIPzVPnVUKX88B5DCv4Q",
};
