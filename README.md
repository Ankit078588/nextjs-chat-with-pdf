
---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Lucide React, Sonner (Toast) |
| **AI Framework** | LangChain.js |
| **LLM / Embeddings** | Google Gemini (GenAI) |
| **Vector Database** | PineconeDB |
| **Primary Database** | MongoDB (via Mongoose) |
| **File Storage** | AWS S3 (Private Bucket) |
| **Authentication** | NextAuth.js |
| **Deployment** | Vercel |
| **CI/CD** | Vercel |

---



# 📄 ChatDoc – AI-Powered PDF Assistant

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-Blue)](https://www.typescriptlang.org/)  
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)  
[![LangChain](https://img.shields.io/badge/LangChain-RAG-green)](https://js.langchain.com/)

> ⚠️ **Note:**  
> Since we are using the **free-tier Pinecone database**, vector search might be slow at times.  
> Please be patient 😊

**Live Demo:** [https://nextjs-chat-with-pdf.vercel.app/](https://nextjs-chat-with-pdf.vercel.app/)

**ChatDoc** is an AI-powered SaaS application that allows users to upload PDF documents and have natural conversations with them. Built with **RAG (Retrieval-Augmented Generation)**, it transforms static PDFs into interactive knowledge bases for instant, accurate, context-aware answers.

---

## 🚀 Key Features

### 🧠 Advanced RAG Pipeline
- **Vector Embeddings:** Uses **Google Gemini** embeddings to convert PDF text into high-dimensional vectors.
- **Semantic Search:** Utilizes **PineconeDB** to perform lightning-fast similarity searches, retrieving only the most relevant sections of the document to answer user queries.
- **Context-Aware AI:** The LLM remembers previous context, allowing for follow-up questions and conversational depth.

### 🔒 Bank-Grade Security
- **Private Storage:** User files are stored in a **Private AWS S3 Bucket**. Direct public access is blocked.
- **Signed URLs:** The application generates time-limited **Presigned URLs** for viewing files, ensuring that only authenticated users can access their specific documents.
- **Secure Authentication:** Comprehensive login system using **NextAuth.js** supporting:
  - Social Login (Google & GitHub OAuth)
  - Credential-based Login (Email/Password)

### 🎨 Modern User Interface
- **Glassmorphism Design:** A premium, polished UI featuring blurred backdrops, smooth gradients, and subtle animations.
- **Responsive Dashboard:** Fully optimized for Mobile, Tablet, and Desktop.
- **Markdown Support:** Chat responses render beautifully with support for bold text, lists, code blocks, and tables.

### ⚡ Performance & Scalability
- **Hybrid Database:**
  - **MongoDB:** Manages structured data like User profiles, Chat history, and Document metadata.
  - **Pinecone:** Manages unstructured vector data for AI retrieval.
- **Edge-Ready:** Built on **Next.js**, leveraging server-side rendering and API routes for optimal performance.

---

## ⚙️ How It Works

1. **Upload:** User drags and drops a PDF. The file is uploaded securely to AWS S3.
2. **Processing:** The server downloads the file, splits the text into chunks using `LangChain`.
3. **Vectorization:** Each chunk is converted into a vector embedding using Google's AI model.
4. **Storage:** Vectors are stored in PineconeDB with metadata (linking them to the specific file).
5. **Chatting:** When a user asks a question:
   - The question is converted to a vector.
   - Pinecone finds the most similar text chunks from the PDF.
   - The LLM generates an answer based *only* on those chunks.

---
