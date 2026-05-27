export type LogEvent = {
  level: "log" | "error" | "warn" | "debug";
  message: string;
  context?: string;
  timestamp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trace?: string | Error | Record<string, any>;
};
