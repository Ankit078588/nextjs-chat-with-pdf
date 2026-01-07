"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import GithubIcon from "@/icons/github";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-10 overflow-hidden bg-white">
        
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] z-0 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl"></div>
             <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-[100%]"></div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-multiply"></div>


        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm hover:shadow-indigo-100 transition-all cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            Powered-by Langchain + Gemini
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-8">
            Talk to your PDFs <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-900 to-indigo-600 animate-gradient-x bg-[length:200%_auto]">like a human.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Stop skimming through 100-page reports. Upload your documents and let our AI summarize, cite, and answer questions in seconds.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a target="_blank" href="https://github.com/Ankit078588/nextjs-chat-with-pdf" className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-slate-200/50">
              <GithubIcon /> Star on Github
            </a>
          </div>

          {/* Trusted by section */}
          <div className="flex flex-col items-center gap-3">
             <div className="flex -space-x-2">
                 <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover grayscale hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt=""/>
                 <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover grayscale hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt=""/>
                 <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover grayscale hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt=""/>
                 <div className="h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 ring-2 ring-white">+2k</div>
             </div>
             <p className="text-sm font-medium text-slate-500">Trusted by 2,000+ students & researchers</p>
          </div>

        </div>
      </section>
  );
};


export default Hero;
