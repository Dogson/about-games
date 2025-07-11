import { useState } from "react";
import GameGrid, { type GameGridProps } from "../GameGrid.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type { Game } from "../../../models/Game.model.ts";
import mockGames from "../../../mocks/games.mocks.json";

export default {
  title: "Game/GameGrid",
  component: GameGrid,
  argTypes: {},
} as Meta<typeof GameGrid>;

const Template: StoryFn<GameGridProps> = (args) => {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="h-[500px] w-[500px]">
      <GameGrid
        {...args}
        onGameClick={(game) => {
          setClicked(game.title);
        }}
      />
      {clicked && (
        <p className="mt-4 text-sm text-gray-600">
          Last clicked game: <strong>{clicked}</strong>
        </p>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  games: mockGames as Game[],
};
