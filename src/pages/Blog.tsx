import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Compress Images Without Losing Quality: A Complete Guide",
      excerpt: "Learn the best techniques and tools for reducing image file sizes while maintaining visual quality. Perfect for web optimization and storage management.",
      content: `
        <h2>Why Image Compression Matters</h2>
        <p>In today's digital world, image compression is crucial for website performance, storage efficiency, and user experience. Large image files can slow down your website, consume valuable storage space, and frustrate users with slow loading times.</p>
        
        <h2>Types of Image Compression</h2>
        <h3>Lossy Compression</h3>
        <p>Lossy compression reduces file size by permanently removing some image data. JPEG is the most common lossy format, ideal for photographs and complex images with many colors.</p>
        
        <h3>Lossless Compression</h3>
        <p>Lossless compression reduces file size without losing any image data. PNG is a popular lossless format, perfect for images with few colors, text, or transparency.</p>
        
        <h2>Best Practices for Image Compression</h2>
        <ul>
          <li>Choose the right format: JPEG for photos, PNG for graphics with transparency</li>
          <li>Optimize quality settings: 80-90% quality usually provides the best balance</li>
          <li>Resize images to appropriate dimensions before compression</li>
          <li>Use modern formats like WebP when supported</li>
          <li>Test different compression levels to find the optimal balance</li>
        </ul>
        
        <h2>Tools and Techniques</h2>
        <p>There are various tools available for image compression, from online tools like Convert Kitty to professional software. Online tools offer convenience and privacy when processing is done locally in your browser.</p>
      `,
      author: "Convert Kitty Team",
      date: "2024-12-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding Image Formats: JPEG vs PNG vs WebP",
      excerpt: "A comprehensive comparison of popular image formats to help you choose the right one for your needs.",
      content: `
        <h2>JPEG Format</h2>
        <p>JPEG (Joint Photographic Experts Group) is the most widely used image format for photographs and complex images. It uses lossy compression to achieve small file sizes.</p>
        
        <h3>When to Use JPEG:</h3>
        <ul>
          <li>Photographs with many colors</li>
          <li>Images where small quality loss is acceptable</li>
          <li>Web images that need fast loading</li>
          <li>Social media uploads</li>
        </ul>
        
        <h2>PNG Format</h2>
        <p>PNG (Portable Network Graphics) is a lossless format that supports transparency. It's ideal for graphics, logos, and images that need to maintain perfect quality.</p>
        
        <h3>When to Use PNG:</h3>
        <ul>
          <li>Images with transparency</li>
          <li>Graphics and logos</li>
          <li>Images with text</li>
          <li>When quality is more important than file size</li>
        </ul>
        
        <h2>WebP Format</h2>
        <p>WebP is a modern format developed by Google that provides superior compression compared to JPEG and PNG while maintaining high quality.</p>
        
        <h3>Benefits of WebP:</h3>
        <ul>
          <li>25-35% smaller file sizes than JPEG</li>
          <li>Supports both lossy and lossless compression</li>
          <li>Supports transparency like PNG</li>
          <li>Supports animation like GIF</li>
        </ul>
      `,
      author: "Convert Kitty Team",
      date: "2024-12-10",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "PDF Management: Converting Images to PDF and Back",
      excerpt: "Learn how to efficiently work with PDF files, including converting images to PDF and extracting images from PDF documents.",
      content: `
        <h2>Why Convert Images to PDF?</h2>
        <p>Converting images to PDF format offers several advantages: document preservation, easy sharing, professional presentation, and universal compatibility across devices and platforms.</p>
        
        <h2>Best Practices for Image to PDF Conversion</h2>
        <ul>
          <li>Ensure images are high resolution for better PDF quality</li>
          <li>Organize images in the correct order before conversion</li>
          <li>Consider page orientation (portrait vs landscape)</li>
          <li>Optimize file size for intended use (web vs print)</li>
        </ul>
        
        <h2>Extracting Images from PDFs</h2>
        <p>Sometimes you need to extract images from PDF documents for editing or separate use. This process maintains the original image quality when done correctly.</p>
        
        <h3>Common Use Cases:</h3>
        <ul>
          <li>Extracting graphics for presentations</li>
          <li>Recovering images from old documents</li>
          <li>Converting PDF pages to images for web use</li>
          <li>Creating thumbnails from PDF content</li>
        </ul>
        
        <h2>Tips for Better Results</h2>
        <p>When working with PDF conversions, always check the output quality and file size. Use appropriate compression settings based on your intended use - higher quality for printing, optimized compression for web sharing.</p>
      `,
      author: "Convert Kitty Team",
      date: "2024-12-05",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="File Processing Blog - Image Compression & PDF Conversion Guides"
        description="Learn tips, guides, and best practices for image compression, format conversion, and PDF management. Expert advice for optimizing your files."
        keywords="file processing blog, image compression guide, PDF conversion tips, format conversion tutorials, file optimization"
        canonicalUrl="https://convertkit.web.app/blog"
      />
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">File Processing Blog</h1>
            <p className="text-xl text-muted-foreground">
              Tips, guides, and best practices for image compression, format conversion, and PDF management
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div 
                    className="prose prose-lg max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  <div className="pt-4 border-t border-border">
                    <a 
                      href="#" 
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;