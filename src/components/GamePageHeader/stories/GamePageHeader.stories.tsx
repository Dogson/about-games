import GamePageHeader, {
  type GamePageHeaderProps,
} from "../GamePageHeader.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Components/GamePageHeader",
  component: GamePageHeader,
  argTypes: {
    title: { control: "text" },
    releaseDate: { control: "date" },
    coverImg: { control: "text" },
    boxartImg: { control: "text" },
  },
} as Meta<typeof GamePageHeader>;

const Template: StoryFn<GamePageHeaderProps> = (args) => (
  <div className="relative h-[600px] w-full">
    <GamePageHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  companies: ["Team Cherry", "Nintendo"],
  title: "Hollow Knight: Silksong",
  releaseDate: "2025-05-15",
  coverImg: "https://images.igdb.com/igdb/image/upload/t_1080p/ar5sq.webp",
  boxartImg:
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co3vtl.webp",
};

export const NoCoverImage = Template.bind({});
NoCoverImage.args = {
  ...Default.args,
  coverImg: null,
};

export const NoReleaseDate = Template.bind({});
NoReleaseDate.args = {
  ...Default.args,
  releaseDate: null,
};

export const NoBoxArt = Template.bind({});
NoBoxArt.args = {
  ...Default.args,
  boxartImg: null,
};
