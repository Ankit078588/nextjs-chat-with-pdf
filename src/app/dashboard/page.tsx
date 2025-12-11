"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { DocumentCard } from "@/components/dashboard/DocumentCard";
import { Loader2, FileWarning } from "lucide-react"; // Icons for empty/loading states
import { toast } from "sonner";
import { useSession } from "next-auth/react";


interface DocType {
  _id: string;
  name: string;
  size: string;
  createdAt: string;
  fileUrl: string;
}



export default function MyDocumentsPage() {
  const [documents, setDocuments] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();



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
    } finally {
      setIsLoading(false);
    }
  };


  // Initial Load
  useEffect(() => {
    fetchDocs();
  }, []);


  async function handleOpenDoc(docId: string) {
    // Loading toast dikha sakte ho agar chaho
    const toastId = toast.loading("Opening document...");

    try {
      // 1. Backend se Signed URL maango
      const res = await fetch("/api/documents/view", {
        method: "POST",
        body: JSON.stringify({ docId }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to get file access");

      // 2. Magic Link mil gaya, ab open karo
      window.open(data.url, "_blank");
      toast.dismiss(toastId);

    } catch (error) {
      console.error(error);
      toast.error("Could not open file", { id: toastId });
    }
  }

  async function handleDeleteDoc(id: string) {
    // 1. Confirmation (Optional but recommended)
    // const confirmDelete = confirm("Are you sure you want to delete this document?");
    // if (!confirmDelete) return;

    // Optimistic UI Update: Turant list se hata do (User ko fast feel hoga)
    const previousDocs = [...documents];
    setDocuments((prev) => prev.filter((doc) => doc._id !== id));

    try {
      // 2. API Call
      const res = await fetch(`/api/documents?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      toast.success("Document deleted successfully");

    } catch (error) {
      console.error(error);
      toast.error("Some error occured.");
      setDocuments(previousDocs);
    } 
  }

  return (
    <>
      <Header 
        title="manage your documents." 
        subtitle="Manage your knowledge base." 
        showUploadBtn={true} 
        onUploadSuccess={fetchDocs}
        user_name={session?.user?.name?.split(" ")[0] || ""}
      />

      <main className="flex-1 overflow-y-auto px-8 pb-10">
        {/* State 1: Loading */}
        {isLoading && (
            <div className="flex flex-col items-center justify-center mt-20 text-slate-400">
                <Loader2 size={40} className="animate-spin mb-4 text-indigo-500" />
                <p>Loading your documents...</p>
            </div>
        )}

        {/* State 2: No Documents Found */}
        {!isLoading && documents.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-slate-400 opacity-70">
                <FileWarning size={60} className="mb-4 text-slate-300" />
                <p className="text-lg font-medium text-slate-500">No documents uploaded yet.</p>
                <p className="text-sm">Upload a PDF to get started.</p>
            </div>
        )}

        {/* State 3: Documents List */}
        {!isLoading && documents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <DocumentCard 
                key={doc._id}
                id={doc._id as any}   
                name={doc.name}
                size={doc.size}
                date={new Date(doc.createdAt).toLocaleDateString()}
                variant="manage"
                deleteDoc={() => { handleDeleteDoc(doc._id) }}
                openDoc={() => { handleOpenDoc(doc._id) }}
              />
            ))}
          </div>
        )}

      </main>
    </>
  );
}