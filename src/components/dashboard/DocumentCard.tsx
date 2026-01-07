import { FileText, MoreVertical, Trash2, Bot, MessageSquare, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DocumentCardProps {
  id: string; 
  name: string;
  size?: string;
  date?: string;
  variant: "manage" | "chat";
  deleteDoc?: () => void;
  openDoc?: () => void;
  
  onStartChat?: (docId: string) => void;
  isStartingChat?: boolean; 
}

export function DocumentCard({ id, name, size, date, variant, deleteDoc, openDoc, onStartChat, isStartingChat }: DocumentCardProps) {

  const router = useRouter();

  
  // Variant 1: Manage/List Card 
  if (variant === "manage") {
    return (
      <div  className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all hover:border-indigo-200 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
            <FileText size={24} />
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={18} />
          </button>
        </div>
        
        <h3 className="font-semibold text-slate-800 truncate mb-1" title={name}>{name}</h3>
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>{size}</span>
          <span>{date}</span>
        </div>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity rounded-xl backdrop-blur-[1px]">
            <button onClick={openDoc}  className="cursor-pointer p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-indigo-600 shadow-sm"> Open PDF </button>
            <button onClick={deleteDoc} className="cursor-pointer p-2 bg-white border border-slate-200 rounded-full text-red-500 hover:bg-red-50 shadow-sm">
              <Trash2 size={18} />
            </button>
        </div>
      </div>
    );
  }


  
  // Variant 2: StartChat Card  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition-all shadow-sm group">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
          <Bot size={20} />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-semibold text-slate-800 truncate text-sm" title={name}>{name}</h3>
          <p className="text-xs text-slate-400">Ready to chat</p>
        </div>
      </div>

      <button 
        onClick={() => onStartChat && onStartChat(id)} 
        disabled={isStartingChat}
        className="cursor-pointer w-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white border border-indigo-100 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isStartingChat ? (
            <Loader2 size={16} className="animate-spin" />
        ) : (
            <MessageSquare size={16} className="group-hover:scale-110 transition-transform"/>
        )}
        {isStartingChat ? "Creating Chat Session..." : "Start Chatting"}
      </button>
    </div>
  );
}