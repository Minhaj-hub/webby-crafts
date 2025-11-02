import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImageCompressor } from "@/components/ImageCompressor";
import { ImageConverter } from "@/components/ImageConverter";
import { ImageToPdf } from "@/components/ImageToPdf";
import { PdfToImage } from "@/components/PdfToImage";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { InFeedAd } from "@/components/InFeedAd";
import { ContentSection } from "@/components/ContentSection";
import { FeatureAd } from "@/components/FeatureAds";
import { SkipToContent } from "@/components/SkipToContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileImage, RefreshCw, FileText, Images } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Navbar />
      
      {/* Main Content */}
      <main id="main-content">
        <div>
          <Hero />
          

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;