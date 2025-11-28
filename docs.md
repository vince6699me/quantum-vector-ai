# Chatbot Widget Integration Guide

This guide explains how to add the **QuantumVector AI Chatbot Widget** to a similar project: a Vite + React + TypeScript + Tailwind CSS + shadcn/ui setup. The widget is a floating, toggleable chat interface that sends user messages to a webhook endpoint (e.g., n8n workflow, custom backend) and displays responses in a modern UI built with shadcn/ui components.

## Prerequisites

- A Vite + React 18+ + TypeScript project.
- Tailwind CSS configured.
- shadcn/ui initialized (`npx shadcn@latest init`).
- Node.js/npm or equivalent package manager (bun, pnpm, yarn).

## Step 1: Install Required Dependencies

The widget uses `lucide-react` for icons and relies on shadcn/ui primitives.

```bash
npm install lucide-react
# or
bun add lucide-react
```

Ensure your `package.json` includes React 18+, `clsx`, `tailwind-merge`, `class-variance-authority` (for shadcn/ui).

## Step 2: Add shadcn/ui Components

Install the exact UI primitives used:

```bash
npx shadcn@latest add button input card scroll-area avatar
```

This creates the necessary components in `src/components/ui/`.

## Step 3: Verify/Create Utility Functions

The widget uses the `cn` utility for conditional classNames. Ensure `src/lib/utils.ts` exists:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

If missing, create it with the above content.

## Step 4: Create the ChatWidget Component

Create `src/components/ChatWidget.tsx` and copy the following code:

```typescript
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
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

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: inputValue.trim(),
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputValue.trim();
      setInputValue('');

      try {
        const response = await fetch('https://n8n.fpr.net/webhook/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: currentInput })
        });
        const textResponse = await response.text();
        let content = textResponse.trim();
        
        // Try to parse as JSON if it's not empty
        if (content && !content.startsWith('<')) {
          try {
            const data = JSON.parse(textResponse);
            const firstItem = Array.isArray(data) ? data[0] : data;
            content = firstItem?.output || firstItem?.text || firstItem?.response || firstItem?.message || firstItem?.content || JSON.stringify(data);
          } catch (parseError) {
            // If not JSON, use raw text
          }
        }
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: content,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Sorry, there was an error processing your request.',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMessage]);
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
      {/* Chat Window */}
      {isOpen && (
        <Card className="mb-4 w-[380px] h-[500px] flex flex-col shadow-2xl border-border bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">QuantumVector AI</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      'bg-green-500'
                    )}
                  />
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-2',
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
            </div>
          </ScrollArea>

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
                onClick={handleSend}
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
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};
```

## Step 5: Integrate into Your App

In `src/App.tsx` (or root component), import and render `<ChatWidget />` **after** your providers (e.g., QueryClientProvider, TooltipProvider) and routing:

```typescript
import { ChatWidget } from '@/components/ChatWidget';
// ... other imports

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toasters, Router, Routes */}
      <ChatWidget />  {/* Add here */}
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Positioning**: The widget uses `fixed bottom-6 right-6 z-50`, so it floats over content.

## Step 6: Configure the Webhook Endpoint

**Critical**: Update the `fetch` URL in `handleSend` to your backend:

```typescript
const response = await fetch('YOUR_WEBHOOK_URL', {  // e.g., 'https://your-n8n.com/webhook/chatbot'
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: currentInput })
});
```

- Expects POST with `{ message: string }`.
- Response: Plain text or JSON (auto-parses common fields like `output`, `text`, `response`).
- Your backend (n8n, Express, etc.) should return AI-generated responses.

**Pro Tip**: Use environment variables:
1. Add to `.env`: `VITE_CHATBOT_WEBHOOK=https://your-endpoint.com/webhook`
2. In code: `import.meta.env.VITE_CHATBOT_WEBHOOK`

## Step 7: Run and Test

```bash
npm run dev  # or bun dev
```

1. Open `http://localhost:5173`.
2. Click the chat toggle (bottom-right).
3. Send a message – verify it hits your webhook and displays response.
4. Test Enter key, errors, scrolling.

## Customization Options

- **Position**: Change `bottom-6 right-6` to `bottom-6 left-6` or use CSS vars.
- **Branding**: Update header text (`QuantumVector AI`), avatar, colors (uses Tailwind `primary`).
- **Size**: Adjust `w-[380px] h-[500px]`.
- **Features**:
  - Add message history persistence (localStorage).
  - Typing indicators.
  - File uploads.
  - Authentication.
- **Styling**: Override Tailwind classes (e.g., `bg-gradient-to-r` in header).
- **Mobile**: Responsive by default; test with `use-mobile` hook if needed.

## Troubleshooting

- **Components missing**: Re-run shadcn add commands.
- **Styles broken**: Ensure Tailwind config includes shadcn paths.
- **CORS errors**: Configure your webhook server.
- **No response**: Check Network tab; verify webhook returns text/JSON.

## Full Config Summary

| Aspect | Config |
|--------|--------|
| **Position** | `fixed bottom-6 right-6 z-50` |
| **Size** | 380x500px |
| **Dependencies** | `lucide-react`, shadcn/ui (button, input, card, scroll-area, avatar) |
| **Utils** | `cn` from `lib/utils.ts` |
| **Endpoint** | POST `/webhook` with `{ message }` |
| **Providers** | Render after TooltipProvider/QueryClientProvider |

This widget is production-ready, performant, and customizable. Fork and adapt!

*Generated from QuantumVector project.*