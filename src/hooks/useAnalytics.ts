import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export const useAnalytics = () => {
  const logEventFn = (eventName: string, eventParams?: { [key: string]: any }) => {
    try {
      if (analytics) {
        logEvent(analytics, eventName, eventParams);
      }
    } catch (error) {
      console.warn(`Analytics event logging failed for ${eventName}:`, error);
    }
  };

  const logPageView = (pagePath: string, pageTitle?: string) => {
    try {
      if (analytics) {
        logEvent(analytics, "page_view", { 
          page_path: pagePath,
          page_title: pageTitle || document.title,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.warn("Page view tracking failed:", error);
    }
  };

  const logFileConversion = (fileType: string, fileSize: number, sourceFormat?: string, targetFormat?: string) => {
    try {
      if (analytics) {
        logEvent(analytics, "file_conversion", {
          file_type: fileType,
          file_size: fileSize,
          source_format: sourceFormat,
          target_format: targetFormat,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.warn("File conversion tracking failed:", error);
    }
  };

  const logToolUsage = (toolName: string, details?: { [key: string]: any }) => {
    try {
      if (analytics) {
        logEvent(analytics, "tool_usage", {
          tool_name: toolName,
          timestamp: new Date().toISOString(),
          ...details
        });
      }
    } catch (error) {
      console.warn(`Tool usage tracking failed for ${toolName}:`, error);
    }
  };

  const logDownload = (fileName: string, fileType: string, fileSize: number) => {
    try {
      if (analytics) {
        logEvent(analytics, "file_download", {
          file_name: fileName,
          file_type: fileType,
          file_size: fileSize,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.warn("Download tracking failed:", error);
    }
  };

  const logFeatureUsage = (featureName: string, metadata?: { [key: string]: any }) => {
    try {
      if (analytics) {
        logEvent(analytics, "feature_usage", {
          feature_name: featureName,
          timestamp: new Date().toISOString(),
          ...metadata
        });
      }
    } catch (error) {
      console.warn(`Feature usage tracking failed for ${featureName}:`, error);
    }
  };

  return {
    logEvent: logEventFn,
    logPageView,
    logFileConversion,
    logToolUsage,
    logDownload,
    logFeatureUsage
  };
};