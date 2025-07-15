import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiSearch } from "react-icons/fi";
import Input from "../Input.component.tsx";

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        value={value}
        onChange={setValue}
        label="Default Input"
        placeholder="Type something..."
        className="max-w-md"
      />
    );
  },
};

export const WithLoader: Story = {
  render: () => {
    const [value, setValue] = useState("Loading...");
    return (
      <Input
        value={value}
        onChange={setValue}
        Icon={<FiSearch />}
        label="Loading Input"
        placeholder="Loading..."
        loading
        className="max-w-md"
      />
    );
  },
};

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState("Search term");
    return (
      <Input
        value={value}
        onChange={setValue}
        Icon={<FiSearch />}
        label="Clearable Input"
        placeholder="Search and clear..."
        clearable
        className="max-w-md"
      />
    );
  },
};

export const WithErrorRequired: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        value={value}
        onChange={setValue}
        label="Username"
        placeholder="Enter your username"
        error="This field is required"
        required
        className="max-w-md"
      />
    );
  },
};
