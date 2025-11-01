import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  status: "idle" | "processing" | "success" | "error";
  progress?: number;
  message?: string;
}

export const ProcessingIndicator = ({
  status,
  progress = 0,
  message,
}: ProcessingIndicatorProps) => {
  if (status === "idle") return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3">
        {status === "processing" && (
          <>
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-sm font-medium text-foreground">
              {message || "Processing..."}
            </span>
          </>
        )}
        
        {status === "success" && (
          <>
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">
              {message || "Complete!"}
            </span>
          </>
        )}
        
        {status === "error" && (
          <>
            <XCircle className="w-5 h-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              {message || "Error occurred"}
            </span>
          </>
        )}
      </div>
      
      {status === "processing" && (
        <Progress value={progress} className="h-2" />
      )}
    </div>
  );
};
