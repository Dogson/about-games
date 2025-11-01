import type { Meta, StoryFn } from "@storybook/react-vite";
import HeaderSearchBox from "../HeaderSearchBox.component.tsx";
import mockGames from "../../../../mocks/games.mocks.json";

export default {
  title: "Header/HeaderSearchBox",
  component: HeaderSearchBox,
} as Meta<typeof HeaderSearchBox>;

const Template: StoryFn<typeof HeaderSearchBox> = (args) => (
  <div className="p-4">
    <HeaderSearchBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  games: mockGames,
  searchText: "",
  onChangeSearchText: (text) => console.log("Search text:", text),
  onClickGame: (game) => alert(`Clicked: ${game.title}`),
};
