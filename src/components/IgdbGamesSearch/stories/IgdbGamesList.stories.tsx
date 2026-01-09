import type { Meta, StoryFn } from "@storybook/react-vite";
import IgdbGameSearch, {
  type IgdbGameSearchProps,
} from "../IgdbGamesSearch.component.tsx";

export default {
  title: "Game/IgdbGamesList",
  component: IgdbGameSearch,
} as Meta<typeof IgdbGameSearch>;

const mockGames = [
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    release_dates: [{ date: 1432147200 }], // 2015
    involved_companies: [{ company: { id: 1, name: "CD Projekt Red" } }],
    cover: { url: "https://via.placeholder.com/90x120" },
    screenshots: [{ url: "https://via.placeholder.com/320x180" }],
    total_rating_count: 12000,
  },
  {
    id: 2,
    name: "Hollow Knight",
    release_dates: [{ date: 1488326400 }], // 2017
    involved_companies: [{ company: { id: 2, name: "Team Cherry" } }],
    cover: { url: "https://via.placeholder.com/90x120" },
    screenshots: [],
    total_rating_count: 8000,
  },
  {
    id: 3,
    name: "Untitled Goose Game",
    release_dates: [], // no release date
    involved_companies: [{ company: { id: 3, name: "House House" } }],
    cover: { url: "https://via.placeholder.com/90x120" },
    screenshots: [],
    total_rating_count: 3000,
  },
  {
    id: 4,
    name: "The Incredibly Long and Overly Complicated Title of This Video Game That Probably Should Have Been Shorter",
    release_dates: [{ date: 1609459200 }], // 2021
    involved_companies: [{ company: { id: 4, name: "Mock Studio" } }],
    cover: { url: "https://via.placeholder.com/90x120" },
    screenshots: [],
    total_rating_count: 100,
  },
  {
    id: 5,
    name: "Mystery Game Without a Date",
    // release_dates is undefined
    involved_companies: [{ company: { id: 5, name: "Unknown Devs" } }],
    cover: { url: "https://via.placeholder.com/90x120" },
    screenshots: [],
    total_rating_count: 50,
  },
] satisfies IgdbGameSearchProps["games"];

const Template: StoryFn<typeof IgdbGameSearch> = (args) => (
  <div className="w-96">
    <IgdbGameSearch {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  games: mockGames,
  gamesSelected: [],
  onSelectGame: (game) => alert(`Selected: ${game.title}`),
};

export const WithOneSelected = Template.bind({});
WithOneSelected.args = {
  games: mockGames,
  gamesSelected: [
    {
      id: 10,
      igdbId: 1,
      title: "The Witcher 3: Wild Hunt",
      releaseDate: "2015-05-21T00:00:00.000Z",
      companies: ["CD Projekt Red"],
      coverImg: "https://via.placeholder.com/90x120",
      boxartImg: "https://via.placeholder.com/320x180",
    },
  ],
  onSelectGame: (game) => alert(`Selected: ${game.title}`),
};
