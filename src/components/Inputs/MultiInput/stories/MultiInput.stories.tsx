import { useState } from "react";
import MultiInput, { type MultiInputProps } from "../MultiInput.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Inputs/MultiInput",
  component: MultiInput,
} as Meta<typeof MultiInput>;

const Template: StoryFn<MultiInputProps> = (args) => {
  const [value, setValue] = useState<string[]>(args.value ?? []);

  const handleAddInput = () => {
    setValue((prev) => [...prev, ""]);
  };

  const handleRemoveInput = (index: number) => {
    setValue((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md">
      <MultiInput
        {...args}
        value={value}
        onChange={setValue}
        onAddInput={handleAddInput}
        onRemoveInput={handleRemoveInput}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: [""],
  errors: undefined,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  value: ["Item 1", "Item 2"],
  label: "Tags",
  errors: undefined,
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  value: ["Valid", ""],
  label: "Keywords",
  errors: [null, "This field is required"],
};
