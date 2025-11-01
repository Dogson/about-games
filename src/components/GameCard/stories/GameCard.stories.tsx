import GameCard, { type GameCardProps } from "../GameCard.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Game/GameCard",
  component: GameCard,
  argTypes: {
    canBeHovered: { control: "boolean" },
    releaseDate: { control: "date" },
  },
} as Meta<typeof GameCard>;

const Template: StoryFn<GameCardProps> = (args) => <GameCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "The Legend of Zelda: Breath of the Wild ",
  imgUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.webp",
  releaseDate: "2024-11-01",
  canBeHovered: true,
};

export const NoReleaseDate = Template.bind({});
NoReleaseDate.args = {
  ...Default.args,
  releaseDate: null,
};

export const NoHover = Template.bind({});
NoHover.args = {
  ...Default.args,
  canBeHovered: false,
};

export const IsSmall = Template.bind({});
IsSmall.args = {
  ...Default.args,
  isSmall: true,
};

export const IsSmallAndDeletable = Template.bind({});
IsSmallAndDeletable.args = {
  ...IsSmall.args,
  onDelete: () => alert("Deleting game..."),
  onClick: () => alert("onClick"),
};
