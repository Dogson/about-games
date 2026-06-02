import LoggingConsole, {
  type LoggingConsoleProps,
  type LogEvent,
} from "../LoggingConsole.component.tsx";

import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "System/LoggingConsole",
  component: LoggingConsole,
  argTypes: {
    isLoading: { control: "boolean" },
    maxHeight: { control: "number" },
  },
} as Meta<typeof LoggingConsole>;

const baseLogs: LogEvent[] = [
  {
    level: "log",
    message: "Server started successfully",
    context: "Bootstrap",
    timestamp: Date.now() - 5000,
  },
  {
    level: "warn",
    message: "Deprecated API usage detected",
    context: "ChannelService",
    timestamp: Date.now() - 4000,
  },
  {
    level: "error",
    message: "Failed to fetch YouTube data",
    context: "YoutubeService",
    timestamp: Date.now() - 3000,
    trace: {
      code: "YT_403",
      reason: "Quota exceeded",
    },
  },
  {
    level: "debug",
    message: "Retrying request #2",
    context: "HttpClient",
    timestamp: Date.now() - 2000,
  },
];

const Template: StoryFn<LoggingConsoleProps> = (args) => (
  <LoggingConsole {...args} />
);

export const Default = Template.bind({});
Default.args = {
  logs: baseLogs,
};

export const Streaming = Template.bind({});
Streaming.args = {
  logs: baseLogs,
};

export const Empty = Template.bind({});
Empty.args = {
  logs: [],
};

export const ManyLogs = Template.bind({});
ManyLogs.args = {
  logs: Array.from({ length: 50 }).map((_, i) => ({
    level: i % 3 === 0 ? "log" : i % 3 === 1 ? "warn" : "debug",
    message: `Log message #${i}`,
    context: "Stream",
    timestamp: Date.now() - i * 1000,
  })),
};
