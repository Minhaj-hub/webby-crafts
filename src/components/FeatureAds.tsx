import { useEffect } from "react";

// Google Ads - Commented out until website gets traffic
/*
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface FeatureAdProps {
  position: 'left' | 'right';
  feature: 'compress' | 'convert' | 'imagetopdf' | 'pdftoimage';
}

export const FeatureAd = ({ position, feature }: FeatureAdProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`fixed ${position === 'left' ? 'left-0' : 'right-0'} w-32 z-40 hidden xl:block`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8378250461565454"
        data-ad-slot="8922437973"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
*/

// Placeholder export until ads are enabled
interface FeatureAdProps {
  position: 'left' | 'right';
  feature: 'compress' | 'convert' | 'imagetopdf' | 'pdftoimage';
}

export const FeatureAd = ({ position, feature }: FeatureAdProps) => null;
