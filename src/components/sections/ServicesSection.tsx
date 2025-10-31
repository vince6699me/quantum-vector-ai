import { Card } from "@/components/ui/card";
import { Bot, FileText, Target, Brain, LineChart, FileSearch, Mic, Eye, Search, Sparkles } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Customer Care Chatbots",
    description: "24/7 intelligent customer support powered by advanced NLP to handle inquiries, resolve issues, and improve satisfaction.",
  },
  {
    icon: FileText,
    title: "Marketing Content Generation",
    description: "Create compelling, SEO-optimized content at scale with AI that understands your brand voice and audience.",
  },
  {
    icon: Target,
    title: "Lead Generation & Qualification",
    description: "Automate lead scoring and qualification with AI models trained on your ideal customer profiles.",
  },
  {
    icon: Brain,
    title: "Custom LLM Development",
    description: "Build domain-specific language models tailored to your industry's unique terminology and requirements.",
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Make data-driven decisions with AI-powered forecasting and trend analysis for your business metrics.",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Extract, classify, and analyze information from documents automatically with advanced OCR and NLP.",
  },
  {
    icon: Mic,
    title: "Voice AI Solutions",
    description: "Implement natural voice interfaces for customer service, transcription, and voice-activated workflows.",
  },
  {
    icon: Eye,
    title: "Computer Vision Services",
    description: "Deploy image recognition, object detection, and visual quality control systems for your operations.",
  },
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Enhance user experience with intelligent search that understands context, intent, and semantic meaning.",
  },
  {
    icon: Sparkles,
    title: "AI Integration Consulting",
    description: "Strategic guidance to identify opportunities and implement AI solutions that drive real business value.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Comprehensive AI Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From chatbots to predictive analytics, we provide end-to-end AI services tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="relative w-12 h-12">
                  <service.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <button className="text-primary font-medium text-sm group-hover:underline inline-flex items-center gap-1">
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
