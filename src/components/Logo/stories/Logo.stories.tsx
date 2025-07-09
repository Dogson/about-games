import Logo, { type LogoProps } from "../Logo.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Components/Logo",
  component: Logo,
  argTypes: {
    inline: { control: "boolean" },
  },
} as Meta<typeof Logo>;

const Template: StoryFn<LogoProps> = (args) => <Logo {...args} />;

export const Block = Template.bind({});
Block.args = {
  inline: false,
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};
