import { FileText } from 'lucide-react';
import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
             <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="flex-1 space-y-8">
                     <h2 className="text-3xl font-bold text-slate-900">How ChatDoc Works</h2>
                     
                     <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">1</div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Upload PDF</h4>
                                <p className="text-slate-500 text-sm">Upload your file into the dashboard.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">2</div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Processing</h4>
                                <p className="text-slate-500 text-sm">AI reads and understands the content.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">3</div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Start Chatting</h4>
                                <p className="text-slate-500 text-sm">Ask questions and get instant answers.</p>
                            </div>
                        </div>
                     </div>
                 </div>
                 
                 <div className="flex-1 bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                      <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                          <FileText className="text-indigo-600" size={24} />
                      </div>
                      <div className="space-y-4">
                          <div className="flex items-start gap-3">
                              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-xs text-slate-600 max-w-[80%]">
                                  Summarize this document for me.
                              </div>
                          </div>
                          <div className="flex items-start gap-3 justify-end">
                              <div className="bg-indigo-600 p-2 rounded-lg shadow-sm text-xs text-white max-w-[80%]">
                                  Based on the document, here is a summary of the key points...
                              </div>
                          </div>
                      </div>
                 </div>
             </div>
          </div>
      </section>
  );
};