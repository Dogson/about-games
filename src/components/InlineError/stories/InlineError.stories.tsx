import type { Meta } from "@storybook/react-vite";
import InlineError from "../InlineError.component.tsx";

export default {
  title: "Feedback/InlineError",
  component: InlineError,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof InlineError>;

export const WithMessage = {
  args: {
    message: "Couldn't reach the server. Check your connection and try again.",
  },
};

export const WithRetry = {
  args: {
    message: "Couldn't reach the server. Check your connection and try again.",
    onRetry: () => {},
  },
};
