import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth"; 
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";




// 1. GET - current memory
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const user = await UserModel.findOne({ email: session.user.email }).select("customInstructions");

    return NextResponse.json({ memory: user?.customInstructions || "" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch memory" }, { status: 500 });
  }
}





// 2. SAVE - new memory
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { memory } = await req.json();
    await connectDB();
    
    // Update user record
    await UserModel.findOneAndUpdate(
      { email: session.user.email },
      { customInstructions: memory }
    );

    return NextResponse.json({ success: true, message: "Memory updated!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save memory" }, { status: 500 });
  }
}