import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
      
      {/* Render bubble */}
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} text={msg.text} />
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex gap-4 justify-start animate-pulse">
           <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mt-1">
              <Bot size={16} />
           </div>
           <div className="bg-white border border-slate-200 px-5 py-3.5 rounded-2xl rounded-bl-none flex items-center gap-2 text-slate-400 text-sm shadow-sm">
              <Loader2 size={16} className="animate-spin" /> Thinking...
           </div>
        </div>
      )}
      
      {/* hidden element for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
}