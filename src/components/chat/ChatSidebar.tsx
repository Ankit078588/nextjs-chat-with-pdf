"use client";
import { useEffect, useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { ChatSidebarItem } from "./ChatSidebarItem";
import Link from "next/link";

interface ChatSession {
  _id: string;
  title: string;
  createdAt: string;
}

interface ChatSidebarProps {
  docId: string; 
}

export function ChatSidebar({ docId }: ChatSidebarProps) {
  const router = useRouter();
  const params = useParams();
  
  const currentChatId = params?.id as string; 

  const [chats, setChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);


  useEffect(() => {
    const loadChatList = async () => {
      if (!docId) return; 

      try {
        setLoading(true);
        const res = await fetch(`/api/chat/list?docId=${docId}`);
        const data = await res.json();

        if (data.chats) {
            setChats(data.chats);
        }
      } catch (error) {
        toast.error("Failed to load chat history");
      } finally {
        setLoading(false);
      }
    };

    loadChatList();
  }, [docId]); 
  

  const handleNewChat = async () => {
    if (creating) return;
    setCreating(true);

    try {
      const res = await fetch("/api/chat/create", {
        method: "POST",
        body: JSON.stringify({
          docId: docId,
          title: `Conversation ${chats.length + 1}`,
          forceNew: true 
        }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push(`/chat/${data.chatId}`); 
        setChats([{ _id: data.chatId, title: data.title, createdAt: "" }, ...chats]);
      } else {
        throw new Error(data.error || "Failed to create");
      }
    } catch (error) {
      toast.error("Failed to create chat");
    } finally {
      setCreating(false);
    }
  };


  return (
    <div className="w-64 shrink-0 h-screen bg-slate-50 border-r border-slate-300 flex flex-col">
       {/* 1. Logo */}
       <div className="px-1 min-h-[55px] flex items-center">
        <div className="px-[9px] flex items-center">
            <Link href='/dashboard'  className="bg-[#4f39f6] font-extrabold text-lg text-white rounded-lg py-1 px-3 mr-2">C</Link>
            <Link href='/dashboard'  className="text-xl text-gray-900 font-extrabold">ChatDoc</Link>
        </div>
      </div>
      <div>
        <hr className="text-gray-300" />
      </div>
      
      {/* 2. Start new chat Button */}
      <div className="px-2 py-3">
        <button
          onClick={handleNewChat}
          disabled={creating || loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? <Loader2 className="w-4 h-4 animate-spin"/> : <PlusCircle className="w-4 h-4"/>}
          New Chat
        </button>
      </div>

      {/* 3. Chat List Section */}
      <div className="flex-1 overflow-y-auto p-2 mt-2">
        {loading ? (
           <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400"/></div>
        ) : (
          chats.map((chat) => (
            <ChatSidebarItem
              key={chat._id}
              title={chat.title}
              isActive={currentChatId === chat._id}
              onClick={() => router.push(`/chat/${chat._id}`)}
            />
          ))
        )}
      </div>

      {/* 4. Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-center text-slate-400">ChatDoc - Chat with PDF</div>
      </div>

    </div>
  );
}