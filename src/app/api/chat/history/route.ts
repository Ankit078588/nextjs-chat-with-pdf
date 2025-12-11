import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { connectDB } from "@/lib/db";
import { MessageModel } from "@/models/message";


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { docId } = await req.json();
    await connectDB();

    // Find chats
    const messages = await MessageModel.find({ docId }).sort({ createdAt: 1 });

    return NextResponse.json({ success: true, messages });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}