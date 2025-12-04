import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageConverter } from "@/components/ImageConverter";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Palette, Globe, Smartphone } from "lucide-react";

const ConvertImagePage = () => {
  const faqs = [
    {
      question: "Is this image converter free?",
      answer: "Yes, our image converter is 100% free to use. You can convert as many images as you want without any cost."
    },
    {
      question: "What formats are supported?",
      answer: "We support a wide range of formats including JPEG, PNG, WebP, GIF, BMP, and AVIF. You can convert between any of these formats."
    },
    {
      question: "Is it secure?",
      answer: "Yes, your privacy is our priority. All conversions happen locally in your browser, so your images are never uploaded to our servers."
    },
    {
      question: "Can I convert multiple files?",
      answer: "Currently, we support single file conversion to ensure the best quality, but we are working on batch conversion features."
    },
    {
      question: "Does it reduce image quality?",
      answer: "We strive to maintain the highest possible quality during conversion. However, converting from a lossless format (like PNG) to a lossy one (like JPEG) may result in some quality change."
    },
    {
      question: "Do I need to install software?",
      answer: "No, our tool is entirely web-based. You don't need to download or install any software to use it."
    }
  ];

  const howToSteps = [
    {
      name: "Upload Image",
      text: "Click to browse or drag and drop your image file into the converter."
    },
    {
      name: "Select Format",
      text: "Choose your desired output format (e.g., JPEG, PNG, WebP) from the dropdown menu."
    },
    {
      name: "Convert & Download",
      text: "Click the convert button and then download your newly formatted image instantly."
    }
  ];

  return (
    <>
      <SEOHead
        title="Free Online Image Converter — Convert JPG, PNG, WebP Instantly"
        description="Convert images online for free. Fast, secure, high-quality conversion between JPG, PNG, WebP, BMP, and GIF formats. No signup required."
        keywords="image converter, convert images, JPEG to PNG, PNG to WebP, image format converter, file format conversion, free online tool"
        canonicalUrl="https://convert-kitty.web.app/convert-image"
      />

      <SchemaMarkup
        toolName="Free Online Image Converter"
        toolDescription="A versatile, free online tool to convert images between JPEG, PNG, WebP, BMP, and GIF formats instantly. Secure browser-based processing."
        toolUrl="https://convert-kitty.web.app/convert-image"
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-hero text-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-6">
                Free Online Image Converter
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Convert between JPEG, PNG, WebP, GIF, and more image formats instantly.
                Perfect for web optimization, compatibility, and professional workflows.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="bg-white/20 text-white">20+ Formats Supported</Badge>
                <Badge className="bg-white/20 text-white">Fast Conversion</Badge>
                <Badge className="bg-white/20 text-white">No Quality Loss</Badge>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <ImageConverter />

          {/* Tool Description with Keywords */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Best Free Online Image Converter</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our **Free Online Image Converter** is the perfect tool for transforming your images into the format you need. Whether you need to convert a PNG to JPG for a website, a WebP to PNG for editing, or any other combination, we've got you covered.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We support all major image formats including **JPEG, PNG, WebP, BMP, GIF, and AVIF**. Our converter ensures that your images retain their original quality during the conversion process. Like our other tools, all processing is done **locally in your browser**, ensuring your files remain private and secure.
                </p>
                <p className="text-lg text-muted-foreground">
                  Simply upload your images, select the target format, and download your converted files in seconds. It's fast, free, and easy to use. No need to install heavy software or register for an account. Just upload, convert, and download!
                </p>
              </div>
            </div>
          </section>

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
                  {howToSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{step.name}</h3>
                      <p className="text-muted-foreground">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
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