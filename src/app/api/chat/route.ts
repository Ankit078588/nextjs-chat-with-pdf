import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth"; // Tumhara auth helper
import { connectDB } from "@/lib/db";
import { DocumentModel } from "@/models/document.model";
import { MessageModel } from "@/models/message";
import { getPineconeClient } from "@/lib/pinecone";

// LangChain & AI Imports
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth Check
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, docId } = await req.json();

    // 2. Database Connection & Validation
    await connectDB();
    const doc = await DocumentModel.findById(docId);
    
    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // 3. Save User Message to History (MongoDB)
    console.log('----step 3------');
    await MessageModel.create({
        docId,
        userId: doc.userId, // Ensure user matches doc owner if needed
        text: message,
        role: 'user'
    });

    // 4. Initialize Vector Store (Pinecone)
    console.log('----step 4------');
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004", // Same model as upload
        apiKey: process.env.GOOGLE_API_KEY
    });

    const pinecone = getPineconeClient();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
    
    // Connect to existing index
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex
    });

    // 5. Perform Similarity Search (RAG Retrieval)
    // Filter: Sirf ISI document (fileKey) ke chunks dhundo
    console.log('----step 5------');
    const results = await vectorStore.similaritySearch(message, 5, {
        fileKey: doc.fileKey 
    });

    const context = results.map(r => r.pageContent).join("\n\n");

    // 6. Setup Gemini Chat Model
    console.log('----step 6------');
    const model = new ChatGoogleGenerativeAI({
        // model: "gemini-1.5-flash", 
        model: 'gemini-2.5-flash',
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0.7,
    });


    // 7. Construct Prompt
    console.log('----step 7------');
    const prompt = `
    You are an intelligent AI assistant capable of answering questions based on the provided document context.
    
    Strictly follow these rules:
    1. Answer the question based ONLY on the context provided below.
    2. Do not use outside knowledge.
    3. If the answer is not in the context, politely say "I couldn't find this information in the document."
    4. Keep the answer concise and helpful.

    Context from Document:
    ${context}

    User Question: 
    ${message}
    `;

    // const prompt = PromptTemplate.fromTemplate(template);

    // 8. Create & Run Chain
    console.log('----step 8------');
    // const chain = RunnableSequence.from([
    //     prompt,
    //     model,
    //     new StringOutputParser()
    // ]);

    const response = await model.invoke(prompt);
    console.log(response);

    // 9. Save AI Response to History (MongoDB)
    console.log('----step 9------');
    await MessageModel.create({
        docId,
        userId: doc.userId,
        text: response.content,
        role: 'ai'
    });

    // 10. Return Response
    console.log('----step 10------');
    console.log(response);
    return NextResponse.json({ response: response.content });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}