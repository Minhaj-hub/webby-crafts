import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Download, ArrowRight, X, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileUploadZone } from "./FileUploadZone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { ShareDialog } from "./ShareDialog";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";
import JSZip from "jszip";

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

// Helper to normalize format (jpeg -> jpg, lowercase)
const normalizeFormat = (format: string): string => {
  if (!format) return "";
  const lower = format.toLowerCase();
  return lower === "jpeg" ? "jpg" : lower;
};

// Interface for selected file with preview
interface SelectedFile {
  id: string;
  file: File;
  previewUrl: string;
  sourceFormat: string;
  status: "pending" | "converting" | "success" | "error";
  convertedUrl?: string;
  convertedBlob?: Blob; // Store blob directly for ZIP creation
}

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
  const { logToolUsage, logFileConversion } = useAnalytics();
  
  // Always accept all image formats - user can upload any type
  const allSupportedFormats = [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".avif"];
  
  // Determine if we're on an individual conversion page (props provided) or convert-image page (free mode)
  const isIndividualPage = !!sourceFormat;
  
  // Normalize the incoming props
  const propSource = normalizeFormat(sourceFormat);
  const propTarget = normalizeFormat(defaultFormat);
  
  // State for file and conversion
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  
  // State for format selection - initialized from props
  const [selectedSource, setSelectedSource] = useState<string>(propSource);
  const [selectedTarget, setSelectedTarget] = useState<string>(propTarget);
  
  // Track if user has manually changed target (to prevent unwanted resets)
  const userChangedTarget = useRef(false);
  
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectUrls]);

  // Sync with props when on individual pages (after navigation)
  useEffect(() => {
    if (isIndividualPage) {
      setSelectedSource(propSource);
      // Only sync target if user hasn't manually changed it
      if (!userChangedTarget.current) {
        setSelectedTarget(propTarget);
      }
    }
  }, [isIndividualPage, propSource, propTarget]);
  
  // Reset the userChangedTarget flag when navigating to a new page
  useEffect(() => {
    userChangedTarget.current = false;
  }, [propSource, propTarget]);

  // Current values to display in dropdowns
  const currentSource = selectedSource;
  const currentTarget = selectedTarget;
  
  // Get available targets based on current source
  const availableTargets = currentSource 
    ? (validConversions[currentSource] || []) 
    : ["png", "jpg", "webp", "gif", "bmp"]; // Show all when no source selected

  // Handle source format change
  const handleSourceChange = (newSource: string) => {
    const targets = validConversions[newSource] || [];
    let newTarget = currentTarget;
    
    // If current target is not valid for new source, pick first available
    if (targets.length > 0 && !targets.includes(currentTarget)) {
      newTarget = targets[0];
      setSelectedTarget(newTarget);
    }
    
    setSelectedSource(newSource);
    setStatus("idle");
    // Reset all file statuses
    setSelectedFiles(prev => prev.map(f => ({ ...f, status: "pending" as const, convertedUrl: undefined })));
    
    // Navigate to the new format page
    navigate(`/${newSource}-to-${newTarget}`);
  };

  // Handle target format change
  const handleTargetChange = (newTarget: string) => {
    userChangedTarget.current = true;
    setSelectedTarget(newTarget);
    setStatus("idle");
    // Reset all file statuses
    setSelectedFiles(prev => prev.map(f => ({ ...f, status: "pending" as const, convertedUrl: undefined })));
    
    // Only navigate if source is already selected
    if (currentSource) {
      navigate(`/${currentSource}-to-${newTarget}`);
    }
  };

  // Handle multiple file selection
  const handleFilesSelect = (files: File[]) => {
    const validFiles: SelectedFile[] = [];
    
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 50MB limit`);
        continue;
      }
      
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || "";
      const detectedFormat = normalizeFormat(fileExtension);
      const previewUrl = URL.createObjectURL(file);
      
      validFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        previewUrl,
        sourceFormat: detectedFormat,
        status: "pending",
      });
      
      setObjectUrls(prev => [...prev, previewUrl]);
    }
    
    if (validFiles.length > 0) {
      // Auto-detect source from first file if not set
      if (!currentSource) {
        const firstFormat = validFiles[0].sourceFormat;
        setSelectedSource(firstFormat);
        
        // Check if current target is valid
        const targets = validConversions[firstFormat] || [];
        if (targets.length > 0 && !targets.includes(currentTarget)) {
          setSelectedTarget(targets[0]);
        }
      }
      
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setStatus("idle");
    }
  };
  
  // Handle single file selection (for backwards compatibility)
  const handleFileSelect = (file: File) => {
    handleFilesSelect([file]);
  };

  // Remove a single file
  const removeFile = (id: string) => {
    setSelectedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.previewUrl);
        if (file.convertedUrl) URL.revokeObjectURL(file.convertedUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Clear all files
  const clearAllFiles = () => {
    selectedFiles.forEach(f => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
    });
    setSelectedFiles([]);
    setStatus("idle");
  };

  // Convert a single file
  const convertSingleFile = async (fileItem: SelectedFile): Promise<{ url: string; blob: Blob } | null> => {
    try {
      const img = await createImageBitmap(fileItem.file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${selectedTarget === "jpg" ? "jpeg" : selectedTarget}`;

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setObjectUrls(prev => [...prev, url]);
              resolve({ url, blob });
            } else {
              resolve(null);
            }
          },
          mimeType,
          0.95
        );
      });
    } catch (error) {
      console.error("Conversion error:", error);
      return null;
    }
  };

  // Convert all files
  const convertAllImages = async () => {
    if (selectedFiles.length === 0) return;

    setStatus("processing");
    
    // Set all files to converting status
    setSelectedFiles(prev => prev.map(f => ({ ...f, status: "converting" as const })));

    let successCount = 0;
    let errorCount = 0;

    for (const fileItem of selectedFiles) {
      const result = await convertSingleFile(fileItem);
      
      if (result) {
        setSelectedFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: "success" as const, convertedUrl: result.url, convertedBlob: result.blob } 
            : f
        ));
        successCount++;
      } else {
        setSelectedFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: "error" as const } 
            : f
        ));
        errorCount++;
      }
    }

    if (successCount > 0) {
      setStatus("success");
      toast.success(`${successCount} image${successCount > 1 ? 's' : ''} converted to ${selectedTarget.toUpperCase()}!`);
      
      // Track conversion
      const totalSize = selectedFiles
        .filter(f => f.status === "success")
        .reduce((sum, f) => sum + f.file.size, 0);
      logFileConversion(
        `image_converter_${successCount}_files`, 
        totalSize,
        selectedSource,
        selectedTarget
      );
    }
    if (errorCount > 0) {
      toast.error(`${errorCount} image${errorCount > 1 ? 's' : ''} failed to convert.`);
    }
  };

  // Download a single converted image
  const downloadSingleImage = (fileItem: SelectedFile) => {
    if (!fileItem.convertedUrl) return;

    const link = document.createElement("a");
    link.href = fileItem.convertedUrl;
    const baseName = fileItem.file.name.split(".").slice(0, -1).join(".");
    link.download = `${baseName}.${selectedTarget}`;
    link.click();
  };

  // Download all converted images as ZIP (or single file if only one)
  const downloadAllImages = async () => {
    const convertedFiles = selectedFiles.filter(f => f.status === "success" && f.convertedBlob);
    
    if (convertedFiles.length === 0) return;
    
    // Single file - download directly
    if (convertedFiles.length === 1) {
      downloadSingleImage(convertedFiles[0]);
      return;
    }
    
    // Multiple files - create ZIP
    try {
      toast.info("Creating ZIP file...");
      const zip = new JSZip();
      
      // Add each converted image to zip using stored blob
      for (const fileItem of convertedFiles) {
        if (!fileItem.convertedBlob) continue;
        
        const baseName = fileItem.file.name.split(".").slice(0, -1).join(".");
        const fileName = `${baseName}.${selectedTarget}`;
        
        zip.file(fileName, fileItem.convertedBlob);
      }
      
      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = `converted-images-${selectedTarget}.zip`;
      link.click();
      
      // Clean up after a short delay
      setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
      toast.success(`Downloaded ${convertedFiles.length} images as ZIP!`);
    } catch (error) {
      console.error("ZIP creation error:", error);
      toast.error("Failed to create ZIP file. Downloading individually...");
      // Fallback to individual downloads
      convertedFiles.forEach((fileItem, index) => {
        setTimeout(() => downloadSingleImage(fileItem), index * 200);
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
  };

  return (
    <section id="convert" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="space-y-4">
              {/* Format Switcher - From -> To */}
              {showFormatSwitcher && (
                <div className="flex flex-col items-center justify-center gap-3 p-3 bg-gradient-to-r from-secondary/30 to-secondary/20 rounded-lg border border-border/50 mb-3">
                  {/* Format Selection Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    {/* From Section */}
                    <div className="flex flex-col items-center gap-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">From</label>
                      <Select value={currentSource} onValueChange={handleSourceChange}>
                        <SelectTrigger className="w-28 bg-background font-bold text-center">
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

                    {/* Arrow Icon */}
                    <div className="hidden sm:flex items-center justify-center">
                      <div className="flex items-center justify-center w-9 h-9 bg-primary/15 rounded-full">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* To Section */}
                    <div className="flex flex-col items-center gap-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">To</label>
                      <Select value={currentTarget} onValueChange={handleTargetChange}>
                        <SelectTrigger className="w-28 bg-background font-bold text-center">
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

                  {/* Text Below */}
                  <p className="text-xs font-medium text-muted-foreground text-center mt-1">
                    Select formats to convert
                  </p>
                </div>
              )}

              <FileUploadZone
                onFileSelect={handleFileSelect}
                onFilesSelect={handleFilesSelect}
                acceptedFormats={allSupportedFormats}
                multiple={true}
                icon={<RefreshCw className="w-8 h-8 text-accent" />}
                title="Drop your images to convert"
                description="Supports JPG, PNG, WebP, GIF, BMP (Max 50MB each)"
              />

              {/* Selected Files List - ImageCompressor Style */}
              {selectedFiles.length > 0 && (
                <div className="space-y-4">
                  {/* Header with Clear All */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{selectedFiles.length} image(s) selected</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFiles}
                    >
                      Clear All
                    </Button>
                  </div>

                  {/* Files List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {selectedFiles.map((fileItem) => (
                      <div key={fileItem.id} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        {/* Thumbnail with Dialog Preview */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <img
                              src={fileItem.status === "success" && fileItem.convertedUrl ? fileItem.convertedUrl : fileItem.previewUrl}
                              alt={fileItem.file.name}
                              className="w-16 h-16 object-cover rounded border flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <div className="flex flex-col items-center space-y-4">
                              <img
                                src={fileItem.status === "success" && fileItem.convertedUrl ? fileItem.convertedUrl : fileItem.previewUrl}
                                alt={fileItem.file.name}
                                className="max-w-full max-h-[70vh] object-contain"
                              />
                              <div className="text-center">
                                <p className="font-medium">{fileItem.file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatFileSize(fileItem.file.size)} • {fileItem.sourceFormat.toUpperCase()}
                                  {fileItem.status === "success" && (
                                    <span className="text-green-600 ml-2">→ {selectedTarget.toUpperCase()}</span>
                                  )}
                                </p>
                              </div>
                              {fileItem.status === "success" && fileItem.convertedUrl && (
                                <Button onClick={() => downloadSingleImage(fileItem)}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download {selectedTarget.toUpperCase()}
                                </Button>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{fileItem.file.name}</p>
                            {fileItem.status === "success" && (
                              <Badge className="bg-green-500 text-white text-xs">
                                {selectedTarget.toUpperCase()}
                              </Badge>
                            )}
                            {fileItem.status === "converting" && (
                              <Badge className="bg-yellow-500 text-white text-xs">
                                Converting...
                              </Badge>
                            )}
                            {fileItem.status === "error" && (
                              <Badge className="bg-red-500 text-white text-xs">
                                Error
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(fileItem.file.size)} • {fileItem.sourceFormat.toUpperCase()}
                          </p>
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
                                  src={fileItem.status === "success" && fileItem.convertedUrl ? fileItem.convertedUrl : fileItem.previewUrl}
                                  alt={fileItem.file.name}
                                  className="max-w-full max-h-[70vh] object-contain"
                                />
                                <div className="text-center">
                                  <p className="font-medium">{fileItem.file.name}</p>
                                  <p className="text-sm text-muted-foreground">{formatFileSize(fileItem.file.size)}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {fileItem.status === "success" && fileItem.convertedUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 text-green-600 hover:text-green-600 hover:bg-green-600/10"
                              onClick={() => downloadSingleImage(fileItem)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFile(fileItem.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Convert Button */}
                    {selectedFiles.some(f => f.status === "pending") && (
                      <Button
                        onClick={convertAllImages}
                        className="w-full hover:scale-[1.02] transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        size="lg"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Convert {selectedFiles.filter(f => f.status === "pending").length} Image{selectedFiles.filter(f => f.status === "pending").length > 1 ? 's' : ''} to {selectedTarget.toUpperCase()}
                      </Button>
                    )}

                    {/* Download and Share Buttons */}
                    {selectedFiles.some(f => f.status === "success") && (
                      <div className="flex gap-2">
                        <Button
                          onClick={downloadAllImages}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          size="lg"
                        >
                          {selectedFiles.filter(f => f.status === "success").length === 1 ? (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download {selectedTarget.toUpperCase()}
                            </>
                          ) : (
                            <>
                              <Package className="w-4 h-4 mr-2" />
                              Download as ZIP ({selectedFiles.filter(f => f.status === "success").length} files)
                            </>
                          )}
                        </Button>
                        <ShareDialog
                          fileName={selectedFiles.filter(f => f.status === "success")[0]?.file.name || "converted-image"}
                          fileSize={selectedFiles.filter(f => f.status === "success").length + " files"}
                          toolName="Image Converter"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <ProcessingIndicator status={status} />

              {status === "error" && (
                <Card className="p-4 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">Conversion Failed</h3>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      An error occurred while converting your image. Please try again with a different image.
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