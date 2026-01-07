import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { connectDB } from "@/lib/db";
import { ChatModel } from "@/models/chat.model";
import { UserModel } from "@/models/user.model";



export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { docId, title, forceNew } = await req.json();
    if (!docId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
    }

    await connectDB();

    // find user
    const user = await UserModel.findOne({email: session.user.email});
    if (!forceNew) {
        const existingChat = await ChatModel.findOne({ 
            docId, 
            userId: user._id 
        }).sort({ createdAt: -1 });

        if (existingChat) {
            return NextResponse.json({ 
                chatId: existingChat._id, 
                title: existingChat.title,
                message: "Resuming existing session" 
            }, { status: 200 });
        }
    }

    // no chat-session found OR force-new=true, then create new chat-session
    const newChat = await ChatModel.create({
      userId: user._id, 
      docId,
      title: title || "Conversation 1",
    });

    return NextResponse.json({ 
        chatId: newChat._id, 
        title: newChat.title,
        message: "Chat session created" 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}