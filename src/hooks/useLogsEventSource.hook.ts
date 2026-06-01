import { useContext, useEffect, useState } from "react";
import ApiConfig from "../config/api.config";
import type { LogEvent } from "../data-access/logging/logging.model";
import getLastLogs from "../data-access/logging/getLastLogs";
import { AuthContext } from "../contexts/auth/AuthContext";

type UseLogsEventSource = {
  logs: LogEvent[];
};

const useLogsEventSource = (): UseLogsEventSource => {
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [hasFetchedLastLogs, setHasFetchedLastLogs] = useState(false);
  const { authInfos } = useContext(AuthContext);

  const fetchLastLogs = async () => {
    try {
      setLogs(await getLastLogs());
    } catch (e) {
      console.error(e);
    }
    setHasFetchedLastLogs(true);
  };

  useEffect(() => {
    fetchLastLogs();
  }, []);

  useEffect(() => {
    if (!hasFetchedLastLogs) return;
    console.log("opening logs event source");
    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}${ApiConfig.routes.logs.stream}?token=${authInfos?.access_token}`,
    );

    es.onmessage = (event) => {
      let logEvent: LogEvent;
      try {
        logEvent = JSON.parse(event.data) as LogEvent;
      } catch (e) {
        console.error("error while parsing log", e);
        logEvent = {
          level: "log",
          message: event.data,
          timestamp: -1,
        };
      }
      setLogs((prev) => [...prev, logEvent]);
    };

    return () => {
      console.log("closing logs event source...");
      es.close();
    };
  }, [hasFetchedLastLogs]);

  return { logs };
};

export default useLogsEventSource;
