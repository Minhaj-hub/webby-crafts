import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageCompressor } from "@/components/ImageCompressor";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import { getCanonicalUrl } from "@/config/app.config";

const CompressImagePage = () => {
  const faqs = [
    {
      question: "Is this image compressor free?",
      answer: "Yes, our image compressor is 100% free to use. There are no hidden charges, subscriptions, or limits on the number of images you can process."
    },
    {
      question: "Does it reduce quality?",
      answer: "Our tool uses advanced algorithms to reduce file size while maintaining the highest possible visual quality. You can also manually adjust the compression level to find the perfect balance for your needs."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We prioritize your privacy by processing all images locally within your browser. Your files are never uploaded to our servers, ensuring complete security."
    },
    {
      question: "Does it work on mobile?",
      answer: "Yes, our tool is fully responsive and works seamlessly on all devices, including smartphones (iOS and Android) and tablets."
    },
    {
      question: "What formats are supported?",
      answer: "We support a wide range of image formats including JPG, JPEG, PNG, WebP, BMP, GIF, and AVIF."
    },
    {
      question: "Is there a file size limit?",
      answer: "You can upload and compress images up to 50MB each, which covers most high-resolution photos and graphics."
    }
  ];

  const howToSteps = [
    {
      name: "Upload Images",
      text: "Drag and drop your image files into the upload zone or click to select them from your device."
    },
    {
      name: "Adjust Settings",
      text: "Use the quality slider to choose your desired compression level. Lower quality results in smaller file sizes."
    },
    {
      name: "Download",
      text: "Once compressed, click the download button to save your optimized images instantly."
    }
  ];

  return (
    <>
      <SEOHead
        title="Free Online Image Compressor — Reduce Size Without Losing Quality"
        description="Compress images online for free. Fast, secure, high-quality JPG, PNG, JPEG size reduction without losing clarity. No signup required."
        keywords="image compressor, compress images, reduce file size, JPEG compressor, PNG compressor, WebP optimizer, free online tool"
       canonicalUrl={getCanonicalUrl("/compress-image")}
      />

      <SchemaMarkup
        toolName="Free Online Image Compressor"
        toolDescription="A powerful, free online tool to compress JPEG, PNG, and WebP images without losing quality. Secure browser-based processing."
       toolUrl={getCanonicalUrl("/compress-image")}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-16">
          {/* Tool Section - Immediate Access */}
          <ImageCompressor />

          {/* Tool Description with Keywords */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Best Free Online Image Compressor</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Welcome to the ultimate <strong>Free Online Image Compressor</strong>, your go-to solution for reducing image file sizes without compromising on quality. Whether you are a web developer looking to optimize page load speeds, a photographer needing to share high-resolution photos, or simply someone trying to save storage space on your device, our tool is designed to meet your needs efficiently.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our advanced compression algorithms analyze your images to identify the best possible balance between file size and visual fidelity. You can compress <strong>JPEG, PNG, WebP</strong>, and other popular formats by up to 90% while maintaining the clarity and sharpness of the original image. The process is entirely <strong>browser-based</strong>, meaning your photos are processed locally on your device and never uploaded to a server, ensuring 100% privacy and security. Each image can be up to <strong>50MB</strong> in size.
                </p>
                <p className="text-lg text-muted-foreground">
                  Using our tool is incredibly simple. Just drag and drop your files, adjust the quality settings if desired, and download your optimized images instantly. There are no limits on the number of images you can compress, and no hidden costs or watermarks. Experience lightning-fast compression that helps you improve website SEO, send emails faster, and manage your digital library with ease. Try our Free Online Image Compressor today and see the difference!
                </p>
              </div>
            </div>
          </section>

          {/* Compact Features */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Compressor?</h2>
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="font-semibold text-sm mb-1">Lightning Fast</h3>
                  <p className="text-xs text-muted-foreground">Compress in seconds</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm mb-1">100% Secure</h3>
                  <p className="text-xs text-muted-foreground">Browser processing only</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm mb-1">Quality Preserved</h3>
                  <p className="text-xs text-muted-foreground">Maintains visual quality</p>
                </div>
                <div className="text-center">
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
                  {howToSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{step.name}</h3>
                      <p className="text-sm text-muted-foreground">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-semibold mb-2 text-base">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
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

export default CompressImagePage;