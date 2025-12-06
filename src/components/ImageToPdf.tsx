import { useState } from "react";
import { FileText, Download, X, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { ShareDialog } from "./ShareDialog";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

export const ImageToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ file: File; preview: string }[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { logToolUsage, logFileConversion, logDownload } = useAnalytics();

  const handleFilesSelect = (selectedFiles: File[]) => {
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    setStatus("idle");
    setPdfUrl(null);

    // Create previews for new files
    const newPreviews: { file: File; preview: string }[] = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({ file, preview: e.target?.result as string });
        if (newPreviews.length === selectedFiles.length) {
          setFilePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = filePreviews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setFilePreviews(newPreviews);
    setPdfUrl(null);
    setStatus("idle");
  };

  const clearAllFiles = () => {
    setFiles([]);
    setFilePreviews([]);
    setPdfUrl(null);
    setStatus("idle");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
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
    link.download = "images-to-pdf.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    logDownload("images-to-pdf", "application/pdf", totalSize);
  };

  return (
    <section id="image-to-pdf" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Image to PDF Converter
            </h2>
            <p className="text-muted-foreground text-lg">
              Convert your images to a single PDF document
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-4">
              <FileUploadZone
                onFilesSelect={handleFilesSelect}
                acceptedFormats={[".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif"]}
                maxSize={10 * 1024 * 1024}
                multiple={true}
                icon={<FileText className="w-8 h-8 text-primary" />}
                title="Drop your images here"
                description="or click to browse (multiple files supported)"
              />

              {/* Selected Files List */}
              {files.length > 0 && (
                <div className="space-y-3">
                  {/* Header with Clear All */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{files.length} image(s) selected</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFiles}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>

                  {/* Files List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {filePreviews.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        {/* Thumbnail with Dialog Preview */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <img
                              src={item.preview}
                              alt={item.file.name}
                              className="w-16 h-16 object-cover rounded border flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <div className="flex flex-col items-center space-y-4">
                              <img
                                src={item.preview}
                                alt={item.file.name}
                                className="max-w-full max-h-[70vh] object-contain"
                              />
                              <div className="text-center">
                                <p className="font-medium">{item.file.name}</p>
                                <p className="text-sm text-muted-foreground">{formatFileSize(item.file.size)}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(item.file.size)}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="flex-shrink-0 text-primary hover:text-primary hover:bg-primary/10">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <div className="flex flex-col items-center space-y-4">
                                <img
                                  src={item.preview}
                                  alt={item.file.name}
                                  className="max-w-full max-h-[70vh] object-contain"
                                />
                                <p className="text-sm text-muted-foreground">{item.file.name}</p>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {files.length > 0 && status === "idle" && (
                <div className="flex gap-2">
                  <Button
                    onClick={convertToPdf}
                    className="flex-1 hover:scale-[1.02] transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    size="lg"
                  >
                    Convert {files.length} Image{files.length > 1 ? 's' : ''} to PDF
                  </Button>
                  <ShareDialog
                    fileName={files[0]?.name || "image"}
                    fileSize={files.length + " image" + (files.length > 1 ? 's' : "")}
                    toolName="Image to PDF"
                  />
                </div>
              )}

              <ProcessingIndicator status={status} />

              {status === "success" && pdfUrl && (
                <div className="space-y-4">
                  <Card className="p-4 bg-success/10 border border-success/20">
                    <div className="text-center">
                      <p className="text-success font-semibold">
                        Successfully converted {files.length} image{files.length !== 1 ? 's' : ''} to PDF!
                      </p>
                    </div>
                  </Card>

                  <Button
                    onClick={downloadPdf}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              )}

              {status === "error" && (
                <Card className="p-4 bg-destructive/10 border border-destructive/20">
                  <div className="text-center">
                    <p className="text-destructive font-semibold">
                      Conversion failed. Please try again with different images.
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