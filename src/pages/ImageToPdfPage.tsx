import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageToPdf } from "@/components/ImageToPdf";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Images, FileText, Layers, Briefcase } from "lucide-react";

const ImageToPdfPage = () => {
  return (
    <>
      <SEOHead 
        title="Images to PDF Converter - Combine JPEG, PNG into PDF Online"
        description="Convert multiple images to PDF online for free. Combine JPEG, PNG, WebP images into a single PDF document. Perfect for creating portfolios and reports."
        keywords="images to PDF, combine images PDF, JPEG to PDF, PNG to PDF, create PDF from images"
        canonicalUrl="https://convert-kitty.web.app/image-to-pdf"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-hero text-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-6">
                Images to PDF Converter
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Combine multiple images into a single PDF document instantly. Perfect for creating 
                portfolios, reports, presentations, and digital albums with professional quality.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="bg-white/20 text-white">Multiple Images</Badge>
                <Badge className="bg-white/20 text-white">Custom Page Sizes</Badge>
                <Badge className="bg-white/20 text-white">Professional Quality</Badge>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <ImageToPdf />

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
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload Images</h3>
                    <p className="text-muted-foreground">Select multiple images in JPEG, PNG, or WebP format</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Arrange Order</h3>
                    <p className="text-muted-foreground">Drag and drop to reorder images as needed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Choose Settings</h3>
                    <p className="text-muted-foreground">Select page size, orientation, and quality options</p>
                  </div>
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
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">How many images can I combine into one PDF?</h3>
                  <p className="text-muted-foreground">You can combine up to 50 images in a single PDF. For larger collections, consider creating multiple PDFs.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">What image formats are supported?</h3>
                  <p className="text-muted-foreground">We support JPEG, PNG, WebP, BMP, and GIF formats. All images are converted with high quality preservation.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Can I change the order of images after uploading?</h3>
                  <p className="text-muted-foreground">Yes! Simply drag and drop the images in the preview area to reorder them before generating your PDF.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">What page sizes are available?</h3>
                  <p className="text-muted-foreground">We offer standard sizes like A4, Letter, and Legal, plus the ability to auto-fit images to optimal dimensions.</p>
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

export default ImageToPdfPage;