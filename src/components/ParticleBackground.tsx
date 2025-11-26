import { Zap, Brain, Cpu, Sparkles } from "lucide-react";

export const ParticleBackground = () => {
  const particles = [
    { Icon: Zap, delay: "0s", top: "10%", left: "10%" },
    { Icon: Brain, delay: "1s", top: "20%", left: "80%" },
    { Icon: Cpu, delay: "2s", top: "70%", left: "15%" },
    { Icon: Sparkles, delay: "1.5s", top: "60%", left: "85%" },
    { Icon: Zap, delay: "0.5s", top: "40%", left: "50%" },
    { Icon: Brain, delay: "2.5s", top: "85%", left: "60%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute animate-particles-float opacity-20"
          style={{
            top: particle.top,
            left: particle.left,
            animationDelay: particle.delay,
          }}
        >
          <particle.Icon className="h-8 w-8 text-primary" />
        </div>
      ))}
    </div>
  );
};
