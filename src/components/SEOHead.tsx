import { useEffect } from "react";
import { APP_CONFIG, getCanonicalUrl } from "@/config/app.config";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEOHead = ({ 
  title = `${APP_CONFIG.siteName} - Free Image Compressor & PDF Tools`,
  description = APP_CONFIG.siteDescription,
  keywords = "image compressor, image converter, PDF tools, JPEG compressor, PNG compressor, WebP converter, image optimization, file converter, online tools",
  canonicalUrl = getCanonicalUrl("/"),
  ogImage = getCanonicalUrl("/convert-kit.png")
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
    
    // Standard Meta Tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    
    // Open Graph Tags
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', ogImage);
    updateProperty('og:url', canonicalUrl);
    updateProperty('og:type', 'website');
    
    // Twitter Card Tags
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    updateMeta('twitter:card', 'summary_large_image');
  }, [title, description, keywords, canonicalUrl, ogImage]);
  
  return null;
};