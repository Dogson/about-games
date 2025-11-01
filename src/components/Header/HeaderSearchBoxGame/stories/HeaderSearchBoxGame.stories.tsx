import type { Meta, StoryFn } from "@storybook/react-vite";
import HeaderSearchBoxGame from "../HeaderSearchBoxGame.component.tsx";

export default {
  title: "Header/HeaderSearchBoxGame",
  component: HeaderSearchBoxGame,
} as Meta<typeof HeaderSearchBoxGame>;

// Mock game data
const mockGame = {
  title: "The Legend of Zelda: Breath of the Wild",
  imgUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.webp",
  releaseDate: "2017-03-03",
};

const Template: StoryFn<typeof HeaderSearchBoxGame> = (args) => (
  <div className="w-96">
    <HeaderSearchBoxGame {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: mockGame.title,
  imgUrl: mockGame.imgUrl,
  releaseDate: mockGame.releaseDate,
  onClick: () => alert(`Clicked: ${mockGame.title}`),
};

// Optional: story without an image or release date
export const NoImageOrDate = Template.bind({});
NoImageOrDate.args = {
  title: "Mystery Game",
  onClick: () => alert("Clicked: Mystery Game"),
};
