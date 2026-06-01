import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import CheckboxGroup, {
  type CheckboxGroupProps,
} from "../CheckboxGroup.component";

export default {
  title: "Inputs/CheckboxGroup",
  component: CheckboxGroup,
} as Meta<typeof CheckboxGroup>;

const Template: StoryFn<CheckboxGroupProps> = (args) => {
  const [value, setValue] = useState<string[]>(args.value ?? []);

  return (
    <div className="max-w-md">
      <CheckboxGroup {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Select tags",
  value: [],
  options: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ],
};

export const WithSelectedValues = Template.bind({});
WithSelectedValues.args = {
  label: "Frameworks",
  value: ["react", "vue"],
  options: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ],
};
