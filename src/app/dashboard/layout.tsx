import { Sidebar } from "@/components/dashboard/Sidebar";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";



export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const session = await auth();       

  if (!session || !session.user) {
    redirect("/login");
  }

  
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar user={session.user}/>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}


