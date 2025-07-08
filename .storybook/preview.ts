import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";
import initI18n from "../src/i18n/i18n";

initI18n();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
