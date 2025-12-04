import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Step {
  name: string;
  text: string;
  image?: string;
}

interface SchemaMarkupProps {
  toolName: string;
  toolDescription: string;
  toolUrl: string;
  faqs?: FAQItem[];
  howToSteps?: Step[];
  operatingSystem?: string;
  applicationCategory?: string;
}

export const SchemaMarkup = ({
  toolName,
  toolDescription,
  toolUrl,
  faqs = [],
  howToSteps = [],
  operatingSystem = "Any",
  applicationCategory = "MultimediaApplication",
}: SchemaMarkupProps) => {
  useEffect(() => {
    const schemas: any[] = [];

    // SoftwareApplication Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": toolName,
      "description": toolDescription,
      "url": toolUrl,
      "applicationCategory": applicationCategory,
      "operatingSystem": operatingSystem,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });

    // FAQPage Schema
    if (faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }

    // HowTo Schema
    if (howToSteps.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use ${toolName}`,
        "step": howToSteps.map((step, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": step.name,
          "text": step.text,
          ...(step.image && { "image": step.image })
        }))
      });
    }

    // Inject schemas into head
    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    return () => {
      scriptElements.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [toolName, toolDescription, toolUrl, faqs, howToSteps, operatingSystem, applicationCategory]);

  return null;
};
