import { NextRequest, NextResponse } from "next/server";
import { auth } from '../../../../../../auth';
import { connectDB } from "@/lib/db";
import { DocumentModel } from "@/models/document.model";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ChatModel } from "@/models/chat.model";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});



export async function POST(req: NextRequest) {
  try {
    // 1. Auth Check
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chatId } = await req.json();
    if (!chatId) return NextResponse.json({ error: "chatId is missing" }, { status: 400 });
    
    // 2. Find docId / chat Document
    await connectDB();
    const ChatSession = await ChatModel.findById(chatId).populate('docId').lean();
    if(!ChatSession) {
      return NextResponse.json({ error: "Invalid chat session." }, { status: 401 });
    }

    // 3. Find PDF Document 
    const doc = await DocumentModel.findOne({ _id: ChatSession.docId._id.toString() });
    if (!doc) return NextResponse.json({ error: "Document not found" }, { status: 404 });


    // 4. Create Signed URL command for READING (GetObject)
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: doc.fileKey, 
    });


    // 5. Generate signed URL - validity 30 mins
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 1800 });

    return NextResponse.json({ success: true, url: signedUrl });
    
  } catch (error: any) {
    console.error("View Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}