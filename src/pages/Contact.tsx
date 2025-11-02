import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>
              
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
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
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
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;