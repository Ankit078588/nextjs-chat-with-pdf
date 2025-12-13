"use client";

import { Plus, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
  subtitle: string;
  showUploadBtn?: boolean;
  onUploadSuccess?: () => void;
  user_name?: string;
}


export function Header({ title, subtitle, showUploadBtn, onUploadSuccess, user_name }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Get s3 Signed URL
      const urlRes = await fetch("/api/upload/signed-url", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });
      
      if (!urlRes.ok) throw new Error("Failed to get upload URL");
      const { signedUrl, s3Key } = await urlRes.json();

      // 2. Upload to S3
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadRes.ok) throw new Error("S3 Upload Failed");

      // 3. Save Document info in DB
      const dbRes = await fetch("/api/documents/save", {
        method: "POST",
        body: JSON.stringify({
          name: file.name,
          fileKey: s3Key,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        }),
      });

      if (!dbRes.ok) throw new Error("Failed to save to DB");

      toast.success('PDF uploaded.');

      if(onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    
    <header className="px-3 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between sticky top-0 bg-slate-50/90 z-10">
      <div>
        {user_name? 
          (<h1 className="text-2xl font-bold text-slate-800 text-center sm:text-left">Hello {user_name}, {title}</h1>)
          :
          (<h1 className="text-2xl font-bold text-slate-800 text-center sm:text-left">{title}</h1>)
        }
        <p className="text-slate-500 text-sm mt-1 text-center sm:text-left">{subtitle}</p>
      </div>

      {showUploadBtn && (
        <label className={`mt-2 sm:mt-0 bg-slate-90 w-fit bg-slate-800 text-white px-5 py-2.5 rounded-lg flex items-center font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 ${isUploading? 'disabled cursor-not-allowed opacity-70':'cursor-pointer'}`}>
          {isUploading ? 
            ( <> <Loader2 size={18} className="animate-spin" /> Uploading... </> ) 
            : 
            ( <> <Plus size={18} /> Upload New Document </> )
          }
            
          {/* Hidden Input */}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />
        </label>
      )}
    </header>
  );
}

