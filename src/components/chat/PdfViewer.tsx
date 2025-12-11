import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PdfViewerProps {
  url: string | null;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const router = useRouter();

  return (
    <div className="w-1/2 border-r border-slate-200 bg-slate-100 flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shrink-0">
        <button onClick={() => router.back()} className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors" >
          <ArrowLeft size={16} /> Back to Library
        </button>
        <span className="text-xs font-mono text-slate-400">PDF Viewer</span>
      </div>

      {/* PDF Iframe */}
      <div className="flex-1 bg-slate-200/50 p-4 overflow-hidden relative">
        {url ? (
          <iframe 
            src={`${url}#toolbar=0`} 
            className="w-full h-full rounded-md shadow-sm border border-slate-300 bg-white"
            title="PDF Viewer"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 gap-2">
            <Loader2 className="animate-spin" size={20} /> 
            Loading PDF...
          </div>
        )}
      </div>
    </div>
  );
}