import { Lock, UploadCloud, Zap } from 'lucide-react'

const ValueProposition = () => {
  return (
    <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to talk to your data
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We use vector embeddings and semantic search to ensure you get accurate, context-aware answers every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <UploadCloud size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Drag & Drop Uploads</h3>
              <p className="text-slate-500 leading-relaxed"> Effortlessly upload unlimited-size PDFs — we instantly process your file and let you start chatting right away.              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast RAG</h3>
              <p className="text-slate-500 leading-relaxed">
                Powered by Pinecone vector database and Gemini embeddings for millisecond-latency search results.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bank-Grade Security</h3>
              <p className="text-slate-500 leading-relaxed">
                Your documents are encrypted at rest in AWS S3. We never train our models on your private data.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ValueProposition;