import { useState, useEffect } from "react";
import { Wrench, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { APP_CONFIG } from "@/config/app.config";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
        : "bg-transparent"
        }`}
    >


      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavigation('/')}>
            <img 
              src="/convert-kit.png" 
              alt="Convert Kit Logo"
              className="h-10 w-10 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{APP_CONFIG.siteName}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">File Processing Tools</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => handleNavigation("/")}
              className={`px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/compress-image")}
              className={`px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/compress-image" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Image Compressor
            </button>
            <button
              onClick={() => handleNavigation("/convert-image")}
              className={`px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/convert-image" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Image Converter
            </button>
            <button
              onClick={() => handleNavigation("/pdf-to-image")}
              className={`px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/pdf-to-image" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              PDF to Images
            </button>
            <button
              onClick={() => handleNavigation("/image-to-pdf")}
              className={`px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/image-to-pdf" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Images to PDF
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20">
            <button
              onClick={() => handleNavigation("/")}
              className={`block w-full text-left px-6 py-3 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/compress-image")}
              className={`block w-full text-left px-6 py-3 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/compress-image" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Image Compressor
            </button>
            <button
              onClick={() => handleNavigation("/convert-image")}
              className={`block w-full text-left px-6 py-3 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/convert-image" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Image Converter
            </button>
            <button
              onClick={() => handleNavigation("/pdf-to-image")}
              className={`block w-full text-left px-6 py-3 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/pdf-to-image" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              PDF to Images
            </button>
            <button
              onClick={() => handleNavigation("/image-to-pdf")}
              className={`block w-full text-left px-6 py-3 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium ${location.pathname === "/image-to-pdf" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" : "text-gray-700 dark:text-gray-300"
                }`}
            >
              Images to PDF
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};