import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: number;
}

const QUICK_ACTIONS = [
  { label: 'Services', message: 'What services do you offer?' },
  { label: 'Pricing', message: 'Tell me about your pricing' },
  { label: 'Demo', message: 'I want to schedule a demo' },
];

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize session
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    const storedMessages = localStorage.getItem('chatMessages');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } else {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('chatSessionId', newSessionId);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Show new message indicator
  useEffect(() => {
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].type === 'bot') {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
      localStorage.removeItem('chatSessionId');
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('chatSessionId', newSessionId);
    }
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (text) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      try {
        console.log('Sending message to webhook:', text);
        const response = await fetch('https://n8n.fpr.net/webhook-test/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: text
          })
        });
        
        console.log('Webhook response status:', response.status);
        const data = await response.json();
        console.log('Webhook response data:', data);
        console.log('Data type:', typeof data);
        console.log('Is array:', Array.isArray(data));
        
        let content = '';
        
        // Handle response format: [{ output: "..." }]
        if (Array.isArray(data) && data.length > 0) {
          console.log('First item in array:', data[0]);
          console.log('Has output field:', 'output' in data[0]);
          content = data[0].output || data[0].response || data[0].message || JSON.stringify(data[0]);
        } else if (data && typeof data === 'object') {
          console.log('Object response, checking fields:', Object.keys(data));
          content = data.output || data.response || data.message || data.content || JSON.stringify(data);
        } else {
          content = JSON.stringify(data);
        }
        
        console.log('Final content to display:', content);
        
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: content,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 500);
      } catch (error) {
        console.error('Webhook error:', error);
        console.error('Error details:', {
          name: (error as Error).name,
          message: (error as Error).message,
          stack: (error as Error).stack
        });
        setTimeout(() => {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: 'I\'m here to help! Could you rephrase that question?',
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 500);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble Message when closed */}
      {!isOpen && !isMinimized && (
        <div className="mb-4 animate-chatbot-slide-up">
          <Card className="w-auto max-w-xs bg-background border-border shadow-lg">
            <div className="p-3 flex items-start gap-2">
              <Avatar className="h-6 w-6 bg-primary flex-shrink-0 mt-0.5">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">QuantumVector AI</p>
                <p className="text-sm text-foreground">How may I help you?</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <Card className="mb-4 w-[380px] h-[500px] flex flex-col shadow-2xl border-border bg-background animate-chatbot-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-primary relative">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">QuantumVector AI</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearHistory}
                className="h-8 w-8"
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 overflow-hidden">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-2 animate-chatbot-slide-up',
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.type === 'bot' && (
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2 max-w-[75%] break-words',
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {message.type === 'user' && (
                    <Avatar className="h-8 w-8 bg-muted">
                      <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                        You
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-chatbot-typing"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex gap-2 flex-wrap">
                {QUICK_ACTIONS.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSend(action.message)}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={handleOpen}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all hover:scale-110 animate-chatbot-float relative"
      >
        {hasNewMessage && !isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-destructive rounded-full animate-chatbot-pulse" />
        )}
        {isOpen && !isMinimized ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};
