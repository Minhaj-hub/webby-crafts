import { Wrench, Mail } from "lucide-react";
import { APP_CONFIG } from "@/config/app.config";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-t border-gray-200/60 dark:border-gray-700/60">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-lg">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{APP_CONFIG.siteName}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {APP_CONFIG.siteDescription}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Tools</h3>
            <ul className="space-y-3">
              <li>
                <a href="/compress-image" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Image Compressor
                </a>
              </li>
              <li>
                <a href="/convert-image" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Image Converter
                </a>
              </li>
              <li>
                <a href="/image-to-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Image to PDF
                </a>
              </li>
              <li>
                <a href="/pdf-to-image" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  PDF to Image
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://sites.google.com/view/convertkitty/home" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Blog
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/60 dark:border-gray-700/60 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              © 2025 {APP_CONFIG.siteName}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>for privacy & security</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};