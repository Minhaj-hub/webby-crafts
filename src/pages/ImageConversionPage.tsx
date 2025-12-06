import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageConverter, ImageFormat } from "@/components/ImageConverter";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, FileDown, Smartphone, Layers, Sparkles, Share2, Image } from "lucide-react";
import { useMemo } from "react";
import { getCanonicalUrl } from "@/config/app.config";

// Configuration for each conversion type
interface ConversionConfig {
    sourceFormat: string;
    targetFormat: ImageFormat;
    acceptedInputFormats: string[];
    seo: {
        title: string;
        description: string;
        keywords: string;
    };
    hero: {
        title: string;
        subtitle: string;
        badges: string[];
    };
    toolSection: {
        title: string;
        description: string;
    };
    contentSection: {
        heading: string;
        paragraphs: string[];
    };
    features: {
        title: string;
        items: {
            icon: "FileDown" | "Zap" | "Smartphone" | "Shield" | "Layers" | "Sparkles" | "Share2" | "Image";
            title: string;
            description: string;
        }[];
    };
    faqs: {
        question: string;
        answer: string;
    }[];
    howToSteps: {
        name: string;
        text: string;
    }[];
}

const iconMap = {
    FileDown,
    Zap,
    Smartphone,
    Shield,
    Layers,
    Sparkles,
    Share2,
    Image,
};

// Helper function to generate common FAQs
const generateCommonFaqs = (source: string, target: string) => [
    {
        question: `Is this ${source} to ${target} converter free?`,
        answer: `Yes, our ${source} to ${target} converter is 100% free to use with no hidden fees, subscriptions, or limits on the number of conversions.`
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. All conversion happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security."
    },
    {
        question: "Does it work on mobile?",
        answer: "Yes, our converter is fully responsive and works flawlessly on all devices including iPhones, Android phones, and tablets."
    },
    {
        question: "How many images can I convert?",
        answer: "There's no limit! You can convert as many images as you need, one at a time."
    },
];

// Helper function to generate how-to steps
const generateHowToSteps = (source: string, target: string) => [
    { name: `Upload ${source} Image`, text: `Drag and drop your ${source} file or click to select it from your device.` },
    { name: "Choose Format", text: `Select ${target} as your output format (or change to any other format).` },
    { name: `Download ${target}`, text: `Click convert and download your new ${target} image file instantly.` },
];

// Helper function to generate common features
const generateCommonFeatures = (benefit1: { icon: "FileDown" | "Zap" | "Smartphone" | "Shield" | "Layers" | "Sparkles" | "Share2" | "Image"; title: string; description: string }, benefit2: { icon: "FileDown" | "Zap" | "Smartphone" | "Shield" | "Layers" | "Sparkles" | "Share2" | "Image"; title: string; description: string }) => ({
    title: "Why Use Our Converter?",
    items: [
        benefit1,
        benefit2,
        { icon: "Smartphone" as const, title: "Works Everywhere", description: "Convert on any device – desktop, tablet, or mobile phone" },
        { icon: "Shield" as const, title: "100% Secure", description: "All processing is done locally in your browser. Privacy guaranteed." },
    ],
});

// All conversion configurations
const conversionConfigs: Record<string, ConversionConfig> = {
    // PNG conversions
    "png-to-jpg": {
        sourceFormat: "PNG",
        targetFormat: "jpeg",
        acceptedInputFormats: [".png"],
        seo: {
            title: "Free PNG to JPG Converter — Convert PNG to JPEG Online",
            description: "Convert PNG to JPG online for free. Fast, secure, and high-quality PNG to JPEG conversion. No signup required. Reduce file size instantly.",
            keywords: "png to jpg, convert png to jpg, png to jpeg, free png converter, online image converter",
        },
        hero: {
            title: "Free PNG to JPG Converter",
            subtitle: "Convert your PNG images to JPG format instantly. Reduce file sizes while maintaining excellent quality. Perfect for web and email.",
            badges: ["100% Free", "Instant Conversion", "No Signup"],
        },
        toolSection: {
            title: "PNG to JPG Converter",
            description: "Upload your PNG image to convert it to JPG format",
        },
        contentSection: {
            heading: "Best Free PNG to JPG Converter Online",
            paragraphs: [
                "Looking to **convert PNG to JPG** quickly and easily? Our free online converter is the perfect solution. PNG files are great for transparency and lossless quality, but they often result in larger file sizes. By converting to **JPG (JPEG)**, you can significantly reduce file size, making your images perfect for websites, emails, and social media.",
                "Our tool uses advanced algorithms to ensure the **highest possible quality** during conversion. While JPEG is a lossy format, we use a quality setting of 95% to keep your images looking sharp and vibrant. The conversion happens **entirely in your browser**, so your files stay private and secure.",
                "Whether you're a web developer optimizing images for faster page loads, a blogger sharing photos, or anyone needing to reduce image file sizes, our **PNG to JPG converter** is fast, free, and incredibly easy to use.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "FileDown", title: "Smaller File Size", description: "JPG files are often 50-80% smaller than PNG, saving storage space" },
            { icon: "Zap", title: "Faster Loading", description: "Smaller images mean faster website loading times and better SEO" }
        ),
        faqs: [
            ...generateCommonFaqs("PNG", "JPG"),
            { question: "What happens to transparency?", answer: "JPEG does not support transparency. Transparent areas in your PNG will be replaced with a white background." },
            { question: "Will quality be reduced?", answer: "JPEG is lossy, but we use 95% quality to minimize visible loss. For most uses, the difference is imperceptible." },
        ],
        howToSteps: generateHowToSteps("PNG", "JPG"),
    },
    "png-to-webp": {
        sourceFormat: "PNG",
        targetFormat: "webp",
        acceptedInputFormats: [".png"],
        seo: {
            title: "Free PNG to WebP Converter — Convert PNG to WebP Online",
            description: "Convert PNG to WebP online for free. Get smaller file sizes with better quality. Modern format for faster websites. No signup required.",
            keywords: "png to webp, convert png to webp, free png converter, webp converter, online image converter",
        },
        hero: {
            title: "Free PNG to WebP Converter",
            subtitle: "Convert your PNG images to WebP format. Get superior compression with excellent quality. Perfect for modern websites.",
            badges: ["Superior Compression", "Modern Format", "No Signup"],
        },
        toolSection: {
            title: "PNG to WebP Converter",
            description: "Upload your PNG image to convert it to WebP format",
        },
        contentSection: {
            heading: "Best Free PNG to WebP Converter Online",
            paragraphs: [
                "Convert your **PNG images to WebP** format for superior web performance. WebP is a modern image format developed by Google that provides **better compression than PNG** while maintaining excellent quality.",
                "WebP files are typically **25-35% smaller** than equivalent PNG files, making them ideal for websites where page speed is crucial. Our converter processes everything **in your browser** for maximum privacy.",
                "Whether you're optimizing images for your website, reducing storage usage, or improving page load times, our **PNG to WebP converter** delivers fast, high-quality results.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "FileDown", title: "Superior Compression", description: "WebP files are 25-35% smaller than PNG with similar quality" },
            { icon: "Zap", title: "Faster Websites", description: "Smaller images mean better Core Web Vitals and SEO rankings" }
        ),
        faqs: [
            ...generateCommonFaqs("PNG", "WebP"),
            { question: "Does WebP support transparency?", answer: "Yes! WebP supports transparency just like PNG, so your transparent images will convert perfectly." },
            { question: "Is WebP widely supported?", answer: "Yes, WebP is supported by all modern browsers including Chrome, Firefox, Edge, and Safari." },
        ],
        howToSteps: generateHowToSteps("PNG", "WebP"),
    },
    "png-to-gif": {
        sourceFormat: "PNG",
        targetFormat: "gif",
        acceptedInputFormats: [".png"],
        seo: {
            title: "Free PNG to GIF Converter — Convert PNG to GIF Online",
            description: "Convert PNG to GIF online for free. Create GIF images from your PNG files. Fast and secure. No signup required.",
            keywords: "png to gif, convert png to gif, free png converter, gif converter, online image converter",
        },
        hero: {
            title: "Free PNG to GIF Converter",
            subtitle: "Convert your PNG images to GIF format. Perfect for creating simple graphics and icons. Fast and easy.",
            badges: ["100% Free", "Instant Conversion", "No Signup"],
        },
        toolSection: {
            title: "PNG to GIF Converter",
            description: "Upload your PNG image to convert it to GIF format",
        },
        contentSection: {
            heading: "Best Free PNG to GIF Converter Online",
            paragraphs: [
                "Need to **convert PNG to GIF**? Our free online converter makes it quick and easy. GIF is a classic format that's widely supported and perfect for simple graphics, icons, and images with limited colors.",
                "While GIF is limited to 256 colors, it's still useful for logos, icons, and simple graphics where file size and compatibility matter. The conversion happens **entirely in your browser** for complete privacy.",
                "Our **PNG to GIF converter** is fast, free, and requires no signup. Just upload, convert, and download!",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Share2", title: "Universal Support", description: "GIF is supported everywhere - all browsers, apps, and platforms" },
            { icon: "Image", title: "Simple Graphics", description: "Perfect for logos, icons, and images with limited colors" }
        ),
        faqs: [
            ...generateCommonFaqs("PNG", "GIF"),
            { question: "Will I lose quality?", answer: "GIF is limited to 256 colors, so complex images may lose some color detail. It's best for simple graphics." },
            { question: "Does GIF support transparency?", answer: "Yes, GIF supports basic transparency (on/off), but not partial transparency like PNG." },
        ],
        howToSteps: generateHowToSteps("PNG", "GIF"),
    },
    "png-to-bmp": {
        sourceFormat: "PNG",
        targetFormat: "bmp",
        acceptedInputFormats: [".png"],
        seo: {
            title: "Free PNG to BMP Converter — Convert PNG to BMP Online",
            description: "Convert PNG to BMP online for free. Create uncompressed bitmap images from PNG. Fast and secure. No signup required.",
            keywords: "png to bmp, convert png to bmp, free png converter, bmp converter, bitmap converter",
        },
        hero: {
            title: "Free PNG to BMP Converter",
            subtitle: "Convert your PNG images to BMP format. Create uncompressed bitmap images for legacy applications.",
            badges: ["Uncompressed", "Legacy Support", "No Signup"],
        },
        toolSection: {
            title: "PNG to BMP Converter",
            description: "Upload your PNG image to convert it to BMP format",
        },
        contentSection: {
            heading: "Best Free PNG to BMP Converter Online",
            paragraphs: [
                "Convert your **PNG images to BMP** (Bitmap) format. BMP is an uncompressed image format that's perfect for applications requiring raw pixel data or legacy software compatibility.",
                "While BMP files are larger than compressed formats, they're useful for specific applications like Windows icons, wallpapers, and software that requires uncompressed images.",
                "Our **PNG to BMP converter** processes everything locally in your browser, ensuring your files remain private and secure.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Image", title: "Uncompressed Quality", description: "BMP preserves every pixel without any compression artifacts" },
            { icon: "Share2", title: "Legacy Compatibility", description: "Perfect for older Windows applications and software" }
        ),
        faqs: [
            ...generateCommonFaqs("PNG", "BMP"),
            { question: "Why is BMP file size larger?", answer: "BMP is an uncompressed format, storing every pixel without compression, resulting in larger files." },
            { question: "When should I use BMP?", answer: "BMP is useful for legacy applications, Windows icons, or when you need uncompressed raw pixel data." },
        ],
        howToSteps: generateHowToSteps("PNG", "BMP"),
    },

    // JPG conversions
    "jpg-to-png": {
        sourceFormat: "JPG",
        targetFormat: "png",
        acceptedInputFormats: [".jpg", ".jpeg"],
        seo: {
            title: "Free JPG to PNG Converter — Convert JPEG to PNG Online",
            description: "Convert JPG to PNG online for free. Fast, secure, and lossless JPEG to PNG conversion. Supports transparency. No signup required.",
            keywords: "jpg to png, convert jpg to png, jpeg to png, free jpg converter, online image converter, lossless conversion",
        },
        hero: {
            title: "Free JPG to PNG Converter",
            subtitle: "Convert your JPG images to PNG format instantly. Get lossless quality and transparency support. Perfect for graphics and logos.",
            badges: ["Lossless Quality", "Instant Conversion", "Transparency Support"],
        },
        toolSection: {
            title: "JPG to PNG Converter",
            description: "Upload your JPG image to convert it to PNG format",
        },
        contentSection: {
            heading: "Best Free JPG to PNG Converter Online",
            paragraphs: [
                "Need to **convert JPG to PNG**? Our free online converter makes it easy. PNG is a versatile format known for its **lossless compression** and support for **transparent backgrounds**, making it the preferred choice for logos, icons, and graphics.",
                "While JPG is great for photographs due to its smaller file size, PNG is superior when you need to preserve every detail and potentially add transparency. Our tool converts your JPEG files to PNG format quickly and efficiently, all **within your browser**.",
                "Whether you're a designer needing transparent assets, a developer working on web graphics, or simply want to preserve image quality, our **JPG to PNG converter** is fast, free, and reliable.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Layers", title: "Transparency Support", description: "PNG supports transparent backgrounds, ideal for logos and overlays" },
            { icon: "Sparkles", title: "Lossless Quality", description: "No further quality degradation – PNG preserves every pixel" }
        ),
        faqs: [
            ...generateCommonFaqs("JPG", "PNG"),
            { question: "Will quality improve?", answer: "Converting won't improve original quality, but PNG will preserve current quality without further degradation." },
            { question: "Can I add transparency after?", answer: "PNG supports transparency, but you'll need image editing software to add it after conversion." },
        ],
        howToSteps: generateHowToSteps("JPG", "PNG"),
    },
    "jpg-to-webp": {
        sourceFormat: "JPG",
        targetFormat: "webp",
        acceptedInputFormats: [".jpg", ".jpeg"],
        seo: {
            title: "Free JPG to WebP Converter — Convert JPEG to WebP Online",
            description: "Convert JPG to WebP online for free. Get smaller file sizes with better quality. Modern format for faster websites. No signup required.",
            keywords: "jpg to webp, convert jpg to webp, jpeg to webp, free jpg converter, webp converter",
        },
        hero: {
            title: "Free JPG to WebP Converter",
            subtitle: "Convert your JPG images to WebP format. Get superior compression with excellent quality. Perfect for modern websites.",
            badges: ["Superior Compression", "Modern Format", "No Signup"],
        },
        toolSection: {
            title: "JPG to WebP Converter",
            description: "Upload your JPG image to convert it to WebP format",
        },
        contentSection: {
            heading: "Best Free JPG to WebP Converter Online",
            paragraphs: [
                "Convert your **JPG images to WebP** for better web performance. WebP is a modern format that provides **superior compression** compared to JPEG while maintaining excellent quality.",
                "WebP files are typically **25-34% smaller** than equivalent JPEG files, making them perfect for websites where speed matters. All processing happens **in your browser** for maximum privacy.",
                "Whether you're optimizing images for better Core Web Vitals, reducing bandwidth costs, or improving user experience, our **JPG to WebP converter** delivers excellent results.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "FileDown", title: "Smaller Files", description: "WebP files are 25-34% smaller than JPEG with similar quality" },
            { icon: "Zap", title: "Better Performance", description: "Faster loading times and improved SEO rankings" }
        ),
        faqs: [
            ...generateCommonFaqs("JPG", "WebP"),
            { question: "Is WebP better than JPG?", answer: "For web use, yes. WebP offers better compression, resulting in smaller files with similar or better quality." },
            { question: "Do all browsers support WebP?", answer: "Yes, all modern browsers support WebP including Chrome, Firefox, Edge, and Safari." },
        ],
        howToSteps: generateHowToSteps("JPG", "WebP"),
    },
    "jpg-to-gif": {
        sourceFormat: "JPG",
        targetFormat: "gif",
        acceptedInputFormats: [".jpg", ".jpeg"],
        seo: {
            title: "Free JPG to GIF Converter — Convert JPEG to GIF Online",
            description: "Convert JPG to GIF online for free. Create GIF images from your photos. Fast and secure. No signup required.",
            keywords: "jpg to gif, convert jpg to gif, jpeg to gif, free jpg converter, gif converter",
        },
        hero: {
            title: "Free JPG to GIF Converter",
            subtitle: "Convert your JPG images to GIF format. Create classic image format for maximum compatibility.",
            badges: ["100% Free", "Instant Conversion", "Universal Support"],
        },
        toolSection: {
            title: "JPG to GIF Converter",
            description: "Upload your JPG image to convert it to GIF format",
        },
        contentSection: {
            heading: "Best Free JPG to GIF Converter Online",
            paragraphs: [
                "Need to **convert JPG to GIF**? Our free converter makes it easy. GIF is a classic format with universal support across all platforms and applications.",
                "While GIF is limited to 256 colors, it's still useful for creating simple versions of images for legacy systems or specific use cases.",
                "Our **JPG to GIF converter** is fast, secure, and completely free. All processing happens in your browser.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Share2", title: "Universal Support", description: "GIF works everywhere - all browsers, apps, and platforms" },
            { icon: "Image", title: "Classic Format", description: "Widely recognized and accepted format since 1987" }
        ),
        faqs: [
            ...generateCommonFaqs("JPG", "GIF"),
            { question: "Will I lose colors?", answer: "Yes, GIF is limited to 256 colors. Photos may lose some color detail in the conversion." },
            { question: "Is GIF good for photos?", answer: "GIF is better for simple graphics. For photos, JPG or WebP are usually better choices." },
        ],
        howToSteps: generateHowToSteps("JPG", "GIF"),
    },
    "jpg-to-bmp": {
        sourceFormat: "JPG",
        targetFormat: "bmp",
        acceptedInputFormats: [".jpg", ".jpeg"],
        seo: {
            title: "Free JPG to BMP Converter — Convert JPEG to BMP Online",
            description: "Convert JPG to BMP online for free. Create uncompressed bitmap images. Fast and secure. No signup required.",
            keywords: "jpg to bmp, convert jpg to bmp, jpeg to bmp, free jpg converter, bitmap converter",
        },
        hero: {
            title: "Free JPG to BMP Converter",
            subtitle: "Convert your JPG images to BMP format. Create uncompressed bitmap images for specific applications.",
            badges: ["Uncompressed", "Legacy Support", "No Signup"],
        },
        toolSection: {
            title: "JPG to BMP Converter",
            description: "Upload your JPG image to convert it to BMP format",
        },
        contentSection: {
            heading: "Best Free JPG to BMP Converter Online",
            paragraphs: [
                "Convert your **JPG images to BMP** format. BMP is an uncompressed format useful for applications requiring raw pixel data.",
                "While BMP files are larger, they're useful for Windows icons, wallpapers, and legacy software requiring uncompressed images.",
                "Our **JPG to BMP converter** processes everything locally for maximum privacy and security.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Image", title: "Uncompressed", description: "BMP stores every pixel without compression" },
            { icon: "Share2", title: "Legacy Support", description: "Compatible with older Windows applications" }
        ),
        faqs: [
            ...generateCommonFaqs("JPG", "BMP"),
            { question: "Why are BMP files so large?", answer: "BMP is uncompressed, storing every pixel individually without any compression algorithm." },
            { question: "When should I use BMP?", answer: "Use BMP for legacy apps, Windows icons, or when uncompressed raw pixel data is required." },
        ],
        howToSteps: generateHowToSteps("JPG", "BMP"),
    },

    // WebP conversions
    "webp-to-png": {
        sourceFormat: "WebP",
        targetFormat: "png",
        acceptedInputFormats: [".webp"],
        seo: {
            title: "Free WebP to PNG Converter — Convert WebP to PNG Online",
            description: "Convert WebP to PNG online for free. Fast, secure, and lossless WebP to PNG conversion. Maximum compatibility. No signup required.",
            keywords: "webp to png, convert webp to png, webp converter, free webp converter, online image converter",
        },
        hero: {
            title: "Free WebP to PNG Converter",
            subtitle: "Convert your WebP images to PNG format instantly. Get maximum compatibility with lossless quality. Perfect for editing and sharing.",
            badges: ["Lossless Quality", "Instant Conversion", "Max Compatibility"],
        },
        toolSection: {
            title: "WebP to PNG Converter",
            description: "Upload your WebP image to convert it to PNG format",
        },
        contentSection: {
            heading: "Best Free WebP to PNG Converter Online",
            paragraphs: [
                "Need to **convert WebP to PNG**? WebP is a modern format but isn't universally supported by all software. Converting to **PNG** ensures your images work everywhere.",
                "Our **WebP to PNG converter** preserves the original quality. PNG is **lossless**, meaning no detail is lost during conversion. Perfect for graphics, designs, and screenshots.",
                "The conversion happens **entirely in your browser**, so your files are never uploaded. It's fast, free, and completely private.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Share2", title: "Universal Compatibility", description: "PNG is supported by all image editing software and platforms" },
            { icon: "Sparkles", title: "Lossless Quality", description: "PNG preserves every pixel without any degradation" }
        ),
        faqs: [
            ...generateCommonFaqs("WebP", "PNG"),
            { question: "Will file size increase?", answer: "PNG files may be larger than WebP since WebP uses more advanced compression. However, PNG offers wider compatibility." },
            { question: "Is transparency preserved?", answer: "Yes! If your WebP has transparency, it will be perfectly preserved in the PNG output." },
        ],
        howToSteps: generateHowToSteps("WebP", "PNG"),
    },
    "webp-to-jpg": {
        sourceFormat: "WebP",
        targetFormat: "jpeg",
        acceptedInputFormats: [".webp"],
        seo: {
            title: "Free WebP to JPG Converter — Convert WebP to JPEG Online",
            description: "Convert WebP to JPG online for free. Fast, secure WebP to JPEG conversion. Maximum compatibility. No signup required.",
            keywords: "webp to jpg, convert webp to jpg, webp to jpeg, webp converter, free webp converter",
        },
        hero: {
            title: "Free WebP to JPG Converter",
            subtitle: "Convert your WebP images to JPG format. Get universal compatibility with all devices and apps.",
            badges: ["Universal Support", "Instant Conversion", "No Signup"],
        },
        toolSection: {
            title: "WebP to JPG Converter",
            description: "Upload your WebP image to convert it to JPG format",
        },
        contentSection: {
            heading: "Best Free WebP to JPG Converter Online",
            paragraphs: [
                "Convert your **WebP images to JPG** for maximum compatibility. While WebP is great for modern browsers, JPG is universally supported by all devices and applications.",
                "Our converter uses high-quality settings to ensure your images look great after conversion. All processing happens **in your browser** for complete privacy.",
                "Whether you need to share images with older software or ensure compatibility, our **WebP to JPG converter** is fast, free, and reliable.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Share2", title: "Universal Support", description: "JPG works with all devices, apps, and platforms" },
            { icon: "Zap", title: "Fast Conversion", description: "Convert your images in seconds, right in your browser" }
        ),
        faqs: [
            ...generateCommonFaqs("WebP", "JPG"),
            { question: "What about transparency?", answer: "JPG doesn't support transparency. Any transparent areas will be replaced with a white background." },
            { question: "Is quality preserved?", answer: "We use 95% quality to minimize any visible loss. The result looks excellent for most purposes." },
        ],
        howToSteps: generateHowToSteps("WebP", "JPG"),
    },
    "webp-to-gif": {
        sourceFormat: "WebP",
        targetFormat: "gif",
        acceptedInputFormats: [".webp"],
        seo: {
            title: "Free WebP to GIF Converter — Convert WebP to GIF Online",
            description: "Convert WebP to GIF online for free. Create classic GIF images from WebP files. Fast and secure. No signup required.",
            keywords: "webp to gif, convert webp to gif, webp converter, gif converter, free webp converter",
        },
        hero: {
            title: "Free WebP to GIF Converter",
            subtitle: "Convert your WebP images to GIF format. Create classic images for universal compatibility.",
            badges: ["100% Free", "Classic Format", "No Signup"],
        },
        toolSection: {
            title: "WebP to GIF Converter",
            description: "Upload your WebP image to convert it to GIF format",
        },
        contentSection: {
            heading: "Best Free WebP to GIF Converter Online",
            paragraphs: [
                "Convert your **WebP images to GIF** format. GIF is a classic format with universal support across all platforms.",
                "While GIF is limited to 256 colors, it's useful for simple graphics and legacy applications. Our converter processes everything **in your browser**.",
                "Our **WebP to GIF converter** is fast, secure, and completely free to use.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Share2", title: "Universal Format", description: "GIF works everywhere since 1987" },
            { icon: "Image", title: "Classic Compatibility", description: "Perfect for legacy applications and simple graphics" }
        ),
        faqs: [
            ...generateCommonFaqs("WebP", "GIF"),
            { question: "Will colors be reduced?", answer: "Yes, GIF is limited to 256 colors. Complex images may lose some color detail." },
            { question: "Is transparency preserved?", answer: "GIF supports basic transparency (on/off) but not partial transparency." },
        ],
        howToSteps: generateHowToSteps("WebP", "GIF"),
    },

    // GIF conversions
    "gif-to-png": {
        sourceFormat: "GIF",
        targetFormat: "png",
        acceptedInputFormats: [".gif"],
        seo: {
            title: "Free GIF to PNG Converter — Convert GIF to PNG Online",
            description: "Convert GIF to PNG online for free. Extract static image from GIF. Fast, secure, and lossless. No signup required.",
            keywords: "gif to png, convert gif to png, free gif converter, png converter, online image converter",
        },
        hero: {
            title: "Free GIF to PNG Converter",
            subtitle: "Convert your GIF images to PNG format. Get more colors and better quality for static images.",
            badges: ["Lossless Quality", "More Colors", "No Signup"],
        },
        toolSection: {
            title: "GIF to PNG Converter",
            description: "Upload your GIF image to convert it to PNG format",
        },
        contentSection: {
            heading: "Best Free GIF to PNG Converter Online",
            paragraphs: [
                "Convert your **GIF images to PNG** for better quality and more colors. While GIF is limited to 256 colors, PNG supports millions of colors.",
                "Our converter extracts the first frame from your GIF and converts it to a high-quality PNG. Perfect for logos, icons, and graphics.",
                "All processing happens **in your browser** for complete privacy. It's fast, free, and reliable.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Sparkles", title: "Better Quality", description: "PNG supports millions of colors vs GIF's 256" },
            { icon: "Layers", title: "Full Transparency", description: "PNG supports partial transparency for smooth edges" }
        ),
        faqs: [
            ...generateCommonFaqs("GIF", "PNG"),
            { question: "What about animated GIFs?", answer: "This converts the first frame of animated GIFs to a static PNG image." },
            { question: "Will quality improve?", answer: "Colors limited by GIF can't be recovered, but PNG prevents further degradation." },
        ],
        howToSteps: generateHowToSteps("GIF", "PNG"),
    },
    "gif-to-jpg": {
        sourceFormat: "GIF",
        targetFormat: "jpeg",
        acceptedInputFormats: [".gif"],
        seo: {
            title: "Free GIF to JPG Converter — Convert GIF to JPEG Online",
            description: "Convert GIF to JPG online for free. Extract static JPEG image from GIF. Fast and secure. No signup required.",
            keywords: "gif to jpg, convert gif to jpg, gif to jpeg, free gif converter, jpg converter",
        },
        hero: {
            title: "Free GIF to JPG Converter",
            subtitle: "Convert your GIF images to JPG format. Create static images with universal compatibility.",
            badges: ["100% Free", "Universal Support", "No Signup"],
        },
        toolSection: {
            title: "GIF to JPG Converter",
            description: "Upload your GIF image to convert it to JPG format",
        },
        contentSection: {
            heading: "Best Free GIF to JPG Converter Online",
            paragraphs: [
                "Convert your **GIF images to JPG** for better compatibility. JPG is universally supported and often has smaller file sizes.",
                "Our converter extracts the first frame from your GIF and converts it to a high-quality JPEG image.",
                "All processing happens **locally in your browser**. Fast, free, and completely private.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Share2", title: "Universal Format", description: "JPG is supported by all devices and platforms" },
            { icon: "FileDown", title: "Smaller Size", description: "JPEG often results in smaller file sizes" }
        ),
        faqs: [
            ...generateCommonFaqs("GIF", "JPG"),
            { question: "What about animation?", answer: "This converts animated GIFs to a static JPEG of the first frame." },
            { question: "Is transparency preserved?", answer: "No, JPG doesn't support transparency. Transparent areas become white." },
        ],
        howToSteps: generateHowToSteps("GIF", "JPG"),
    },
    "gif-to-webp": {
        sourceFormat: "GIF",
        targetFormat: "webp",
        acceptedInputFormats: [".gif"],
        seo: {
            title: "Free GIF to WebP Converter — Convert GIF to WebP Online",
            description: "Convert GIF to WebP online for free. Modern format with better compression. Fast and secure. No signup required.",
            keywords: "gif to webp, convert gif to webp, free gif converter, webp converter, online image converter",
        },
        hero: {
            title: "Free GIF to WebP Converter",
            subtitle: "Convert your GIF images to WebP format. Get modern compression with excellent quality.",
            badges: ["Modern Format", "Better Compression", "No Signup"],
        },
        toolSection: {
            title: "GIF to WebP Converter",
            description: "Upload your GIF image to convert it to WebP format",
        },
        contentSection: {
            heading: "Best Free GIF to WebP Converter Online",
            paragraphs: [
                "Convert your **GIF images to WebP** for modern web performance. WebP offers better compression and quality than GIF.",
                "Our converter processes the first frame of your GIF and converts it to an optimized WebP image.",
                "All processing happens **in your browser** for complete privacy and security.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "Zap", title: "Better Compression", description: "WebP offers superior compression compared to GIF" },
            { icon: "Sparkles", title: "More Colors", description: "WebP supports millions of colors vs GIF's 256" }
        ),
        faqs: [
            ...generateCommonFaqs("GIF", "WebP"),
            { question: "Is animation preserved?", answer: "This converts to a static WebP. For animated WebP, use specialized tools." },
            { question: "Is transparency preserved?", answer: "Yes! WebP supports full transparency just like PNG." },
        ],
        howToSteps: generateHowToSteps("GIF", "WebP"),
    },

    // BMP conversions
    "bmp-to-png": {
        sourceFormat: "BMP",
        targetFormat: "png",
        acceptedInputFormats: [".bmp"],
        seo: {
            title: "Free BMP to PNG Converter — Convert BMP to PNG Online",
            description: "Convert BMP to PNG online for free. Compress bitmap images with lossless quality. Fast and secure. No signup required.",
            keywords: "bmp to png, convert bmp to png, bitmap to png, free bmp converter, png converter",
        },
        hero: {
            title: "Free BMP to PNG Converter",
            subtitle: "Convert your BMP images to PNG format. Get compressed files with lossless quality.",
            badges: ["Lossless Quality", "Smaller Files", "No Signup"],
        },
        toolSection: {
            title: "BMP to PNG Converter",
            description: "Upload your BMP image to convert it to PNG format",
        },
        contentSection: {
            heading: "Best Free BMP to PNG Converter Online",
            paragraphs: [
                "Convert your **BMP images to PNG** for better compression without quality loss. PNG uses lossless compression to significantly reduce file sizes.",
                "BMP files are often very large since they're uncompressed. PNG provides much smaller files while maintaining perfect quality.",
                "Our converter processes everything **in your browser** for maximum privacy and security.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "FileDown", title: "Smaller Files", description: "PNG is significantly smaller than uncompressed BMP" },
            { icon: "Sparkles", title: "Lossless Quality", description: "No quality is lost in the conversion to PNG" }
        ),
        faqs: [
            ...generateCommonFaqs("BMP", "PNG"),
            { question: "How much smaller will it be?", answer: "PNG files can be 50-80% smaller than BMP while maintaining identical quality." },
            { question: "Is quality affected?", answer: "No! PNG is lossless, so your image quality remains perfect." },
        ],
        howToSteps: generateHowToSteps("BMP", "PNG"),
    },
    "bmp-to-jpg": {
        sourceFormat: "BMP",
        targetFormat: "jpeg",
        acceptedInputFormats: [".bmp"],
        seo: {
            title: "Free BMP to JPG Converter — Convert BMP to JPEG Online",
            description: "Convert BMP to JPG online for free. Compress bitmap images for web use. Fast and secure. No signup required.",
            keywords: "bmp to jpg, convert bmp to jpg, bitmap to jpeg, free bmp converter, jpg converter",
        },
        hero: {
            title: "Free BMP to JPG Converter",
            subtitle: "Convert your BMP images to JPG format. Dramatically reduce file sizes for web and email.",
            badges: ["Much Smaller", "Web Ready", "No Signup"],
        },
        toolSection: {
            title: "BMP to JPG Converter",
            description: "Upload your BMP image to convert it to JPG format",
        },
        contentSection: {
            heading: "Best Free BMP to JPG Converter Online",
            paragraphs: [
                "Convert your **BMP images to JPG** for dramatically smaller file sizes. JPEG compression can reduce BMP files by 90% or more.",
                "Perfect for preparing images for web, email, or any use where file size matters. Our converter uses 95% quality for excellent results.",
                "All processing happens **in your browser** for complete privacy and security.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "FileDown", title: "Massive Reduction", description: "JPG can be 90%+ smaller than uncompressed BMP" },
            { icon: "Share2", title: "Universal Format", description: "JPG is supported everywhere for easy sharing" }
        ),
        faqs: [
            ...generateCommonFaqs("BMP", "JPG"),
            { question: "How much smaller will it be?", answer: "JPEG can reduce BMP files by 90% or more, making them much easier to share." },
            { question: "Is quality affected?", answer: "JPEG is lossy, but we use 95% quality to minimize visible quality loss." },
        ],
        howToSteps: generateHowToSteps("BMP", "JPG"),
    },
    "bmp-to-webp": {
        sourceFormat: "BMP",
        targetFormat: "webp",
        acceptedInputFormats: [".bmp"],
        seo: {
            title: "Free BMP to WebP Converter — Convert BMP to WebP Online",
            description: "Convert BMP to WebP online for free. Best compression with excellent quality. Fast and secure. No signup required.",
            keywords: "bmp to webp, convert bmp to webp, bitmap to webp, free bmp converter, webp converter",
        },
        hero: {
            title: "Free BMP to WebP Converter",
            subtitle: "Convert your BMP images to WebP format. Get the best compression with excellent quality.",
            badges: ["Best Compression", "Modern Format", "No Signup"],
        },
        toolSection: {
            title: "BMP to WebP Converter",
            description: "Upload your BMP image to convert it to WebP format",
        },
        contentSection: {
            heading: "Best Free BMP to WebP Converter Online",
            paragraphs: [
                "Convert your **BMP images to WebP** for the best possible compression. WebP offers superior compression compared to both PNG and JPEG.",
                "BMP files are uncompressed and huge. WebP dramatically reduces file sizes while maintaining excellent quality.",
                "Our converter processes everything **in your browser** for maximum privacy.",
            ],
        },
        features: generateCommonFeatures(
            { icon: "FileDown", title: "Best Compression", description: "WebP offers the best file size reduction" },
            { icon: "Zap", title: "Web Optimized", description: "Perfect for fast-loading websites" }
        ),
        faqs: [
            ...generateCommonFaqs("BMP", "WebP"),
            { question: "Is WebP better than PNG or JPG?", answer: "WebP typically offers 25-35% better compression than PNG and JPG." },
            { question: "Is WebP widely supported?", answer: "Yes, all modern browsers support WebP including Chrome, Firefox, Edge, Safari." },
        ],
        howToSteps: generateHowToSteps("BMP", "WebP"),
    },
};

const ImageConversionPage = () => {
    const location = useLocation();

    // Get the conversion type from the URL path (e.g., "/png-to-jpg" -> "png-to-jpg")
    const conversionType = location.pathname.replace("/", "");

    // Get the configuration for this conversion type, fallback to png-to-jpg if not found
    const config = useMemo(() => {
        return conversionConfigs[conversionType] || conversionConfigs["png-to-jpg"];
    }, [conversionType]);

    const baseUrl = getCanonicalUrl("");

    return (
        <>
            <SEOHead
                title={config.seo.title}
                description={config.seo.description}
                keywords={config.seo.keywords}
                canonicalUrl={`${baseUrl}/${conversionType}`}
            />

            <SchemaMarkup
                toolName={config.hero.title}
                toolDescription={config.seo.description}
                toolUrl={`${baseUrl}/${conversionType}`}
                faqs={config.faqs}
                howToSteps={config.howToSteps}
            />

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-16">
                    {/* Tool Section */}
                    <ImageConverter
                        defaultFormat={config.targetFormat}
                        sourceFormat={config.sourceFormat}
                        acceptedInputFormats={config.acceptedInputFormats}
                        title={config.toolSection.title}
                        description={config.toolSection.description}
                        showFormatSwitcher={true}
                    />

                    {/* Tool Description with Keywords */}
                    <section className="py-12 bg-background">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto prose dark:prose-invert">
                                <h2 className="text-3xl font-bold mb-6">{config.contentSection.heading}</h2>
                                {config.contentSection.paragraphs.map((paragraph, index) => (
                                    <p key={index} className="text-lg text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-12">{config.features.title}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {config.features.items.map((feature, index) => {
                                    const IconComponent = iconMap[feature.icon];
                                    return (
                                        <Card key={index} className="p-6 text-center">
                                            <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                                            <h3 className="font-semibold mb-2">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-12">How to Convert {config.sourceFormat} to {config.targetFormat.toUpperCase()}</h2>
                            <div className="max-w-4xl mx-auto">
                                <div className="grid md:grid-cols-3 gap-8">
                                    {config.howToSteps.map((step, index) => (
                                        <div key={index} className="text-center">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-2xl font-bold text-primary">{index + 1}</span>
                                            </div>
                                            <h3 className="font-semibold mb-2">{step.name}</h3>
                                            <p className="text-muted-foreground">{step.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                            <div className="max-w-3xl mx-auto space-y-6">
                                {config.faqs.map((faq, index) => (
                                    <Card key={index} className="p-6">
                                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default ImageConversionPage;
