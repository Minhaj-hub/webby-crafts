import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageCompressor } from "@/components/ImageCompressor";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, Clock } from "lucide-react";

const CompressImagePage = () => {
  return (
    <>
      <SEOHead 
        title="Image Compressor - Reduce JPEG, PNG, WebP File Size Online"
        description="Compress single or multiple images online for free. Reduce JPEG, PNG, WebP file sizes by up to 90% without losing quality. Batch compression support."
        keywords="image compressor, compress images, reduce file size, JPEG compressor, PNG compressor, WebP optimizer"
        canonicalUrl="https://convert-kitty.web.app/compress-image"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16">
          {/* Tool Section - Immediate Access */}
          <ImageCompressor />



          {/* Compact Features */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Compressor?</h2>
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">Lightning Fast</h3>
                  <p className="text-xs text-muted-foreground">Compress in seconds</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">100% Secure</h3>
                  <p className="text-xs text-muted-foreground">Browser processing only</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">Quality Preserved</h3>
                  <p className="text-xs text-muted-foreground">Maintains visual quality</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">No Limits</h3>
                  <p className="text-xs text-muted-foreground">Unlimited compression</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload</h3>
                    <p className="text-sm text-muted-foreground">Select your image file</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Adjust</h3>
                    <p className="text-sm text-muted-foreground">Set quality level</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download</h3>
                    <p className="text-sm text-muted-foreground">Get compressed image</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compact FAQ */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Quick FAQ</h2>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">Supported formats?</h3>
                  <p className="text-xs text-muted-foreground">JPEG, PNG, WebP, BMP, GIF, AVIF</p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">File size limit?</h3>
                  <p className="text-xs text-muted-foreground">Up to 50MB per image</p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">Compression rate?</h3>
                  <p className="text-xs text-muted-foreground">50-90% size reduction typically</p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">Privacy secure?</h3>
                  <p className="text-xs text-muted-foreground">100% browser-based processing</p>
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

export default CompressImagePage;