import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import Checkbox, { type CheckboxProps } from "../Checkbox.component";

export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  return (
    <div className="max-w-md">
      <Checkbox {...args} checked={checked} onChange={setChecked} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Accept terms and conditions",
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: "Receive newsletter",
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled checkbox",
  checked: false,
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: "Disabled checked checkbox",
  checked: true,
  disabled: true,
};
