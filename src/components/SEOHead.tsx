import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEOHead = ({ 
  title = "Convert Kitty - Free Image Compressor & PDF Tools",
  description = "Free online image compressor, format converter & PDF tools. Compress JPEG, PNG, WebP images. Convert formats. Create PDFs. 100% private - processing in browser.",
  keywords = "image compressor, image converter, PDF tools, JPEG compressor, PNG compressor, WebP converter, image optimization, file converter, online tools",
  canonicalUrl = "https://convert-kitty.web.app/",
  ogImage = "https://convert-kitty.web.app/convert-kitty.png"
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    const updateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', ogImage);
    updateProperty('og:url', canonicalUrl);
  }, [title, description, keywords, canonicalUrl, ogImage]);
  
  return null;
};