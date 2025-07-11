import type { Meta, StoryObj } from "@storybook/react-vite";
import MainButton from "../MainButton.component";
import { useState } from "react";

const meta: Meta<typeof MainButton> = {
  title: "Buttons/MainButton",
  component: MainButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    children: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof MainButton>;

export const Default: Story = {
  args: {
    loading: false,
    disabled: false,
    children: "Click Me",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    disabled: false,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    loading: false,
    disabled: true,
    children: "Disabled",
  },
};

export const CustomClass: Story = {
  args: {
    loading: false,
    disabled: false,
    children: "Custom Styled",
    className: "bg-red-500 text-white",
  },
};

export const InteractiveLoadingButton: Story = {
  render: (args) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <MainButton {...args} loading={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Submit"}
      </MainButton>
    );
  },
};
