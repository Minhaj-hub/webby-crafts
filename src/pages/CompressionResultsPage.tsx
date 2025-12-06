import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, Eye, Package, SplitSquareHorizontal, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import JSZip from "jszip";

interface CompressionData {
  files: File[];
  quality: number;
  startTime?: number;
}

interface CompressedResult {
  file: File;
  original: string;
  compressed: string;
  originalSize: number;
  compressedSize: number;
}

const CompressionResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as CompressionData;
  
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [status, setStatus] = useState<"processing" | "completed" | "error">("processing");
  const [results, setResults] = useState<CompressedResult[]>([]);
  const [compressionTime, setCompressionTime] = useState(0);
  // const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    if (!data) {
      navigate("/compress-image");
      return;
    }
    compressImages();
  }, [data]);

  const compressImages = async () => {
    if (!data) return;
    
    const compressedResults: CompressedResult[] = [];
    const processStart = Date.now();
    
    try {
      for (let i = 0; i < data.files.length; i++) {
        const file = data.files[i];
        setCurrentFile(i + 1);
        setProgress(((i + 1) / data.files.length) * 100);
        
        const img = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        ctx.drawImage(img, 0, 0);

        const quality = data.quality / 100;
        
        // Always use JPEG for compression as it respects quality parameter
        // This ensures actual file size reduction
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/jpeg", quality);
        });

        if (blob) {
          const originalUrl = URL.createObjectURL(file);
          const compressedUrl = URL.createObjectURL(blob);
          
          console.log(`Image ${i + 1}: Original ${file.size} bytes, Compressed ${blob.size} bytes`);
          
          compressedResults.push({
            file,
            original: originalUrl,
            compressed: compressedUrl,
            originalSize: file.size,
            compressedSize: blob.size
          });
        }
      }
      
      const processEnd = Date.now();
      setCompressionTime((processEnd - processStart) / 1000); // Convert to seconds
      setResults(compressedResults);
      setStatus("completed");
      toast.success(`${compressedResults.length} images compressed successfully!`);
    } catch (error) {
      console.error("Compression error:", error);
      setStatus("error");
      toast.error("Compression failed. Please try again.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
  };

  const downloadSingle = (result: CompressedResult) => {
    const link = document.createElement("a");
    link.href = result.compressed;
    link.download = `compressed-${result.file.name}`;
    link.click();
  };

  const downloadAsZip = async () => {
    if (results.length === 0) return;
    
    try {
      const zip = new JSZip();
      
      for (const result of results) {
        const response = await fetch(result.compressed);
        const blob = await response.blob();
        zip.file(`compressed-${result.file.name}`, blob);
      }
      
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = "compressed-images.zip";
      link.click();
      
      toast.success("ZIP file downloaded successfully!");
    } catch (error) {
      toast.error("Failed to create ZIP file");
    }
  };

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalCompressed = results.reduce((sum, r) => sum + r.compressedSize, 0);
  const totalReduction = totalOriginal > 0 ? ((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1) : 0;

  if (!data) return null;

  return (
    <>
      <SEOHead 
        title="Compression Results - Image Compressor"
        description="View your compressed images with before/after comparison and download options."
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" onClick={() => navigate("/compress-image")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Compressor
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Compression Results</h1>
                  <p className="text-muted-foreground">
                    {status === "processing" ? "Processing your images..." : 
                     status === "completed" ? `${results.length} images compressed` : "Compression failed"}
                  </p>
                </div>
              </div>

              {/* Error State */}
              {status === "error" && (
                <Card className="p-6 mb-8 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Compression Failed</h3>
                    <p className="text-red-700 dark:text-red-400 mb-4">
                      An error occurred while compressing your images. Please try again with different images or refresh the page.
                    </p>
                    <Button onClick={() => navigate("/compress-image")}>Go Back to Compressor</Button>
                  </div>
                </Card>
              )}

              {/* Progress */}
              {status === "processing" && (
                <Card className="p-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Processing image {currentFile} of {data.files.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </Card>
              )}

              {/* Results Summary */}
              {status === "completed" && (
                <>
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <Card className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Original</p>
                      <p className="text-xl font-bold">{formatFileSize(totalOriginal)}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Compressed</p>
                      <p className="text-xl font-bold text-success">{formatFileSize(totalCompressed)}</p>
                    </Card>
                    <Card className="p-4 text-center bg-success/10 border-success/20">
                      <p className="text-sm text-muted-foreground mb-1">Total Saved</p>
                      <p className="text-xl font-bold text-success">{totalReduction}%</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Images</p>
                      <p className="text-xl font-bold">{results.length}</p>
                    </Card>
                  </div>

                  {/* Download Actions */}
                  <div className="flex justify-end gap-4 mb-8">
                    {results.length > 1 && (
                      <Button onClick={downloadAsZip} className="bg-success hover:bg-success/90">
                        <Package className="w-4 h-4 mr-2" />
                        Download as ZIP
                      </Button>
                    )}
                  </div>

                  {/* Individual Results */}
                  <div className="space-y-4">
                    {results.map((result, index) => {
                      const reduction = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);
                      
                      return (
                    <Card key={index} className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            
                            {/* Image Comparison */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-center">Original</p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div className="relative cursor-pointer group">
                                      <img 
                                        src={result.original} 
                                        alt="Original"
                                        className="w-full h-32 object-cover rounded border"
                                      />
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                        <Eye className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <img src={result.original} alt="Original" className="max-w-full max-h-[80vh] object-contain mx-auto" />
                                  </DialogContent>
                                </Dialog>
                                <p className="text-xs text-center text-muted-foreground">
                                  {formatFileSize(result.originalSize)}
                                </p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-center">Compressed</p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div className="relative cursor-pointer group">
                                      <img 
                                        src={result.compressed} 
                                        alt="Compressed"
                                        className="w-full h-32 object-cover rounded border"
                                      />
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                        <Eye className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <img src={result.compressed} alt="Compressed" className="max-w-full max-h-[80vh] object-contain mx-auto" />
                                  </DialogContent>
                                </Dialog>
                                <p className="text-xs text-center text-muted-foreground">
                                  {formatFileSize(result.compressedSize)}
                                </p>
                              </div>
                            </div>

                            {/* Details & Actions */}
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-medium mb-2">{result.file.name}</h3>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Size reduction:</span>
                                    <Badge className={reduction === '-0.0' || parseFloat(reduction as string) < 0 ? "bg-yellow-500 text-yellow-foreground" : "bg-success text-success-foreground"}>
                                      {reduction}%
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Quality:</span>
                                    <span>{data.quality}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" className="flex-1">
                                      <SplitSquareHorizontal className="w-4 h-4 mr-2" />
                                      Compare
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-6xl">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <p className="text-center font-medium">Original ({formatFileSize(result.originalSize)})</p>
                                        <img src={result.original} alt="Original" className="w-full max-h-[70vh] object-contain rounded border" />
                                      </div>
                                      <div className="space-y-2">
                                        <p className="text-center font-medium">Compressed ({formatFileSize(result.compressedSize)})</p>
                                        <img src={result.compressed} alt="Compressed" className="w-full max-h-[70vh] object-contain rounded border" />
                                      </div>
                                    </div>
                                    <div className="text-center mt-4">
                                      <Badge className="bg-success text-success-foreground">
                                        {reduction}% size reduction
                                      </Badge>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                {/* Zoom functionality commented out for now */}
                                {/*
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" className="flex-1" onClick={() => setZoomLevel(100)}>
                                      <SplitSquareHorizontal className="w-4 h-4 mr-2" />
                                      Compare
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                                    <div className="flex flex-col h-full">
                                      <div className="grid grid-cols-2 gap-4 flex-1 overflow-auto">
                                        <div className="space-y-2">
                                          <p className="text-center font-medium">Original ({formatFileSize(result.originalSize)})</p>
                                          <div className="overflow-auto max-h-[60vh] border rounded">
                                            <img 
                                              src={result.original} 
                                              alt="Original" 
                                              className="transition-transform duration-200" 
                                              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
                                            />
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <p className="text-center font-medium">Compressed ({formatFileSize(result.compressedSize)})</p>
                                          <div className="overflow-auto max-h-[60vh] border rounded">
                                            <img 
                                              src={result.compressed} 
                                              alt="Compressed" 
                                              className="transition-transform duration-200" 
                                              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
                                          disabled={zoomLevel <= 25}
                                        >
                                          <ZoomOut className="w-4 h-4" />
                                        </Button>
                                        
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-mono min-w-[3rem] text-center">{zoomLevel}%</span>
                                        </div>
                                        
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => setZoomLevel(Math.min(400, zoomLevel + 25))}
                                          disabled={zoomLevel >= 400}
                                        >
                                          <ZoomIn className="w-4 h-4" />
                                        </Button>
                                        
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => setZoomLevel(100)}
                                        >
                                          <RotateCcw className="w-4 h-4" />
                                        </Button>
                                      </div>
                                      
                                      <div className="text-center mt-2">
                                        <Badge className="bg-success text-success-foreground">
                                          {reduction}% size reduction
                                        </Badge>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                */}
                                
                                <Button 
                                  onClick={() => downloadSingle(result)}
                                  className="flex-1"
                                  variant="outline"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CompressionResultsPage;