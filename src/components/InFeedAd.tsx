import { useEffect } from "react";

// Google Ads - Commented out until website gets traffic
/*
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const InFeedAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="w-full my-8">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-8378250461565454"
        data-ad-slot="7824978724"
      />
    </div>
  );
};
*/

// Placeholder export until ads are enabled
export const InFeedAd = () => null;
