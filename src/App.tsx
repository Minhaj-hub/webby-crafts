import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Blog from "./pages/Blog";
import Tutorials from "./pages/Tutorials";
import CompressImagePage from "./pages/CompressImagePage";
import ConvertImagePage from "./pages/ConvertImagePage";
import PdfToImagePage from "./pages/PdfToImagePage";
import ImageToPdfPage from "./pages/ImageToPdfPage";
import CompressionResultsPage from "./pages/CompressionResultsPage";
import ImageConversionPage from "./pages/ImageConversionPage";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAnalytics } from "@/hooks/useAnalytics";

const queryClient = new QueryClient();

// Component to track page views with Firebase Analytics
const AnalyticsTracker = () => {
  const location = useLocation();
  const { logPageView } = useAnalytics();

  useEffect(() => {
    // Log page view on route change
    const pageTitle = document.title;
    logPageView(location.pathname + location.search, pageTitle);
  }, [location, logPageView]);

  return null;
};

// Component to scroll to top on route changes
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compress-image" element={<CompressImagePage />} />
          <Route path="/compression-results" element={<CompressionResultsPage />} />
          <Route path="/convert-image" element={<ConvertImagePage />} />
          {/* Dynamic conversion pages - all use the same template */}
          {/* PNG conversions */}
          <Route path="/png-to-jpg" element={<ImageConversionPage />} />
          <Route path="/png-to-webp" element={<ImageConversionPage />} />
          <Route path="/png-to-gif" element={<ImageConversionPage />} />
          <Route path="/png-to-bmp" element={<ImageConversionPage />} />
          {/* JPG conversions */}
          <Route path="/jpg-to-png" element={<ImageConversionPage />} />
          <Route path="/jpg-to-webp" element={<ImageConversionPage />} />
          <Route path="/jpg-to-gif" element={<ImageConversionPage />} />
          <Route path="/jpg-to-bmp" element={<ImageConversionPage />} />
          {/* WebP conversions */}
          <Route path="/webp-to-png" element={<ImageConversionPage />} />
          <Route path="/webp-to-jpg" element={<ImageConversionPage />} />
          <Route path="/webp-to-gif" element={<ImageConversionPage />} />
          {/* GIF conversions */}
          <Route path="/gif-to-png" element={<ImageConversionPage />} />
          <Route path="/gif-to-jpg" element={<ImageConversionPage />} />
          <Route path="/gif-to-webp" element={<ImageConversionPage />} />
          {/* BMP conversions */}
          <Route path="/bmp-to-png" element={<ImageConversionPage />} />
          <Route path="/bmp-to-jpg" element={<ImageConversionPage />} />
          <Route path="/bmp-to-webp" element={<ImageConversionPage />} />
          <Route path="/pdf-to-image" element={<PdfToImagePage />} />
          <Route path="/image-to-pdf" element={<ImageToPdfPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tutorials" element={<Tutorials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;