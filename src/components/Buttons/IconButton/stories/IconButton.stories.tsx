import IconButton, { type IconButtonProps } from "../IconButton.component.tsx";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Buttons/IconButton",
  component: IconButton,
  argTypes: {
    Icon: {
      control: false, // React components can’t be controlled via UI knobs
    },
    onClick: { action: "clicked" },
    className: { control: "text" },
    iconClassName: { control: "text" },
  },
} as Meta<typeof IconButton>;

const Template: StoryFn<IconButtonProps> = (args) => <IconButton {...args} />;

export const Trash = Template.bind({});
Trash.args = {
  Icon: FiTrash2,
};

export const Edit = Template.bind({});
Edit.args = {
  Icon: FiEdit2,
};

export const IsSmall = Template.bind({});
IsSmall.args = {
  ...Edit.args,
  isSmall: true,
};
