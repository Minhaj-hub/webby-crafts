import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: December 6, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Convert Kitty, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily use Convert Kitty for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Service Description</h2>
              <p>Convert Kitty provides online file conversion and compression tools. All processing is done locally in your browser for privacy and security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Responsibilities</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Ensuring you have the right to process the files you upload</li>
                <li>Not uploading copyrighted material without permission</li>
                <li>Not using the service for illegal purposes</li>
                <li>Not attempting to harm or disrupt the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Privacy</h2>
              <p>Your privacy is important to us. All file processing happens locally in your browser. We do not store, access, or transmit your files to our servers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Disclaimer</h2>
              <p>The materials on Convert Kitty are provided on an 'as is' basis. Convert Kitty makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitations</h2>
              <p>In no event shall Convert Kitty or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Convert Kitty, even if Convert Kitty or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Revisions</h2>
              <p>Convert Kitty may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us through our Contact page.</p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;