import type { Meta, StoryFn } from "@storybook/react-vite";
import GameBackButton from "../GameBackButton.component.tsx";

export default {
  title: "Buttons/GameBackButton",
  component: GameBackButton,
  argTypes: {
    gameCoverImgUrl: { control: "text" },
    onClick: { action: "clicked" },
  },
} as Meta<typeof GameBackButton>;

const Template: StoryFn<React.ComponentProps<typeof GameBackButton>> = (
  args,
) => <GameBackButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  gameCoverImgUrl:
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8v.jpg",
};

export const NoCover = Template.bind({});
NoCover.args = {
  gameCoverImgUrl: "",
};
