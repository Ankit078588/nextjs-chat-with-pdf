'use client';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Session } from 'next-auth';


interface NavbarClientProps {
  session : Session | null;
}


export const NavbarClient = ({session} : NavbarClientProps) => {

  const isLoggedIn = !!session?.user;

  return (
    <nav className="fixed top-0 w-full border-b border-white/50 bg-white/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={'/'} className='flex items-center justify-center gap-1'>
              <span className="h-9 w-9 bg-gradient-to-br from-indigo-900 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Sparkles size={18} fill="white" className="opacity-90" />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">ChatDoc</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            { isLoggedIn ?
              <Link href="/dashboard" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 flex items-center gap-2">
                Go to Dashboard
              </Link>
              : 
              <Link href="/login" className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 flex items-center gap-2">
                  Login <ArrowRight size={14} />
              </Link>
            }
            
            
          </div>
        </div>
      </nav>
  )
}
