import LanguageFlag from "../LanguageFlag.component";
import type { Meta, StoryFn } from "@storybook/react-vite";

type LanguageFlagProps = React.ComponentProps<typeof LanguageFlag>;

export default {
  title: "Common/LanguageFlag",
  component: LanguageFlag,
  argTypes: {
    language: { control: "text" },
    withLabel: { control: "boolean" },
  },
} as Meta<typeof LanguageFlag>;

const Template: StoryFn<LanguageFlagProps> = (args) => (
  <LanguageFlag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  language: "en-US",
  withLabel: false,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  language: "en-US",
  withLabel: true,
};

export const French = Template.bind({});
French.args = {
  language: "fr-FR",
  withLabel: true,
};

export const Spanish = Template.bind({});
Spanish.args = {
  language: "es-ES",
  withLabel: true,
};
