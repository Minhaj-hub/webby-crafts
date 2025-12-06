import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Disclaimer</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: December 6, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">General Information</h2>
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                Convert Kitty excludes all representations, warranties, obligations, and liabilities arising out of or in 
                connection with the information provided on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Service Availability</h2>
              <p>
                Convert Kitty makes no warranty that the website will be available at any particular time or location, 
                that the website will be secure or error-free, or that defects will be corrected. You use the website 
                solely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">File Processing</h2>
              <p>
                While Convert Kitty processes files locally in your browser for privacy and security, we cannot guarantee:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The accuracy or quality of processed files</li>
                <li>Compatibility with all file formats or versions</li>
                <li>That processing will work on all devices or browsers</li>
                <li>That files will be processed without any data loss</li>
              </ul>
              <p className="mt-4">
                Always keep backups of your original files before processing them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibility</h2>
              <p>
                Users are solely responsible for:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Ensuring they have the legal right to process uploaded files</li>
                <li>Verifying the quality and accuracy of processed files</li>
                <li>Complying with applicable copyright and intellectual property laws</li>
                <li>Using the service in accordance with our Terms of Service</li>
                <li>Any consequences arising from the use of processed files</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Content</h2>
              <p>
                Convert Kitty may contain links to third-party websites or services. We do not endorse or assume any 
                responsibility for the content, privacy policies, or practices of third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Convert Kitty shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
                incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, 
                resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Technical Limitations</h2>
              <p>
                File processing capabilities may be limited by:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Browser capabilities and available memory</li>
                <li>Device processing power and storage</li>
                <li>File size and complexity</li>
                <li>Internet connection stability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Advice</h2>
              <p>
                Convert Kitty is a general-purpose file processing tool and should not be relied upon for critical 
                business or professional applications without proper testing and verification. For mission-critical 
                applications, please consult with appropriate professionals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Disclaimer</h2>
              <p>
                Convert Kitty reserves the right to modify this disclaimer at any time. Changes will be effective 
                immediately upon posting on the website. Your continued use of the service after any changes 
                constitutes acceptance of the new disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p>
                If you have any questions about this disclaimer, please contact us through our Contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;