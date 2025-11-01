import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImageCompressor } from "@/components/ImageCompressor";
import { ImageConverter } from "@/components/ImageConverter";
import { PdfToImage } from "@/components/PdfToImage";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ImageCompressor />
      <ImageConverter />
      <PdfToImage />
      <Footer />
    </div>
  );
};

export default Index;
