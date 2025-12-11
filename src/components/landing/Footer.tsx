import React from 'react';
import { MessageSquareText, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-semibold text-slate-900">ChatDoc AI</span>
          </div>
          
          <div className="flex items-center gap-8">
             <span>Developed by <b className="text-slate-900">Ankit Kumar</b></span>
             <a href="https://github.com/Ankit078588/nextjs-chat-with-pdf" target="_blank" className="hover:text-indigo-600 transition-colors">GitHub</a>
             <a href="https://www.linkedin.com/in/ankit-kumar-353b72319/" target="_blank" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
          </div>

        </div>
      </footer>
  );
};