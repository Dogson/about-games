import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PasswordInput, {
  type PasswordInputProps,
} from "../PasswordInput.component.tsx";

const meta: Meta<typeof PasswordInput> = {
  title: "Inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

/* ---------- Stateful wrapper for interactive demo ---------- */
const StatefulPasswordInput = (args: PasswordInputProps) => {
  const [value, setValue] = useState(args.value ?? "");
  return <PasswordInput {...args} value={value} onChange={setValue} />;
};

/* ---------- Stories ---------- */

export const Default: Story = {
  render: (args: PasswordInputProps) => <StatefulPasswordInput {...args} />,
  args: {
    placeholder: "Enter your password",
    value: "",
  },
};

export const WithInitialValue: Story = {
  render: (args: PasswordInputProps) => <StatefulPasswordInput {...args} />,
  args: {
    placeholder: "Enter your password",
    value: "mypassword123",
  },
};

export const OnFocusDemo: Story = {
  render: (args: PasswordInputProps) => <StatefulPasswordInput {...args} />,
  args: {
    placeholder: "Focus me!",
    value: "",
    onFocus: () => console.log("Input focused"),
  },
};

export const Playground: Story = {
  render: (args: PasswordInputProps) => <StatefulPasswordInput {...args} />,
  args: {
    placeholder: "Type your password",
    value: "",
  },
};
