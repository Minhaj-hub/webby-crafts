import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PdfToImage } from "@/components/PdfToImage";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Download, Eye } from "lucide-react";

const PdfToImagePage = () => {
  const faqs = [
    {
      question: "Is this PDF to image converter free?",
      answer: "Yes, our tool is completely free to use. You can convert as many PDF pages to images as you need without any cost."
    },
    {
      question: "What image formats can I get?",
      answer: "You can convert your PDF pages into high-quality PNG or JPEG images. Both formats are widely supported and perfect for sharing."
    },
    {
      question: "Is it secure?",
      answer: "Absolutely. Your files are processed locally in your browser and are never uploaded to our servers, ensuring your documents remain private."
    },
    {
      question: "Can I convert multiple pages?",
      answer: "Yes, our tool automatically extracts every page from your PDF file and converts them into separate images."
    },
    {
      question: "Can I download all images at once?",
      answer: "Yes, you can download individual pages or get all converted images in a single ZIP file for convenience."
    },
    {
      question: "Does it work on mobile?",
      answer: "Yes, our converter is fully responsive and works on all devices, including smartphones and tablets."
    }
  ];

  const howToSteps = [
    {
      name: "Upload PDF",
      text: "Drag and drop your PDF file or click to select it from your device."
    },
    {
      name: "Conversion",
      text: "The tool automatically processes the PDF and converts each page into an image."
    },
    {
      name: "Download",
      text: "Download individual page images or grab them all in a ZIP file."
    }
  ];

  return (
    <>
      <SEOHead
        title="Free PDF to Image Converter — Convert PDF to JPG, PNG"
        description="Convert PDF pages to high-quality JPG or PNG images online for free. Extract images from PDF documents instantly. Secure and fast."
        keywords="pdf to image, convert pdf to jpg, pdf to png, extract pdf pages, free pdf converter, online pdf tool"
        canonicalUrl="https://convert-kitty.web.app/pdf-to-image"
      />

      <SchemaMarkup
        toolName="Free PDF to Image Converter"
        toolDescription="A secure, free online tool to convert PDF pages into high-quality JPG or PNG images. Extract pages instantly in your browser."
        toolUrl="https://convert-kitty.web.app/pdf-to-image"
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
                Free PDF to Image Converter
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Convert PDF pages to high-quality images instantly. Extract individual pages
                or convert entire documents to JPEG or PNG format with perfect clarity.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="bg-white/20 text-white">High Resolution Output</Badge>
                <Badge className="bg-white/20 text-white">All Pages Extracted</Badge>
                <Badge className="bg-white/20 text-white">No File Size Limits</Badge>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <PdfToImage />

          {/* Tool Description with Keywords */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Best Free PDF to Image Converter</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Need to turn a PDF document into image files? Our **Free PDF to Image Converter** allows you to convert PDF pages into high-quality **JPG or PNG** images in seconds. This is perfect for sharing specific pages on social media, inserting them into presentations, or simply viewing them as images.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  You can upload any PDF file, and our tool will extract each page as a separate image. You can choose to download individual pages or get all of them at once as a ZIP file. We ensure that the resolution and clarity of your original document are preserved in the converted images.
                </p>
                <p className="text-lg text-muted-foreground">
                  Security is paramount. Your PDF files are processed **entirely within your browser** and are never sent to our servers. This means your sensitive documents remain private and secure throughout the conversion process. Try it today for free!
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Perfect for Every Use Case</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 text-center">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Preview Documents</h3>
                  <p className="text-sm text-muted-foreground">Create thumbnails and previews of PDF documents for websites</p>
                </Card>
                <Card className="p-6 text-center">
                  <Image className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Extract Graphics</h3>
                  <p className="text-sm text-muted-foreground">Pull out charts, diagrams, and images from PDF files</p>
                </Card>
                <Card className="p-6 text-center">
                  <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Archive Pages</h3>
                  <p className="text-sm text-muted-foreground">Save important PDF pages as images for long-term storage</p>
                </Card>
                <Card className="p-6 text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Share Content</h3>
                  <p className="text-sm text-muted-foreground">Convert pages to images for easy sharing on social media</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Quality & Formats */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">High-Quality Output Options</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Output Formats</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>PNG:</strong> Best for documents with text and graphics</li>
                      <li>• <strong>JPEG:</strong> Ideal for documents with photos</li>
                      <li>• <strong>High Resolution:</strong> 2x scaling for crisp, clear images</li>
                      <li>• <strong>Batch Download:</strong> Get all pages at once</li>
                    </ul>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Quality Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>Vector Rendering:</strong> Sharp text and graphics</li>
                      <li>• <strong>Color Accuracy:</strong> Preserves original colors</li>
                      <li>• <strong>Font Rendering:</strong> Crystal clear text output</li>
                      <li>• <strong>Page Integrity:</strong> Maintains original layout</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How to Convert PDF to Images</h2>
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

export default PdfToImagePage;