import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Wrench, Shield, Zap, Heart } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Convert Kit - Free Image Compression & PDF Tools"
        description="Learn about Convert Kit, a privacy-focused online tool for compressing images, converting file formats, and working with PDFs without compromising your data security."
        keywords="about convert kit, image compression, file conversion, PDF tools, privacy focused, online tools"
        canonicalUrl="https://convertkit.web.app/about"
      />
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">About Convert Kitty</h1>
          
          <div className="space-y-8">
            <section className="text-center">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Convert Kitty is a free, privacy-focused online tool that helps you compress images, convert file formats, and work with PDFs—all without compromising your data security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that file conversion and compression should be simple, fast, and secure. That's why we created Convert Kitty—a platform that processes everything locally in your browser, ensuring your files never leave your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Why Choose Convert Kitty?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-md">
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">100% Private</h3>
                  <p className="text-muted-foreground">All processing happens in your browser. Your files never touch our servers.</p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-md">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">No upload/download delays. Process files instantly on your device.</p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-md">
                  <Wrench className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Professional Tools</h3>
                  <p className="text-muted-foreground">High-quality compression and conversion algorithms for best results.</p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-md">
                  <Heart className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Always Free</h3>
                  <p className="text-muted-foreground">No subscriptions, no hidden fees. Use all features completely free.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Tools</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground">Image Compressor</h3>
                  <p className="text-muted-foreground">Reduce image file sizes while maintaining quality. Perfect for web optimization.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Image Converter</h3>
                  <p className="text-muted-foreground">Convert between popular image formats like JPEG, PNG, WebP, and more.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Image to PDF</h3>
                  <p className="text-muted-foreground">Combine multiple images into a single PDF document.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">PDF to Image</h3>
                  <p className="text-muted-foreground">Extract pages from PDF files as high-quality images.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to providing reliable, secure, and user-friendly tools that respect your privacy. Convert Kitty will always be free to use, with no registration required. We continuously improve our tools based on user feedback and the latest web technologies.
              </p>
            </section>

            <section className="text-center bg-card p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Get Started Today</h2>
              <p className="text-muted-foreground mb-4">
                Ready to transform your files? Start using Convert Kitty now—no sign-up required.
              </p>
              <a href="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Try Our Tools
              </a>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;