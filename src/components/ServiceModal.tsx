import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Clock, DollarSign } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    overview: string;
    features: string[];
    benefits: string[];
    useCases: string[];
    timeline: string;
    pricing: string;
  };
}

export const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground">{service.overview}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
            <ul className="space-y-2">
              {service.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Timeline</h4>
              </div>
              <p className="text-muted-foreground">{service.timeline}</p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Pricing</h4>
              </div>
              <p className="text-muted-foreground">{service.pricing}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Get Started with {service.title}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
