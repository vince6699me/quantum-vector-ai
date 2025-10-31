import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Star, Quote } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      company: "Technology",
      rating: 5,
      review: "QuantumVector AI transformed our customer service operations. Their chatbot solution reduced response times by 80% and improved customer satisfaction dramatically. The team was professional, knowledgeable, and delivered beyond our expectations.",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CTO, DataFlow Systems",
      company: "Data Analytics",
      rating: 5,
      review: "We implemented their predictive analytics solution and saw immediate results. The accuracy of predictions helped us optimize our inventory management and reduce costs by 35%. Exceptional work!",
      initials: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthCo",
      company: "Marketing",
      rating: 5,
      review: "The AI-powered marketing automation has been a game-changer. We've seen a 3x increase in conversion rates and our campaigns are now highly personalized. The ROI has been incredible.",
      initials: "ER"
    },
    {
      name: "David Thompson",
      role: "Operations Manager, LogiTech",
      company: "Logistics",
      rating: 5,
      review: "Their process automation solution streamlined our entire operation. We've cut processing time in half and virtually eliminated errors. The implementation was smooth and the support team is outstanding.",
      initials: "DT"
    },
    {
      name: "Lisa Park",
      role: "VP of Innovation, FinanceHub",
      company: "Finance",
      rating: 5,
      review: "Working with QuantumVector AI has been transformative for our fraud detection capabilities. The AI models they developed have a 99.2% accuracy rate and have saved us millions in potential losses.",
      initials: "LP"
    },
    {
      name: "James Wilson",
      role: "Product Manager, HealthTech Pro",
      company: "Healthcare",
      rating: 5,
      review: "The custom AI solution they built for our patient care system is phenomenal. It's improved diagnostic accuracy and patient outcomes. The team's expertise in healthcare AI is unmatched.",
      initials: "JW"
    },
    {
      name: "Rachel Green",
      role: "E-commerce Director, ShopSmart",
      company: "Retail",
      rating: 5,
      review: "Our personalized recommendation engine powered by their AI has increased our average order value by 45%. Customer engagement is at an all-time high. Highly recommend their services!",
      initials: "RG"
    },
    {
      name: "Alex Kumar",
      role: "Chief Data Officer, InsightCorp",
      company: "Business Intelligence",
      rating: 5,
      review: "The data analysis and insights we're getting from their AI platform are incredible. It's like having a team of analysts working 24/7. Decision-making has never been more data-driven and accurate.",
      initials: "AK"
    },
    {
      name: "Jennifer Martinez",
      role: "Head of HR, TalentFind",
      company: "Human Resources",
      rating: 5,
      review: "Their AI recruitment solution has revolutionized our hiring process. We're finding better candidates faster, and our time-to-hire has decreased by 60%. The bias reduction features are exceptional.",
      initials: "JM"
    }
  ];

  const stats = [
    { value: "4.9/5", label: "Average Rating" },
    { value: "500+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "1000+", label: "Reviews" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background via-card/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
                Client Reviews & Testimonials
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                See what our clients say about their AI transformation journey with us
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {reviews.map((review, index) => (
                <Card 
                  key={index}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:scale-105 bg-card/50 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 bg-primary/20 border border-primary/30">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {review.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{review.name}</CardTitle>
                          <CardDescription className="text-xs">{review.role}</CardDescription>
                          <CardDescription className="text-xs text-primary/70">{review.company}</CardDescription>
                        </div>
                      </div>
                      <Quote className="h-6 w-6 text-primary/30" />
                    </div>
                    
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{review.review}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join Our Happy Clients?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your AI transformation journey today and see why businesses trust QuantumVector AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                  Get Started
                </a>
                <a href="/pricing" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
