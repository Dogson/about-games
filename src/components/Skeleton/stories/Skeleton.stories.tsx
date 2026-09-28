import Skeleton, { type SkeletonProps } from "../Skeleton.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "UI/Skeleton",
  component: Skeleton,
} as Meta<typeof Skeleton>;

const Template: StoryFn<SkeletonProps> = (args) => (
  <div className="flex w-full max-w-[400px] flex-col gap-3">
    <Skeleton {...args} />
    <Skeleton {...args} />
    <Skeleton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  className: "h-4 w-full rounded-lg",
};

export const Box = Template.bind({});
Box.args = {
  className: "h-52 w-39 rounded-xl",
};

export const VideoThumbnail = Template.bind({});
VideoThumbnail.args = {
  className: "aspect-video w-full rounded-lg",
};

export const Circle = Template.bind({});
Circle.args = {
  className: "h-8 w-8 rounded-full",
};

export const Light = Template.bind({});
Light.args = {
  className: "h-40 w-full rounded-lg",
  light: true,
};
