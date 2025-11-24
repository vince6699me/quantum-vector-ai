import { useEffect, useRef, useState, useCallback } from 'react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: number;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number>();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const message: ChatMessage = JSON.parse(event.data);
          setMessages((prev) => [...prev, message]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);

        // Exponential backoff reconnection
        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
          console.log(`Reconnecting in ${delay}ms...`);
          
          reconnectTimeout.current = window.setTimeout(() => {
            reconnectAttempts.current++;
            connect();
          }, delay);
        } else {
          console.error('Max reconnection attempts reached');
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
    }
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      clearTimeout(reconnectTimeout.current);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((content: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message: ChatMessage = {
        id: crypto.randomUUID(),
        type: 'user',
        content,
        timestamp: Date.now(),
      };
      
      // Add user message immediately to UI
      setMessages((prev) => [...prev, message]);
      
      // Send to server
      ws.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected,
    messages,
    sendMessage,
    clearMessages,
  };
};
