import { useState, useRef, useEffect } from "react";
import { FileText, Download, Eye, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { ShareDialog } from "./ShareDialog";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";
import JSZip from "jszip";

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

interface ConvertedImage {
  index: number;
  url: string;
  blob?: Blob;
}

// ... existing code ...

export const PdfToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const pdfjs = usePdfJs();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0);
  const { logToolUsage, logFileConversion, logDownload } = useAnalytics();

  const openPreview = (index: number) => {
    setCurrentPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const goToPrevious = () => {
    if (currentPreviewIndex > 0) {
      setCurrentPreviewIndex(currentPreviewIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentPreviewIndex < images.length - 1) {
      setCurrentPreviewIndex(currentPreviewIndex + 1);
    }
  };

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
      
      // Convert each page to image with blob storage
      const convertedImages: ConvertedImage[] = [];
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
        
        // Convert canvas to blob and data URL
        const blob: Blob = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/png");
        });
        const url = URL.createObjectURL(blob);
        
        convertedImages.push({
          index: i - 1,
          url,
          blob
        });
      }
      
      setImages(convertedImages);
      setStatus("success");
      toast.success(`Successfully converted PDF to ${convertedImages.length} images!`);
      
      // Track successful conversion
      logFileConversion("pdf", file.size);
    } catch (error) {
      console.error("PDF conversion error:", error);
      setStatus("error");
      toast.error("Failed to convert PDF. Please try another file.");
    }
  };

  const downloadImage = (image: ConvertedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `page-${image.index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download
    logDownload(`pdf-page-${image.index + 1}`, "image/png", image.blob?.size || 0);
  };

  const downloadAllImages = async () => {
    if (images.length === 0) return;
    
    // Single file - download directly
    if (images.length === 1) {
      downloadImage(images[0]);
      return;
    }
    
    // Multiple files - create ZIP
    try {
      toast.info("Creating ZIP file...");
      const zip = new JSZip();
      
      // Add each image to zip
      for (const image of images) {
        if (image.blob) {
          zip.file(`page-${image.index + 1}.png`, image.blob);
        }
      }
      
      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = `pdf-pages.zip`;
      link.click();
      
      setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
      toast.success(`Downloaded ${images.length} pages as ZIP!`);
      
      // Track ZIP download
      const totalSize = images.reduce((sum, img) => sum + (img.blob?.size || 0), 0);
      logDownload(`pdf-pages-zip-${images.length}`, "application/zip", zipBlob.size);
    } catch (error) {
      console.error("ZIP creation error:", error);
      toast.error("Failed to create ZIP. Downloading individually...");
      // Fallback to individual downloads
      images.forEach((image, idx) => {
        setTimeout(() => downloadImage(image), idx * 200);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const image = prev.find(img => img.index === index);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter(img => img.index !== index);
    });
  };

  const clearAllImages = () => {
    images.forEach(image => URL.revokeObjectURL(image.url));
    setImages([]);
    setStatus("idle");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
  };

  return (
    <section id="pdf-to-image" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-2">
              PDF to Image Converter
            </h2>
            <p className="text-muted-foreground text-lg">
              Convert PDF pages to high-quality PNG images
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-4">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFormats={[".pdf"]}
                maxSize={20 * 1024 * 1024}
                icon={<FileText className="w-8 h-8 text-success" />}
                title="Drop your PDF here"
                description="or click to browse (Max 20MB)"
              />

              {file && status === "idle" && (
                <div className="space-y-2">
                  <div className="p-3 bg-secondary/20 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{formatFileSize(file.size)}</span>
                  </div>
                  <Button
                    onClick={convertPdf}
                    className="w-full bg-success hover:bg-success/90"
                    size="lg"
                  >
                    Convert to Images
                  </Button>
                </div>
              )}

              <ProcessingIndicator status={status} />

              {status === "success" && images.length > 0 && (
                <div className="space-y-4">
                  {/* Header with download and clear */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{images.length} page(s) converted</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllImages}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>

                  {/* Images List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {images.map((image) => (
                      <div key={image.index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        {/* Thumbnail with Dialog Preview */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <img
                              src={image.url}
                              alt={`Page ${image.index + 1}`}
                              className="w-16 h-16 object-cover rounded border flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <div className="flex flex-col items-center space-y-4">
                              <img
                                src={image.url}
                                alt={`Page ${image.index + 1}`}
                                className="max-w-full max-h-[70vh] object-contain"
                              />
                              <div className="text-center">
                                <p className="font-medium">Page {image.index + 1}</p>
                                <p className="text-sm text-muted-foreground">Converted from PDF</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Info and Actions */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">Page {image.index + 1}</p>
                          <p className="text-xs text-muted-foreground">PNG Image</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => openPreview(image.index)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-green-600 hover:text-green-600 hover:bg-green-600/10"
                            onClick={() => downloadImage(image)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeImage(image.index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Button */}
                  <div className="flex gap-2">
                    <Button
                      onClick={downloadAllImages}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {images.length === 1
                        ? "Download Page"
                        : `Download as ZIP (${images.length} pages)`
                      }
                    </Button>
                    <ShareDialog
                      fileName={`PDF-page-${images[0]?.index + 1 || "1"}`}
                      fileSize={images.length + " page" + (images.length > 1 ? 's' : "")}
                      toolName="PDF to Image"
                    />
                  </div>

                  {/* Full-screen Preview Modal */}
                  <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
                      {images.length > 0 && currentPreviewIndex < images.length && (
                        <div className="flex flex-col items-center space-y-4">
                          <img
                            src={images[currentPreviewIndex].url}
                            alt={`Page ${images[currentPreviewIndex].index + 1}`}
                            className="max-w-full max-h-[70vh] object-contain"
                          />
                          <div className="text-center space-y-2">
                            <p className="font-medium">Page {images[currentPreviewIndex].index + 1} of {images.length}</p>
                            <p className="text-sm text-muted-foreground">Converted from PDF</p>
                          </div>
                          {/* Navigation Controls */}
                          <div className="flex items-center gap-4 w-full justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={goToPrevious}
                              disabled={currentPreviewIndex === 0}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium min-w-[80px] text-center">
                              {images[currentPreviewIndex].index + 1} / {images.length}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={goToNext}
                              disabled={currentPreviewIndex === images.length - 1}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {status === "error" && (
                <Card className="p-4 bg-destructive/10 border border-destructive/20">
                  <div className="text-center">
                    <p className="text-destructive font-semibold">
                      Conversion failed. Please try another PDF file.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};