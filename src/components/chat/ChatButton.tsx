
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chatbot from "./Chatbot";

const ChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
          >
            <Button
              onClick={() => setIsChatOpen(true)}
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton;
