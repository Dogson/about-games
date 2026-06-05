import type { Meta, StoryObj } from "@storybook/react-vite";
import SmartLink, { type SmartLinkProps } from "../SmartLink.component.tsx";

const meta: Meta<typeof SmartLink> = {
  title: "Navigation/SmartLink",
  component: SmartLink,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SmartLink>;

/* ---------- Helper wrapper for interactive demo ---------- */
const StatefulSmartLink = (args: SmartLinkProps) => {
  return <SmartLink {...args} />;
};

/* ---------- Stories ---------- */

export const Internal: Story = {
  render: (args: SmartLinkProps) => <StatefulSmartLink {...args} />,
  args: {
    to: "/dashboard",
    className: "text-blue-500 underline",
    children: "Go to dashboard",
  },
};

export const External: Story = {
  render: (args: SmartLinkProps) => <StatefulSmartLink {...args} />,
  args: {
    to: "https://youtube.com",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-red-500 underline",
    children: "Open YouTube",
  },
};

export const Playground: Story = {
  render: (args: SmartLinkProps) => <StatefulSmartLink {...args} />,
  args: {
    to: "/profile",
    className: "text-ghost flex items-center gap-2",
    children: (
      <>
        <img
          src="https://via.placeholder.com/32"
          className="h-8 w-8 rounded-full"
        />
        <span>Profile link</span>
      </>
    ),
  },
};
