
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "welcome-message",
    content: "Hello! I'm your photography assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const commonQuestions = [
  "What are your photography packages?",
  "How far in advance should I book?",
  "Do you offer prints and albums?",
  "What is your cancellation policy?",
];

// In a production environment, this would be handled by a backend API call to OpenAI
// For now, we'll simulate responses based on common photography questions
const generateResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (message.toLowerCase().includes("package") || message.toLowerCase().includes("pricing")) {
        resolve("We offer several photography packages starting at $299 for portrait sessions and $1,999 for weddings. Each package includes professional editing, digital downloads, and print rights. Would you like me to send you our full pricing guide?");
      } else if (message.toLowerCase().includes("book") || message.toLowerCase().includes("schedule") || message.toLowerCase().includes("advance")) {
        resolve("We recommend booking at least 3 months in advance for portrait sessions and 6-12 months for weddings. Popular dates can book up quickly, especially during wedding season (May-October).");
      } else if (message.toLowerCase().includes("print") || message.toLowerCase().includes("album")) {
        resolve("Yes, we offer high-quality prints, custom albums, and wall art. After your session, you'll receive access to an online gallery where you can select your favorite images for prints or albums.");
      } else if (message.toLowerCase().includes("cancel") || message.toLowerCase().includes("reschedule")) {
        resolve("Our cancellation policy allows for full refunds up to 30 days before your session. Cancellations within 30 days will receive a 50% refund. Rescheduling is complimentary with at least 14 days' notice.");
      } else {
        resolve("Thank you for your question. I'd be happy to help with that. For more detailed information, would you like to speak with one of our photographers directly?");
      }
    }, 1500);
  });
};

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (content: string = input) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a production app, this would call your backend API, which would then call OpenAI
      const response = await generateResponse(content);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem getting a response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 h-[540px] bg-card shadow-lg rounded-xl border border-border flex flex-col z-50"
        >
          {/* Chatbot header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Photography Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about our services</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chatbot messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm">Typing...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Common questions */}
          {messages.length <= 2 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Common questions:</p>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chatbot input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                size="icon"
                disabled={isLoading || !input.trim()}
                onClick={() => handleSendMessage()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
