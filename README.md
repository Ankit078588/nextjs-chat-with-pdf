
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

## ⚙️ How It Works

1. **Upload:** User selects a PDF & the file is uploaded securely to AWS S3 via Pre-signed URL.
2. **Processing:** The server downloads the file, splits the text into chunks using `LangChain`.
3. **Vectorization:** Each chunk is converted into a vector embedding using Google's AI model.
4. **Storage:** Vectors are stored in PineconeDB with metadata (linking them to the specific file).
5. **Chatting:** When a user asks a question:
   - The question is converted to a vector.
   - Pinecone finds the most similar text chunks from the PDF.
   - The LLM generates an answer based *only* on those chunks.

---

## 🚀 Key Features

1. **Advanced RAG Pipeline**  
   - Converts PDF text into high-dimensional vector embeddings using Google Gemini.  
   - Performs fast and accurate semantic search using PineconeDB.  
   - Maintains conversational context for follow-up questions.

2. **Strong Security Practices**  
   - Files are stored safely in a private AWS S3 bucket.  
   - Public access is fully restricted.  
   - Short-lived presigned URLs ensure only authenticated users can access their own files.  
   - NextAuth.js handles secure authentication and session management.

3. **Modern User Interface**  
   - Clean and minimal UI with smooth interactions.  
   - Elegant markdown rendering in chat responses.

4. **Performance & Scalability**  
   - MongoDB stores user profiles, document metadata, and chat history.  
   - Pinecone stores vector embeddings for accurate retrieval.  
   - Built using Next.js for high performance and server-side execution.


---
