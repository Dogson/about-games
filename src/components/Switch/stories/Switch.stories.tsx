import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch, { type SwitchProps } from "../Switch.component.tsx";

const meta: Meta<typeof Switch> = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

/* ---------- Helper wrapper for interactive demo ---------- */
const StatefulSwitch = (args: SwitchProps) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <Switch {...args} checked={checked} onChange={setChecked} />;
};

/* ---------- Stories ---------- */

export const Default: Story = {
  render: (args: SwitchProps) => <StatefulSwitch {...args} />,
  args: {
    label: "Activer",
    checked: false,
  },
};

export const Checked: Story = {
  render: (args: SwitchProps) => <StatefulSwitch {...args} />,
  args: {
    label: "Actif",
    checked: true,
  },
};

export const Danger: Story = {
  render: (args: SwitchProps) => <StatefulSwitch {...args} />,
  args: {
    label: "Mode dangereux",
    checked: true,
    danger: true,
  },
};

export const Disabled: Story = {
  render: (args: SwitchProps) => <StatefulSwitch {...args} />,
  args: {
    label: "Désactivé",
    checked: false,
    disabled: true,
  },
};

export const Playground: Story = {
  render: (args: SwitchProps) => <StatefulSwitch {...args} />,
  args: {
    label: "Switch interactif",
    checked: false,
  },
};
