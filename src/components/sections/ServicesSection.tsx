import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Bot, FileText, Target, Brain, LineChart, FileSearch, Mic, Eye, Search, Sparkles, Check, Clock, DollarSign } from "lucide-react";

interface ServiceDetails {
  overview: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  timeline: string;
  pricing: string;
}

interface Service {
  id: string;
  icon: typeof Bot;
  title: string;
  description: string;
  category: string;
  detailedInfo: ServiceDetails;
}

const services: Service[] = [
  {
    id: "chatbots",
    icon: Bot,
    title: "Customer Care Chatbots",
    description: "24/7 intelligent customer support powered by advanced NLP to handle inquiries, resolve issues, and improve satisfaction.",
    category: "Customer Experience",
    detailedInfo: {
      overview: "Deploy AI-powered chatbots that understand natural language, handle complex queries, and provide personalized responses. Our chatbots integrate seamlessly with your existing systems and learn from every interaction.",
      features: [
        "Multi-language support with real-time translation",
        "Sentiment analysis for emotional intelligence",
        "Seamless handoff to human agents",
        "Integration with CRM and helpdesk systems",
        "Custom training on your business data",
        "Analytics dashboard for insights"
      ],
      benefits: [
        "Reduce support costs by up to 60%",
        "24/7 availability without additional staff",
        "Consistent, accurate responses every time",
        "Improved customer satisfaction scores"
      ],
      useCases: [
        "E-commerce customer support",
        "Banking and financial services",
        "Healthcare appointment booking",
        "Technical support automation"
      ],
      timeline: "4-8 weeks",
      pricing: "Starting from Ksh 1,950,000"
    }
  },
  {
    id: "content-generation",
    icon: FileText,
    title: "Marketing Content Generation",
    description: "Create compelling, SEO-optimized content at scale with AI that understands your brand voice and audience.",
    category: "Marketing",
    detailedInfo: {
      overview: "Leverage advanced language models to generate high-quality marketing content that resonates with your audience. From blog posts to social media, our AI maintains your brand voice while producing engaging content at scale.",
      features: [
        "Brand voice customization and consistency",
        "SEO optimization built-in",
        "Multi-format content generation",
        "A/B testing content variations",
        "Plagiarism-free original content",
        "Content calendar automation"
      ],
      benefits: [
        "10x faster content production",
        "Consistent brand messaging",
        "Higher search engine rankings",
        "Reduced content creation costs"
      ],
      useCases: [
        "Blog and article writing",
        "Social media content",
        "Email marketing campaigns",
        "Product descriptions"
      ],
      timeline: "2-4 weeks",
      pricing: "Starting from Ksh 1,300,000"
    }
  },
  {
    id: "lead-generation",
    icon: Target,
    title: "Lead Generation & Qualification",
    description: "Automate lead scoring and qualification with AI models trained on your ideal customer profiles.",
    category: "Sales",
    detailedInfo: {
      overview: "Transform your sales pipeline with AI-powered lead scoring that identifies your most promising prospects. Our models learn from your historical data to predict which leads are most likely to convert.",
      features: [
        "Predictive lead scoring algorithms",
        "Behavioral analysis and intent signals",
        "CRM integration (Salesforce, HubSpot, etc.)",
        "Real-time lead enrichment",
        "Automated follow-up sequences",
        "Custom scoring criteria"
      ],
      benefits: [
        "Increase conversion rates by 40%",
        "Focus sales efforts on high-value leads",
        "Reduce time spent on unqualified leads",
        "Data-driven decision making"
      ],
      useCases: [
        "B2B enterprise sales",
        "SaaS customer acquisition",
        "Real estate prospecting",
        "Financial services marketing"
      ],
      timeline: "4-6 weeks",
      pricing: "Starting from Ksh 2,600,000"
    }
  },
  {
    id: "custom-llm",
    icon: Brain,
    title: "Custom LLM Development",
    description: "Build domain-specific language models tailored to your industry's unique terminology and requirements.",
    category: "Advanced AI",
    detailedInfo: {
      overview: "Develop custom large language models fine-tuned on your proprietary data. These models understand your industry jargon, comply with your regulations, and deliver superior performance for your specific use cases.",
      features: [
        "Fine-tuning on proprietary datasets",
        "Domain-specific knowledge embedding",
        "Compliance and safety guardrails",
        "Private deployment options",
        "Continuous learning capabilities",
        "API access and integration support"
      ],
      benefits: [
        "Superior accuracy for your domain",
        "Complete data privacy and control",
        "Competitive advantage through AI",
        "Reduced dependency on generic models"
      ],
      useCases: [
        "Legal document analysis",
        "Medical diagnosis support",
        "Financial modeling and analysis",
        "Technical documentation automation"
      ],
      timeline: "8-16 weeks",
      pricing: "Starting from Ksh 6,500,000"
    }
  },
  {
    id: "predictive-analytics",
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Make data-driven decisions with AI-powered forecasting and trend analysis for your business metrics.",
    category: "Business Intelligence",
    detailedInfo: {
      overview: "Harness the power of machine learning to predict future trends, customer behavior, and market changes. Our predictive models help you stay ahead of the competition with actionable insights.",
      features: [
        "Time series forecasting",
        "Customer churn prediction",
        "Demand forecasting",
        "Anomaly detection",
        "Interactive dashboards",
        "Automated reporting"
      ],
      benefits: [
        "Reduce inventory costs by 25%",
        "Improve customer retention",
        "Optimize pricing strategies",
        "Minimize business risks"
      ],
      useCases: [
        "Retail demand planning",
        "Financial risk assessment",
        "Supply chain optimization",
        "Customer lifetime value prediction"
      ],
      timeline: "6-10 weeks",
      pricing: "Starting from Ksh 3,900,000"
    }
  },
  {
    id: "document-intelligence",
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Extract, classify, and analyze information from documents automatically with advanced OCR and NLP.",
    category: "Automation",
    detailedInfo: {
      overview: "Automate document processing with AI that can read, understand, and extract key information from any document type. From invoices to contracts, streamline your document workflows.",
      features: [
        "Advanced OCR with 99%+ accuracy",
        "Multi-format support (PDF, images, scans)",
        "Named entity recognition",
        "Document classification",
        "Data validation and verification",
        "Workflow automation integration"
      ],
      benefits: [
        "90% reduction in manual data entry",
        "Faster document processing",
        "Fewer errors and inconsistencies",
        "Improved compliance tracking"
      ],
      useCases: [
        "Invoice processing",
        "Contract analysis",
        "Insurance claims processing",
        "HR document management"
      ],
      timeline: "4-8 weeks",
      pricing: "Starting from Ksh 3,250,000"
    }
  },
  {
    id: "voice-ai",
    icon: Mic,
    title: "Voice AI Solutions",
    description: "Implement natural voice interfaces for customer service, transcription, and voice-activated workflows.",
    category: "Voice Technology",
    detailedInfo: {
      overview: "Create seamless voice experiences with AI that understands natural speech patterns, accents, and context. Perfect for call centers, virtual assistants, and voice-enabled applications.",
      features: [
        "Speech-to-text transcription",
        "Natural language understanding",
        "Text-to-speech synthesis",
        "Voice biometrics for authentication",
        "Multi-accent support",
        "Real-time processing"
      ],
      benefits: [
        "Hands-free customer interactions",
        "Improved accessibility",
        "Faster call resolution times",
        "Enhanced user experience"
      ],
      useCases: [
        "Call center automation",
        "Voice-activated assistants",
        "Meeting transcription",
        "Voice commerce applications"
      ],
      timeline: "6-12 weeks",
      pricing: "Starting from Ksh 4,550,000"
    }
  },
  {
    id: "computer-vision",
    icon: Eye,
    title: "Computer Vision Services",
    description: "Deploy image recognition, object detection, and visual quality control systems for your operations.",
    category: "Visual AI",
    detailedInfo: {
      overview: "Implement computer vision solutions that can see, understand, and analyze visual data. From quality control to security surveillance, automate visual inspection tasks with precision.",
      features: [
        "Object detection and tracking",
        "Image classification",
        "Facial recognition (with consent)",
        "Visual anomaly detection",
        "Real-time video analysis",
        "Edge deployment options"
      ],
      benefits: [
        "Automated quality control",
        "Enhanced security monitoring",
        "Reduced inspection costs",
        "Consistent visual analysis"
      ],
      useCases: [
        "Manufacturing quality control",
        "Retail analytics",
        "Security and surveillance",
        "Medical imaging analysis"
      ],
      timeline: "8-14 weeks",
      pricing: "Starting from Ksh 5,200,000"
    }
  },
  {
    id: "ai-search",
    icon: Search,
    title: "AI-Powered Search",
    description: "Enhance user experience with intelligent search that understands context, intent, and semantic meaning.",
    category: "Search & Discovery",
    detailedInfo: {
      overview: "Transform your search experience with AI that understands what users mean, not just what they type. Deliver relevant results that improve engagement and conversion.",
      features: [
        "Semantic search understanding",
        "Personalized search results",
        "Auto-complete with AI",
        "Typo tolerance and correction",
        "Faceted search and filtering",
        "Search analytics and insights"
      ],
      benefits: [
        "Higher search conversion rates",
        "Improved user satisfaction",
        "Reduced bounce rates",
        "Better content discovery"
      ],
      useCases: [
        "E-commerce product search",
        "Enterprise knowledge base",
        "Content platform discovery",
        "Documentation search"
      ],
      timeline: "4-8 weeks",
      pricing: "Starting from Ksh 2,600,000"
    }
  },
  {
    id: "consulting",
    icon: Sparkles,
    title: "AI Integration Consulting",
    description: "Strategic guidance to identify opportunities and implement AI solutions that drive real business value.",
    category: "Strategy",
    detailedInfo: {
      overview: "Partner with our AI experts to develop a comprehensive AI strategy for your organization. We help you identify high-impact opportunities, build roadmaps, and ensure successful AI adoption.",
      features: [
        "AI readiness assessment",
        "Opportunity identification",
        "ROI analysis and projections",
        "Technology stack recommendations",
        "Change management support",
        "Training and enablement"
      ],
      benefits: [
        "Clear AI implementation roadmap",
        "Minimized implementation risks",
        "Faster time to value",
        "Sustainable AI capabilities"
      ],
      useCases: [
        "Enterprise AI transformation",
        "Startup AI strategy",
        "Department-level automation",
        "AI governance frameworks"
      ],
      timeline: "2-6 weeks",
      pricing: "Starting from Ksh 1,300,000"
    }
  }
];

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedService(null), 200);
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Comprehensive AI Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From chatbots to predictive analytics, we provide end-to-end AI services tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="group p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-12 h-12">
                    <service.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                  </div>
                  <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <button 
                  onClick={() => openModal(service)}
                  className="text-primary font-medium text-sm group-hover:underline inline-flex items-center gap-1"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden bg-card border-border p-0">
          {selectedService && (
            <>
              <DialogHeader className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <selectedService.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                      {selectedService.category}
                    </span>
                    <DialogTitle className="text-xl font-bold mt-1">
                      {selectedService.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="sr-only">
                  Details about {selectedService.title} service
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-[calc(90vh-220px)]">
                <div className="p-6 space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedService.detailedInfo.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                    <div className="grid gap-2">
                      {selectedService.detailedInfo.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-foreground/90">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Benefits</h4>
                    <div className="grid gap-2">
                      {selectedService.detailedInfo.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-green-500" />
                          </div>
                          <span className="text-foreground/90">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Use Cases</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.detailedInfo.useCases.map((useCase, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-lg bg-muted/50 border border-border text-sm"
                        >
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Timeline</span>
                      </div>
                      <p className="text-lg font-semibold">{selectedService.detailedInfo.timeline}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Investment</span>
                      </div>
                      <p className="text-lg font-semibold text-green-400">{selectedService.detailedInfo.pricing}</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="p-4 border-t border-border bg-muted/30 flex gap-3 sm:justify-between">
                <Button variant="outline" onClick={closeModal} className="flex-1">
                  Close
                </Button>
                <Button className="flex-1">
                  Request Consultation
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
