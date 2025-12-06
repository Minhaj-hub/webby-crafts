import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to scroll to top of page when route changes
 * Improves user experience by preventing users from landing in the middle of a page
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
};
