"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  user : {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}


export function Sidebar({user} : SidebarProps) {
  const pathname = usePathname();    


  // Helper function for styling active links
  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== "/dashboard" && pathname.startsWith(path));
    
    return `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
        : "hover:bg-slate-800 hover:text-white text-slate-300"
    }`;
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl h-screen flex-shrink-0">
      {/* 1. Logo Area */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white">
          <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">C</div>
          <span className="text-xl font-bold tracking-tight">ChatDoc</span>
        </div>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          <LayoutDashboard size={20} />
          <span className="font-medium">My Documents</span>
        </Link>

        <Link href="/dashboard/chat" className={getLinkClass("/dashboard/chat")}>
          <MessageSquare size={20} />
          <span className="font-medium">Start Chat</span>
        </Link>
      </nav>

      {/* 3. Footer */}
      <div className="p-4 flex items-center gap-2 border-t border-slate-800">
        <img className="w-12 h-12 rounded-full" src={user.image as string } />
        <button onClick={() => signOut()}  className="w-full flex items-center justify-center cursor-pointer gap-3 px-4 py-3 rounded-lg hover:bg-red-900 hover:cursor-pointer transition-colors  bg-red-950 text-gray-200">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

