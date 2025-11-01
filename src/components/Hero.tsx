import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
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
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Smart, Fast & Secure</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Transform Your Files
            <span className="block text-transparent bg-clip-text bg-gradient-hero">
              In Seconds
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade image compression, format conversion, and PDF tools. 
            All processing happens in your browser—your files never leave your device.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("compress")}
              className="shadow-glow"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("convert")}
            >
              Explore Tools
            </Button>
          </div>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Private & Secure</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">Fast</div>
              <div className="text-sm text-muted-foreground">Instant Processing</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">Free</div>
              <div className="text-sm text-muted-foreground">No Sign-up Needed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
