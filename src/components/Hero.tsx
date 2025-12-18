import { FileImage, RefreshCw, FileText, Images, ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Hero = () => {
  const tools = [
    {
      icon: FileImage,
      title: "Image Compressor",
      description: "Reduce file sizes by up to 90% without visible quality loss",
      path: "/compress-image",
      action: "Compress"
    },
    {
      icon: RefreshCw,
      title: "Image Converter",
      description: "Convert between JPG, PNG, WebP and more formats",
      path: "/convert-image",
      action: "Convert"
    },
    {
      icon: FileText,
      title: "PDF to Images",
      description: "Extract and save every page as high-quality images",
      path: "/pdf-to-image",
      action: "Extract"
    },
    {
      icon: Images,
      title: "Images to PDF",
      description: "Combine multiple images into a single PDF document",
      path: "/image-to-pdf",
      action: "Create PDF"
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)] bg-[length:60px_60px]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Main Content */}
          <div className="text-center mb-16">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                100% Browser-Based • No Server Uploads
              </span>
            </div> */}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transform Files
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Instantly & Securely
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Professional-grade image compression, format conversion, and PDF tools.
              <span className="block mt-2 font-semibold text-gray-700 dark:text-gray-300">
                All processing happens locally in your browser—maximum privacy guaranteed.
              </span>
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Lightning Fast</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Works Offline</span>
              </div> */}
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="font-medium">100% Free</span>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Choose Your Tool
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Card
                    key={index}
                    className="group relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/50 dark:group-hover:to-indigo-900/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg mb-6">
                        <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500" />
                      </div>

                      {/* Content - grows to fill space */}
                      <div className="flex-1 space-y-3 mb-6">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
                          {tool.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      {/* Button - always at bottom */}
                      <Button
                        className="w-full bg-gradient-hero hover:opacity-90 text-white shadow-glow hover:shadow-xl transition-all duration-300 rounded-xl font-semibold py-3 group-hover:scale-105 mt-auto"
                        onClick={() => window.location.href = tool.path}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {tool.action}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full border-2 border-white dark:border-gray-800" />
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full border-2 border-white dark:border-gray-800" />
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-2 border-white dark:border-gray-800" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Trusted by thousands of users
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Process files with complete privacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};