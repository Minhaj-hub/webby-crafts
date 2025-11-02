import { BookOpen, Lightbulb, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ContentSection = () => {
  const articles = [
    {
      title: "Understanding Image Compression",
      excerpt: "Learn the fundamentals of image compression, including lossy vs lossless techniques, and how to choose the right compression level for your needs.",
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      link: "/blog"
    },
    {
      title: "Complete Guide to Image Formats",
      excerpt: "Discover when to use JPEG, PNG, WebP, and other formats. Understanding format differences helps you make better decisions for web and print.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      link: "/tutorials"
    },
    {
      title: "Privacy and Security in File Processing",
      excerpt: "Why local processing matters for your privacy. Learn how Convert Kitty keeps your files secure by processing everything in your browser.",
      icon: <Shield className="w-6 h-6 text-primary" />,
      link: "/about"
    },
    {
      title: "Optimizing Images for Web Performance",
      excerpt: "Boost your website speed with proper image optimization. Learn techniques to reduce load times while maintaining visual quality.",
      icon: <Zap className="w-6 h-6 text-primary" />,
      link: "/blog"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Learn More About File Processing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover best practices, tips, and techniques for image compression, 
              format conversion, and PDF management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {articles.map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    {article.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <a 
                  href={article.link}
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Learn more →
                </a>
              </Card>
            ))}
          </div>

          {/* Additional Content */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Why Choose Convert Kitty?
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Convert Kitty stands out in the crowded field of online file processing tools 
                  by prioritizing your privacy and security. Unlike many competitors, we process 
                  all files locally in your browser, ensuring your sensitive documents never 
                  leave your device.
                </p>
                <p>
                  Our tools are designed with both beginners and professionals in mind. Whether 
                  you're optimizing images for a personal blog or processing hundreds of files 
                  for a business project, our intuitive interface and powerful algorithms 
                  deliver consistent, high-quality results.
                </p>
                <p>
                  We support all major image formats and provide advanced compression options 
                  that let you fine-tune the balance between file size and quality. Our PDF 
                  tools make it easy to combine images into professional documents or extract 
                  images for further editing.
                </p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Common Use Cases
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Web Developers</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimize images for faster website loading and better user experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Content Creators</h4>
                  <p className="text-sm text-muted-foreground">
                    Compress images for social media while maintaining visual quality.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Business Professionals</h4>
                  <p className="text-sm text-muted-foreground">
                    Create professional PDF documents from multiple images and presentations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Students & Researchers</h4>
                  <p className="text-sm text-muted-foreground">
                    Convert and organize documents for academic projects and research.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Photographers</h4>
                  <p className="text-sm text-muted-foreground">
                    Batch process images for client delivery and portfolio optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};