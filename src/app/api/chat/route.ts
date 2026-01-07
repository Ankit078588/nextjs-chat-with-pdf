import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth"; 
import { connectDB } from "@/lib/db";
import { MessageModel } from "@/models/message.model";
import { UserModel } from "@/models/user.model";
import { systemPrompt } from "@/utils/constant";
import { ChatModel } from "@/models/chat.model";

import { getPineconeClient } from "@/lib/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { SystemMessage, HumanMessage } from "@langchain/core/messages"; 


// Setup gemini chat model
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash', 
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
});

// Initialize embedding model
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004", 
  apiKey: process.env.GOOGLE_API_KEY
});

// Setup pinecone
const pinecone = getPineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);



export async function POST(req: NextRequest) {
  try {
    // 1. Auth & input validation
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, chatId } = await req.json();
    if(!message.trim() || !chatId.trim()) {
      return NextResponse.json({ error: "message & chatId both are required." }, { status: 400 });
    }

    await connectDB();

    // 2. find user + 'customInstructions'
    const user = await UserModel.findOne({ email: session.user.email }); 
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Find Chat Session
    const chatSession = await ChatModel.findOne({ _id: chatId, userId: user._id }).populate('docId');
    if (!chatSession || !chatSession.docId) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }
    
    const fileKey = (chatSession.docId as any).fileKey;


    // 4. Save User Msg + find context + find chat history
    const [_, documentContext, previousMessages] = await Promise.all([
      // - save user message
      MessageModel.create({ chatId, text: message, role: 'user' }),
      
      // - Get vector embeddings from pinecone
      (async () => {
         const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });
         const results = await vectorStore.similaritySearch(message, 5, { fileKey });
         return results.map(r => r.pageContent).join("\n\n");
      })(),

      // - Get chat history
      MessageModel.find({ chatId }).sort({ createdAt: -1 }).limit(6)
    ]);


    // 5. Format History
    const userMemory = user.customInstructions || "No specific user instructions."; 

    const conversationHistory = previousMessages.reverse().map((msg) => {
        return `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.text}`;
    }).join('\n');


    // 6. Create prompt 
    const finalSystemPrompt = `
      ${systemPrompt}

      --------------------------------------------------
      IMPORTANT: User's Personal Preferences/Memory:
      ${userMemory}
      --------------------------------------------------

      Document Context:
      ${documentContext}

      Conversation History:
      ${conversationHistory}
    `;

    // final prompt
    const messages = [
      new SystemMessage(finalSystemPrompt),
      new HumanMessage(message) 
    ];

    // 7. Invoke LLM
    const response = await model.invoke(messages);
    const textResponse = response.content as string;


    // 8. Save AI Response
    await MessageModel.create({
        chatId,
        text: textResponse,
        role: 'ai'
    });

    return NextResponse.json({ response: textResponse });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}