import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  role: "user" | "ai";
  text: string;
}

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      
      {/* AI Avatar */}
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-1">
          <Bot size={16} />
        </div>
      )}
      
      {/* Message Bubble */}
      <div className={`max-w-[85%] px-5 py-3.5 text-md leading-relaxed shadow-sm whitespace-pre-wrap ${isUser? "bg-slate-900 text-white rounded-2xl rounded-br-none" : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-none"}`}>
        <ReactMarkdown >
            {text}
        </ReactMarkdown>
      </div>

    </div>
  );
}