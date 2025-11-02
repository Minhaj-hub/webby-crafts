import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageConverter } from "@/components/ImageConverter";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Palette, Globe, Smartphone } from "lucide-react";

const ConvertImagePage = () => {
  return (
    <>
      <SEOHead 
        title="Free Image Converter - Convert JPEG, PNG, WebP, GIF Online"
        description="Convert images between formats online for free. JPEG to PNG, PNG to WebP, GIF to JPEG and more. Fast, secure image format conversion in your browser."
        keywords="image converter, convert images, JPEG to PNG, PNG to WebP, image format converter, file format conversion"
        canonicalUrl="https://convert-kitty.web.app/convert-image"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-hero text-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-6">
                Free Online Image Format Converter
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Convert between JPEG, PNG, WebP, GIF, and more image formats instantly. 
                Perfect for web optimization, compatibility, and professional workflows.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="bg-white/20 text-white">20+ Formats Supported</Badge>
                <Badge className="bg-white/20 text-white">Batch Conversion</Badge>
                <Badge className="bg-white/20 text-white">No Quality Loss</Badge>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <ImageConverter />

          {/* Features Section */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Convert Image Formats?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Web Optimization</h3>
                  <p className="text-sm text-muted-foreground">Convert to WebP for faster loading websites and better SEO</p>
                </Card>
                <Card className="p-6 text-center">
                  <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Device Compatibility</h3>
                  <p className="text-sm text-muted-foreground">Ensure your images work across all devices and platforms</p>
                </Card>
                <Card className="p-6 text-center">
                  <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Transparency Support</h3>
                  <p className="text-sm text-muted-foreground">Convert to PNG for transparent backgrounds and graphics</p>
                </Card>
                <Card className="p-6 text-center">
                  <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Format Migration</h3>
                  <p className="text-sm text-muted-foreground">Modernize your image library with newer, efficient formats</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Supported Formats */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Supported Image Formats</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Input Formats</h3>
                    <div className="flex flex-wrap gap-2">
                      {['JPEG', 'PNG', 'WebP', 'GIF', 'BMP', 'TIFF', 'SVG', 'ICO'].map(format => (
                        <Badge key={format} variant="outline">{format}</Badge>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Output Formats</h3>
                    <div className="flex flex-wrap gap-2">
                      {['JPEG', 'PNG', 'WebP', 'GIF', 'BMP'].map(format => (
                        <Badge key={format} variant="outline">{format}</Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How to Convert Images</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload Images</h3>
                    <p className="text-muted-foreground">Select one or multiple images in any supported format</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Choose Format</h3>
                    <p className="text-muted-foreground">Select your desired output format from the dropdown</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download</h3>
                    <p className="text-muted-foreground">Get your converted images instantly in the new format</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Which format should I choose for my website?</h3>
                  <p className="text-muted-foreground">WebP offers the best compression for web use. PNG is ideal for images with transparency, while JPEG works best for photographs.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Will converting reduce image quality?</h3>
                  <p className="text-muted-foreground">Converting from lossless to lossy formats may reduce quality. We use optimal settings to maintain the best possible quality during conversion.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Can I convert multiple images at once?</h3>
                  <p className="text-muted-foreground">Yes! Our batch conversion feature allows you to convert multiple images simultaneously, saving you time.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">What's the difference between JPEG and PNG?</h3>
                  <p className="text-muted-foreground">JPEG is best for photos with smaller file sizes, while PNG supports transparency and is ideal for graphics and logos.</p>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ConvertImagePage;