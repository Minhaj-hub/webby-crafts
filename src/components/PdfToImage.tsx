import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { toast } from "sonner";

export const PdfToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("idle");
  };

  const convertPdf = () => {
    if (!file) return;

    setStatus("processing");

    // Note: Full PDF conversion requires a library like pdf.js or pdf-lib
    // This is a placeholder for the conversion logic
    setTimeout(() => {
      toast.info("PDF conversion requires additional setup. This is a demo version.");
      setStatus("success");
    }, 2000);
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

              {status === "success" && (
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
                    <p className="text-success font-semibold">
                      Conversion demo complete!
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Full PDF conversion functionality coming soon
                    </p>
                  </div>

                  <Button
                    className="w-full bg-success hover:bg-success/90"
                    size="lg"
                    disabled
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Images
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <div className="mt-8 p-6 bg-card rounded-xl shadow-md">
            <h3 className="font-semibold text-foreground mb-3">Coming Soon:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Convert all pages or select specific pages</li>
              <li>• Choose output format (JPG, PNG, WebP)</li>
              <li>• Adjust image quality and resolution</li>
              <li>• Batch download as ZIP file</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
