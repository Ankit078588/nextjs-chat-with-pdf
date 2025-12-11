"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { DocumentCard } from "@/components/dashboard/DocumentCard";
import { Loader2, MessageSquareDashed } from "lucide-react"; // Empty state icon change kiya
import { toast } from "sonner";

interface DocType {
  _id: string;
  name: string;
  size: string;
  createdAt: string;
  fileUrl: string;
}

export default function StartChatPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Documents 
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/documents");
        const data = await res.json();
        
        if (data.success) {
          setDocuments(data.documents);
        }
      } catch (error) {
        console.error("Failed to load docs", error);
        toast.error("Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocs();
  }, []);

  return (
    <>
      <Header 
        title="Start a Conversation" 
        subtitle="Pick a file to chat with AI." 
        showUploadBtn={false} 
      />

      <main className="flex-1 overflow-y-auto px-8 pb-10">
        
        {/* Loading State */}
        {isLoading && (
            <div className="flex flex-col items-center justify-center mt-20 text-slate-400">
                <Loader2 size={40} className="animate-spin mb-4 text-indigo-500" />
                <p>Loading your library...</p>
            </div>
        )}

        {/* Empty State */}
        {!isLoading && documents.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-slate-400 opacity-70">
                <MessageSquareDashed size={60} className="mb-4 text-slate-300" />
                <p className="text-lg font-medium text-slate-500">No documents found.</p>
                <p className="text-sm">Go to "My Documents" to upload one first.</p>
                
                <button onClick={() => router.push("/dashboard")} className="cursor-pointer mt-4 text-indigo-600 hover:underline text-sm font-medium" >
                  Go to Upload →
                </button>
            </div>
        )}

        {/* Documents Grid */}
        {!isLoading && documents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <DocumentCard 
                key={doc._id}
                id={doc._id}
                name={doc.name}
                size={doc.size}
                date={new Date(doc.createdAt).toLocaleDateString()}
                variant="chat"  
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}