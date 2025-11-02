import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

export const ImageToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { logToolUsage, logFileConversion } = useAnalytics();

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus("idle");
    setPdfUrl(null);
  };

  const convertToPdf = async () => {
    if (files.length === 0) return;

    setStatus("processing");

    try {
      // Track tool usage
      logToolUsage("image_to_pdf");
      
      // Dynamically import jspdf to avoid server-side rendering issues
      const { jsPDF } = await import("jspdf");
      
      // Create a new PDF document
      const pdf = new jsPDF();
      
      // Process each image
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // For the first image, we use the existing pdf instance
        // For subsequent images, we add new pages
        if (i > 0) {
          pdf.addPage();
        }
        
        // Convert image to data URL
        const imgData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        // Get image dimensions
        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = imgData;
        });
        
        // Calculate dimensions to fit the page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;
        
        // Add image to PDF
        pdf.addImage(imgData, "JPEG", x, y, width, height);
      }
      
      // Generate PDF blob
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setStatus("success");
      toast.success(`Successfully converted ${files.length} image(s) to PDF!`);
      
      // Track successful conversion
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      logFileConversion("image_to_pdf", totalSize);
    } catch (error) {
      console.error("Image to PDF conversion error:", error);
      setStatus("error");
      toast.error("Failed to convert images to PDF. Please try again.");
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "converted-images.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="image-to-pdf" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Image to PDF Converter
            </h2>
            <p className="text-muted-foreground text-lg">
              Convert your images to a single PDF document
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-6">
              <FileUploadZone
                onFilesSelect={handleFilesSelect}
                acceptedFormats={[".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif"]}
                maxSize={10 * 1024 * 1024}
                multiple={true}
                icon={<FileText className="w-8 h-8 text-primary" />}
                title="Drop your images here"
                description="or click to browse (multiple files supported)"
              />

              {files.length > 0 && status === "idle" && (
                <div className="text-center">
                  <p className="text-foreground mb-2">
                    Selected {files.length} image{files.length !== 1 ? "s" : ""}
                  </p>
                  <Button
                    onClick={convertToPdf}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    Convert to PDF
                  </Button>
                </div>
              )}

              <ProcessingIndicator status={status} />

              {status === "success" && pdfUrl && (
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
                    <p className="text-success font-semibold">
                      Successfully converted {files.length} image{files.length !== 1 ? "s" : ""} to PDF!
                    </p>
                  </div>

                  <Button
                    onClick={downloadPdf}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                  <p className="text-destructive font-semibold">
                    Conversion failed. Please try again with different images.
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