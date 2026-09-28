import ChannelNameAndThumbnail, {
  type ChannelNameAndThumbnailProps,
} from "../ChannelNameAndThumbnail.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Channel/ChannelNameAndThumbnail",
  component: ChannelNameAndThumbnail,
  argTypes: {
    name: { control: "text" },
    thumbnailUrl: { control: "text" },
  },
} as Meta<typeof ChannelNameAndThumbnail>;

const Template: StoryFn<ChannelNameAndThumbnailProps> = (args) => (
  <ChannelNameAndThumbnail {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "Jacob Geller",
  thumbnailUrl:
    "https://yt3.ggpht.com/oEvJp21jyoK8viSJQZsoIB4TpDmXsRBjOfMybj8azcfgCQ6dkQ8uP6Fg4nyYUCosnYhYzTlc=s68-c-k-c0x00ffffff-no-rj",
};
