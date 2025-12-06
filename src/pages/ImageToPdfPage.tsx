import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageToPdf } from "@/components/ImageToPdf";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card } from "@/components/ui/card";
import { getCanonicalUrl } from "@/config/app.config";
import { Badge } from "@/components/ui/badge";
import { Images, FileText, Layers, Briefcase } from "lucide-react";

const ImageToPdfPage = () => {
  const faqs = [
    {
      question: "Is this image to PDF converter free?",
      answer: "Yes, our tool is 100% free. You can combine as many images as you like into PDF documents without any cost."
    },
    {
      question: "How many images can I combine?",
      answer: "You can combine up to 50 images into a single PDF file. This is perfect for creating portfolios, albums, or document compilations."
    },
    {
      question: "Can I reorder the images?",
      answer: "Yes, absolutely. After uploading, you can simply drag and drop your images to arrange them in the exact order you want them to appear in the PDF."
    },
    {
      question: "Is my data secure?",
      answer: "Your security is our top priority. All processing happens locally in your browser, meaning your images are never uploaded to our servers."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPG, JPEG, PNG, WebP, BMP, and GIF."
    },
    {
      question: "Can I choose page size?",
      answer: "Yes, you can select from standard page sizes like A4, Letter, and Legal, or choose to have the page size automatically fit the image."
    }
  ];

  const howToSteps = [
    {
      name: "Upload Images",
      text: "Select multiple images from your device or drag and drop them into the tool."
    },
    {
      name: "Arrange Order",
      text: "Drag and drop the images to reorder them as needed for your PDF."
    },
    {
      name: "Convert & Download",
      text: "Click 'Generate PDF' to create your document and download it instantly."
    }
  ];

  return (
    <>
      <SEOHead
        title="Free Image to PDF Converter — Convert JPG, PNG to PDF"
        description="Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into a single PDF file. Fast, secure, and easy to use."
        keywords="image to pdf, jpg to pdf, png to pdf, combine images to pdf, free pdf converter, online pdf tool"
        canonicalUrl="https://convertkit.web.app/image-to-pdf"
      />

      <SchemaMarkup
        toolName="Free Image to PDF Converter"
        toolDescription="A simple, free online tool to combine multiple images (JPG, PNG, WebP) into a single, high-quality PDF document. Secure browser-based processing."
        toolUrl="https://convertkit.web.app/image-to-pdf"
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-16">
          {/* Tool Section */}
          <ImageToPdf />

          {/* Tool Description with Keywords */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Best Free Image to PDF Converter</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Create professional PDF documents from your images with our **Free Image to PDF Converter**. Whether you need to compile a portfolio, create a digital album, or share documents, our tool makes it easy to combine multiple images into a single, high-quality PDF file.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We support **JPG, PNG, WebP**, and other popular image formats. You can arrange your images in any order you like before generating the PDF. The tool automatically optimizes the images to ensure the final PDF is of a manageable size without sacrificing quality.
                </p>
                <p className="text-lg text-muted-foreground">
                  Like all our tools, the conversion happens **locally in your browser**, so your personal photos and documents are never uploaded to any server. This guarantees 100% privacy and security for your data. Try it now and see how easy it is to create PDFs from your images!
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Perfect for Professional Use</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 text-center">
                  <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Business Reports</h3>
                  <p className="text-sm text-muted-foreground">Combine charts, graphs, and screenshots into professional reports</p>
                </Card>
                <Card className="p-6 text-center">
                  <Images className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Photo Albums</h3>
                  <p className="text-sm text-muted-foreground">Create digital photo albums and portfolios from your images</p>
                </Card>
                <Card className="p-6 text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Compile instruction manuals and documentation from images</p>
                </Card>
                <Card className="p-6 text-center">
                  <Layers className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Presentations</h3>
                  <p className="text-sm text-muted-foreground">Convert presentation slides and mockups into shareable PDFs</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Advanced PDF Creation Features</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Flexible Layout Options</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>Auto-fit:</strong> Images automatically sized to fit pages</li>
                      <li>• <strong>Custom Margins:</strong> Professional spacing around images</li>
                      <li>• <strong>Page Orientation:</strong> Portrait or landscape layouts</li>
                      <li>• <strong>Multiple Formats:</strong> A4, Letter, Legal, and custom sizes</li>
                    </ul>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Quality & Organization</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>High Resolution:</strong> Maintains original image quality</li>
                      <li>• <strong>Drag & Drop Reorder:</strong> Arrange images in any order</li>
                      <li>• <strong>Batch Processing:</strong> Handle multiple images at once</li>
                      <li>• <strong>Compression Options:</strong> Balance file size and quality</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How to Create PDF from Images</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6">
                  {howToSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{step.name}</h3>
                      <p className="text-muted-foreground">{step.text}</p>
                    </div>
                  ))}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">4</span>
                    </div>
                    <h3 className="font-semibold mb-2">Generate PDF</h3>
                    <p className="text-muted-foreground">Download your professional PDF document instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Pro Tips for Better PDFs</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-3">Image Quality Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use high-resolution images for better print quality</li>
                      <li>• Ensure consistent image dimensions for uniform appearance</li>
                      <li>• Compress large images beforehand to reduce PDF file size</li>
                    </ul>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-3">Organization Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Name your images sequentially for easier ordering</li>
                      <li>• Group related images together before uploading</li>
                      <li>• Consider adding a cover image as the first page</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-secondary/20">
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

export default ImageToPdfPage;