import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
         <p className="font-medium text-sm">Loading conversation...</p>
      </div>

    </div>
  );
}