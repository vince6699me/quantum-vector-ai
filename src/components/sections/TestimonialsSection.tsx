import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  metric: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    quote: "QuantumVector transformed our customer support entirely. The AI chatbot handles 80% of inquiries automatically, and our team can focus on complex issues.",
    metric: "300% response improvement",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CEO",
    company: "DataStream Analytics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    quote: "The predictive analytics solution has given us unprecedented insights into market trends. We've increased forecast accuracy by 85% since implementation.",
    metric: "85% accuracy increase",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "COO",
    company: "GlobalRetail Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    quote: "Workflow automation has saved us countless hours. What used to take days now happens in minutes. The ROI was evident within the first month.",
    metric: "10x faster processing",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "SecureCloud Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    quote: "The AI security solution has been a game-changer for our infrastructure. Real-time threat detection and automated responses keep us protected 24/7.",
    metric: "99.9% threat prevention",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            See how businesses are transforming with our AI solutions
          </p>
        </div>

        {/* Featured Testimonial */}
        <div
          className="max-w-4xl mx-auto mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-card to-card/50 border-primary/20">
            <div className="space-y-6">
              <Quote className="h-12 w-12 text-primary/50" />
              
              <p className="text-xl lg:text-2xl leading-relaxed">
                "{currentTestimonial.quote}"
              </p>

              <div className="flex items-center gap-1">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                    <AvatarFallback>{currentTestimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">{currentTestimonial.name}</div>
                    <div className="text-muted-foreground">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {currentTestimonial.metric.split(' ')[0]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentTestimonial.metric.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mini Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-4 bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => setCurrentIndex(testimonials.indexOf(testimonial))}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{testimonial.company}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {testimonial.quote}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
