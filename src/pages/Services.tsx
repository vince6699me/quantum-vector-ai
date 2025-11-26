import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { ServiceModal } from "@/components/ServiceModal";
import { SisterCompaniesSection } from "@/components/sections/SisterCompaniesSection";
import { Bot, FileText, Target, Brain, LineChart, FileSearch, Mic, Eye, Search, Sparkles, Headphones } from "lucide-react";

interface Service {
  icon: any;
  title: string;
  description: string;
  overview: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  timeline: string;
  pricing: string;
}

const services: Service[] = [
  {
    icon: Bot,
    title: "Customer Care Chatbots",
    description: "24/7 intelligent customer support powered by advanced NLP to handle inquiries, resolve issues, and improve satisfaction.",
    overview: "Deploy AI-powered chatbots that understand natural language and provide instant, accurate responses to customer queries around the clock.",
    features: [
      "Natural language understanding",
      "Multi-language support",
      "Sentiment analysis",
      "Seamless handoff to human agents",
      "Analytics dashboard"
    ],
    benefits: [
      "80% reduction in response time",
      "24/7 availability",
      "Consistent customer experience",
      "Reduced support costs"
    ],
    useCases: [
      "E-commerce customer support",
      "Technical troubleshooting",
      "Order tracking and updates",
      "FAQ automation"
    ],
    timeline: "2-4 weeks for full deployment",
    pricing: "Starting at $2,500/month"
  },
  {
    icon: FileText,
    title: "Marketing Content Generation",
    description: "Create compelling, SEO-optimized content at scale with AI that understands your brand voice and audience.",
    overview: "Generate high-quality marketing content including blog posts, social media updates, ad copy, and email campaigns using advanced AI models.",
    features: [
      "Brand voice customization",
      "SEO optimization",
      "Multi-format content",
      "Content calendar integration",
      "Performance analytics"
    ],
    benefits: [
      "10x faster content production",
      "Consistent brand messaging",
      "Improved SEO rankings",
      "Cost-effective scaling"
    ],
    useCases: [
      "Blog content creation",
      "Social media campaigns",
      "Email marketing",
      "Ad copywriting"
    ],
    timeline: "1-2 weeks for setup",
    pricing: "Starting at $1,500/month"
  },
  {
    icon: Target,
    title: "Lead Generation & Qualification",
    description: "Automate lead scoring and qualification with AI models trained on your ideal customer profiles.",
    overview: "Identify and qualify high-value leads automatically using predictive models trained on your historical data and ideal customer profiles.",
    features: [
      "Predictive lead scoring",
      "Automated qualification",
      "CRM integration",
      "Real-time insights",
      "Custom scoring models"
    ],
    benefits: [
      "50% increase in qualified leads",
      "Reduced sales cycle time",
      "Better resource allocation",
      "Higher conversion rates"
    ],
    useCases: [
      "B2B lead qualification",
      "Sales pipeline optimization",
      "Marketing campaign targeting",
      "Customer segmentation"
    ],
    timeline: "3-4 weeks for implementation",
    pricing: "Starting at $3,000/month"
  },
  {
    icon: Brain,
    title: "Custom LLM Development",
    description: "Build domain-specific language models tailored to your industry's unique terminology and requirements.",
    overview: "Develop custom large language models fine-tuned on your proprietary data and industry-specific knowledge.",
    features: [
      "Domain-specific training",
      "Proprietary data integration",
      "API access",
      "Continuous learning",
      "Security and compliance"
    ],
    benefits: [
      "Superior accuracy for niche use cases",
      "Competitive advantage",
      "Data sovereignty",
      "Specialized knowledge"
    ],
    useCases: [
      "Legal document analysis",
      "Medical diagnosis assistance",
      "Financial forecasting",
      "Technical documentation"
    ],
    timeline: "8-12 weeks for development",
    pricing: "Custom pricing, starting at $25,000"
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Make data-driven decisions with AI-powered forecasting and trend analysis for your business metrics.",
    overview: "Leverage machine learning models to predict future trends, identify patterns, and make informed business decisions.",
    features: [
      "Time series forecasting",
      "Anomaly detection",
      "Trend analysis",
      "Custom dashboards",
      "Automated reporting"
    ],
    benefits: [
      "85% forecast accuracy",
      "Early risk detection",
      "Optimized resource planning",
      "Data-driven decisions"
    ],
    useCases: [
      "Sales forecasting",
      "Inventory optimization",
      "Demand prediction",
      "Financial planning"
    ],
    timeline: "4-6 weeks for implementation",
    pricing: "Starting at $4,000/month"
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Extract, classify, and analyze information from documents automatically with advanced OCR and NLP.",
    overview: "Automate document processing workflows with AI that can read, understand, and extract valuable information from any document type.",
    features: [
      "OCR for scanned documents",
      "Data extraction",
      "Document classification",
      "Validation rules",
      "Integration APIs"
    ],
    benefits: [
      "95% accuracy in data extraction",
      "90% time savings",
      "Reduced manual errors",
      "Scalable processing"
    ],
    useCases: [
      "Invoice processing",
      "Contract analysis",
      "Form digitization",
      "Compliance documentation"
    ],
    timeline: "3-5 weeks for deployment",
    pricing: "Starting at $2,000/month"
  },
  {
    icon: Mic,
    title: "Voice AI Solutions",
    description: "Implement natural voice interfaces for customer service, transcription, and voice-activated workflows.",
    overview: "Deploy voice recognition and synthesis systems that enable natural, conversational interactions with your applications.",
    features: [
      "Speech-to-text",
      "Text-to-speech",
      "Voice authentication",
      "Accent recognition",
      "Real-time processing"
    ],
    benefits: [
      "Hands-free operation",
      "Accessibility improvement",
      "Natural interactions",
      "Multi-language support"
    ],
    useCases: [
      "Voice assistants",
      "Call center automation",
      "Meeting transcription",
      "Voice commands"
    ],
    timeline: "4-6 weeks for implementation",
    pricing: "Starting at $3,500/month"
  },
  {
    icon: Eye,
    title: "Computer Vision Services",
    description: "Deploy image recognition, object detection, and visual quality control systems for your operations.",
    overview: "Implement advanced computer vision systems that can analyze, understand, and make decisions based on visual data.",
    features: [
      "Object detection",
      "Image classification",
      "Facial recognition",
      "Quality inspection",
      "Real-time processing"
    ],
    benefits: [
      "99% accuracy in detection",
      "Automated quality control",
      "Reduced inspection time",
      "Consistent standards"
    ],
    useCases: [
      "Manufacturing QC",
      "Retail analytics",
      "Security monitoring",
      "Medical imaging"
    ],
    timeline: "6-8 weeks for deployment",
    pricing: "Starting at $5,000/month"
  },
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Enhance user experience with intelligent search that understands context, intent, and semantic meaning.",
    overview: "Implement semantic search systems that go beyond keyword matching to understand user intent and deliver relevant results.",
    features: [
      "Semantic understanding",
      "Personalized results",
      "Autocomplete",
      "Faceted search",
      "Analytics"
    ],
    benefits: [
      "70% improvement in search accuracy",
      "Better user engagement",
      "Reduced bounce rate",
      "Increased conversions"
    ],
    useCases: [
      "E-commerce product search",
      "Knowledge base search",
      "Content discovery",
      "Document retrieval"
    ],
    timeline: "3-4 weeks for integration",
    pricing: "Starting at $2,500/month"
  },
  {
    icon: Sparkles,
    title: "AI Integration Consulting",
    description: "Strategic guidance to identify opportunities and implement AI solutions that drive real business value.",
    overview: "Work with our experts to develop an AI strategy, identify use cases, and implement solutions that align with your business goals.",
    features: [
      "AI readiness assessment",
      "Use case identification",
      "ROI analysis",
      "Implementation roadmap",
      "Change management"
    ],
    benefits: [
      "Strategic AI adoption",
      "Risk mitigation",
      "Cost optimization",
      "Best practices"
    ],
    useCases: [
      "Digital transformation",
      "AI strategy development",
      "Technology selection",
      "Pilot projects"
    ],
    timeline: "Ongoing engagement",
    pricing: "Starting at $10,000 per project"
  },
  {
    icon: Headphones,
    title: "Customer Service Hub",
    description: "Unified AI-powered customer service platform combining chat, voice, and analytics for comprehensive support.",
    overview: "Deploy a complete customer service solution that integrates multiple AI capabilities for seamless customer interactions.",
    features: [
      "Omnichannel support",
      "Unified inbox",
      "AI routing",
      "Knowledge base",
      "Performance analytics"
    ],
    benefits: [
      "Seamless customer experience",
      "Reduced wait times",
      "Improved satisfaction scores",
      "Agent productivity boost"
    ],
    useCases: [
      "Enterprise support",
      "SaaS customer success",
      "E-commerce support",
      "Technical support"
    ],
    timeline: "6-8 weeks for full deployment",
    pricing: "Starting at $6,000/month"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive AI solutions tailored to transform your business operations
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {services.map((service, index) => (
              <Card 
                key={index}
                onClick={() => setSelectedService(service)}
                className="group p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
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

        {/* Sister Companies Section */}
        <SisterCompaniesSection />
      </main>

      <Footer />

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Services;
