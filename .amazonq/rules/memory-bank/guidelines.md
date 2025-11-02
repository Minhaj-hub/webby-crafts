# Smart Tools - Development Guidelines

## Code Quality Standards

### TypeScript Usage (100% of analyzed files)
- **Strict Type Safety**: All components use explicit TypeScript types and interfaces
- **Type Annotations**: Function parameters, return types, and state variables are properly typed
- **Generic Types**: Extensive use of React generics like `React.ComponentProps<"div">` and `React.ElementRef<typeof Button>`
- **Type Guards**: Conditional type checking with proper null/undefined handling

### Import Organization Pattern (100% of files)
```typescript
// 1. External libraries first
import * as React from "react";
import { useState, useRef, useEffect } from "react";

// 2. UI libraries and third-party components
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

// 3. Internal UI components with @/ alias
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 4. Custom hooks and utilities
import { useAnalytics } from "@/hooks/useAnalytics";
import { cn } from "@/lib/utils";
```

### Component Architecture Patterns

#### forwardRef Pattern (80% of UI components)
```typescript
const ComponentName = React.forwardRef<
  HTMLElementType,
  React.ComponentProps<"element"> & CustomProps
>(({ className, ...props }, ref) => {
  return (
    <element
      ref={ref}
      className={cn("base-classes", className)}
      {...props}
    />
  );
});
ComponentName.displayName = "ComponentName";
```

#### Custom Hook Pattern (100% of hooks)
```typescript
export const useHookName = () => {
  // State and logic
  const [state, setState] = useState();
  
  // Return object with methods
  return {
    methodName,
    anotherMethod,
    state
  };
};
```

## Styling and Design Standards

### Tailwind CSS Conventions (100% of components)
- **Utility-First Approach**: All styling done through Tailwind utility classes
- **Responsive Design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **CSS Variables Integration**: Custom properties for theming (`hsl(var(--primary))`)
- **Class Merging**: Use `cn()` utility for conditional and merged class names

### Design System Patterns
```typescript
// Color system using CSS variables
colors: {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  destructive: "hsl(var(--destructive))"
}

// Consistent spacing and sizing
className="p-4 gap-6 rounded-lg"
className="w-full max-w-4xl mx-auto"
```

### Component Variant System (60% of UI components)
```typescript
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        outline: "outline-classes"
      },
      size: {
        sm: "small-classes",
        lg: "large-classes"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
```

## State Management Patterns

### React State Hooks (100% of stateful components)
- **useState**: Primary state management for component-level state
- **useEffect**: Side effects, cleanup, and lifecycle management
- **useRef**: DOM references and mutable values
- **useCallback**: Memoized functions to prevent unnecessary re-renders
- **useMemo**: Expensive calculations and object memoization

### State Structure Pattern
```typescript
// Status-based state management
const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");

// File handling state
const [file, setFile] = useState<File | null>(null);
const [images, setImages] = useState<string[]>([]);
```

## Error Handling and User Feedback

### Toast Notification Pattern (100% of user-facing operations)
```typescript
import { toast } from "sonner";

// Success notifications
toast.success("Operation completed successfully!");

// Error notifications  
toast.error("Operation failed. Please try again.");

// Info notifications
toast.info("Additional information for user.");
```

### Error Boundary Pattern
```typescript
try {
  // Risky operation
  await processFile();
  setStatus("success");
} catch (error) {
  console.error("Operation error:", error);
  setStatus("error");
  toast.error("User-friendly error message");
}
```

## Accessibility Standards

### ARIA and Semantic HTML (80% of interactive components)
```typescript
// Screen reader support
<span className="sr-only">Descriptive text</span>

// Proper ARIA attributes
aria-label="Toggle Sidebar"
aria-disabled={disabled}
data-active={isActive}

// Semantic HTML elements
<main id="main-content">
<section id="tool-name">
```

### Keyboard Navigation Support
```typescript
// Keyboard shortcuts
React.useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === SHORTCUT_KEY && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleAction();
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [handleAction]);
```

## Performance Optimization Patterns

### Dynamic Imports (60% of heavy dependencies)
```typescript
// Lazy loading heavy libraries
const usePdfJs = () => {
  const [pdfjs, setPdfjs] = useState<any>(null);
  
  useEffect(() => {
    import("pdfjs-dist/build/pdf.worker.mjs?url").then((worker) => {
      import("pdfjs-dist").then((pdfjsLib) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
        setPdfjs(pdfjsLib);
      });
    });
  }, []);
  
  return pdfjs;
};
```

### Memoization Patterns
```typescript
// Memoized calculations
const width = React.useMemo(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`;
}, []);

// Memoized context values
const contextValue = React.useMemo(() => ({
  state, open, setOpen, toggleSidebar
}), [state, open, setOpen, toggleSidebar]);
```

## File Processing Standards

### File Handling Pattern (100% of file processing components)
```typescript
// File validation and processing
const handleFileSelect = (selectedFile: File) => {
  setFile(selectedFile);
  setStatus("idle");
  // Reset previous results
  setImages([]);
};

// Async file processing with progress tracking
const processFile = async () => {
  if (!file) return;
  
  setStatus("processing");
  try {
    // Process file
    const result = await performOperation(file);
    setStatus("success");
    logFileConversion(file.type, file.size);
  } catch (error) {
    setStatus("error");
    toast.error("Processing failed");
  }
};
```

## Analytics Integration

### Event Tracking Pattern (100% of user interactions)
```typescript
// Custom analytics hook usage
const { logToolUsage, logFileConversion } = useAnalytics();

// Track user actions
logToolUsage("tool_name");
logFileConversion(file.type, file.size);

// Conditional analytics calls
if (analytics) {
  logEvent(analytics, "event_name", eventParams);
}
```

## Configuration and Environment

### Environment Variables Pattern
```typescript
// Vite environment variables
import.meta.env.VITE_FIREBASE_MEASUREMENT_ID

// Type-safe environment access
const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

### Configuration Objects
```typescript
// Constants at module level
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";

// Configuration objects
const queryClient = new QueryClient();
```