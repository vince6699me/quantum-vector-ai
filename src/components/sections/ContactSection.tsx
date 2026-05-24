import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Twitter, Youtube, Send, Clock, PhoneCall } from "lucide-react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground">
            Get in touch with our team to discuss how AI can transform your business.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.com"
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project and how we can help..."
                  rows={6}
                  className="bg-background border-border resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about our services or want to discuss a custom AI solution? Our team is here to help you navigate your AI transformation journey.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Email</div>
                  <a href="mailto:quantumvectorllc@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    quantumvectorllc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Phone</div>
                  <a href="tel:+15550123456" className="text-muted-foreground hover:text-primary transition-colors">
                    (+254)702-386-899
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Office</div>
                  <p className="text-muted-foreground">
                    Ngara, Nairobi<br />
                        Kenya
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="font-semibold">Connect With Us</h4>
              <div className="grid grid-cols-3 gap-3">
                <a 
                  href="https://twitter.com/QuantumvectorA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <Twitter className="h-4 w-4 text-primary" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a 
                  href="https://youtube.com/@QuantumVectorAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <Youtube className="h-4 w-4 text-primary" />
                  <span className="text-sm">YouTube</span>
                </a>
                <a 
                  href="https://t.me/QuantumBot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <Send className="h-4 w-4 text-primary" />
                  <span className="text-sm">Telegram</span>
                </a>
              </div>
            </div>

            {/* Response Time & Call Now Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Response Time</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Average response within 2 hours during business hours
                </p>
              </div>

              <a 
                href="tel:+15550123456" 
                className="p-4 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <PhoneCall className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Call Now</h4>
                </div>
                <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                  Speak directly with our team
                </p>
              </a>
            </div>

            <div className="pt-2">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Weekend: Emergency support available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
