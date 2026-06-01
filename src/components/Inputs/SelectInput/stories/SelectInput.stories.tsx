import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiSearch } from "react-icons/fi";
import SelectInput from "../SelectInput.component.tsx";

const meta: Meta<typeof SelectInput> = {
  title: "Inputs/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectInput>;

const baseOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SelectInput
        options={baseOptions}
        value={value}
        onChange={setValue}
        label="Default Select"
        placeholder="Choose an option"
        className="max-w-md"
      />
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SelectInput
        options={baseOptions}
        value={value}
        onChange={setValue}
        Icon={<FiSearch />}
        label="Search Select"
        placeholder="Search..."
        className="max-w-md"
      />
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("2");
    return (
      <SelectInput
        options={baseOptions}
        value={value}
        onChange={setValue}
        label="Disabled Select"
        disabled
        className="max-w-md"
      />
    );
  },
};

export const WithErrorRequired: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SelectInput
        options={baseOptions}
        value={value}
        onChange={setValue}
        label="Category"
        placeholder="Select a category"
        error={"This field is required"}
        required
        className="max-w-md"
      />
    );
  },
};
