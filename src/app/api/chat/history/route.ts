import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { connectDB } from "@/lib/db";
import { MessageModel } from "@/models/message.model";
import { ChatModel } from "@/models/chat.model";
import { UserModel } from "@/models/user.model";


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chatId } = await req.json();
    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }
    
    // connectDB
    await connectDB();

    // find user
    const user = await UserModel.findOne({email: session.user.email});
    if(!user) {
      if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // check chatId is valid OR not, also chat is associated with this user or not
    const chat = await ChatModel.findOne({ 
      _id: chatId, 
      userId: user._id 
    });

    if (!chat) {
        return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

    // find messages
    const messages = await MessageModel.find({ chatId })
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

