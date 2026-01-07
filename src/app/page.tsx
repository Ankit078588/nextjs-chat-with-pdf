import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import ValueProposition from "@/components/landing/ValueProposition";
import Mockup from "@/components/landing/Mockup";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/landing/Hero";



export default async function LandingPage() {

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* background glow */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
      </div>

      <Navbar />
      <Hero />
      <Mockup />
      <ValueProposition />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
}
