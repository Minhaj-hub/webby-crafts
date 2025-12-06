import { Share2, Copy, Mail, Facebook, Twitter, Linkedin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { APP_CONFIG } from "@/config/app.config";

interface ShareDialogProps {
  fileName: string;
  fileSize?: string;
  toolName?: string;
}

export const ShareDialog = ({ fileName, fileSize, toolName = APP_CONFIG.siteName }: ShareDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `I just ${toolName.toLowerCase()} my file using ${toolName} - free, fast & secure! No uploads to servers. 🚀`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleShareEmail = () => {
    const subject = `Check out ${toolName} - Free File Conversion Tools`;
    const body = `I found this amazing tool that helped me convert my files: ${shareUrl}\n\n${shareText}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleShareTwitter = () => {
    const twitterText = `I just processed my file with ${toolName} - completely free & secure! No server uploads. Check it out: ${shareUrl} #FileTools #Privacy`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleShareLinkedin = () => {
    const linkedinText = `Interesting tool I found - ${toolName} for file processing with complete privacy protection.`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleShareTelegram = () => {
    const telegramText = `Check out ${toolName} - free file processing tool! ${shareUrl} #FileTools`;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(telegramText)}`,
      "_blank"
    );
  };

  const handleShareWhatsApp = () => {
    const whatsappText = `I just used ${toolName} to process my file - completely free & secure! Check it out: ${shareUrl}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`,
      "_blank"
    );
  };

  const handleShareReddit = () => {
    const redditText = `Found this awesome tool: ${toolName} - free, fast & secure file processing!`;
    window.open(
      `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(redditText)}`,
      "_blank"
    );
  };

  const handleSharePinterest = () => {
    window.open(
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(`${toolName} - Free File Processing Tool`)}`,
      "_blank"
    );
  };

  const handleShareTumblr = () => {
    window.open(
      `https://www.tumblr.com/widgets/share/tool?posttype=link&tags=${encodeURIComponent("filetools,privacy")}&caption=${encodeURIComponent(toolName)}&content=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleShareViber = () => {
    const viberText = `${toolName} - Check this out! ${shareUrl}`;
    window.open(
      `viber://forward?text=${encodeURIComponent(viberText)}`,
      "_blank"
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share {toolName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Share Message */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {shareText}
            </p>
          </div>

          {/* Copy Link */}
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300"
            />
            <Button onClick={handleCopyLink} variant="outline" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Social Sharing */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Share on social</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={handleShareEmail}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs">Email</span>
              </Button>
              <Button
                onClick={handleShareTwitter}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                onClick={handleShareFacebook}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Facebook className="w-4 h-4" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                onClick={handleShareLinkedin}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-xs">LinkedIn</span>
              </Button>
              <Button
                onClick={handleShareTelegram}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Send className="w-4 h-4" />
                <span className="text-xs">Telegram</span>
              </Button>
              <Button
                onClick={handleShareWhatsApp}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">WhatsApp</span>
              </Button>
              <Button
                onClick={handleShareReddit}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Send className="w-4 h-4" />
                <span className="text-xs">Reddit</span>
              </Button>
              <Button
                onClick={handleSharePinterest}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Send className="w-4 h-4" />
                <span className="text-xs">Pinterest</span>
              </Button>
              <Button
                onClick={handleShareTumblr}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <Send className="w-4 h-4" />
                <span className="text-xs">Tumblr</span>
              </Button>
              <Button
                onClick={handleShareViber}
                variant="outline"
                size="sm"
                className="gap-2 flex flex-col h-auto py-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">Viber</span>
              </Button>
            </div>
          </div>

          {/* File Info */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>File:</strong> {fileName}</p>
            {fileSize && <p><strong>Size:</strong> {fileSize}</p>}
            <p className="text-green-600 dark:text-green-400">✓ Processed locally - 100% private</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
