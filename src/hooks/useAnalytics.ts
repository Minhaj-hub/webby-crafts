import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export const useAnalytics = () => {
  const logEventFn = (eventName: string, eventParams?: { [key: string]: any }) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  const logPageView = (pagePath: string) => {
    if (analytics) {
      logEvent(analytics, "page_view", { page_path: pagePath });
    }
  };

  const logFileConversion = (fileType: string, fileSize: number) => {
    if (analytics) {
      logEvent(analytics, "file_conversion", {
        file_type: fileType,
        file_size: fileSize,
        timestamp: new Date().toISOString()
      });
    }
  };

  const logToolUsage = (toolName: string) => {
    if (analytics) {
      logEvent(analytics, "tool_usage", {
        tool_name: toolName,
        timestamp: new Date().toISOString()
      });
    }
  };

  return {
    logEvent: logEventFn,
    logPageView,
    logFileConversion,
    logToolUsage
  };
};