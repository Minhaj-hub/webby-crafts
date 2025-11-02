import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, BookOpen, Download, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "How to Compress Images for Web",
      description: "Step-by-step guide to optimize images for faster website loading",
      icon: <Settings className="w-6 h-6" />,
      steps: [
        "Upload your image using the drag-and-drop interface",
        "Adjust the quality slider to find the right balance",
        "Preview the compression results",
        "Download your optimized image",
        "Test the image on your website for performance"
      ],
      tips: [
        "Start with 80% quality for most web images",
        "Use JPEG for photos, PNG for graphics with transparency",
        "Always keep a backup of your original images",
        "Test different quality levels to find the sweet spot"
      ]
    },
    {
      id: 2,
      title: "Converting Image Formats",
      description: "Learn when and how to convert between different image formats",
      icon: <Play className="w-6 h-6" />,
      steps: [
        "Select the image you want to convert",
        "Choose your desired output format",
        "Adjust quality settings if needed",
        "Click convert to process the image",
        "Download your converted file"
      ],
      tips: [
        "Convert to WebP for modern browsers and better compression",
        "Use PNG for images that need transparency",
        "JPEG is best for photographs and complex images",
        "Consider your target audience's browser support"
      ]
    },
    {
      id: 3,
      title: "Creating PDFs from Images",
      description: "Combine multiple images into a single PDF document",
      icon: <BookOpen className="w-6 h-6" />,
      steps: [
        "Upload multiple images in the correct order",
        "Arrange images as needed",
        "Choose page orientation (portrait/landscape)",
        "Set compression level for file size optimization",
        "Generate and download your PDF"
      ],
      tips: [
        "Ensure images are high resolution for better PDF quality",
        "Keep file sizes reasonable for easy sharing",
        "Use consistent image dimensions when possible",
        "Consider the final use case (print vs digital)"
      ]
    },
    {
      id: 4,
      title: "Extracting Images from PDFs",
      description: "How to extract high-quality images from PDF documents",
      icon: <Download className="w-6 h-6" />,
      steps: [
        "Upload your PDF file",
        "Select which pages to extract images from",
        "Choose output image format",
        "Set quality preferences",
        "Download extracted images"
      ],
      tips: [
        "Higher quality PDFs yield better extracted images",
        "Choose PNG for graphics, JPEG for photos",
        "Check image resolution before final download",
        "Some PDFs may have embedded compression"
      ]
    }
  ];

  const faqs = [
    {
      question: "What's the difference between lossy and lossless compression?",
      answer: "Lossy compression reduces file size by removing some image data, which may slightly reduce quality. Lossless compression reduces file size without any quality loss but typically achieves smaller size reductions."
    },
    {
      question: "Which image format should I use for my website?",
      answer: "For photographs, use JPEG with 80-90% quality. For graphics with transparency, use PNG. For modern browsers, WebP offers the best compression while maintaining quality."
    },
    {
      question: "How much can I compress an image before quality becomes noticeable?",
      answer: "This depends on the image content and intended use. Generally, 70-80% quality for JPEG provides a good balance. Always preview the result and adjust based on your specific needs."
    },
    {
      question: "Are my files safe when using online compression tools?",
      answer: "With Convert Kitty, all processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Can I batch process multiple images at once?",
      answer: "Yes, our tools support batch processing for multiple images, making it efficient to process large numbers of files quickly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Tutorials & Guides</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to get the most out of our image processing and PDF tools
            </p>
          </div>

          {/* Tutorials Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Step-by-Step Tutorials</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="p-6 shadow-lg">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {tutorial.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {tutorial.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        {tutorial.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Pro Tips:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {tutorial.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-16 bg-card p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">Best Practices for File Processing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Image Optimization</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Always backup original files before processing</li>
                  <li>• Choose appropriate formats for different use cases</li>
                  <li>• Test compression levels to find optimal balance</li>
                  <li>• Consider your target audience and devices</li>
                  <li>• Use modern formats when browser support allows</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">PDF Management</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Organize images before creating PDFs</li>
                  <li>• Consider final document size and sharing method</li>
                  <li>• Use appropriate compression for intended use</li>
                  <li>• Maintain consistent formatting across pages</li>
                  <li>• Test PDF compatibility across different viewers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Tutorials;