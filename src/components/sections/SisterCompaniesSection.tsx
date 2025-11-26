import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sisterCompanies = [
  {
    name: "Archon Cybersecurity",
    icon: Shield,
    tagline: "Enterprise-Grade Security Solutions",
    description: "Comprehensive cybersecurity services protecting businesses from evolving digital threats with advanced threat detection, incident response, and compliance management.",
    features: [
      "24/7 Security Monitoring",
      "Penetration Testing",
      "Compliance Management",
      "Incident Response"
    ],
    industries: ["Finance", "Healthcare", "Government", "Enterprise"],
    link: "https://archoncyber.com",
  },
  {
    name: "Apex Capital",
    icon: TrendingUp,
    tagline: "Strategic Investment & Growth",
    description: "Venture capital firm specializing in AI and technology startups, providing funding and strategic guidance to drive innovation and accelerate growth.",
    features: [
      "Seed to Series A Funding",
      "Strategic Advisory",
      "Network Access",
      "Operational Support"
    ],
    industries: ["AI/ML", "SaaS", "FinTech", "Startups"],
    link: "https://apexcapital.com",
  },
];

export const SisterCompaniesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Our Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground">
            Part of a comprehensive suite of technology and business services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sisterCompanies.map((company, index) => (
            <Card
              key={index}
              className="group p-8 bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="space-y-6">
                {/* Icon & Header */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <company.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 rounded-lg blur-xl bg-primary/20 group-hover:bg-primary/30 transition-all" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a href={company.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">{company.name}</h3>
                  <p className="text-primary font-medium">{company.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Services</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {company.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industries */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.industries.map((industry, idx) => (
                      <Badge key={idx} variant="outline" className="border-primary/30">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border border-primary/30"
                  asChild
                >
                  <a href={company.link} target="_blank" rel="noopener noreferrer">
                    Visit {company.name}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Ecosystem CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Together, we provide end-to-end solutions for modern businesses
          </p>
          <Button size="lg" variant="outline" className="border-primary/30">
            Explore Our Ecosystem
          </Button>
        </div>
      </div>
    </section>
  );
};
