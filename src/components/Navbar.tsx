import { useState, useEffect } from "react";
import { Wrench, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-glow">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">SmartTools</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("compress")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Compress
            </button>
            <button
              onClick={() => scrollToSection("convert")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Convert
            </button>
            <button
              onClick={() => scrollToSection("pdf-to-image")}
              className="text-foreground hover:text-primary transition-colors"
            >
              PDF to Image
            </button>
            <Button variant="default" size="sm">
              Go Premium
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-background border-t">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("compress")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg"
            >
              Compress
            </button>
            <button
              onClick={() => scrollToSection("convert")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg"
            >
              Convert
            </button>
            <button
              onClick={() => scrollToSection("pdf-to-image")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg"
            >
              PDF to Image
            </button>
            <div className="px-4">
              <Button variant="default" size="sm" className="w-full">
                Go Premium
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
