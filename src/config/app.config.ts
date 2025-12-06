/**
 * Application Configuration
 * Centralized place for app-wide constants and settings
 */

export const APP_CONFIG = {
  // Site/App Name
  siteName: "Convert Kit",
  siteDescription: "Free, fast & secure file conversion tools. Convert images, compress files, and process PDFs locally - no uploads to servers.",
  
  // Domain Configuration
  domain: "https://convertkit.web.app",
  
  // URLs and Links
  siteUrl: typeof window !== "undefined" ? window.location.origin : "",
  
  // Feature Flags
  features: {
    sharing: true,
    analytics: true,
    darkMode: true,
  },

  // Default Tool Names
  tools: {
    imageConverter: "Image Converter",
    imageCompressor: "Image Compressor",
    imageToPdf: "Image to PDF",
    pdfToImage: "PDF to Image",
  },
};

// Helper function to get site name with fallback
export const getSiteName = (): string => APP_CONFIG.siteName;

// Helper function to get site description
export const getSiteDescription = (): string => APP_CONFIG.siteDescription;

// Helper function to get canonical domain
export const getCanonicalUrl = (path: string = ""): string => {
  return `${APP_CONFIG.domain}${path}`;
};
