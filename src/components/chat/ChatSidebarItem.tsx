"use client";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface ChatSidebarItemProps {
  title: string;
  isActive: boolean;
  chatId: string;
}

export function ChatSidebarItem({ title, isActive, chatId }: ChatSidebarItemProps) {
  return (
    <Link
      href={`/chat/${chatId}`}
      className={`
        relative group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out mb-1 text-left
        ${
          isActive
            ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100" 
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"     
        }
      `}
    >
      {/* Chat Icon */}
      <MessageSquare 
        className={`
          w-4 h-4 mr-3 shrink-0 transition-colors duration-200
          ${isActive ? "text-indigo-600 fill-indigo-600/10" : "text-slate-400 group-hover:text-slate-600"}
        `} 
      />

      {/* Title */}
      <span className="truncate flex-1">
        {title}
      </span>

      {/* Active Dot */}
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 ml-2 shrink-0 animate-in fade-in zoom-in" />
      )}
    </Link>
  );
}