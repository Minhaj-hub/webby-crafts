import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PdfToImage } from "@/components/PdfToImage";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Download, Eye } from "lucide-react";

const PdfToImagePage = () => {
  return (
    <>
      <SEOHead 
        title="PDF to Image Converter - Convert PDF Pages to JPEG, PNG Online"
        description="Convert PDF to images online for free. Extract pages from PDF files as high-quality JPEG or PNG images. Fast, secure PDF to image conversion."
        keywords="PDF to image, convert PDF to JPEG, PDF to PNG, extract PDF pages, PDF converter"
        canonicalUrl="https://convert-kitty.web.app/pdf-to-image"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-hero text-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-6">
                PDF to Image Converter
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
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload PDF</h3>
                    <p className="text-muted-foreground">Drag and drop your PDF file or click to browse and select</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Auto Convert</h3>
                    <p className="text-muted-foreground">Our tool automatically extracts all pages as high-quality images</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download Images</h3>
                    <p className="text-muted-foreground">Download individual pages or all images at once</p>
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
                  <h3 className="font-semibold mb-2">What's the maximum PDF file size I can convert?</h3>
                  <p className="text-muted-foreground">You can convert PDF files up to 20MB in size. For larger files, consider splitting them into smaller documents first.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Will the image quality be good enough for printing?</h3>
                  <p className="text-muted-foreground">Yes! We use 2x scaling to ensure high-resolution output suitable for both digital use and printing.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Can I convert password-protected PDFs?</h3>
                  <p className="text-muted-foreground">Currently, we don't support password-protected PDFs. Please remove the password protection before uploading.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">How many pages can I convert at once?</h3>
                  <p className="text-muted-foreground">There's no limit on the number of pages. Our tool will convert all pages in your PDF document automatically.</p>
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

export default PdfToImagePage;