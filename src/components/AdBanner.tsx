import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8378250461565454"
      data-ad-slot="8922437973"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};