import { ArrowRight, FileText, Sparkles } from "lucide-react"


const Mockup = () => {
  return (
    <div className="mt-16 mb-20 mx-auto max-w-5xl md:mt-20 relative z-10">
          
          {/* Decorative Glow Behind */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 -z-10"></div>

          {/* Main Browser Window */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5">
              
              {/* 1. Browser Toolbar */}
              <div className="h-12 bg-white border-b border-slate-100 flex items-center justify-between px-4">
                  {/* Traffic Lights */}
                  <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  
                  {/* Address Bar / File Name */}
                  <div className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-500 flex items-center gap-2">
                      <FileText size={14} className="text-indigo-600" />
                      annual_report_2024.pdf
                  </div>
                  
                  {/* Menu Icon placeholder */}
                  <div className="w-8 flex justify-end">
                      <div className="w-1 h-1 rounded-full bg-slate-400 mx-0.5"></div>
                      <div className="w-1 h-1 rounded-full bg-slate-400 mx-0.5"></div>
                      <div className="w-1 h-1 rounded-full bg-slate-400 mx-0.5"></div>
                  </div>
              </div>

              {/* 2. Main Layout (Split Screen) */}
              <div className="flex h-[500px] md:h-[600px] bg-white">
                  
                  {/* LEFT SIDE: Document Viewer (Skeleton) */}
                  <div className="hidden md:block w-1/2 bg-slate-50/50 p-8 border-r border-slate-100 overflow-hidden relative">
                      <div className="space-y-6 opacity-60">
                          {/* Fake Header */}
                          <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                          
                          {/* Fake Paragraphs */}
                          <div className="space-y-3">
                              <div className="h-3 w-full bg-slate-200 rounded"></div>
                              <div className="h-3 w-full bg-slate-200 rounded"></div>
                              <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                          </div>

                          {/* Fake Chart / Image Block */}
                          <div className="h-48 w-full bg-slate-200/50 rounded-lg border border-slate-200"></div>

                          {/* More Text */}
                          <div className="space-y-3">
                              <div className="h-3 w-11/12 bg-slate-200 rounded"></div>
                              <div className="h-3 w-full bg-slate-200 rounded"></div>
                              <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT SIDE: Chat Interface */}
                  <div className="w-full md:w-1/2 flex flex-col bg-white">
                      
                      {/* Chat Messages Area */}
                      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                          
                          {/* Bot Message 1 */}
                          <div className="flex gap-4">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                                  <Sparkles size={18} />
                              </div>
                              <div className="space-y-2 max-w-[90%]">
                                  <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-slate-900">ChatDoc AI</span>
                                  </div>
                                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-600 leading-relaxed shadow-sm">
                                      I've analyzed the Annual Report. The company reported a 
                                      <span className="mx-1 font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">24% increase</span> 
                                      in revenue year-over-year, primarily driven by the expansion into the APAC region.
                                  </div>
                              </div>
                          </div>

                          {/* User Message */}
                          <div className="flex gap-4 flex-row-reverse">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 mt-1">
                                  <span className="text-xs font-bold">You</span>
                              </div>
                              <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm text-sm shadow-md shadow-indigo-200">
                                  What were the key risks mentioned in Q4?
                              </div>
                          </div>

                          {/* Bot Message 2 (Typing Indicator) */}
                          <div className="flex gap-4">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                  <Sparkles size={18} />
                              </div>
                              <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 w-fit">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                              </div>
                          </div>

                      </div>

                      {/* Input Footer */}
                      <div className="p-4 border-t border-slate-100 bg-white">
                          <div className="relative">
                              <input 
                                  type="text" 
                                  disabled
                                  placeholder="Ask a follow up question..." 
                                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-4 pr-12 py-3.5 focus:outline-none shadow-sm cursor-not-allowed"
                              />
                              <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm">
                                  <ArrowRight size={16} />
                              </button>
                          </div>
                          <p className="text-center text-[10px] text-slate-400 mt-3">
                              AI can make mistakes. Please verify important information.
                          </p>
                      </div>

                  </div>
              </div>
          </div>
      </div>
  )
}

export default Mockup;