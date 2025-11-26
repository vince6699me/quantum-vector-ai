import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
}

const sampleMessages: Message[] = [
  { id: 1, type: "user", content: "What services do you offer?" },
  { id: 2, type: "bot", content: "We provide AI chatbots, workflow automation, predictive analytics, and custom AI solutions tailored to your business needs." },
  { id: 3, type: "user", content: "How quickly can you implement?" },
  { id: 4, type: "bot", content: "Most solutions can be deployed within 2-4 weeks, depending on complexity. We offer rapid prototyping to get you started quickly." },
];

export const AIChatPreview = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < sampleMessages.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, sampleMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="w-full h-[400px] bg-card border border-border rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <Avatar className="h-8 w-8 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            AI
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-sm">AI Assistant</h4>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2 animate-chatbot-slide-up",
              message.type === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.type === "bot" && (
              <Avatar className="h-6 w-6 bg-primary flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "rounded-lg px-3 py-2 max-w-[80%] text-sm",
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
