import Navbar from "@/components/ui/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
      

      {/* Navbar */}
      <Navbar />

      {/* Login / Signup Form Wrapper */}
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        {children}
      </div>
      
    </div>
  );
}