import { useState } from "react";
import { FileImage, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { toast } from "sonner";

export const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([80]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setStatus("idle");
    setCompressedImage(null);
  };

  const compressImage = async () => {
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

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedImage(url);
            setCompressedSize(blob.size);
            setStatus("success");
            toast.success("Image compressed successfully!");
          }
        },
        "image/jpeg",
        quality[0] / 100
      );
    } catch (error) {
      setStatus("error");
      toast.error("Failed to compress image");
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed-${file?.name}`;
    link.click();
  };

  const reductionPercentage = originalSize && compressedSize
    ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    : 0;

  return (
    <section id="compress" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
              <FileImage className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Image Compressor
            </h2>
            <p className="text-muted-foreground text-lg">
              Reduce image file size while maintaining quality
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-6">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFormats={[".jpg", ".jpeg", ".png", ".webp"]}
                icon={<FileImage className="w-8 h-8 text-primary" />}
                title="Drop your image to compress"
                description="or click to browse"
              />

              {file && status === "idle" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Quality: {quality[0]}%
                    </label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={compressImage}
                    className="w-full"
                    size="lg"
                  >
                    Compress Image
                  </Button>
                </div>
              )}

              <ProcessingIndicator status={status} />

              {status === "success" && compressedImage && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Original</p>
                      <p className="text-lg font-semibold">
                        {(originalSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Compressed</p>
                      <p className="text-lg font-semibold text-success">
                        {(compressedSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
                    <p className="text-success font-semibold text-lg">
                      Reduced by {reductionPercentage}%
                    </p>
                  </div>

                  <Button
                    onClick={downloadImage}
                    className="w-full"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Compressed Image
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
