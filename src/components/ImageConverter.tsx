import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

export type ImageFormat = "jpeg" | "png" | "webp" | "bmp" | "gif" | "avif";

// Available formats for the switcher
const formats = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "webp", label: "WebP" },
  { value: "gif", label: "GIF" },
  { value: "bmp", label: "BMP" },
];

// Map of all valid conversions
const validConversions: Record<string, string[]> = {
  png: ["jpg", "webp", "gif", "bmp"],
  jpg: ["png", "webp", "gif", "bmp"],
  webp: ["png", "jpg", "gif"],
  gif: ["png", "jpg", "webp"],
  bmp: ["png", "jpg", "webp"],
};

interface ImageConverterProps {
  defaultFormat?: ImageFormat;
  sourceFormat?: string;
  acceptedInputFormats?: string[];
  title?: string;
  description?: string;
  showFormatSwitcher?: boolean;
}

export const ImageConverter = ({
  defaultFormat = "png",
  sourceFormat = "",
  acceptedInputFormats = [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".avif"],
  title = "Image Format Converter",
  description = "Convert between JPEG, PNG, WebP, BMP, GIF, and AVIF formats",
  showFormatSwitcher = false,
}: ImageConverterProps) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>(defaultFormat);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const { logToolUsage, logFileConversion } = useAnalytics();

  // Normalize formats for the switcher
  const normalizedSource = sourceFormat.toLowerCase() === "jpeg" ? "jpg" : sourceFormat.toLowerCase();
  const normalizedTarget = (defaultFormat === "jpeg" ? "jpg" : defaultFormat).toLowerCase();

  const handleSourceChange = (newSource: string) => {
    const availableTargets = validConversions[newSource] || [];
    let newTarget = normalizedTarget;
    if (!availableTargets.includes(normalizedTarget)) {
      newTarget = availableTargets[0] || "png";
    }
    navigate(`/${newSource}-to-${newTarget}`);
  };

  const handleTargetChange = (newTarget: string) => {
    navigate(`/${normalizedSource}-to-${newTarget}`);
  };

  const availableTargets = validConversions[normalizedSource] || [];

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("idle");
    setConvertedImage(null);
  };

  const convertImage = async () => {
    if (!file) return;

    setStatus("processing");

    try {
      logToolUsage("image_converter");

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
            logFileConversion(`image_to_${targetFormat}`, file.size);
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
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-6">
              {/* Format Switcher - From -> To */}
              {showFormatSwitcher && sourceFormat && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide text-center">From</label>
                      <Select value={normalizedSource} onValueChange={handleSourceChange}>
                        <SelectTrigger className="w-[120px] bg-background font-semibold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          {formats.map((format) => (
                            <SelectItem key={format.value} value={format.value}>
                              {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mt-5">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide text-center">To</label>
                      <Select value={normalizedTarget} onValueChange={handleTargetChange}>
                        <SelectTrigger className="w-[120px] bg-background font-semibold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          {formats
                            .filter((format) => availableTargets.includes(format.value))
                            .map((format) => (
                              <SelectItem key={format.value} value={format.value}>
                                {format.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground sm:ml-2">
                    Switch formats instantly
                  </p>
                </div>
              )}

              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFormats={acceptedInputFormats}
                icon={<RefreshCw className="w-8 h-8 text-accent" />}
                title="Drop your image to convert"
                description="or click to browse"
              />

              {file && status === "idle" && (
                <Button
                  onClick={convertImage}
                  className="w-full bg-accent hover:bg-accent/90"
                  size="lg"
                >
                  Convert to {targetFormat.toUpperCase()}
                </Button>
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