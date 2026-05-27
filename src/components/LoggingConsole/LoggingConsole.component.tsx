import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

export type LogEvent = {
  level: "log" | "error" | "warn" | "debug";
  message: string;
  context?: string;
  timestamp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trace?: string | Error | Record<string, any>;
};

export type LoggingConsoleProps = {
  logs: LogEvent[];
  maxHeight?: number;
};

const levelStyles: Record<LogEvent["level"], string> = {
  log: "text-ghost",
  debug: "text-corn",
  warn: "text-yellow-400",
  error: "text-red-400",
};

const formatTrace = (trace: LogEvent["trace"]) => {
  if (!trace) return null;

  if (trace instanceof Error) {
    return trace.stack || trace.message;
  }

  if (typeof trace === "string") return trace;

  try {
    return JSON.stringify(trace, null, 2);
  } catch {
    return String(trace);
  }
};

const LoggingConsole: React.FC<LoggingConsoleProps> = ({
  logs,
  maxHeight = 400,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;

    const threshold = 50;
    return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  // 1. initial load → always scroll to bottom
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, []);

  // 2. new logs → scroll only if user is already at bottom
  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [autoScroll, logs]);

  // 3. track scroll position
  const handleScroll = () => {
    const atBottom = isNearBottom();
    setAutoScroll(atBottom);
    setShowScrollButton(!atBottom);
  };

  return (
    <div
      className="relative flex flex-col rounded-xl border border-white/5
        bg-black/90 font-mono text-xs shadow-md"
      style={{ maxHeight }}
    >
      {/* header */}
      <div
        className="flex items-center justify-between border-b border-white/5
          px-3 py-2"
      >
        <div className="text-ghost text-xs opacity-60">Logging Console</div>
        <div className="text-ghost flex items-center gap-2 text-xs opacity-70">
          <div
            className="border-ghost h-3 w-3 animate-spin rounded-full border
              border-t-transparent"
          />
          <span>streaming...</span>
        </div>
      </div>

      {/* logs */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-col gap-2 overflow-y-auto p-3"
      >
        {logs.length === 0 ? (
          <div className="text-ghost opacity-40">No logs yet…</div>
        ) : (
          logs.map((log, idx) => (
            <Transition
              key={idx}
              appear
              show
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="text-ghost whitespace-nowrap opacity-40">
                    {new Date(log.timestamp).toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>

                  {log.context && (
                    <span className="text-corn opacity-60">
                      [{log.context}]
                    </span>
                  )}

                  <span className={levelStyles[log.level]}>
                    {log.level.toUpperCase()}
                  </span>

                  <span className="break-words text-white/80">
                    {log.message}
                  </span>
                </div>

                {log.trace && (
                  <pre
                    className="ml-16 rounded-md bg-white/5 p-2 text-[10px]
                      whitespace-pre-wrap text-red-300"
                  >
                    {formatTrace(log.trace)}
                  </pre>
                )}
              </div>
            </Transition>
          ))
        )}
      </div>

      {/* 3. scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={() => {
            scrollToBottom();
            setAutoScroll(true);
          }}
          className="absolute right-5 bottom-3 rounded-full bg-white/10 px-2
            py-1 text-xs text-white/70 backdrop-blur hover:bg-white/20"
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default LoggingConsole;
