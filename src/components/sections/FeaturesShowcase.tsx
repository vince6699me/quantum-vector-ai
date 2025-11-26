import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Workflow, LineChart, Shield, Play } from "lucide-react";
import { AIChatPreview } from "./AIChatPreview";

const features = [
  {
    icon: Bot,
    title: "Intelligent Chatbots",
    description: "24/7 automated customer support with natural language understanding",
    stats: { value: "95%", label: "Resolution Rate" },
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline operations and eliminate repetitive tasks automatically",
    stats: { value: "10x", label: "Faster Processing" },
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Data-driven insights and forecasting for better decision making",
    stats: { value: "85%", label: "Accuracy" },
  },
  {
    icon: Shield,
    title: "AI Security",
    description: "Advanced threat detection and real-time security monitoring",
    stats: { value: "99.9%", label: "Protection Rate" },
  },
];

export const FeaturesShowcase = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Powerful AI Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the next generation of AI-powered business tools designed to transform your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-6 bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="space-y-4">
                  <div className="relative w-12 h-12">
                    <feature.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {feature.stats.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.stats.label}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20"
                      >
                        <Play className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Live Demo */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-4 text-center">
                <h3 className="text-xl font-semibold mb-2">See It In Action</h3>
                <p className="text-sm text-muted-foreground">
                  Watch our AI assistant handle customer inquiries in real-time
                </p>
              </div>
              <AIChatPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
