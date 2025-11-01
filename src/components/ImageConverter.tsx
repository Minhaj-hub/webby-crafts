import { useState } from "react";
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { toast } from "sonner";

type ImageFormat = "jpeg" | "png" | "webp";

export const ImageConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("png");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [convertedImage, setConvertedImage] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("idle");
    setConvertedImage(null);
  };

  const convertImage = async () => {
    if (!file) return;

    setStatus("processing");

    try {
      const img = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${targetFormat === "jpeg" ? "jpeg" : targetFormat}`;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedImage(url);
            setStatus("success");
            toast.success(`Image converted to ${targetFormat.toUpperCase()} successfully!`);
          }
        },
        mimeType,
        0.95
      );
    } catch (error) {
      setStatus("error");
      toast.error("Failed to convert image");
    }
  };

  const downloadImage = () => {
    if (!convertedImage || !file) return;

    const link = document.createElement("a");
    link.href = convertedImage;
    const baseName = file.name.split(".").slice(0, -1).join(".");
    link.download = `${baseName}.${targetFormat}`;
    link.click();
  };

  return (
    <section id="convert" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-accent/10 rounded-2xl mb-4">
              <RefreshCw className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Image Format Converter
            </h2>
            <p className="text-muted-foreground text-lg">
              Convert between JPG, PNG, and WebP formats instantly
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-6">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFormats={[".jpg", ".jpeg", ".png", ".webp"]}
                icon={<RefreshCw className="w-8 h-8 text-accent" />}
                title="Drop your image to convert"
                description="or click to browse"
              />

              {file && status === "idle" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Convert to:
                    </label>
                    <Select
                      value={targetFormat}
                      onValueChange={(value) => setTargetFormat(value as ImageFormat)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={convertImage}
                    className="w-full bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    Convert Image
                  </Button>
                </div>
              )}

              <ProcessingIndicator status={status} />

              {status === "success" && convertedImage && (
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
                    <p className="text-success font-semibold">
                      Successfully converted to {targetFormat.toUpperCase()}
                    </p>
                  </div>

                  <Button
                    onClick={downloadImage}
                    className="w-full bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download {targetFormat.toUpperCase()}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
