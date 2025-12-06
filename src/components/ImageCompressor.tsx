import { useState, useEffect } from "react";
import { FileImage, Download, Zap, TrendingDown, Eye, X, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { ShareDialog } from "./ShareDialog";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useNavigate } from "react-router-dom";

export const ImageCompressor = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ file: File, preview: string }[]>([]);
  const [quality, setQuality] = useState([80]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { logToolUsage } = useAnalytics();
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  // Cleanup object URLs on unmount
  const cleanup = () => {
    objectUrls.forEach(url => URL.revokeObjectURL(url));
  };

  useEffect(() => {
    return cleanup;
  }, []);

  const handleFileSelect = (selectedFiles: File | File[]) => {
    const fileArray = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles];

    // Validate file sizes
    const validFiles = fileArray.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 50MB limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Add new files to existing ones instead of replacing
    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);

    // Create previews for new files only
    const newPreviews: { file: File, preview: string }[] = [];
    const newUrls: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({ file, preview: e.target?.result as string });
        if (newPreviews.length === validFiles.length) {
          setFilePreviews(prev => [...prev, ...newPreviews]);
          setObjectUrls(prev => [...prev, ...newUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const startCompression = () => {
    if (files.length === 0) return;

    logToolUsage("image_compressor", { file_count: files.length, quality: quality[0] });

    const startTime = Date.now();
    navigate("/compression-results", {
      state: {
        files,
        quality: quality[0],
        startTime
      }
    });
  };

  const downloadImage = (compressed: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = compressed;
    link.download = `compressed-${fileName}`;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
  };

  const getQualityLabel = (quality: number) => {
    if (quality >= 90) return { label: "Highest", color: "bg-green-500" };
    if (quality >= 70) return { label: "High", color: "bg-blue-500" };
    if (quality >= 50) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Low", color: "bg-red-500" };
  };

  const estimatedReduction = Math.max(0, 100 - quality[0]);

  return (
    <section id="compress" className="py-20 bg-background" aria-labelledby="compress-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Free Online Image Compressor
            </h2>
            <p className="text-muted-foreground text-lg">
              Reduce file sizes by up to 90% without losing quality
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-4">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFormats={[".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".avif"]}
                icon={<FileImage className="w-8 h-8 text-primary" />}
                title="Drop images to compress"
                description="Select single or multiple images (Max 50MB per file)"
                multiple
              />

              {files.length > 0 && (
                <div className="space-y-4">
                  {/* Selected Images */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{files.length} image(s) selected</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFiles([]);
                          setFilePreviews([]);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {filePreviews.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
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
                          <div className="flex-1 min-w-0">
                        <div>
                          <p className="font-medium text-sm truncate">{item.file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(item.file.size)}</p>
                        </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 text-primary hover:text-primary hover:bg-primary/10"
                              onClick={() => setPreviewImage(item.preview)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => {
                                const newFiles = files.filter((_, i) => i !== index);
                                const newPreviews = filePreviews.filter((_, i) => i !== index);
                                setFiles(newFiles);
                                setFilePreviews(newPreviews);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quality Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">
                        Compression Quality
                      </label>
                      <div className="flex items-center gap-2">
                        <Badge className={getQualityLabel(quality[0]).color}>
                          {getQualityLabel(quality[0]).label}
                        </Badge>
                        <span className="text-sm font-mono">{quality[0]}%</span>
                      </div>
                    </div>

                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>

                    {/* Estimated reduction */}
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Estimated Reduction</span>
                      </div>
                      <Progress value={estimatedReduction} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        ~{estimatedReduction}% size reduction
                      </p>
                    </div>
                  </div>



                  <Button
                    onClick={startCompression}
                    className="w-full hover:scale-[1.02] transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    size="lg"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Compress {files.length} Image{files.length > 1 ? 's' : ''}
                  </Button>
                  <ShareDialog
                    fileName={files[0]?.name || "image"}
                    fileSize={files.length + " image" + (files.length > 1 ? 's' : "")}
                    toolName="Image Compressor"
                  />
                </div>
              )}


            </div>
          </Card>

          {/* Preview Dialog */}
          {previewImage && (
            <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
              <DialogContent className="max-w-4xl">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-[80vh] object-contain mx-auto"
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </section>
  );
};