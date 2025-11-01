import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats: string[];
  maxSize?: number;
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export const FileUploadZone = ({
  onFileSelect,
  acceptedFormats,
  maxSize = 10 * 1024 * 1024, // 10MB default
  icon,
  title,
  description,
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    
    if (!acceptedFormats.includes(`.${fileExtension}`)) {
      toast.error(`File type not supported. Please upload: ${acceptedFormats.join(", ")}`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`File too large. Maximum size is ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center
            transition-all duration-300 cursor-pointer
            ${isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${title}`)?.click()}
        >
          <input
            id={`file-input-${title}`}
            type="file"
            className="hidden"
            accept={acceptedFormats.join(",")}
            onChange={handleFileInput}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              {icon || <Upload className="w-8 h-8 text-primary" />}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            
            <Button variant="outline" size="sm" className="pointer-events-none">
              Choose File
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Supported formats: {acceptedFormats.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="border-2 border-success rounded-xl p-6 bg-success/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                {icon || <Upload className="w-6 h-6 text-success" />}
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
