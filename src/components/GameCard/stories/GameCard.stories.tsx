import GameCard, { type GameCardProps } from "../GameCard.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Components/GameCard",
  component: GameCard,
  argTypes: {
    canBeHovered: { control: "boolean" },
    releaseDate: { control: "date" },
  },
} as Meta<typeof GameCard>;

const Template: StoryFn<GameCardProps> = (args) => <GameCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Lorelei And The Laser Eyes",
  imgUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4x7e.webp",
  releaseDate: "2024-11-01",
  canBeHovered: true,
};

export const NoHover = Template.bind({});
NoHover.args = {
  ...Default.args,
  canBeHovered: false,
};
