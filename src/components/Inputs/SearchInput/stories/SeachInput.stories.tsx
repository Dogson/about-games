import { useState } from "react";
import SearchInput, {
  type SearchInputProps,
} from "../SearchInput.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Inputs/SearchInput",
  component: SearchInput,
  argTypes: {
    placeholder: { control: "text" },
    isLoading: { control: "boolean" },
  },
} as Meta<typeof SearchInput>;

const Template: StoryFn<SearchInputProps> = (args) => {
  const [searchText, setSearchText] = useState(args.searchText || "");

  return (
    <SearchInput
      {...args}
      searchText={searchText}
      onSearch={setSearchText}
      onClear={() => setSearchText("")}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search something...",
  searchText: "Hello",
  isLoading: false,
};

export const Empty = Template.bind({});
Empty.args = {
  placeholder: "Start typing...",
  searchText: "",
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  placeholder: "Loading...",
  searchText: "Typing...",
  isLoading: true,
};
