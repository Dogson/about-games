import type { Meta } from "@storybook/react-vite";
import GameListForVideo, {
  type GameListForVideoProps,
} from "../GameListForVideo.component";
import mockGames from "../../../mocks/games.mocks.json";

export default {
  title: "Components/GameListForVideo",
  component: GameListForVideo,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof GameListForVideo>;

// Custom wrapper for fixed width
const renderInContainer = (args: GameListForVideoProps) => (
  <div className="w-[400px]">
    <GameListForVideo {...args} />
  </div>
);

export const Default = {
  args: {
    games: mockGames.slice(0, 4),
  },
  render: renderInContainer,
};

export const ManyGames = {
  args: {
    games: mockGames.slice(22),
  },
  render: renderInContainer,
};
