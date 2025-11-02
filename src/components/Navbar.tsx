import { useState, useEffect } from "react";
import { Wrench, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

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

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      // If on home page, scroll directly
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const goHome = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
    >

      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={goHome}>
            <div className="w-12 h-12 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Convert Kitty</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection("home")}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("compress")}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              Compress
            </button>
            <button
              onClick={() => scrollToSection("convert")}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              Convert
            </button>
            <button
              onClick={() => scrollToSection("pdf-to-image")}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              PDF Tools
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
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("compress")}
              className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              Compress
            </button>
            <button
              onClick={() => scrollToSection("convert")}
              className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              Convert
            </button>
            <button
              onClick={() => scrollToSection("pdf-to-image")}
              className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 font-medium"
            >
              PDF Tools
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};