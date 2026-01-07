"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Save, Brain, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function MemoryPage() {
  const [memory, setMemory] = useState("");
  const [initialMemory, setInitialMemory] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const res = await fetch("/api/user/memory");
        const data = await res.json();
        if (data.memory) {
            setMemory(data.memory);
            setInitialMemory(data.memory);
        }
      } catch (error) {
        toast.error("Failed to load memory");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemory();
  }, []);

  
  // Update Memory
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/memory", {
        method: "PATCH",
        body: JSON.stringify({ memory }),
      });

      if (res.ok) {
        setInitialMemory(memory); 
        toast.success("AI Memory Updated!");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  // Check if content has changed
  const hasChanges = memory.trim() !== initialMemory.trim();

  return (
    <>
      <Header 
        title="AI Memory & Personalization" 
        subtitle="Teach ChatDoc how you want it to behave." 
        showUploadBtn={false}
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Input Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Brain size={24} />
                </div>
                <h3 className="font-semibold text-lg text-slate-800">Custom Instructions</h3>
              </div>
              
              <p className="text-sm text-slate-500 mb-4">
                What would you like the AI to know about you to provide better responses? 
                This will be injected into every chat session.
              </p>

              {isLoading ? (
                <div className="h-40 flex items-center justify-center text-slate-400">
                    <Loader2 className="animate-spin mr-2" /> Loading preferences...
                </div>
              ) : (
                <textarea
                  value={memory}
                  onChange={(e) => setMemory(e.target.value)}
                  placeholder="e.g. I am a software engineer, so use technical terms. Or, explain things simply using analogies."
                  className="w-full h-64 p-4 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-slate-700 leading-relaxed"
                />
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  // 🔥 Logic Update: Disable if Loading, Saving, OR No Changes
                  disabled={isSaving || isLoading || !hasChanges}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
                    ${hasChanges 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"} 
                  `}
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isSaving ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Tips */}
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-3">
                <Sparkles size={18} />
                <span>Tips for better results</span>
              </div>
              <ul className="space-y-3 text-sm text-indigo-900/80 list-disc pl-4">
                <li>Mention your <strong>profession</strong>.</li>
                <li>Specify the <strong>tone</strong>.</li>
                <li>Ask for specific <strong>formats</strong>.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-3 text-sm">Example: Developer</h4>
                <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600 italic">
                    "I am a full-stack developer. When explaining concepts, use Javascript examples. Keep answers technical and concise."
                </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}