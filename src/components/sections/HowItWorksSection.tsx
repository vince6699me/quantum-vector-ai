import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Analysis",
    description: "We analyze your business processes, identify AI opportunities, and define clear objectives for measurable impact.",
  },
  {
    number: "02",
    title: "Strategy & Design",
    description: "Our experts design a custom AI solution architecture tailored to your specific requirements and infrastructure.",
  },
  {
    number: "03",
    title: "Development & Training",
    description: "We build and train AI models using industry best practices, ensuring accuracy, reliability, and scalability.",
  },
  {
    number: "04",
    title: "Deployment & Support",
    description: "Seamless integration with your existing systems, plus ongoing monitoring, optimization, and dedicated support.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground">
            Our proven four-step process ensures successful AI implementation from concept to deployment.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="text-6xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                        {step.number}
                      </div>
                      <CheckCircle className="absolute top-0 right-0 h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 pt-2">
                    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to get started?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};
