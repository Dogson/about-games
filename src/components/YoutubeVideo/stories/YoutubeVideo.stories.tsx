import YoutubeVideo, {
  type YoutubeVideoProps,
} from "../YoutubeVideo.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Components/YoutubeVideo",
  component: YoutubeVideo,
  argTypes: {
    youtubeId: { control: "text" },
    seekTo: { control: { type: "number", min: 0, step: 1 } },
  },
} as Meta<typeof YoutubeVideo>;

const Template: StoryFn<YoutubeVideoProps> = (args) => (
  <YoutubeVideo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  youtubeId: "jQNeYbBiCKw",
  seekTo: 0,
};

export const SeekTo30Seconds = Template.bind({});
SeekTo30Seconds.args = {
  youtubeId: "jQNeYbBiCKw",
  seekTo: 30,
};

export const SmallContainer = Template.bind({});
SmallContainer.args = {
  youtubeId: "jQNeYbBiCKw",
  seekTo: 0,
  smallContainer: true,
};
