import Link from 'next/link'


const CallToAction = () => {
  return (
    <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[50%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[100px]"></div>
            </div>

            <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to unlock your documents?</h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Join thousands of students and professionals who use ChatDoc to learn faster and work smarter.
                </p>
                <div className="pt-4">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors">
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
      </section>
  )
}

export default CallToAction;