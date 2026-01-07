import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth"; // Adjust path if needed
import { connectDB } from "@/lib/db";
import { ChatModel } from "@/models/chat.model";
import { UserModel } from "@/models/user.model";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  try {
    // 1. Auth Check
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2, Find user
    await connectDB();

    const user = await UserModel.findOne({email: session.user.email});
    if(!user) {
      redirect('/');
    }

    // 3. Parse Query Params
    const { searchParams } = new URL(req.url);
    const docId = searchParams.get("docId");
    if (!docId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
    }

    // 4. Fetch Chat-sessions
    const chats = await ChatModel.find({ 
        docId, 
        userId: user._id.toString()
    })
    .sort({ createdAt: -1 })
    .select("_id title createdAt");   

    return NextResponse.json({ chats }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching chat list:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}