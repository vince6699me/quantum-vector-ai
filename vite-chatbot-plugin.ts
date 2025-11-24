import { Plugin } from 'vite';
import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { Duplex } from 'stream';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export function chatbotPlugin(): Plugin {
  let wss: WebSocketServer;
  const CHATBOT_PATH = '/chatbot';

  return {
    name: 'vite-chatbot-plugin',
    configureServer(server) {
      // Create WebSocket server
      wss = new WebSocketServer({ noServer: true });

      console.log('[ChatBot Plugin] Initializing WebSocket server');

      // Handle WebSocket connections
      wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
        console.log('[ChatBot] Client connected from:', request.socket.remoteAddress);

        // Send welcome message
        const welcomeMessage: ChatMessage = {
          id: crypto.randomUUID(),
          type: 'bot',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: Date.now(),
        };
        
        ws.send(JSON.stringify(welcomeMessage));
        console.log('[ChatBot] Welcome message sent');

        // Handle incoming messages
        ws.on('message', (data: Buffer) => {
          try {
            const message = JSON.parse(data.toString());
            console.log('[ChatBot] Received:', message.content);

            // Simulate bot response
            setTimeout(() => {
              const botResponse: ChatMessage = {
                id: crypto.randomUUID(),
                type: 'bot',
                content: generateBotResponse(message.content),
                timestamp: Date.now(),
              };
              
              console.log('[ChatBot] Sending:', botResponse.content);
              ws.send(JSON.stringify(botResponse));
            }, 500);

          } catch (error) {
            console.error('[ChatBot] Error:', error);
          }
        });

        ws.on('close', () => {
          console.log('[ChatBot] Client disconnected');
        });

        ws.on('error', (error) => {
          console.error('[ChatBot] Error:', error);
        });

        // Ping to keep connection alive
        const pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
          }
        }, 30000);

        ws.on('close', () => {
          clearInterval(pingInterval);
        });
      });

      // Handle HTTP upgrade to WebSocket
      server.httpServer?.on('upgrade', (request: IncomingMessage, socket: Duplex, head: Buffer) => {
        const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
        
        // Only handle our chatbot path, let Vite handle its own WebSocket
        if (pathname === CHATBOT_PATH) {
          console.log('[ChatBot Plugin] Upgrade request for chatbot');
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        }
        // Let other paths (like Vite HMR) be handled by Vite
      });
    },
    closeBundle() {
      console.log('[ChatBot Plugin] Closing WebSocket server');
      wss?.close();
    },
  };
}

function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if (lowerMessage.includes('help')) {
    return 'I\'m here to help! You can ask me about our services, pricing, or any other questions you might have.';
  } else if (lowerMessage.includes('service')) {
    return 'We offer AI-powered business solutions to transform your workflow. Check out our Services page for more details!';
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return 'Our pricing is flexible and tailored to your needs. Visit our Pricing page or contact our sales team for a custom quote.';
  } else if (lowerMessage.includes('contact')) {
    return 'You can reach us through the Contact section on our website. We\'d love to hear from you!';
  } else {
    return `I understand you're asking about "${userMessage}". Let me help you with that. Our AI solutions can automate workflows and enhance customer experiences. Would you like to know more about our specific services?`;
  }
}
