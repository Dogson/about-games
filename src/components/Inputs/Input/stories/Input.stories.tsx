import { FiSearch, FiX } from "react-icons/fi";
import Input from "../Input.component.tsx";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipLoader } from "react-spinners";

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

const ClearableInput = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={setValue}
      Icon={<FiSearch />}
      RightSlot={
        value ? (
          <button
            onClick={() => setValue("")}
            className="text-black"
            aria-label="Clear input"
          >
            <FiX size={16} />
          </button>
        ) : null
      }
      placeholder="Search and clear..."
      className="max-w-md"
    />
  );
};

const LoadingInput = () => {
  const [value, setValue] = useState("Loading...");
  return (
    <Input
      value={value}
      onChange={setValue}
      Icon={<FiSearch />}
      RightSlot={<ClipLoader size={16} color="#666" />}
      placeholder="Loading..."
      className="max-w-md"
    />
  );
};

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        value={value}
        onChange={setValue}
        placeholder="Type something..."
        className="max-w-md"
      />
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        value={value}
        onChange={setValue}
        Icon={<FiSearch />}
        placeholder="Search..."
        className="max-w-md"
      />
    );
  },
};

export const WithClearButton: Story = {
  render: () => <ClearableInput />,
};

export const WithLoadingSpinner: Story = {
  render: () => <LoadingInput />,
};

export const FullyLoaded: Story = {
  render: () => {
    const [value, setValue] = useState("Fetching...");
    return (
      <Input
        value={value}
        onChange={setValue}
        Icon={<FiSearch />}
        RightSlot={<ClipLoader size={16} color="#666" />}
        placeholder="Loading data..."
        className="max-w-md"
      />
    );
  },
};
