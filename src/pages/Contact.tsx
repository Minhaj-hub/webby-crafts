import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Clock, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }

      // Send email via FormSubmit.co (free service for contact forms)
      const response = await fetch("https://formspree.io/f/meornywl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        // Auto-hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError("Failed to send message. Please try again later.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later or email us directly.");
      console.error("Form submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Contact Us - Convert Kit Support & Feedback"
        description="Get in touch with Convert Kit support team. Have questions or feedback about our image compression, format conversion, or PDF tools? We'd love to hear from you."
        keywords="contact convert kit, image compression support, file conversion help, PDF tools support, customer feedback"
        canonicalUrl="https://convertkit.web.app/contact"
      />
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300">Message Sent Successfully!</h3>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      Thank you for reaching out. We'll get back to you within 24-48 hours.
                    </p>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Tell us more about your question or feedback..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
      </div>
      
      <Footer />
    </div>
  );
  
  /*
  Contact Information - Commented out until email addresses are set up
  
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">
        We're here to help! Whether you have questions about our tools, need technical support, 
        or want to share feedback, don't hesitate to reach out.
      </p>
    </div>

    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <Mail className="w-6 h-6 text-primary mt-1" />
        <div>
          <h3 className="font-semibold text-foreground">Email Support</h3>
          <p className="text-muted-foreground">support@convertkitty.com</p>
          <p className="text-sm text-muted-foreground mt-1">
            For technical support and general inquiries
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <MessageSquare className="w-6 h-6 text-primary mt-1" />
        <div>
          <h3 className="font-semibold text-foreground">Feedback</h3>
          <p className="text-muted-foreground">feedback@convertkitty.com</p>
          <p className="text-sm text-muted-foreground mt-1">
            Share your ideas and suggestions
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <Clock className="w-6 h-6 text-primary mt-1" />
        <div>
          <h3 className="font-semibold text-foreground">Response Time</h3>
          <p className="text-muted-foreground">Within 24-48 hours</p>
          <p className="text-sm text-muted-foreground mt-1">
            We aim to respond to all inquiries quickly
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <MapPin className="w-6 h-6 text-primary mt-1" />
        <div>
          <h3 className="font-semibold text-foreground">Location</h3>
          <p className="text-muted-foreground">Global Service</p>
          <p className="text-sm text-muted-foreground mt-1">
            Available worldwide, 24/7
          </p>
        </div>
      </div>
    </div>

    <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
      <h3 className="font-semibold text-foreground mb-2">Quick Tips</h3>
      <ul className="text-sm text-muted-foreground space-y-1">
        <li>• Include browser and device info for technical issues</li>
        <li>• Describe the steps you took before encountering problems</li>
        <li>• Let us know which tool you were using</li>
        <li>• Screenshots are always helpful!</li>
      </ul>
    </div>
  </div>
  */
};

export default Contact;