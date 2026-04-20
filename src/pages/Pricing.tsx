import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Ksh 1,500",
      period: "/month",
      description: "Perfect for small businesses getting started with AI",
      features: [
        "AI Chatbot Integration",
        "Basic Data Analysis",
        "5 Custom Models",
        "Email Support",
        "API Access",
        "Monthly Reports"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "Ksh 3,500",
      period: "/month",
      description: "Advanced AI solutions for growing businesses",
      features: [
        "Everything in Starter",
        "Advanced Predictive Analytics",
        "20 Custom Models",
        "Priority Support",
        "Custom Integrations",
        "Real-time Analytics",
        "Dedicated Account Manager",
        "Weekly Strategy Calls"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored AI solutions for large organizations",
      features: [
        "Everything in Professional",
        "Unlimited Custom Models",
        "24/7 Premium Support",
        "On-Premise Deployment",
        "Custom AI Development",
        "Advanced Security & Compliance",
        "Dedicated Team",
        "SLA Guarantee"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-background via-card/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Choose the perfect plan for your AI transformation journey
              </p>
              <p className="text-sm text-muted-foreground/70 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                All prices in Kenyan Shillings (Ksh) • VAT inclusive
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative ${
                    plan.popular 
                      ? 'border-primary/50 shadow-lg shadow-primary/20 scale-105' 
                      : 'border-border'
                  } bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Can I change plans later?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">What payment methods do you accept?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We accept M-Pesa, bank transfers, credit/debit cards (Visa, Mastercard), and can arrange custom payment terms for Enterprise clients. All payments are processed securely in Kenyan Shillings.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Is there a setup fee?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No setup fees for Starter and Professional plans. Enterprise plans may have custom implementation costs depending on requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Do you offer refunds?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We offer a 30-day money-back guarantee for all plans. If you're not satisfied, we'll provide a full refund in Kenyan Shillings.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Is VAT included in the pricing?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, all displayed prices include 16% VAT as per Kenya Revenue Authority requirements. You'll receive a proper tax invoice for all payments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
