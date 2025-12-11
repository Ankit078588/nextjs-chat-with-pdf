"use client";
import { PdfViewer } from "@/components/chat/PdfViewer";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";


interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatPage() {
  const params = useParams();
  const docId = params?.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // fetch data
  useEffect(() => {
    if(!docId) return;

    const initData = async () => {
      try {
        // 1. Get PDF URL
        const viewRes = await fetch("/api/documents/view", {
          method: "POST",
          body: JSON.stringify({ docId }),
        });
        const viewData = await viewRes.json();
        if (viewData.success) setPdfUrl(viewData.url);

        // 2. Get Chat History
        const historyRes = await fetch("/api/chat/history", {
            method: "POST",
            body: JSON.stringify({ docId }),
        });
        const historyData = await historyRes.json();
        
        if (historyData.success && historyData.messages.length > 0) {
            setMessages(historyData.messages);
        } else {
            setMessages([{ role: "ai", text: "Hello! I've read your document. Ask me anything about it." }]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load document data");
      }
    };

    initData();
  }, [docId]);


  // Send message
  const handleSend = async (userMessage: string) => {
    // UI Update 
    const newHistory = [...messages, { role: "user", text: userMessage } as Message];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage, docId: docId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setMessages((prev) => [...prev, { role: "ai", text: data.response }]);

    } catch (error) {
      toast.error("AI failed to respond.");
      setMessages((prev) => [...prev, { role: "ai", text: "Error generating response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      
      {/* Left Side: PDF */}
      <PdfViewer url={pdfUrl} />

      {/* Right Side: Chat UI */}
      <div className="w-1/2 flex flex-col bg-white h-full">
         <ChatHeader onClear={() => setMessages([])} />
         
         <MessageList 
            messages={messages} 
            isLoading={isLoading} 
         />
         
         <ChatInput 
            onSend={handleSend} 
            isLoading={isLoading} 
         />
      </div>

    </div>
  );
}