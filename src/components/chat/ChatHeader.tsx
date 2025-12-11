import { Bot, RotateCcw } from "lucide-react";

interface ChatHeaderProps {
  onClear: () => void;
}

export function ChatHeader({ onClear }: ChatHeaderProps) {
  return (
    <div className="h-14 border-b border-slate-100 px-6 flex items-center justify-between shrink-0 bg-white">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-indigo-200">
          <Bot size={18} />
        </div>
        <h2 className="font-semibold text-slate-800">Chat Assistant</h2>
      </div>
      
      <button 
        onClick={onClear} 
        className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors" 
        title="Clear Chat (Visual Only)"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
}