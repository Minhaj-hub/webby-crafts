import { useState, useRef, useEffect } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

// Dynamically import pdfjs to avoid server-side rendering issues
const usePdfJs = () => {
  const [pdfjs, setPdfjs] = useState<any>(null);
  
  useEffect(() => {
    import("pdfjs-dist/build/pdf.worker.mjs?url").then((worker) => {
      import("pdfjs-dist").then((pdfjsLib) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
        setPdfjs(pdfjsLib);
      });
    });
  }, []);
  
  return pdfjs;
};

export const PdfToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [images, setImages] = useState<string[]>([]);
  const pdfjs = usePdfJs();
  const fileReaderRef = useRef<FileReader | null>(null);
  const { logToolUsage, logFileConversion } = useAnalytics();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("idle");
    setImages([]);
  };

  const convertPdf = async () => {
    if (!file || !pdfjs) return;

    setStatus("processing");
    setImages([]);

    try {
      // Track tool usage
      logToolUsage("pdf_to_image");
      
      // Read file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF document
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      // Convert each page to image
      const imageUrls: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        
        // Set viewport for rendering
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
        
        // Create canvas for rendering
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render page to canvas
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        // Convert canvas to data URL
        const imageUrl = canvas.toDataURL("image/png");
        imageUrls.push(imageUrl);
      }
      
      setImages(imageUrls);
      setStatus("success");
      toast.success(`Successfully converted PDF to ${imageUrls.length} images!`);
      
      // Track successful conversion
      logFileConversion("pdf", file.size);
    } catch (error) {
      console.error("PDF conversion error:", error);
      setStatus("error");
      toast.error("Failed to convert PDF. Please try another file.");
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `page-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = () => {
    if (images.length === 0) return;
    
    // Create a ZIP file for all images
    if (images.length > 1) {
      toast.info("Downloading images individually. Your browser may block multiple downloads - please allow them.");
    }
    
    images.forEach((imageUrl, index) => {
      setTimeout(() => {
        downloadImage(imageUrl, index);
      }, index * 300); // Add delay to prevent browser blocking
    });
  };

  return (
    <section id="pdf-to-image" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-success/10 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              PDF to Image Converter
            </h2>
            <p className="text-muted-foreground text-lg">
              Convert PDF pages to high-quality images
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-6">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFormats={[".pdf"]}
                maxSize={20 * 1024 * 1024}
                icon={<FileText className="w-8 h-8 text-success" />}
                title="Drop your PDF here"
                description="or click to browse"
              />

              {file && status === "idle" && (
                <Button
                  onClick={convertPdf}
                  className="w-full bg-success hover:bg-success/90"
                  size="lg"
                >
                  Convert to Images
                </Button>
              )}

              <ProcessingIndicator status={status} />

              {status === "success" && images.length > 0 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      Converted Images ({images.length} pages)
                    </h3>
                    <Button
                      onClick={downloadAllImages}
                      className="bg-success hover:bg-success/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images.map((imageUrl, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden bg-card">
                        <div className="p-3 bg-secondary flex items-center justify-between">
                          <span className="font-medium">Page {index + 1}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadImage(imageUrl, index)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-4 flex justify-center">
                          <img 
                            src={imageUrl} 
                            alt={`Page ${index + 1}`} 
                            className="max-w-full h-auto max-h-64 object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                  <p className="text-destructive font-semibold">
                    Conversion failed. Please try another PDF file.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};