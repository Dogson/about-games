import type { Meta, StoryObj } from "@storybook/react-vite";
import SecondaryButton from "../SecondaryButton.component";
import { LuRefreshCw } from "react-icons/lu";

const meta: Meta<typeof SecondaryButton> = {
  title: "Buttons/SecondaryButton",
  component: SecondaryButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    className: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const Default: Story = {
  args: {
    disabled: false,
    children: "Secondary action",
  },
};

export const WithIcon: Story = {
  args: {
    disabled: false,
    children: "Refresh",
    Icon: LuRefreshCw,
  },
};

export const Loading: Story = {
  args: {
    disabled: false,
    loading: true,
    children: "Loading action",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled action",
  },
};

export const CustomClass: Story = {
  args: {
    disabled: false,
    children: "Custom styled action",
    className: "text-white hover:text-white",
  },
};
