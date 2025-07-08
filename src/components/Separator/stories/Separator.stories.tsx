import type { Meta, StoryFn } from "@storybook/react-vite";
import { Separator, type SeparatorProps } from "../Separator.component.tsx";

export default {
  title: "Components/Separator",
  component: Separator,
  argTypes: {
    bulletSize: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
  },
} as Meta<typeof Separator>;

const Template: StoryFn<SeparatorProps> = (args) => {
  const wrapperClass =
    args.direction === "horizontal" ? "w-full max-w-md" : "h-64";

  return (
    <div className={wrapperClass}>
      <Separator {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  bulletSize: "md",
  direction: "horizontal",
};

export const VerticalLg = Template.bind({});
VerticalLg.args = {
  bulletSize: "lg",
  direction: "vertical",
};

export const HorizontalSm = Template.bind({});
HorizontalSm.args = {
  bulletSize: "sm",
  direction: "horizontal",
};
